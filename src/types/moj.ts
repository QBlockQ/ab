export interface DeedDetails {
  deedNumber: number;
  deedSerial: number;
  deedDate: string;
  deedText: string | null;
}

export interface CourtDetails {
  deedSource: string;
  deedCity: string;
}

export interface DeedInfo {
  deedArea: number;
  deedAreaText: string;
  isRealEstateConstrained: boolean;
  isRealEstateMortgaged: boolean;
  isRealEstateHalted: boolean;
  isRealEstateTestamented: boolean;
}

export interface OwnerDetails {
  ownerName: string;
  birthDate: string;
  idNumber: string;
  idType: string;
  idTypeText: string;
  ownerType: string;
  nationality: string;
  owningArea: number;
  owningAmount: number;
  constrained: number;
  halt: number;
  pawned: number;
  testament: number;
}

export interface DeedResponse {
  deedDetails: DeedDetails;
  courtDetails: CourtDetails;
  deedStatus: string;
  deedInfo: DeedInfo;
  ownerDetails: OwnerDetails[];
  deedLimitsDetails: {
    northLimitName: string;
    northLimitDescription: string;
    northLimitLength: number;
    northLimitLengthChar: string;
    southLimitName: string;
    southLimitDescription: string;
    southLimitLength: number;
    southLimitLengthChar: string;
    eastLimitName: string;
    eastLimitDescription: string;
    eastLimitLength: number;
    eastLimitLengthChar: string;
    westLimitName: string;
    westLimitDescription: string;
    westLimitLength: number;
    westLimitLengthChar: string;
  };
}
