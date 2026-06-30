import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/ui/motion/Reveal";
import StatCounter from "@/components/ui/motion/StatCounter";

export const metadata = {
  title: "About Us - Spiritual Yatra",
  description:
    "Learn about Spiritual Yatra and our mission to provide authentic spiritual travel experiences",
};

const values = [
  {
    title: "Respect",
    description:
      "We honor the sacred traditions and practices of each destination we visit.",
    icon: "🙏",
  },
  {
    title: "Authenticity",
    description: "Genuine experiences over commercial tourism — always.",
    icon: "✨",
  },
  {
    title: "Sustainability",
    description:
      "We support local communities and promote responsible, mindful travel.",
    icon: "🌿",
  },
  {
    title: "Transformation",
    description:
      "We believe spiritual journeys inspire profound personal growth.",
    icon: "🔥",
  },
];

const offerings = [
  {
    title: "Authentic Experiences",
    description:
      "Direct partnerships with local communities and spiritual guides for genuine cultural immersion.",
  },
  {
    title: "Expert Guidance",
    description:
      "Knowledgeable guides sharing deep insights into spiritual practices, history, and significance.",
  },
  {
    title: "Flexible Itineraries",
    description:
      "Group tours or private journeys — packages customized to your needs and schedule.",
  },
  {
    title: "End-to-End Support",
    description:
      "From planning to execution, seamless logistics so you can focus on the journey.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden -mt-20">
        <Image
          src="/images/haridwar_dest.jpg"
          alt="About Spiritual Yatra"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
            <Reveal>
              <p className="text-saffron-300 uppercase tracking-widest text-sm mb-3">
                Our Story
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white">
                About Spiritual Yatra
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-saffron-600 font-semibold uppercase tracking-widest text-sm mb-4">
                Our Mission
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-ink-900 mb-6">
                Connecting travelers with India&apos;s spiritual soul
              </h2>
              <p className="text-ink-600 leading-relaxed mb-4">
                At Spiritual Yatra, we believe travel is not just about visiting
                places — it&apos;s about experiencing transformation. Our
                mission is to connect travelers with the rich spiritual heritage
                of India through authentic, meaningful journeys.
              </p>
              <p className="text-ink-600 leading-relaxed">
                We curate experiences that go beyond tourism, offering deep
                immersion into sacred traditions, ancient practices, and the
                profound wisdom preserved in India&apos;s spiritual centers for
                millennia.
              </p>
            </Reveal>
            <Reveal direction="right">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-indian-lg">
                <Image
                  src="/images/varanasi_dest.webp"
                  alt="Spiritual journey"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ink-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 30, suffix: "+", label: "Destinations" },
              { value: 10, suffix: "k+", label: "Happy Travelers" },
              { value: 6, suffix: "", label: "Curated Yatras" },
              { value: 15, suffix: "+", label: "Years Experience" },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-display text-saffron-400 block"
                />
                <span className="text-white/60 text-sm mt-2 block">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 md:py-28 bg-gradient-sacred">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="What We Offer"
            title="Everything you need for the perfect yatra"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {offerings.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-6 border border-saffron-100 hover:shadow-indian-lg transition-shadow">
                  <h3 className="font-display text-lg text-ink-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Values"
            title="What guides every journey we craft"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.05}>
                <div className="text-center p-6 rounded-2xl bg-ink-50 border border-ink-100 hover:border-saffron-200 transition-colors">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="font-display text-lg text-ink-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-maroon-700 to-ink-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Join us on a journey
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Whether you seek inner peace, spiritual growth, or want to explore
              India&apos;s rich heritage — we&apos;re here to guide you.
            </p>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="bg-saffron-500 hover:bg-saffron-600"
              >
                Get in Touch
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
