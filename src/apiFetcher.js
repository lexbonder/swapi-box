const fetchApi = async (url) => {
  const initialFetch = await fetch(url)
  const result = await initialFetch.json()
  return result;
}

export default fetchApi;