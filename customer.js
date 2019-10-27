var inquirer = require('inquirer');
var mysql = require('mysql');

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Zar1393zoc.',
	database: 'bamazon_db'
});


connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
});


function showProducts(){
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		
		console.log('xxxx ITEMS AT BAMAZON xxxx');
		

		for(i=0;i<res.length;i++){
			console.log('ID Number:' + res[i].id + ' Product Name: ' + res[i].ProductName + ' Price: ' + '$' + res[i].Price + '(Quantity left: ' + res[i].StockQuantity + ')')
		}
		
		placeOrder();
		})
}


function placeOrder(){
	inquirer.prompt([{
		name: 'selectId',
		message: 'Please enter the ID number of the product you want.',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Please enter a valid ID number'
		}
	},{
		name:'selectQuantity',
		message: 'How many?',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Please enter a number.'
		}
	}]).then(function(answer){
	connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function(err, res){
		if(answer.selectQuantity > res[0].StockQuantity){
			console.log('Not enough money, sorry!');
			console.log('This order has been cancelled');
			console.log('');
			newOrder();
		}
		else{
			amountOwed = res[0].Price * answer.selectQuantity;
			currentDepartment = res[0].DepartmentName;
			console.log('Thanks for your order!');
			console.log('You owe $' + amountOwed);
			console.log('');
			
			connection.query('UPDATE products SET ? Where ?', [{
				StockQuantity: res[0].StockQuantity - answer.selectQuantity
			},{
				id: answer.selectId
			}], function(err, res){});
			
			logSaleToDepartment();
			newOrder();
		}
	})

}, function(err, res){})
};

function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
			placeOrder();
		}
		else{
			console.log('Thank you for shopping at Bamazon! Enjoy!');
			connection.end();
		}
	})
};



function logSaleToDepartment(){
	connection.query('SELECT * FROM departments WHERE DepartmentName = ?', [currentDepartment], function(err, res){
		updateSales = res[0].TotalSales + amountOwed;
		updateDepartmentTable();
	})
};

function updateDepartmentTable(){
		connection.query('UPDATE departments SET ? WHERE ?', [{
		TotalSales: updateSales
	},{
		DepartmentName: currentDepartment
	}], function(err, res){});
};

showProducts();