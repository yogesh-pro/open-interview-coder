import { cn } from '../lib/utils';

interface ShortcutCommandProps {
  title: string;
  description: string;
  shortcut: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export function ShortcutCommand(props: ShortcutCommandProps) {
  const { title, description, shortcut, onClick, isDisabled = false } = props;

  return (
    <button
      type="button"
      className={cn(
        'w-full cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors',
        isDisabled && 'opacity-50 pointer-events-none',
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="truncate">{title}</span>
        <div className="flex gap-1 flex-shrink-0">
          {shortcut.split('').map((key) => (
            <span
              key={key}
              className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] leading-none"
            >
              {key}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-left leading-relaxed text-white/70 truncate mt-1">
        {description}
      </p>
    </button>
  );
}
