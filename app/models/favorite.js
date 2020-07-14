import Base from 'client/models/-base';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Base.extend({
  favRank: attr('number', { defaultValue: 9999 }),

  user: belongsTo('user', { inverse: 'favorites' }),
  item: belongsTo('-base')
});
