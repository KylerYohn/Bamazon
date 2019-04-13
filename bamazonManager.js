//require these external sources
var mysql = require("mysql");
var inquirer = require("inquirer");

//establish a connection with the mysql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

//first create a connection with the database

connection.connect(function (err) {
    if (err) throw err;
    list();
});

var list = function () {
    //then ask the manager weather they wish to view all products, low inventory, update products, or add a new products
    inquirer.prompt([
        {
            name: "manager",
            type: "rawlist",
            message: "what would you like to do?",
            choices: ["view all products", "View low inventory", "Update existing quantities", "Add a new product"],

        }
    ]).then(function (res) {

        //depending on what the user chooses call that function to execute their demand
        if (res.manager.toLowerCase() === "view all products") {
            viewAll();
        }
        else if (res.manager.toLowerCase() === "view low inventory") {
            lowIn();
        }
        else if (res.manager.toLowerCase() === "update existing quantities") {
            update();
        }
        else {
            newProd();
        }
    })

};


//if the view all function is called display the full inventory
var viewAll = function () {
    //query the database
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        //display all of the items in a clean format for the user
        console.log("\nitem List" + "\n=====================================================")
        for (var k = 0; k < results.length; k++) {
            console.log(
                "Item Id: " + results[k].item_id +
                "\nProduct Name: " + results[k].product_name +
                "\nDepartment: " + results[k].department_name +
                "\nprice: " + results[k].price +
                "\nQuantity in stock: " + results[k].stock_quanity
                + "\n====================================================="
            )
        }
    }

    )
    connection.end();
}

//if the user wishes to View low inventory
var lowIn = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        //inform the manager which items have a quanity less than 5

        console.log("\nLOW INVENTORY!!!" + "\n=====================================================")
        //loop through the array provided by the query and see which items have a quantity less than 5
        for (var j = 0; j < results.length; j++) {
            if (results[j].stock_quanity < 5) {

                console.log(
                    "Item Id: " + results[j].item_id +
                    "\nProduct Name: " + results[j].product_name +
                    "\nDepartment: " + results[j].department_name +
                    "\nprice: " + results[j].price +
                    "\nQuantity in stock: " + results[j].stock_quanity
                    + "\n====================================================="
                )

            }
        }

    })

    connection.end();

}


//if the user wishes to update the quanity in stock for items

var update = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //first give the user the choice of which item they would like to update

        inquirer.prompt([
            {
                type: "rawlist",
                name: "choices",
                message: "which item would you like to update?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                name: "amnt",
                message: "how much would you like to add?"
            }
        ]).then(function (res) {
            var item;

            //loop through the choices and then store what was chosen in a variable
            for (var o = 0; o < results.length; o++) {
                if (res.choices === results[o].product_name) {
                    item = results[o];
                }
            }

            //update the quantity of the item the user chose
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    { stock_quanity: (item.stock_quanity + parseInt(res.amnt)) },
                    { item_id: item.item_id }
                ], function (err) {
                    if (err) throw err;

                    //display to the user what was updated
                    console.log(item.product_name + " quantity has been updated by " + res.amnt)

                })
            connection.end();
        })
    })

}


var newProd = function(){
    //ask the user all the questions needed for what they would like to add as a product
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product you wish to add",
            name: "product"
        },
        {
            type: "input",
            message: "What is the department this item is apart of?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of this item?",
            name: "price"
        },
        {
            type: "input",
            message: "How many of this item do you have in stock?",
            name: "amount"
        }
]).then(function(results){
    connection.query("INSERT INTO products SET ?",
    {
        product_name: results.product,
        department_name: results.department,
        price: results.price,
        stock_quanity: results.amount,
        product_sales: 0
    }, function(err) {
        if (err) throw err;

        connection.end();
    })
    console.log("Your new Item has been added to your inventory!")
})


}






