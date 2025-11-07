import { existsSync } from "fs";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

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

export async function getOptions(isDev: boolean) {
  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: ["--no-sandbox", "--font-render-hinting=none"],
      executablePath: findChromiumExecutable(),
      headless: true,
    };
  }

  return options;
}
