// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const cors = require('cors')
const fetch = require('node-fetch')
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const serviceAccount = require("../.firebase/peerpal-a286b-firebase-adminsdk-f78tm-c4450f23b8.json");
const admin = require('firebase-admin');
const { user } = require('firebase-functions/lib/providers/auth');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://peerpal-a286b-default-rtdb.firebaseio.com"
  });
const db = admin.database();


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


        const user_id = result_json[0].enrollments[0].user_id;
        const updateClass = async (user_key, user_id, curr_class /* class id */) => {
            let checkQuiz = true
            let checkAssignment = true
            let assignment_grades_promises = []
            let quiz_grades_promises = []

            const assignments = await fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/assignments?per_page=${per_page}`, {
                headers: {
                    authorization: `Bearer ${user_key}`
                }
            })
            const assignments_json = await assignments.json();
            // Check assignments
            if (assignments_json.message){
                checkAssignment = false
            }
            const quizzes = await fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/quizzes?per_page=${per_page}`, {
                headers: {
                    authorization: `Bearer ${user_key}`
                }
            })
            const quizzes_json = await quizzes.json();
            // Check if quizzes are disabled
            if (quizzes_json.message){
                checkQuiz = false
                // console.log("Check if quiz is disabled", checkQuiz)
            }
            // console.log("Quizzes: ", quizzes_json)
            if (checkAssignment){
                assignments_json.forEach(
                    assignment => {
                        assignment_grades_promises.push(
                            fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/assignments/${assignment.id}/submissions/${user_id}`, {
                                headers: {
                                    authorization: `Bearer ${user_key}`
                                }
                            })
                        )
                    }
                )
                // console.log(assignment_grades_promises)
            }
            if (checkQuiz){
                quizzes_json.forEach(
                    quiz => {
                        quiz_grades_promises.push(
                            // quiz.id might not work
                            fetch(`https://canvas.northwestern.edu/api/v1/courses/${curr_class}/quizzes/${quiz.id}/submission`, {
                                headers: {
                                    authorization: `Bearer ${user_key}`
                                }
                            })
                        )
                    }
                )
            }

            // Resolve promises
            let assignmentList = []
            if (checkAssignment){
                // let assignmentsPoints = []
                for (i=0; i<assignment_grades_promises.length; i++ ){
                    const assignment = await assignment_grades_promises[i]
                    const assignment_json = await assignment.json()
                    // console.log("assignment", assignment_json)
                    // assignmentsPoints.push(assignments_json[i].points_possible)
                    assignment_json.score ? assignmentList.push({id: assignments_json[i].id, points_possible: assignments_json[i].points_possible, score: assignment_json.score, name: assignments_json[i].name})
                    :
                    assignmentList.push({id: assignments_json[i].id, points_possible: assignments_json[i].points_possible, score: null, name: assignments_json[i].name})
                    // console.log("points possible", assignment_json)
                }
                // console.log(curr_class + '\n\n\n\n')
                const courseRef = db.ref('/course/' + curr_class);
                    // console.log("orderRef",orderRef)
                    courseRef.update({
                        Assignments: [assignmentList] 
                });
            }
            // Resolve quiz promises
            // let quizList = []
            // if (checkQuiz){
            //     // let assignmentsPoints = []
            //     for (i=0; i<quiz_grades_promises.length; i++ ){
            //         const quiz = await quiz_grades_promises[i]
            //         const quiz_json = await assignment.json()
            //         console.log("quiz", quiz_json)
            //         // assignmentsPoints.push(assignments_json[i].points_possible)
            //         quiz_json.score ? quizList.push({id: quizzes_json[i].id, points_possible: quizzes_json[i].points_possible, score: quiz_json.score})
            //         :
            //         quizList.push({id: quizzes_json[i].id, points_possible: quizzes_json[i].points_possible, score: null})
            //         console.log("points possible", assignment_json)
            //     }
            //     console.log(curr_class + '\n\n\n\n')
            //     const courseRef = db.ref('/course/' + curr_class);
            //         // console.log("orderRef",orderRef)
            //         courseRef.update({
            //             Quizzes: quizList
            //     });
            // }
        }
        // for (i = 0; i < currentClasses.length; i++) {
        //     console.log(currentClasses.length)
        //     console.log("hello")
        //     await updateClass(key, user_id, currentClasses[i].id)
        // }
        currentClasses.forEach(async eachClass => await updateClass(key, user_id, eachClass.id))
        // console.log(currentClasses)
        res.send(currentClasses);
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