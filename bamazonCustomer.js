// Load in dependencies
var inquire = require("inquirer");
var mysql = require("mysql");

// Create Connection to databse
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'bamazon'
});

// Connect to bamazon database
connection.connect(function(err, res) {
	if (err) throw err;

	console.log('connected as id ' + connection.threadId);

	logItems();
});

// Log all Available Products In Terminal
function logItems() {
	connection.query(
		'SELECT item_id, product_name, price FROM products',
		function(err, res) {
			for (i=0;i<res.length;i++) {
				console.log(res[i].item_id, res[i].product_name, res[i].price);
			}
			// Run chooseProduct function
			chooseProduct();
		}
	)
}

// Allows user to select product and quantity via id number
function chooseProduct () {
	inquire.prompt([
		{
			name: "id",
			message: "Choose An Item By id"
		},
		{
			name: "quantity",
			message: "How Many Would You Like?"
		}
	]).then(function(answers) {

		connection.query(
			'SELECT * FROM products WHERE ?',
			{
				item_id: answers.id
			},
			function(err, res) {

				// Storing item that user selected as object
				var item = res[0];

				if (err) console.log(err);
				// keeping track of stock_quantity in database
				var stock = item.stock_quantity;
				// checking to see if enough products are available
				if (answers.quantity > stock) {
					console.log("Insufficient quantity!");
					quit();
				}
				// if products available, update database
				else {
					// change stock variable to indicate purchase
					stock -= answers.quantity;
					// update database with new stock variable
					connection.query(
						'UPDATE products SET ? WHERE ?',
						[{
							stock_quantity: stock
						},
						{
							item_id: answers.id
						}],
						function(err, res) {
							console.log("Items Purchased: " + answers.quantity)

							var amount = item.price * answers.quantity;
							console.log("Total Cost: " + amount.toFixed(2));
							
							quit();
						}
					);
				}
			}
		);
	});
}

function quit () {
	connection.end();
}




