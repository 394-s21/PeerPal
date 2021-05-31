import { Link } from "react-router-dom"; 

const CourseCards = ({current_courses}) => {
    return ( 
        <div className="course_list">
            <h1>
                Current Courses
            </h1>
            {current_courses.map((course) => {
                <div className="course" key={course.id}>
                    <h2>{course.name}</h2>
                </div>
            })}
        </div>
     );
}
 
export default CourseCards;