# Almanac-Radar

Almanac Labs Headless API

Overview

Almanac Labs is a GDPR-compliant, headless API designed to integrate loyalty and rewards programs with the power of blockchain technology. Our API is multi-tenant, enabling clients to securely manage loyalty campaigns, rewards, and integrations while leveraging blockchain-based features. Our primary blockchain integration is with Solana and Metaplex, utilizing Dynamic.xyz for account abstraction, making the process seamless for our clients' users.

The purpose of this API is to offer flexibility for clients such as sports teams, leagues, events, musicians, and enterprises who are interested in building loyalty programs without managing user data directly, and to leverage blockchain for unique engagements like NFTs.

Features:
Multi-Tenant Support: Isolate each client’s data with tenant-level separation for GDPR compliance.
Blockchain Integration: Integrate with Solana and Metaplex to mint and distribute NFTs and cNFTs.
Seamless User Wallets: Utilize Dynamic.xyz for blockchain account and wallet abstraction for end-users, ensuring a seamless onboarding flow.
Row-Level Security: Implemented in Supabase to provide secure and isolated access for each tenant's data.

Tech Stack:
Frontend: React, TypeScript
Backend: Supabase for database and authentication, Node.js (via Supabase functions)
Blockchain Integrations: Solana, Metaplex, Dynamic.xyz for blockchain account abstraction

Tools & Services:
Supabase: PostgreSQL database, Row-Level Security (RLS), and authentication
Dynamic.xyz: Wallet and blockchain account management with multi-tenancy
React Router: Navigation between different routes in the application

Getting Started

Prerequisites

Node.js (>= 14.x)

Supabase Account

Solana Wallet

Installation:
1. Clone the Repository:
git clone https://github.com/your-username/ALMANAC-LABS.git
cd ALMANAC-LABS

2. Install Dependencies:
npm install

3. Environment Variables:
Create a .env file in the root directory and add the following:
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
DYNAMIC_API_KEY=your-dynamic-api-key

4. Run the Application:
npm run dev

5. Supabase Setup:
Import the database schema for tables like clients, campaigns, rewards.
Enable Row-Level Security (RLS) for each table as required by GDPR standards.

Authentication Flow:
The system utilizes Supabase's authentication for managing admin-level users of each client. Client users are onboarded using Dynamic.xyz, providing them blockchain wallets that are managed entirely in the backend. We do not store any user-specific data beyond what's needed for account creation and wallet management.

Folder Structure:
/src: Contains all source code
/components: Reusable UI components like CampaignCard, RewardCard, etc.
/contexts: Context providers, including AuthContext.tsx
/pages: Page-level components such as Home, Dashboard, Login
/services: API calls and interactions with external services

Authentication & Authorization:
The API uses Supabase's built-in authentication system combined with role-based access control (RBAC). Users can log in with email and password, and their access level is controlled through the use of tenant_id. End-user wallets are created using Dynamic.xyz, which abstracts blockchain complexities away from the users.

Deployment:
Supabase Configuration
Database: Make sure to enable Row-Level Security and create necessary policies for tenant isolation.
JWT Custom Claims: Ensure that the JWT token includes the tenant_id claim, which is essential for data isolation in the backend.

Frontend Deployment:
Vercel or Netlify: Recommended platforms for easy deployment.
npm run build

Deploy the build folder using any static hosting platform.

API Endpoints:
/api/campaigns: CRUD operations for campaigns, isolated per tenant_id.
/api/rewards: Manage rewards offered by each client, secured via tenant-level separation.
/api/integrations: Set up and manage third-party integrations.

Troubleshooting

Common Errors:
Minified React Error #185: This typically indicates an infinite render loop. Check your state update functions (useState and useEffect) for unintentional recursive updates.
Row-Level Security Violation: This error is usually related to missing tenant_id claims in your JWT. Verify the tenant_id is correctly set in Supabase user metadata.

License:
This project is licensed under the MIT License - see the LICENSE file for details.

Contact

If you have questions or need support, feel free to reach out at shea@almanaclabs.com or create an issue in the GitHub repository.
