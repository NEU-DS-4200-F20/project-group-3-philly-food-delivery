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

		let groupingRestaurantData = d3.group(data, d => d._seller_id)

		console.log(groupingRestaurantData)


		const dispatchString = 'selectionUpdated';

		let rerstaurantOrderData = barChart1()
		('#vis-svg-1', data)

		// let restaurantDistanceData = barChart2()
		// (, data)

	});

})());