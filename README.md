This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Database Setup

This project uses [docker](https://www.docker.com/) to run a local instance of MongoDB.
If you want to run the development database:

```bash
docker-compose up --build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## The Stack

- [valibot](https://valibot.dev/) schema library with bundle size, type safety and developer experience in mind
- [shadcn/ui](https://ui.shadcn.com/) copy and paste react, [radix-ui](https://www.radix-ui.com/), [tailwindcss](https://tailwindcss.com/) components
- [mongodb](https://www.mongodb.com/) document database
- [orama](https://oramasearch.com/) run everywhere, in-memory, full text search db
- [argon2](https://www.npmjs.com/package/argon2) bindings to the reference Argon2 implementation.
- [nextjs](https://nextjs.org/) react framework
- [docker](https://www.docker.com/) run anywhere containers

## Considerations

### Drug list

`drug.json` came from the [NDC Directory](https://open.fda.gov/apis/drug/ndc/) and is 100 items.
There's a full FDA approved list that is 24mb zipped and 250mb~ unzipped. Keeping to the _static list of perscriptions_*
a [flat data](https://githubnext.com/projects/flat-data/) action is a viable option. By default GitHub [blocks files larger than 100mb](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github#file-size-limits). Though this can be circumvented by [large file storage](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)

Additional info:
- Github Action Runners have [14gb of ram](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for-public-repositories)
- the flat action [uses deno](https://github.com/marketplace/actions/flat-data#why-deno)
  - there's a repo of [postprocessing for flat data](https://github.com/githubocto/flat-postprocessing/tree/main)
  - because of the large file we might need to [stream the json](https://workers.tools/json-stream/#limitations)
  - orama was partially chosen as it works with Deno too

\* personal limitation, there's better ways to store the data

#### Improvements

Even keeping the flat action, throwing the data into a sqlite is probably the way to go.

### Continuations

No app is ever finished:
- [ ] finish authentication login/logout
- [ ] cleanup and make `my-scripts` look nice
- [ ] Setup mongodb for production
- [ ] centralize perscription schemas
- [ ] search [skeletons](https://replicache.dev/), suspense, fallbacks, error handling
- [ ] get [`instrumentation.ts`](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) to work (or remove it)
  - get mongodb to work under instrementation
- [ ] validate environment variables
- [ ] update global colors
- [ ] bring in more information from open.fda.gov
  - dosages
  - fill amounts
- [ ] user fill out extra data on perscriptions
- [ ] bring in an ORM
- [ ] paginate search
- [ ] integrate caliendar and email when perscriptions should be getting low
- [ ] experiment with [replicache](https://replicache.dev/) for offline support
