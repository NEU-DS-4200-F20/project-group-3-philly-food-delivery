// helper function to create pie chart
function createPieChart(svg, chartGroup, orderOriginMap, width, radius) {

	// setting colors defined to keys
	let colors = d3.scaleOrdinal()
		.domain(Array.from(orderOriginMap.keys()))
		.range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']);

	// Compute pie positions
	let pie = d3.pie()
		.value(function (d) { return d[1]; });

	let data_ready = pie(orderOriginMap.entries())

	// appending pie chart to chartGroup
	chartGroup.selectAll('whatever')
		.data(data_ready)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.innerRadius(0)
			.outerRadius(radius)
		)
		.attr('fill', function (d) {
			return (colors(d.data[0]))
		})
		.attr("stroke", "black")
		.style("stroke-width", "2px")
		.style("opacity", 0.7)

	// adding title
	svg.append('text')
		.attr('x', width / 2 - 85)
		.attr('y', 15)
		.style('stroke', 'black')
		.text('Distribution of Order Origin')
		.style('font-size', '12px');

	let keys = Array.from(orderOriginMap.keys())

	// calculating total pie chart value
	let totalCnt = 0
	// loop to add value to totalCnt
	for (var i = 0; i < keys.length; i++) {
		totalCnt += orderOriginMap.get(keys[i])

	}
	//console.log(totalCnt);


	// Add one dot in the legend for each name.
	svg.selectAll("mydots")
		.data(keys)
		.enter()
		.append("circle")
		.attr("cx", 205)
		.attr("cy", function (d, i) { return 25 + i * 9 })
		.attr("r", 2)
		.style("fill", function (d) { return colors(d) })

	// Add one dot in the legend for each name.
	svg.selectAll("mylabels")
		.data(keys)
		.enter()
		.append("text")
		.attr("x", 210)
		.attr("y", function (d, i) { return 25 + i * 9 })
		.style("fill", function (d) { return colors(d) })
		.text(function (d) { return d + " " + Math.round((orderOriginMap.get(d) / totalCnt) * 100) + "%" })
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle")
		.style("font-size", "6px")
}

function piechart1() {

	function chart(selector, data, dispatch) {

		// using d3 to create map of each partner to their total number of orders
		let orderOriginMap = d3.rollup(data, v => v.length, d => d.partner)

		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 250,
			height = 200,
			margin = {
				top: 30,
				bottom: 30,
				left: 50,
				right: 30
			},
			radius = Math.min(width, height) / 2 - 20;
		// console.log(Array.from(orderOriginMap.keys()))
		// console.log(orderOriginMap);

		//creating svg
		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white');

		let chartGroup = svg
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// call pie chart helper function
		createPieChart(svg, chartGroup, orderOriginMap, width, radius)

		// dispatch event when mouse over happens
		dispatch.on("mouseOver" + ".c", function (id) {

			updatedMap = d3.rollup(data, v => v.length, d => d._seller_id, d => d.partner)

			// remove all svg elements
			svg.selectAll("circle").remove();
			svg.selectAll("text").remove();

			chartGroup.selectAll("*").remove();

			console.log(updatedMap.get(parseInt(id.substring(4))))

			// re-drawing updated svg elements
			createPieChart(svg, chartGroup, updatedMap.get(parseInt(id.substring(4))), width, radius);
		})

		// dispatch event when mouse out happens
		dispatch.on("mouseOut" + ".c", function (id) {

			// remove all svg elements
			svg.selectAll("circle").remove();
			svg.selectAll("text").remove();

			chartGroup.selectAll("*").remove();

			// console.log(updatedMap.get(parseInt(id.substring(4))))

			// re-drawing svg elements
			createPieChart(svg, chartGroup, orderOriginMap, width, radius);
		})


		return chart;
	}
	return chart;
}