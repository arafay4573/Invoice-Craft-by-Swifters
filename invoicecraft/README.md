# InvoiceCraft

InvoiceCraft is a free and easy-to-use online invoice generator for freelancers, small businesses, and individuals. Create professional invoices in seconds, customize them with your own branding, and download them as a PDF without any subscriptions or sign-ups.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of the project and add the following environment variables:

```
# NextAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Email Provider
EMAIL_SERVER=
EMAIL_FROM=

# MongoDB
MONGODB_URI=
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
