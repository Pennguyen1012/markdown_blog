const express = require('express')
const router = express()

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.post('/', (req, res) => {

})

//export the router
module.exports = router