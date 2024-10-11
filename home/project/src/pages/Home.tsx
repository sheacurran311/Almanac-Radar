import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRightIcon, StarIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const { isAuthenticated, client, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && client) {
    return <Navigate to={`/dashboard/${client.tenantId}`} replace />;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-6">Welcome to Almanac Labs</h1>
        <p className="text-xl mb-8">
          Revolutionizing loyalty and rewards for sports teams, leagues, events, musicians, and enterprises.
        </p>
        <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-100 transition duration-300">
          Get Started
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<StarIcon className="h-8 w-8" />}
            title="Customizable Rewards"
            description="Create unique and engaging reward programs tailored to your audience."
          />
          <FeatureCard
            icon={<CubeIcon className="h-8 w-8" />}
            title="Blockchain Integration"
            description="Leverage blockchain technology for secure and transparent reward tracking."
          />
          <FeatureCard
            icon={<UserGroupIcon className="h-8 w-8" />}
            title="Fan Engagement"
            description="Boost fan loyalty with interactive campaigns and personalized experiences."
          />
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Almanac Labs?</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Cutting-edge technology tailored for the sports and entertainment industry</li>
            <li>Seamless integration with existing systems</li>
            <li>Data-driven insights to optimize your loyalty programs</li>
            <li>Dedicated support team to ensure your success</li>
          </ul>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your fan engagement?</h2>
          <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold inline-flex items-center hover:bg-blue-100 transition duration-300 text-lg">
            Start Your Free Trial
            <ArrowRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 p-6 rounded-lg">
    <div className="text-blue-300 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
)

export default Home