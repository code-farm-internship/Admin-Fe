import { useFilterStore } from '@/store/queryStore';
import { IParams } from '@/types/api';
import _ from 'lodash';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useFilter = () => {
    const query = useFilterStore((state) => state.query);
    const grid = useFilterStore((state) => state.grid);
    const setQuery = useFilterStore((state) => state.setQuery);
    const resetFilter = useFilterStore((state) => state.reset);
    const updateGrid = useFilterStore((state) => state.updateGrid);
    const [searchParams, __] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const reset = () => {
        resetFilter();
        void navigate(pathname);
    };

    const updateGridUI = (gridClass: string) => {
        updateGrid(gridClass);
    };

    const updateQueryParams = (params: IParams) => {
        const newParams = new URLSearchParams(searchParams.toString());
        const validParams = _.omitBy(params, (param) => {
            return param === '' || param === undefined || param === null;
        });

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newParams.set(key, String(value));
            } else {
                newParams.delete(key);
            }
        });

        setQuery(validParams);
        void navigate(`${pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
        const params: IParams = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });

        setQuery(params);
    }, []);

    return { reset, updateGridUI, updateQueryParams, query, grid };
};

export default useFilter;
