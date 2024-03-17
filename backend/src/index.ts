import express from 'express'

const app = express()
app.use(express.json())

const port = 9000

app.get('/ping', (_, res) => {
  console.log('someone pinged')
  res.send('pong')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
