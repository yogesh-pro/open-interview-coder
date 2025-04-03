import { useState } from 'react';
import { trimmedApiKey } from '../utils';
import { Button } from './Button';

type APIKeyProps = {
  label: string;
  description: string;
  linkUrl?: string;
  linkText?: string;
  apiKey: string | null;
  setApiKey: (key: string) => void;
};

export function APIKeyInput({
  label,
  description,
  linkUrl,
  linkText = 'instructions',
  apiKey,
  setApiKey,
}: APIKeyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [keyHolder, setKeyHolder] = useState('');

  const handleSave = () => {
    setApiKey(keyHolder);
    setKeyHolder('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setKeyHolder('');
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center gap-x-6">
      <div className="max-w-1/2 w-full">
        <label
          htmlFor={`${label.toLowerCase().replace(/\s/g, '-')}-api-key`}
          className="block text-sm/6 font-medium text-white"
        >
          {label}
        </label>
        <p className="mt-1 text-sm/6 text-gray-400">
          {description}{' '}
          {linkUrl && (
            <>
              <a
                href={linkUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                {linkText}
              </a>{' '}
            </>
          )}
        </p>
      </div>

      <div>
        {isEditing || apiKey === null ? (
          <div className="flex items-center gap-x-2">
            <input
              id={`${label.toLowerCase().replace(/\s/g, '-')}-api-key`}
              name={`${label.toLowerCase().replace(/\s/g, '-')}-api-key`}
              type="password"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              placeholder="Enter your key"
              value={keyHolder}
              onChange={(e) => setKeyHolder(e.target.value)}
            />
            <Button onClick={handleSave} title="Save" variant="primary" />
            <Button onClick={handleCancel} title="Cancel" />
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            title={apiKey ? trimmedApiKey(apiKey) : 'Add key'}
          />
        )}
      </div>
    </div>
  );
}
