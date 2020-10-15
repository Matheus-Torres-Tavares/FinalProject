import React, { Component, useState, useEffect, Fragment } from 'react';
import moment from 'moment'
import actions from '../../api/index'
import "../css/app.css"
import TheContext from '../../TheContext'
import NewPost from '../newpost/NewPost'
import { Switch, Route, NavLink, useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Card, Navbar, Nav, Form, FormControl } from 'react-bootstrap'

function All() {
    let [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        (async () => {
            let res = await actions.getAll()
            console.log(res)
            setAllPosts(res.data.all)
        })()
    }, [])
    const sortByDate = () => {
        let updatedPosts = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setAllPosts(updatedPosts)

    }
    const sortByName = () => {
        let updatedPosts = [...allPosts].sort((a, b) => a.title.localeCompare(b.title))
        setAllPosts(updatedPosts)

    }
    const sortByUpVote = () => {
        let updatedPosts = [...allPosts].sort((a, b) => b.upVotes.length - a.upVotes.length)
        setAllPosts(updatedPosts)

    }
    return (
        <Container className="sortbtn" fluid>
            <Button onClick={sortByDate}>Date</Button>
            <Button onClick={sortByName}>Alphabetical</Button>
            <Button onClick={sortByUpVote}>upVote</Button>

            <Fragment>
                {/* {showSubmit ? <NewPost {...props} getPosts={getPosts} setShowSubmit={setShowSubmit} /> : <button onClick={() => setShowSubmit(!showSubmit)} className="btn btn-primary" style={{ marginTop: '2rem' }}>Show Submit Form</button>} */}
                {allPosts?.map(post => {
                    console.log(post)
                    return (
                        <div className="homecards">
                            <Card className="cardbody" style={{ width: '60rem', height: '10rem' }}>
                                <Card.Body >
                                    {/* <img src={post?.userID?.imageUrl} />  */}
                                    <Card.Title><Link to={`/post/${post._id}`}><h3>{post.title.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h3></Link></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">By: <img src={post?.userID?.imageUrl} width="30px" height="30px" /> {post.username}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Posted on: {moment(post.date).format("MMM Do YY")} </Card.Subtitle>
                                    <Button className="votebtn" >↑{post.upVotes.length}</Button>
                                    <Button className="votebtn" >↓{post.downVotes.length}</Button>
                                </Card.Body>
                            </Card>


                        </div>
                    )
                })}

            </Fragment>





            <footer className="footer">
                <p>&copy;Copyright DevLink 2020 by <span>Matheus Tavares</span> <span>Sebastian Grana</span> <span>Anthony Gutilla</span></p>
            </footer>
        </Container>

    )

}

export default All;