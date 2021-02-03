import CommonBanner from "../CommonComponents/CommonBanner";
const HeaderMain = () => {
  return (
    <section className="headerMain">
      <CommonBanner
        img="images/consult.svg"
        banner="headerMain"
        btnTxt="Find a Doctor"
      />
    </section>
  );
};

export default HeaderMain;
