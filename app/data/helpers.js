export const getOptions = (body, token, method = 'POST') => {
  const headers = new Headers();
  let newBody = body;
  
  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }
  
  if (body && !(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
    newBody = JSON.stringify(body);
  }
  
  return { body: newBody, method, headers };
}

export const getQuery = (query) => {
  return (
    'search?q=' + query + '&type=track,album,artist&market=FR&limit=35&offset=0'
  )
}

export const getAuthOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}