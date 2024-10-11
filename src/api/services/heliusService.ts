import axios from 'axios';

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const HELIUS_API_URL = `https://api-devnet.helius.xyz/v0/token-metadata?api-key=${4abb784a-bde2-4eac-b244-9a0160c95cb3}`;

export const getTokenMetadata = async (mintAddresses: string[]) => {
  try {
    const response = await axios.post(HELIUS_API_URL, {
      mintAccounts: mintAddresses,
      includeOffChain: true,
      disableCache: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    throw error;
  }
};