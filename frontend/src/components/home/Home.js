import React, { Component, useState, useEffect, Fragment } from 'react';
import moment from 'moment'
import actions from '../../api/index'
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



  return (
    <Container fluid>

      {/* <Button onClick={addingPosts}>Add Post</Button> */}

      <p> Welcome to DevLink</p>
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (
        <Fragment>
          <p> Greetings,  {user?.name}</p>
          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          <NewPost {...props} getPosts={getPosts}/>
          {postList?.map(post => {
            console.log(post)
            return (
              <div>
                <Card style={{ width: '35rem', flexDirection: 'row', alignItems: 'center' }}>
                  <Card.Body>
                    <img src={post?.userID?.imageUrl} />
                    <Card.Title><Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {post.username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Posted on: {moment(post.date).format("MMM Do YY")} </Card.Subtitle>
                  </Card.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'flex-end', padding: '1.25rem' }}>
                    <button className="btn">^</button>
                    <p style={{ alignSelf: 'center', margin: 0, fontSize: '2.5rem' }}>0</p>
                    <button className="btn">v</button>
                  </div>
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



