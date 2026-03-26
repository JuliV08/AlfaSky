"use client";

import { Navbar } from "@/components/PillNav";
import { Footer } from "@/components/Footer";

import { LoadingOverlay } from "@/components/home/LoadingOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicePanels } from "@/components/home/ServicePanels";
import { ServiceDetails } from "@/components/home/ServiceDetails";
import { WhyAlfaSky } from "@/components/home/WhyAlfaSky";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FleetSection } from "@/components/home/FleetSection";
import { PlaceholderSection } from "@/components/home/PlaceholderSection";
import { ContactSection } from "@/components/home/ContactSection";
import { LocationSection } from "@/components/home/LocationSection";
import { CabinExperienceSlot } from "@/components/home/CabinExperienceSlot";

export default function HomePage() {
    return (
        <>

            <LoadingOverlay />
            <Navbar />

            <main>
                <HeroSection />
                <ServicePanels />
                <ServiceDetails />
                <WhyAlfaSky />
                <ProcessSection />
                <FleetSection />
                <CabinExperienceSlot />
                <PlaceholderSection />
                <ContactSection />
                <LocationSection />
            </main>

            <Footer />
        </>
    );
}
