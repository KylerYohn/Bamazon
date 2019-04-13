
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



//query the database for the ID of the item the user wishes to buy
connection.query("SELECT * FROM products", function (err, results) {
    //promt the user with what the id of the item they would like to buy as well as how much of the item they wish to buy
    inquirer.prompt([
        {
            type: "input",
            name: "ID",
            message: "What is the ID of the item you would like to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "how much of this item would you like to buy today?"
        }
    ]).then(function (res) {
        //Call the getproduct function to check the database to see if there is the correct amount of product for them
        //gather the information for the item with that ID
        var item;

        //put both of the user responses into int variables
        var ID = parseInt(res.ID);
        var quantity = parseInt(res.quantity);
        
        
        //create a for loop to search through the array given by sql
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === ID) {
                item = results[i];
            }
        }
       
       

        //determine if we have enough of that quanity to be able to sell
        if (item.stock_quanity >= quantity) {
            connection.query(
                "UPDATE products SET ? where ?",
                [
                    {
                        stock_quanity: (item.stock_quanity - quantity),
                        product_sales: ((quantity * item.price) + item.product_sales)
                    },
                    {
                        item_id: item.item_id
                    }
                ],
                function (err) {
                    if (err) throw err;
                    var total = quantity * item.price;
                    console.log("you bought " + quantity + " " + item.product_name +
                        "\nyour total purchace will be: " + total.toFixed(2));
                 
                }
            )
            
        }
        
        //if there is not allow the consumer to know that there is not enough of that item
        else {
            console.log("I am sorry but we do not have enough  " + item.product_name + " to supply your needs" + 
            "\n we only have " + item.stock_quanity + " " +  item.product_name + " in stock")
        }

        
        connection.end();

    })
});
