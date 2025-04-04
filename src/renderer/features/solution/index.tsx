import { useSyncedStore } from '../../lib/store';
import { ComplexitySection } from './components/ComplexitySection';
import { ContentSection } from './components/ContentSection';
import SolutionCommands from './components/SolutionCommands';
import { SolutionSection } from './components/SolutionSection';

function Solutions() {
  const { problemInfo, solutionData } = useSyncedStore();

  return (
    <div className="relative w-full space-y-3 px-4 py-3 overflow-hidden">
      {/* Navbar of commands with the SolutionsHelper */}
      <SolutionCommands />

      {/* Main Content - Modified width constraints */}
      <div className="w-full h-full text-sm text-black bg-black/30 rounded-lg">
        <div className="flex px-4 py-3 space-y-4 max-w-full">
          <div className="w-full max-w-1/2 space-y-8">
            <ContentSection
              title="Problem Statement"
              content={problemInfo?.problem_statement}
              isLoading={!problemInfo}
            />

            {solutionData && (
              <>
                <ContentSection
                  title="My Thoughts"
                  content={
                    solutionData.thoughts && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          {solutionData.thoughts.map((thought) => (
                            <div
                              key={thought}
                              className="flex items-start gap-2"
                            >
                              <div className="w-1 h-1 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                              <div>{thought}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  isLoading={!solutionData}
                />
                <ComplexitySection
                  timeComplexity={solutionData.time_complexity}
                  spaceComplexity={solutionData.space_complexity}
                  isLoading={!solutionData}
                />
              </>
            )}
          </div>

          <div className="w-fit">
            {solutionData ? (
              <SolutionSection
                title="Solution"
                content={solutionData.code}
                isLoading={!solutionData}
              />
            ) : (
              <div className="space-y-1.5">
                <div className="mt-4 flex">
                  <p className="text-xs text-transparent">
                    Loading solutions...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solutions;
