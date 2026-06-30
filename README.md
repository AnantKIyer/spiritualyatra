# Spiritual Yatra - Travel Agency Website

A modern, responsive travel agency website built with Next.js, TypeScript, and Tailwind CSS. This is Phase 1 of the project, featuring a static website without backend functionality.

## Features

- **Homepage** - Hero section, featured destinations, testimonials, and call-to-action sections
- **Destinations** - Browse spiritual destinations across India
- **Packages** - View curated travel packages with pricing and details
- **About** - Learn about the company and its mission
- **Contact** - Contact form (frontend only, ready for backend integration)
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety throughout the application

## Technology Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Forms:** React Hook Form
- **Build:** Static export (no backend required)

## Project Structure

```
spiritualyatra/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── destinations/      # Destinations page
│   ├── packages/          # Packages page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Button, Card, Input, etc.)
│   ├── sections/         # Page sections (DestinationCard, PackageCard, etc.)
│   └── layout/           # Layout components (Header, Footer)
├── lib/                  # Utilities and data
│   └── data/             # Static data (destinations, packages, testimonials)
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   ├── images/           # Image assets (to be added)
│   └── icons/            # Icon assets
└── next.config.ts        # Next.js configuration (static export)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd spiritualyatra
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a static export:

```bash
npm run build
```

The static files will be generated in the `out` directory, ready to be deployed to any static hosting service.

## Adding Images

The website references images in the `public/images/` directory. You'll need to add the following images:

- `/public/images/varanasi.jpg`
- `/public/images/rishikesh.jpg`
- `/public/images/haridwar.jpg`
- `/public/images/bodhgaya.jpg`
- `/public/images/amritsar.jpg`
- `/public/images/tirupati.jpg`
- `/public/images/package-north.jpg`
- `/public/images/package-buddhist.jpg`
- `/public/images/package-yoga.jpg`
- `/public/images/package-golden.jpg`

You can use placeholder images or actual destination photos. Recommended size: 800x600px or similar aspect ratio.

## Convex Database

Content is stored in [Convex](https://convex.dev) (`destinations`, `packages`, `testimonials`, `contactInquiries`).

```bash
npm run convex:dev   # sync Convex functions locally
npm run seed         # import seed data from lib/data/
```

Set `NEXT_PUBLIC_CONVEX_URL` in `.env.local` (see `.env.local.example`).

Bootstrap the default admin user in Convex (only needed once per deployment):

```bash
npm run seed
# or: npx convex run adminAuth:ensureDefaultAdmin
```

## Admin Dashboard

Protected admin area at `/admin` (linked from the footer).

Admin users are stored in Convex (`adminUsers`, `adminSessions`). Default credentials after seeding:

- Username: `admin-user`
- Password: `password`

Change the password after first login in production. No admin credentials are required in Vercel env vars — only `NEXT_PUBLIC_CONVEX_URL`.

Features: manage destinations, packages, testimonials, and contact inquiries; upload images via Convex File Storage.

## Development

- **Linting:** `npm run lint`
- **Type Checking:** TypeScript is configured with strict mode
- **Code Formatting:** Consider adding Prettier for consistent formatting

## Deployment

This app uses Next.js with Convex. Deploy to **Vercel** (recommended) with:

- `NEXT_PUBLIC_CONVEX_URL`
- Run `npm run convex:deploy` and `npx convex run adminAuth:ensureDefaultAdmin` for production Convex

## License

This project is private and proprietary.
