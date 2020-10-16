export const getPostOptions = body => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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