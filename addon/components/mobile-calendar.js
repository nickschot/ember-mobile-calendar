import Component from '@ember/component';
import layout from '../templates/components/mobile-calendar';

import { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default Component.extend({
  layout,

  // public
  value: null,
  dateFormat: 'MM/DD/YYYY',

  onSelect(){},

  _value: computed('value', function(){
    return !isEmpty(this.get('value'))
      ? moment(this.get('value'))
      : null;
  }),

  actions: {
    select(closeAction, day){
      closeAction();
      this.get('onSelect')(day ? get(day, 'date') : null);
    }
  }
});
