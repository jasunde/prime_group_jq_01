$(document).ready(function () {
	console.log($('body'));
});
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
