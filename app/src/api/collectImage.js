import { myService } from ".";

export const createImage = (data) =>
  myService.request({
    method: "POST",
    url: `/collectImage/createImage`,
    data,
  });

export const fetchStreetViewImagesByPano = (id) =>
  myService.request({
    method: "GET",
    url: `/collectImage/getImagesByPano/${id}`,
  });

export const fetchStreetViewToggle = (data) =>
  myService.request({
    method: "POST",
    url: `/collectImage/toggle`,
    data,
  });

export const fetchStreetViewImageById = (id) =>
  myService.request({
    method: "GET",
    url: `/collectImage/getOneById/${id}`,
  });

export const addStreetViewLabeledArea = (data) =>
  myService.request({
    method: "POST",
    url: `/collectImage/addLabelArea`,
    data,
  });
export const addStreetViewMarkers = (data) =>
  myService.request({
    method: "POST",
    url: `/collectImage/addMarkers`,
    data,
  });