import { existsSync } from "fs";

const WINDOWS_CHROME =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const MAC_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

// Find available Chromium/Chrome executable in production (Linux)
function findChromiumExecutable(): string {
  const possiblePaths = [
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];

  for (const path of possiblePaths) {
    if (existsSync(path)) {
      console.log(`Found Chromium at: ${path}`);
      return path;
    }
  }

  // Fallback to chromium-browser if none found (will fail at runtime if missing)
  console.warn("No Chromium executable found, using fallback: /usr/bin/chromium-browser");
  return "/usr/bin/chromium-browser";
}

function resolveExecutablePath() {
  switch (process.platform) {
    case "win32":
      return WINDOWS_CHROME;
    case "linux":
      return findChromiumExecutable();
    default:
      return MAC_CHROME;
  }
}

export async function getOptions(isDev: boolean) {
  const executablePath = resolveExecutablePath();

  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath,
      headless: true,
    };
  } else {
    options = {
      args: ["--no-sandbox", "--font-render-hinting=none"],
      executablePath,
      headless: true,
    };
  }

  return options;
}
