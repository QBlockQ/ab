'use client'

import { Connect } from '@stacks/connect-react'
import { UserSession, AppConfig } from '@stacks/connect'

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const authOptions = {
    appDetails: {
      name: 'AB Real Estate',
      icon: '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload()
    },
    userSession,
  }

  return <Connect authOptions={authOptions}>{children}</Connect>
}
