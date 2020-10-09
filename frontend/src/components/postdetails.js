import React from "react";

const PostDetails = (props) => {
    console.log(props)
    return (
        <div>
            hello {props.match.params.id}
        </div>
    );
}

export default PostDetails;