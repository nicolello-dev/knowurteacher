# Know ur teacher

[https://knowurteacher.com](https://www.knowurteacher.com)

A website where you can comment on your teachers and see what others think of them.

## For developers

This project makes use of various frameworks:

- NextJS, a frontend framework developed by Vercel
- Bootstrap, a frontend library for consistent styling
- NextAuth, a Vercel framework to handle authentication
- RDS, an AWS service for relational databases
- PostgreSQL as the main database
- Prisma as the ORM
- Google Analytics and Vercel Analytics

## How to run

Before running the webapp locally, you should initiate a PostgreSQL database and configure the .env as in the [.example.env](https://github.com/ilariiiiia/knowurteacher/blob/main/.example.env) file. You will also need to generate Google Client ID and Google Client Secret through Google Cloud for oAuth2.

##### Install dependencies

```bash
npm i
```

##### Run locally

To run the development server (locally), use

```bash
npm run dev
```

And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Production-like environment

Run

```bash
npm run build
```

To build the application. Make sure to address any and all errors. Run

```bash
npm run start
```

And open [http://localhost:3000](http://localhost:3000) to see it in production mode.

## Contributing

Contributions are very much welcome! You can open an issue on the relative page, or send a pull request.

Please respect the PR and issue templates, or, if strictly necessary, try to follow them as much as possible.

## Sponsor

You can sponsor the project by donating on my Paypal at my email, nicolamigone179@gmail.com
