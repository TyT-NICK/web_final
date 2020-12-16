const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const PORT = config.get('port') || 5000

const app = express()

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))// !!!!!!!!!!!!!!!!!!
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
}) // !!!!!!!!!!!!
app.use('/api/news', require('./routes/news.routes'))
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/album', require('./routes/album.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/event', require('./routes/event.routes'))
app.use('/api/groupInfo', require('./routes/groupInfo.routes'))
app.use('/api/member', require('./routes/member.routes'))
app.use('/api/merchCategory', require('./routes/merchCategory.routes'))
app.use('/api/', (req, res, next) => {
  res.status(417).json({ 'qwe': 'qwe' })
  // next();
})

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`))
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
