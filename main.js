// Import module
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import config
const config = jsonfile.readFileSync('./config.json');

const router = require('./router');
const error = require('./errors/notFound');

let port = process.env.PORT;
if(config.mode == "local") port = config.port;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(express.json());

app.use(cors());

link = function linkStart(){
    return new Promise((resolve, reject) => {
      sequelizeConnection
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        resolve(true)
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
        throw new error.ServerError(err);
      })
    })
}

app.use('/', router);

app.get('/', function(req, res) {
    res.send('Hello World!, API is ready for u !')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500)
    res.send('server error')
})

app.listen(port, '0.0.0.0', function () {
    console.log(`Example app started on : ${port} port.`);
})