require('dotenv').config();
const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.WEBHOOK_PORT;

app.use(bodyParser.json());

app.post(`/hook/:path`, (req, res) => {
  console.log(req.params.path);
  if (req.params.path !== process.env.WEBHOOK_PATH) {
    return;
  }
  exec(process.env.SHELL_SCRIPT, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(JSON.stringify(error));
      return;
    }
    if (stderr) {
      res.status(500).send(JSON.stringify(stderr));
      return;
    }
    res
      .status(200)
      .send({ message: 'OK', recievedMessage: req.body, response: stdout });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
