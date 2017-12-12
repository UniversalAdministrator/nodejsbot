const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const imageSearchController = require('./controllers/imageSearch');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verificationController);
app.post('/', messageWebhookController);
app.post('/image-search', imageSearchController);

app.listen(5000, () => console.log('Webhook server is listening, port 5000'));
