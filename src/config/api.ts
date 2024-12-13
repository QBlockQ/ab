export const API_CONFIG = {
  MOJ: {
    BASE_URL: 'https://api.wathq.sa/moj/real-estate',
    VERSION: '1.0.0',
    ENDPOINTS: {
      DEED: '/deed/{deedNumber}/{idNumber}/{idType}',
    },
    ID_TYPES: {
      NATIONAL_ID: 'National_ID',
      RESIDENT_ID: 'Resident_ID',
      PASSPORT: 'Passport',
      CR_NO: 'CR_NO',
      ENDOWMENT_DEED_NO: 'Endowment_Deed_No',
      LICENSE_NO: 'license_No',
      FOREIGN_CR_NO: 'Foreign_CR_No',
      GOV_NATIONAL_ID: 'Gov_National_ID',
    },
  },
} as const;

export const ERROR_CODES = {
  MOJ: {
    INVALID_DEED_NUMBER: '400.1.2',
    INVALID_ID_TYPE: '400.1.3',
    INVALID_ID_DIGITS: '400.1.4',
    INVALID_ID_LENGTH: '400.1.5',
    NO_MATCHING_DATA: '404.2.1',
    NOT_FOUND: '404.2.2',
  },
} as const;
