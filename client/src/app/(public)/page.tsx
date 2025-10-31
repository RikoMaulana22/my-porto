import { getAllServices, getAllProjects } from '@/lib/api';
import { Service, Project } from '@/lib/types';

// Import komponen Sections
import Hero from '@/components/sections/Hero';
import Card from '@/components/ui/Card'; // Impor UI Card

/**
 * @desc    Komponen Section untuk Services (Server Component)
 */
async function ServicesSection() {
  const services: Service[] = await getAllServices();

  return (
    <section id="services" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Layanan Saya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * @desc    Komponen Section untuk Projects (Server Component)
 */
async function ProjectsSection() {
  const projects: Project[] = await getAllProjects();

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Proyek Terbaru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              // TODO: Tambahkan link ke projectUrl dan repoUrl
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * @desc    Halaman Utama (Homepage)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      {/* TODO: Tambahkan <BookingFormSection /> nanti */}
    </>
  );
}