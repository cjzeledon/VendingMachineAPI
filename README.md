# Vending Machine API

For this project, you will create a JSON API for a vending machine. This machine has a list of items for sale with their ids, descriptions, and costs. It also keeps track of all machine transactions with time of transaction.<br>

In previous lessons, we covered testing with Jest, test-driven development (TDD), and testing database models. Using test-driven development is recommended for this project, but not required. To use test-driven development, write the test for a piece of functionality first, make it pass, and then start on the next test.<br>

A specification for the API is provided.<br>

# Features  

The following features must exist. Each one may have one than more test around it.<br>

A customer should be able to get a list of the current items, their costs, and quantities of those items<br>
A customer should be able to buy an item using money<br>
A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.<br>
A customer should not be able to buy items that are not in the machine, but instead get an error<br>
A vendor should be able to see total amount of money in machine<br>
A vendor should be able to see a list of all purchases with their time of purchase<br>
A vendor should be able to update the description, quantity, and costs of items in the machine<br>
A vendor should be able to add a new item to the machine<br>
Note that this API does not require authentication.<br>

You can use either MongoDB or PostgreSQL for your data store.<br>

# API specification  

All responses from the API should be an object with a "status" key and a "data" key. Successful actions will have a status of "success" and failed actions will have a status of "fail." The "data" key will hold whatever output data is necessary.<br>

Example: a customer gets a list of items<br>

{<br>
  "status": "success",<br>
  "data": [<br>
    {<br>
      "id": 1,<br>
      "description": "Corn chips",<br>
      "cost": 65,<br>
      "quantity": 4<br>
    },<br>
    {<br>
      "id": 2,<br>
      "description": "Gum",<br>
      "cost": 35,<br>
      "quantity": 10<br>
    },<br>
    // ...<br>
  ]<br>
}<br>

Example: a customer tries to buy an item but does not give enough money.<br>

{<br>
  "status": "fail",<br>
  "data": {<br>
    "money_given": 50,<br>
    "money_required": 65<br>
  }<br>
}<br>

Your actual data for these may look different, but should include similar information. All references to money should be in cents.<br>

# API endpoints  

The following is a recommended list of API endpoints:<br>

GET /api/customer/items - get a list of items<br>
POST /api/customer/items/:itemId/purchases - purchase an item<br>
GET /api/vendor/purchases - get a list of all purchases with their item and date/time<br>
GET /api/vendor/money - get a total amount of money accepted by the machine<br>
POST /api/vendor/items - add a new item not previously existing in the machine<br>
PUT /api/vendor/items/:itemId - update item quantity, description, and cost<br>
