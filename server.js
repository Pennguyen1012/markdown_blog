const express = require('express')
const mongoose = require('mongoose')
const articlesRouter = require('./routes/articles')
const app = express()


mongoose.connect('mongodb://localhost/blog', {
})

console.log('Connected to Mongoose')

//setup: using ejs and use view engine to convert to html
app.set('view engine', 'ejs')
    //note: this ref to the views folder with ejs files

//use routers
app.use(express.urlencoded({extended: false}))
app.use('/articles', articlesRouter)

//actual content
app.get('/', (req, res) => {

    const articles = [{
        title: "Text articles",
        createdAt: new Date(),
        description: "Some descriptions"
    },
    {
        title: "Text articles 2",
        createdAt: new Date(),
        description: "Some descriptions"
    }]
    res.render('articles/index', {articles: articles})
})



//this to really push the app up to port 5000
app.listen(5000)