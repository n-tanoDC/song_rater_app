import { API_URL } from "../config";

export const getReviews = () => 
  fetch(API_URL + 'review')
    .then(res => res.json())
    .catch(err => console.log(err))
