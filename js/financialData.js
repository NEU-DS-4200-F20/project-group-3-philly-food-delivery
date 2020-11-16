function calculateCostSavings(svg, costMap) {

	let keys = Array.from(costMap.keys());

	let total = 0;

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != 'self') {
			total += costMap.get(keys[i]).get('f')
		}
	}	

	svg.append('text')
		.attr('y', 45)
		.style('stroke', 'black')
		.text('Cost Reduction by Converting 50% of')
		.style('font-size', '12px');

	svg.append('text')
		.attr('x', 35)
		.attr('y', 58)
		.style('stroke', 'black')
		.text('Non-Partner Orders within')
		.style('font-size', '12px');

	svg.append('text')
		.attr('x', 65)
		.attr('y', 70)
		.style('stroke', 'black')
		.text('Delivery Zones')
		.style('font-size', '12px');

	svg.append('text')
		.attr('x', 75)
		.attr('y', 90)
		.style('stroke', 'green')
		.text('$' + Math.round(total / 2 * 0.2))
		.style('font-size', '15px');
}

function financialData() {

	function chart(selector, data, dispatch) {

		let costMap = d3.rollup(data, v => d3.sum(v, d => d.order_total), d => d.partner, d => d.out_of_zone) 

		let width = 250,
			height = 250,
			margin = {
				top: 30,
				bottom: 30,
				left: 50,
				right: 30
			};


		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white')
			.attr('x', 700);

		calculateCostSavings(svg, costMap)


		dispatch.on("mouseOver" + ".e", function (id) {
			svg.selectAll("text").remove();
			let newMap = d3.rollup(data, v => d3.sum(v, d => d.order_total), d => d._seller_id, d => d.partner, d => d.out_of_zone)

			let dataToSend = newMap.get(parseInt(id.substring(4)))
			// console.log(dataToSend)
			calculateCostSavings(svg, dataToSend)

		})

		dispatch.on("mouseOut" + ".e", function (id) {
			svg.selectAll("text").remove();

			calculateCostSavings(svg, costMap)
		})


		return chart;
	}
	return chart;
}