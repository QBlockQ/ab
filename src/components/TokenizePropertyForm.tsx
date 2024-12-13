import { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, makeContractCall } from '@stacks/transactions';

interface TokenizePropertyFormProps {
  onSuccess: () => void;
}

export default function TokenizePropertyForm({ onSuccess }: TokenizePropertyFormProps) {
  const { userSession } = useConnect();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyAddress: '',
    price: '',
    isFractional: false,
    totalFractions: '100',
    description: '',
    images: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement IPFS upload for images
      // TODO: Call smart contract to tokenize property
      
      const options = {
        network: new StacksMainnet(),
        contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        contractName: 'property-token',
        functionName: 'mint-property',
        functionArgs: [
          // Add function arguments here
        ],
        senderAddress: userSession.loadUserData().profile.stxAddress.mainnet,
      };

      // await makeContractCall(options);
      onSuccess();
    } catch (error) {
      console.error('Error tokenizing property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Address
        </label>
        <input
          type="text"
          required
          value={formData.propertyAddress}
          onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price (in USD)
        </label>
        <input
          type="number"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFractional"
          checked={formData.isFractional}
          onChange={(e) => setFormData({ ...formData, isFractional: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isFractional" className="ml-2 block text-sm text-gray-900">
          Enable Fractional Ownership
        </label>
      </div>

      {formData.isFractional && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Fractions
          </label>
          <input
            type="number"
            required
            value={formData.totalFractions}
            onChange={(e) => setFormData({ ...formData, totalFractions: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setFormData({ ...formData, images: files });
          }}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Tokenizing...' : 'Tokenize Property'}
        </button>
      </div>
    </form>
  );
}
