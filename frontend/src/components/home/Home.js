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
  const [post, setPost] = useState({})
  const [postList, setPostList] = useState()
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

  //   let res = await actions.addVote({ votes })
  //   setVotes(res?.data)
  //   console.log(votes)
  //   console.log(props)


  // }

  // function addVotes() {
  //   setUpVotes(upVotes => upVotes + 1)
  // }

  function decreaseVotes() {
    setDownVotes(downVotes => downVotes - 1)
  }



  return (
    <Container fluid>

      {/* <Button onClick={addingPosts}>Add Post</Button> */}
      <p> Greetings,  {user?.name}</p>
      <p> Welcome to DevLink</p>
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (
        <Fragment>

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          <NewPost {...props} />
          {postList?.map(post => {
            console.log(post)
            return (
              <div>
                {/* <Card style={{ width: '35rem' }}>
                  <Card.Body>
                    <img src={post?.userID?.imageUrl} />
                    <Card.Title><Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {post.username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Posted on: {moment(post.date).format("MMM Do YY")} </Card.Subtitle>
                  </Card.Body>
                </Card> */}
                <br></br>
                <br></br>
                <br></br>
                <Card>
                  <Card.Title><Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link></Card.Title>
                  <Card.Header><Link to={`/post/${post._id}`}></Link><h3>{post.title}</h3></Card.Header>

                  <Card.Body>
                    <img className="profilepic" src={post?.userID?.imageUrl} />
                    <Card.Title>By: {post.username}</Card.Title>
                    <Card.Text>
                      Posted on :{moment(post.date).format("MMM Do YY")}
                    </Card.Text>
                    <Button variant="primary">See Post</Button>

                    {/* <Button onClick={addVotes}>Upvotes:</Button> */}
                    <Button onClick={decreaseVotes}>downVotes:{downVotes}</Button>
                    {/* <Button onClick={decreaseVotes}>Upvotes:</Button> */}
                  </Card.Body>
                </Card>
              </div>
            )
          })}

        </Fragment>

      ) : <p>Login to see posts</p>}




    </Container>
  )
}

export default Home;



