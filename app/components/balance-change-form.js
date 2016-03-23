import Ember from 'ember';
import accounting from "accounting";
import moment from 'moment';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const valueForInput = this.get('balanceChange.value') ?
      this.formatValue(this.get('balanceChange.value')) : null;
    this.set('valueForInput', valueForInput);
    this.set('balanceChangeData', this.get('balanceChange').getProperties('value', 'entryDate'));
  },
  formatValue(value) {
    // take cents and turn it into display value for input
    return accounting.formatMoney(value/100, "");
  },
  unformatInput(input) {
    // take the user input and turn it into cents
    return Math.round(accounting.unformat(input)*100);
  },
  dateForInput: Ember.computed('balanceChangeData.entryDate', function() {
    return new Date(this.get('balanceChangeData.entryDate'));
  }),
  valueIsNegative: Ember.computed('balanceChangeData.value', function() {
    return this.get('balanceChangeData.value') < 0;
  }),
  isValid: Ember.computed('balanceChangeData.value', 'valueIsNegative', function() {
    return this.get('balanceChangeData.value') != null && !this.get('valueIsNegative');
  }),
  disableButton: Ember.computed('balanceChange.isSaving', 'isValid', function() {
    return this.get('balanceChange.isSaving') || !this.get('isValid');
  }),
  actions: {
    setEntryDate(date) {
      this.set('balanceChangeData.entryDate', moment(date).format("YYYY-MM-DD"));
    },
    updateValueFromInput(value) {
      this.set('balanceChangeData.value', this.unformatInput(value));
      console.log(this.get('balanceChangeData'));
    }
  }
});
