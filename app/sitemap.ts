import type { MetadataRoute } from "next";

// Injected by project-writer.ts from the planned page list — deterministic,
// not AI-authored, so it always matches the routes that actually exist.
const SITE_URL = "https://eneelectrical.com";
const ROUTES: string[] = ["/","/about-us","/services","/contact-us","/appointment-booking","/testimonials","/faqs","/privacy-policy","/terms","/services/electrical-repair-installation","/services/electrical-panel-upgrade-houston","/services/ev-charger-installation-houston","/services/generator-installation-houston","/services/security-lighting-houston","/services/recessed-led-lighting","/services/new-construction-electrician-houston","/services/new-construction-wiring","/services/emergency-electrician-houston","/services/electrical-inspection-houston","/services/ceiling-fan-installation-houston","/service-areas/electrician-katy-tx","/service-areas/electrician-energy-corridor-houston","/service-areas/electrician-houston-southwest","/service-areas/houston-tx","/service-areas/cinco-ranch-tx","/service-areas/fulshear-tx","/service-areas/memorial-houston","/service-areas/spring-branch-houston","/service-areas/westchase-houston","/service-areas/brookshire-tx","/service-areas/richmond-tx"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));
}
