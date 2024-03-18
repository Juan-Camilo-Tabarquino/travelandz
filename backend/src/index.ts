import express from 'express'
import transfersRouter from './routes/tranfers'

const app = express()
app.use(express.json())

const port = 9000

app.use('/api/transfers', transfersRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
