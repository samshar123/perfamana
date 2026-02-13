import "./home.css"
import Landing from "./Landing/landing"
import About from "./About/about"
import Service from "./Service/service"
import Project from "./Project/project"
import Brands from "./Brands/brands"
import OfferSection from "./SpecialOffers/OfferSection"
import EventsSection from "./EventSection/EventsSection"
import ProcessSection from "./Process/ProcessSection"
import WhyUs from "./WhyUs/whyUs"
import FinalCTA from "./FinalCTA/finalcta"
import FaqSection from "./FaqSection/FaqSection"


const home = () => {
  return (
    <div>
        <Landing></Landing>
      <About></About>
      <Service></Service>
      <Project></Project>
      <Brands></Brands>
      <OfferSection></OfferSection>
      <EventsSection></EventsSection>
      <ProcessSection></ProcessSection>
      <WhyUs></WhyUs>
      <FinalCTA></FinalCTA>
      <FaqSection></FaqSection>
    </div>
  )
}

export default home
