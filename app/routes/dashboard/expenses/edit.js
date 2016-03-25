import Ember from 'ember';

export default Ember.Route.extend({
  // this route is not necessary (we can delete it), because Ember generates one
  // automatically (it also generates the model hook from dynamic segment)
  model(params) {
    return this.store.findRecord('balance-change', params.balance_change_id);
  }
});
