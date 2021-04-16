import React from 'react';
import { useParams } from 'react-router';
import Post from "../components/post"


const PostContainer = (props) => {
    let params = useParams();
    console.log(params);


    return (
        <Post data={params}></Post>
    )
}

export default PostContainer