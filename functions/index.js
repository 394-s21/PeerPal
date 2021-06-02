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
        const per_page = 100;
        const authorization = req.headers.authorization;
        const key = authorization.replace("Bearer ", "");
        const courses = await fetch(`https://canvas.northwestern.edu/api/v1/courses/?per_page=${per_page}`, {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
        const courses_json = await courses.json();
        //need to filter out the current classes
        const current_classes_json = courses_json.filter(i => {
            return i.end_at === "2021-06-26T05:00:00Z"
        })
        const user_id = current_classes_json[0].enrollments[0].user_id;
        let courses_res = []
        current_classes_json.map((course) => {
            courses_res.push({name: course.name, id: course.id})
        })
        res.send(courses_res)
    });
})


exports.updateClasses = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        // 1. Get classes (course_id s), user_id.
        const per_page = 100;
        const authorization = req.headers.authorization;
        const key = authorization.replace("Bearer ", "");
        const courses = await fetch(`https://canvas.northwestern.edu/api/v1/courses/?per_page=${per_page}`, {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
        const courses_json = await courses.json();
        //need to filter out the current classes
        const current_classes_json = courses_json.filter(i => {
            return i.end_at === "2021-06-26T05:00:00Z"
        })
        const user_id = current_classes_json[0].enrollments[0].user_id;
        let course_ids = []
        let course_names = []
        current_classes_json.map((course) => {
            course_ids.push(course.id);
            course_names.push(course.name);
            const course_ref = db.ref('/course/' + course.id);
            // let scores = [];
            // scores[user_id] = {};
            course_ref.update({
                course_name: course.name,
                // enrollment_scores: scores,
            })
            const enrollment_score_ref = db.ref('/course/' + course.id + '/enrollemnt_scores/' + user_id)
            enrollment_score_ref.update({
                score: 'no_score'
            })
        })

        //fetch assignments endpoint 
        let courses_assignments_json = await Promise.all(course_ids.map( async(course_id) => fetch(`https://canvas.northwestern.edu/api/v1/courses/${course_id}/assignments?per_page=${per_page}`, {
            headers: {
                authorization: `Bearer ${key}`
            }})))
            .then(responses =>  Promise.all(responses.map(res => res.json())))
            .then(resps => resps)




        // Updating each course to firebase 
        courses_assignments_json.map((course_assignments_json, idx) => {
        // Updating each assignment
            course_assignments_json.map(async(assignment_json) => {
                const assignment_ref = db.ref('/course/' + course_ids[idx] + '/assignments/' + assignment_json.id);
                assignment_ref.update({
                    assignment_name: assignment_json.name,
                    points_possible: assignment_json.points_possible,
                })})
        });

        // 3. For each class, for each assignment, get score, set score in database
        let scores_list = []
        for (let i = 0; i < courses_assignments_json.length; i++){
            let t = await Promise.all(courses_assignments_json[i].map(async assignment => fetch(`https://canvas.northwestern.edu/api/v1/courses/${assignment.course_id}/assignments/${assignment.id}/submissions/${user_id}`, {
            headers:{
                authorization: `Bearer ${key}`
            }
            })))
            .then(responses =>  Promise.all(responses.map(res => res.json())))
            .then(resps => resps)
            scores_list.push(t)
        }
               
        scores_list.map((scores, idx) => {
            scores.map(score => {
                const user_assignment_ref = db.ref('/course/' + course_ids[idx] + '/assignments/' + score.assignment_id + '/users/' + user_id);
                const assignment_score = score.score ? score.score : 'no_score'
                // console.log(`\n\n\n\n Assignment score: ${assignment_score}`)
                user_assignment_ref.update({   //update() actually shows the user_id but push() encrypts the user_id 
                    score: assignment_score
                })
            })
        })

        // 4. For each class, get enrollment_score, set enrollment_score in database
        res.send(scores_list)
        
    });
});

exports.updateUser = functions.https.onCall((data, context) => {

   

    fetch(`https://canvas.northwestern.edu/api/v1/courses/`, {
            headers:{
                authorization: `Bearer ${data.key}`
            }
            })
            .then(res => res.json())
            .then(res_json => {
                
                const user = res_json[0].enrollments[0].user_id;
                const user_ref = db.ref(`users/${user}`);
                user_ref.update(
                    {encrypted_key : data.key_encrypted}
                )
            
        })

    return{
        status: 'OK'
    };

  });


/*

courses:
    - course_id: 1
        - course_name 1
        - enrollment_scores: 1, 4
            - user_id: 1
                - score 4
                - learning_strategies: // maybe later
                    - learning_strategy // maybe later
        - assignments: 2
            - assignment_id: 2
                - assignment_name 2
                - points_possible 2
                - users: 1, 3
                    - user_id: 1
                        - score 3
                        - learning_strategies:
                            - learning_strategy
users:
    - user_id:
        - user_uid
        - courses:
            - course_id



*/