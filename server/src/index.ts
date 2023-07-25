import 'tsconfig-paths/register'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
config()

const app = express()
const PORT = process.env.PORT

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('dev'))
app.use(cookieParser())

connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => app.listen(
    PORT, 
    () => console.log(`Application listening at http://localhost:${PORT}`)))
.catch((error: Error) => {
    console.log(error)
    process.exit(1)
})

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ['GET', 'POST'],
    },
})

io.on('connection', socket => {
    console.log('Client connected:', socket.id)
    socket.on('send-message-test', (message) => {
        console.log('Received message:', message)
        const responseMessage = `Server received your message: "${message}"`
        socket.emit('message', responseMessage)
    })
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id))
})

