require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
// const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const path = require('path');
const fs = require('fs');
const dir = './uploads';
const { PythonShell } = require('python-shell');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const auth = require('./auth.js');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/auth', auth.routes);
require('./multerImpl')(app);
installHandler(app);

app.post('/calculate', (req, res) => {
  console.log('req.body'); console.log(req.body);
  const options = {
    mode: 'text',
    pythonPath: path.join(__dirname, '../gene2riskPythonEnv/Scripts/python.exe'),
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(__dirname, 'pythonScripts'),
    args: [path.join(__dirname, `uploads/temp/${req.body.uuid}.txt`).replace(/\\/g, '/')],
  };
  PythonShell.run('load.py', options, (error, results) => {
    if (error) console.log(error);
    // console.log('results:\n', results);
    res.send(results);
    // const url = require('url');
    // res.redirect(url.format({
    //   pathname:"/result",
    //   query: {
    //      'res': results,
    //    }
    // }));
  });
  return null;
});

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    // await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
