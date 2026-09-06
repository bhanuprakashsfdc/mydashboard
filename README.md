# MyDashboard

A configurable React data grid for browsing and managing accounts/resources.

## Tech Stack

- React 18 + Vite
- React Router v6
- TanStack Table v8
- Vitest + Testing Library
- Playwright

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## How to add an account

Edit `src/data/data.js` and add an object:

```js
{
  id: "example",
  name: "Example",
  description: "Description",
  category: "coding",
  url: "https://example.com",
  status: "active",
  priority: "medium",
  type: "website",
  featured: false,
  tags: ["tag1"],
}
```

Required fields: `id`, `name`, `url`, `category`.

## How to add a category

Edit `src/data/categories.js` and append:

```js
{ id: "research", label: "Research", color: "#3b82f6" }
```

The UI updates automatically.

## Testing

```bash
npm run test
npm run test:e2e
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Connect the repository to Vercel. Build command: `npm run build`. Output directory: `dist`.
