import { API_URL } from "../config";

export const authenticate = (body, action) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  return (
    fetch(API_URL + 'auth/' + action, options)
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

export const addToFavorites = (element_id, user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({element_id: element_id, id: user._id})
  }

  fetch(API_URL + 'user/favorites?secret_token=' + user.token, options)
    .then(res => res.json())
    .catch(err => console.log(err))
}