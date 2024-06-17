import { mongoose } from 'mongoose';

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to db
mongoose.connect('mongodb://localhost:27017/auctionItems');
const db = mongoose.connection;

//Import model
import { Item } from './models/item.js';

//Add Item
export const addItem = (item) => {
    Item.create(item).then(item => {
        console.info('New Item Added');
        db.close();
    });
}

//Find Item
export const findItem = (str) => {
    //Make case insensitive
    const search = new RegExp(str, 'i');
    Item.find({ title: search })
        .then(item => {
            console.info(item);
            console.info(`${item.length} matches`);
            db.close();
        } )
}

//Remove Item
export const removeItem = (str) => {
    //Make case insensitive
    const search = new RegExp(str, 'i');
    Item.findOneAndDelete({ title: search })
        .then(item => {
            console.info(`${item.title} removed`);
            db.close();
        } )
}

// Item.insertMany([
//     { title: 'Webcam', description: 'Logitech HD webcam', start_price: 10, reserve_price: 10},
//     { title: 'Printer', description: 'HP Multifunction printer', start_price: 20, reserve_price: 25},
//     { title: 'Dark Souls', description: 'In very good condition', start_price: 20, reserve_price: 30},
//     { title: 'Espresso Machine', description: 'In good condition, hardly used.', start_price: 100, reserve_price: 100},
//     { title: 'Nintendo Console', description: 'In good condition, hardly used.', start_price: 80, reserve_price: 100},
//     { title: 'High Definition TV', description: 'In good condition, hardly used.', start_price: 150, reserve_price: 150}
// ]).then(function () {
//     console.log("Data inserted") // Success 
//     db.close();
// }).catch(function (error) {
//     console.log(error)     // Failure 
// });


//The following function only inserts if the item doesn't already exist in the db
async function upsertMany(documents) {
    const operations = documents.map(doc => ({
        updateOne: {
          filter: { title: doc.title },
          update: { $set: { description: doc.description, start_price: doc.start_price, reserve_price: doc.reserve_price }},
          upsert: true
        }
    }));
    const result = await Item.bulkWrite(operations);
    return result;
  }
  
  // Example usage:
  upsertMany([
    { title: 'Webcam', description: 'Logitech HD webcam', start_price: 10, reserve_price: 10},
    { title: 'Printer', description: 'HP Multifunction printer', start_price: 20, reserve_price: 25},
    { title: 'Dark Souls', description: 'In very good condition', start_price: 20, reserve_price: 30},
    { title: 'Espresso Machine', description: 'In good condition, hardly used.', start_price: 100, reserve_price: 100},
    { title: 'Nintendo Console', description: 'In good condition, hardly used.', start_price: 80, reserve_price: 100},
    { title: 'High Definition TV', description: 'In good condition, hardly used.', start_price: 150, reserve_price: 150}
  ])
      .then(
        function () {
            console.log("Data inserted") // Success 
            db.close();
    })
    .catch(console.error);
