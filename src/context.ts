import { createContext } from 'react'
import Registry from './Registry'

export interface IsClientFunc {
  (): boolean;
}

interface HeadContextInterface {
  client?: boolean | IsClientFunc;
  registry?: Registry;
}

const context = createContext<HeadContextInterface>({})

const { Provider, Consumer } = context

export default context

export const HeadContextProvider = Provider
export const HeadContextConsumer = Consumer
