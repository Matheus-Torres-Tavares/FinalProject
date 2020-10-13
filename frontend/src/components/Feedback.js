import React, { useState, useEffect, Fragment } from 'react'
import actions from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Card } from 'react-bootstrap'
import TheContext from '../TheContext'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Comments from './Comments'





function Feedback(props) {
    useEffect(() => {
        getKata()

    }, [])
    let { user } = React.useContext(TheContext)
    console.log(user)
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [technologies, setTechnologies] = useState()
    const [kataList, setKataList] = useState()
    console.log(kataList)




    const getKata = async () => {
        let res = await actions.getKatas()
        setKataList(res?.data.kata)
        console.log(res?.data.kata)
        console.log(kataList)




    }

    async function handleSubmit(e) {
        console.log(props)
        e.preventDefault()
        console.log(title, text)
        let res = await actions.addFeedback({ title, text, technologies, userID: props.thePropUser?.googleId, username: props.thePropUser?.name })
        console.log(res?.data)
    }





    return (

        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            Feedback
            {user ? (
                <Fragment>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p> Greetings,  {user?.name}</p>
                            <label>Project you wish to recieve feedback on:</label>
                            <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                            </input>
                        </div>
                        <div className="form-group">

                            <label>Languages:</label>
                            <input className="form-control" onChange={(e) => setTechnologies(e.target.value)} type="text" name="title">

                            </input>
                        </div>
                        <div className="form-group">
                            <label>Text:</label>
                            <textarea className="form-control" onChange={(e) => setText(e.target.value)} type="text" name="text">

                            </textarea>
                        </div>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    <Comments />

                </Fragment>

            ) : (
                    <Fragment>
                        <p></p>

                    </Fragment>
                )}



        </div>
    )
}

export default Feedback
