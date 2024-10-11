import { Request, Response } from 'express';
import { supabase } from '../server';
import { handleError } from '../utils/errorHandler';
import { mintNFT, transferNFT } from '../services/nftService';

export const createNFT = async (req: Request, res: Response) => {
  const { name, description, image, attributes } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const mintResult = await mintNFT(name, description, image, attributes);

    const { data, error } = await supabase
      .from('nfts')
      .insert({
        name,
        description,
        image,
        attributes,
        mint_address: mintResult.mintAddress,
        tenant_id: tenantId
      })
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'NFT created successfully', nft: data[0] });
  } catch (error) {
    handleError(res, error);
  }
};

export const getNFT = async (req: Request, res: Response) => {
  const { nftId } = req.params;
  const tenantId = (req as any).tenantId;

  try {
    const { data, error } = await supabase
      .from('nfts')
      .select('*')
      .eq('id', nftId)
      .eq('tenant_id', tenantId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

export const listNFTs = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const { data, error, count } = await supabase
      .from('nfts')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      nfts: data,
      totalCount: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count! / Number(limit))
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const transferNFTToCustomer = async (req: Request, res: Response) => {
  const { nftId, customerId } = req.body;
  const tenantId = (req as any).tenantId;

  try {
    const { data: nft, error: nftError } = await supabase
      .from('nfts')
      .select('mint_address')
      .eq('id', nftId)
      .eq('tenant_id', tenantId)
      .single();

    if (nftError) throw nftError;

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('wallet_address')
      .eq('id', customerId)
      .eq('tenant_id', tenantId)
      .single();

    if (customerError) throw customerError;

    await transferNFT(nft.mint_address, customer.wallet_address);

    const { error: updateError } = await supabase
      .from('nfts')
      .update({ owner_id: customerId })
      .eq('id', nftId)
      .eq('tenant_id', tenantId);

    if (updateError) throw updateError;

    res.json({ message: 'NFT transferred successfully' });
  } catch (error) {
    handleError(res, error);
  }
};