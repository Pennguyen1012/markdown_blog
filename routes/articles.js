const express = require('express')
const router = express()

//import the table from models/articles.js
const Article = require('./../models/articles')

//this is for routing to new article and passing article values.
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

//this is for routing to the newly created article
router.get('/:id', (req, res) => {

})

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await articles.save()
        res.redirect(`/articles/${articles.id}`)
    } catch (error) {
        res.render('articles/new', {article: article})
        console.log(error)
    }
})

//export the router
module.exports = router

