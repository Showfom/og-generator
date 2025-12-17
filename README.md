# SB OG Image Generator

A dynamic Open Graph (OG) image generator service built with Next.js. Generate beautiful, customizable social media preview images on the fly.

## Features

- 🎨 **Multiple Layout Templates** - Choose from various pre-designed layouts (Simple, Railway, Blog, Docs, Pattern, Starter)
- ⚡ **Real-time Preview** - See your OG image update as you configure it
- 🎭 **Fully Customizable** - Adjust text, colors, themes, and more
- 📱 **Export Formats** - Generate images in PNG, JPEG, WebP, or AVIF format
- 🌙 **Dark Theme UI** - Modern dark interface for comfortable viewing
- 🔗 **Direct URLs** - Each configuration generates a unique URL for easy sharing

## Tech Stack

This project has been upgraded to use the latest modern web technologies:

- **Next.js 16.0.10** (Pages Router with Turbopack)
- **React 19.2.3** - Latest React with improved performance
- **TypeScript 5.9.3** - Enhanced type safety and developer experience
- **Styled Components 6.1.19** - CSS-in-JS styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Twin.macro 3.4.1** - Combines Tailwind with styled-components
- **Puppeteer Core 24.33.0** - Headless browser for image generation
- **Marked 17.0.1** - Markdown parsing

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use the version specified in `.nvmrc`)
- [Bun](https://bun.sh/) package manager

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Then edit .env with your custom values (optional)
```

### Linux System Dependencies

When running the renderer on Linux servers (e.g., Debian or Ubuntu), install system packages for Chromium and full Noto font coverage so Puppeteer can launch correctly and render CJK/emoji glyphs without missing-character boxes:

```bash
sudo apt update
sudo apt install chromium
# Install Noto fonts plus all recommended subsets for CJK + emoji coverage
sudo apt install --install-recommends fonts-noto
```

Install the fonts command even if you do not need Chinese or Japanese immediately—Emoji glyphs are also shipped through the Noto family.

### Development

```bash
# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
# Create production build
bun run build

# Start production server
bun start
```

## Docker

The provided Dockerfile builds on `node:24-trixie-slim`, installs Chromium plus the full Noto font family (with recommends), and copies `.env.example` to `.env` automatically if you have not supplied one.

Build the image with BuildKit/buildx:

```bash
docker buildx build -t sb-og-generator .
```

Run the container (default port 3000):

```bash
docker run --rm -p 3000:3000 --env-file .env sb-og-generator
```

If you omit `--env-file`, the image will use the `.env` baked from `.env.example`. Mount or override `/app/.env` to supply your own configuration.

## Usage

1. **Select Layout** - Choose from the available layout templates
2. **Configure Properties** - Customize text, colors, and other layout-specific options
3. **Preview** - See your OG image update in real-time
4. **Copy URL** - Use the "Copy Image URL" button to get the direct image link
5. **Use in HTML** - Add the URL to your HTML meta tags:

```html
<meta property="og:image" content="{Your Image URL}" />
```

## API Endpoints

- `/api/image` - Returns the generated OG image (PNG/JPEG/WebP/AVIF)
- `/api/html` - Returns the HTML that will be rendered as an image (useful for debugging)

### Example

```
/api/image?layoutName=Simple&Text=Hello%20World&fileType=webp
```

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── layouts/         # OG image layout templates
├── pages/           # Next.js pages and API routes
│   └── api/         # API endpoints for image generation
├── styles/          # Global styles
└── types.ts         # TypeScript type definitions
```

## Configuration

### Environment Variables

The application can be customized using environment variables. Copy `.env.example` to `.env` and modify the values:

```bash
cp .env.example .env
```

Available environment variables:

- **NEXT_PUBLIC_SITE_TITLE**: Site title (default: "SB OG Image Generator")
- **NEXT_PUBLIC_SITE_DESCRIPTION**: Site description
- **NEXT_PUBLIC_SITE_URL**: Your site URL
- **NEXT_PUBLIC_TWITTER_HANDLE**: Twitter handle for meta tags
- **NEXT_PUBLIC_OG_IMAGE**: Default OG image URL
- **NEXT_PUBLIC_LOGO_LIGHT**: Logo URL for dark theme
- **NEXT_PUBLIC_LOGO_DARK**: Logo URL for light theme
- **NEXT_PUBLIC_AUTHOR_NAMES**: Comma-separated author names (e.g., `Author1,Author2`)
- **NEXT_PUBLIC_AUTHOR_IMAGES**: Comma-separated author avatar URLs (e.g., `url1,url2`)

All environment variables are optional and have sensible defaults.

## Adding Custom Layouts

To create a new layout:

1. Create a new file in `src/layouts/` (e.g., `myLayout.tsx`)
2. Define your layout following the `ILayout` interface
3. Export it from `src/layouts/index.ts`

See `src/layouts/simpleLayout.tsx` for a basic example.

## Credits

This project is forked from [railwayapp/og](https://github.com/railwayapp/og).

Major enhancements include:
- Full dependency upgrade to latest versions (Next.js 16, React 19)
- Dark theme implementation
- Improved TypeScript support
- Bug fixes and compatibility updates
- Modern image outputs (WebP default with optional AVIF/PNG/JPEG)

## License

See the original project for license information.
