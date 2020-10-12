import React, { useEffect, useState } from "react";
import actions from '../api/index'

const PostDetails = (props) => {
    const [postDetails, setPostDetails] = useState([])
    console.log(props)
    useEffect(() => {
        async function getThePost() {
<<<<<<< HEAD
            let res = await actions.getOnePost(props.match.params.id)
            console.log(res)
        } getThePost()
    }, [])
=======
            let res = await actions.showDetails({ postId: props.match.params.id })
            setPostDetails(res.data.user)
        } getThePost()
    }, [])

    console.log(postDetails)
>>>>>>> 1cd7f6e7e3df8d7bb3dc54e4286a739547291916

    return (
        <div>
            {postDetails.date}
            {postDetails.title}
            {postDetails.text}
        </div>



    );
}

export default PostDetails;