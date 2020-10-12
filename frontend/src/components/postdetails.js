import React, { useEffect, useState } from "react";
import actions from '../api/index'
import Comments from '../components/Comments'

const PostDetails = (props) => {
    const [postDetails, setPostDetails] = useState([])
    console.log(props)
    useEffect(() => {
        async function getThePost() {
            let res = await actions.showDetails({ postID: props.match.params.id })
            setPostDetails(res.data.user)
            console.log(res)
        } getThePost()
    }, [])



    console.log(postDetails)

    return (
        <div>
            {postDetails?.date}
            {postDetails?.title}
            {postDetails?.text}
            <Comments {...props} />
        </div>





    );
}

export default PostDetails;