// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

	//load data from csv file
	d3.csv("data/tx data - top 10 rests.csv").then(data => {
		// converting distance from string to int
		data.forEach(function(d) {
			d.distance_miles_a2b = +d.distance_miles_a2b
			d._seller_id = +d._seller_id
		})

		// console.log(data[0]);

		let groupingRestaurantData = d3.group(data, d => d._seller_id)

		//console.log(groupingRestaurantData)


		const dispatchString = 'selectionUpdated';

		// calling function to create bar chart
		let restaurantOrderData = barChart1()
		('#vis-svg-1', data)

		let restaurantDistanceData = barChart2()
		('#restaurantDistance', data)

		let orderOriginChart = piechart1()
		('#pie-chart1', data)

		let orderZoneChart = piechart2()
		('#pie-chart2', data)

	});

})());