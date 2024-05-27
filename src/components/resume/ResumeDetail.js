import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResumeDetail = () => {
    const{resumeCode} = useParams();
    const[resume,setResume] = useState({});
    const{splitValue} = useRef('wLYPvSwquc');
    const fetchResume = ()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resumeCode}`, {
            method: 'GET',
            headers: {
                Authorization: `ADMIN ${process.env.REACT_APP_ADMIN_KEY}`,
                "Content-Type": "application/json;charset=UTF8"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('fetch-data',data);
                setResume(data);
            })
            .then(()=>{
                console.log('resume',resume);
                console.log(resume.career);
            });
    }
    
    useEffect(()=>{
        fetchResume();
    },[])

    return (
        <>
        </>
    );
};

export default ResumeDetail;