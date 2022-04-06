const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const { off } = require('process');

var s = `return Array.from(document.getElementsByTagName('tr')).map((x) => {
	let currentTdLatin = x.childNodes[1];
	let currentTdCyrillic = x.childNodes[3];

	if(currentTdLatin?.firstChild?.tagName === 'A') {
		return {
            name: currentTdLatin.firstChild.innerHTML, 
            cyrillic: currentTdCyrillic?.innerHTML,
            link: currentTdLatin.firstChild.href
        }
	}

	return null;
})`;

new Builder().forBrowser('firefox').build().then(async (driver) => {

    await driver.get('https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Russia');

    const listOfCities = await driver.executeScript(s);

    for (const city of listOfCities) {
        if (!city) {
            continue;
        }
    }
})