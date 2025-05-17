import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaChartLine, FaCheckCircle, FaUser, FaArrowRight } from 'react-icons/fa';
import styles from './Home.module.css';

export default function Home() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div className={styles.container}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <FaDumbbell className={styles.logoIcon} />
            <h1 className={styles.logoText}>Fitness Tracker</h1>
          </div>
          <div className={styles.headerButtons}>
            {isAuthenticated ? (
              <Link to="/dashboard" className={styles.primaryButton}>
                <FaUser className={styles.buttonIcon} />
                My Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className={styles.secondaryButton}>
                  Sign in
                </Link>
                <Link to="/signup" className={styles.primaryButton}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Left column: Text content */}
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>
              Track Your Fitness Journey With Ease
            </h2>
            <p className={styles.heroSubtitle}>
              Monitor your workouts, nutrition, and progress all in one place. 
              Set goals, track achievements, and stay motivated on your health journey.
            </p>
            
            <div className={styles.ctaContainer}>
              {isAuthenticated ? (
                <Link to="/dashboard" className={styles.ctaButton}>
                  Go to Dashboard
                  <FaArrowRight className={styles.arrowIcon} />
                </Link>
              ) : (
                <Link to="/signup" className={styles.ctaButton}>
                  Get Started - It's Free
                  <FaArrowRight className={styles.arrowIcon} />
                </Link>
              )}
              <Link to="/demo" className={styles.secondaryLink}>
                View Demo
              </Link>
            </div>
            
            {/* Feature bullets */}
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Track workouts and nutrition</span>
              </div>
              <div className={styles.featureItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Monitor your progress with detailed charts</span>
              </div>
              <div className={styles.featureItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>Get personalized recommendations</span>
              </div>
            </div>
          </div>
          
          {/* Right column: Dashboard Preview */}
          <div className={styles.heroVisual}>
            <div className={styles.dashboardPreview}>
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <span className={styles.cardLabel}>Weekly Progress</span>
                  <FaChartLine className={styles.chartIcon} />
                </div>
                
                {/* Clean, minimal chart */}
                <div className={styles.chart}>
                  <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                    <polyline
                      points="0,100 50,70 100,85 150,40 200,65 250,50 300,30"
                      className={styles.chartLine}
                    />
                    {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
                      <circle key={i} cx={x} cy={[100, 70, 85, 40, 65, 50, 30][i]} r="4" className={styles.dataPoint} />
                    ))}
                  </svg>
                </div>
                
                <div className={styles.chartLabels}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              
              <div className={styles.workoutCards}>
                <div className={styles.workoutCard}>
                  <div>
                    <h4 className={styles.workoutTitle}>Morning Run</h4>
                    <span className={styles.workoutMeta}>5.2 km • 28 min</span>
                  </div>
                  <span className={styles.completedBadge}>Completed</span>
                </div>
                
                <div className={styles.workoutCard}>
                  <div>
                    <h4 className={styles.workoutTitle}>Strength Training</h4>
                    <span className={styles.workoutMeta}>45 min • Upper Body</span>
                  </div>
                  <span className={styles.completedBadge}>Completed</span>
                </div>
              </div>

              <div className={styles.decorationElement}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Fitness Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}