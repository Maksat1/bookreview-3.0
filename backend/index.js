const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated
const router = require('./router/general')
const cors = require('cors')
const mongoose = require("mongoose")

const app = express()

//Middlewares
app.use(express.json())
app.use(cors())
app.use('/books', router)
app.use("/customer", customer_routes)
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))
// app.use('/', (req, res, next) => {
//     res.send('starting server')
// })

// mw функция, которая выполняется для всех маршрутов, начинающихся с customer/auth
// Для проверки аутентиикации пользователя перед обработкой запроса
/*
1. Проверяет наличие authorization в сессии (req.session.authorization), что предполагает, что пользователь уже прошел аутентификацию и имеет доступ к сессионному токену.
2. Если токен найден, функция jwt.verify проверяет его подлинность и декодирует его, используя секретный ключ "access".
3. Если токен действителен и успешно декодирован, req.user устанавливается равным информации о пользователе из токена.
4. Если все проверки пройдены успешно, вызывается функция next(), чтобы передать управление следующей функции-обработчику.
5. Если токен отсутствует, недействителен или возникла ошибка, возвращается соответствующий HTTP-статус и сообщение об ошибке.*/
app.use("/customer/auth/*", function auth(req,res,next){
    if(req.session.authorization) {
        token = req.session.authorization['accessToken']
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user
                next()
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
        })
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
})   

const PORT =5000

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wpvcli3.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to DataBase"))
    .then(() => {
        app.listen(PORT)
    })
    .catch((err) => console.log(err))
