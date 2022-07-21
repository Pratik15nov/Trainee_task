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

// export const softDelete = async (url, data) => {
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

// export const patch = async (url, data) => {
//   const response = await axios
//     .put(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return response;
// };

export const post = async (url, data) => {
  const response = await axios

    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};
