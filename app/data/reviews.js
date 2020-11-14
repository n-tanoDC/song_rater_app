import { API_URL } from "../config";
import { catchErrors, handleErrors } from "./errors";
import { getOptions } from "./helpers";


export const getAllReviews = (page) => 
  fetch(API_URL + 'reviews?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllFollowingReviews = (page, user) =>
  fetch(API_URL + 'reviews/subscriptions?page=' + page, getOptions(null, user.token, 'GET'))
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneUser = (page, user) => 
  fetch(API_URL + 'reviews/' + user.username + '?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneMedia = (page, media) =>
  fetch(API_URL + 'reviews/media/' + media.id + '?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const postReview = (body, token) =>
  fetch(API_URL + 'reviews', getOptions(body, token))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)
