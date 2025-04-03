import { Screenshot } from '../../types';

interface ScreenshotItemProps {
  screenshot: Screenshot;
  onDelete: (index: number) => void;
  index: number;
}

function ScreenshotItem({ screenshot, onDelete, index }: ScreenshotItemProps) {
  return (
    <button
      type="button"
      className="border border-white relative w-[128px] h-[72px]"
      onClick={() => onDelete(index)}
    >
      <img
        src={`data:image/png;base64,${screenshot.data}`}
        alt="Screenshot"
        className="w-full h-full object-cover transition-transform duration-300 cursor-pointer group-hover:scale-105 group-hover:brightness-75"
      />
    </button>
  );
}

export default ScreenshotItem;
