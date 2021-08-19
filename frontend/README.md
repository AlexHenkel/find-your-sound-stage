# Find your sound stage - UI client

Web client where you can find available sound stages on different studios

## Considerations

- This project was bootstrapped with
  [Create React App](https://github.com/facebook/create-react-app).
- This project uses [Blueprint](https://blueprintjs.com/docs/#core/) as the main
  UI framework, so previous knowledge is recommended (not required). Besides the
  docs, you can look for
  [examples](https://github.com/palantir/blueprint/tree/develop/packages/docs-app/src/examples)
  on already implemented complex components
- Dev tools (ESLint, Prettier, TS), general configuration (Apollo) and generic
  components (Blueprint components) were reused from other project and can be
  reused in the futurer. They can eventually be extracted to independent
  packages to avoid repeating the same code.
- `.env` should be ideally removed from git, and mandatory if it ever gets
  populated with secret keys
- Build assumes this is going to be served by server root. To serve at a
  relative path, see CRA [docs](https://create-react-app.dev/docs/deployment/)

## Available Scripts

### `yarn start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn format`

Formats code with prettier

### `yarn lint`

Runs ESLint scan and fix autofixable problems

## Local development

Run `yarn install` to install dependencies and then run `yarn start` to start
the local server, it will give you the URL relative to localhost and with
current IP to potentially access it from other devices connected to the same
network.

_If you want to access the app from a different device, follow these steps. You
will need to do this every time you change network_

1. Run `yarn start` and copy get your current IP (E.g. 10.0.0.16), or if you
   know this already, skip to step 3
2. Stop the local server
3. Go to `.env` and replace `localhost` with the ip on the API url (E.g.
   `http://10.0.0.165:4000`)
4. Start your server again and now you can use it from other devices

## Deployment

This app is configured as a Single Page Application. So, by creating a
production build (with `yarn build`), you will be able to upload the files to
any server and serve `index.html` as a static file.

Before creating the build, make sure the `.env` has the correct API url. As of
now, it's pointing to a local URL, so it won't work in any external environment.
