import * as request from "./src/request.js";

const baseUrl = `http://localhost:3030/users`;
const dataUrl = `http://localhost:3030/data/offers`;
let applyUrl = `http://localhost:3030/data`;

export const savedUser = (user) => {
  if (user.accessToken) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const deleteUser = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  let serializaedUser = localStorage.getItem("user");
  if (serializaedUser) {
    let user = JSON.parse(serializaedUser);
    return user;
  }
};

export const getToken = () => (getUser() ? getUser().accessToken : undefined);

export const login = (email, password) =>
  request.post(`${baseUrl}/login`, { email, password }).then((user) => {
    savedUser(user);
    return user;
  });

export const register = (email, password) =>
  request
    .post(`${baseUrl}/register`, { email, password })
    .then((user) => {
      savedUser(user);
      return user;
    })
    .catch((er) => alert`Unsuccessfully register!`);

export const logout = () =>
  fetch(`${baseUrl}/logout`, {
    headers: { "X-Authorization": getToken() },
  }).then(() => {
    deleteUser();
  });

export async function dashboardView(){ 
 return  request.get(`${dataUrl}?sortBy=_createdOn%20desc`)}
export const getOneItem = (postId) => request.get(`${dataUrl}/${postId}`);

export const create = (
  title,
  imageUrl,
  category,
  description,
  requirements,
  salary
) =>
  request.post(`${dataUrl}`, {
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary,
  });

export const edit = (
  postId,
  title,
  imageUrl,
  category,
  description,
  requirements,
  salary
) =>
  request.put(`${dataUrl}/${postId}`, {
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary,
  });

  export const del = (postId) => request.del(`${dataUrl}/${postId}`).then(res => new Date(res));

  export const apply =(offerId) => request.post(`${applyUrl}/applications`, {offerId});

  export const allApply =(postId)=> request.get(`${applyUrl}/applications?where=offerId%3D%22${postId}%22&distinct=_ownerId&count`)

  export const getOfferCount = (postId,userId) => request.get(`${applyUrl}/applications?where=offerId%3D%22${postId}}%22%20and%20_ownerId%3D%22${userId}%22&count`)