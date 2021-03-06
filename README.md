# PeerPal

## Getting started

0. Create a new Firebase project. Put the frontend credentials in `/src/config/fire.js/`
1. Generate a service account key, and put it in the `/.firebase` directory. In `/functions/index.js` replace the key in line 7.
2. ~Put a Canvas API key in (for testing, eventually pull from database to get user's key) in line 8 of `/screens/Home.js`.~
2. Run `npm install` in both the base directory and `/functions`.
3. Run (in the base directory) `npm run start` and `firebase serve` (in two terminals) to see a development build.
4. To create a production build, change the URL in line 74 of `Home.js`, run `npm run build` and then `firebase deploy`.

For more information about create-react-app, check out the [website](https://create-react-app.dev/).
For more information about firebase, check out the [website](https://firebase.google.com/).

## Things that are currently hardcoded

 - `/functions/index.js` line 7: Canvas API Key
 - `/functions/index.js` lines 30, 56: End of quarter date



## How to get a service account key (from Firebase)
To generate a private key file for your service account:

1. In the Firebase console, open Settings > Service Accounts.

2. Click Generate New Private Key, then confirm by clicking Generate Key.

3. Securely store the JSON file containing the key.