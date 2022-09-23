import * as express from 'express';
import { Videos } from '../../models/video';
var ffprobe = require('ffprobe-static');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobe.path);
var uuid = require('uuid');
import fs from 'fs';
import { Categories } from '../../models/category';
 
export class VideosController {
 
  constructor() {
  }
 
  getAllVideos = ((request: express.Request, response: express.Response) => {
    Videos.findAll({
      include: Categories,
    }).then(videos => response.json(videos)).catch((e) => {  
      response.send(e);
  });
  });

  playVideo = ((req, res) => {
    const range = req.headers.range;
    const videoPath = req.query.path;
    // const videoPath = `./uploads/${videoId}`;
    const videoSize = fs.statSync(videoPath).size;

    if (range) {
      const rangeStringParts = range.replace(/bytes=/, '').split('-');
  
      const bytesStart = parseInt(rangeStringParts[0]);
      const bytesEnd = rangeStringParts[1]
        ? parseInt(rangeStringParts[1])
        : videoSize - 1;
  
      const CHUCK_SIZE = bytesEnd - bytesStart + 1; // 1MB
  
      const videoStream = fs.createReadStream(videoPath, {
        start: bytesStart,
        end: bytesEnd,
      });
      const headers = {
        'Content-Range': `bytes ${bytesStart}-${bytesEnd}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': CHUCK_SIZE,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);
  
      videoStream.pipe(res);
      return;
    }
  
    const headers = {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    };
  
    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  });
 
  createAVideo = ((req, res) => {
    ffmpeg(req.file.path)
    .on('end', function(value) {
      console.log('Screenshots taken');
      const video = {
        uuid: uuid.v1(),
        title: req.body.title,
        categoryId: req.body.categoryId,
        path: req.file.path,
        thumbnail: `http://localhost:3000/thumbnails/${req.file.filename}.jpg`
     }
      Videos.create( video ).then(function(video) {
          res.json(video);
        }).catch((e) => {  
          res.send(e);
      });
    })
    .on('error', function(err) {
      console.error(err);
    })
    .screenshots({
      count: 1,
      filename: '%f.jpg',
      folder: './thumbnails',
      size: '256x256'
    });

  });

  removeVideo = ((req, res) => {
    Videos.destroy({
      where: {
         id: req.params.id
      }
    }).then(() => {
      res.send({id: req.params.id});
    }).catch((e) => {  
      res.send(e);
  });
    }
    )


}
