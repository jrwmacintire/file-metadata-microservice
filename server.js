'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');

// require and use "multerconst.

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// @route POST '/api/fileanalyse'
// @desc Receives a form object and responds with the attached file's name, type, and size (in bytes).
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  const file = req.file;
  
  const response = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };
  
  res.status(200).send(response);
  
});


app.listen(process.env.PORT || 3000, function () {
  console.log('File Metadata Microservice listening ...');
});
