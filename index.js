var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');

    const { Builder, By, Key, until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');

    (async function example() {
        // headless driver
        var driver = new Builder().forBrowser('chrome')
            .setChromeOptions(new chrome.Options().addArguments('--headless'))
            .build();
        // let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to Url
            await driver.get('https://www.google.com');

            // Enter text "cheese" and perform keyboard action "Enter"
            await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

            let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);

            console.log(await firstResult.getAttribute('textContent'));
        }
        finally {
            driver.quit();
        }
    })();
}).listen(8080);

