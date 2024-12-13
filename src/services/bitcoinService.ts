import axios from 'axios';
import { BTCPriceData, SBTCBridgeResponse } from '@/types/tokenization';

export class BitcoinService {
  private readonly mempoolBaseUrl: string;
  private readonly emilyBaseUrl: string;

  constructor() {
    this.mempoolBaseUrl = process.env.NEXT_PUBLIC_MEMPOOL_API_URL || 'https://mempool.space/api';
    this.emilyBaseUrl = process.env.NEXT_PUBLIC_EMILY_API_URL || 'https://emily.stacks.co';
  }

  async getBTCPrice(): Promise<BTCPriceData> {
    try {
      // For development/testing, return mock price if API URL is not set
      if (!process.env.NEXT_PUBLIC_MEMPOOL_API_URL) {
        return {
          price: 140000, // Mock price in SAR
          timestamp: Date.now(),
        };
      }

      const response = await axios.get(`${this.mempoolBaseUrl}/v1/prices`);
      
      if (!response.data || !response.data.USD) {
        throw new Error('Invalid price data received from API');
      }

      // Convert USD to SAR (fixed rate for example, should use real forex API)
      const sarRate = 3.75;
      const priceInSAR = response.data.USD * sarRate;

      return {
        price: priceInSAR,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch BTC price: ${error.message}`);
      }
      throw new Error('Failed to fetch BTC price');
    }
  }

  async initiateSBTCMint(amount: number): Promise<SBTCBridgeResponse> {
    try {
      // For development/testing, return mock response if API URL is not set
      if (!process.env.NEXT_PUBLIC_EMILY_API_URL) {
        return {
          txId: 'mock-tx-' + Date.now(),
          status: 'pending',
          amount: amount
        };
      }

      const response = await axios.post(`${this.emilyBaseUrl}/sbtc/mint`, {
        amount,
        currency: 'SAR'
      });

      if (!response.data) {
        throw new Error('No response data from sBTC bridge');
      }

      return {
        txId: response.data.txId,
        status: response.data.status,
        amount: response.data.amount
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to initiate sBTC minting: ${error.message}`);
      }
      throw new Error('Failed to initiate sBTC minting');
    }
  }

  async checkSBTCMintStatus(txId: string): Promise<SBTCBridgeResponse> {
    try {
      const response = await axios.get(`${this.emilyBaseUrl}/sbtc/status/${txId}`);
      return {
        txId: response.data.txId,
        status: response.data.status,
        amount: response.data.amount
      };
    } catch (error) {
      console.error('Error checking sBTC mint status:', error);
      throw new Error('Failed to check sBTC mint status');
    }
  }
}
