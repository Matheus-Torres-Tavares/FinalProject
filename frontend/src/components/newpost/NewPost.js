import React, { useState } from 'react'
import "./css/app.css"
import actions from '../../api/index'
import TheContext from '../../TheContext'

function NewPost(props) {
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [technologies, setTechnologies] = useState()


    console.log(props.thePropUser?.name)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(title, text)


        let res = await actions.addPost({ title, text, technologies, userID: props.thePropUser?.googleId, username: props.thePropUser?.name })
        console.log(res)





    }



    return (
        <>

            <h1>Post Title</h1>

            <h4>Title</h4>

            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                </input>
                <h4>Technologies used</h4>


                <input onChange={(e) => setTechnologies(e.target.value)} type="text" name="title">

                </input>

                <h3>Text</h3>
                <input onChange={(e) => setText(e.target.value)} className="postbody" type="text" name="text">

                </input>
                <button>Submit</button>
            </form>


        </>

    )
}

export default NewPost
