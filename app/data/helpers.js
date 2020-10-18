export const getOptions = (body, token, method = 'POST') => {
  return {
    method: method,
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