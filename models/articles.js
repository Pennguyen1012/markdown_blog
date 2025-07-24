//import libs:
    // in short: mongoose for database
    // marked for marktify the thingy
    // slugify is to make the id looks less terrible
    // dompurify is to stop malicious code to be ran alongside html 
const { default: mongoose } = require("mongoose");
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articlesSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.marked(this.markdown))
    }
    
    next()
})

//create table on database
module.exports = mongoose.model('Article', articlesSchema)
