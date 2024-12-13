import axios, { AxiosError } from 'axios';
import { API_CONFIG, ERROR_CODES } from '@/config/api';

export type IdType = keyof typeof API_CONFIG.MOJ.ID_TYPES;

export interface DeedVerificationParams {
  deedNumber: number;
  idNumber: string;
  idType: IdType;
}

export class MOJService {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(apiKey: string) {
    this.baseURL = API_CONFIG.MOJ.BASE_URL;
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  }

  async verifyDeed({ deedNumber, idNumber, idType }: DeedVerificationParams) {
    try {
      // Validate inputs before making the API call
      if (!this.validateDeedNumber(deedNumber)) {
        throw new Error('Invalid deed number format');
      }

      if (!this.validateIdNumber(idNumber, idType)) {
        throw new Error('Invalid ID number format');
      }

      const endpoint = API_CONFIG.MOJ.ENDPOINTS.DEED
        .replace('{deedNumber}', deedNumber.toString())
        .replace('{idNumber}', idNumber)
        .replace('{idType}', API_CONFIG.MOJ.ID_TYPES[idType]);

      // For development/testing, use mock data if no API key
      if (!this.headers.Authorization || this.headers.Authorization === 'Bearer ') {
        return this.getMockDeedData(deedNumber, idNumber);
      }

      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: this.headers,
      });

      if (!response.data) {
        throw new Error('No data received from API');
      }

      return {
        success: true,
        data: response.data,
        headers: {
          apiMsgRef: response.headers['THIQAH-API-ApiMsgRef'],
          clientMsgRef: response.headers['THIQAH-API-ClientMsgRef'],
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Verification failed: ${error.message}`);
      }
      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError<any>;
        if (apiError.response?.data) {
          throw new Error(`API Error: ${JSON.stringify(apiError.response.data)}`);
        }
      }
      throw new Error('Verification failed: Unknown error');
    }
  }

  private getMockDeedData(deedNumber: number, idNumber: string) {
    return {
      success: true,
      data: {
        deedDetails: {
          deedNumber: deedNumber.toString(),
          deedDate: new Date().toISOString(),
          deedSerial: "123456",
        },
        deedStatus: "active",
        deedInfo: {
          deedAreaText: "500 sq meters",
          isRealEstateConstrained: false,
          isRealEstateMortgaged: false,
          isRealEstateHalted: false,
          isRealEstateTestamented: false,
        },
        courtDetails: {
          deedCity: "Riyadh",
        },
        deedLimitsDetails: {
          northLimitName: "Street",
          northLimitDescription: "20m wide street",
          northLimitLengthChar: "20m",
          southLimitName: "Street",
          southLimitDescription: "15m wide street",
          southLimitLengthChar: "20m",
          eastLimitName: "Plot",
          eastLimitDescription: "Plot #123",
          eastLimitLengthChar: "25m",
          westLimitName: "Plot",
          westLimitDescription: "Plot #125",
          westLimitLengthChar: "25m",
        },
        ownerDetails: [{
          ownerName: "Test Owner",
          nationality: "Saudi",
          owningAmount: 100,
          owningArea: 500,
        }],
      },
    };
  }

  validateIdNumber(idNumber: string, idType: IdType): boolean {
    if (!idNumber) return false;

    switch (idType) {
      case 'NATIONAL_ID':
      case 'RESIDENT_ID':
      case 'CR_NO':
      case 'FOREIGN_CR_NO':
        return /^\d{10}$/.test(idNumber);
      default:
        return false;
    }
  }

  validateDeedNumber(deedNumber: number): boolean {
    return !isNaN(deedNumber) && deedNumber > 0;
  }
}
