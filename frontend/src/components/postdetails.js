import React, { useEffect, useState } from "react";
import actions from '../api/index'

const PostDetails = (props) => {
    console.log(props)
    useEffect(() => {
        async function getThePost() {
            let res = await actions.getOnePost(props.match.params.id)
            console.log(res)
        } getThePost()
    }, [])

    return (
        <div>
            hello {props.match.params.id}
        </div>
    );
}

export default PostDetails;