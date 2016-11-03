$(document).ready(function () {
	var fruits = [
		{type: 'apple', price: 5},
		{type: 'banana', price: 5},
		{type: 'orange', price: 5},
		{type: 'grape', price: 5},
	],
	$market = $('#market');

	// Add items to DOM
	fruits.forEach(function (fruit) {
		var $item = $('<div></div>').addClass('item');
		var $fruit = $('<div></div>').addClass('fruit ' + fruit.type);
		$item.append($fruit);
		$item.append('<button>Buy</button>');
		$item.append('<p>Price: ' + fruit.price + '</p>');

		$market.append($item);

		var $ul = $('<ul></ul>'),
				$number = $('<li></li>').addClass(fruit.type).text(fruit.type + 's: '),
				$price = $('<li></li>').addClass('avgPrice').text('Avg. Price: ' + fruit.price);

		$ul.append($number).append($price);
		$('#inventory').append($ul);
	});

	cyclePrices();

	function changePrices() {
		fruits.forEach(function (fruit) {
			fruit.price += randomNumber(-50, 50) / 100;
			$market.find('.' + fruit.type).siblings().last().text('Price: ' + fruit.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
		});
	}

	function cyclePrices() {
		setInterval(changePrices, 5000);
	}

});
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
