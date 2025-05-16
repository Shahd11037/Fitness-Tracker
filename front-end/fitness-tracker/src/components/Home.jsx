import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaChartLine, FaCheckCircle } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light dark:bg-dark">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-dark-light shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaDumbbell className="text-primary text-3xl mr-2" />
            <h1 className="text-2xl font-bold text-dark dark:text-light">Fitness Tracker</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="btn btn-secondary">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
          {/* Left column: Text content */}
          <div className="md:w-1/2 md:pr-8 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6">
              Track Your Fitness Journey With Ease
            </h2>
            <p className="text-lg md:text-xl text-dark-light dark:text-gray mb-8">
              Monitor your workouts, nutrition, and progress all in one place. 
              Set goals, track achievements, and stay motivated on your health journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="btn btn-primary btn-block sm:btn-block md:w-auto">
                Get Started - It's Free
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-block sm:btn-block md:w-auto">
                View Demo
              </Link>
            </div>
            
            {/* Feature bullets */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-primary mr-3" />
                <span className="text-dark-light dark:text-gray">Track workouts and nutrition</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-primary mr-3" />
                <span className="text-dark-light dark:text-gray">Monitor your progress with detailed charts</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-primary mr-3" />
                <span className="text-dark-light dark:text-gray">Get personalized recommendations</span>
              </div>
            </div>
          </div>
          
          {/* Right column: Image/Illustration */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="bg-white dark:bg-dark-light p-6 rounded-xl shadow-lg transform rotate-3 max-w-md">
              <div className="bg-primary-light dark:bg-gray-dark bg-opacity-30 p-1 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-dark dark:text-primary">Weekly Progress</span>
                  <FaChartLine className="text-primary" />
                </div>
                
                {/* Fake chart/graph */}
                <div className="mt-4 h-48 flex items-end justify-between gap-2">
                  {[35, 60, 45, 80, 55, 75, 68].map((height, index) => (
                    <div key={index} className="bg-primary h-full rounded-t" style={{ height: `${height}%`, width: '12%' }}></div>
                  ))}
                </div>
                
                <div className="mt-2 flex justify-between text-xs text-dark-light dark:text-gray">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-light dark:bg-dark rounded-lg">
                  <div>
                    <span className="block text-dark dark:text-light font-medium">Morning Run</span>
                    <span className="text-xs text-gray-dark">5.2 km • 28 min</span>
                  </div>
                  <span className="badge badge-primary">Completed</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-light dark:bg-dark rounded-lg">
                  <div>
                    <span className="block text-dark dark:text-light font-medium">Strength Training</span>
                    <span className="text-xs text-gray-dark">45 min • Upper Body</span>
                  </div>
                  <span className="badge badge-primary">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-light py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-dark-light dark:text-gray-dark text-sm">
            © {new Date().getFullYear()} Fitness Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
