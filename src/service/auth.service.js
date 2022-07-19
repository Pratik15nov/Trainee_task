import { post } from "./web.request";
import { ENDPOINTURL } from "../utils/helper";

export const categoryHndlerData = (body) => {
  return post(`${ENDPOINTURL}/category/list`, body);
};
