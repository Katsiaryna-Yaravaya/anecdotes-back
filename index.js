const {changeStatus} = require('./service')
require('timers')
const express = require('express');
const Datastore = require('nedb');
const app = express();
const cors = require('cors')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const pdfTemplate = require('./documents');


app.use(express.urlencoded({extended: true}))
app.use(express.json())

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/', function (request, response) {
    database.loadDatabase();
    response.send(database.getAllData())
});

app.post('/create-pdf', (req, res) => {

    const bodyPDF = database.find({id: req.body.id}, function (err, docs) {
        const docPDF = docs.map((item) => item.jokes)
        pdf.create(pdfTemplate(docPDF), {}).toFile('result.pdf', (err) => {
            if (err) {
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        });
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.post('/', async function (request, response) {
    const newJokes = await getJokes()
    response.send([newJokes])
})

app.listen(8080, () => console.log('Server is up and running on port 8080'));

const getJokes = async () => {
    const jokes = {};
    await fetch('http://api.icndb.com/jokes/random/5', {
        method: 'get',
    })
        .then(res => res.json()
            .then(json => {
                jokes.id = Date.now().toString()
                jokes.type = "pending"
                jokes.jokes = json.value.map(item => item.joke)
            }))
    database.insert(jokes);
    setTimeout(() => {
        changeStatus(jokes.id)
    }, 3 * 1000);
    return jokes
}
// nodemon

