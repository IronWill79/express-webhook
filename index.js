require('dotenv').config();
const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.WEBHOOK_PORT;

app.use(bodyParser.json());

app.post(`/hook/:path`, (req, res) => {
  console.log(req.body);
  if (req.params.path !== process.env.WEBHOOK_PATH) {
    return;
  }
  if (process.env.TESTING !== false) {
    exec(process.env.SHELL_SCRIPT, (error, stdout, stderr) => {
      if (error) {
        console.error(JSON.stringify(error));
        return;
      }
      if (stderr) {
        console.error(JSON.stringify(stderr));
        return;
      }
      console.log(JSON.stringify(stdout));
    });
  }
  res.status(200).send({ message: 'OK' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
