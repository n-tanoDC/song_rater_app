import { API_URL } from "../config";
import { getReqOptions } from "./functions";

export const authenticate = (body, action) => {
  return (
    fetch(API_URL + 'auth/' + action, getReqOptions(body))
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

export const addToFavorites = (element_id, userContext) => {
  const { user, setUser } = userContext;
  const id = user._id

  fetch(API_URL + 'user/favorites?secret_token=' + user.token, getReqOptions({ element_id, id }))
    .then(() => {
      let add = user.favorites.find(fav => fav === element_id);
      if (!add) {
        const newFavs = [...user.favorites, element_id];
        setUser({...user, favorites: newFavs});
      } 
    })
    .catch(err => console.log(err))
}