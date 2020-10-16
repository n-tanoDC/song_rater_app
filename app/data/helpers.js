export const getPostOptions = (body, token) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(body)
  }
}

export const getQuery = (query) => {
  return (
    'search?q=' + query + '&type=track,album&market=FR&limit=35&offset=0'
  )
}

export const getAuthOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}