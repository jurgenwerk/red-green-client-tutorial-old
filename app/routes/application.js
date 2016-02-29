import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from "../config/environment";

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  authenticatedAjax: Ember.inject.service(),
  sessionAuthenticated() {
    this._super(...arguments); // for keeping the defaults (attempted transition, routeAfterAuth config etc..)
    this.loadUser();
  },
  loadUser() {
    if (this.get('session.isAuthenticated')) {
      const request = this.get('authenticatedAjax').request(`${ENV.apiBaseURL}/users/me`);
      request.then((userData) => {
        this.store.pushPayload(userData);
        const user = this.store.peekRecord('user', userData.data.id);
        this.set('session.currentUser', user);
      });
    }
  },
  beforeModel() {
    this.loadUser();
  }
});
