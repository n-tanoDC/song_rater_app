import { API_URL } from "../config";
import { getPostOptions } from "./helpers";

// get all reviews from one or every users
export const getReviews = (user, page = 1) => {
  // add a string to the fetch URL if there's a user specified in the params
  const userParams = user ? 'users/' + user.username + '/' : '';
  return (
  fetch(API_URL + userParams + 'reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

// post a review to the API
export const postReview = (body, token) =>
  fetch(API_URL + 'reviews?secret_token=' + token, getPostOptions(body))
    .then(res => {
      if (res.status === 201) {
        return res.json()
      } else {
        throw new Error('Une erreur s\'est produite.')
      }
    })
    .catch(err => console.log(err))
