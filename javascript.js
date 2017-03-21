/* Products array/objects given */

var products = [
    {
        image: "images/coffee.png",
        name: "Filter Coffee",
        price: 1.5,
        count: 0,
    },
    {
        image: "images/espresso.png",
        name: "Espresso",
        price: 1.0,
        count: 0,
    },
    {
        image: "images/cappuccino.png",
        name: "Cappuccino",
        price: 2.0,
        count: 0,
    },
    {
        image: "images/tea.png",
        name: "Tea",
        price: 1.0,
        count: 0,
    },
    {
        image: "images/chocolate.png",
        name: "Hot Chocolate",
        price: 1.5,
        count: 0,
    }
];

/* your JS code goes here */
function toggleMenu() {
    //Toggle menu with a delay of 1000
    $('#menu').toggle(1000);
    //Toggle between Bars and X for button
    $('#trigger i').toggleClass('fa-bars fa-times');
}

//Set global variables credit and sum
var credit = 5.0;
var sum = 0.0;

//Increase or decrease counter in objects and adjust price and sum
function modifyProduct(id, amount) {
    //If -1 is passed...
    if (amount < 0) {
        //Add -1 to counter if amount is greater than 0 -> no negative counter.
        if (products[id].count + amount >= 0) {
            //Counter decreased by 1
            products[id].count += amount;
            //Update sum by products price
            sum -= products[id].price;
        }
    } else {
        if (sum + products[id].price < credit) {
            products[id].count += amount;
            //update sum by product price
            sum += products[id].price
        } else {
            alert("You don't have sufficient credit")
        }
    }
    updateProducts();
}

//Order selected products when clicking "Order". Remove counts and load new
function order() {
    alert("Products ordered!")
    credit -= sum;
    var product;
    for (product in products) {
        products[product].count = 0;
    }
    sum = 0;
    //refresh site
    updateProducts();
}

function createProductHtml(id) {
    //Variable to store each object of the object array
    var product = products[id];
    //Return a string of html to insert rows in content automatically
    return '<div class="item">' + '<img src="' + product.image + '"/>' + '<span class="name">' + product.name + '</span>' + '<span class="price">' + product.price + '€</span>' + '<span class="remove button fa fa-minus" onclick = "modifyProduct(' + id + ',-1)";></span>' + '<span class="count">' + product.count + '</span>' + '<span class="add button fa fa-plus" onclick = "modifyProduct(' + id + ', 1)";></span>' + '</div>';
}

//Write productsHTML string containing of object information into content
function updateProducts() {
    var product;
    var productHTML = "";
    for (product in products) {
        //productsHTML += products.name
        productHTML += createProductHtml(product);
    }
    //Write productsHTML string into content section
    $('#content').html(productHTML);

    //Write sum and credit html
    $('#credit').html(credit + '€');
    $('#sum').html('∑' + sum + '€');
}

//Load updateProducts after DOM has loaded
$(function () {
    updateProducts();
});