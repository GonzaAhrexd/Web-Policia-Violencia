import { create } from 'zustand';

interface State {
  openModalVictima: boolean;
  openModalVictimario: boolean;
  openModalTercero: boolean;
  victimaCargar: any;
  victimarioCargar: any;
  terceroCargar: any;
  setOpenModalVictima: (open: boolean) => void;
  setOpenModalVictimario: (open: boolean) => void;
  setOpenModalTercero: (open: boolean) => void;
  setVictimaCargar: (data: any) => void;
  setVictimarioCargar: (data: any) => void;
  setTerceroCargar: (data: any) => void;
}

export const useStore = create<State>((set) => ({
  openModalVictima: false,
  openModalVictimario: false,
  openModalTercero: false,
  victimaCargar: null,
  victimarioCargar: null,
  terceroCargar: null,
  setOpenModalVictima: (open) => set({ openModalVictima: open }),
  setOpenModalVictimario: (open) => set({ openModalVictimario: open }),
  setOpenModalTercero: (open) => set({ openModalTercero: open }),
  setVictimaCargar: (data) => set({ victimaCargar: data }),
  setVictimarioCargar: (data) => set({ victimarioCargar: data }),
  setTerceroCargar: (data) => set({ terceroCargar: data }),
}));