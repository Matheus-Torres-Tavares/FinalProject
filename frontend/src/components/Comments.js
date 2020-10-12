import React, { useState } from 'react'
import actions from '../api/index'

function Comments(props) {

    const [text, setText] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(text)
        console.log(props)

        let res = await actions.addComment({ text, userID: props.thePropUser?.googleId, username: props.thePropUser?.name, postID: props.match.params.id })
        console.log(res)





    }






    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input onChange={(e) => setText(e.target.value)}>



                </input>
                <input type="submit">



                </input>



            </form>
        </div>
    )
}

export default Comments
