# Restaurant Desserts App

A full-stack dessert ordering application built with **Next.js**, **GraphQL**, and **JSON Server**. Browse a menu of desserts, add items to your cart, and confirm your order — all with a responsive, modern UI.

## Features

- **Browse Desserts** — View a responsive grid of desserts with images optimized for mobile, tablet, and desktop
- **Add to Cart** — Increment/decrement item quantities with an intuitive counter UI
- **Order Confirmation** — Review your order in a modal and confirm to save it to the database
- **Start New Order** — Clear your order and start fresh
- **Responsive Design** — Fully responsive layout with breakpoints for mobile, tablet, and desktop
- **Client-Side Cart** — Cart state is managed entirely in the frontend for a fast, seamless experience; data is only sent to the backend on order confirmation

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 19**
- **TypeScript**
- **Apollo Client** — GraphQL client for data fetching and mutations
- **Styled Components** — CSS-in-JS styling
- **Jest** + **React Testing Library** — Unit tests

### Backend
- **Express** — HTTP server
- **GraphQL** (`express-graphql`) — API layer
- **JSON Server** — Lightweight REST-based data persistence
- **Axios** — HTTP client for internal API calls
- **Jest** — Unit tests

## Project Structure

```
restaurant-desserts-app/
├── backend/
│   ├── __tests__/          # Backend unit tests
│   ├── config/             # Environment config
│   ├── resolvers/          # GraphQL resolvers
│   ├── schema.js           # GraphQL schema
│   ├── db.json             # JSON Server database
│   └── index.js            # Express server entry point
├── frontend/
│   ├── public/             # Static assets (images, fonts)
│   └── src/
│       ├── app/            # Next.js App Router (layout, page, providers)
│       │   └── Service/    # GraphQL queries & mutations
│       ├── components/     # UI components
│       │   ├── desserts/   # Dessert listing, counter, add-to-cart button
│       │   ├── card/       # Active cart & inactive cart views
│       │   └── OrderConfirmation/  # Order confirmation modal
│       └── types/          # TypeScript type definitions
└── package.json            # Root scripts (dev, test, install)
```

## Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm**

### Installation

```bash
npm run install:all
```

### Development

Start both frontend and backend concurrently:

```bash
npm run dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **GraphQL Playground:** [http://localhost:5000/graphql](http://localhost:5000/graphql)
- **JSON Server:** [http://localhost:5001](http://localhost:5001)

### Testing

Run all tests (backend + frontend):

```bash
npm test
```

Or individually:

```bash
npm run test:backend
npm run test:frontend
```

## GraphQL API

### Queries
| Query | Description |
|-------|-------------|
| `getAllDesserts` | Fetch all desserts from the menu |
| `getDessert(id: ID!)` | Fetch a single dessert by ID |
| `getCart` | Fetch current cart items |

### Mutations
| Mutation | Description |
|----------|-------------|
| `confirmOrder(items: [CartInput])` | Save the full cart to the database on order confirmation |
| `deleteCartData` | Clear all cart data (used when starting a new order) |
