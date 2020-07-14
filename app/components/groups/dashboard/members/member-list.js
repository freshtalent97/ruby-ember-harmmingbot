import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { concat } from 'client/utils/computed-macros';
import Pagination from 'kitsu-shared/mixins/pagination';

export default Component.extend(Pagination, {
  store: service(),
  members: concat('getMembersTask.last.value', 'paginatedRecords'),

  init() {
    this._super(...arguments);
    get(this, 'getMembersTask').perform();
  },

  getMembersTask: task(function* () {
    const group = get(this, 'group.id');
    return yield this.queryPaginated('group-member', {
      filter: { query_group: group },
      include: 'user,permissions',
      sort: 'rank,-created_at',
      page: { limit: 20 }
    });
  })
});
