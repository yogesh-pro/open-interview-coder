import ScreenshotItem from './ScreenshotItem';

interface Screenshot {
  path: string;
  preview: string;
}

interface ScreenshotQueueProps {
  isLoading: boolean;
  screenshots: Screenshot[];
  onDeleteScreenshot: (index: number) => void;
}
function ScreenshotQueue({
  isLoading,
  screenshots,
  onDeleteScreenshot,
}: ScreenshotQueueProps) {
  if (screenshots.length === 0) {
    return null;
  }

  const displayScreenshots = screenshots.slice(0, 5);

  return (
    <div className="flex gap-4">
      {displayScreenshots.map((screenshot, index) => (
        <ScreenshotItem
          key={screenshot.path}
          isLoading={isLoading}
          screenshot={screenshot}
          index={index}
          onDelete={onDeleteScreenshot}
        />
      ))}
    </div>
  );
}

export default ScreenshotQueue;
