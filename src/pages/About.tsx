import React from 'react'

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Almanac Labs</h1>
      <p className="text-xl mb-6">
        Almanac Labs is a cutting-edge multi-tenant loyalty and rewards platform designed for enterprise businesses, sports teams, leagues, events, and musicians. We combine traditional loyalty mechanisms with blockchain technology to create engaging and innovative reward programs.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="mb-6">
        Our mission is to revolutionize the loyalty and rewards industry by providing a platform that is both powerful and flexible. We aim to help our clients create meaningful connections with their audience through personalized and engaging reward experiences.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Innovative blend of traditional and blockchain-based rewards</li>
        <li>Secure multi-tenant architecture for data isolation</li>
        <li>Seamless integration with third-party services</li>
        <li>User-friendly administrative dashboard for program management</li>
        <li>Dual-wallet functionality for web2 and web3 rewards</li>
      </ul>
    </div>
  )
}

export default About