import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main className="bg-[#1C0207]">
      <Header />
      <Loader />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Certifications />
      <Projects />
      <Footer />
    </main>
  );
}

