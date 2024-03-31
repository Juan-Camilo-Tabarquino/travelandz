import express from 'express'
import cors from 'cors'
import transfersRouter from './routes/tranfers'

const app = express()
app.use(express.json())

const port = 9000

app.use(cors())
app.use('/api/transfers', transfersRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
