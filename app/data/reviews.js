import { API_URL } from "../config";

export const getReviews = (page = 1) =>
  fetch(API_URL + 'review?page=' + page)
    .then(res => res.json())
    .catch(err => console.log(err))
 
