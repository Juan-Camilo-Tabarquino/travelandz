import crypto from 'crypto'

function generarSHA (): string {
  const apiKey = 'c3cd403d5767157b37e931461fabe51b'
  const secret = '71cf5113e6'

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const message = `${apiKey}${secret}${currentTimestamp}`

  const hash = crypto.createHash('sha256').update(message).digest('hex')

  return hash
}

export default generarSHA
