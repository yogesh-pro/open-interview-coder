import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { SubscribedApp } from './_pages/SubscribedApp';
import { DynamicContainer } from './components/DynamicContainer';
import {
  Toast,
  ToastDescription,
  ToastMessage,
  ToastProvider,
  ToastTitle,
  ToastVariant,
  ToastViewport,
} from './components/ui/toast';
import { ToastContext } from './contexts/toast';
import './global.css';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: Infinity,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Root component that provides the QueryClient
function App() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    title: '',
    description: '',
    variant: 'neutral',
  });
  const [currentLanguage, setCurrentLanguage] = useState<string>('python');

  // Show toast method
  const showToast = useCallback(
    (title: string, description: string, variant: ToastVariant) => {
      setToastMessage({ title, description, variant });
      setToastOpen(true);
    },
    [],
  );

  // Memoize the context value to prevent unnecessary re-renders
  const toastContextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContainer>
        <ToastProvider>
          <ToastContext.Provider value={toastContextValue}>
            <SubscribedApp
              currentLanguage={currentLanguage}
              setLanguage={setCurrentLanguage}
            />
            <Toast
              open={toastOpen}
              onOpenChange={setToastOpen}
              variant={toastMessage.variant}
              duration={3000}
            >
              <ToastTitle>{toastMessage.title}</ToastTitle>
              <ToastDescription>{toastMessage.description}</ToastDescription>
            </Toast>
            <ToastViewport />
          </ToastContext.Provider>
        </ToastProvider>
      </DynamicContainer>
    </QueryClientProvider>
  );
}

export default App;
