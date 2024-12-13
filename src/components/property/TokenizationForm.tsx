'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PropertyToken } from '@/types/tokenization'
import { TokenizationService } from '@/services/tokenizationService'
import { BitcoinService } from '@/services/bitcoinService'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  propertyValue: z.string()
    .min(1, 'Property value is required')
    .regex(/^\d+$/, 'Value must be digits only')
    .transform(val => parseInt(val, 10))
    .refine(val => val > 0, 'Value must be greater than 0'),
  isLinkedToBTC: z.boolean()
})

interface TokenizationFormProps {
  deedNumber: string
  onTokenizationSuccess: (token: PropertyToken) => void
  onTokenizationError?: (error: any) => void
}

export function TokenizationForm({
  deedNumber,
  onTokenizationSuccess,
  onTokenizationError
}: TokenizationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLinkedToBTC, setIsLinkedToBTC] = useState(false)
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const tokenizationService = new TokenizationService()
  const bitcoinService = new BitcoinService()

  useEffect(() => {
    let mounted = true;
    
    const fetchBTCPrice = async () => {
      try {
        const priceData = await bitcoinService.getBTCPrice();
        if (mounted) {
          setBtcPrice(priceData.price);
        }
      } catch (error) {
        if (mounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch BTC price';
          console.error(errorMessage);
          if (onTokenizationError) {
            onTokenizationError(error);
          }
        }
      }
    };

    if (isLinkedToBTC) {
      fetchBTCPrice();
      // Refresh price every 30 seconds
      const interval = setInterval(fetchBTCPrice, 30000);
      return () => {
        mounted = false;
        clearInterval(interval);
      };
    }

    return () => {
      mounted = false;
    };
  }, [isLinkedToBTC, bitcoinService, onTokenizationError]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyValue: '',
      isLinkedToBTC: false
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Submitting tokenization form:', values)
      setIsSubmitting(true)
      const token = await tokenizationService.mintPropertyTokens({
        deedNumber,
        propertyValue: values.propertyValue,
        isLinkedToBTC: values.isLinkedToBTC
      })
      console.log('Tokenization successful:', token)
      onTokenizationSuccess(token)
    } catch (error) {
      console.error('Tokenization error:', error)
      onTokenizationError?.(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenize Your Property</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="propertyValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Value (SAR)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter property value in SAR"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Link to Bitcoin Price</label>
              <div 
                className="relative w-16 h-8 cursor-pointer"
                onClick={() => {
                  setIsLinkedToBTC(!isLinkedToBTC)
                  form.setValue('isLinkedToBTC', !isLinkedToBTC)
                }}
              >
                <div className={`absolute w-16 h-8 rounded-full transition-colors ${
                  isLinkedToBTC ? 'bg-orange-500' : 'bg-gray-200'
                }`}>
                  <div className={`absolute w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform top-1 ${
                    isLinkedToBTC ? 'left-9' : 'left-1'
                  } flex items-center justify-center`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isLinkedToBTC ? "#f97316" : "#9ca3af"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m3.94.694-.346 1.97M8.863 6.817l-3.003-.53m3.003.53L8.516 8.788" />
                    </svg>
                  </div>
                </div>
              </div>
              {btcPrice && (
                <p className="text-sm text-muted-foreground">
                  Current BTC Price: {btcPrice.toLocaleString()} SAR
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Tokenization Details</p>
              <div className="text-sm text-muted-foreground">
                <p>• Total Tokens: 2,100</p>
                <p>• Price per Token: {form.watch('propertyValue') 
                  ? `${(parseInt(form.watch('propertyValue')) / 2100).toFixed(2)} SAR` 
                  : '0.00 SAR'}</p>
                <p>• {isLinkedToBTC ? 'Linked to BTC price' : 'Fixed price in SAR'}</p>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Processing...' : 'Tokenize Property'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
