import React, { useState, useEffect } from 'react'
import actions from '../api/index'

function Comments(props) {

    const [text, setText] = useState()
    const [comments, setComments] = useState()
    useEffect(() => {

        console.log(props.comments)
        setComments(props.comments)
    }, [props])
    console.log(props.comments)
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(text)
        console.log(props)

        let res = await actions.addComment({ text, userID: props.thePropUser?.googleId, username: props.thePropUser?.name, postID: props.match.params.id })
        console.log(res)
        let newComment = res.data.WereAddingComments
        let newComments = comments
        newComments.unshift(newComment)

        setComments(newComments)




    }






    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input onChange={(e) => setText(e.target.value)}>



                </input>
                <input type="submit">



                </input>
                <div>{comments?.map(comment => {
                    return (

                        <p>{comment.text}</p>
                    )
                })}</div>


            </form>
        </div>
    )
}

export default Comments
