import React from 'react';
import Corusel from './Corusel';
import Review from './Review';
import DoctorList from './DoctorList';
import Footer from './Footer';
import HowItWorks from './HowItWorks';
import StatsBanner from './StatsBanner';
import PatientHealthTips from './PatientHealthTips';
import FAQSection from './FAQSection';
import Newsletter from './Newsletter';

const Home = () => {
  return (
    <>
      <main style={{ minHeight: '100vh', overflowX: 'hidden', background: '#fff' }}>

        {/* Hero Carousel */}
        <section className="w-100 overflow-hidden">
          <Corusel />
        </section>

        {/* Stats Counter Banner */}
        <section className="py-4">
          <StatsBanner />
        </section>

        {/* Available Doctors */}
        <section className="py-5 bg-white">
          <div className="container">
            <DoctorList title="Our Available Doctors" />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-5">
          <div className="container">
            <HowItWorks />
          </div>
        </section>

        {/* Health Tips */}
        <section className="py-5 bg-light">
          <div className="container">
            <PatientHealthTips />
          </div>
        </section>

        {/* Reviews / Testimonials */}
        <section className="py-5">
          <div className="container">
            <Review />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Newsletter Section */}
        <Newsletter />

        {/* Footer */}
        <section>
          <Footer />
        </section>

      </main>
    </>
  );
};

export default Home;
