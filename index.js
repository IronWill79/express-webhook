require('dotenv').config();
const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.WEBHOOK_PORT;

app.use(bodyParser.json());

app.post(`/hook/${process.env.WEBHOOK_PATH}`, (req, res) => {
  exec('ls -la', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.status(500).send(error.message);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.status(500).send(stderr);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res
      .status(200)
      .send({ message: 'OK', recievedMessage: req.body, response: stdout });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
