import React, { useState } from 'react'
import "../css/app.css"
import actions from '../../api/index'
import TheContext from '../../TheContext'
import { Card, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



function NewPost(props) {
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [technologies, setTechnologies] = useState()


    console.log(props.thePropUser?.name)

    async function handleSubmit(e) {
        console.log(props)
        e.preventDefault()
        console.log(title, text)


        let res = await actions.addPost({ title, text, technologies, userID: props.thePropUser?.googleId, username: props.thePropUser?.name })
        console.log(res)


        if (props.getPosts) props.getPosts()
        if (props.setShowSubmit) props.setShowSubmit(false)


    }



    return (
        <Card className="formcard" style={{ width: '34rem' }}>

            <Form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label><b>Post Title:</b></label>
                    <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                    </input>
                </div>
                <div className="form-group">

                    <label><b>Technologies used:</b></label>


                    <input className="form-control" onChange={(e) => setTechnologies(e.target.value)} type="text" name="title">

                    </input>
                </div>
                <div className="form-group">

                    <label><b>Description:</b></label>
                    <textarea className="form-control text-area" onChange={(e) => setText(e.target.value)} type="text" name="text">

                    </textarea>
                </div>

                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="primary" onClick={() => props.setShowSubmit(false)}>Cancel</Button>
            </Form>
        </Card>





    )
}

export default NewPost
