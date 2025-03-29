import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import QueueCommands from '../components/Queue/QueueCommands';
import ScreenshotQueue from '../components/Queue/ScreenshotQueue';

import { useToast } from '../contexts/toast';
import { Screenshot } from '../types/screenshots';

async function fetchScreenshots(): Promise<Screenshot[]> {
  try {
    const existing = await window.electronAPI.getScreenshots();
    return existing;
  } catch (error) {
    console.error('Error loading screenshots:', error);
    throw error;
  }
}

interface QueueProps {
  setView: (view: 'queue' | 'solutions' | 'debug') => void;
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

function Queue({ setView, currentLanguage, setLanguage }: QueueProps) {
  const { showToast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: screenshots = [], refetch } = useQuery<Screenshot[]>({
    queryKey: ['screenshots'],
    queryFn: fetchScreenshots,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const handleDeleteScreenshot = async (index: number) => {
    const screenshotToDelete = screenshots[index];

    try {
      const response = await window.electronAPI.deleteScreenshot(
        screenshotToDelete.path,
      );

      if (response.success) {
        refetch(); // Refetch screenshots instead of managing state directly
      } else {
        console.error('Failed to delete screenshot:', response.error);
        showToast('Error', 'Failed to delete the screenshot file', 'error');
      }
    } catch (error) {
      console.error('Error deleting screenshot:', error);
    }
  };

  useEffect(() => {
    // Set up event listeners
    const cleanupFunctions = [
      window.electronAPI.onScreenshotTaken(() => refetch()),
      window.electronAPI.onResetView(() => refetch()),

      window.electronAPI.onSolutionError((error: string) => {
        showToast(
          'Processing Failed',
          'There was an error processing your screenshots.',
          'error',
        );
        setView('queue'); // Revert to queue if processing fails
        console.error('Processing error:', error);
      }),
      window.electronAPI.onProcessingNoScreenshots(() => {
        showToast(
          'No Screenshots',
          'There are no screenshots to process.',
          'neutral',
        );
      }),
    ];

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [refetch, setView, showToast]);

  return (
    <div ref={contentRef} className="bg-transparent w-1/2">
      <div className="px-4 py-3">
        <div className="space-y-3 w-fit">
          <ScreenshotQueue
            isLoading={false}
            screenshots={screenshots}
            onDeleteScreenshot={handleDeleteScreenshot}
          />

          <QueueCommands
            screenshotCount={screenshots.length}
            currentLanguage={currentLanguage}
            setLanguage={setLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default Queue;
