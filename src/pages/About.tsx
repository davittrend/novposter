import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About PinScheduler</h1>
        
        <div className="prose prose-pink">
          <p className="text-lg text-gray-600 mb-6">
            PinScheduler is your ultimate Pinterest management tool, designed to help content creators
            and businesses maximize their Pinterest presence through intelligent scheduling and automation.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We're committed to helping creators and businesses grow their Pinterest presence by providing
            powerful, yet easy-to-use tools for content scheduling and management.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose PinScheduler?</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Smart scheduling algorithms for optimal posting times</li>
            <li>Bulk upload capabilities for efficient content management</li>
            <li>Multiple account management</li>
            <li>Detailed analytics and performance tracking</li>
            <li>User-friendly interface</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Simplicity in design and functionality</li>
            <li>Continuous innovation and improvement</li>
            <li>Customer-focused development</li>
            <li>Data privacy and security</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;