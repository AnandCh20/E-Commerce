const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Replace <username>, <password>, and <dbname> with your actual MongoDB credentials and database name
const mongoURI = 'mongodb+srv://anandchaurasia99:1BXT2njqHEy6ofNh@cluster0.dfjnfxh.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a product schema
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    description: String,
    images: [String],
    rating: Number
});

// Create a model
const Product = mongoose.model('Product', productSchema);

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/add-to-cart', async (req, res) => {
    try {
        const { title, price, Discount_Price, thumbnail, description, images, rating } = req.body;

        const newProduct = new Product({
            title,
            price,
            discountPercentage,
            thumbnail,
            description,
            images,
            rating
        });

        await newProduct.save();
        res.status(201).send('Product added to cart');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
