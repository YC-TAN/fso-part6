export const getResources = async (baseUrl) => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch country')
    }
    return await response.json()
}

export const createNew = async (baseUrl, content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
    }
    const response = await fetch(baseUrl, options)
    
    if (!response.ok) {
        throw new Error('Failed to create note')
    }
    
    return await response.json()
}