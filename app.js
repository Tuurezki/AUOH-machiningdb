const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();
const body_parser = require('body-parser');

const machining_controller = require('./machining_controller');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); // material/id

app.use( (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); //GET /api/materials


// RESTful API
// CRUD OPERATIONS

// CREATE
app.post("/machining-parameter-set", machining_controller.api_post_machining_parameter_set);

// READ
app.get("/machining-parameter-sets", machining_controller.api_get_machining_parameter_sets);

// UPDATE
// app.patch korvaa vain tietyt kentät
// app.put korvaa koko tiedon
// app.put("/machining-parameter-set/:id", machining_controller.api_put_material);

// DELETE
// app.delete("/machining-parameter-set/:id", machining_controller.api_delete_material);


const database_uri ="mongodb+srv://machining-user:K518bR7grgQpZhFQ@cluster0-wfba5.mongodb.net/materialdb?retryWrites=true&w=majority"
// "mongodb+srv://server:f1IFdTNtzuvzqZQS@cluster0-wfba5.mongodb.net/materialdb?retryWrites=true&w=majority"
// 
// Mongo db connection
mongoose.connect(database_uri, {
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});

//  machining-user
//  K518bR7grgQpZhFQ