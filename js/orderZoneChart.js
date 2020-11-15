function createPieChart2(svg, chartGroup, orderZoneMap, width, radius) {
	// Compute the position of each group on the pie:
	let pie = d3.pie()
		.value(function (d) { return d[1]; });

	let data_ready = pie(orderZoneMap.entries())

	let colors = d3.scaleOrdinal()
		.domain(Array.from(orderZoneMap.keys()))
		.range(['blue', 'red']);


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
		.attr('x', width / 2 - 120)
		.attr('y', 15)
		.style('stroke', 'black')
		.text('Orders Outside Delivery Zones');

	// legend
	svg.append("circle").attr("cx", 300).attr("cy", 25).attr("r", 4).style("fill", "red")
	svg.append("circle").attr("cx", 300).attr("cy", 35).attr("r", 4).style("fill", "blue")
	svg.append("text").attr("x", 310).attr("y", 25).text("True").style("font-size", "10px").attr("alignment-baseline", "middle")
	svg.append("text").attr("x", 310).attr("y", 35).text("False").style("font-size", "10px").attr("alignment-baseline", "middle")

}


function piechart2() {

	function chart(selector, data, dispatch) {

		let orderZoneMap = d3.rollup(data, v => v.length, d => d.out_of_zone)


		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 350,
			height = 350,
			margin = {
				top: 30,
				bottom: 30,
				left: 50,
				right: 30
			},
			radius = Math.min(width, height) / 2 - 20;

		console.log(Array.from(orderZoneMap.keys()))

		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white');

		let chartGroup = svg
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		createPieChart2(svg, chartGroup, orderZoneMap, width, radius);

		dispatch.on("mouseOver" + ".d", function (id) {
			// d3.selectAll('#' + id)
			// 	.style('fill', 'red')
			// console.log(id.substring(4))
			updatedZones = d3.rollup(data, v => v.length, d => d._seller_id, d => d.out_of_zone)
			// console.log(updatedMap)
			//svg.empty();

			chartGroup.selectAll("*").remove();
			svg.selectAll("text").remove();
			svg.selectAll("circle").remove();



			console.log(updatedMap.get(parseInt(id.substring(4))));



			createPieChart2(svg, chartGroup, updatedZones.get(parseInt(id.substring(4))), width, radius);
		})
		// let keys = Array.from(orderOriginMap.keys())


		// // Add one dot in the legend for each name.
		// svg.selectAll("mydots")
		// 	.data(keys)
		// 	.enter()
		// 	.append("circle")
		// 	.attr("cx", 330)
		// 	.attr("cy", function (d, i) { return 20 + i * 10 })
		// 	.attr("r", 4)
		// 	.style("fill", function (d) { return colors(d) })

		// // Add one dot in the legend for each name.
		// svg.selectAll("mylabels")
		// 	.data(keys)
		// 	.enter()
		// 	.append("text")
		// 	.attr("x", 340)
		// 	.attr("y", function (d, i) { return 20 + i * 10 })
		// 	.style("fill", function (d) { return colors(d) })
		// 	.text(function (d) { return d })
		// 	.attr("text-anchor", "left")
		// 	.style("alignment-baseline", "middle")
		// 	.style("font-size", "10px")




		return chart;
	}
	return chart;
}