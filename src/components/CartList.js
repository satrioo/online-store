import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const CartList = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className=" gradient-custom h-screen">
          <div className="container py-5">
            <div className="row flex w-full justify-content-center my-4">
              <div className=" w-full">
                <div className="card border-l-0 border-r-0 border-b-0 mb-4">
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row ">
                            <div className=" flex items-center w-full gap-4">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  width={75}
                                />
                              </div>

                              <div className=" flex-1 flex items-center flex-wrap justify-center">
                                <p className="font-semibold text-gray-600 mb-2">
                                  {item.title}
                                </p>

                                <hr className=" my-2" />
                                <div className="flex items-center">
                                  <button
                                    className="btn px-3"
                                    onClick={() => {
                                      removeItem(item);
                                    }}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>

                                  <p className="mx-3">{item.qty}</p>

                                  <button
                                    className="btn px-3"
                                    onClick={() => {
                                      addItem(item);
                                    }}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className=" flex w-full justify-center mt-5">
                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className=" w-full absolute bottom-28 left-0">
                <div className="mb-4 w-full">
                  <div className="card-header py-3 border-t bg-white">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                        Products ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-block text-[18px]"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <div className=" my-3 py-3 relative">
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default CartList;
