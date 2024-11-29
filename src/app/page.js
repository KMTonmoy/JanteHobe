import AboutUs from '@/Components/AboutUs';
import Banner from '@/Components/Banner';
import ContactUsSection from '@/Components/ContactUsSection';
import InfoBox from '@/Components/InfoBox';
import TestimonialSection from '@/Components/TestimonialSection';

const page = () => {
  return (
    <div>
      <Banner />
      <InfoBox />
      <AboutUs />
      <TestimonialSection />
      <ContactUsSection />
    </div>
  );
};

export default page;