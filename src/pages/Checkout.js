import React, { useState } from "react";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowCheckout from "../components/FormCheckout";
import Summary from "../components/SummaryCheckout";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const [showForm, setShowForm] = useState(false);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
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
    if (!showForm) {
      return ( 
      <div className="flex gap-6"> 
        <div className=" w-7/12"><ShowCheckout /> </div>
        <div className=" w-5/12"> <Summary /> </div>
      </div> )
    } else {
      return (
       <div> <ShowCheckout /> bbbbb</div>
      )
    }
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
