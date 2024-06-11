const express = require('express')
const Article = require('./models/article');
const articleRouter = require('./routes/articles')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/blog');

app.set('view engine', 'ejs')

// app.use('/articles', articleRouter)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)


app.listen(3001)