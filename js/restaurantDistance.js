function barChart2() {

	function chart(selector, data) {

		let restaurantOrderDistance = d3.rollup(data, v=> d3.mean(v, d => d.distance_miles_a2b), d => d._seller_id)
		console.log(restaurantOrderDistance)

		return chart;
	}
	return chart;
}