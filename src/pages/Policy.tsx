import React from 'react';

const Policy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-pink">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information that you provide directly to us, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                <li>Account information (name, email, password)</li>
                <li>Pinterest account credentials and access tokens</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
              <p className="text-gray-600">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to our processing of your data</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;