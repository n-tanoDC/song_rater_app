import { API_URL } from "../config";
import { getOptions } from "./helpers";


export const getAllReviews = (page = 1) => 
  fetch(API_URL + 'reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneUser = (page = 1, user) => 
  fetch(API_URL + 'users/' + user.username + '/reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneMedia = (page = 1, media) =>
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
          console.log(res);
          return new Error('Une erreur s\'est produite. Réessayer ultérieurment.')
      }
    })
    .catch(err => console.log(err))
