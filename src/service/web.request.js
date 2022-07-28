import axios from "axios";
export const get = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

// export const remove  = async (url, data) => {
//   const response = await axios
//     .delete(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return response;
// };
export const remove = async (url, data) => {
  const response = await axios
    .delete(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const patch = async (url, data) => {
  const response = await axios
    .patch(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const post = async (url, data) => {
  return await axios
    .post(url, data)
    .then((res) => {
      // console.log( "res",res);
      return res;
    })
    .catch((err) => {
      // console.error("Error:", err?.response?.data);
      return err?.response?.data;
    });
};
