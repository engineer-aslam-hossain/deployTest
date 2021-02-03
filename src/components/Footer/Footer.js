import Link from "next/link";
const Footer = () => {
  return (
    <footer style={{ background: "#2C364F", color: "white" }}>
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="footerItem d-flex flex-column align-items-center justify-content-center col-md-12">
            <div className="socialIcon mb-3">
              <a href="/" target="_blank">
                <img src="/images/icons8-facebook.png" alt="#" />
              </a>
              <a href="/" target="_blank">
                <img src="/images/icons8-instagram.png" alt="#" />
              </a>
              <a href="/" target="_blank">
                <img src="/images/icons8-youtube.png" alt="#" />
              </a>
              <a href="/" target="_blank">
                <img src="/images/icons8-linkedin.png" alt="#" />
              </a>
              <a href="/" target="_blank">
                <img src="/images/icons8-twitter.png" alt="#" />
              </a>
            </div>
            <div className="footerLink my-2 text-center">
              <Link href="/">
                <a>NEWS</a>
              </Link>
              |
              <Link href="/">
                <a>ABOUT US</a>
              </Link>
              |
              <Link href="/">
                <a>CONTACT US </a>
              </Link>
              |
              <Link href="/">
                <a> PRIVACY POLICY </a>
              </Link>
              |
              <Link href="/">
                <a> TERMS & CONDITIONS</a>
              </Link>
            </div>
            <p>{new Date().getFullYear()} &copy; Sobar Daktar</p>
            <img
              src="/images/SobarDaktar_Logo_MAIN-01.jpg"
              alt=""
              className="img-fluid footerLogo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
