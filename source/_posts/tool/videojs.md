---
title: 视频播放 videojs
lang: tool
abbrlink: 48f09df7
date: 2020-12-03 10:13:18
tags:
 - video
---

视频播放

<!-- more -->
```bash
  <video id="videoPlayer"></video>
  import videojs from 'video.js'
  import flvjs from 'flv.js'
  import 'videojs-flash'
  import 'videojs-flvjs'
  import swfUrl from '@/assets/social/video-js.swf'
      let options = {
        techOrder: ["html5", "flash"],
        flash: {
          swf: swfUrl
        },
        sources:[{
          src: v.url,
          type: 'video/' + v.type
        }],
        controls: true,
        preload: "auto",
        width: "200px",
        height: "100px",
        languages: {
          "zh-CN": require("video.js/dist/lang/zh-CN.json")
        },
        language: "zh-CN",
        notSupportedMessage:'暂不支持此类视频播放',
      }

      let videoDom = document.getElmentById('videoPlayer'),
      player = videojs(videoDom,options,function onPlayerReady(){
        player.on('error',err=>{
          options.sources.length > 0 && player.src({
            src: options.sources[0].src,
            type: 'video/x-flv' 
          })
        })
      })
      player.addClass('video-js')
      player.addClass('vjs-default-skin')
      player.addClass('vjs-big-play-centered')
      
   
  销毁
    if (player) {
      player.dispose()
    }
```


视频通过 FFmpeg 转换成MP4
```bash
  <video autobuffer autoloop loop controls id="myvideo"></video>
  <script src="/ffmpeg.min.js"></script>
  <script type="text/javascript" charset="utf-8" >
    const { createFFmpeg, fetchFile } = FFmpeg;
    let url = '/e813f92ebaa7dc24472e6fb05aa2f607(1006489).avi', vType = 'avi'
    let isTrans = !['mp4','webm'].includes(vType)
    isTrans && tranforVideo(url)
    async function tranforVideo(file){
      const ffmpeg = createFFmpeg({
        log: true,
      });
      let name = 'transVideo', outName = 'my.mp4';
      await ffmpeg.load();
      ffmpeg.FS('writeFile', name, await fetchFile(file));
      await ffmpeg.run('-i', name, outName);
      const data = ffmpeg.FS('readFile', outName);
      let obj = {
        src: URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })),
        type: 'video/mp4' 
      }
      let video = document.getElementById('myvideo')
      video.src = obj.src
    }
```