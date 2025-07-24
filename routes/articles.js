const express = require('express')
const router = express()

//import the table from models/articles.js
const Article = require('./../models/articles')

//this is for routing to new article and passing article values.
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

//this is for routing to the newly created article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug : req.params.slug
    })
    if (article == null) {
        res.redirect('/')
    }
    res.render('articles/show', {article : article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
}) 

router.put('/:id', async(req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (error) {
        console.log(error)
        res.render(`articles/${path}`, {article: article})

    }
    }
}
//export the router
module.exports = router