import React, { useState, useEffect, Fragment } from 'react'
import actions from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Card } from 'react-bootstrap'
import TheContext from '../TheContext'
import moment from 'moment'
import { Link } from 'react-router-dom'




function Kata(props) {
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
        let res = await actions.addKata({ title, text, technologies, userID: props.thePropUser?.googleId, username: props.thePropUser?.name })
        console.log(res?.data)
    }








    return (

        <div>

            {user ? (
                <Fragment>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p> Greetings,  {user?.name}</p>
                            <label>Coding Challenge:</label>
                            <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                            </input>
                        </div>
                        <div className="form-group">

                            <label>Language:</label>
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


                </Fragment>

            ) : (
                    <Fragment>
                        <p></p>

                    </Fragment>
                )}
            {kataList?.map(kata => {
                console.log(kata)
                return (
                    <Card style={{ width: '35rem' }}>
                        <Card.Body>
                            <img src={kata?.userID?.imageUrl} />
                            <Card.Title><Link to={`/kata/${kata._id}`}><h3>{kata.title}</h3></Link></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">By: {kata.username}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Posted on :{moment(kata.date).format("MMM Do YY")} </Card.Subtitle>
                        </Card.Body>
                    </Card>


                )

            })}

        </div>
    )
}

export default Kata
