import React from 'react'
import { Button } from '@mui/material'
import { Link, useNavigate } from'react-router-dom'
import axios from 'axios'
import './Book.css'

const Book = (props) => {
    const history = useNavigate()
    const { _id, image, isbn, title, author} = props.book
    
    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/books/${_id}`)
        .then(res => res.data)
        .then(() => history('/'))
        .then(() => history('/books'))
    }

    return <div className='card'>
        <img src={image} alt={title}/>
        <h3>{title}</h3>
        <article>By {author}</article>
        
        
        <Button LinkComponent={Link} to={`/books/${_id}`} sx={{mt: 'auto'}}>Update</Button>
        <Button onClick={deleteHandler} sx={{mt: 'auto'}}>Delete</Button>
    </div>
}

export default Book