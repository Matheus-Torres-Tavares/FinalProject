import React, { Component, useState, useEffect, Fragment } from 'react';
import moment from 'moment'
import actions from '../../api/index'
import logo from '/Users/secondary/Desktop/ironhack/finalmern/frontend/src/img/Dev_logo.png'
import "../css/app.css"
import TheContext from '../../TheContext'
import NewPost from '../newpost/NewPost'
import { Switch, Route, NavLink, useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Card, Navbar, Nav, Form, FormControl } from 'react-bootstrap'



const Home = (props) => {
  console.log(props)

  let { user } = React.useContext(TheContext)
  console.log(user?._id)
  const [post, setPost] = useState({})
  const [postList, setPostList] = useState()
  const [showSubmit, setShowSubmit] = useState(false)
  const [upVotes, setUpVotes] = useState(0)
  const [downVotes, setDownVotes] = useState(0)
  const [votes, setVotes] = useState(0)

  useEffect(() => {
    getPosts()

  }, [])
  const addingPosts = async () => {

    let res = await actions.addPost({ title: " they are cool", username: "Motherfucker Jones", text: "hello hello", })
    console.log(res)

    setPost(res.data.WereAddingApost)
    console.log(post)




  }
  const getPosts = async () => {
    let res = await actions.getPosts({ type: "post" })
    setPostList(res?.data.posts)



  }
  const postAction = async (id) => {
    alert('Post to ' + id)
  }


  const addVotes = async () => {

    let res = await actions.addVote({ votes })
    setVotes(res?.data)
    console.log(votes)
    console.log(props)
    console.log(res?.data)


  }

  function decreaseVotes() {
    setDownVotes(downVotes => downVotes - 1)
  }

  async function handleVote(vote) {
    console.log(vote)
    let res = await actions.vote(vote)
    console.log(res)
    getPosts()
  }


  return (
    <Container className="homecontainer" fluid>

      {user ? (
        <Fragment>
          <h3 className="collabhead">Collaborate with others on your projects</h3>
          <p>Submit a project you would like collaboration efforts on, and see who is interesed in teaming up!</p>
          {showSubmit ? <NewPost {...props} getPosts={getPosts} setShowSubmit={setShowSubmit} /> : <button onClick={() => setShowSubmit(!showSubmit)} className="btn btn-primary" style={{ marginTop: '2rem' }}>Show Submit Form</button>}
          {postList?.map(post => {
            console.log(post)
            return (
              <div className="homecards">

                <Card className="cardbody" style={{ width: '60rem', height: '10rem' }}>
                  <Card.Body >
                    {/* <img src={post?.userID?.imageUrl} />  */}
                    <Card.Title><Link to={`/post/${post._id}`}><h3>{post.title.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h3></Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: <img src={post?.userID?.imageUrl} width="30px" height="30px" /> {post.username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Posted on: {moment(post.date).format("MMM Do YY")} </Card.Subtitle>
                    <Button className="votebtn" onClick={() => handleVote({ type: "post", vote: 1, postId: post._id })}>↑{post.upVotes.length}</Button>
                    <Button className="votebtn" onClick={() => handleVote({ type: "post", vote: -1, postId: post._id })}>↓{post.downVotes.length}</Button>
                    {post.userID._id === user?._id ? <Button className="votebtn" onClick={async () => {
                      let res = await actions.DeleteAPost({ type: "post", id: post._id })
                      getPosts()
                    }}>Delete</Button> : <></>}
                  </Card.Body>
                </Card>


              </div>
            )
          })}

        </Fragment>

      ) :
        <Fragment>
          <p>Login to see posts</p>
          <Navbar.Brand className="navbrand" href="/all"><img src={logo} width="160" height="60" alt='error' /></Navbar.Brand>

          <div className="hometext">
            <h1>Welcome to Devlink</h1>
            <h3>Where coders can come together</h3>
          </div>
        </Fragment>
      }



      <footer className="footer">
        <p className="footertext">&copy;Copyright DevLink 2020 by <span>Matheus Tavares</span> <span>Sebastian Grana</span> <span>Anthony Gutilla</span><span>Matthew Angel</span></p>
      </footer>
    </Container>
  )
}

export default Home;