export const getOptions = (body, token, method = 'POST') => {
  const headers = new Headers();
  let reqBody,
      options = { method, headers }
  headers.append('Authorization', 'Bearer ' + token);

  if (body) {
    headers.append('Content-Type', 'application/json');
    reqBody = JSON.stringify(body)
    options.body = reqBody
  }

  return options
}

export const getQuery = (query) => {
  return (
    'search?q=' + query + '&type=track,album&market=FR&limit=35&offset=0'
  )
}

export const getAuthOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}