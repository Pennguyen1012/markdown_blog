const express = require('express')
const router = express()

//import the table from models/articles.js
const Article = require('./../models/articles')

//this is for routing to new article and passing article values.
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

//this is for routing to the newly created article
router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) {
        res.redirect('/')
    }
    res.render('articles/show', {articles: article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (error) {
        console.log(error)
        res.render('articles/new', {article: article})

    }
})

//export the router
module.exports = router

