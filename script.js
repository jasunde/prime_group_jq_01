$(document).ready(function () {
	var fruits = [
		{type: 'apple', price: 5},
		{type: 'banana', price: 5},
		{type: 'orange', price: 5},
		{type: 'grape', price: 5},
	],
	inventory = {
		apple: {
			quantity: 0,
			prices: []
		},
		banana: {
			quantity: 0,
			prices: []
		},
		orange: {
			quantity: 0,
			prices: []
		},
		grape: {
			quantity: 0,
			prices: []
		}
	},
	totalCash = 100,
	$market = $('#market');

	// Add items to DOM
	fruits.forEach(function (fruit) {
		var $item = $('<div></div>').addClass(fruit.type);
		var $fruit = $('<div></div>').addClass('fruit');
		var $buy = $('<button class="buy">Buy</button>').data('fruit', fruit.type);
		var $sell = $('<button class="sell">Sell</button>').data('fruit', fruit.type);
		$item.append($fruit);
		$item.append($buy);
		$item.append($sell);
		$item.append('<p>Price: ' + fruit.price + '</p>');

		$market.append($item);

		var $ul = $('<ul></ul>'),
				$number = $('<li></li>').addClass(fruit.type).text(fruit.type + 's: '),
				$price = $('<li></li>').addClass('avgPrice').text('Avg. Price: ' + fruit.price);

		$ul.append($number).append($price);
		$('#inventory').append($ul);
	});

	cyclePrices();

	$market.on('click', 'button', function () {
		var fruit = $(this).data('fruit');
		var price = $(this).data('price');

		if($(this).hasClass('buy')) {
			inventory[fruit].quantity++;
			inventory[fruit].prices.push(price);
			totalCash -= price;
		} else {
			if(inventory[fruit].prices.length) {
				inventory[fruit].quantity--;
				inventory[fruit].prices.pop();
				totalCash += price;
			}
		}

		$('#totalCash').text('Total Cash: ' + totalCash.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
		updateInventory();
	});

	function changePrices() {
		fruits.forEach(function (fruit) {
			fruit.price += randomNumber(-50, 50) / 100;
			fruit.price = Math.min(Math.max(fruit.price, .5), 9.99);
			$market.find('.' + fruit.type + ' p').text('Price: ' + fruit.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
			$market.find('.' + fruit.type + ' .buy').data('price', fruit.price);
			$market.find('.' + fruit.type + ' .sell').data('price', fruit.price);
		});
	}

	function cyclePrices() {
		setInterval(changePrices, 500);
	}

	function updateInventory() {
		Object.keys(inventory).forEach(function (item) {
			$item = $('#inventory').find('.' + item);
			$item.text(item + ": " + inventory[item].quantity);
			var avg = inventory[item].prices.reduce(function (a, b) {
				return a + b;
			}, 0) / inventory[item].prices.length;
			$item.next().text('Avg. Price: ' + avg.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
		});
	}

});
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
