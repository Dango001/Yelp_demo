const { privateDecrypt } = require('crypto');
const mongoose = require('mongoose')
const campGround = require('../models/campGround');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log('CONNECTED');
    })
    .catch(ERR => {
        console.log('ERROR')
        console.log(ERR)
    });


function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}


const seedDB = async() => {
    await campGround.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campGround({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${getRandomItem(descriptors)} ${getRandomItem(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nihil rerum accusantium vel cupiditate illo minus eaque fuga, iusto hic suscipit culpa optio, veritatis nisi dicta nemo. Omnis, ipsum iste.',
            price: price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});