import Image from "next/image";

import Introduction from "./(components)/Introduction/Introduction";
import AboutUs from "./(components)/AboutUs/AboutUs";
import Volunteer from "./(components)/Volunteer/Volunteer";
import CharityProgram from "./(components)/CharityProgram/CharityProgram";
import AnnualRevenue  from "./(components)/AnnualRevenue/AnnualRevenue";
import NewProspects from "./(components)/NewProspects/NewProspects";
import GlobalCommunity from "./(components)/GlobalCommunity/GlobalCommunity";
import VolunteerSection from "./(components)/VolunteerSection/VolunteerSection";
import Header from "./(components)/Header/Header";
import VisionAndMission from "./(components)/VisionAndMission/VisionAndMission";

export default function Home() {
  return (
    <div>
      <Header />
      <Introduction />
      {/* <AboutUs /> */}
      <VisionAndMission />
      {/* <Volunteer /> */}
      <CharityProgram />
      <AnnualRevenue  />
      <NewProspects />
      <GlobalCommunity />
      <VolunteerSection />
    </div>
  );
}
