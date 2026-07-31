import { useGithubData } from "../hooks/useGithubData";
import { BackgroundLayers } from "../components/BackgroundLayers";
import { Navbar } from "../components/Navbar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorState } from "../components/ErrorState";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { SkillsSection } from "../sections/SkillsSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ContactSection } from "../sections/ContactSection";

export function PortfolioPage() {
  const { data, loading, error } = useGithubData();

  if (loading) {
    return (
      <>
        <BackgroundLayers />
        <LoadingSpinner />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <BackgroundLayers />
        <ErrorState message={error ?? undefined} />
      </>
    );
  }

  return (
    <>
      <BackgroundLayers />
      <Navbar />
      <HeroSection user={data.user} />
      <AboutSection user={data.user} />
      <SkillsSection repos={data.repos} />
      <ProjectsSection repos={data.repos} />
      <ContactSection />
    </>
  );
}
