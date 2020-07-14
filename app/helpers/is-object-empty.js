import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

export function isObjectEmpty([object]) {
  return typeOf(object) === 'object' && Object.keys(object).length === 0;
}

export default helper(isObjectEmpty);
