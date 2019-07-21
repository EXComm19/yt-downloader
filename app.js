const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/scrape', (req, res) => {
    const yt = req.body.url
    const url = yt.split("watch?v=")[1]

    if (url == null || url === "") {
         res.json("Invalid URL")
         return
    }
    res.header('Content-Disposition', `attachment; filename="${url}.mp4"`)
    ytdl(`https://www.youtube.com/watch?v=${url}`, { filter: (format) => format.container === 'mp4' })
        .pipe(res)
})