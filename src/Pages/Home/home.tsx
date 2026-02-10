import "./home.css"
import Landing from "./Landing/landing"
import About from "./About/about"
import Service from "./Service/service"
import Project from "./Project/project"
import Brands from "./Brands/brands"
import OfferSection from "./SpecialOffers/OfferSection"
import EventsSection from "./EventSection/EventsSection"


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
    </div>
  )
}

export default home
