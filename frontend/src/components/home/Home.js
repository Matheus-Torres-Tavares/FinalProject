import React, { Component, useState, useEffect } from 'react';
import actions from '../../api/index'
import TheContext from '../../TheContext'



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



  }
  return (
    <div>
      Home
      {props.thePropUser?.name} {user?.name}
      <button onClick={addingPosts}>Add Post</button>
      <p>{post.username}</p>

    </div>
  )
}

export default Home;



