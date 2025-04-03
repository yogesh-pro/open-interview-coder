import { useSyncedStore } from '../../lib/store';
import QueueCommands from './components/QueueCommands';
import ScreenshotQueue from '../../components/ScreenshotQueue';

function Queue() {
  const { screenshotQueue, setScreenshotQueue } = useSyncedStore();

  const handleDeleteScreenshot = async (index: number) => {
    if (index < 0 || index >= screenshotQueue.length) {
      return;
    }

    const newQueue = [...screenshotQueue];
    newQueue.splice(index, 1);
    setScreenshotQueue(newQueue);
  };

  return (
    <div className="bg-transparent w-1/2">
      <div className="px-4 py-3">
        <div className="space-y-3 w-fit">
          <ScreenshotQueue
            screenshots={screenshotQueue}
            onDeleteScreenshot={handleDeleteScreenshot}
          />

          <QueueCommands />
        </div>
      </div>
    </div>
  );
}

export default Queue;
