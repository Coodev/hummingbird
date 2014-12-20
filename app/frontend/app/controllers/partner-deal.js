import Ember from 'ember';
import HasCurrentUser from '../mixins/has-current-user';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend(HasCurrentUser, {
  isRedeeming: false,
  hasRedeemed: false,
  code: null,

  actions: {
    redeemDeal: function() {
      if (this.get('isRedeeming')) { return; }

      this.set('isRedeeming', true);
      ajax({
        url: "/partner_deals/" + this.get('model.id'),
        type: "PUT"
      }).then((response) => {
        this.setProperties({
          code: response,
          hasRedeemed: true,
          isRedeeming: false
        });
      }, () => {
        this.set('isRedeeming', false);
      });
    }
  }
});