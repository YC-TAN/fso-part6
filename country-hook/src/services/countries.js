const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

export const getCountry = async (name) => {
  const response = await fetch(`${baseURL}${name}`)
  if (!response.ok) {
    throw new Error('Failed to fetch country')
  }
  return await response.json()
}