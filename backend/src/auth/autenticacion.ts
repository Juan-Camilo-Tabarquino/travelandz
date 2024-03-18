import crypto from 'crypto'

function generarSHA (): string {
  const apiKey = '6c283a51234f840091c29b61fdb0a8cf'
  const secret = '79441ee756'

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const message = `${apiKey}${secret}${currentTimestamp}`

  const hash = crypto.createHash('sha256').update(message).digest('hex')

  return hash
}

export default generarSHA
