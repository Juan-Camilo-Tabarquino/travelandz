/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express from 'express'
import cors from 'cors'
import transfersRouter from './routes/tranfers'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/transfers', transfersRouter)

const defaultPort = 9000

const tryListen = (
  port: number
) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  }).on('error', (err) => {
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    if (err.code === 'EADDRINUSE') {
      // Si el puerto está ocupado, intenta con el siguiente
      const newPort = port + 1
      console.log(`Port ${port} is already in use, trying with port ${newPort}`)
      tryListen(newPort) // Intenta escuchar nuevamente
    } else {
      // Si ocurre otro error, imprímelo
      console.error(err)
    }
  })
}

tryListen(defaultPort)
