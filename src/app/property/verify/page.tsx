'use client'

import { useState } from 'react'
import { DeedVerificationForm } from '@/components/property/DeedVerificationForm'
import { DeedDetails } from '@/components/property/DeedDetails'
import { TokenizationForm } from '@/components/property/TokenizationForm'
import { DeedResponse } from '@/types/moj'
import { PropertyToken } from '@/types/tokenization'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function PropertyVerificationPage() {
  const [verificationData, setVerificationData] = useState<DeedResponse | null>(null)
  const [tokenizationData, setTokenizationData] = useState<PropertyToken | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerificationSuccess = (data: DeedResponse) => {
    setVerificationData(data)
    setTokenizationData(null)
    setError(null)
  }

  const handleVerificationError = (error: any) => {
    setError(error.message || 'Verification failed. Please try again.')
    setVerificationData(null)
    setTokenizationData(null)
  }

  const handleTokenizationSuccess = (token: PropertyToken) => {
    setTokenizationData(token)
    setError(null)
  }

  const handleTokenizationError = (error: any) => {
    setError(error.message || 'Tokenization failed. Please try again.')
    setTokenizationData(null)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Property Verification & Tokenization</h1>
          <p className="text-muted-foreground mt-2">
            Verify and tokenize your property on the Bitcoin blockchain
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert - Verification */}
        {verificationData && !tokenizationData && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Verification Successful</AlertTitle>
            <AlertDescription className="text-green-700">
              The deed has been successfully verified. You can now proceed with tokenization.
            </AlertDescription>
          </Alert>
        )}

        {/* Success Alert - Tokenization */}
        {tokenizationData && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Tokenization Successful</AlertTitle>
            <AlertDescription className="text-green-700">
              Your property has been successfully tokenized. Token ID: {tokenizationData.propertyId}
            </AlertDescription>
          </Alert>
        )}

        {/* Verification Form */}
        <div className="bg-card border rounded-lg p-6">
          <DeedVerificationForm
            onVerificationSuccess={handleVerificationSuccess}
            onVerificationError={handleVerificationError}
          />
        </div>

        {/* Deed Details */}
        {verificationData && (
          <div className="mt-8">
            <DeedDetails data={verificationData} />
          </div>
        )}

        {/* Tokenization Form */}
        {verificationData && !tokenizationData && (
          <div className="mt-8">
            <TokenizationForm
              deedNumber={verificationData.deedDetails.deedNumber}
              onTokenizationSuccess={handleTokenizationSuccess}
              onTokenizationError={handleTokenizationError}
            />
          </div>
        )}
      </div>
    </div>
  )
}
