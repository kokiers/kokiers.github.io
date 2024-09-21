---
title: koa-ffmpeg
lang: tool
abbrlink: 654263c0
date: 2021-03-26 16:20:54
categories:
 - tool
tags:
---

web端播放视频，碰到有些格式不能正常播放，那样就可以对视频进行转换再播放。比如本文提到的 ffmpeg
<!-- more -->

服务器设置header
```javaScript
const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('@koa/router')();
const koaBody = require('koa-body');
const serve = require("koa-static")
const Koa = require('koa');
const app = module.exports = new Koa();

// "database"

const posts = [];

// middleware

app.use(logger());
app.use(serve(__dirname + "/static"));

app.use(render);

app.use(koaBody());

// route definitions

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx) {
  ctx.set('Cross-Origin-Embedder-Policy','require-corp')
  ctx.set('Cross-Origin-Opener-Policy','same-origin')
  await ctx.render('list', { posts: posts });
}

/**
 * Show creation form.
 */

async function add(ctx) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post: post });
}

/**
 * Create a post.
 */

async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

// listen

if (!module.parent) app.listen(3000);
```

#### 在vue中使用

```vue
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
  </script>
  ```
  ```
  //新版本
  
  import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

export default {
  data(){
    return {
      ffmpegInstance: null,
      initTransStaus: false,
      lastTrans: null,
    }
  },
  methods:{
    async checkLoad(){
      this.ffmpegInstance = new FFmpeg();
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = this.ffmpegInstance;
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      this.initTransStaus = true
    },
    async transCode(videoURL,type){
      const ffmpeg = this.ffmpegInstance;
      let tempArr = videoURL.split("."), fileExt = "amr";
      if (Array.isArray(tempArr) && tempArr.length > 1) {
        fileExt = tempArr[tempArr.length - 1];
        if (fileExt == 'wav') {
          fileExt = 'amr';
        }
      }
      if (this.lastTrans == videoURL) {
        return
      }
      this.lastTrans = videoURL;
      const ouputFileName = type == 1 ? "ouput.mp3" : "ouput.mp4";
      const inputFileName = type == 1 ? "input." + fileExt : "input." + fileExt;
      await ffmpeg.writeFile(inputFileName, await fetchFile(videoURL));
      await ffmpeg.exec(["-i", inputFileName, ouputFileName]);
      const fileData = await ffmpeg.readFile(ouputFileName);
    //  let datas = URL.createObjectURL(new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' }))
      const data = new Uint8Array(fileData);
      let newUrl = URL.createObjectURL(
        new Blob([data.buffer], { type: 'video/mp4' })
      )
      console.log(newUrl,'????')
    }
  }
}
```