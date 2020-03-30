export default function toTimeString(timeString) {
  let hours = Number(timeString.split(":")[0])
  let minutes = Number(timeString.split(":")[1])
  let amOrPm = "" 

  if (hours === 12) {
    amOrPm = "PM"
  } else if (hours < 12) {
    amOrPm = "AM"
  } else {
    hours -= 12
    amOrPm = "PM"
  }

  minutes = ("0" + minutes).slice(-2)

  return `${hours}:${minutes} ${amOrPm}`
}