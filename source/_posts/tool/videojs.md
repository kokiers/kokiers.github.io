---
title: videojs
lang: tool
abbrlink: 48f09df7
date: 2020-12-03 10:13:18
tags:
---

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