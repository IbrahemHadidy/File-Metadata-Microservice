require('dotenv').config()
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'private/upload/');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSize = req.file.size;

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
});
