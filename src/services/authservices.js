
import { ENDPOINTURL } from "../utils/helper";
import { post } from "../webrequests";

export const sendData = (payload) => {
    return post(`${ENDPOINTURL}/register/registerUser`, payload);
  };