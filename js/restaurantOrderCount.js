function barChart1() {

	function chart(selector, data) {

		//creating map of the data by grouping by restaurants
		let restaurantsOrderCount = d3.rollup(data, v => v.length, d=>d._seller_id)
		console.log(restaurantsOrderCount)

		// getting max order count for y-axis scale
		let maxCount = d3.max(restaurantsOrderCount.values())

		console.log(maxCount)

		// setting dimensions
		let width = 500,
		height = 500,
		margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		};

		//creating svg
		let svg = d3.select(selector)
			.append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('background', 'white');

		let chartGroup = svg
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// creating y axis scale
		let yScale = d3.scaleLinear()
			.domain([0, maxCount])
			.range([height - margin.bottom - margin.top, 0]);

		// creating y axis on the page
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
			.text('Number of Orders');

		// getting restaurant names from the map
		let keys = Array.from(restaurantsOrderCount.keys());
		console.log(keys.sort())

		// creating x axis scale
		let xScale = d3.scaleBand()
			.range([0, width - margin.right-50])
			.domain(keys.sort((a,b) =>a-b))
			.padding(.1)

		// creating s axis on the page
		let xAxis = d3.axisBottom(xScale);

		// creating bars for the bar chart
		let bar = chartGroup.append('g')
		  .selectAll('rect')
		  .data(restaurantsOrderCount)
		  .enter()
		  .append('rect')
		  .attr('x', function(d) {
		  	return xScale(d[0]);
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

		// adding title
		svg.append('text')
			.attr('x', width / 2 - 150)
			.attr('y', 20)
			.style('stroke', 'black')
			.text('Number of Orders per Top 10 Restaurants');


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