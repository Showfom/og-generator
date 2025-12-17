# syntax=docker/dockerfile:1

########################
# Stage 1: deps
########################
FROM node:24-trixie-slim AS deps
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN corepack enable && \
    yarn install --frozen-lockfile --non-interactive && \
    yarn cache clean

########################
# Stage 2: builder
########################
FROM node:24-trixie-slim AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock ./
COPY . .

# 构建时环境变量
ARG NEXT_PUBLIC_FATHOM_CODE
ARG NEXT_PUBLIC_SITE_TITLE
ARG NEXT_PUBLIC_SITE_DESCRIPTION
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TWITTER_HANDLE
ARG NEXT_PUBLIC_OG_IMAGE
ARG NEXT_PUBLIC_LOGO_LIGHT
ARG NEXT_PUBLIC_LOGO_DARK
ARG NEXT_PUBLIC_AUTHOR_NAMES
ARG NEXT_PUBLIC_AUTHOR_IMAGES

ENV NEXT_PUBLIC_FATHOM_CODE=${NEXT_PUBLIC_FATHOM_CODE} \
    NEXT_PUBLIC_SITE_TITLE=${NEXT_PUBLIC_SITE_TITLE} \
    NEXT_PUBLIC_SITE_DESCRIPTION=${NEXT_PUBLIC_SITE_DESCRIPTION} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TWITTER_HANDLE=${NEXT_PUBLIC_TWITTER_HANDLE} \
    NEXT_PUBLIC_OG_IMAGE=${NEXT_PUBLIC_OG_IMAGE} \
    NEXT_PUBLIC_LOGO_LIGHT=${NEXT_PUBLIC_LOGO_LIGHT} \
    NEXT_PUBLIC_LOGO_DARK=${NEXT_PUBLIC_LOGO_DARK} \
    NEXT_PUBLIC_AUTHOR_NAMES=${NEXT_PUBLIC_AUTHOR_NAMES} \
    NEXT_PUBLIC_AUTHOR_IMAGES=${NEXT_PUBLIC_AUTHOR_IMAGES}

RUN yarn build

########################
# Stage 3: runner
########################
FROM node:24-trixie-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# 安装 Chromium 与字体
RUN apt-get update && apt-get install -y --no-install-recommends \
      chromium chromium-sandbox \
      fonts-noto-color-emoji \
      fonts-wqy-zenhei \
    && rm -rf /var/lib/apt/lists/*

# Puppeteer / Chromium 环境
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    CHROME_BIN=/usr/bin/chromium \
    CHROMIUM_FLAGS="--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu --no-zygote"

# 保留 Next.js 公共环境变量
ARG NEXT_PUBLIC_FATHOM_CODE
ARG NEXT_PUBLIC_SITE_TITLE
ARG NEXT_PUBLIC_SITE_DESCRIPTION
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TWITTER_HANDLE
ARG NEXT_PUBLIC_OG_IMAGE
ARG NEXT_PUBLIC_LOGO_LIGHT
ARG NEXT_PUBLIC_LOGO_DARK
ARG NEXT_PUBLIC_AUTHOR_NAMES
ARG NEXT_PUBLIC_AUTHOR_IMAGES

ENV NEXT_PUBLIC_FATHOM_CODE=${NEXT_PUBLIC_FATHOM_CODE} \
    NEXT_PUBLIC_SITE_TITLE=${NEXT_PUBLIC_SITE_TITLE} \
    NEXT_PUBLIC_SITE_DESCRIPTION=${NEXT_PUBLIC_SITE_DESCRIPTION} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TWITTER_HANDLE=${NEXT_PUBLIC_TWITTER_HANDLE} \
    NEXT_PUBLIC_OG_IMAGE=${NEXT_PUBLIC_OG_IMAGE} \
    NEXT_PUBLIC_LOGO_LIGHT=${NEXT_PUBLIC_LOGO_LIGHT} \
    NEXT_PUBLIC_LOGO_DARK=${NEXT_PUBLIC_LOGO_DARK} \
    NEXT_PUBLIC_AUTHOR_NAMES=${NEXT_PUBLIC_AUTHOR_NAMES} \
    NEXT_PUBLIC_AUTHOR_IMAGES=${NEXT_PUBLIC_AUTHOR_IMAGES}

# 字体配置
COPY local.conf /etc/fonts/local.conf

# 复制构建结果与依赖
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# 切换非 root 用户
USER node

EXPOSE 3000

# 直接运行 Next.js 服务器
CMD ["yarn", "start"]

