function barChart1() {

	function chart(selector, data) {

		let restaurantsOrderCount = d3.rollup(data, v => v.length, d=>d._seller_id)
		console.log(restaurantsOrderCount)

		let maxCount = d3.max(restaurantsOrderCount.values())
		let minCount = d3.min(restaurantsOrderCount.values())

		console.log(maxCount, minCount)

		let width = 500,
		height = 500,
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
				.style('background', 'white');

		let chartGroup = svg
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		let yScale = d3.scaleLinear()
			.domain([0, maxCount])
			.range([height - margin.bottom - margin.top, 0]);

		let yAxis = d3.axisLeft(yScale);
		chartGroup.append('g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(0, 0)')
			.call(yAxis);

		let keys = Array.from(restaurantsOrderCount.keys());
		console.log(keys)

		let xScale = d3.scaleBand()
			.range([0, width])
			.domain(keys)

		let xAxis = d3.axisBottom(xScale);

		chartGroup.append('g')
	  		.attr('class', 'x axis')
	  		.attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
	  		.call(xAxis);

		return chart;
	}
	return chart;
}