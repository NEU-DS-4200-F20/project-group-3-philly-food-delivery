function barChart1() {

	function chart(selector, data, dispatch) {

		//creating map of the data by grouping by restaurants
		let restaurantsOrderCount = d3.rollup(data, v => v.length, d=>d._seller_id)
		

		// getting max order count for y-axis scale
		let maxCount = d3.max(restaurantsOrderCount.values())


		// setting dimensions
		let width = 300,
		height = 300,
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
				.style('background', 'white')
				.attr('y', 20);

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
			.attr('x', 5)
			.attr('y', -10)
			.style('stroke', 'black')
			.text('Orders')
			.style('font-size', '10px');

		// getting restaurant names from the map
		let keys = Array.from(restaurantsOrderCount.keys());


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
		  })
		  .attr('id', function(d) {
		  	return "rest" + d[0]
		  })
		  .on('mouseover', function(d) {
		  	d3.select(this)
		  		.style('fill', "red")
		  	dispatch.call('mouseOver', this, d3.select(this).attr('id'));		  	
		  })
		  .on('mouseout', function(d) {
			  d3.select(this)
				  .style('fill', 'steelblue')
			dispatch.call('mouseOut', this, d3.select(this).attr('id'));
		  });

		  dispatch.on("mouseOver" + ".a", function(id) {
		  	d3.selectAll('#' + id)
		  		.style('fill', 'red')
		  })
		  dispatch.on("mouseOut" + ".a", function(id) {
		  	d3.selectAll('#' + id)
		  		.style('fill', 'steelblue')
		  })

		chartGroup.append('g')
	  		.attr('class', 'x axis')
	  		.attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
	  		.call(xAxis)
	  		//Add label
			.append('text')
			.attr('x', (width - 50) / 2 - 10)
			.attr('y', 25)
			.style('stroke', 'black')
			.text('Restaurants')
			.style('font-size', '10px');

		// adding title
		svg.append('text')
			.attr('x', width / 2 - 60)
			.attr('y', 12)
			.style('stroke', 'black')
			.text('Number of Orders per')
			.style('font-size', '15px');
		// adding title
		svg.append('text')
			.attr('x', width / 2 - 50)
			.attr('y', 25)
			.style('stroke', 'black')
			.text('Top 10 Restaurants')
			.style('font-size', '15px');


		return chart;
	}

	chart.selectionDispatcher = function(_) {
		if (!arguments.length) return dispatcher;
    	dispatcher = _;
    	return chart;
	}

	// chart.updateSelection = function (selectedData) {
 //    if (!arguments.length) return;
 //    console.log(selectedData)

 //    // Select an element if its datum was selected
 //    d3.selectAll("tr").classed('selected', d =>
 //      selectedData.includes(d)
 //    );

 //  };

	return chart;
}