require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.WEBHOOK_PORT;

app.use(bodyParser.json());

app.post(`/hook/${process.env.WEBHOOK_PATH}`, (req, res) => {
  res.status(200).send({ message: 'OK', recievedMessage: req.body });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
