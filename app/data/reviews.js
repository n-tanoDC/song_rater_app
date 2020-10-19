import { API_URL } from "../config";
import { getOptions } from "./helpers";

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
  fetch(API_URL + 'reviews', getOptions(body, token))
    .then(res => {
      switch(res.status) {
        case 201:
          return res.json();
        case 409:
          return new Error('Vous avez déjà publié une critique sur ce contenu.')
        default:
          return new Error('Une erreur s\'est produite. Réessayer ultérieurment.')
      }
    })
    .catch(err => console.log(err))
