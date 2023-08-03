export const formattedDate = (value) => {
  return new Intl.DateTimeFormat().format(value)
}

export const formattedTime = (value) => {
  const timeOptions = {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    ...timeOptions,
  })
  return formatter.format(value)
}

export const formattedCurrency = (value) => {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })
  return currency.format(value)
}
