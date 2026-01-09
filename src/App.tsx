// App.tsx
import { useEffect, useState } from 'react';
import AppRoutes from './Routes';
import { useAppDispatch } from './redux/hooks';
import { fetchHomepageData } from './redux/features/customer/homepageSlice';
import { persistor, store } from './redux/store/store';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // App load pe homepage data fetch karo
    const initializeApp = async () => {
      console.log('🚀 App initialization started...');

      console.log('🔄 Initial homepage data fetch...');
      dispatch(fetchHomepageData());

    };

    initializeApp();

  }, []);

  return <AppRoutes />;
}

export default App;