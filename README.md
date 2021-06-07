# PeerPal

## Getting started

1. Generate a service account key, and put it in the `/.firebase` directory. In `/functions/index.js` replace the key in line 7.
2. Put a Canvas API key in (for testing, eventually pull from database to get user's key) in line 8 of `/screens/Home.js`.
2. Run `npm install` in both the base directory and `/functions`.
3. Run (in the base directory) `npm run start` and `firebase serve` (in two terminals) to see a development build.
4. To create a production build, run `npm run build` and then `firebase deploy`.

For more information about create-react-app, check out the [website](https://create-react-app.dev/).
For more information about firebase, check out the [website](https://firebase.google.com/).