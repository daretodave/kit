const enforce = require('express-sslify');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

if (process.env.ENFORCE_TLS) {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
