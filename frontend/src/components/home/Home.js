import React, { Component, useState, useEffect } from 'react';
import actions from '../../api/index'



const Home = (props) => {
  //   let [fruit, setFruit] = useState('kiwi')

  //   useEffect(()=>{
  //     setFruit('passion fruit')
  //   }, [])

  //   const changeFruit = () => {
  //     setFruit("pineapple")
  //   }
  const addingPosts = async () => {

    let res = await actions.addPost({ title: "ballsack, they are cool", username: "Motherfucker Jones", text: "hello hello", })
    console.log(res)



  }
  return (
    <div>
      Home
      <button onClick={addingPosts}>Add Post</button>

    </div>
  )
}

export default Home;



