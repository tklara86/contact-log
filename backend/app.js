require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const authRoutes = require('./Routes/auth');
const contactsRoutes = require('./Routes/contacts')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.send("<h1>Hello from main page</h1>")
})


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes)

// Errors
app.use(async (res,req,next) => {
    next(createError.NotFound('This route does not exist'))
})

app.use((err,req,res,next) => {
    res.status(err.status ||  5000)
        .json({
            error: {
                status: err.status || 500,
                message: err.message
            }
        })
})
const port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`I am listening on port ${port}`)
})