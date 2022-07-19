export const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
export const validName = /^[A-Za-z]+$/;
export const validPhoneno = /^[0-9]{10}$/;
export const validPaasword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const ENDPOINTURL = "http://localhost:3000/api/v1";
export const URL = "http://localhost:3000/";

export const EventEmitter = {
  events: {},

  dispatch: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },

  subscribe: function (event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
};

export const listBody = (data) => {
  return {
    where: data.where,
    pagination: {
      sortBy: data?.sortBy ? data.sortBy : "createdAt",
      descending: true,
      rowsPerPage: data?.perPage ? data.perPage : 5,
      page: data?.page ? data.page : 1,
    },
  };
};
