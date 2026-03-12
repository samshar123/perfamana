import "./home.css";
import Landing from "./Landing/landing";
import About from "./About/about";
import ServiceSection from "./Service/service";
import ProjectSection from "./Project/project";
import Brands from "./Brands/brands";
import OfferSection from "./SpecialOffers/OfferSection";
import EventsSection from "./EventSection/EventsSection";
import ProcessSection from "./Process/ProcessSection";
import WhyUs from "./WhyUs/whyUs";
import FinalCTA from "./FinalCTA/finalcta";
import FaqSection from "./FaqSection/FaqSection";

const Home = () => {
  return (
    <div id="top">
      <Landing></Landing>
      <About></About>
      <ServiceSection></ServiceSection>
      <ProjectSection></ProjectSection>
      <Brands></Brands>
      <OfferSection></OfferSection>
      <EventsSection></EventsSection>
      <ProcessSection></ProcessSection>
      <WhyUs></WhyUs>
      <FinalCTA></FinalCTA>
      <FaqSection></FaqSection>
    </div>
  );
};

export default Home;
