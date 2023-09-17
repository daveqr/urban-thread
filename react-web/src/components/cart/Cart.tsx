import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CartItem } from "../../models/CartItem";
import {
  decrementCartItemAction,
  incrementCartItemAction,
  removeFromCartAction,
  selectCartItemsWithCopy$,
} from "../../state/reducers/cartReducer";
import { calculateCartSubtotal } from "../../services/cartCalculator";
import { calculateTotalCostForItem } from "../../services/cartCalculator";
import { calculateCartTotal } from "../../services/cartCalculator";
import React from "react";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemsWithCopy$);
  const cartSubtotal = calculateCartSubtotal(cartItems);
  const cartTotal = calculateCartTotal(cartItems);

  const incrementCartItemQuantity = (id: string) => {
    dispatch(incrementCartItemAction(id));
  };

  const decrementCartItemQuantity = (id: string) => {
    dispatch(decrementCartItemAction(id));
  };

  const removeFromCart = (id: string) => {
    dispatch(removeFromCartAction(id));
  };

  return (
    <div className="my-10">
      <div className="container">
        <h2 className="mb-3 text-center">Shopping Cart</h2>
        <h5 className="text-center mb-5">
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
                      <h6 className="text-lg mb-0">Pink Blouse</h6>
                      <div className="d-flex align-items-center ms-3">
                        <i
                          className="fas fa-minus-circle text-lg"
                          aria-hidden="true"
                        ></i>
                        {/* <p className="mb-0 ms-2 text-sm">Out of Stock</p> */}
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mb-0">Black</p>
                      <span className="me-2">,</span>
                      <p className="mb-0">Medium</p>
                    </div>
                    <h6 className="mb-1 mt-5">
                      ${calculateTotalCostForItem(item)}
                    </h6>
                  </div>
                  <div className="w-40 w-md-5 pt-4 ms-auto me-4">
                    <input
                      type="number"
                      min="0"
                      className="form-control mb-3"
                      placeholder="1"
                      aria-label="amount"
                      value={item.quantity}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        if (newValue > item.quantity) {
                          incrementCartItemQuantity(item.id);
                        } else if (newValue < item.quantity) {
                          decrementCartItemQuantity(item.id);
                        }
                        item.quantity = newValue;
                      }}
                    />
                  </div>
                  <div className="w-5 pt-4 mt-1 text-end">
                    <button
                      className="btn btn-link text-dark"
                      onClick={() => removeFromCart(item.id)}
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
                        ${cartSubtotal.toFixed(2)}
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
                      <h5 className="">$${cartTotal.toFixed(2)}</h5>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-block d-md-flex">
              <button className="btn btn-white btn-lg w-100 mt-4 me-4">
                Countinue Shopping
              </button>
              <button className="btn btn-dark btn-lg w-100 mt-md-4">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
