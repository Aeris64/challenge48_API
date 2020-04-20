# Scenarium_API

"Scenarium_API" is an API working with the "Scenarium" role-playing software.

The API can be configured using the config.json file.
Inside this file you will find all the necessary information to connect to the Scenarium project database.

`Example config.json`
```JSON
{
    "mode": "local",
    "user": "myUser",
    "pass": "myPass",
    "host": "myHost",
    "name": "databaseName",
    "port": 3042,
    "type": "mysql",
    "key": "keyApi"
}
```

Scenarium_API is made to work with the database for this project. The database has 26 tables including 11 binary or ternary relations.
You can click on this [link](https://drive.google.com/open?id=1klrCEUShZUPvwXurWRmmIQJmZUL1hciR) to access the MCD of the Scenarium database.

## Launch

Don't forget to install the packages (`npm i`) needed to use Scenarium, the list above.

After that you will just have to launch the project with the following command:
`./nodemon main.js`

## Install needed :
- npm i sequelize
- npm i express
- npm i --save body-parser
- npm i jsonfile
- npm i -g nodemon