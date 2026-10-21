# Serein-Furniture Hub

A furniture store web app built with Next.js 16 (App Router), Tailwind CSS v4 + daisyUI, and [better-auth](https://www.better-auth.com) for authentication backed by MongoDB. Browse a catalog of furniture products, add or remove products, and manage your account — all in a modern, responsive interface.

## Key features

- **Product catalog** — browse seed products from data.json in the Products Explorer, with live search plus category, price-range, and minimum-rating filters.

- **Product details** — dedicated page per product with related-product suggestions and prerendered static pages (SSG).

- **Add / manage products** — logged-in users can add new products (validated form) and remove existing ones; changes persist in the browser.

- **Authentication** — email/password sign-up and sign-in powered by better-auth  in the navbar and profile page.

- **Route protection** — a proxy (middleware) redirects unauthenticated visitors away from `/add-product`, `/products/manage`, and `/profile`.

- **Marketing sections** — hero banner, feature strip, marquee, and testimonials on the home page.

## Setup & installation

1. **Clone the repo** and install dependencies


2. **Configure environment variables** — create a `.env` file in the project root:

   BETTER_AUTH_SECRET=<generate-a-secret>
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URL=<your-mongodb-connection-string>
  

3. **Run the dev server** (Turbopack):

   npm run dev
   Open [http://localhost:3000](http://localhost:3000).


## Route summary

|    `/` ---------------|  Public    |  Home
| `/about`              | Public    | About page                                               |
| `/products`           | Public    | Full product catalog with search/filter                  |
| `/products/[id]`      | Public    | Product details (SSG) with related products              |
| `/signin`             | Public    | Sign-in page                                              |
| `/signup`             | Public    | Sign-up page                                              |
| `/add-product`        | Protected | Add a new product               |
| `/products/manage`    | Protected | Manage/remove products                   |
| `/profile`            | Protected | User profile and session info  

