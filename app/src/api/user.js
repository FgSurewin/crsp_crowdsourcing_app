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
export const addCreateCredit = (data) =>
  myService.request({
    method: "POST",
    url: `/user/addCreateCredit`,
    data,
  });
export const addReviewCredit = (data) =>
  myService.request({
    method: "POST",
    url: `/user/addReviewCredit`,
    data,
  });
export const addValidateCredit = (data) =>
  myService.request({
    method: "POST",
    url: `/user/addValidateCredit`,
    data,
  });
