import { ChevronDown } from 'lucide-react';
import { ModelType } from '../../../../types/models';

type ModelSelectionProps = {
  label: string;
  description: string;
  value: ModelType | null;
  onChange: (value: ModelType) => void;
  options: ModelType[];
  recommended?: readonly ModelType[];
};

export function ModelSelection({
  label,
  description,
  value,
  onChange,
  options,
  recommended = [],
}: ModelSelectionProps) {
  const id = `model-selection-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex justify-between items-center">
      <div className="max-w-1/2">
        <label htmlFor={id} className="block text-sm/6 font-medium text-white">
          {label}
        </label>
        <p className="mt-1 text-sm/6 text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1">
        <select
          id={id}
          name={id}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          value={value || ''}
          onChange={(e) => onChange(e.target.value as ModelType)}
        >
          {options.length === 0 ? (
            <option value="" disabled>
              No models available
            </option>
          ) : (
            <option value="" disabled>
              Select a model
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}{' '}
              {recommended?.includes(option) && (
                <span className="text-green-500">(Recommended)</span>
              )}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
        />
      </div>
    </div>
  );
}
