const fetchApi = async (url) => {
  try {
    const initialFetch = await fetch(url)
    const result = await initialFetch.json()
    return result;
  } catch (error) {
    return 'API failed to load'
  }
}

export default fetchApi;