const express = require('express')
const mongoose = require('mongoose')
const articlesRouter = require('./routes/articles')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const app = express()


mongoose.connect('mongodb://localhost/blog', {
    
})

console.log('Connected to Mongoose')

//setup: using ejs and use view engine to convert to html
app.set('view engine', 'ejs')
    //note: this ref to the views folder with ejs files

//use routers
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/articles', articlesRouter)


//actual content
app.get('/', async (req, res) => {

    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})



//this to really push the app up to port 5000
app.listen(5000)