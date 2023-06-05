const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
let isValid = require("./auth_users.js").isValid
let isNotEmpty = require("./auth_users.js").isNotEmpty
let checkPassword = require("./auth_users.js").checkPassword
let users = require("./auth_users.js").users
const bcrypt = require('bcrypt')
const Book = require('../model/Book')

const public_users = express.Router()
const booksController = require('../controllers/books-controller')

// register user localhost:5000/books/register
public_users.post("/register", async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    if (username && password && isNotEmpty(username)) {
      if (!(await isValid(username))) {
        if (checkPassword(password)) {
            // Генерация соли
            const salt = await bcrypt.genSalt(10)
            // Хэширование пароля
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = { username, password: hashedPassword }
            users.insertOne(newUser)
            return res.status(200).json({message: "User successfully registered"})
        } else {
          res.send('Пароль должен быть длиннее 6 символов, содержать заглавные и строчные буквы, а также специальные символы')
        }
      } else {
        return res.status(400).json({message: "User already exists"})
      }
  } 
  else {
    return res.send('No username or password')
  }
})

// localhost:5000/books
public_users.get('/', booksController.getAllBooks)
public_users.post('/', booksController.addBook)
// localhost:5000/books/author/:author
// public_users.get('/author/:author', booksController.getBookByAuthor)
public_users.delete('/:id', booksController.deleteBook)
public_users.get('/:id', booksController.getBookById)
public_users.put('/:id', booksController.updateBook)
// module.exports.general = public_users
module.exports = public_users
