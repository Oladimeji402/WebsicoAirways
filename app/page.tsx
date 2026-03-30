import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingWidget from "@/components/BookingWidget";
import TripPlanner from "@/components/TripPlanner";
import DestinationGrid from "@/components/DestinationGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <BookingWidget />
      <TripPlanner />
      <DestinationGrid />
      <Newsletter />
      <Footer />
    </>
  );
}
