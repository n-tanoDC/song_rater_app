import { API_URL } from "../config";
import { showToast } from "../functions";
import { getOptions } from "./helpers";


export const getAllReviews = (page) => 
  fetch(API_URL + 'reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllFollowingReviews = (page, user) =>
    fetch(API_URL + 'users/account/following/reviews?page=' + page, getOptions(null, user.token, 'GET'))
      .then(res => res.json())
      .catch(err => console.log(err))


export const getAllReviewsForOneUser = (page, user) => 
  fetch(API_URL + 'users/' + user.username + '/reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneMedia = (page, media) =>
  fetch(API_URL + 'reviews/media/' + media.id + '?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


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
    .catch(() => {
      console.log(error); 
      showToast()
    })
