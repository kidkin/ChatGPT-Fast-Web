export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hours, minutes, seconds].map(formatNumber).join(':')
  )
}

function formatNumber(n: number): string {
  const str = n.toString()
  return str[1] ? str : '0' + str
}
