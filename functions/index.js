// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const cors = require('cors')
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
    cors()(req, res, async () => {
        const authorization = req.headers.authorization;
        const per_page = 100; 
        const key = authorization.replace("Bearer ", "");
        const result = await fetch(`https://canvas.northwestern.edu/api/v1/courses/?per_page=${per_page}`, {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
        const result_json = await result.json();
        //need to filter out the current classes
        const currentClasses = result_json.filter(i => {
            // console.log(i.end_at)
            return i.end_at === "2021-06-26T05:00:00Z"
        })

        // async function loadTranscripts(videoIds){
        //     // Returns an array of promises
        //     let to_return = []
        //     videoIds.forEach(
        //         (videoId) => {
        //             if (videoId == null) {
        //                 to_return.push(null)
        //             } else {
        //             to_return.push(
        //                 fetch(`https://subtitles-for-youtube.p.rapidapi.com/subtitles/${videoId}`, {
        //                     "method": "GET",
        //                     "headers": {
        //                         "x-rapidapi-key": RAPIDAPI_KEY,
        //                         "x-rapidapi-host": "subtitles-for-youtube.p.rapidapi.com"
        //                     }
        //                     }
        //                 )
        //             )
        //             }
        //         }
        //     )
        //     return to_return;
        // }
        // TODO
        // Call updateGrades on classes (if we want to update every class)

        const user_id = result_json[0].enrollments[0].user_id;
        const updateClass = async (user_key, user_id, curr_class) => {
            const assignments = await fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/assignments`, {
                headers: {
                    authorization: `Bearer ${user_key}`
                }
            })
            const assignments_json = await assignments.json();
            const quizzes = await fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/quizzes`, {
                headers: {
                    authorization: `Bearer ${user_key}`
                }
            })
            const quizzes_json = await quizzes.json();
            let assignment_grades_promises = []
            assignments_json.forEach(
                assignment => {
                    assignment_grades_promises.push(
                        fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class[0]}/assignments/${assignment.id}/submissions/${user_id}`, {
                            headers: {
                                authorization: `Bearer ${user_key}`
                            }
                        })
                    )
                }
            )
            console.log(assignment_grades_promises)
            let quiz_grades_promises = []
            quizzes_json.forEach(
                quiz => {
                    quiz_grades_promises.push(
                        // quiz.id might not work
                        fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class[0]}/quizzes/${quiz.id}/submission`, {
                            headers: {
                                authorization: `Bearer ${user_key}`
                            }
                        })
                    )
                }
            )
        }
        res.send(currentClasses);
        await updateClass(key,user_id,currentClasses[0].id);
    });
})


exports.updateGrades = functions.https.onRequest(async (req, res) => {
    // Frontend call:
    // fetch('https://oururl.com/api/updateGrades', {
    //     headers: {
    //         authorization: `Bearer ${key}`,
    //     },
    //     body: {
    //         user_id: user_id,
    //         class_ids: [
    //             1,
    //             2,
    //             3,
    //             4
    //         ]
    //     }
    // })

})