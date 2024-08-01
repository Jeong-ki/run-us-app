import React from 'react';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import store from '@/store';
import {ErrorBoundary} from '@/components/layout';
import AppInner from './AppInner';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <AppInner />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
