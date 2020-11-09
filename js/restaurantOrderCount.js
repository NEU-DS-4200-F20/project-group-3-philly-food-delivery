function barChart1() {

	function chart(selector, data) {

		let restaurantsOrderCount = d3.rollup(data, v => v.length, d=>d._seller_id)
		console.log(restaurantsOrderCount)

		let maxCount = d3.max(restaurantsOrderCount.values())

		console.log(maxCount)

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
			.call(yAxis)
			//Add label
			.append('text')
			.attr('x', 35)
			.attr('y', -10)
			.style('stroke', 'black')
			.text('Number of Orders');;

		let keys = Array.from(restaurantsOrderCount.keys());
		console.log(keys)

		let xScale = d3.scaleBand()
			.range([0, width - margin.right-50])
			.domain(keys)
			.padding(.1)

		let xAxis = d3.axisBottom(xScale);

		let bar = chartGroup.append('g')
		  .selectAll('rect')
		  .data(restaurantsOrderCount)
		  .enter()
		  .append('rect')
		  .attr('x', function(d) {
		  	return xScale(d[0]); //how to just use map keys
		  })
		  .attr('y', function(d) {
		    return yScale(restaurantsOrderCount.get(d[0]));
		  })
		  .attr('width', xScale.bandwidth())
		  .attr('fill', 'steelblue')
		  .attr('height', function(d) {
		    return height - margin.bottom - 30 - yScale(restaurantsOrderCount.get(d[0]));
		  });

		chartGroup.append('g')
	  		.attr('class', 'x axis')
	  		.attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
	  		.call(xAxis)
	  		//Add label
			.append('text')
			.attr('x', (width - 50) / 2)
			.attr('y', 25)
			.style('stroke', 'black')
			.text('Restaurants');


		//   let test = new Map();
		//   let rest = ['Restaurant 1', 'Restaurant 2'];
		//   let groupingRestaurantData = d3.group(data, d => d._seller_id)

		//   for (var i = 0; i < rest.length; i++) {
  //  			test.set(rest[i], groupingRestaurantData.get(rest[i]))
		// }
		// 	console.log("here here", test);



		return chart;
	}
	return chart;
}