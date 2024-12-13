import { TokenMintingParams, PropertyToken } from '@/types/tokenization';
import { BitcoinService } from './bitcoinService';

export class TokenizationService {
  private readonly bitcoinService: BitcoinService;
  private readonly TOKEN_COUNT = 2100;

  constructor() {
    this.bitcoinService = new BitcoinService();
  }

  async calculateTokenDetails(params: TokenMintingParams): Promise<PropertyToken> {
    const pricePerToken = params.propertyValue / this.TOKEN_COUNT;
    let btcPrice: number | undefined;
    let conversionRate: number | undefined;

    if (params.isLinkedToBTC) {
      const btcPriceData = await this.bitcoinService.getBTCPrice();
      btcPrice = btcPriceData.price;
      conversionRate = params.propertyValue / btcPrice;
    }

    return {
      propertyId: `PROP-${Date.now()}`,
      deedNumber: params.deedNumber,
      totalValue: params.propertyValue,
      tokenCount: this.TOKEN_COUNT,
      pricePerToken,
      isLinkedToBTC: params.isLinkedToBTC,
      btcPriceAtMint: btcPrice,
      conversionRate
    };
  }

  async mintPropertyTokens(params: TokenMintingParams): Promise<PropertyToken> {
    // Calculate token details
    const tokenDetails = await this.calculateTokenDetails(params);

    // If BTC-linked, initiate sBTC minting
    if (params.isLinkedToBTC) {
      const mintResponse = await this.bitcoinService.initiateSBTCMint(
        tokenDetails.totalValue
      );

      // You might want to store the txId and monitor its status
      console.log('sBTC minting initiated:', mintResponse);
    }

    // Here you would typically:
    // 1. Deploy a new Stacks contract for this property
    // 2. Mint the tokens on Stacks
    // 3. Store the token details in your database

    return tokenDetails;
  }

  async getTokenPrice(propertyToken: PropertyToken): Promise<number> {
    if (!propertyToken.isLinkedToBTC) {
      return propertyToken.pricePerToken;
    }

    // Get current BTC price and calculate token price
    const btcPriceData = await this.bitcoinService.getBTCPrice();
    const currentBTCPrice = btcPriceData.price;
    
    if (propertyToken.conversionRate) {
      return currentBTCPrice * propertyToken.conversionRate / propertyToken.tokenCount;
    }

    return propertyToken.pricePerToken;
  }
}
