# Find your sound stage - API

API where you can find available sound stages on different studios. This is a **Graphql API**, so make sure you invoke it accordingly.

## Endpoints

_Go to `./src/schema.graphql` to explore types of endpoints_

### `search(query: SearchInput): [Studio!]`

Given a search query, return a list of available sound stages and it's corresponding studio

## Assumptions

- All the filters are optionals, therefore the filter itself is optional
- If a filter is present in the query, results should match exactly the filter value, with the exception of the normalization of strings to lower case. If multiple filters are present, they are joined with logical AND

## Considerations

- This project uses
  [TypeGrpahQL](https://typegraphql.com/) as the main framework to support TS types. In the docs you can find useful boilerplate as a quick start of new features.
- This API is not connected to a DB yet. TypeGraphQL supports [Prisma](https://typegraphql.com/docs/prisma.html) out of the box, which can be one option to integrate a DB without many changes
- Dev tools (ESLint, Prettier, TS) and test configuration were reused from other project and can be reused in the future. The can eventually be extracted to independent packages to avoid repeating the same code.
- `push-docker-aws.sh` needs to be configured with ECR values, and run from an environment where aws-cli is configured.
- No auth required to call the API

## Available Scripts

### `yarn dev`

Runs the app in the local host. You can access it at
[http://localhost:4000](http://localhost:4000). If you visit this URL in the browser, you can use Apollo Studio to run queries from the browser.

### `yarn start`

Runs the app from the production folder (`dist`). This is mainly for the docker image to run the app. You can test this locally, but `yarn dev` is preferred to local development

### `yarn test`

Runs the tests

### `yarn build`

Builds the app for production to the `dist` folder. It transpiles the code to JS to avoid working with Typescript directly on prod

### `yarn format`

Formats code with prettier

### `yarn lint`

Runs ESLint scan and fix autofixable problems

### `docker:push`

Puts together the push commands given by AWS ECR, so you can upload a new version in one command. This only works if the URI, repository and tag are constants

## Local development

Run `yarn install` to install dependencies and then run `yarn dev` to start
the local server. It will give you the URL you can use to access the API. If you visit the URL in the browser, you will be able to use Apollo Studio to use it as playground

## Deployment

This project includes a `Dockerfile` that creates an image that builds and runs the server in port 4000. So this Docker image can potentially be deployed in any orchestrator service, like Kubernetes. If AWS is going to be used for deployment, the project also contains a script `push-docker-aws` to upload a new version to AWS ECR, it just needs to be configured with appropiate project settings and be run in an environment configured with `aws-cli`
