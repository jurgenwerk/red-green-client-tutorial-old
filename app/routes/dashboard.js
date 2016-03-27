import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    if (transition.targetName === "dashboard.index"){
      transition.abort();
      this.transitionTo('dashboard.overview');
    }
  },
  model(params) {
    return this.store.query('balance-change', { filter: { period: params.period } });
  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
