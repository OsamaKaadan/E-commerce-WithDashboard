import React from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landing.css";
import slide1 from "../../../Assets/slide1.jpg";
import slide2 from "../../../Assets/slide2.jpg";
import slide3 from "../../../Assets/slide3.jpg";

export default function Landing() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <Image src={slide1} text="First slide" width="100%" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={slide2} text="Second slide" width="100%" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={slide3} text="Third slide" width="100%" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
