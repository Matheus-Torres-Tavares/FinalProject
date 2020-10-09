import React, { Component, useState, useEffect } from 'react';
import actions from '../../api/index'
import TheContext from '../../TheContext'
import NewPost from '../newpost/NewPost'
import { Switch, Route, NavLink, useHistory, Link } from "react-router-dom";


const Home = (props) => {
  console.log(props)
  //   let [fruit, setFruit] = useState('kiwi')

  //   useEffect(()=>{
  //     setFruit('passion fruit')
  //   }, [])

  //   const changeFruit = () => {
  //     setFruit("pineapple")
  //   }
  let { user } = React.useContext(TheContext)
  const [post, setPost] = useState({})
  const addingPosts = async () => {

    let res = await actions.addPost({ title: "ballsack, they are cool", username: "Motherfucker Jones", text: "hello hello", })
    console.log(res)
    setPost(res.data.WereAddingApost)
    console.log(post)

    // setCoolBeanz(res.data.hello)

    // console.log(coolBeanz)

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
      <button onClick={addingPosts}>Add Post</button>
      {/* <button ><Link to='/newpost'>Create a new Post!</Link></button> */}
      {user ? (

        <NewPost />
      ) : <p></p>}



    </div>
  )
}

export default Home;



