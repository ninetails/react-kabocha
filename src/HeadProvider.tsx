import React from 'react'
import { HeadContextProvider, IsClientFunc } from './context'
import Registry from './Registry'

interface HeadProviderProps {
  children?: React.ReactNode;
  client?: boolean | IsClientFunc;
  registry?: Registry;
}

function HeadProvider({
  children,
  client,
  registry
}: HeadProviderProps): React.ReactNode {
  if (!registry) {
    registry = new Registry
  }

  const isClient = typeof client === 'function' ? client() : client

  return (
    <HeadContextProvider value={{ client: isClient, registry }}>
      {children}
    </HeadContextProvider>
  )
}

export default HeadProvider as React.FunctionComponent<HeadProviderProps>
