import React, { useState } from 'react'
import "./css/app.css"
import actions from '../../api/index'
import TheContext from '../../TheContext'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function NewPost(props) {
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [technologies, setTechnologies] = useState()


    console.log(props.thePropUser?.name)

    async function handleSubmit(e) {
        console.log('test')
        e.preventDefault()
        console.log(title, text)


        let res = await actions.addPost({ title, text, technologies, userID: props.thePropUser?.googleId, username: props.thePropUser?.name })
        console.log(res)





    }



    return (

        <Form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Post Title:</label>
                <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                </input>
            </div>
            <div className="form-group">

                <label>Technologies used:</label>


                <input className="form-control" onChange={(e) => setTechnologies(e.target.value)} type="text" name="title">

                </input>
            </div>
            <div className="form-group">

                <label>Text:</label>
                <textarea className="form-control" onChange={(e) => setText(e.target.value)} type="text" name="text">

                </textarea>
            </div>

            <button>Submit</button>
        </Form>




    )
}

export default NewPost
