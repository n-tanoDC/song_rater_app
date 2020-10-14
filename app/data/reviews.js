import { API_URL } from "../config";

export const getReviews = (user, page = 1) => {
  const userParams = user ? 'users/' + user.username + '/' : '';
  return (
  fetch(API_URL + userParams + 'reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}
