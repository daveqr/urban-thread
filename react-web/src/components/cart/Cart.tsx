import React from "react";
import { FC } from "react";
// TODO get this sorted
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../home/index.b2c62b4c.css";

import { CartItem } from "../../models/CartItem";
import { selectCartItems$ } from "../../state/cartSlice";
import {
  calculateCartSubtotal,
} from "../../services/cartCalculator";
import { calculateCartTotal } from "../../services/cartCalculator";
import { cartSlice } from "../../state/cartSlice";
import { useNavigation } from "../../useNavigation";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { moneyFormatter } from "../../services/moneyFormatter";

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const cartItems = useAppSelector(selectCartItems$);
  const cartSubtotal = calculateCartSubtotal(cartItems);
  const cartTotal = calculateCartTotal(cartItems);


  const removeItemFromCart = (itemId: string) => {
    dispatch(cartSlice.actions.removeItemFromCart(itemId));
  };

  const setItemQuantity = (id: string, quantity: number) =>
    dispatch(cartSlice.actions.setItemQuantity({ id, quantity }));

  return (
    <div className="my-10">
      <div className="container">
        <h2 className="mb-3 text-center">Shopping Cart</h2>

        {cartItems.length === 0 && (
          <>
            <p>Your cart is empty.</p>

            <div className="d-block d-md-flex">
              <button
                onClick={() => nav.goHome()}
                className="btn btn-white btn-lg w-100 mt-4 me-4"
              >
                Continue Shopping
              </button>

              {cartItems.length > 0 ? (
                <button
                  onClick={() => nav.goToCheckout()}
                  className="btn btn-dark btn-lg w-100 mt-md-4"
                >
                  Checkout
                </button>
              ) : null}
            </div>
          </>
        )}

        {cartItems.length >= 1 && (
          <>
            <h5 className="text-center mb-5">
              {/* TODO fix this */}
              You are eligible for Free Shipping.
            </h5>

            <div className="row">
              <div className="col-12">
                {cartItems.map((item: CartItem, index: number) => (
                  <React.Fragment key={item.id}>
                    <div className="d-block d-md-flex mt-4">
                      <img
                        className="w-50 w-md-20 w-lg-10 rounded-3 m-4"
                        src="./Astro Ecommerce_files/suit-1.jpg"
                        alt="watch"
                      />

                      <div className="w-100 w-md-50 pt-4 ps-md-4">
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="text-lg mb-0">{item.name}</h6>

                          {/* TODO Do something with in stock/out of stock */}
                          <div className="d-flex align-items-center mt-6">
                            <i
                              className="fas fa-check text-lg text-success"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 ms-2 text-sm">In Stock</p>
                          </div>

                          {/* <div className="d-flex align-items-center ms-3">
                        <i
                          className="fas fa-minus-circle text-lg"
                          aria-hidden="true"
                        ></i>
                        <p className="mb-0 ms-2 text-sm">Out of Stock</p>
                      </div> */}
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">Black</p>
                          <span className="me-2">,</span>
                          <p className="mb-0">Medium</p>
                        </div>
                        <h6 className="mb-1 mt-5">
                          {moneyFormatter.format(item.price)}
                        </h6>
                      </div>

                      <div className="w-40 w-md-5 pt-4 ms-auto me-4">
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id={`quantityDropdown-${item.id}`}
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Qty: {item.quantity}
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby={`quantityDropdown-${item.id}`}
                          >
                            <button
                              className="dropdown-item"
                              // key={0}
                              onClick={() => setItemQuantity(item.id, 0)}
                            >
                              0 (Delete)
                            </button>

                            {Array.from({ length: 10 }, (_, i) => (
                              <button
                                className="dropdown-item"
                                key={i}
                                onClick={() => setItemQuantity(item.id, i + 1)}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="w-5 pt-4 mt-1 text-end">
                        <button
                          className="btn btn-link text-dark"
                          onClick={() => removeItemFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {index < cartItems.length - 1 && (
                      <hr className="horizontal dark my-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="col-12 col-lg-7 col-md-8 mx-auto mt-4">
                <div className="card shadow-xs border bg-gray-100">
                  <div className="card-body p-lg-5">
                    <ul className="list-unstyled">
                      <li className="mt-2">
                        <div className="d-flex justify-content-between">
                          <p className="opacity-8">Subtotal</p>
                          <p className="fw-bold opacity-8">
                            {moneyFormatter.format(cartSubtotal)}
                          </p>
                        </div>
                      </li>
                      <li className="mt-2">
                        <div className="d-flex justify-content-between">
                          <p className="opacity-8">
                            Shipping estimate{" "}
                            <span
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-container="body"
                              data-animation="true"
                              aria-label="More information related to shipping"
                              data-bs-original-title="More information related to shipping"
                            >
                              <i
                                className="fas fa-question-circle text-sm"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </p>
                          <p className="fw-bold opacity-8">$0</p>
                        </div>
                      </li>
                      <li className="border-bottom mt-2">
                        <div className="d-flex justify-content-between">
                          <p className="opacity-8">
                            Tax estimate{" "}
                            <span
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-container="body"
                              data-animation="true"
                              aria-label="This may vary depending on the country you are in"
                              data-bs-original-title="This may vary depending on the country you are in"
                            >
                              <i
                                className="fas fa-question-circle text-sm"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </p>
                          <p className="fw-bold opacity-8">$7</p>
                        </div>
                      </li>
                      <li className="mt-4">
                        <div className="d-flex justify-content-between">
                          <h5 className="">Total</h5>
                          <h5 className="">
                            {moneyFormatter.format(cartTotal)}
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="d-block d-md-flex">
                  <button
                    onClick={() => nav.goHome()}
                    className="btn btn-white btn-lg w-100 mt-4 me-4"
                  >
                    Continue Shopping
                  </button>

                  {cartItems.length > 0 ? (
                    <button
                      onClick={() => nav.goToCheckout()}
                      className="btn btn-dark btn-lg w-100 mt-md-4"
                    >
                      Checkout
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
