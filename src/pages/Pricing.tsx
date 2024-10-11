import React from 'react'

const Pricing: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Basic</h2>
          <p className="text-3xl font-bold mb-4">$999<span className="text-sm font-normal">/month</span></p>
          <ul className="mb-6">
            <li className="mb-2">Up to 10,000 API requests/month</li>
            <li className="mb-2">Basic loyalty program features</li>
            <li className="mb-2">Email support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Get Started</button>
        </div>
        <div className="border rounded-lg p-6 shadow-lg bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-3xl font-bold mb-4">$2,499<span className="text-sm font-normal">/month</span></p>
          <ul className="mb-6">
            <li className="mb-2">Up to 50,000 API requests/month</li>
            <li className="mb-2">Advanced loyalty program features</li>
            <li className="mb-2">Priority email and phone support</li>
            <li className="mb-2">Basic blockchain integration</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Get Started</button>
        </div>
        <div className="border rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="mb-6">
            <li className="mb-2">Unlimited API requests</li>
            <li className="mb-2">Full feature set</li>
            <li className="mb-2">24/7 dedicated support</li>
            <li className="mb-2">Custom integrations</li>
            <li className="mb-2">Advanced blockchain features</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Contact Sales</button>
        </div>
      </div>
    </div>
  )
}

export default Pricing