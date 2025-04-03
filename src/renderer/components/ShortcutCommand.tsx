import { AcceleratorElement } from '../../types';
import { useSyncedStore } from '../lib/store';

interface ShortcutCommandProps {
  label: string;
  accelerator: readonly AcceleratorElement[];
}

const getKeyLabel = (key: AcceleratorElement, isMac: boolean) => {
  switch (key) {
    case 'CommandOrControl':
      return isMac ? '⌘' : 'Ctrl';
    case 'Shift':
      return '⇧';
    default:
      return key;
  }
};

export function ShortcutCommand({ label, accelerator }: ShortcutCommandProps) {
  const {
    metadata: { isMac },
  } = useSyncedStore();

  return (
    <div className="flex flex-col rounded px-2 py-1.5 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[11px] leading-none whitespace-nowrap">
          {label}{' '}
        </span>
        <div className="flex gap-1 ml-2">
          {accelerator.map((key) => (
            <span
              key={key}
              className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70"
            >
              {getKeyLabel(key, isMac)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
