import React, {useState, useEffect} from 'react';

const useFetch = (url, token) => {
    // const [courseList, setCourseList] = useState([]); 
    let courseList = []
    const [isPending, setIsPending] = useState(false); 
    const [error, setError] = useState(true); 
    useEffect(() => {
        fetch(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource...');
                }
                return res.json(); 
            })
            .then((data) => {
                // console.log(data)
                data.map(x => courseList.push({id: x.id, course: x.name}))
                // data.map(x => setCourseList([...courseList, {id: x.id, course: x.name}]))
                setIsPending(true); 
                setError(false); 
                console.log(courseList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []) 
    return {courseList, isPending, error};
}
export default useFetch; 
