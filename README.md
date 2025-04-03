## Open Interview Coder: Your Free AI-Powered Interview Prep Partner
Forget expensive subscription fees! Open Interview Coder delivers the essential features of premium coding interview platforms in a completely free and open-source package. By connecting your own API key, you unlock AI-driven problem analysis, solution generation, and debugging assistance, all running privately on your computer.

**Important Note:** This is a community-led project, not a commercial product. Contributions drive its development.

### Why Open Interview Coder?
The best interview prep tools often hide behind paywalls. This project breaks down that barrier, offering similar powerful features so you can:

- Utilize your own API key (pay only for your usage).
- Maintain complete privacy by running everything locally.
- Adapt the tool to your specific needs through customization.
- Learn from and contribute to an open-source initiative.

### Tailor It to Your Needs
The codebase is built for flexibility:

- **AI Model Choice**: While it defaults to OpenAI's models, you have the power to integrate other AI models like Claude, Deepseek, or Llama by modifying `/src/main/processor`.
- **Expand Language Support**: Adding more programming languages is within your reach.
- **Extend Functionality**: Dream up a new feature? You can build it.
- **Customize the UI**: Make the interface truly your own.

All you need is a basic understanding of JavaScript/TypeScript and the API of the service you want to integrate.

## Core Functionalities
- 🎯 **Stealth Mode:** An almost invisible window that bypasses most screen capture methods.
- 📸 **Smart Capture:** Separate capture of problem text and code for better AI analysis.
- 🤖 **AI Brainpower:** Automatic problem extraction and analysis using GPT-4o.
- 💡 **Solution Insights:** Detailed solutions with time and space complexity analysis.
- 🔧 **Intelligent Debugging:** AI assistance with structured feedback for your code.
- 🎨 **Flexible Window:** Move, resize, adjust opacity, and zoom as needed.
- 🔄 **AI Model Options:** Choose between OpenAI's models or Google Gemini's models for different task.
- 🔒 **Privacy First:** Your API key and data stay local, except for direct calls to OpenAI or Google Gemini.

## Global Shortcuts
These unobtrusive keyboard commands won't clash with other applications:

- Toggle Visibility: `Ctrl + B` or `Cmd + B`
- Move Window: `Ctrl + Arrow keys` or `Cmd + Arrow keys`
- Take Screenshot: `Ctrl + H` or `Cmd + H`
- Process Screenshots: `Ctrl + Enter` or `Cmd + Enter`
- Start New Problem: `Ctrl + R` or `Cmd + R`
- Quit: `Ctrl + Q` or `Cmd + Q`
- Decrease Opacity: `Ctrl + [` or `Cmd + [`
- Increase Opacity: `Ctrl + ]` or `Cmd + ]`
- Open Settings: `Ctrl + Shift + I` or `Cmd + Shift + I`

## Invisibility Details
**Hidden From:**

- Zoom versions older than 6.1.6.
- All browser-based screen recording software.
- All versions of Discord.
- macOS screenshot (Command + Shift + 3/4).

**Visible To:**

- Zoom versions 6.1.6 and above (downgrade if necessary: https://zoom.en.uptodown.com/mac/versions).
- macOS screen recording (Command + Shift + 5).

## Getting Started: Installation and Development Setup
### Prerequisites
Before you begin, ensure you have:

- Node.js (v16 or higher) installed on your system.
- npm package manager.
- An active OpenAI API Key (obtainable from OpenAI) or Google Gemini API Key (obtainable from Google).
- Screen Recording Permission enabled for your Terminal/IDE:
  - **macOS:** Go to System Preferences > Security & Privacy > Privacy > Screen Recording, find Open Interview Coder, and ensure it's checked. Restart the app after enabling.
  - **Windows:** No additional permissions are required.
  - **Linux:** Depending on your distribution, you might need to grant `xhost` access.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone [https://github.com/xhoantran/open-interview-coder.git](https://github.com/xhoantran/open-interview-coder.git)
   cd open-interview-coder
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode
To start the application in a development environment:
```bash
npm run start
```

### Building for Production
To create distributable packages for your local platform:
```bash
npm run package
```
This command will package the application for your current operating system.

### Building Distributable Packages for Specific Platforms
To create installable packages for macOS (DMG) or Windows (Installer):

**For macOS (DMG):**
```bash
npm run package-mac
# Or using yarn
yarn package-mac
```

**For Windows (Installer):**
```bash
npm run package-win
# Or using yarn
yarn package-win
```

The resulting packaged applications will be located in the `release` directory.

**What the packaging scripts do:**

- Create the necessary directories for the application.
- Clean any previous build outputs.
- Build the application in production mode.
- Launch the application in its default invisible state.

### Important Considerations and Troubleshooting
- **Window Manager Conflicts:** Some window management utilities (like Rectangle Pro on macOS) might interfere with the app's window positioning. Consider temporarily disabling them if you encounter issues.
- **OpenAI API Usage:** Be mindful of your OpenAI API key's rate limits and the costs associated with different API calls, especially Vision API calls which are more expensive.
- **Custom LLM Integration:** You can explore integrating other Large Language Models (LLMs) such as Claude, Deepseek, or Grok by modifying the API calls within `/src/main/processor` and updating the UI components like `.
- **Common Issues and Solutions:**
  - If the application window doesn't appear, try toggling its visibility multiple times using `Ctrl+B`/`Cmd+B`.
  - Adjust the window's opacity using `Ctrl+[`/`Cmd+[` and `Ctrl+]`/`Cmd+]` if it seems invisible.

## Comparison with Paid Alternatives
| Feature                         | Premium Tools (Paid) | Open Interview Coder (This Project)      |
|---------------------------------|------------------------|----------------------------------------|
| Price                           | $60+/month             | Free (pay only for your API usage)     |
| Solution Generation             | ✅                      | ✅                                     |
| Debugging Assistance            | ✅                      | ✅                                     |
| Invisibility                    | ✅                      | ✅                                     |
| Multi-language Support          | ✅                      | ✅ (extensible)                        |
| Time/Space Complexity Analysis  | ✅                      | ✅                                     |
| Window Management               | ✅                      | ✅                                     |
| Auth System                     | Required               | None (simplified)                      |
| Payment Processing              | Required               | None (use your own API key)            |
| Privacy                         | Server-processed       | 100% Local Processing                  |
| Customization                   | Limited                | Full Source Code Access                |
| Model Selection                 | Limited                | Choice Between Models                  |

## Tech Stack Highlights
- Electron
- React
- TypeScript
- Tailwind CSS
- Radix UI Components
- OpenAI API
- Google Gemini API

## How It Works: A Functional Overview
1. **Initial Setup:** Launch the discreet window and enter your OpenAI API key in the settings. Select your preferred AI models for different stages of processing.
2. **Problem Capture:** Use `Ctrl + H`/`Cmd + H` to take screenshots of coding problems. Up to two screenshots can be queued. Remove the last one if needed by clicking on the image.
3. **AI-Powered Processing:** Press `Ctrl + Enter`/`Cmd + Enter` to send the screenshots for analysis. The AI, powered by GPT-4 Vision API, extracts the problem details. The chosen AI model then generates an optimal solution, all using your personal OpenAI API key.
4. **Solution and Debugging Insights:** Review the generated solutions with detailed explanations. For debugging, take additional screenshots of error messages or specific code sections to receive AI-driven analysis, including identified issues, corrections, and optimizations. Easily switch between viewing solutions and the screenshot queue.
5. **Window Management:** Move the window using `Ctrl + Arrow keys`/`Cmd + Arrow keys`, toggle its visibility with `Ctrl + B`/`Cmd + B`, and adjust the opacity with `Ctrl + [`/`Cmd + [` and `Ctrl + ]`/`Cmd + ]`. The window remains hidden from the specified screen sharing applications. Start a new problem session with `Ctrl + R`/`Cmd + R`.

## Extending AI Model Support
Open Interview Coder is built with extensibility in mind. You can easily add support for more LLMs beyond the default OpenAI integration:

- Integrate models like Claude, Deepseek, Grok, or any other AI with an accessible API.
- The application's architecture is designed to accommodate multiple LLM backends simultaneously.
- Users gain the flexibility to choose their preferred AI provider for different tasks.

To add a new AI model, you'll need to extend the API integration within `electron/ProcessingHelper.ts` and add the corresponding user interface options in `src/components/Settings/SettingsDialog.tsx`. The modular design aims to make this process straightforward without disrupting the existing functionality.

## Configuration Options
- **OpenAI API Key:** Your personal API key is stored locally and is exclusively used for making API calls to OpenAI.
- **AI Model Selection:** You can choose between GPT-4o and GPT-4o-mini for each of these stages:
  - Problem Extraction: Analyzing screenshots to understand the coding problem.
  - Solution Generation: Creating optimized solutions with detailed explanations.
  - Debugging: Providing in-depth analysis of errors and suggestions for improvement.
- **Preferred Language:** Select your preferred programming language for the generated solutions.
- **Window Controls:** Adjust the window's opacity, position, and zoom level using the provided keyboard shortcuts.
- **Local Storage:** All your settings are stored locally within your user data directory and are preserved across application sessions.

## License
This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

### What This Means for You
- You have the freedom to use, modify, and distribute this software.
- If you make any modifications to the code, you are required to make your changes available under the same license.
- If you run a modified version of this software on a network server, you must make the source code available to its users.
- We strongly encourage you to contribute any improvements you make back to the main project for the benefit of the community.

For a summary of the license terms, see the [LICENSE-SHORT](LICENSE-SHORT) file, or visit [GNU AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) for the complete license text.

### Contributing
We warmly welcome contributions from the community! Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on how you can get involved.

## Disclaimer and Ethical Use
This tool is intended as a learning aid and a practice tool to assist you in preparing for technical interviews. While it can be valuable in understanding problems and exploring solution approaches, please adhere to these ethical guidelines:

- Be transparent about using assistance tools if explicitly asked during an interview.
- Use this tool to deepen your understanding of concepts, rather than solely to obtain answers.
- Recognize that the true value lies in comprehending the solutions, not just presenting them.
- In the context of take-home assignments, ensure that you thoroughly understand any solutions you submit.

Remember that the primary goal of technical interviews is to assess your problem-solving skills and your understanding of fundamental concepts. This tool is most effective when used to enhance your learning process, not as a substitute for genuine understanding and effort.

## Support and Questions
If you have any questions, require support, or encounter issues, please do not hesitate to open a new issue on the GitHub repository.

---
> **A Gentle Reminder:** This is a community-driven project. If you find it valuable, please consider contributing your skills and insights to help it grow, rather than just submitting feature requests. Your contributions are what make this project thrive!