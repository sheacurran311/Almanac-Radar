import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

const connection = new Connection(process.env.SOLANA_RPC_URL!);
const wallet = Keypair.fromSecretKey(Buffer.from(JSON.parse(process.env.WALLET_PRIVATE_KEY!)));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

export const mintNFT = async (name: string, description: string, image: string, attributes: any[]) => {
  try {
    const { nft } = await metaplex.nfts().create({
      name: name,
      description: description,
      uri: image,
      sellerFeeBasisPoints: 0,
      properties: {
        files: [
          {
            uri: image,
            type: "image/png"
          },
        ],
        category: "image",
        attributes: attributes
      },
    });

    return {
      mintAddress: nft.address.toBase58(),
      name: nft.name,
      description: nft.description,
      image: nft.uri,
    };
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

export const transferNFT = async (mintAddress: string, recipientAddress: string) => {
  try {
    const mint = new PublicKey(mintAddress);
    const recipient = new PublicKey(recipientAddress);

    const nft = await metaplex.nfts().findByMint({ mintAddress: mint });

    await metaplex.nfts().transfer({
      nftOrSft: nft,
      recipient: recipient,
    });

    return true;
  } catch (error) {
    console.error("Error transferring NFT:", error);
    throw error;
  }
};