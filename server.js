require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan')
const logger = require('morgan');
const debug = require('debug')('myapp:server')
const serveIndex = require('serve-index')
const multer = require('multer')
const compression = require('compression')
const helmet = require('helmet')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(morgan('dev'))
app.use(logger('tiny'));
app.use('/uploads', express.static ('uploads'))
app.use('/ftp', express.static('public'), serveIndex('public', { 'icons': true }));


//connect to Mongodb
const db = process.env.MONGODB_URL
mongoose.connect(db, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})


//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/notiRouter'))
app.use('/api', require('./routes/subscribeRouter'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server started at Port", PORT)
})