import { useState } from 'react';
import { MOJService, IdType } from '@/services/mojApi';

const mojService = new MOJService(process.env.MOJ_API_KEY || '');

interface UseMOJVerificationProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useMOJVerification({ onSuccess, onError }: UseMOJVerificationProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const verifyDeed = async (deedNumber: number, idNumber: string, idType: IdType) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate inputs
      if (!mojService.validateDeedNumber(deedNumber)) {
        throw new Error('Invalid deed number');
      }

      if (!mojService.validateIdNumber(idNumber, idType)) {
        throw new Error('Invalid ID number');
      }

      const result = await mojService.verifyDeed({
        deedNumber,
        idNumber,
        idType,
      });

      setData(result.data);
      onSuccess?.(result.data);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyDeed,
    isLoading,
    error,
    data,
  };
}
