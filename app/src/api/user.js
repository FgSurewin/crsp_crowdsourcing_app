import { myService } from ".";

export const signUp = (data) =>
  myService.request({
    method: "POST",
    url: `/user/addUser`,
    data,
  });
export const login = (data) =>
  myService.request({
    method: "POST",
    url: `/user/login`,
    data,
  });

export const addImages = (data) =>
  myService.request({
    method: "POST",
    url: `/user/addImages`,
    data,
  });
