export const getReqOptions = body => {
  return {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
}

export const getQuery = (query, platform = 'spotify') => {
  switch(platform) {
    case 'spotify':
      return 'search?q=' + query + '&type=track,album,artist&market=FR'
      break;
  }
}