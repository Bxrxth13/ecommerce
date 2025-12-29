# FreshMarket - E-commerce Grocery Platform

A modern, full-featured e-commerce grocery platform built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

## Features

- 🛒 **Shopping Cart** - Add, remove, and update quantities with persistent storage
- 🔍 **Search & Filter** - Real-time search with category and filter options
- 📱 **Responsive Design** - Mobile-first design with bottom navigation bar
- 💳 **Checkout Flow** - Multi-step checkout with address, delivery slot, and payment selection
- 👤 **User Profile** - Manage profile, addresses, payment methods, and view orders
- 🎨 **Modern UI** - Clean, green-themed design matching grocery store aesthetics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image

## Project Structure

```
ecommerce/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── categories/        # Categories page
│   ├── products/          # Product listing & detail pages
│   ├── checkout/          # Checkout page
│   ├── profile/           # User profile page
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/            # Header, MobileNav, Sidebar
│   ├── cart/              # Cart drawer
│   ├── product/           # Product cards and grids
│   ├── category/          # Category cards
│   ├── checkout/          # Checkout form components
│   ├── profile/           # Profile page components
│   └── ui/                # Reusable UI components
├── store/                 # Zustand stores
│   ├── cartStore.ts       # Cart state management
│   ├── userStore.ts       # User state management
│   └── productStore.ts    # Product state management
├── lib/                   # Utilities and data
│   ├── data/              # Mock data
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # App constants
└── types/                 # TypeScript type definitions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add images**:
   Place your images in the `public/assets/` directory:
   - Categories: `public/assets/categories/`
   - Products: `public/assets/products/`
   - Users: `public/assets/users/`

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages

- **Homepage** (`/`) - Hero section, search, categories, and quick essentials
- **Categories** (`/categories`) - Browse all product categories
- **Products** (`/products`) - Product listing with filters and sorting
- **Product Detail** (`/products/[id]`) - Individual product page with images and details
- **Checkout** (`/checkout`) - Multi-step checkout process
- **Profile** (`/profile`) - User profile, orders, addresses, and settings

## State Management

The app uses Zustand for state management with three main stores:

- **cartStore**: Manages cart items, quantities, and totals
- **userStore**: Manages user data, addresses, payment methods, and orders
- **productStore**: Manages products, categories, filters, and search

All stores use localStorage persistence for cart and user data.

## Image Requirements

Add your images to the following directories:

- `public/assets/categories/` - Category images (vegetables.jpg, fruits.jpg, etc.)
- `public/assets/products/` - Product images (avocados.jpg, bananas.jpg, etc.)
- `public/assets/users/` - User avatars (alex-avatar.jpg, etc.)

Update the image paths in `lib/data/products.ts`, `lib/data/categories.ts`, and `lib/data/users.ts` to match your image filenames.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
