import Service, { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Service.extend({
  metrics: service(),

  googleTrackConversion(id, label, params = {}, remarketing = false) {
    if (window.google_trackConversion) {
      window.google_trackConversion({
        google_conversion_id: id,
        google_conversion_label: label,
        google_remarketing_only: remarketing,
        google_custom_params: params,
        google_conversion_format: '3'
      });
    }
  },

  facebookTrackConversion(event, params = {}) {
    get(this, 'metrics').invoke('trackEvent', 'FacebookPixel', { event, ...params });
  }
});
