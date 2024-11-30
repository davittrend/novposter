import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Layout } from 'lucide-react';
import { Button } from '../components/ui/Button';

const features = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Smart Scheduling',
    description: 'Automatically schedule your pins at optimal times for maximum engagement'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Bulk Upload',
    description: 'Save time by uploading and scheduling multiple pins at once'
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Board Management',
    description: 'Easily organize and manage your Pinterest boards in one place'
  }
];

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Streamline Your</span>
                  <span className="block text-pink-600">Pinterest Strategy</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Schedule pins, manage multiple accounts, and grow your Pinterest presence with our powerful scheduling tool.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link to="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features for Pinterest Success
            </h2>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-pink-600">{feature.icon}</div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;