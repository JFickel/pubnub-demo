import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['pubnub:main'],
  channel: 'Demo Channel',
  new_message: '',
  messages: Ember.ArrayProxy.create({ content: ['Welcome to the Demo Channel'] }),
  userID: function () {
    return this.get('pubnub').get('cfg').uuid;
  }.property(),
  users: Ember.ArrayProxy.create({ content: [] }),
  init: function () {
    var pn   = this.get('pubnub');   // PubNub service instance
    var chan = this.get('channel');  // channel name
    var self = this;                 // reference to 'this' for callbacks

    // Subscribe to the Channel
    pn.emSubscribe({ channel: chan });

    // Register for message events
    pn.on(pn.emMsgEv(chan), function (payload) {
      self.get('messages').pushObject(payload.message);
    });

    // Register for presence events
    pn.on(pn.emPrsEv(chan), function () {
      self.get('users').set('content', pn.emListPresence(chan));
    });

    // Pre-Populate the user list (optional)
    pn.emHereNow({ channel: chan });

    // Populate message history (optional)
    pn.emHistory({
      channel: chan,
      count: 500
    });
  },
  actions: {
    publish: function () {
      this.get('pubnub').emPublish({
        channel: this.get('channel'),
        message: "[User" + this.get('userID') + "]: " + this.get('new_message')
      });
      this.set('new_message', '');
    }
  }
});
