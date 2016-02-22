import Ember from 'ember';
import DS from 'ember-data';
import ENV from "../config/environment";

export default DS.JSONAPIAdapter.extend({
  authorizer: 'authorizer:application',
  namespace: ENV.apiNamespace,
  host: ENV.serverURL,

  pathForType (type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  }
});
