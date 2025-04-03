import { SHORTCUTS } from '../../../../constant';
import { ShortcutCommand } from '../../../components/ShortcutCommand';
import { useSyncedStore } from '../../../lib/store';

function QueueCommands() {
  const { screenshotQueue } = useSyncedStore();

  return (
    <div>
      <div className="pt-2 w-fit">
        <div className="text-xs text-white/90 bg-black/60 rounded-lg py-2 px-4 flex items-center justify-center gap-4">
          {/* Screenshot */}
          <ShortcutCommand
            label="Screenshot"
            accelerator={SHORTCUTS.SCREENSHOT}
          />

          {/* Solve Command */}
          {screenshotQueue.length > 0 && (
            <ShortcutCommand label="Solve" accelerator={SHORTCUTS.SOLVE} />
          )}

          {/* Toggle Window */}
          <ShortcutCommand
            label="Show/Hide"
            accelerator={SHORTCUTS.TOGGLE_WINDOW}
          />
        </div>
      </div>
    </div>
  );
}

export default QueueCommands;
