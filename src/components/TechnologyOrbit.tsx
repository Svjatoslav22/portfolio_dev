interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const technologies: TechItem[] = [
  { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
  { name: "MongoDB", icon: "fas fa-database", color: "text-green-400" },
  { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-400" },
  { name: "TypeScript", icon: "fab fa-js", color: "text-blue-600" },
  { name: "React", icon: "fab fa-react", color: "text-cyan-400" },
  { name: "Next.js", icon: "fas fa-circle-notch", color: "text-white" },
  { name: "Tailwind CSS", icon: "fab fa-css3-alt", color: "text-blue-500" },
];

export function TechnologyOrbit() {
  return (
    <div className="tech-pipeline">
      <div className="pipeline-line"></div>

      <div className="pipeline-pulse"></div>

      <div className="pipeline-items">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="pipeline-item"
            title={tech.name}
          >
            <div className="pipeline-icon">
              <i className={`${tech.icon} ${tech.color}`}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}