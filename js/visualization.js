// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

	//load data from csv file
	d3.csv("data/tx data - top 10 rests.csv").then(data => {
		// converting distance from string to int
		data.forEach(function(d) {
			d.distance_miles_a2b = +d.distance_miles_a2b
		})

		// console.log(data[0]);

		groupingRestaurantData = d3.group(data, d => d._seller_id)

		console.log(groupingRestaurantData)

		restaurantsOrderCount = d3.rollup(data, v => v.length, d=>d._seller_id)
		console.log(restaurantsOrderCount)

		restaurantOrderDistance = d3.rollup(data, v=> d3.mean(v, d => d.distance_miles_a2b), d => d._seller_id)
		console.log(restaurantOrderDistance)


		const dispatchString = 'selectionUpdated';

		let barChart1 = barChart1()
		// .x(d => )
		// .xLabel('Restaurants')
		// .y(d => d.)
		// .yLabelOffset(40)
		('#vis-svg-1', data)

	});

})());