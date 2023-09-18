import { FC } from "react";
import { Link } from "react-router-dom";

import { HomeWrapper } from "./Home.styled";
import CategoryList from "./categoryList/CategoryList";
import "./Home.css";
import "./index.b2c62b4c.css";
import { useAuth } from "../../contexts/AuthContext";
import { useGetCategoriesQuery } from "../../apiSlice";

const Home: FC = () => {
  const { user, login, logout } = useAuth();

  const {
    data: categories = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  let content;

  if (isLoading) {
    content = 'is loading';
  } else if (isSuccess) {
    content = <CategoryList categories={categories} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  const handleLogin = () => {
    // TODO replace this with a real call
    login({
      id: "1",
      fname: "John",
      lname: "Thompson",
      email: "user@example.com",
    });
  };

  const handleLogout = () => {
    // Simulate a logout action
    logout();
  };

  return (
    <HomeWrapper data-testid="Home">
      <>
        <main>
          <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0">
            <div className="container px-1">
              <a
                className="navbar-brand font-weight-bolder ms-lg-0 "
                href="https://www.creative-tim.com/astro"
              >
                Astro Ecommerce
              </a>
              <button
                className="navbar-toggler shadow-none ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon mt-2">
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                      aria-current="page"
                      href="https://www.creative-tim.com/learning-lab/astro/overview/astro-ecommerce"
                    >
                      Home
                    </a>
                  </li>

                  <li className="nav-item">
                    {user ? (
                      // If logged in, show logout
                      <span
                        className="nav-link text-dark font-weight-bold d-flex align-items-center me-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    ) : (
                      // If logged out, show login
                      <span
                        className="nav-link text-dark font-weight-bold d-flex align-items-center me-2"
                        onClick={handleLogin}
                      >
                        Login
                      </span>
                    )}
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                      aria-current="page"
                      href="https://demos.creative-tim.com/astro-ecommerce/"
                    >
                      <Link to={`/cart`}>Cart</Link>
                    </a>
                  </li>
                  {/* <li className="nav-item dropdown">
                    <a
                      className="nav-link text-dark dropdown-toggle font-weight-bold d-flex align-items-center me-2 "
                      aria-current="page"
                      id="pagesExample"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="pagesExample"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="https://demos.creative-tim.com/astro-ecommerce/landing/"
                        >
                          Landing Page
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="https://demos.creative-tim.com/astro-ecommerce/product/"
                        >
                          Product Page
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="https://demos.creative-tim.com/astro-ecommerce/shopping-cart/"
                        >
                          Shopping Cart
                        </a>
                      </li>
                    </ul>
                  </li> */}
                  {/* <li className="nav-item">
                    <a
                      className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                      aria-current="page"
                      href="https://github.com/creativetimofficial/astro-ecommerce"
                    >
                      <i
                        className="fab text-lg fa-github"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                      aria-current="page"
                      href="https://discord.com/invite/TGZqBvZB"
                      rel="nofollow"
                      target="_blank"
                    >
                      <i
                        className="fab text-lg fa-discord"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
          <section className="mb-8">
            <div
              className="page-header py-5 py-md-0"
              style={{
                backgroundImage: `url(${require("./images/bg2.jpg")})`,
                minHeight: "90vh",
              }}
            >
              <span className="mask bg-black opacity-6"></span>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-sm-9 text-center mx-auto">
                    <h1 className="text-white mb-4">Collection is here</h1>
                    <p className="lead text-white mb-sm-6 mb-4">
                      The time is now for it to be okay to be great. People in
                      this world shun people for being great. For being a bright
                      color. For standing out.
                    </p>
                    <button className="btn btn-white btn-lg">
                      Explore New Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <CategoryList categories={categories} /> */}
          {content}
          {/* TODO need to set the width of this */}
          <section className="mb-8">
            <div
              className="page-header py-5 py-md-0"
              style={{
                backgroundImage: `url(${require("./images/bg2.jpg")})`,
                minHeight: "50vh",
                borderRadius: "1rem",
              }}
            >
              <span className="mask bg-black opacity-6"></span>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-sm-9 text-center mx-auto">
                    <h1 className="text-white mb-4">Basic Starter Pack</h1>
                    <p className="lead text-white mb-sm-6 mb-4">
                      The time is now for it to be okay to be great. People in
                      this world shun people for being great. For being a bright
                      color. For standing out.
                    </p>
                    <button className="btn btn-white btn-lg">
                      Explore New Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="my-5">
            <div className="card card-product card-plain">
              <div className="row">
                <div className="col-12 col-lg-7 mx-auto text-center">
                  <h2 className="mb-3">Product Features</h2>
                  <p className="mb-5">
                    Society has put up so many boundaries, so many limitations
                    on what’s right and wrong that it’s almost impossible
                  </p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 col-lg-6 pe-5">
                  <div className="row">
                    <h4 className="mb-3">Product Description</h4>
                    <p className="mb-5">
                      Society has put up so many boundaries, so many limitations
                      on what’s right and wrong that it’s almost impossible to
                      get a pure thought out. It’s like a little kid, a little
                      boy, looking at colors, and no one told him what colors
                      are good, before somebody tells you you shouldn’t like
                      pink because that’s for girls, or you’d instantly become a
                      gay two-year-old.
                    </p>
                    <div className="col-12">
                      <div className="d-flex mb-4">
                        <svg
                          className="me-2"
                          width="30"
                          height="30"
                          viewBox="0 0 20 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 23C14.4183 23 18 19.4183 18 15C18 10.5817 14.4183 7 10 7C5.58172 7 2 10.5817 2 15C2 19.4183 5.58172 23 10 23ZM13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929C13.3166 11.9024 12.6834 11.9024 12.2929 12.2929L9 15.5858L7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071L13.7071 13.7071Z"
                            fill="#111827"
                          ></path>
                        </svg>
                        <p>
                          Oil is a primary source of energy for various sectors,
                          including transportation, industries, and residential
                          use.
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex mb-4">
                        <svg
                          className="me-2"
                          width="30"
                          height="30"
                          viewBox="0 0 20 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 23C14.4183 23 18 19.4183 18 15C18 10.5817 14.4183 7 10 7C5.58172 7 2 10.5817 2 15C2 19.4183 5.58172 23 10 23ZM13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929C13.3166 11.9024 12.6834 11.9024 12.2929 12.2929L9 15.5858L7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071L13.7071 13.7071Z"
                            fill="#111827"
                          ></path>
                        </svg>
                        <p>
                          Oil is highly versatile and used in the production of
                          a wide range of products. It serves as a raw material
                          for manufacturing plastics.
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex mb-4">
                        <svg
                          className="me-2"
                          width="30"
                          height="30"
                          viewBox="0 0 20 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 23C14.4183 23 18 19.4183 18 15C18 10.5817 14.4183 7 10 7C5.58172 7 2 10.5817 2 15C2 19.4183 5.58172 23 10 23ZM13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929C13.3166 11.9024 12.6834 11.9024 12.2929 12.2929L9 15.5858L7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071L13.7071 13.7071Z"
                            fill="#111827"
                          ></path>
                        </svg>
                        <p>
                          Oil is a crucial source of petrochemicals, which are
                          used in the production of plastics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="d-block d-md-flex">
                    <img
                      className="w-100 max-height-200 rounded-3 mb-4 mb-md-0"
                      src={require("./images/product7.jpg")}
                      alt="first_image"
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <img
                        className="w-100 max-height-200 rounded-3"
                        src={require("./images/product8.jpg")}
                        alt="third_image"
                      />
                    </div>
                    <div className="col-6">
                      <img
                        className="w-100 max-height-200 rounded-3"
                        src={require("./images/product9.jpg")}
                        alt="fourth_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-10">
            <section>
              <div
                className="page-header rounded-top"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2676&amp;q=80")`,
                  minHeight: "50vh",
                }}
              >
                <div className="faded opacity-10"></div>
                <div className="container z-index-2">
                  <div className="row justify-content-center">
                    <div className="col-sm-9 text-center mx-auto pt-6">
                      <h1 className="mb-4">Exclusive Discounts for Members</h1>
                      <p className="lead mb-sm-5 px-md-8">
                        The time is now for it to be okay to be great. People in
                        this world shun people for being great. For being a
                        bright color. For standing out. But the time is now to
                        be okay to be the greatest you.
                      </p>
                      <button className="btn btn-dark btn-lg d-flex align-items-center mx-auto">
                        <svg
                          className="me-2"
                          width="15"
                          height="15"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.00002 3.4999C4.00002 2.34011 4.94023 1.3999 6.10002 1.3999C6.63788 1.3999 7.12849 1.6021 7.50002 1.93463C7.87158 1.6021 8.36214 1.3999 8.90002 1.3999C10.0599 1.3999 11 2.34011 11 3.4999C11 3.74535 10.9579 3.98096 10.8805 4.1999H11.7C12.4732 4.1999 13.1 4.8267 13.1 5.5999C13.1 6.3731 12.4732 6.9999 11.7 6.9999H8.20002V6.2999C8.20002 5.91331 7.88663 5.5999 7.50002 5.5999C7.11343 5.5999 6.80002 5.9133 6.80002 6.2999V6.9999H3.30002C2.52683 6.9999 1.90002 6.3731 1.90002 5.5999C1.90002 4.8267 2.52683 4.1999 3.30002 4.1999H4.11952C4.04213 3.98096 4.00002 3.74535 4.00002 3.4999ZM6.80002 4.1999V3.4999C6.80002 3.11331 6.48662 2.7999 6.10002 2.7999C5.71343 2.7999 5.40002 3.11331 5.40002 3.4999C5.40002 3.8865 5.71343 4.1999 6.10002 4.1999H6.80002ZM8.90002 4.1999C9.28663 4.1999 9.60003 3.8865 9.60003 3.4999C9.60003 3.11331 9.28663 2.7999 8.90002 2.7999C8.51341 2.7999 8.20002 3.11331 8.20002 3.4999V4.1999H8.90002Z"
                            fill="white"
                          ></path>
                          <path
                            d="M6.79998 7.69995H2.59998V11.2C2.59998 11.9732 3.22678 12.6 3.99998 12.6H6.79998V7.69995Z"
                            fill="white"
                          ></path>
                          <path
                            d="M8.20001 12.6H11C11.7732 12.6 12.4 11.9732 12.4 11.2V7.69995H8.20001V12.6Z"
                            fill="white"
                          ></path>
                        </svg>
                        Get your code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <h3 className="font-weight-bolder mt-4 mb-2">
                  Our customer’s opinion
                </h3>
                <p className="mb-5 w-60">
                  Society has put up so many boundaries, so many limitations on
                  what’s right and wrong that it’s almost impossible to get a
                  pure thought out.
                </p>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border shadow-xs mb-4">
                      <div className="card-body text-start p-3 w-100">
                        <div className="d-flex align-items-center">
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-light w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="mt-4">
                          We’re not always in the position that we want to be
                          at. We’re constantly growing. We’re constantly making
                          mistakes. We’re constantly trying to express ourselves
                          and actualize our dreams. If you have the opportunity
                          to play this game of life you need to appreciate every
                          moment.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm position-relative me-2">
                            <img
                              src={require("./images/photo-1522075469751-3a6694fb2f61")}
                              className="rounded-circle"
                            />
                          </div>
                          <h6 className="mb-0">Alexa Liras</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border shadow-xs mb-4">
                      <div className="card-body text-start p-3 w-100">
                        <div className="d-flex align-items-center">
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="mt-4">
                          There’s nothing I really wanted to do in life that I
                          wasn’t able to get good at. That’s my skill. I’m not
                          really specifically talented at anything except for
                          the ability to learn. That’s what I do. That’s what
                          I’m here for. Don’t be afraid to be wrong because you
                          can’t learn anything from a compliment.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm position-relative me-2">
                            <img
                              src={require("./images/photo-1522075469751-3a6694fb2f61")}
                              className="rounded-circle"
                            />
                          </div>
                          <h6 className="mb-0">Laurent Perrier</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-4">
                    <div className="card border shadow-xs mb-4">
                      <div className="card-body text-start p-3 w-100">
                        <div className="d-flex align-items-center">
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-warning w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <svg
                            className="text-light w-rem flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="mt-4">
                          It really matters and then like it really doesn’t
                          matter. What matters is the people who are sparked by
                          it. And the people who are like offended by it, it
                          doesn’t matter. Because it's about motivating the
                          doers. Because I’m here to follow my dreams and
                          inspire other people to follow their dreams.
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm position-relative me-2">
                            <img
                              src={require("./images/photo-1522075469751-3a6694fb2f61")}
                              className="rounded-circle"
                            />
                          </div>
                          <h6 className="mb-0">Michael Levi</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <footer className="footer pt-3  ">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  Copyright ©2023&nbsp;Astro Ecommerce by
                  <a
                    href="https://www.creative-tim.com/"
                    className="text-dark ms-1"
                    target="_blank"
                  >
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
              <div className="col-lg-6">
                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/"
                      className="nav-link text-sm text-muted"
                      target="_blank"
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="nav-link text-sm text-muted"
                      target="_blank"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/blog"
                      className="nav-link text-sm text-muted"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/license"
                      className="nav-link text-sm pe-0 text-muted"
                      target="_blank"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </main>
      </>
    </HomeWrapper>
  );
};

export default Home;
