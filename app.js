const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const campGround = require('./models/campGround');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log('CONNECTED');
    })
    .catch(ERR => {
        console.log('ERROR')
        console.log(ERR)
    });


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await campGround.find({});
    res.render('campgrounds/index', { campgrounds })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async(req, res) => {
    const newCamp = await new campGround(req.body)
    await newCamp.save()
    res.redirect('/campgrounds')
})

app.get('/campgrounds/:id', async(req, res) => {
    const { id } = req.params
    const campground = await campGround.findById(id)
    res.render('campgrounds/show', { campground })
});

app.get('/campgrounds/:id/edit', async(req, res) => {
    const { id } = req.params
    const campground = await campGround.findById(id)
    res.render('campgrounds/edit', { campground })
})

app.put('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    const camp = await campGround.findByIdAndUpdate(id, {...req.body.campground })
    res.redirect(`/campgrounds/${camp._id}`)
})

app.delete('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    await campGround.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})





app.listen(3000, () => {
    console.log('Listening')
})