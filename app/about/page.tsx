import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About Us - Spiritual Yatra',
  description: 'Learn about Spiritual Yatra and our mission to provide authentic spiritual travel experiences',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-airbnb-black mb-4">
              About Spiritual Yatra
            </h1>
            <p className="text-lg text-airbnb-gray">
              Your trusted partner for spiritual journeys across India
            </p>
          </div>

          <div className="space-y-12 mb-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-airbnb-black mb-4">Our Mission</h2>
              <p className="text-airbnb-black leading-relaxed mb-4">
                At Spiritual Yatra, we believe that travel is not just about visiting places, but about experiencing transformation. Our mission is to connect travelers with the rich spiritual heritage of India through authentic, meaningful journeys that inspire inner growth and self-discovery.
              </p>
              <p className="text-airbnb-black leading-relaxed">
                We curate experiences that go beyond tourism, offering deep immersion into sacred traditions, ancient practices, and the profound wisdom that has been preserved in India's spiritual centers for millennia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-airbnb-black mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-airbnb-surface p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-airbnb-black mb-3">Authentic Experiences</h3>
                  <p className="text-airbnb-gray leading-relaxed">
                    We work directly with local communities and spiritual guides to ensure authentic experiences that respect traditions and support local culture.
                  </p>
                </div>
                <div className="bg-airbnb-surface p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-airbnb-black mb-3">Expert Guidance</h3>
                  <p className="text-airbnb-gray leading-relaxed">
                    Our knowledgeable guides share deep insights into spiritual practices, history, and the significance of each destination.
                  </p>
                </div>
                <div className="bg-airbnb-surface p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-airbnb-black mb-3">Flexible Itineraries</h3>
                  <p className="text-airbnb-gray leading-relaxed">
                    Whether you prefer group tours or private journeys, we offer flexible packages that can be customized to your needs.
                  </p>
                </div>
                <div className="bg-airbnb-surface p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-airbnb-black mb-3">Comprehensive Support</h3>
                  <p className="text-airbnb-gray leading-relaxed">
                    From planning to execution, we provide end-to-end support ensuring a smooth and meaningful spiritual journey.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-airbnb-black mb-4">Our Values</h2>
              <ul className="space-y-3 text-airbnb-black">
                <li className="flex items-start">
                  <span className="text-airbnb-red mr-3">•</span>
                  <span><strong className="font-semibold">Respect:</strong> We honor the sacred traditions and practices of each destination</span>
                </li>
                <li className="flex items-start">
                  <span className="text-airbnb-red mr-3">•</span>
                  <span><strong className="font-semibold">Authenticity:</strong> We prioritize genuine experiences over commercial tourism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-airbnb-red mr-3">•</span>
                  <span><strong className="font-semibold">Sustainability:</strong> We support local communities and promote responsible travel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-airbnb-red mr-3">•</span>
                  <span><strong className="font-semibold">Transformation:</strong> We believe in the power of spiritual journeys to inspire personal growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-airbnb-red mr-3">•</span>
                  <span><strong className="font-semibold">Service:</strong> We are committed to providing exceptional service and support</span>
                </li>
              </ul>
            </section>

            <section className="bg-airbnb-surface p-10 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-airbnb-black mb-4">Join us on a journey</h2>
              <p className="text-airbnb-gray mb-6 leading-relaxed">
                Whether you're seeking inner peace, spiritual growth, or simply want to explore India's rich spiritual heritage, we're here to guide you on your journey. Contact us today to begin planning your spiritual pilgrimage.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Get in touch
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
