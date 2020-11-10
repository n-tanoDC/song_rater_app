export const getOptions = (body, token, method = 'POST') => {
  const headers = new Headers();
  let options = {};
  
  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }
  
  if (body) {
    headers.append('Content-Type', 'application/json');
    options.body = JSON.stringify(body);
  }

  return { ...options, method, headers };
}

export const getQuery = (query) => {
  return (
    'search?q=' + query + '&type=track,album&market=FR&limit=35&offset=0'
  )
}

export const getAuthOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}