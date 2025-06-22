import Image from "next/image";
import Headers from "./(components)/Header/header";
import Introduction from "./(components)/Introduction/Introduction";
import AboutUs from "./(components)/AboutUs/AboutUs";
import VisionAndMission from "./(components)/VisionAndMission/VIsionAndMission";
import Volunteer from "./(components)/Volunteer/Volunteer";
import CharityProgram from "./(components)/CharityProgram/CharityProgram";
import AnualRevenue from "./(components)/AnualRevenue/AnualRevenue";
import NewProspects from "./(components)/NewProspects/NewProspects";
import GlobalCommunity from "./(components)/GlobalCommunity/GlobalCommunity";
import VolunteerSection from "./(components)/VolunteerSection/VolunteerSection";
import Footer from "./(components)/Footer/Footer";
export default function Home() {
  return (
    <div>
      <Headers />
      <Introduction />
      <AboutUs />
      <VisionAndMission />
      <Volunteer />
      <CharityProgram />
      <AnualRevenue />
      <NewProspects />
      <GlobalCommunity />
      <VolunteerSection />
      <Footer />
    </div>
  );
}
