var data = {
  allItems: {
    exp: []
  }
};

var Expense = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};

var newItem1, newItem2, newItem3, ids, id, index;

id = 1;

newItem1 = new Expense(1, 'description', 2500);
newItem2 = new Expense(2, 'destion', 2100);
newItem3 = new Expense(3, 'desripion', 2200);

data.allItems['exp'].push(newItem1);
data.allItems['exp'].push(newItem2);
data.allItems['exp'].push(newItem3);

ids = data.allItems['exp'].map(function(current) {
  return current.id;
  /* returns 0 : 1,  1 : 2, 2 : 3, 3 : 6 */
});
console.log(data.allItems['exp']);
// search and returns the index number of the element of the array that we innput
index = ids.indexOf(id);

console.log(index);