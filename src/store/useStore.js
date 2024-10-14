import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react-lite';

export function useStore() {
  return useContext(MobXProviderContext);
}