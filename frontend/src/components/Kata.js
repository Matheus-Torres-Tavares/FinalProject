import React, { useState, useEffect, Fragment } from 'react'
import actions from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Card } from 'react-bootstrap'
import TheContext from '../TheContext'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Comments from './Comments'





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
        let res = await actions.getPosts({ type: "kata" })
        console.log(res?.data)
        setKataList(res?.data.posts)
        console.log(res?.data.posts)
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {user ? (
                <Fragment>
                    <Card style={{ width: '34rem' }}>
                        <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label><b>Coding Challenge:</b></label>
                                <input className="form-control" onChange={(e) => setTitle(e.target.value)} type="text" name="title">

                                </input>
                            </div>
                            <div className="form-group">

                                <label><b>Language:</b></label>


                                <input className="form-control" onChange={(e) => setTechnologies(e.target.value)} type="text" name="title">

                                </input>
                            </div>
                            <div className="form-group">

                                <label><b>Explained solution:</b></label>
                                <textarea className="form-control text-area" onChange={(e) => setText(e.target.value)} type="text" name="text">

                                </textarea>
                            </div>
                            <Button variant="primary" type="submit">Submit</Button>

                        </Form>
                    </Card>
                    <Comments />

                </Fragment>

            ) : (
                    <Fragment>
                        <p></p>

                    </Fragment>
                )}
            {kataList?.map(kata => {
                console.log(kata)
                return (
                    <Card className="cardbody" style={{ width: '60rem', height: '10rem' }}>
                        <Card.Body >
                            {/* <img src={post?.userID?.imageUrl} />  */}
                            <Card.Title><Link to={`/kata/${kata._id}`}><h3>{kata.title.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })}</h3></Link></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">By: <img src={kata?.userID?.imageUrl} width="30px" height="30px" /> {kata.username}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Posted on: {moment(kata.date).format("MMM Do YY")} </Card.Subtitle>
                            {kata.userID._id === user?._id ? <Button onClick={() => actions.DeleteAPost({ type: "kata", id: kata._id })}>Delete</Button> : <></>}
                        </Card.Body>

                    </Card>


                )

            })}

        </div>
    )
}

export default Kata
