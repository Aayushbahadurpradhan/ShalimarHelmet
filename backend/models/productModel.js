const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productImage: {
        type: [String], // Array of strings (for storing image URLs)
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // This will automatically add 'createdAt' and 'updatedAt' fields
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
