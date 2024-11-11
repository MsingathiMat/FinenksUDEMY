

"use client"

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'

// Lazy load the production devtools
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
)

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [showDevtools, setShowDevtools] = React.useState(false)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 0,
      },
    },
  })

  // Toggle the devtools in production with window toggleDevtools
  React.useEffect(() => {
    // @ts-expect-error mnmm
    window.toggleDevtools = () => setShowDevtools((prev) => !prev)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Render the devtools if the toggle is activated */}
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction initialIsOpen={false} />
        </React.Suspense>
      )}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider






