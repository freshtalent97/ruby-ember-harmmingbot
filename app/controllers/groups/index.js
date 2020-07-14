import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { concat } from 'client/utils/computed-macros';

const queryParams = new QueryParams({
  category: {
    defaultValue: 'all',
    refresh: true
  },
  sort: {
    defaultValue: 'featured',
    refresh: true
  },
  query: {
    defaultValue: '',
    refresh: true
  }
});

export default Controller.extend(queryParams.Mixin, {
  router: service(),
  groups: concat('model.taskInstance.value', 'model.paginatedRecords'),

  queryParamsDidChange({ shouldRefresh, queryParams, changed }) {
    if ('category' in changed) {
      const category = get(queryParams, 'category');
      const sort = category === 'all' ? 'featured' : 'recent';
      set(this, 'sort', sort);
    }
    if (shouldRefresh) {
      this.send('refreshModel');
    }
  },

  actions: {
    updateQueryParam(property, value) {
      set(this, property, value);
    },

    handleCreateClick() {
      if (!get(this, 'session.hasUser')) {
        get(this, 'session').signUpModal();
      } else {
        get(this, 'router').transitionTo('groups.new');
      }
    }
  },
});
