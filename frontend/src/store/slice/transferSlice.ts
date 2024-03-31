import { createSlice } from '@reduxjs/toolkit'

export const transferSlice = createSlice({
  name: 'transfers',
  initialState: {
    transfers: []
  },
  reducers: {
    listarTransfers: (state, { payload = [] }) => {
      state.transfers = payload
    }
  }
})

export const { listarTransfers } = transferSlice.actions
