import { API_URL } from "../config"
import { getReqOptions } from "./functions"

export const createList = (body, token) => 
  fetch(API_URL + 'user/lists?secret_token=' + token, getReqOptions(body))
    .then(res => res.json())
    .catch(err => console.log(err))
