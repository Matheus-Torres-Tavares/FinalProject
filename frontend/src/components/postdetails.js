import React, { useEffect, useState } from "react";
import actions from '../api/index'
import Comments from '../components/Comments'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'

const PostDetails = (props) => {
    const [postDetails, setPostDetails] = useState([])
    const [comments, setComments] = useState([])
    console.log(props)
    useEffect(() => {
        async function getThePost() {
            let res = await actions.showDetails({ postID: props.match.params.id })
            setPostDetails(res.data.user)
            setComments(res?.data.comments)
            console.log(res)
            console.log(res.data.comments)
        } getThePost()
    }, [])



    console.log(postDetails)

    return (
        <div>

            <Card style={{ width: '35rem' }}>
                <Card.Body>
                    <Card.Title>{postDetails.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {postDetails.username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Posted on :{postDetails.date} </Card.Subtitle>
                    <Card.Text>
                        {postDetails.text}
                    </Card.Text>
                    <Card.Link href="#">Github link </Card.Link>
                    <Card.Link href="#"> Contact Me</Card.Link>
                </Card.Body>
            </Card>
            <Comments {...props} />
            <div>{comments?.map(comment => {
                return (

                    <p>{comment.text}</p>
                )
            })}</div>
        </div>





    );
}

export default PostDetails;