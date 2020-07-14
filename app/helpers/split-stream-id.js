import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function splitStreamId([streamId]) {
  if (isEmpty(streamId)) {
    return null;
  }
  return streamId.split(':')[1];
}

export default helper(splitStreamId);
