'use client'

export default function TestEnvPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify({
          NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
          NEXT_PUBLIC_STACKS_API_URL: process.env.NEXT_PUBLIC_STACKS_API_URL,
          NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          NEXT_PUBLIC_CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME,
          MOJ_API_KEY: process.env.MOJ_API_KEY ? '[SET]' : '[NOT SET]',
          EMILY_API_URL: process.env.EMILY_API_URL ? '[SET]' : '[NOT SET]',
          MEMPOOL_API_URL: process.env.MEMPOOL_API_URL ? '[SET]' : '[NOT SET]',
        }, null, 2)}
      </pre>
    </div>
  )
}
