import Slider from "react-slick";

const CarouselComponent = () => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <img
            className="img-fluid"
            src="/images/carousel.png"
            alt="carousel"
          />
        </div>
        <div>
          <img
            className="img-fluid"
            src="/images/carousel.png"
            alt="carousel"
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;
