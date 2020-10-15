import React, { useEffect, useState } from "react";
import actions from '../api/index'
import Comments from '../components/Comments'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import TheContext from '../TheContext'
import "./css/app.css"

const PostDetails = (props) => {
    let { user } = React.useContext(TheContext)
    const [postDetails, setPostDetails] = useState([])
    const [comments, setComments] = useState([])

    console.log(props)
    useEffect(() => {
        async function getThePost() {
            let res = await actions.showDetails({ postID: props.match.params.id, type: props.match.params.type })
            setPostDetails(res?.data.user)
            setComments(res?.data.comments)
            console.log(res.data.user)
            console.log(res)
            console.log(user?.name)

            console.log(res.data.comments)
        } getThePost()
    }, [])

    const showEmail = (props) =>


        console.log(postDetails)

    return (
        <div>

            <Card className="detailcard" style={{ width: '35rem' }}>
                <Card.Body>
                    <p>{user?.email}</p>
                    <Card.Title>{postDetails.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {postDetails.username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Posted on :{postDetails.date} </Card.Subtitle>
                    <Card.Text>
                        {postDetails.text}
                    </Card.Text>
                    <Card.Link href={`mailto:${user?.email}`}>Github link </Card.Link>
                    <Card.Link href="#"> Contact Me</Card.Link>
                </Card.Body>
            </Card>
            <Comments {...props} comments={comments} />

            {/* <div>{comments?.map(comment => {
                return (

                    <p>{comment.text}</p>
                )
            })}</div> */}
        </div>





    );
}

export default PostDetails;