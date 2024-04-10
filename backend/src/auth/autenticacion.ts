import crypto from 'crypto'
import 'dotenv/config'

function generarSHA (): string {
  const API_KEY = process.env.API_KEY ?? ''
  const SECRET = process.env.SECRET ?? ''
  const currentTimestamp = Math.floor(Date.now() / 1000)

  const message = `${API_KEY}${SECRET}${currentTimestamp}`

  const hash = crypto.createHash('sha256').update(message).digest('hex')

  return hash
}

export default generarSHA
