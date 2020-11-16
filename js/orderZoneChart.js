function createPieChart2(svg, chartGroup, orderZoneMap, width, radius) {

	// Compute pie positions
	let pie = d3.pie()
		.value(function (d) { return d[1]; });

	let data_ready = pie(orderZoneMap.entries())

	// setting colors to keys
	let colors = d3.scaleOrdinal()
		.domain(['f', 't'])
		.range(['#377eb8', '#e41a1c']);

	let keys = Array.from(orderZoneMap.keys())

	// initializing total value of pie
	let totalCnt = 0

	// looping to add value to totalCnt
	for (var i = 0; i < keys.length; i++) {
		totalCnt += orderZoneMap.get(keys[i])

	}

	// appending pie to chartGroup
	chartGroup.selectAll('whatever')
		.data(data_ready)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.innerRadius(0)
			.outerRadius(radius)
		)
		.attr('fill', function (d) {
			console.log(d)
			return (colors(d.data[0]))
		})
		.attr("stroke", "black")
		.style("stroke-width", "2px")
		.style("opacity", 0.7)

	// adding title
	svg.append('text')
		.attr('x', width / 2 - 90)
		.attr('y', 15)
		.style('stroke', 'black')
		.text('Orders Outside Delivery Zones')
		.style('font-size', '12px');

	// legend
	svg.append("circle").attr("cx", 205).attr("cy", 25).attr("r", 2).style("fill", "#e41a1c")
	svg.append("circle").attr("cx", 205).attr("cy", 35).attr("r", 2).style("fill", "#377eb8")
	svg.append("text").attr("x", 210).attr("y", 25)
		.text("Outside" + " " + Math.round((orderZoneMap.get("t") / totalCnt) * 100) + "%")
		.style("font-size", "6px").attr("alignment-baseline", "middle")
	svg.append("text").attr("x", 210).attr("y", 35)
		.text("Inside" + " " + Math.round((orderZoneMap.get("f") / totalCnt) * 100) + "%")
		.style("font-size", "6px").attr("alignment-baseline", "middle")

}


function piechart2() {

	function chart(selector, data, dispatch) {

		// creating map of zones and number of orders within
		let orderZoneMap = d3.rollup(data, v => v.length, d => d.out_of_zone)


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

		// console.log(Array.from(orderZoneMap.keys()))

		// creating svg
		let svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'white')
			.attr('x', 350);

		let chartGroup = svg
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// calling helper function to create chart
		createPieChart2(svg, chartGroup, orderZoneMap, width, radius);

		// dispatch mouseover event
		dispatch.on("mouseOver" + ".d", function (id) {

			// create new map given data (id)
			updatedZones = d3.rollup(data, v => v.length, d => d._seller_id, d => d.out_of_zone)

			// remove svg elements
			chartGroup.selectAll("*").remove();
			svg.selectAll("text").remove();
			svg.selectAll("circle").remove();

			// console.log(updatedMap.get(parseInt(id.substring(4))));

			// redrawing svg elements given new data
			createPieChart2(svg, chartGroup, updatedZones.get(parseInt(id.substring(4))), width, radius);
		})

		// dispatch mouse out event
		dispatch.on("mouseOut" + ".d", function (id) {

			// remove svg elements
			chartGroup.selectAll("*").remove();
			svg.selectAll("text").remove();
			svg.selectAll("circle").remove();

			// console.log(updatedZones.get(parseInt(id.substring(4))))

			// redraw svg elements
			createPieChart2(svg, chartGroup, orderZoneMap, width, radius);
		})

		
		return chart;
	}
	return chart;
}