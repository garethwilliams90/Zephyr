export default function extractFirstName(fullName: string) {
  const names = fullName.split(" ")
  if (names.length > 0) {
    return names[0]
  }
  return "" // Return an empty string if the input is not in the expected format
}
