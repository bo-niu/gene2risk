function getFileExtension(filename) {
  return filename.split('.').pop();
}

const fs = require('fs');

module.exports = (app) => {
  const multer = require('multer');
  // const storage = multer.diskStorage({
  //   destination: './uploads/temp/',
  //   filename: (req, file, cb) => {
  //     if (!req.file || !req.file.originalname) {
  //       return;
  //     }
  //     const ext = getFileExtension(req.file.originalname);
  //     var stream = fs.createWriteStream(`${req.body.uuid}.${ext}`, {flags:'a'});

  //     [...Array(10000)].forEach( function (item,index) {
  //         stream.write(index + "\n");
  //     });
  //     console.log(new Date().toISOString());
  //     stream.end();
  //     cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
  //   }
  // });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  app.post('/23meupload', upload.single('file'), (req, res, next) => {
    // if (req.file && req.file.originalname) {
    //   console.log(`Received file ${req.file.originalname}`);
    //   console.log(req.body.data);
    // }
    if (req.file && req.file.originalname) {
      // const ext = getFileExtension(req.file.originalname);
      // var stream = fs.createWriteStream(`./uploads/temp/${req.body.uuid}.${ext}`, {flags:'a'});
      // stream.write(req.file.buffer);
      const ext = getFileExtension(req.file.originalname);
      fs.appendFileSync(`./uploads/temp/${req.body.uuid}.${ext}`, req.file.buffer); 

    }

    res.send({ responseText: req.file.path }); // You can send any response to the user here
  });
}
