import CompanyText from "../components/CompanyText/CompanyText";
import DoctorBanner from "../components/DoctorBanner/DoctorBanner";
import Footer from "../components/Footer/Footer";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import HomepageAdd from "../components/HomepageAdd/HomepageAdd";
import WorkingProcess from "../components/WorkingProcess/WorkingProcess";
import CarouselComonent from "../components/CarouselComponent/CarouselComponent";
export default function Home() {
  return (
    <>
      <CarouselComonent />
      <HeaderMain />
      <HomepageAdd />
      <DoctorBanner />
      <WorkingProcess />
      <CompanyText />
    </>
  );
}
