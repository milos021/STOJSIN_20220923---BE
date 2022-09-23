const multer  = require('multer');
const upload = multer({ dest: './uploads', filename: function ( req, file, cb ) {
  cb( null, file.originalname+ '-' + Date.now()+".pdf");
},
limits: { fileSize: 209715200 },
fileFilter: (req, file, cb) => {
    if (file.mimetype == "video/mp4" || file.mimetype == "video/quicktime") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})
//controllers
import { VideosController } from "../controllers/video";
import express = require('express');

export const videoRoutes = express.Router();

const videoController = new VideosController()

//Routes
videoRoutes.get('/api/videoplayer', (req, res) => { videoController.playVideo(req, res)});
videoRoutes.get(`/api/videos`, (req, res) => { videoController.getAllVideos(req,res)})
videoRoutes.post('/api/upload', upload.single('video'), (req, res) => { videoController.createAVideo(req, res) })
videoRoutes.delete(`/api/video/:id`, (req, res) => { videoController.removeVideo(req,res)})
