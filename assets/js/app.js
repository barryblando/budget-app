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
  
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
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
    inputBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return { 
        type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
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

  var ctrlAddItem = function() {
    // TODO : Get  the field input data
    var input = UIController.getInput();
    
    // TODO : Add the item to the budget controller

    // TODO : Add the New item to the UI 

    // TODO : Calculate the Budget

    // TODO : Display the budget on the UI
    
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
    //I created it 'cause i want to have a place where I can put all the code that we want to be executed right at the beginning when app starts 
    init: function() {
      //application has started
      setupEventListeners();
    }
  };

})(budgetController, UIController);

//initiliaze application
appController.init();