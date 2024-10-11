import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import NewCampaign from './pages/NewCampaign';
import Rewards from './pages/Rewards';
import RewardDetails from './pages/RewardDetails';
import NewReward from './pages/NewReward';
import Users from './pages/Users';
import NewUser from './pages/NewUser';
import LoyaltyFeature from './pages/features/LoyaltyFeature';
import CommunityFeature from './pages/features/CommunityFeature';
import BlockchainFeature from './pages/features/BlockchainFeature';
import ScalabilityFeature from './pages/features/ScalabilityFeature';
import AccessibilityFeature from './pages/features/AccessibilityFeature';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/about" element={<><Header /><About /></>} />
          <Route path="/pricing" element={<><Header /><Pricing /></>} />
          <Route path="/register" element={<><Header /><Register /></>} />
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/features/loyalty" element={<><Header /><LoyaltyFeature /></>} />
          <Route path="/features/community" element={<><Header /><CommunityFeature /></>} />
          <Route path="/features/blockchain" element={<><Header /><BlockchainFeature /></>} />
          <Route path="/features/scalability" element={<><Header /><ScalabilityFeature /></>} />
          <Route path="/features/accessibility" element={<><Header /><AccessibilityFeature /></>} />
          <Route
            path="/dashboard/:tenantId"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/campaigns"
            element={
              <ProtectedRoute>
                <Layout>
                  <Campaigns />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/campaigns/:campaignId"
            element={
              <ProtectedRoute>
                <Layout>
                  <CampaignDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/campaigns/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewCampaign />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/rewards"
            element={
              <ProtectedRoute>
                <Layout>
                  <Rewards />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/rewards/:rewardId"
            element={
              <ProtectedRoute>
                <Layout>
                  <RewardDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/rewards/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewReward />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:tenantId/users/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewUser />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;