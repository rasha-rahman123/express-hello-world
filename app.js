const express = require("express");
const scdl = require('soundcloud-downloader').default
const fs = require('fs')

const randomFileName = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
const CLIENT_ID = 'ZzQw5OLejAQys1cYAUI2nUbLtZbBe5Lg'
const app = express();
const port = process.env.PORT || 3001;

var folder = './public/';
   

app.get('/sc', (req,res) => {
  const { url } = req.query
  res.type('json')
  const fileName = randomFileName() + '.mp3'


fs.readdir(folder, (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
      console.log(file + ' : File Deleted Successfully.');
      fs.unlinkSync(folder+file);
  }
  
});

  const writeStream = fs.createWriteStream(`./public/${fileName}`)

  
  scdl.download(url, CLIENT_ID).then(downloadedStream => downloadedStream.pipe(writeStream)).then(() => {
    writeStream.on('finish', () => {
      
      fs.readFile(`./public/${fileName}`, (err,data) => {
        if (err) {
          res.status(500).send(err)
          fs.unlink(`./public/${fileName}`, () => {})
    
  
        } else {
       res.status(200).json({
          url: `https://demoback.b-cdn.net/${fileName}`
       })
  
        }
        
      })
    }
  )
   })
})
app.get("/:dada", (req, res) => {
  const fileName = req.params.dada;
  const filePath = folder + fileName;
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'file/mp3',
    'Content-Disposition': 'attachment; filename=' + fileName });
    res.write(data);
    return res.end();
  })
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
