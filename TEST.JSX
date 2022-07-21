import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Field is required*"),
  email: yup.string().email().required("Field is required*"),
  phoneNumber: yup
    .number()
    .required("Field is required*")
    .typeError("Value must be a number*"),
  message: yup.string().required("Please provide your message*")
});

function App() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="App">
      <form className="contact-form" onSubmit={handleSubmit(submitForm)}>
        <h2>Send Us a Message </h2>
        <p>
          <label for="name">Name</label>
          <input name="name" type="text" {...register("name")} />
          <p className="error-msg"> {errors.name?.message} </p>
        </p>

        <p>
          <label for="email">Email</label>
          <input name="email" type="text" {...register("email")} />
          <p className="error-msg"> {errors.email?.message} </p>
        </p>

        <p>
          <label for="phoneNumber">Phone</label>
          <input
            name="phoneNumber"
            type="text"
            {...register("phoneNumber", {
              setValueAs: (v) => {
                return v === "" ? undefined : parseInt(v, 10);
              }
            })}
          />
        </p>
        <p className="error-msg"> {errors.phoneNumber?.message} </p>
        <input type="submit" id="submit" />
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
