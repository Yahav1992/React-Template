import config from "./requestsConfig";
import API from './apiConfiguration'

const {hosts} = config;
const BASE_URL = hosts.springRestApi;
const buildUrl = relativeUrl => BASE_URL + relativeUrl;

export const getAllUsers = () => API.get(buildUrl("/users"))
export const getUserByID = (userID) => API.get(buildUrl("/users/"+userID))
export const createUser = (user) => API.post(buildUrl("/users"),user)
export const loginUser = (user) => API.post(buildUrl("/login"),user)
export const deleteUser = (userID) => API.delete(buildUrl("/users/"+userID))
