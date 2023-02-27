const Selenium = require("selenium-webdriver");
const Firefox = require("selenium-webdriver/firefox");
const { writeFile } = require("fs/promises");
async function screenshot() {
  const builder = new Selenium.Builder();
  builder.forBrowser(Selenium.Browser.FIREFOX);
  builder.setFirefoxOptions(
    new Firefox.Options().windowSize({
      width: 500,
      height: 500,
    })
  );
  const driver = await builder.build();
  await driver.get(process.argv[2]);
  await new Promise((n) => setTimeout(n, 60000));
  const png = await driver.takeScreenshot();
  await writeFile(`./screenshot.png`, Buffer.from(png, "base64"));
}
screenshot();
