require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const product_controller = require('./products_controller');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(database => {
    console.log('Connected to the db')
    app.set('db', database);
}).catch( err => console.log(err) );

app.get('/api/products', product_controller.getAll);
app.get('/api/product/:id', product_controller.getOne);
app.post('/api/product', product_controller.create);
app.put('/api/product/:id', product_controller.update);
app.delete('/api/product/:id', product_controller.delete);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${ PORT }. 🏄`);
});