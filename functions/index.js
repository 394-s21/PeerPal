// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

const fetch = require('node-fetch')
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const serviceAccount = require("../.firebase/peerpal-a286b-firebase-adminsdk-f78tm-c4450f23b8.json");
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://peerpal-a286b-default-rtdb.firebaseio.com"
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getClasses = functions.https.onRequest(async (req, res) => {
    const authorization = req.headers.authorization;
    const per_page = 100; 
    const key = authorization.replace("Bearer ", "");
    const result = await fetch(`https://canvas.northwestern.edu/api/v1/courses/?per_page=${per_page}`, {
        headers: {
            authorization: `Bearer ${key}`
        }
    })
    const unixTimeZero = Date.parse("2021-06-26T05:00:00Z");
    const result_json = await result.json();
    const currentClasses = result_json.filter(i => {
        i.end_at == unixTimeZero
    })
    // console.log(currentClasses)
    // const user_id = result_json[0].enrollments[0].user_id;
    // const classes_result = await fetch(`https://canvas.northwestern.edu/api/v1/users/${user_id}/enrollments?per_page=100`, {
    //     headers: {
    //         authorization: `Bearer ${key}`
    //     }
    // })
    // const classes_result_json = await classes_result.json();
    // console.log(classes_result_json)

    res.send(currentClasses);
})