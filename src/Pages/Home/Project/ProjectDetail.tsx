import React from 'react';
import { useParams, Link } from 'react-router-dom';
import projectData from '../../../../src/data/projects.json';
import "./projectDetail.css"

const ProjectDetail: React.FC = () => {
  // useParams grabs the ':id' from the URL (e.g., /projects/stealth-gtr)
  const { id } = useParams<{ id: string }>();
  
  // Find the specific project in your JSON data
  const project = projectData.projects.find(p => p.id === id);

  // Error handling if the ID doesn't exist
  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>ERROR_404: MODULE_NOT_FOUND</h2>
        <Link to="/" className="pd-back-link">RETURN_TO_BASE</Link>
      </div>
    );
  }

  return (
    <div className="pd-viewport">
      {/* HEADER WITH LINK */}
      <header className="pd-header">
        <Link to="/" className="pd-back">
           <span className="back-arrow">←</span> // EXIT_ARCHIVE
        </Link>
        <div className="pd-header-main">
            <span className="pd-id-tag">REF: {project.id.toUpperCase()}</span>
            <h1>{project.title}</h1>
        </div>
      </header>

      {/* BEFORE & AFTER COMPARISON */}
      <section className="pd-comparison">
        <div className="pd-side pre-build">
          <div className="pd-label">PRE_BUILD_STATE</div>
          <div className="pd-img-wrapper">
             <img src={project.oldImage} alt="Original Vehicle Condition" />
          </div>
        </div>
        
        <div className="pd-side post-build">
          <div className="pd-label">POST_BUILD_STATE</div>
          <div className="pd-img-wrapper">
             <img src={project.newImage} alt="Modified Performance Result" />
          </div>
        </div>
      </section>

      <section className="pd-description-section">
  <div className="pd-desc-grid">
    <div className="pd-brief">
      <div className="pd-section-tag">// PROJECT_BRIEF</div>
      <p className="pd-main-text">{project.description}</p>
    </div>
    
    <div className="pd-specs-sidebar">
      <div className="pd-section-tag">// TECH_SPECS</div>
      <ul className="pd-spec-list">
        <li><span>CATEGORY:</span> {project.category}</li>
        <li><span>LOCATION:</span> CALICUT_LAB</li>
        <li><span>ENGINEERING:</span> STAGE_3</li>
        <li><span>STATUS:</span> 100%_COMPLETED</li>
      </ul>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="pd-testimonial-section">
        <div className="pd-test-card">
          <div className="pd-stars">
             {Array.from({ length: project.testimonial.stars }).map((_, i) => (
               <span key={i}>★</span>
             ))}
          </div>
          <p className="pd-quote">"{project.testimonial.content}"</p>
          <div className="pd-client-profile">
            <img src={project.testimonial.avatar} alt={project.testimonial.name} className="pd-avatar" />
            <div className="pd-client-info">
              <h4>{project.testimonial.name}</h4>
              <span>{project.testimonial.designation}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;