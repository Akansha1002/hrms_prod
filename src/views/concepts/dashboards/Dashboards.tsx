import { FootTabs } from "./components/FootTabs"
import { Gallery } from "./components/Gallery"
import { HeroTabs } from "./components/HeroTabs"
import { Nav } from "./components/Nav"
import { Profile } from "./components/Profile"
import { Search } from "./components/Search"



const Dashboards = () => {
  return (
    <div>
      <Search />
      <Nav />

      <Profile />
      <HeroTabs />
      <FootTabs />
      <Gallery />
    </div>
  )
}

export default Dashboards