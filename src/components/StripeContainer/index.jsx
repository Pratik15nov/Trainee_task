import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../StripeCheckoutForm";
import "../StripeCheckoutForm/stripeCheckoutform.css";
import { stripeDataHandler } from "../../service/auth.service";

const stripePromise = loadStripe(
  "pk_test_51LSJbrSHKwWbek0RdMI41YlCVTN8q8I1nfAQChA0PB7aM0tDeHKPrLqsyODOCRnQUSSFIhEl46I0DXbkd5ohYGNH001OzGcrNP"
);

export default function StripeContainer() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getClientSecret();
  }, []);

  const getClientSecret = async () => {
    const response = await stripeDataHandler();
  console.log("RESPONSE",response)
    if (response) {
      setClientSecret(response);
    } else {
      console.log("API CALL ERROR");
    }
    
  };

console.log("CLIENTSECRET",clientSecret)
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
}
