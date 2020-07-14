import Route from '@ember/routing/route';
import { get } from '@ember/object';
import DataError from 'client/mixins/routes/data-error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(DataError, AuthenticatedRouteMixin, {
  authenticationRoute: 'dashboard',

  model({ id }) {
    return get(this, 'store').findRecord('group-invite', id, { include: 'group,sender,user', reload: true });
  },

  afterModel(model) {
    const userId = get(this, 'session.account.id');
    const inviteeId = get(model, 'user.id');
    if (userId !== inviteeId) {
      return this.transitionTo('dashboard');
    }
  }
});
