import mongoose from 'mongoose';

//Item schema
const itemSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    start_price: { type: Number },
    reserve_price: { type: Number }
})

// module.exports = mongoose.model('Item', itemSchema);

export const Item = mongoose.model('item', itemSchema);