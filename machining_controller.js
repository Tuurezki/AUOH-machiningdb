const machining_model = require('./machining_model');

// HELPERS
const machining_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
	    cutting_speed: req.body.cutting_speed,
	    feed_rate: req.body.feed_rate
    };
    return data;
};

// CREATE
const api_post_machining_parameter_set = (req, res, next) => {

    let data = machining_data(req);

    let new_machining = machining_model(data);

    new_machining.save().then(()=>{
        console.log(new_machining);
        res.send(JSON.stringify(new_machining));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

    console.log(data);
    
};

// READ
const api_get_machining_parameter_sets = (req, res, next)=>{
    console.log('api_get_machining_parameter_sets');

    machining_model.find({})
    .lean()
    .then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// // UPDATE
// // PUT /api/material/5e877019ab6c9e3a4868f634
// const api_put_machining_parameter_set = (req, res, next) => {
//     console.log('api_put_machining_parameter_set');
//     let id = req.params.id;
//     let data = machining_data(req);

//     material_model.findByIdAndUpdate(id, data, {
//         new:true
//     }).then((material) => {
//         res.send(material);
//     }).catch(err => {
//         res.status(500);
//         res.send(err.errmsg);
//         console.log(err);
//     });
// };

// // DELETE 
// // DELETE /api/material/5e877019ab6c9e3a4868f634
// const api_delete_machining_parameter_set = (req, res, next) => {
//     let id = req.params.id;
//     material_model.findByIdAndRemove(id).then(() => {
//         res.send();
//     }).catch(err => {
//         res.status(500);
//         res.send(err.errmsg);
//         console.log(err);
//     });
// };


// EXPORTS
module.exports.api_post_machining_parameter_set = api_post_machining_parameter_set; // lisää parametrisetti
module.exports.api_get_machining_parameter_sets = api_get_machining_parameter_sets; // kysy kaikki parametrisetit
// kysy tietty parametrisetti PUUTTUUU
// module.exports.api_put_machining_parameter_set = api_put_machining_parameter_set; // päivitä parametrisetti
// module.exports.api_delete_machining_parameter_set = api_delete_machining_parameter_set; // poista parametrisetti