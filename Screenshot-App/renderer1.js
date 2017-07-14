 alert("hello");
var electron = require('electron');
var desktopCapturer = electron.desktopCapturer;
var electronScreen = electron.screen;
var shell = electron.shell;

var fs = require('fs');
var os = require('os');
var path = require('path');

var screenshot = document.getElementById('screen-shot');
var screenshotMsg = document.getElementById('screenshot-path');

screenshot.addEventListener('click', function(event) {
	screenshotMsg.textContent = 'Gathering screens...';
	const thumbSize = determineScreenShot();
	let options = {types : ['screen'], thumbnailSize: thumSize};

	desktopCapturer.getSources(options, function(error, sources){
		if(error) return console.log(error.message);

		sources.forEach(function(source){
			if(source.name === 'Entire Screen' || source.name === 'Screen 1'){
				const screenshotPath = path.join(os.tmpdir(), "/screenshot.png");

				fs.writeFile(screenshotPath, source.thumbnail.toPng(), function(err){
					if(err) return console.log(err.message);

					shell.openExternal('file://' + screenshotPath);
					var message = 'Saved screenshot to: ' + screenshotPath;
					screenshotMsg.textContent = message;
				});
			}

		});

	});

});

function determineScreenShot() {
	const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
	const maxDimenstion = Math.max(screenSize.width, screenSize.height);
	return{
		width: maxDimenstion * window.devicePixelRatio,
		height: maxDimenstion * window.devicePixelRatio
	};
}

alert("done");
