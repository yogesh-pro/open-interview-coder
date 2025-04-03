import { SHORTCUTS } from '../../../../constant';
import { ShortcutCommand } from '../../../components/ShortcutCommand';

function SolutionCommands() {
  return (
    <div>
      <div className="pt-2 w-fit">
        <div className="text-xs text-white/90 backdrop-blur-md bg-black/60 rounded-lg py-2 px-4 flex items-center justify-center gap-4">
          {/* Show/Hide - Always visible */}
          <ShortcutCommand
            label="Show/Hide"
            accelerator={SHORTCUTS.TOGGLE_WINDOW}
          />

          {/* Start Over - Always visible */}
          <ShortcutCommand label="Start Over" accelerator={SHORTCUTS.RESET} />
        </div>
      </div>
    </div>
  );
}

export default SolutionCommands;
