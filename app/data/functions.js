export const getReqOptions = body => {
  return {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
}

export const getQuery = (query, platform = 'spotify', type = 'artist', limit = '20') => {
  switch(platform) {
    case 'spotify':
      return 'search?q=' + query + '&type=' + type + '&market=FR&limit=' + limit + '&offset=0'
      break;
  }
}