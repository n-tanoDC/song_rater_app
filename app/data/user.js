import { API_URL } from "../config";
import { getReqOptions } from "./functions";

export const authenticate = (body, action) => {
  return (
    fetch(API_URL + 'auth/' + action, getReqOptions(body))
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

export const addToFavorites = (element_id, user) => {
  const id = user._id;

  fetch(API_URL + 'user/favorites?secret_token=' + user.token, getReqOptions({ element_id, id }))
    .then(() => {
      let add = user.favorites.find(fav => fav === element_id);
      if (!add) {
        user.favorites.push(element_id)
      }
    })
    .catch(err => console.log(err))
}