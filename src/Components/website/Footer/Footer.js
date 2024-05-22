import "./footer.css";

import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                At E-commerce.com, we empower shoppers with quality products, a
                seamless shopping experience, and exceptional customer service.
                Discover a vast array of products, secure transactions, and
                dedicated support, all designed to make your online shopping
                experience effortless and enjoyable.
              </p>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Branches</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Country</a>
                </li>
                <li>
                  <a href="#">Country</a>
                </li>
                <li>
                  <a href="#">Country</a>
                </li>
                <li>
                  <a href="#">Country</a>
                </li>
                <li>
                  <a href="#">Country</a>
                </li>
                <li></li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Contribute</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright © 2024 All Rights Reserved by Osama Kaadan
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="#">
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
