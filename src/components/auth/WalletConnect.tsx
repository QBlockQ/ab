'use client'

import { useCallback } from 'react'
import { AppConfig, showConnect, UserSession } from '@stacks/connect'
import { Button } from '@/components/ui/button'

const appConfig = new AppConfig(['store_write', 'publish_data'])
export const userSession = new UserSession({ appConfig })

interface WalletConnectProps {
  buttonText?: string
  className?: string
}

export function WalletConnect({ buttonText = 'Connect Wallet', className }: WalletConnectProps) {
  const authenticate = useCallback(() => {
    showConnect({
      appDetails: {
        name: 'AB Real Estate',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload()
      },
      userSession,
    })
  }, [])

  const disconnect = useCallback(() => {
    userSession.signUserOut('/')
  }, [])

  return (
    <div className="flex items-center gap-4">
      {!userSession.isUserSignedIn() ? (
        <Button 
          onClick={authenticate}
          className={`bg-blue-600 hover:bg-blue-700 text-sm h-8 px-3 ${className}`}
          size="sm"
        >
          {buttonText}
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-medium">
              {userSession.loadUserData()?.profile?.stxAddress?.mainnet || 'Loading...'}
            </p>
            <p className="text-muted-foreground">
              Balance: Loading...
            </p>
          </div>
          <Button 
            onClick={disconnect}
            variant="outline"
            size="sm"
            className="h-8 px-3"
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  )
}
