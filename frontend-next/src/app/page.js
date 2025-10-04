import FeaturesHighlight from "../components/FeaturesHighlight";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <FeaturesHighlight />
      <Footer />
    </div>
  )
}
