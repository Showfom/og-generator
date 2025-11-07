# SB OG Image Generator

A dynamic Open Graph (OG) image generator service built with Next.js. Generate beautiful, customizable social media preview images on the fly.

## Features

- 🎨 **Multiple Layout Templates** - Choose from various pre-designed layouts (Simple, Railway, Blog, Docs, Pattern, Starter)
- ⚡ **Real-time Preview** - See your OG image update as you configure it
- 🎭 **Fully Customizable** - Adjust text, colors, themes, and more
- 📱 **Export Formats** - Generate images in PNG or JPEG format
- 🌙 **Dark Theme UI** - Modern dark interface for comfortable viewing
- 🔗 **Direct URLs** - Each configuration generates a unique URL for easy sharing

## Tech Stack

This project has been upgraded to use the latest modern web technologies:

- **Next.js 16.0.1** (Pages Router with Turbopack)
- **React 19.2.0** - Latest React with improved performance
- **TypeScript 5.9.3** - Enhanced type safety and developer experience
- **Styled Components 6.1.19** - CSS-in-JS styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Twin.macro 3.4.1** - Combines Tailwind with styled-components
- **Puppeteer Core 24.29.1** - Headless browser for image generation
- **Marked 17.0.0** - Markdown parsing

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use the version specified in `.nvmrc`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
# Create production build
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

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

- `/api/image` - Returns the generated OG image (PNG/JPEG)
- `/api/html` - Returns the HTML that will be rendered as an image (useful for debugging)

### Example

```
/api/image?layoutName=Simple&Text=Hello%20World&fileType=png
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

## Adding Custom Layouts

To create a new layout:

1. Create a new file in `src/layouts/` (e.g., `myLayout.tsx`)
2. Define your layout following the `ILayout` interface
3. Export it from `src/layouts/index.ts`

See `src/layouts/simpleLayout.tsx` for a basic example.

## Credits

This project is forked from [railwayapp/og-generator](https://github.com/railwayapp/og-generator).

Major enhancements include:
- Full dependency upgrade to latest versions (Next.js 16, React 19)
- Dark theme implementation
- Improved TypeScript support
- Bug fixes and compatibility updates

## License

See the original project for license information.