// function to calculate cost savings if restaurants
// converted 50% of non-partner orders that are in partner zones
function calculateCostSavings(svg, costMap) {

	let keys = Array.from(costMap.keys());

	// total cost of all orders
	let total = 0;

	// adding to total cost of all orders that are not from our partner
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != 'self') {
			total += costMap.get(keys[i]).get('f')
		}
	}	

	// appending title
	svg.append('text')
		.attr('y', 45)
		.style('stroke', 'black')
		.text('Cost Reduction by Converting 50% of')
		.style('font-size', '12px');

	// appending title
	svg.append('text')
		.attr('x', 35)
		.attr('y', 58)
		.style('stroke', 'black')
		.text('Non-Partner Orders within')
		.style('font-size', '12px');

	// appending title
	svg.append('text')
		.attr('x', 65)
		.attr('y', 70)
		.style('stroke', 'black')
		.text('Delivery Zones')
		.style('font-size', '12px');

	// appending cost saved number given 50% of orders and 20% premium from other delivery services
	svg.append('text')
		.attr('x', 75)
		.attr('y', 90)
		.style('stroke', 'green')
		.text('$' + Math.round(total / 2 * 0.2))
		.style('font-size', '15px');
}

function financialData() {

	function chart(selector, data, dispatch) {

		// creating map of partner to out of zones orders to sum of order total
		let costMap = d3.rollup(data, v => d3.sum(v, d => d.order_total), d => d.partner, d => d.out_of_zone) 

		let width = 250,
			height = 250,
			margin = {
				top: 30,
				bottom: 30,
				left: 50,
				right: 30
			};

		// creating svg element
		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white')
			.attr('x', 700);

		// calling calculator helper function
		calculateCostSavings(svg, costMap)

		// dispatch for mouse over event
		dispatch.on("mouseOver" + ".e", function (id) {
			// removing all text elements
			svg.selectAll("text").remove();
			let newMap = d3.rollup(data, v => d3.sum(v, d => d.order_total), d => d._seller_id, d => d.partner, d => d.out_of_zone)

			let dataToSend = newMap.get(parseInt(id.substring(4)))
			// console.log(dataToSend)

			// appending new text elements
			calculateCostSavings(svg, dataToSend)

		})

		dispatch.on("mouseOut" + ".e", function (id) {
			// removing all text elements
			svg.selectAll("text").remove();

			// appending new text elements
			calculateCostSavings(svg, costMap)
		})


		return chart;
	}
	return chart;
}