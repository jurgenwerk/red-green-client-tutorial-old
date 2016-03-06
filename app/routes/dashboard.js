import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel(transition) {
    this._super(...arguments);
    if (transition.targetName === "dashboard.index"){
      transition.abort();
      this.transitionTo('dashboard.overview');
    }
  },
  model() {
    return [
      {
        value: 310,
        changeType: "income",
        entryDate: "12-12-2015"
      },
      {
        value: 400,
        changeType: "expense",
        entryDate: "12-12-2015"
      },
      {
        value: 245,
        changeType: "expense",
        entryDate: "12-12-2015"
      }
    ];
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
