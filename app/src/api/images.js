import { myService } from ".";

export const fetchRandomList = () =>
  myService.request({
    method: "GET",
    url: "/image/getRanList",
  });

export const fetchRandomImage = () =>
  myService.request({
    method: "GET",
    url: "/image/getRandomImage",
  });

export const fetchImage = (id) =>
  myService.request({
    method: "GET",
    url: `/image/getOneById/${id}`,
  });
export const fetchImagesByPano = (id) =>
  myService.request({
    method: "GET",
    url: `/image/getImagesByPano/${id}`,
  });

export const fetchToggle = (data) =>
  myService.request({
    method: "POST",
    url: `/image/toggle`,
    data,
  });

export const addLabeledArea = (data) =>
  myService.request({
    method: "POST",
    url: `/image/addLabelArea`,
    data,
  });
