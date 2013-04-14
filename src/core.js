/**
 * StateMachine build for parsing automata.
 * This automata recogenize not only morse code also xxx code.(I don't know word to call, kind of this)
 */
exports.StateMachine = (function(){
  /**
   * class StateMachine
   */
  var StateMachine = function() {
    this.currentState = this.rootState = new State();
    this.afterInput = [];
    this.afterUninput = [];
    this.afterFlush = [];

    this.parse = function(rule) {
      for(var key in rule) {
        var currentState = this.rootState;
        for(var index in key) {
          var next = currentState.putNext(key[index]);
          currentState = next;
        }

        currentState.setValue(rule[key]);
      }
    };

    this.input = function(token) {
      for(var i = 0; i < token.length; i++) {
        this.currentState = this.currentState.getNext(token[i]);
        for(var callback in this.afterInput)
          callback.call(this, token[i]);
      }
    };

    this.uninput = function() {
      this.currentState = this.currentState.getParent();
      for(var callback in this.afterUninput)
        callback.call(this);
    };

    this.flush = function() {
      var result = this.currentState.getValue();
      this.currentState = this.rootState;

      for(var callback in this.afterFlush)
        callback.call(this, result);

      return result;
    };

    this.observe = function() {
      return this.currentState.getValue();
    };
  };

  /**
   * class State
   */
  var State = function() {
    this.value = '';
    this.parent = null;
    this.next = {};

    this.putNext = function(token) {
      if(!this.next[token]) {
        this.next[token] = new State();
        this.next[token].parent = this;
      }

      return this.next[token];
    };

    this.getNext = function(token) {
      if(!this.next[token])
        throw "wrong token : " + token;

      return this.next[token];
    };

    this.getParent = function() {
      if(!this.parent)
        throw "wrong parent";
      return this.parent;
    };

    this.setValue = function(value) {
      this.value = value;
    };

    this.getValue = function() {
      return this.value;
    };

  };

  return StateMachine;
})();

