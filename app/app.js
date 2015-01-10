import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var userID = Math.round(Math.random() * 1000);

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  PubNub: window.PubNubEmber.extend({
    cfg: {
      subscribe_key: 'sub-c-0e7a8ffa-93af-11e4-85c7-02ee2ddab7fe',
      publish_key: 'pub-c-5b5be1b3-3307-4dd6-9ee2-f8056a93428c',
      uuid: userID,
      ssl: true
    }
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
