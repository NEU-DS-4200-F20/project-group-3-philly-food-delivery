function barChart2() {

	function chart(selector, data, dispatch) {

		// creating map of the data by grouping by restaurants
		let restaurantsOrderDistance = d3.rollup(data, v => d3.mean(v, d => d.distance_miles_a2b), d => d._seller_id)


		// getting max delivery distance for y-axis scale
		let maxCount = d3.max(restaurantsOrderDistance.values())

		// setting dimensions
		let width = 250,
			height = 250,
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
			.attr('x', 500)
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
			.call(yAxis);

		//Add label	
		svg.append('text')
			.attr('x', -130)
			.attr('y', 20)
			//.style('stroke', 'black')
			.text('Miles')
			.style('font-size', '10px')
			.attr('transform', 'rotate(-90)');
		//.call(yAxis);

		// getting restaurant names from the map
		let keys = Array.from(restaurantsOrderDistance.keys());


		// creating x axis scale
		let xScale = d3.scaleBand()
			.range([0, width - margin.right - 50])
			.domain(keys.sort((a, b) => a - b))
			.padding(.1)

		// creating x axis on the page
		let xAxis = d3.axisBottom(xScale);

		// creating bars for the bar chart
		let bar = chartGroup.append('g')
			.selectAll('rect')
			.data(restaurantsOrderDistance)
			.enter()
			.append('rect')
			.attr('x', function (d) {
				return xScale(d[0]);
			})
			.attr('y', function (d) {
				return yScale(restaurantsOrderDistance.get(d[0]));
			})
			.attr('width', xScale.bandwidth())
			.attr('fill', 'steelblue')
			.attr('height', function (d) {
				return height - margin.bottom - 30 - yScale(restaurantsOrderDistance.get(d[0]));
			})
			.attr('id', function (d) {
				return "rest" + d[0]
			})
			.on('mouseover', function (d, i) { //mouseover event

				d3.select(this)
					.style('fill', 'red');
				console.log(i)
				dispatch.call('mouseOver', this, d3.select(this).attr('id'));
			})
			.on('mouseout', function (d) { //mouseout event
				d3.select(this)
					.style('fill', 'steelblue')
				dispatch.call('mouseOut', this, d3.select(this).attr('id'));
			});

		// dispatch mousover listener event
		dispatch.on("mouseOver" + ".b", function (id) {
			d3.selectAll('#' + id)
				.style('fill', 'red')
		})
		// dispatch mouseout listener event
		dispatch.on("mouseOut" + ".b", function (id) {
			d3.selectAll('#' + id)
				.style('fill', 'steelblue')
		})

		chartGroup.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
			.call(xAxis);


		//Add label
		svg.append('text')
			.attr('x', 110)
			.attr('y', 245)
			//.style('stroke', 'black')
			.text('Restaurants')
			.style('font-size', '10px');

		// adding title
		svg.append('text')
			.attr('x', width / 2 - 65)
			.attr('y', 12)
			.style('stroke', 'black')
			.text('Average Delivery Distance per')
			.style('font-size', '12px')

		// adding title
		svg.append('text')
			.attr('x', width / 2 - 40)
			.attr('y', 25)
			.style('stroke', 'black')
			.text('Top 10 Restaurants')
			.style('font-size', '12px');



		return chart;
	}

	return chart;
}