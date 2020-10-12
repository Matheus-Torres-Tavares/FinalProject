import React, { Component, useState, useEffect, Fragment } from 'react';
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
    let res = await actions.getPosts()
    setPostList(res.data.posts)
    console.log(res.data
    )


  }
  const postAction = async (id) => {
    alert('Post to ' + id)
  }



  return (
    <div>




      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <Button onClick={addingPosts}>Add Post</Button> */}

      <p> Welcome to DevLink</p>
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (
        <Fragment>
          <p> Greetings,  {user?.name}</p>
          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          {/* <Button onClick={getPosts}>Get Posts</Button> */}

          <NewPost {...props} />
          {postList?.map(post => {
            console.log(post)
            return (
              <div>

                <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
                <p>{moment(post.date).format("MMM Do YY")}</p>
                <img src={post?.userID?.imageUrl} />
                <Link to={`/post/${post._id}`}><Button onClick={() => postAction(post._id)}>Post to thread</Button></Link>
                <p>{post.username}</p>
              </div>
            )
          })}


        </Fragment>

      ) : <p>Login to see posts</p>}



    </div>
  )
}

export default Home;



