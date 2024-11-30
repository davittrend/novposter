import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        
        <div className="prose prose-pink">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using PinScheduler, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600">
                Permission is granted to temporarily use PinScheduler for personal, non-commercial
                transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
              <p className="text-gray-600">
                The materials on PinScheduler's website are provided on an 'as is' basis. PinScheduler
                makes no warranties, expressed or implied, and hereby disclaims and negates all other
                warranties including, without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
              <p className="text-gray-600">
                In no event shall PinScheduler or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use PinScheduler.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;