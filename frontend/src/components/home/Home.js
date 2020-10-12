import React, { Component, useState, useEffect } from 'react';
import moment from 'moment'
import actions from '../../api/index'
import TheContext from '../../TheContext'
import NewPost from '../newpost/NewPost'
import { Switch, Route, NavLink, useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'


const Home = (props) => {
  console.log(props)

  let { user } = React.useContext(TheContext)
  const [post, setPost] = useState({})
  const [postList, setPostList] = useState()
  const addingPosts = async () => {

    let res = await actions.addPost({ title: " they are cool", username: "Motherfucker Jones", text: "hello hello", })
    console.log(res)
    setPost(res.data.WereAddingApost)
    console.log(post)



  }
  const getPosts = async () => {
    let res = await actions.getPosts()
    setPostList(res.data.posts)
  }
  const postAction = async (id) => {
    alert('Post to ' + id)
  }
  return (
    <div>
      Home
      {props.thePropUser?.name} {user?.name}

      <p>{post.username}</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={addingPosts}>Add Post</Button>
      <Button onClick={getPosts}>Get Posts</Button>
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (

        <NewPost {...props} />
      ) : <p></p>}

      {postList?.map(post => {
        console.log(post)
        return (
          <div>
            <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
            <p>{moment(post.date).format("MMM Do YY")}</p>
            <Button onClick={() => postAction(post._id)}>Post to thread</Button>
            <p>{post.username}</p>
          </div>
        )
      })}

    </div>
  )
}

export default Home;



