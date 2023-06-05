import React, { useState } from 'react'
import {
  FormLabel,
  TextField,
  Button
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    image: ''
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequest = async () => {
    await axios.post('http://localhost:5000/books', {
      title: String(inputs.title),
      author: String(inputs.author),
      image: String(inputs.image),
      isbn: Number(inputs.isbn)
    })
      .then(res => res.data)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(() => history('/books'))
  }
  return (
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

          Add a book
        </Button>
      </Box>
    </form>
  )
}

export default AddBook