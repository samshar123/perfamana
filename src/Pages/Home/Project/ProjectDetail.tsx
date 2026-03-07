import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsApi } from '../../../api';
import type { Project } from '../../../api';
import "./projectDetail.css"

const ProjectDetail: React.FC = () => {
  // useParams grabs the ':id' from the URL (e.g., /projects/stealth-gtr)
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch project details from API
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const data = await projectsApi.getProjectBySlug(id);
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Error handling if the ID doesn't exist or loading
  if (loading) {
    return (
      <div className="pd-viewport">
        <div className="pd-loading">LOADING PROJECT DOSSIER...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>ERROR  404:  MODULE  NOT  FOUND</h2>
        <Link to="/" className="pd-back-link">RETURN  TO  BASE</Link>
      </div>
    );
  }

  return (
    <div className="pd-viewport">
      {/* HEADER WITH LINK */}
      <header className="pd-header">
        <Link to="/" className="pd-back">
           <span className="back-arrow">←</span> EXIT  ARCHIVE
        </Link>
        <div className="pd-header-main">
            <span className="pd-id-tag">REF: {project.id.toUpperCase()}</span>
            <h1>{project.title}</h1>
        </div>
      </header>

      {/* BEFORE & AFTER COMPARISON */}
      <section className="pd-comparison">
        <div className="pd-side pre-build">
          <div className="pd-label">PRE  BUILD  STATE</div>
          <div className="pd-img-wrapper">
             <img src={project.oldImage || ''} alt="Original Vehicle Condition" />
          </div>
        </div>
        
        <div className="pd-side post-build">
          <div className="pd-label">POST  BUILD  STATE</div>
          <div className="pd-img-wrapper">
             <img src={project.newImage || ''} alt="Modified Performance Result" />
          </div>
        </div>
      </section>

      <section className="pd-description-section">
  <div className="pd-desc-grid">
    <div className="pd-brief">
      <div className="pd-section-tag">PROJECT  BRIEF</div>
      <p className="pd-main-text">{project.description}</p>
    </div>
    
    <div className="pd-specs-sidebar">
      <div className="pd-section-tag">TECH  SPECS</div>
      <ul className="pd-spec-list">
        <li><span>CATEGORY:</span> {project.category}</li>
        <li><span>LOCATION:</span> CALICUT  LAB</li>
        <li><span>ENGINEERING:</span> STAGE  3</li>
        <li><span>STATUS:</span> 100%  COMPLETED</li>
      </ul>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      {project.testimonial && (
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
      )}
    </div>
  );
};

export default ProjectDetail;