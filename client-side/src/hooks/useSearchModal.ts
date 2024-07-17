import { create } from "zustand";

export type SearchQuery = {
    city: string | undefined;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
    bathrooms: number;
    bedrooms: number;
    category: string;
    area: number;
    
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: {
        city: '',
        checkIn: undefined,
        checkOut: undefined,
        guests: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        category: ''
    }
}));

export default useSearchModal;