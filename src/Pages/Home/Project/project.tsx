import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsApi } from "../../../api";
import type { Project } from "../../../api";
import "./project.css";

const ProjectSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="pj-grid-viewport">
        <div className="pj-container">
          <div className="pj-loading">LOADING PROJECT DATABASE...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="pj-grid-viewport">
      {/* BACKGROUND DECOR */}
      <div className="pj-bg-overlay">
        <div className="pj-line-h"></div>
        <div className="pj-line-v"></div>
      </div>

      <div className="pj-container">
        <header className="pj-header">
          <div className="pj-meta">ARCHIVE LOG 2026</div>
          <h2 className="pj-main-title">PROJECT DATABASE</h2>
          <p className="pj-subtitle">
            Detailed dossiers of our most aggressive transformations.
          </p>
        </header>

        <div className="pj-bento-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`pj-bento-item item-${index + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/projects/${project.id}`} className="pj-card-link">
                <div className="pj-image-container">
                  <img
                    src={project.newImage || undefined}
                    alt={project.title}
                    className="pj-main-img"
                  />

                  {/* HUD OVERLAY ELEMENTS */}
                  <div className="pj-hud">
                    <div className="hud-corner tl"></div>
                    <div className="hud-corner br"></div>
                    <div className="hud-scan-line"></div>
                    <div className="hud-status">STATUS: FINALIZED</div>
                  </div>
                </div>

                <div className="pj-content">
                  <div className="pj-header-row">
                    <span className="pj-index">{index + 1}</span>
                    <h3 className="pj-card-title">{project.title}</h3>
                  </div>
                  <p className="pj-card-desc">{project.description}</p>

                  <div className="pj-card-footer">
                    <span className="pj-view-link">OPEN DOSSIER</span>
                    <div className="pj-arrow">→</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
