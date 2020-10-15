import React, { Component, useState, useEffect, Fragment } from 'react';
import moment from 'moment'
import actions from '../../api/index'
import "../css/app.css"
import TheContext from '../../TheContext'
import NewPost from '../newpost/NewPost'
import { Switch, Route, NavLink, useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Card } from 'react-bootstrap'



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


  // const addVotes = async () => {

  //   setUpVotes(upVotes => upVotes + 1)


  // }

  const addVotes = async () => {

    let res = await actions.addVote({ votes })
    setVotes(res?.data)
    console.log(votes)
    console.log(props)
    console.log(res?.data)


  }

  // function addVotes() {
  //   setUpVotes(upVotes => upVotes + 1)
  // }

  function decreaseVotes() {
    setDownVotes(downVotes => downVotes - 1)
  }



  return (
    <Container fluid>

      {/* <Button onClick={addingPosts}>Add Post</Button> */}
      {/* <p> Greetings,  {user?.name}</p> */}
      {/* <p> Welcome to DevLink</p> */}
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (
        <Fragment>

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          {showSubmit ? <NewPost {...props} getPosts={getPosts}/> : <button className="btn btn-primary">Show Submit Form</button>}
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
                    <Button onClick={() => actions.vote({ vote: 1, postId: post._id })}>↑{post.upVotes.length}</Button>
                    <Button onClick={() => actions.vote({ vote: -1, postId: post._id })}>↓{post.downVotes.length}</Button>
                    {post.userID._id === user?._id ? <Button onClick={() => actions.DeleteAPost({ type: "post", id: post._id })}>Delete</Button> : <></>}
                  </Card.Body>
                  {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-end', padding: '1.25rem' }}>
                    <button className="btn">^</button>
                    <p style={{ alignSelf: 'center', margin: 0, fontSize: '2.5rem' }}>0</p>
                    <button className="btn">v</button>
                  </div> */}
                </Card>
                <br></br>
                <br></br>
                <br></br>

              </div>
            )
          })}

        </Fragment>

      ) : <p>Login to see posts</p>}




    </Container>
  )
}

export default Home;