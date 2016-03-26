import Ember from 'ember';

export default Ember.Controller.extend({
  currencyData: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  updatedUserAttrs: Ember.Object.create(), //object for saving updated values
  actions: {
    updateEmail(value) {
      this.set('updatedUserAttrs.email', value);
    },
    updateCurrency(value) {
      this.set('updatedUserAttrs.currency', value);
    },
    save() {
      const attributesToSave = {};
      if (Ember.isPresent(this.get('updatedUserAttrs.email'))) {
        attributesToSave.email = this.get('updatedUserAttrs.email');
      }
      if (Ember.isPresent(this.get('updatedUserAttrs.currency'))) {
        attributesToSave.currency = this.get('updatedUserAttrs.currency');
      }

      this.get('currentUser').setProperties(attributesToSave);

      this.get('currentUser').save().then(() => {
        this.set('saveMessage', 'Saved.')
      });
    }
  }
});
