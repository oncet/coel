This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, setup your database credentials: `cp .env .env.local` and edit the file.

Lastly, run database migrations:

```bash
npm run db:migrate:dev
# or
yarn db:migrate:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
