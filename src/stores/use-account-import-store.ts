import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccountImportState {
  hasImportedAccount: boolean;
  setHasImportedAccount: (status: boolean) => void;
}

const useAccountImportStore = create<AccountImportState>()(
  persist(
    (set) => ({
      hasImportedAccount: false,
      setHasImportedAccount: (status: boolean) => set({ hasImportedAccount: status }),
    }),
    {
      name: 'account-import-storage',
    }
  )
);

export default useAccountImportStore;