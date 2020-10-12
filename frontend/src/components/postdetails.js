import React, { useEffect, useState } from "react";
import actions from '../api/index'

const PostDetails = (props) => {
    const [postDetails, setPostDetails] = useState([])
    console.log(props)
    useEffect(() => {
        async function getThePost() {
            let res = await actions.showDetails({ postId: props.match.params.id })
            setPostDetails(res.data.user)
        } getThePost()
    }, [])

    console.log(postDetails)

    return (
        <div>
            {postDetails.date}
            {postDetails.title}
            {postDetails.text}
        </div>



    );
}

export default PostDetails;