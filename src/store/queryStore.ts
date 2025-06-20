import { IParams } from '@/types/api';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IUserState {
    query: IParams;
    grid: string;
    setQuery: (query: IParams) => void;
    updateGrid: (grid: string) => void;
    reset: () => void;
}

const initialFilter = {
    query: {},
    grid: '',
};

export const useFilterStore = create<IUserState>()(
    devtools(
        persist(
            immer((set) => ({
                ...initialFilter,
                setQuery: (query) => {
                    set((state) => {
                        state.query = query;
                    });
                },
                updateGrid: (grid) => {
                    set((state) => {
                        state.grid = grid;
                    });
                },
                reset: () => {
                    set((state) => {
                        state.query = {};
                    });
                },
            })),
            { name: 'filterStore' }
        ),
        { name: 'filterDevtool' }
    )
);
