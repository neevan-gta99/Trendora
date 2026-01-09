// hooks/useHomePageData.ts
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store/store';
import { fetchHomepageData } from '@/redux/features/customer/homepageSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { HomepageData } from '@/DTOs/productDetails';

const emptyHomepageData: HomepageData["productInfo"] = {
  categories: { mens: [], womens: [], boys: [], girls: [], accessories: [] },
  metadata: { version: '', cachedAt: '', ttl: 0, sectionsCount: 0 },
  showcases: {
    mensWear: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    womensWear: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    boysBrands: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    girlsGrands: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    bags: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    suitcases: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
    luggages: { key: '', redisId: '', data: [], timestamp: '', sourceSchemas: [], count: 0 },
  },
  stats: { totalProducts: 0, lastUpdated: '' }
};

// Selectors
const selectHomepage = (state: RootState) => state.homepage;
const selectHomepageData = createSelector(
  [selectHomepage],
  (homepage) => homepage.data?.productInfo || emptyHomepageData
);

const selectHomepageLoading = createSelector([selectHomepage], (homepage) => homepage.loading);
const selectHomepageError = createSelector([selectHomepage], (homepage) => homepage.error);
const selectLastFetched = createSelector([selectHomepage], (homepage) => homepage.lastFetched);

// Section selectors
const selectMensWear = createSelector([selectHomepageData], (data) => data.showcases?.mensWear?.data || []);
const selectWomensWear = createSelector([selectHomepageData], (data) => data.showcases?.womensWear?.data || []);
const selectBoysBrands = createSelector([selectHomepageData], (data) => data.showcases?.boysBrands?.data || []);
const selectGirlsGrands = createSelector([selectHomepageData], (data) => data.showcases?.girlsGrands?.data || []);
const selectBags = createSelector([selectHomepageData], (data) => data.showcases?.bags?.data || []);
const selectSuitcases = createSelector([selectHomepageData], (data) => data.showcases?.suitcases?.data || []);
const selectLuggages = createSelector([selectHomepageData], (data) => data.showcases?.luggages?.data || []);

// Main hook
export const useHomepage = () => {
  const dispatch = useAppDispatch();

  const data = useSelector(selectHomepageData);
  const loading = useSelector(selectHomepageLoading);
  const error = useSelector(selectHomepageError);
  const lastFetched = useSelector(selectLastFetched);

  const refetch = () => dispatch(fetchHomepageData());

  const isStale = () => {
    if (!lastFetched) return true;
    const lastFetchedTime = new Date(lastFetched).getTime();
    const now = Date.now();
    return (now - lastFetchedTime) > (30 * 60 * 1000);
  };

  return {
    data,
    loading,
    error,
    lastFetched,
    refetch,
    isStale: isStale(),

    // Individual sections
    mensWear: useSelector(selectMensWear),
    womensWear: useSelector(selectWomensWear),
    boysBrands: useSelector(selectBoysBrands),
    girlsGrands: useSelector(selectGirlsGrands),
    bags: useSelector(selectBags),
    suitcases: useSelector(selectSuitcases),
    luggages: useSelector(selectLuggages),

    // Metadata
    metadata: data.metadata,
    stats: data.stats,
    totalProducts: data.stats?.totalProducts || 0,
  };
};

// Individual section hooks (unchanged)
export const useMensWear = () => {
  const { mensWear, loading, error, refetch } = useHomepage();
  return { products: mensWear, loading, error, refetch, count: mensWear.length };
};
export const useWomensWear = () => {
  const { womensWear, loading, error, refetch } = useHomepage();
  return { products: womensWear, loading, error, refetch, count: womensWear.length };
};
export const useBoysBrands = () => {
  const { boysBrands, loading, error, refetch } = useHomepage();
  return { products: boysBrands, loading, error, refetch, count: boysBrands.length };
};
export const useGirlsGrands = () => {
  const { girlsGrands, loading, error, refetch } = useHomepage();
  return { products: girlsGrands, loading, error, refetch, count: girlsGrands.length };
};
export const useBags = () => {
  const { bags, loading, error, refetch } = useHomepage();
  return { products: bags, loading, error, refetch, count: bags.length };
};
export const useSuitcases = () => {
  const { suitcases, loading, error, refetch } = useHomepage();
  return { products: suitcases, loading, error, refetch, count: suitcases.length };
};
export const useLuggages = () => {
  const { luggages, loading, error, refetch } = useHomepage();
  return { products: luggages, loading, error, refetch, count: luggages.length };
};
//let see