const express = require('express');
const router = express.Router();
const UserCtrl = require('../controller/user');
const cloudinary = require('cloudinary');
const upload = require('../services/image-upload');

// const singleUpload = upload.single('image');

router.post(
  '/image-upload',
  upload.single('image'),
  UserCtrl.checkAuth,
  function(req, res) {
    cloudinary.v2.uploader.upload(
      req.file.path,
      { folder: 'bwn-ng', use_filename: true, unique_filename: false },
      function(err, result) {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'Image Upload Error', detail: err.message }]
          });
        }
        return res.json({ imageUrl: result.secure_url });
        // req.body.campground.image = result.secure_url;
        // req.body.campground.imageId = result.public_id;
      }
    );
  }
);

module.exports = router;
