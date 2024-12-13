export interface PropertyToken {
  propertyId: string;
  deedNumber: string;
  totalValue: number; // in SAR
  tokenCount: number; // fixed at 2100
  pricePerToken: number; // totalValue / 2100
  isLinkedToBTC: boolean;
  btcPriceAtMint?: number; // BTC price in SAR at minting time
  conversionRate?: number; // SAR per token when linked to BTC
}

export interface TokenMintingParams {
  deedNumber: string;
  propertyValue: number; // in SAR
  isLinkedToBTC: boolean;
}

export interface BTCPriceData {
  price: number; // in SAR
  timestamp: number;
}

export interface SBTCBridgeResponse {
  txId: string;
  status: 'pending' | 'confirmed' | 'failed';
  amount: number;
}
