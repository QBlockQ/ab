import {
  openContractCall,
  ContractCallOptions,
  FinishedTxData,
} from '@stacks/connect';
import { StacksNetwork, StacksMainnet, StacksTestnet } from '@stacks/network';
import {
  standardPrincipalCV,
  contractPrincipalCV,
  uintCV,
  trueCV,
  falseCV,
} from '@stacks/transactions';
import { PropertyToken } from '@/types/tokenization';

export class StacksService {
  private readonly network: StacksNetwork;
  private readonly contractAddress: string;
  private readonly contractName: string;

  constructor() {
    this.network = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
      ? new StacksMainnet()
      : new StacksTestnet();
    
    this.contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
    this.contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME!;
  }

  async mintPropertyTokens(propertyToken: PropertyToken): Promise<FinishedTxData> {
    const options: ContractCallOptions = {
      network: this.network,
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'mint-property-tokens',
      functionArgs: [
        standardPrincipalCV(propertyToken.propertyId),
        uintCV(propertyToken.totalValue),
        uintCV(propertyToken.tokenCount),
        propertyToken.isLinkedToBTC ? trueCV() : falseCV(),
        propertyToken.btcPriceAtMint ? uintCV(propertyToken.btcPriceAtMint) : uintCV(0),
      ],
      onFinish: (data: FinishedTxData) => {
        console.log('Finished contract call:', data);
        return data;
      },
      onCancel: () => {
        throw new Error('User cancelled the transaction');
      },
    };

    return openContractCall(options);
  }

  async getTokenBalance(propertyId: string, owner: string): Promise<number> {
    const response = await this.network.callReadOnlyFunction({
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-balance',
      functionArgs: [
        standardPrincipalCV(propertyId),
        standardPrincipalCV(owner),
      ],
    });

    return response.value;
  }

  async getPropertyTokenInfo(propertyId: string): Promise<PropertyToken> {
    const response = await this.network.callReadOnlyFunction({
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-property-info',
      functionArgs: [standardPrincipalCV(propertyId)],
    });

    return response.value;
  }
}
