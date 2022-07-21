import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
export const validName = /^[A-Za-z]+$/;
export const validPhoneno = /^[0-9]{10}$/;
export const validPaasword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const ENDPOINTURL = "https://fea-backend.herokuapp.com/api/v1";
export const URL = "https://fea-backend.herokuapp.com/";

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

export const suceessUser = (Message) => {
  toast.success(Message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
