function createPieChart(svg, chartGroup, orderOriginMap, width, radius) {

	let colors = d3.scaleOrdinal()
		.domain(Array.from(orderOriginMap.keys()))
		.range(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

	// Compute the position of each group on the pie:
	let pie = d3.pie()
		.value(function (d) { return d[1]; });

	let data_ready = pie(orderOriginMap.entries())


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
		.attr('x', width / 2 - 100)
		.attr('y', 15)
		.style('stroke', 'black')
		.text('Distribution of Order Origin');

	let keys = Array.from(orderOriginMap.keys())


	// Add one dot in the legend for each name.
	svg.selectAll("mydots")
		.data(keys)
		.enter()
		.append("circle")
		.attr("cx", 330)
		.attr("cy", function (d, i) { return 20 + i * 10 })
		.attr("r", 4)
		.style("fill", function (d) { return colors(d) })

	// Add one dot in the legend for each name.
	svg.selectAll("mylabels")
		.data(keys)
		.enter()
		.append("text")
		.attr("x", 340)
		.attr("y", function (d, i) { return 20 + i * 10 })
		.style("fill", function (d) { return colors(d) })
		.text(function (d) { return d })
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle")
		.style("font-size", "10px")
}

function piechart1() {

	function chart(selector, data, dispatch) {

		let orderOriginMap = d3.rollup(data, v => v.length, d => d.partner)

		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 400,
			height = 350,
			margin = {
				top: 30,
				bottom: 30,
				left: 50,
				right: 30
			},
			radius = Math.min(width, height) / 2 - 20;
		// console.log(Array.from(orderOriginMap.keys()))
		// console.log(orderOriginMap);

		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white');

		let chartGroup = svg
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		createPieChart(svg, chartGroup, orderOriginMap, width, radius)

		dispatch.on("mouseOver" + ".c", function (id) {

			updatedMap = d3.rollup(data, v => v.length, d => d._seller_id, d => d.partner)

			svg.selectAll("circle").remove();
			svg.selectAll("text").remove();

			chartGroup.selectAll("*").remove();

			console.log(updatedMap.get(parseInt(id.substring(4))))



			createPieChart(svg, chartGroup, updatedMap.get(parseInt(id.substring(4))), width, radius);
		})

		dispatch.on("mouseOut" + ".c", function (id) {


			svg.selectAll("circle").remove();
			svg.selectAll("text").remove();

			chartGroup.selectAll("*").remove();

			console.log(updatedMap.get(parseInt(id.substring(4))))



			createPieChart(svg, chartGroup, orderOriginMap, width, radius);
		})


		return chart;
	}
	return chart;
}