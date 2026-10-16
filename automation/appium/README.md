# Android Appium interview practice

This suite automates the bundled Sauce Labs My Demo App APK, independently of the React website, Docker, and Jenkins.

## Run on this Mac

1. Start the Pixel_8 emulator in Android Studio Device Manager. If it shows as unauthorized with no approval prompt, use Cold Boot rather than a saved snapshot.
2. Open a terminal in `automation/appium`.
3. Use the newer installed Node runtime and Android Studio Java for this terminal:

```sh
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
node --version
adb devices
npm test
```

The Node path above currently reports v26 on this Mac. The default v20.7 cannot load these installed dependencies. For another machine, use a supported modern Node installation rather than copying this machine-specific path.

WebdriverIO starts and stops Appium through its Appium service. Do not start a second server on port 4723. Use `ANDROID_UDID=emulator-5554 npm test` to choose a device when several are connected. `ANDROID_APP_PATH` overrides the bundled APK path.

## Read the exercise

- `wdio.conf.ts`: capabilities select Android, UiAutomator2, and the APK. `noReset:false` resets application data when creating sessions.
- `test/screens/store.screen.ts`: reusable native locators and screen actions.
- `test/specs/test.e2e.ts`: catalog, add-to-cart, and remove-from-cart assertions. Each test starts a new session so cart state cannot leak.
- `test-results/`: screenshot and UI hierarchy XML saved on test failure, excluded from Git.

## Explain it in an interview

The TypeScript test uses WebdriverIO to send WebDriver commands to the Appium server. Appium routes native Android commands to the UiAutomator2 driver, which controls the emulator through Android tooling. There is no browser DOM in these tests.

Accessibility IDs (`~Add To Cart button`) use Android content descriptions. Text-based UiSelector locators are Android-specific and may break with localization. Prefer stable unique accessibility IDs where the app provides them. Screen objects keep selectors out of the scenarios.

`await` preserves action order. `waitForDisplayed` and WebdriverIO's retrying assertions wait for conditions instead of arbitrary sleeps. Fresh sessions trade speed for predictable state. Failure screenshots and hierarchy XML help distinguish missing elements, wrong screens, and bad selectors.

Practice next: add a quantity assertion, then change a locator deliberately and inspect the failure artifacts. Add an invalid-login scenario after inspecting the native login screen. iOS uses XCUITest and requires its own app build and platform setup.
