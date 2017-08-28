
Feature('Input Test');

Scenario('Budget Test', (I) => {
  I.amOnPage('/');
  I.appendField('.add__description', 'Income Test');
  I.appendField('.add__value', 2323);
  I.click({css: '.add__btn'});
});
