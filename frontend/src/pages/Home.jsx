import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import FeaturesHighlight from '../components/FeaturesHighlight'
import EmergencyStrip from '../components/EmergencyStrip'
import AiBot from '../components/AiBot'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <FeaturesHighlight />
      <Banner />
      <AiBot />
      <EmergencyStrip />
    </div>
  )
}

export default Home