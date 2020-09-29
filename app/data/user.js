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