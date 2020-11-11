function barChart2() {

	function chart(selector, data) {

		// creating map of the data by grouping by restaurants
		let restaurantsOrderDistance = d3.rollup(data, v=> d3.mean(v, d => d.distance_miles_a2b), d => d._seller_id)
		

		// getting max delivery distance for y-axis scale
		let maxCount = d3.max(restaurantsOrderDistance.values())



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
			.attr('x', 0)
			.attr('y', -10)
			.style('stroke', 'black')
			.text('Miles');

		// getting restaurant names from the map
		let keys = Array.from(restaurantsOrderDistance.keys());
	

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
		  .data(restaurantsOrderDistance)
		  .enter()
		  .append('rect')
		  .attr('x', function(d) {
		  	return xScale(d[0]);
		  })
		  .attr('y', function(d) {
		    return yScale(restaurantsOrderDistance.get(d[0]));
		  })
		  .attr('width', xScale.bandwidth())
		  .attr('fill', 'steelblue')
		  .attr('height', function(d) {
		    return height - margin.bottom - 30 - yScale(restaurantsOrderDistance.get(d[0]));
		  })
		  .on('mouseover', function(d) { 
			  
			d3.select(this)
				.style('fill', 'red');
				console.log(this)
			})
		  .on('mouseout', function(d) {
			d3.select(this)
				.style('fill', 'steelblue')
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
			.text('Average Delivery Distance per Top 10 Restaurants');



		return chart;
	}
	return chart;
}