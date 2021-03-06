import { get, post, patch, remove } from "./web.request";
import { ENDPOINTURL } from "../utils/helper";

export const categoryHndlerData = (body) => {
  return post(`${ENDPOINTURL}/category/list`, body);
};

export const productHndlerData = (body) => {
  return post(`${ENDPOINTURL}/product/list`, body);
};

export const userHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/signup`, body);
};

export const verifyHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/list`, body);
};

export const loginHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/signin`, body);
};

export const forgotpassHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/forgotPassword`, body);
};

export const headerimgHandle = (body) => {
  return post(`${ENDPOINTURL}/header/list`, body);
}
export const compassHandlerData = (body, id) => {
  return post(`${ENDPOINTURL}/user/verifyAndChangePassword/${id}`, body);
};

export const userHndlerData = (id) => {
  return get(`${ENDPOINTURL}/user/${id}`);
};

export const userupdateHandlerData = (id, body) => {
  return patch(`${ENDPOINTURL}/user/${id}`, body);
};

export const addcartHndlerData = (body) => {
  return post(`${ENDPOINTURL}/cart`, body);
};

export const cartHndlerData = (body) => {
  return post(`${ENDPOINTURL}/cart/list`, body);
};

export const cartproductdeleteHndlerData = (body) => {
  return remove(`${ENDPOINTURL}/cart`, body);
};

export const cartdeleteHndlerData = (body) => {
  return remove(`${ENDPOINTURL}/cart/clearAll`, body);
};
