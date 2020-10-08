import { API_URL } from "../config";

// Authentication functions

export const login = (setUser, data, navigation) => {
  authenticate(data, 'login')
    .then(res => {
      const { user, token, reviews } = res;
      setUser({...user, token, reviews})
    })
    .then(() => navigation.navigate('Profile'))
    .catch(err => console.log(err))
}

export const register = data => {
  authenticate(data, 'signup')
}

export const logout = (callback, navigation) => {
  callback(null);
  navigation.navigate('Auth')
}

const authenticate = (body, action) =>
  fetch(API_URL + 'auth/' + action, getReqOptions(body))
    .then(res => res.json())
    .catch(err => console.log(err))


// User related functions

export const getUser = username => 
  fetch(API_URL + 'user/' + username)
    .then(res => res.json())
    .catch(err => console.log(err))

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

const getReqOptions = body => {
  return {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
}