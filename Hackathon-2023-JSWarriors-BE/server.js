const model = require('./models/index');

require('dotenv').config();
const port = process.env.PORT;
const app = require("./router");

app.listen(
    port, () => {
        console.log(process.env.NODE_ENV, 'server is running on port:', port);
    });

try {
    model.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}