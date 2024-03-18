import express from 'express'
import generarSHA from '../auth/autenticacion'

const router = express.Router()

router.get('/', (_req, res) => {
  const sha = generarSHA()
  res.send(`Transfers ${sha}`)
})

router.get('/:id', (_req, res) => {
  res.send('Transfers')
})

export default router
