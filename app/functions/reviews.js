import { API_URL } from "../config.local";
import { catchErrors, handleErrors } from "./errors";
import { getOptions } from "./helpers";


export const getAllReviews = (page, sortValue = 'created_at') => 
  fetch(API_URL + 'reviews?sortValue=' + sortValue + '&page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))

    
export const getRandomReviews = () => 
  fetch(API_URL + 'reviews/random')
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllFollowingReviews = (page, sortValue = 'created_at', user) =>
  fetch(API_URL + 'reviews/subscriptions?sortValue=' + sortValue + 'page=' + page, getOptions(null, user.token, 'GET'))
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneUser = (page, sortValue = 'created_at', user) => 
  fetch(API_URL + 'reviews/' + user.username + '?sortValue=' + sortValue + '&page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const getAllReviewsForOneMedia = (page, sortValue = 'created_at', media) =>
  fetch(API_URL + 'reviews/media/' + media.id + '?sortValue=' + sortValue + '&page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))


export const postReview = (body, token) =>
  fetch(API_URL + 'reviews', getOptions(body, token))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)

export const updateReviewVote = (type, review, token) => 
  fetch(API_URL + 'reviews/' + type + '/' + review._id, getOptions(null, token, 'GET'))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)
