import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),
  actions: {
    login(username, password) {
      this.get('session').authenticate('authenticator:oauth2', username, password)
        .catch(() => {
          this.controller.set('errorMessage', "Invalid login.");
        });
    }
  }
});
