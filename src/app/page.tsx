import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Experience from "@/components/Experience";
import SelectedWork from "@/components/SelectedWork";
import Credentials from "@/components/Credentials";
import Recommendations from "@/components/Recommendations";
import BeyondWork from "@/components/BeyondWork";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import { profile } from "@/config/profile";

export default function Home() {
  return (
    <>
      {profile.sections.hero && <Hero />}
      {profile.sections.about && <About />}
      {profile.sections.journey && <Journey />}
      {profile.sections.experience && <Experience />}
      {profile.sections.selectedWork && <SelectedWork />}
      {profile.sections.education && <Credentials />}
      {profile.sections.recommendations && <Recommendations />}
      {profile.sections.beyondWork && <BeyondWork />}
      {profile.sections.resume && <Resume />}
      {profile.sections.contact && <Contact />}
    </>
  );
}
