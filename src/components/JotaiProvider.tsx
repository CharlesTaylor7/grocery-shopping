import { createStore, Provider } from "jotai";
import { ReactNode } from "react";

export const JotaiStore = createStore();

interface Props {
  children: ReactNode;
}
export default function JotaiProvider(props: Props) {
  return <Provider store={JotaiStore} >
    {props.children}
  </Provider>
}
