import { FC } from "react";

import { selectCartItems$ } from "../../state/cartSlice";
import { CartItem } from "../../models/CartItem";
import {
  calculateCartSubtotal,
  calculateCartTotal,
  calculateTotalCostForItem,
  moneyFormatter,
} from "../../services/cartCalculator";
import { useAppSelector } from "../../state/hooks";

const Checkout: FC = () => {
  const cartItems = useAppSelector(selectCartItems$);
  const cartSubtotal = calculateCartSubtotal(cartItems);
  const cartTotal = calculateCartTotal(cartItems);

  return (
    <section>
      <div className="row">
        <div className="col-12 col-lg-6 p-3 p-md-5 bg-gray-100">
          <h5 className="mb-4">Contact information</h5>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
            />
          </div>
          <h5 className="mt-5 mb-4">Shipping address</h5>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Street, no"
            />
          </div>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your country"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your postal code"
                />
              </div>
            </div>
          </div>
          <h5 className="mt-5 mb-4">Payment details</h5>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your card number"
            />
          </div>
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label>Expiration date (MM/YY)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the date"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the 3 digits"
                />
              </div>
            </div>
          </div>
          <h5 className="mt-5 mb-4">Billing information</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={true}
              value=""
            />
            <label className="custom-control-label">
              Same as shipping information
            </label>
          </div>
          <hr className="dark horizontal" />
          <button className="btn btn-dark float-end mt-2 mb-0">
            <svg
              className="me-1"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.80039 2.80005C2.02719 2.80005 1.40039 3.42685 1.40039 4.20005V4.90005H12.6004V4.20005C12.6004 3.42685 11.9736 2.80005 11.2004 2.80005H2.80039Z"
                fill="white"
              >
                <p className="fw-bold opacity-8 text-white">$7</p>
              </path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.6004 6.30005H1.40039V9.80005C1.40039 10.5733 2.02719 11.2 2.80039 11.2H11.2004C11.9736 11.2 12.6004 10.5733 12.6004 9.80005V6.30005ZM2.80039 9.10005C2.80039 8.71344 3.11379 8.40005 3.50039 8.40005H4.20039C4.58699 8.40005 4.90039 8.71344 4.90039 9.10005C4.90039 9.48666 4.58699 9.80005 4.20039 9.80005H3.50039C3.11379 9.80005 2.80039 9.48666 2.80039 9.10005ZM6.30039 8.40005C5.91379 8.40005 5.60039 8.71344 5.60039 9.10005C5.60039 9.48666 5.91379 9.80005 6.30039 9.80005H7.00039C7.387 9.80005 7.70039 9.48666 7.70039 9.10005C7.70039 8.71344 7.387 8.40005 7.00039 8.40005H6.30039Z"
                fill="white"
              ></path>
            </svg>
            Proceed to payment
          </button>
        </div>

        <div className="col-12 col-lg-6 p-3 p-md-5 bg-dark bg-gradient rounded-end">
          <p className="text-white opacity-6 mb-0 text-end">Amount</p>
          <h3 className="text-white mb-4 text-end">
            {moneyFormatter.format(cartTotal)}
          </h3>

          {cartItems.map((item: CartItem, index: number) => (
            <div className="d-flex mb-4">
              <img
                className="w-20 rounded-3"
                src="./Astro Ecommerce_files/suit-3.jpg"
                alt="watch"
              />
              <div className="w-60 w-md-70 pt-2 ps-3 ps-md-4">
                <h6 className="text-lg text-white mb-1">{item.name}</h6>
                {/* TODO get more details for the item */}
                <p className="mb-0 text-white opacity-8">8 colors</p>
                <p className="mb-0 text-sm text-white opacity-8">Small</p>
              </div>
              <div className="w-10 text-end">
                <p className="text-white mb-0 ">
                  {moneyFormatter.format(calculateTotalCostForItem(item))}
                </p>
              </div>
            </div>
          ))}

          <ul className="list-unstyled">
            <li className="mt-2">
              <div className="d-flex justify-content-between">
                <p className="opacity-8 text-white">Subtotal</p>
                <p className="fw-bold opacity-8 text-white">
                  {moneyFormatter.format(cartSubtotal)}
                </p>
              </div>
            </li>
            <li className="mt-2">
              <div className="d-flex justify-content-between">
                <p className="opacity-8 text-white">
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
                <p className="fw-bold opacity-8 text-white">$0</p>
              </div>
            </li>

            <li className="border-bottom mt-2">
              <div className="d-flex justify-content-between">
                <p className="opacity-8 text-white">
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
              </div>
            </li>

            <li className="mt-4">
              <div className="d-flex justify-content-between">
                <h5 className=" text-white">Total</h5>
                <h5 className=" text-white">
                  {moneyFormatter.format(cartSubtotal)}
                </h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
