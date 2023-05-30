const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())


const routerpath = './routes'

const employeesRouter = require(`${routerpath}/employees`)
app.use('/employees', employeesRouter)

const cafesRouter = require(`${routerpath}/cafes`)
app.use('/cafes', cafesRouter)


app.listen(8000, () => console.log('Server Started'))