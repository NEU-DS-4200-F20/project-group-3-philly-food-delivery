function piechart1() {

	function chart(selector, data) {

		let orderOriginMap = d3.rollup(data, v => v.length, d=>d.partner)
		console.log(orderOriginMap)

		// let maxCount = d3.max(restaurantsOrderCount.values())

		let width = 500,
		height = 500,
		margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		},
		radius = Math.min(width, height) / 2,
		colors = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

		let svg = d3.select(selector)
			.append('svg')
					.attr('width', width)
					.attr('height', height)
					.style('background', 'white');

		let chartGroup = svg
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// Compute the position of each group on the pie:
		let pie = d3.pie();

		let arc = d3.arc()
			.innerRadius(0);
			.outerRadius(radius);

		let arcs = chartGroup.selectAll("arc")
			.data(pie(orderOriginMap)) // map but maybe needs list??
			.enter()
			.append("g")
			.attr("class", "arc");

		arcs.append("path")
			.attr("fill", function(d, i) {
				return color(i);
			})
			.attr("d", arc);

		return chart;
	}
	return chart;
}