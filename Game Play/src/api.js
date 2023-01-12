import * as request from "../src/request.js";
import * as data from "../authService/data.js";
const baseUrl = "http://localhost:3030/users";
const dataUrl = "http://localhost:3030/data";

export const login = (email, password) =>
  request.post(`${baseUrl}/login`, { email, password }).then((user) => {
    data.savedUser(user);
    return user;
  });

export const register = (email, password) =>
  request.post(`${baseUrl}/register`, { email, password }).then((user) => {
    localStorage.setItem("user", JSON.stringify(user));
  });

export const logout = () =>
  fetch(`${baseUrl}/logout`, {
    headers: { "X-Authorization": data.getToken() },
  }).then(() => {
    data.deleteUser();
  });

export const catalogue = () => {
  return request.get(`${dataUrl}/games?sortBy=_createdOn%20desc`);
};

export const home = () => {
  return request.get(
    `${dataUrl}/games?sortBy=_createdOn%20desc&distinct=category`
  );
};

export const create = (title, category, maxLevel, imageUrl, summary) =>
  request.post(`${dataUrl}/games`, {
    title,
    category,
    maxLevel,
    imageUrl,
    summary,
  });

  export const getItem = (postId) =>  request.get(`${dataUrl}/games/${postId}`);
