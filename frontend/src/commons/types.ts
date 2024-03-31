export type pasajeros = {
  adultos: number
  ninios: number
  infantes: number
}

export type Transfer = {
  id: number
  direction: string
  transferType: string
  vehicle: {
    code: string
    name: string
  }
  category: {
    code: string
    name: string
  }
  pickupInformation: {
    from: {
      code: string
      description: string
      type: string
    }
    to: {
      code: string
      description: string
      type: string
    }
    date: string
    time: string
    pickup: {
      address: string | null
      number: string | null
      town: string | null
      zip: string | null
      description: string | null
      altitude: number | null
      latitude: number
      longitude: number
      checkPickup: {
        mustCheckPickupTime: boolean
        url: string | null
        hoursBeforeConsulting: number | null
      }
      pickupId: string | null
      stopName: string | null
      image: string | null
    }
  }
  minPaxCapacity: number
  maxPaxCapacity: number
  content: {
    vehicle: {
      code: string
      name: string
    }
    category: {
      code: string
      name: string
    }
    images: Array<{
      url: string
      type: string
    }>
    transferDetailInfo: Array<{
      id: string
      name: string
      description: string
      type: string
    }>
    customerTransferTimeInfo: never[] // No hay información sobre este campo
    supplierTransferTimeInfo: never[] // No hay información sobre este campo
    transferRemarks: Array<{
      type: string
      description: string
      mandatory: boolean
    }>
  }
  price: {
    totalAmount: number
    netAmount: number | null
    currencyId: string
  }
  rateKey: string
  cancellationPolicies: Array<{
    amount: number
    from: string
    currencyId: string
    isForceMajeure: boolean | null
  }>
  links: Array<{
    rel: string
    href: string
    method: string
  }>
  factsheetId: number
}
