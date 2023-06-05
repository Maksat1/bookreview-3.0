import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    FormLabel,
    TextField,
} from "@mui/material"

const BookDetail = () => {
    const [inputs, setInputs] = useState()
    const id = useParams().id
    const history = useNavigate()

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${id}`)
                const data = response.data.bookById
                setInputs(data)
            } catch (error) {
                console.error('Fetch error', error)
            }
        }
        fetchHandler()
    }, [id])

    const sendRequest = async () => {
        try {
            await axios
            .put(`http://localhost:5000/books/${id}`, {
                title: String(inputs.title),
                author: String(inputs.author),
                image: String(inputs.image),
                isbn: Number(inputs.isbn),
            })
        } catch (error) {
            console.error('request error', error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendRequest()
        history('/books')
        return false
    }
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <div>
            {inputs ? (
                <form onSubmit={handleSubmit}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent={'center'}
                        maxWidth={700}
                        alignContent={"center"}
                        alignSelf="center"
                        marginLeft={"auto"}
                        marginRight={"auto"}
                        marginTop={10}
                    >
                        <FormLabel>ISBN</FormLabel>
                        <TextField
                            value={inputs.isbn}
                            onChange={handleChange}
                            type="number"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="isbn"
                        />
                        <FormLabel>Title</FormLabel>
                        <TextField
                            value={inputs.title}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="title"
                        />
                        <FormLabel>Author</FormLabel>
                        <TextField
                            value={inputs.author}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="author"
                        />
                        <FormLabel>Image</FormLabel>
                        <TextField
                            value={inputs.image}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="image"
                        />
                        <Button variant="contained" type="submit">
                            Update the book
                        </Button>
                    </Box>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default BookDetail