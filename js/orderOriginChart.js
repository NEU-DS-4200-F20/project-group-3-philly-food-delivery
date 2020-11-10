function piechart1() {

	function chart(selector, data) {

		let orderOriginMap = d3.rollup(data, v => v.length, d=>d.partner)
		console.log(orderOriginMap)

		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 200,
		height = 200,
		margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		},
		radius = Math.min(width, height) / 2,
		colors = d3.scaleOrdinal()
			.domain(Array.from(orderOriginMap.keys()))
			.range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
			console.log(Array.from(orderOriginMap.keys()))

		let svg = d3.select(selector)
			.append('svg')
					.attr('width', width)
					.attr('height', height)
					.style('background', 'white');

		let chartGroup = svg
			.append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		// Compute the position of each group on the pie:
		let pie = d3.pie()
			.value(function(d) {return d[1];});

		let data_ready = pie(orderOriginMap.entries())
		console.log(data_ready)

		chartGroup.selectAll('whatever')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', d3.arc()
				.innerRadius(0)
				.outerRadius(radius)
			)
			.attr('fill', function(d){ 
				return(colors(d.data[0])) })
			.attr("stroke", "black")
			.style("stroke-width", "2px")
			.style("opacity", 0.7)

		return chart;
	}
	return chart;
}