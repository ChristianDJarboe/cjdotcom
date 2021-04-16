import React from 'react';
import { useParams } from 'react-router';
import SingleProject from "../components/singleProject"


const SingleProjectContainer = (props) => {
    let params = useParams();
    console.log(params);


    return (
        <SingleProject data={params}></SingleProject>
    )
}

export default SingleProjectContainer