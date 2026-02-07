import "./home.css"
import Landing from "./Landing/landing"
import About from "./About/about"
import Service from "./Service/service"
import Project from "./Project/project"

const home = () => {
  return (
    <div>
        <Landing></Landing>
      <About></About>
      <Service></Service>
      <Project></Project>
    </div>
  )
}

export default home
