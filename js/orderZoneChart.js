function piechart2() {

	function chart(selector, data) {

		let orderZoneMap = d3.rollup(data, v => v.length, d=>d.out_of_zone)
		

		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 350,
		height = 350,
		margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		},
		radius = Math.min(width, height) / 2 - 20,
		colors = d3.scaleOrdinal()
			.domain(Array.from(orderZoneMap.keys()))
			.range(['blue','red']);
			console.log(Array.from(orderZoneMap.keys()))

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

		let data_ready = pie(orderZoneMap.entries())
		

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
            
        // adding title
		svg.append('text')
        .attr('x', width / 2 - 120)
        .attr('y', 15)
        .style('stroke', 'black')
        .text('Orders Outside Delivery Zones'); 
        
        // legend
        svg.append("circle").attr("cx", 300).attr("cy", 25).attr("r", 4).style("fill", "red")
        svg.append("circle").attr("cx",300).attr("cy", 35).attr("r", 4).style("fill", "blue")
        svg.append("text").attr("x", 310).attr("y", 25).text("True").style("font-size", "10px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 310).attr("y", 35).text("False").style("font-size", "10px").attr("alignment-baseline","middle")

		return chart;
	}
	return chart;
}