import CommonBanner from "../CommonComponents/CommonBanner";
const DoctorBanner = () => {
  return (
    <section className="headerMain">
      <CommonBanner
        img="/images/doctor.svg"
        banner="doctor"
        btnTxt="Join as a Doctor"
      />
    </section>
  );
};

export default DoctorBanner;
