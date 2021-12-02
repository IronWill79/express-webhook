require('dotenv').config();
const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.WEBHOOK_PORT;
let rebuilding = false;

app.use(bodyParser.json());

app.post(`/hook/:path`, (req, res) => {
  if (req.params.path !== process.env.WEBHOOK_PATH) {
    return;
  }
  if (process.env.TESTING !== false && !rebuilding) {
    rebuilding = true;
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
      rebuilding = false;
    });
    res.status(200).send({ message: 'Rebuild started' });
  } else {
    res.status(200).send({ message: 'Rebuilding' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
