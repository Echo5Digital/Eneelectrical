import type { MetadataRoute } from "next";

// Injected by project-writer.ts from the planned page list — deterministic,
// not AI-authored, so it always matches the routes that actually exist.
const SITE_URL = "https://example.com";
const ROUTES: string[] = ["/","/about-us","/services","/contact-us","/appointment-booking","/testimonials","/faqs","/privacy-policy","/terms","/services/electrical-repair-installation","/services/electrical-panel-upgrade","/services/ev-charger-installation","/services/generator-installation","/services/security-lighting","/services/recessed-led-lighting","/services/new-construction-electrician","/services/new-construction-wiring","/services/emergency-electrician","/services/electrical-inspection","/service-areas/katy-tx","/service-areas/energy-corridor-houston","/service-areas/southwest-houston","/service-areas/houston-tx","/service-areas/cinco-ranch-tx","/service-areas/fulshear-tx","/service-areas/memorial-houston","/service-areas/spring-branch-houston","/service-areas/westchase-houston","/service-areas/brookshire-tx","/service-areas/richmond-tx"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));
}
