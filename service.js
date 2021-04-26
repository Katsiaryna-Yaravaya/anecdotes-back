const Datastore = require('nedb');
const database = new Datastore('database.db');

const changeStatus = (id) => {
    database.loadDatabase();
    database.update({id: id}, { $set: {type: "success"} }, {}, function (err) {
        if(!err) {
            console.log("updated");
        }
    });
}
module.exports = {changeStatus}
