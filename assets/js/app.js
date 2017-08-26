 /**
  * Modules: {
      - Important aspect of any robust application's architecture
      - Keep the units of code for a project both cleanly separated and organized;
      - Encapsulate some data into privacy and expose other publicly
      - Break up our code into logical parts which are the modules and then make them interact with one another,
        inside of separate, independent, and organized units.
  }
  * TASK LIST

  * UI MODULE [ VIEW ]: { 
    TODO: Get Input Values
    TODO: Add the New Item to the UI
    TODO: Update the UI
  }
  
  * DATA MODULE [ MODEL ]: { 
    TODO: Add the new Item to Our Data Structure
    TODO: Calculate Budget
  }

  //Control the Entire App and acting as a link
  * CONTROLLER MODULE [ CONTROLLER ]: { 
    TODO: Add Event Handler
  }

  * Module Pattern: { Private and Public Data, Encapsulation and Separation of Concerns }
  * MP Secret is that it returns an object containing all of the functions that we want to be public to access.
  * Data Encapsulation allows  us to hide the implementation details of a specific module from the outside scope so that we only expose a public interface which is sometimes called an API.
  * Separation of Concern is that each part of the application should only be interested in doing one thing independently
  
  */

/**
 * 
  //Using IIFE for data privacy 'cause it creates a new scope that is not visible from the outside scope
  //and automatically executed when run 
  var budgetController = (function() { //javascript runtime this line here gets executed and this anonymous function is declared and immediately called/invoked 'cause of the operator () in last line of function body
    'use strict';
    //private x and add function, these are in closures even after this IIFE here has returned
    var x = 23;
    var add = function(a) {
      return x + a;
    };

    //return an object that contains the method that we called publicTest
    //budgetController is an object containing the method called publicTest
    return {
      publicTest: function(b) { //this function that we return here will always have access to the x variable and add function 'cause of closure, only publicTest can access them
        return add(b);
      }
    };
  })(); 

  var UIController = (function() {
    'use strict';
    
  })();

  //Controls the budgetController nad UIController
  var appController = (function(budgetCtrl, UICtrl) {
    'use strict';
    
    //store in a variable
    var z = budgetCtrl.publicTest(5); //Good code practice
    // budgetController.publicTes(); <-- Bad code practice

    //create again a public
    return {
      anotherPublic: function() {
        console.log(z);
      }
    };
    
  })(budgetController, UIController);
  */

// BUDGET CONTROLLER
var budgetController = (function() { 
  'use strict';

  //create a private function constructor p.s always use capital letter in the beginning
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Do data structure in controller to keep track all of the Expenses, Income and the Budget itlsef, percentages too.
  /**
   * store all expenses in array and also for Income
   * we can somehow aggregate a lot of information into one nice data structure
   * it's always better to have one data structure where all the data goes 
   * instead of having a lot of random variables flowing around
   */

  //private data
  var data = {
    allItems: {
      //sample of data pushed exp: [['1','hello,','2323'], ['2','hellow,','2323'], ['3','hellop,','2323']],
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // ID = last ID + 1 e.g data.allItems['exp'][data.allItems['exp'].length - 1].id + 1 
      // ID = data.allItems['exp'][data.allItems['exp'].length -1][0] + 1

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new Item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      //push the type to data structure which is exp or inc e.g allItems[exp or inc]
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };


})(); 

// UI CONTROLLER
var UIController = (function() {
  'use strict';

  //Do some Data Structure, so won't hard to change some classes later
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function() {
      return { 
        type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) { //pass the newItem object from appController to addListItem as obj
      var html, newHtml, element;

      //TODO Create HTMl string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div>  <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      } else if(type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      
      //TODO Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);    

      //TODO Insert the HTML into the DOM
      //insert the newHtml that holds all the id description value in the element inc or exp
      //we'll use beforeend so that all HTMl will be inserted as a child of these containers
      //<reference https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' +  DOMstrings.inputValue);

      //this will trick the slice method into thinking that we give it an array so it will return an array, we can't do it like this fields.silce() 'cause fields is not an array.
      fieldsArr = Array.prototype.slice.call(fields);

      //we use foreach 'cause it moves over all of the elements of the fields array, and then sets the value of all of them back to empty string
      //<reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
      fieldsArr.forEach(function(current, index, arr) {
        current.value = '';
      });

      fieldsArr[0].focus();
    },
    getDOMstrings: function() {
      //turn private DOMstrings to public so it can be access by the AppController
      return DOMstrings;
    }
  };
})();
 
// GLOBAL APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {
  'use strict';

  var updateBudget = function() {
    // TODO : Calculate the Budget

    // TODO : Return the Budget

    // TODO : Display the Budget on the UI
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // TODO : Get the field input data
    input = UIController.getInput();
    
    //isNaN = is not a number is to true, we'll use the not operator ! to make it false so we can get true if it is a number
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // TODO : Add the item to the budget controller
      newItem = budgetController.addItem(input.type, input.description, input.value);

      // TODO : Add the New item to the UI 
      UICtrl.addListItem(newItem, input.type);
  
      // TODO : Clear the fields
      UICtrl.clearFields();
  
      // TODO :  Calculate and Update budget
      updateBudget();
    }
    
  };

  var setupEventListeners = function() {
    var DOM = UIController.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
    // TODO : Add keypress event (doesn't happen on any specific element, but happens on the global web page)
    document.addEventListener('keypress', function(event) {
      //console.log(event); Get the keyCode
      if(event.keyCode === 13 || event.which === 13) { 
        ctrlAddItem(); 
      }
    });
  };

  return {
    //I created it 'cause I want to have a place where I can put all the code that I want to be executed right at the beginning when app starts e.g Eventlisteners 
    init: function() {
      //application has started
      setupEventListeners();
    }
  };

})(budgetController, UIController);

//initiliaze application
appController.init();