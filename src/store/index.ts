import { create } from "zustand";

interface Ids {
  admissionId?: string;
  financeId?: string;
  hostelId?: string;
  aluminiId?: string;
  examId?: string;
  libraryId?: string;
  eventId?: string;
  iqacId?: string;
}

export interface State {
  insName?: string;
  name?: string;
  id?: string;
  color?: string | null;
  status?: boolean;
  ids: Ids;
  qid?: string;
  rndId?: string;
  setInsName: (insName: string) => void;
  setName: (name: string) => void;
  setId: (id: string) => void;
  setColor: (color: string) => void;
  setStatus: (status: boolean) => void;
  setIds: (ids: Ids) => void;
  setQid: (qid: string) => void;
  setRndId: (rndId: string) => void;
}

export const useStore = create<State>((set) => ({
  insName: undefined,
  name: undefined,
  id: "651ba22de39dbdf817dd520c",
  // id: "660bd1c7d5016c9947aef713",
  color: undefined,
  status: undefined,
  qid: undefined,
  rndId: undefined,
  ids: {
    admissionId: undefined,
    financeId: undefined,
    hostelId: undefined,
    aluminiId: undefined,
    examId: undefined,
    libraryId: undefined,
    eventId: undefined,
    iqacId: undefined,
  },

  setInsName: (insName) => set({ insName }),
  setName: (name) => set({ name }),
  setId: (id) => set({ id }),
  setColor: (color) => set({ color }),
  setStatus: (status) => set({ status }),
  setIds: (ids) => set((state) => ({ ...state, ids })),
  setQid: (qid) => set({ qid }),
  setRndId: (rndId) => set({ rndId }),
}));
