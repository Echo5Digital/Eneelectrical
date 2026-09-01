/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      // Old bare (root-level) slugs from eneelectrical.com -> current /services/* pages
      {
        source: "/electrical-panel-upgrade-houston",
        destination: "/services/electrical-panel-upgrade-houston",
        permanent: true,
      },
      {
        source: "/ev-charger-installation-houston",
        destination: "/services/ev-charger-installation-houston",
        permanent: true,
      },
      {
        source: "/generator-installation-houston",
        destination: "/services/generator-installation-houston",
        permanent: true,
      },
      {
        source: "/security-lighting-houston",
        destination: "/services/security-lighting-houston",
        permanent: true,
      },
      {
        source: "/new-construction-electrician-houston",
        destination: "/services/new-construction-electrician-houston",
        permanent: true,
      },
      {
        source: "/emergency-electrician-houston",
        destination: "/services/emergency-electrician-houston",
        permanent: true,
      },
      {
        source: "/electrical-inspection-houston",
        destination: "/services/electrical-inspection-houston",
        permanent: true,
      },
      {
        source: "/electrical-repair-installation",
        destination: "/services/electrical-repair-installation",
        permanent: true,
      },
      {
        source: "/recessed-led-lighting",
        destination: "/services/recessed-led-lighting",
        permanent: true,
      },
      {
        source: "/new-construction-wiring",
        destination: "/services/new-construction-wiring",
        permanent: true,
      },
      // Old bare (root-level) slugs -> current /service-areas/* pages
      {
        source: "/electrician-katy-tx",
        destination: "/service-areas/electrician-katy-tx",
        permanent: true,
      },
      {
        source: "/electrician-energy-corridor-houston",
        destination: "/service-areas/electrician-energy-corridor-houston",
        permanent: true,
      },
      {
        source: "/electrician-houston-southwest",
        destination: "/service-areas/electrician-houston-southwest",
        permanent: true,
      },
      // Old bare (root-level) blog slugs from eneelectrical.com -> new /blog/* pages
      {
        source: "/do-you-really-need-a-whole-house-surge-protector",
        destination: "/blog/do-you-really-need-a-whole-house-surge-protector",
        permanent: true,
      },
      {
        source: "/why-your-home-s-wiring-may-not-meet-today-s-needs",
        destination: "/blog/why-your-home-s-wiring-may-not-meet-today-s-needs",
        permanent: true,
      },
      {
        source: "/what-causes-electrical-fires-in-homes",
        destination: "/blog/what-causes-electrical-fires-in-homes",
        permanent: true,
      },
      {
        source: "/is-your-home-safe-signs-your-electrical-panel-is-outdated",
        destination: "/blog/is-your-home-safe-signs-your-electrical-panel-is-outdated",
        permanent: true,
      },
      {
        source: "/how-does-your-home-electrical-system-work",
        destination: "/blog/how-does-your-home-electrical-system-work",
        permanent: true,
      },
      {
        source: "/when-should-you-upgrade-your-electrical-service",
        destination: "/blog/when-should-you-upgrade-your-electrical-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
