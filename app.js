const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const router =  require('./src/routes/routes');
const openApiDocumentation = require('./src/swagger/openApiDocumentation')
const swaggerUi = require('swagger-ui-express')

const app = express();
const port = process.env.PORT || 5000;
const connectToDatabase = require('./src/db/mongoose');

dotenv.config();
 connectToDatabase(); //This removed to simplify the connection



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', router);

app.use('/src', express.static('img'))

app.get('/postman', (req, res) =>{
    res.sendFile(path.join(__dirname, '/src/public', 'index.html'));
});

app.listen(port, () => console.log(`Team Granite App is running on port: ${port}`));
