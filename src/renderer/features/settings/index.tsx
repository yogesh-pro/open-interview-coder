import { ChevronDown } from 'lucide-react';
import {
  GEMINI_MODELS,
  LANGUAGES,
  OPEN_AI_MODELS,
  RECOMMENDED_EXTRACTION_MODEL,
  RECOMMENDED_SOLITION_MODEL,
} from '../../../constant';
import { LanguageType } from '../../../types';
import { isGeminiModel, isOpenAIModel, ModelType } from '../../../types/models';
import { useSyncedStore } from '../../lib/store';
import { APIKeyInput } from './components/APIKeyInput';
import { ModelSelection } from './components/ModelSelection';

export function Settings() {
  const {
    openAIApiKey,
    setOpenAIApiKey,
    geminiApiKey,
    setGeminiApiKey,
    solutionModel,
    setSolutionModel,
    extractionModel,
    setExtractionModel,
    language,
    setLanguage,
  } = useSyncedStore();

  const VALID_MODELS: ModelType[] = [];
  if (openAIApiKey) {
    VALID_MODELS.push(...Object.values(OPEN_AI_MODELS));
  }
  if (geminiApiKey) {
    VALID_MODELS.push(...Object.values(GEMINI_MODELS));
  }

  const handleSetOpenAiKey = (key: string) => {
    if (key === '') {
      setOpenAIApiKey(null);
      if (isOpenAIModel(solutionModel)) {
        setSolutionModel(null);
      }
      if (isOpenAIModel(extractionModel)) {
        setExtractionModel(null);
      }
      return;
    }
    setOpenAIApiKey(key);
  };

  const handleSetGeminiKey = (key: string) => {
    if (key === '') {
      setGeminiApiKey(null);
      if (isGeminiModel(solutionModel)) {
        setSolutionModel(null);
      }
      if (isGeminiModel(extractionModel)) {
        setExtractionModel(null);
      }
      return;
    }
    setGeminiApiKey(key);
  };

  return (
    <div className="max-w-3xl bg-gray-900/80 py-10">
      <header>
        <div className="mx-auto w-full px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Settings
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto w-full p-8 space-y-12">
          {/* General */}
          <div>
            <h2 className="text-base/7 font-semibold text-white">General</h2>

            <dl className="mt-6 text-sm/6 space-y-8">
              <div className="flex justify-between items-center">
                <div className="max-w-1/2">
                  <label
                    htmlFor="extraction-model"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Default language
                  </label>
                  <p className="mt-1 text-sm/6 text-gray-400">
                    Select the default language for the application.
                  </p>
                </div>

                <div className="grid grid-cols-1">
                  <select
                    id="extraction-model"
                    name="extraction-model"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    value={language}
                    onChange={(e) => {
                      const selectedLanguage = e.target.value as LanguageType;
                      setLanguage(selectedLanguage);
                    }}
                  >
                    {Object.values(LANGUAGES).map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </div>
              </div>
            </dl>
          </div>

          {/* Models */}
          <div>
            <h2 className="text-base/7 font-semibold text-white">Models</h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              There are multiple models available for extraction and solution
              generation.
            </p>

            <dl className="mt-6 text-sm/6 space-y-8">
              <ModelSelection
                label="Extraction Model"
                description="Select the model that will be used for extracting information from screenshots."
                value={extractionModel}
                onChange={setExtractionModel}
                options={VALID_MODELS}
                recommended={RECOMMENDED_EXTRACTION_MODEL}
              />

              <ModelSelection
                label="Solution Model"
                description="Select the model that will be used for generating solutions from extracted information."
                value={solutionModel}
                onChange={setSolutionModel}
                options={VALID_MODELS}
                recommended={RECOMMENDED_SOLITION_MODEL}
              />
            </dl>
          </div>

          {/* API Key */}
          <div>
            <h2 className="text-base/7 font-semibold text-white">API Key</h2>

            <dl className="mt-6 text-sm/6 space-y-8">
              <APIKeyInput
                label="Open AI API Key"
                description="Please follow the instructions to set up your OpenAI API key."
                apiKey={openAIApiKey}
                setApiKey={handleSetOpenAiKey}
                linkUrl="https://platform.openai.com/api-keys"
                linkText="Instruction link"
              />

              <APIKeyInput
                label="Google Gemini API Key"
                description="Please follow the instructions to set up your Google Gemini API key."
                apiKey={geminiApiKey}
                setApiKey={handleSetGeminiKey}
                linkUrl="https://aistudio.google.com/apikey"
                linkText="Instruction link"
              />
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
