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

  _center: computed('_value', 'center', function(){
    if(this.get('center')){
      return moment(this.get('center'));
    } else if(moment.isMoment(this.get('_value'))){
      return this.get('_value');
    } else {
      return moment();
    }
  }),

  previousCenter: computed('_center', function(){
    const date = this.get('_center').clone().subtract(1, 'month');

    return { date }
  }),
  nextCenter: computed('_center', function(){
    const date = this.get('_center').clone().add(1, 'month');

    return { date }
  }),

  actions: {
    changeCenter(targetIndex, targetModel){
      if(targetModel && get(targetModel, 'date')){
        this.set('center', get(targetModel, 'date'));
      }
    },

    select(closeAction, day){
      closeAction();
      this.get('onSelect')(day ? get(day, 'date') : null);
    }
  }
});
