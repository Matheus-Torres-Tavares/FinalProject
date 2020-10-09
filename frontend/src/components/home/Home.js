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




  const [coolBeanz, setCoolBeanz] = useState()
  const addingPosts = async () => {
    let res = await actions.addPost({ coolbeanz: true })
    console.log(res)

    setCoolBeanz(res.data.hello)

    console.log(coolBeanz)

  }
  return (
    <div>
      Home
      <button onClick={addingPosts}>Change Fruit</button>
      <p>howdy{coolBeanz}</p>
    </div>
  )
}

export default Home;



