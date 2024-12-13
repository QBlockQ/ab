'use client'

import { useState } from 'react'
import { useMOJVerification } from '@/hooks/useMOJVerification'
import { API_CONFIG } from '@/config/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { IdType } from '@/services/mojApi'

const formSchema = z.object({
  deedNumber: z.string()
    .min(1, 'Deed number is required')
    .regex(/^\d+$/, 'Deed number must be digits only'),
  idNumber: z.string()
    .min(1, 'ID number is required')
    .regex(/^\d+$/, 'ID number must be digits only'),
  idType: z.enum(['NATIONAL_ID', 'RESIDENT_ID', 'CR_NO', 'FOREIGN_CR_NO'] as const),
})

interface DeedVerificationFormProps {
  onVerificationSuccess: (data: any) => void
  onVerificationError?: (error: any) => void
}

export function DeedVerificationForm({ 
  onVerificationSuccess, 
  onVerificationError 
}: DeedVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { verifyDeed } = useMOJVerification({
    onSuccess: onVerificationSuccess,
    onError: onVerificationError,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deedNumber: '',
      idNumber: '',
      idType: 'NATIONAL_ID',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const result = await verifyDeed(
        parseInt(values.deedNumber),
        values.idNumber,
        values.idType as IdType
      )
      if (result?.data) {
        onVerificationSuccess(result.data)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed'
      console.error(errorMessage)
      if (onVerificationError) {
        onVerificationError(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="deedNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deed Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter deed number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter ID number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(API_CONFIG.MOJ.ID_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Deed'}
        </Button>
      </form>
    </Form>
  )
}
