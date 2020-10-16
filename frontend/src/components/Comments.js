import React, { useState, useEffect } from 'react'
import actions from '../api/index'
import { Card, Form, Button } from 'react-bootstrap'

function Comments(props) {

    const [text, setText] = useState()
    const [comments, setComments] = useState()
    useEffect(() => {

        console.log(props.comments)
        setComments(props.comments)
    }, [props])
    console.log(props.comments)
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(text)
        console.log(props)

        let res = await actions.addComment({ text, userID: props.thePropUser?.googleId, username: props.thePropUser?.name, postID: props.match.params.id })
        console.log(res)
        let newComment = res.data.WereAddingComments

        setComments([newComment, ...comments])


    }
    async function handleVote(vote) {
        console.log(vote)
        let res = await actions.vote(vote)
        console.log(res)
        props.history.go(0)
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <label> Leave your comment below:</label>
                    <textarea className="form-control" onChange={(e) => setText(e.target.value)} >
                    </textarea>
                </div>
                <div>
                    <Button variant="primary" type="submit">Submit Post</Button>
                </div>
            </Form>



            <div>{comments?.map(comment => {
                return (
                    <Card style={{ width: '45rem' }}>
                        <Card.Body>
                            <Card.Title>{comment.title} </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">By: {comment.username}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Posted on :{comment.date} </Card.Subtitle>
                            <Card.Text>
                                {comment.text}
                            </Card.Text>
                            <Button className="votebtn" onClick={() => handleVote({ type: "comment", vote: 1, postId: comment._id })}>↑{comment.upVotes.length}</Button>
                            <Button className="votebtn" onClick={() => handleVote({ type: "comment", vote: -1, postId: comment._id })}>↓{comment.downVotes.length}</Button>
                            { props.thePropUser?._id == comment.userID ? <Button onClick={() => {
                                actions.DeleteAPost({ type: "comment", id: comment._id })
                                props.history.go(0)
                                }}>Delete</Button> : <></> }
                        </Card.Body>
                    </Card>


                )
            })}</div>
        </div>
    )
}

export default Comments
