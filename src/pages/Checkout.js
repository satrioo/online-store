import React, { useState } from "react";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Summary from "../components/SummaryCheckout";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;
  state.map((item) => {
    return (subtotal += item.price * item.qty);
  });

  state.map((item) => {
    return (totalItems += item.qty);
  });

  const PayPalButtonComponent = () => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const initialOptions = {
      "client-id":
        "ASbBTTlZN3iTrceQDn3XoQ249vyEAE939odiC3aeCYb2Nv6Fy0lS5trm-ws5NkzOPoGs1lZSVhGJLssR",
      components: "buttons",
      currency: "USD",
    };

    return (
      <PayPalButtons
        options={initialOptions}
        createOrder={(data, actions) => {
          // This function is called when the PayPal button is clicked.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Math.round(subtotal + shipping), // Set the payment amount here
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log(
              "Transaction completed by " + details.payer.name.given_name
            );
          });
        }}
      />
    );
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  function Checkout() {
    return (
      <div className="flex gap-6 justify-center">
        <div className=" md:w-5/12 w-11/12 pt-6 justify-center mx-auto">
          <div>
            <Summary />
          </div>
          <PayPalScriptProvider>
            <PayPalButtonComponent />
          </PayPalScriptProvider>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3 block mx-auto ">
        <h1 className="text-center font-semibold text-[18px] pb-2">Checkout</h1>
        <hr />
        {state.length ? <Checkout /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Checkout;
