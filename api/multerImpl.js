module.exports = (app) => {
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      console.log('enter 1');
      // Mimetype stores the file type, set extensions according to filetype
      let ext;
      switch (file.mimetype) {
        case 'image/jpeg':
          ext = '.jpeg';
          break;
        case 'image/png':
          ext = '.png';
          break;
        case 'image/gif':
          ext = '.gif';
          break;
        default:
          ext = 'txt';
          break;
      }
      // console.log('req: ');
      // console.log(req);
      cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
    }
  });
  const upload = multer({ storage });

  app.post('/23meupload', upload.single('file'), (req, res, next) => {
    console.log('enter 2');
    if (req.file && req.file.originalname) {
      console.log(`Received file ${req.file.originalname}`);
    }

    res.send({ responseText: req.file.path }); // You can send any response to the user here
  });
}
