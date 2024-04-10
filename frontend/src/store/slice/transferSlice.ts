import { createSlice } from '@reduxjs/toolkit'
import { filter, get } from 'lodash'

export const transferSlice = createSlice({
  name: 'transfers',
  initialState: {
    transfers: [],
    transfersBooked: []
  },
  reducers: {
    listarTransfers: (state, { payload = [] }) => {
      state.transfers = payload
    },
    listarTransfersBooked: (state, { payload = [] }) => {
      state.transfersBooked = payload
    },
    modificarTransfer: (state, { payload = {} }) => {
      const currentState = state.transfers
      const newState = filter(currentState, (c) => get(c, ['reference']) !== get(payload, ['reference']))
      state.transfers = [...newState as never, payload] as never[]
    },
    deleteTransfer: (state, { payload = {} }) => {
      const currentState = state.transfers
      const newState = filter(currentState, (c) => get(c, ['reference']) !== get(payload, ['reference']))
      state.transfers = newState as never[]
    }
  }
})

export const { listarTransfers, modificarTransfer, deleteTransfer, listarTransfersBooked } = transferSlice.actions
