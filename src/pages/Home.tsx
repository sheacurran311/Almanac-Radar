import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRightIcon, StarIcon, CubeIcon, UserGroupIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const { isAuthenticated, client, isLoading } = useAuth();

  console.log('Home render - isAuthenticated:', isAuthenticated, 'client:', client, 'isLoading:', isLoading);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (isAuthenticated && client) {
    console.log('Redirecting to dashboard');
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <StarIcon className="h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Loyalty Programs Reimagined</h3>
            <p className="text-lg mb-4">Deliver value to your fans through innovative and engaging loyalty experiences, enhanced by blockchain technology.</p>
            <Link to="/features/loyalty" className="text-blue-300 font-semibold hover:underline">Learn More <ArrowRightIcon className="inline-block h-4 w-4" /></Link>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <UserGroupIcon className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Community Engagement</h3>
            <p className="text-lg mb-4">Deepen your relationships with fans by incentivizing interactions and creating memorable events and experiences.</p>
            <Link to="/features/community" className="text-blue-300 font-semibold hover:underline">Discover More <ArrowRightIcon className="inline-block h-4 w-4" /></Link>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <CubeIcon className="h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Blockchain Integration</h3>
            <p className="text-lg mb-4">Harness the power of decentralized technology to bring transparency, security, and ownership to your loyalty programs.</p>
            <Link to="/features/blockchain" className="text-blue-300 font-semibold hover:underline">Read More <ArrowRightIcon className="inline-block h-4 w-4" /></Link>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <BoltIcon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Fast and Scalable</h3>
            <p className="text-lg mb-4">Built on scalable infrastructure to grow alongside your fan base, handling peak moments without sacrificing performance.</p>
            <Link to="/features/scalability" className="text-blue-300 font-semibold hover:underline">Explore Scalability <ArrowRightIcon className="inline-block h-4 w-4" /></Link>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <GlobeAltIcon className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Global Accessibility</h3>
            <p className="text-lg mb-4">Enable fans around the world to participate and engage, regardless of their location, by leveraging the power of the internet and blockchain.</p>
            <Link to="/features/accessibility" className="text-blue-300 font-semibold hover:underline">Learn More <ArrowRightIcon className="inline-block h-4 w-4" /></Link>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Almanac Labs?</h2>
          <p className="text-xl mb-8">We combine the best of traditional loyalty systems with the potential of blockchain technology to deliver unique, engaging, and effective loyalty programs tailored to your needs.</p>
          <Link to="/about" className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-purple-600 transition duration-300">
            Find Out More
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home