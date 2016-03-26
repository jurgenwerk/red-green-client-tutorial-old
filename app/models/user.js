import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  currencyData: Ember.inject.service(),
  email: DS.attr('string'),
  currency: DS.attr('string'),
  currencySymbol: Ember.computed('currency', function() {
    return this.get('currencyData.currencies')[this.get('currency')].symbol;
  })
});
