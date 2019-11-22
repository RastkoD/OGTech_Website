// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/gsap/TweenLite.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDispatcher = exports.TweenPlugin = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.Ease = exports.Animation = exports.SimpleTimeline = exports.globals = exports.default = exports.TweenLite = exports._gsScope = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = typeof window !== "undefined" ? window : typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : void 0 || {};

exports._gsScope = _gsScope;

var TweenLite = function (window) {
  "use strict";

  var _exports = {},
      _doc = window.document,
      _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;

  if (_globals.TweenLite) {
    return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
  }

  var _namespace = function _namespace(ns) {
    var a = ns.split("."),
        p = _globals,
        i;

    for (i = 0; i < a.length; i++) {
      p[a[i]] = p = p[a[i]] || {};
    }

    return p;
  },
      gs = _namespace("com.greensock"),
      _tinyNum = 0.00000001,
      _slice = function _slice(a) {
    //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {}

    return b;
  },
      _emptyFunc = function _emptyFunc() {},
      _isArray = function () {
    //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
    var toString = Object.prototype.toString,
        array = toString.call([]);
    return function (obj) {
      return obj != null && (obj instanceof Array || _typeof(obj) === "object" && !!obj.push && toString.call(obj) === array);
    };
  }(),
      a,
      i,
      p,
      _ticker,
      _tickerActive,
      _defLookup = {},

  /**
   * @constructor
   * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
   * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
   * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
   * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
   *
   * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
   * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
   * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
   * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
   * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
   * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
   * sandbox the banner one like:
   *
   * <script>
   *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
   * </script>
   * <script src="js/greensock/v1.7/TweenMax.js"></script>
   * <script>
   *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
   * </script>
   * <script src="js/greensock/v1.6/TweenMax.js"></script>
   * <script>
   *     gs.TweenLite.to(...); //would use v1.7
   *     TweenLite.to(...); //would use v1.6
   * </script>
   *
   * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
   * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
   * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
   * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
   */
  Definition = function Definition(ns, dependencies, func, global) {
    this.sc = _defLookup[ns] ? _defLookup[ns].sc : []; //subclasses

    _defLookup[ns] = this;
    this.gsClass = null;
    this.func = func;
    var _classes = [];

    this.check = function (init) {
      var i = dependencies.length,
          missing = i,
          cur,
          a,
          n,
          cl;

      while (--i > -1) {
        if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
          _classes[i] = cur.gsClass;
          missing--;
        } else if (init) {
          cur.sc.push(this);
        }
      }

      if (missing === 0 && func) {
        a = ("com.greensock." + ns).split(".");
        n = a.pop();
        cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes); //exports to multiple environments

        if (global) {
          _globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)

          /*
          if (typeof(module) !== "undefined" && module.exports) { //node
          	if (ns === moduleName) {
          		module.exports = _exports[moduleName] = cl;
          		for (i in _exports) {
          			cl[i] = _exports[i];
          		}
          	} else if (_exports[moduleName]) {
          		_exports[moduleName][n] = cl;
          	}
          } else if (typeof(define) === "function" && define.amd){ //AMD
          	define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
          }
          */
        }

        for (i = 0; i < this.sc.length; i++) {
          this.sc[i].check();
        }
      }
    };

    this.check(true);
  },
      //used to create Definition instances (which basically registers a class that has dependencies).
  _gsDefine = window._gsDefine = function (ns, dependencies, func, global) {
    return new Definition(ns, dependencies, func, global);
  },
      //a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
  _class = gs._class = function (ns, func, global) {
    func = func || function () {};

    _gsDefine(ns, [], function () {
      return func;
    }, global);

    return func;
  };

  _gsDefine.globals = _globals;
  /*
   * ----------------------------------------------------------------
   * Ease
   * ----------------------------------------------------------------
   */

  var _baseParams = [0, 0, 1, 1],
      Ease = _class("easing.Ease", function (func, extraParams, type, power) {
    this._func = func;
    this._type = type || 0;
    this._power = power || 0;
    this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
  }, true),
      _easeMap = Ease.map = {},
      _easeReg = Ease.register = function (ease, names, types, create) {
    var na = names.split(","),
        i = na.length,
        ta = (types || "easeIn,easeOut,easeInOut").split(","),
        e,
        name,
        j,
        type;

    while (--i > -1) {
      name = na[i];
      e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
      j = ta.length;

      while (--j > -1) {
        type = ta[j];
        _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
      }
    }
  };

  p = Ease.prototype;
  p._calcEnd = false;

  p.getRatio = function (p) {
    if (this._func) {
      this._params[0] = p;
      return this._func.apply(null, this._params);
    }

    var t = this._type,
        pw = this._power,
        r = t === 1 ? 1 - p : t === 2 ? p : p < 0.5 ? p * 2 : (1 - p) * 2;

    if (pw === 1) {
      r *= r;
    } else if (pw === 2) {
      r *= r * r;
    } else if (pw === 3) {
      r *= r * r * r;
    } else if (pw === 4) {
      r *= r * r * r * r;
    }

    return t === 1 ? 1 - r : t === 2 ? r : p < 0.5 ? r / 2 : 1 - r / 2;
  }; //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)


  a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
  i = a.length;

  while (--i > -1) {
    p = a[i] + ",Power" + i;

    _easeReg(new Ease(null, null, 1, i), p, "easeOut", true);

    _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (i === 0 ? ",easeNone" : ""));

    _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
  }

  _easeMap.linear = gs.easing.Linear.easeIn;
  _easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks

  /*
   * ----------------------------------------------------------------
   * EventDispatcher
   * ----------------------------------------------------------------
   */

  var EventDispatcher = _class("events.EventDispatcher", function (target) {
    this._listeners = {};
    this._eventTarget = target || this;
  });

  p = EventDispatcher.prototype;

  p.addEventListener = function (type, callback, scope, useParam, priority) {
    priority = priority || 0;
    var list = this._listeners[type],
        index = 0,
        listener,
        i;

    if (this === _ticker && !_tickerActive) {
      _ticker.wake();
    }

    if (list == null) {
      this._listeners[type] = list = [];
    }

    i = list.length;

    while (--i > -1) {
      listener = list[i];

      if (listener.c === callback && listener.s === scope) {
        list.splice(i, 1);
      } else if (index === 0 && listener.pr < priority) {
        index = i + 1;
      }
    }

    list.splice(index, 0, {
      c: callback,
      s: scope,
      up: useParam,
      pr: priority
    });
  };

  p.removeEventListener = function (type, callback) {
    var list = this._listeners[type],
        i;

    if (list) {
      i = list.length;

      while (--i > -1) {
        if (list[i].c === callback) {
          list.splice(i, 1);
          return;
        }
      }
    }
  };

  p.dispatchEvent = function (type) {
    var list = this._listeners[type],
        i,
        t,
        listener;

    if (list) {
      i = list.length;

      if (i > 1) {
        list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
      }

      t = this._eventTarget;

      while (--i > -1) {
        listener = list[i];

        if (listener) {
          if (listener.up) {
            listener.c.call(listener.s || t, {
              type: type,
              target: t
            });
          } else {
            listener.c.call(listener.s || t);
          }
        }
      }
    }
  };
  /*
   * ----------------------------------------------------------------
   * Ticker
   * ----------------------------------------------------------------
   */


  var _reqAnimFrame = window.requestAnimationFrame,
      _cancelAnimFrame = window.cancelAnimationFrame,
      _getTime = Date.now || function () {
    return new Date().getTime();
  },
      _lastUpdate = _getTime(); //now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.


  a = ["ms", "moz", "webkit", "o"];
  i = a.length;

  while (--i > -1 && !_reqAnimFrame) {
    _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
    _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
  }

  _class("Ticker", function (fps, useRAF) {
    var _self = this,
        _startTime = _getTime(),
        _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _tickWord = "tick",
        //helps reduce gc burden
    _fps,
        _req,
        _id,
        _gap,
        _nextTime,
        _tick = function _tick(manual) {
      var elapsed = _getTime() - _lastUpdate,
          overlap,
          dispatch;

      if (elapsed > _lagThreshold) {
        _startTime += elapsed - _adjustedLag;
      }

      _lastUpdate += elapsed;
      _self.time = (_lastUpdate - _startTime) / 1000;
      overlap = _self.time - _nextTime;

      if (!_fps || overlap > 0 || manual === true) {
        _self.frame++;
        _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
        dispatch = true;
      }

      if (manual !== true) {
        //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
        _id = _req(_tick);
      }

      if (dispatch) {
        _self.dispatchEvent(_tickWord);
      }
    };

    EventDispatcher.call(_self);
    _self.time = _self.frame = 0;

    _self.tick = function () {
      _tick(true);
    };

    _self.lagSmoothing = function (threshold, adjustedLag) {
      if (!arguments.length) {
        //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
        return _lagThreshold < 1 / _tinyNum;
      }

      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    };

    _self.sleep = function () {
      if (_id == null) {
        return;
      }

      if (!_useRAF || !_cancelAnimFrame) {
        clearTimeout(_id);
      } else {
        _cancelAnimFrame(_id);
      }

      _req = _emptyFunc;
      _id = null;

      if (_self === _ticker) {
        _tickerActive = false;
      }
    };

    _self.wake = function (seamless) {
      if (_id !== null) {
        _self.sleep();
      } else if (seamless) {
        _startTime += -_lastUpdate + (_lastUpdate = _getTime());
      } else if (_self.frame > 10) {
        //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
        _lastUpdate = _getTime() - _lagThreshold + 5;
      }

      _req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function (f) {
        return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
      } : _reqAnimFrame;

      if (_self === _ticker) {
        _tickerActive = true;
      }

      _tick(2);
    };

    _self.fps = function (value) {
      if (!arguments.length) {
        return _fps;
      }

      _fps = value;
      _gap = 1 / (_fps || 60);
      _nextTime = this.time + _gap;

      _self.wake();
    };

    _self.useRAF = function (value) {
      if (!arguments.length) {
        return _useRAF;
      }

      _self.sleep();

      _useRAF = value;

      _self.fps(_fps);
    };

    _self.fps(fps); //a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.


    setTimeout(function () {
      if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
        _self.useRAF(false);
      }
    }, 1500);
  });

  p = gs.Ticker.prototype = new gs.events.EventDispatcher();
  p.constructor = gs.Ticker;
  /*
   * ----------------------------------------------------------------
   * Animation
   * ----------------------------------------------------------------
   */

  var Animation = _class("core.Animation", function (duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = !!vars.immediateRender;
    this.data = vars.data;
    this._reversed = !!vars.reversed;

    if (!_rootTimeline) {
      return;
    }

    if (!_tickerActive) {
      //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
      _ticker.wake();
    }

    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);

    if (this.vars.paused) {
      this.paused(true);
    }
  });

  _ticker = Animation.ticker = new gs.Ticker();
  p = Animation.prototype;
  p._dirty = p._gc = p._initted = p._paused = false;
  p._totalTime = p._time = 0;
  p._rawPrevTime = -1;
  p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
  p._paused = false; //some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.

  var _checkTimeout = function _checkTimeout() {
    if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) {
      //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
      _ticker.wake();
    }

    var t = setTimeout(_checkTimeout, 2000);

    if (t.unref) {
      // allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
      t.unref();
    }
  };

  _checkTimeout();

  p.play = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.reversed(false).paused(false);
  };

  p.pause = function (atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }

    return this.paused(true);
  };

  p.resume = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.paused(false);
  };

  p.seek = function (time, suppressEvents) {
    return this.totalTime(Number(time), suppressEvents !== false);
  };

  p.restart = function (includeDelay, suppressEvents) {
    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
  };

  p.reverse = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }

    return this.reversed(true).paused(false);
  };

  p.render = function (time, suppressEvents, force) {//stub - we override this method in subclasses.
  };

  p.invalidate = function () {
    this._time = this._totalTime = 0;
    this._initted = this._gc = false;
    this._rawPrevTime = -1;

    if (this._gc || !this.timeline) {
      this._enabled(true);
    }

    return this;
  };

  p.isActive = function () {
    var tl = this._timeline,
        //the 2 root timelines won't have a _timeline; they're always active.
    startTime = this._startTime,
        rawTime;
    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    this._gc = !enabled;
    this._active = this.isActive();

    if (ignoreTimeline !== true) {
      if (enabled && !this.timeline) {
        this._timeline.add(this, this._startTime - this._delay);
      } else if (!enabled && this.timeline) {
        this._timeline._remove(this, true);
      }
    }

    return false;
  };

  p._kill = function (vars, target) {
    return this._enabled(false, false);
  };

  p.kill = function (vars, target) {
    this._kill(vars, target);

    return this;
  };

  p._uncache = function (includeSelf) {
    var tween = includeSelf ? this : this.timeline;

    while (tween) {
      tween._dirty = true;
      tween = tween.timeline;
    }

    return this;
  };

  p._swapSelfInParams = function (params) {
    var i = params.length,
        copy = params.concat();

    while (--i > -1) {
      if (params[i] === "{self}") {
        copy[i] = this;
      }
    }

    return copy;
  };

  p._callback = function (type) {
    var v = this.vars,
        callback = v[type],
        params = v[type + "Params"],
        scope = v[type + "Scope"] || v.callbackScope || this,
        l = params ? params.length : 0;

    switch (l) {
      //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
      case 0:
        callback.call(scope);
        break;

      case 1:
        callback.call(scope, params[0]);
        break;

      case 2:
        callback.call(scope, params[0], params[1]);
        break;

      default:
        callback.apply(scope, params);
    }
  }; //----Animation getters/setters --------------------------------------------------------


  p.eventCallback = function (type, callback, params, scope) {
    if ((type || "").substr(0, 2) === "on") {
      var v = this.vars;

      if (arguments.length === 1) {
        return v[type];
      }

      if (callback == null) {
        delete v[type];
      } else {
        v[type] = callback;
        v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
        v[type + "Scope"] = scope;
      }

      if (type === "onUpdate") {
        this._onUpdate = callback;
      }
    }

    return this;
  };

  p.delay = function (value) {
    if (!arguments.length) {
      return this._delay;
    }

    if (this._timeline.smoothChildTiming) {
      this.startTime(this._startTime + value - this._delay);
    }

    this._delay = value;
    return this;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      this._dirty = false;
      return this._duration;
    }

    this._duration = this._totalDuration = value;

    this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.


    if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
      this.totalTime(this._totalTime * (value / this._duration), true);
    }
    return this;
  };

  p.totalDuration = function (value) {
    this._dirty = false;
    return !arguments.length ? this._totalDuration : this.duration(value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (!arguments.length) {
      return this._totalTime;
    }

    if (this._timeline) {
      if (time < 0 && !uncapped) {
        time += this.totalDuration();
      }

      if (this._timeline.smoothChildTiming) {
        if (this._dirty) {
          this.totalDuration();
        }

        var totalDuration = this._totalDuration,
            tl = this._timeline;

        if (time > totalDuration && !uncapped) {
          time = totalDuration;
        }

        this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;

        if (!tl._dirty) {
          //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
          this._uncache(false);
        } //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.


        if (tl._timeline) {
          while (tl._timeline) {
            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
              tl.totalTime(tl._totalTime, true);
            }

            tl = tl._timeline;
          }
        }
      }

      if (this._gc) {
        this._enabled(true, false);
      }

      if (this._totalTime !== time || this._duration === 0) {
        if (_lazyTweens.length) {
          _lazyRender();
        }

        this.render(time, suppressEvents, false);

        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
          _lazyRender();
        }
      }
    }

    return this;
  };

  p.progress = p.totalProgress = function (value, suppressEvents) {
    var duration = this.duration();
    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
  };

  p.startTime = function (value) {
    if (!arguments.length) {
      return this._startTime;
    }

    if (value !== this._startTime) {
      this._startTime = value;
      if (this.timeline) if (this.timeline._sortChildren) {
        this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
      }
    }

    return this;
  };

  p.endTime = function (includeRepeats) {
    return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
  };

  p.timeScale = function (value) {
    if (!arguments.length) {
      return this._timeScale;
    }

    var pauseTime, t;
    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    if (this._timeline && this._timeline.smoothChildTiming) {
      pauseTime = this._pauseTime;
      t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
      this._startTime = t - (t - this._startTime) * this._timeScale / value;
    }

    this._timeScale = value;
    t = this.timeline;

    while (t && t.timeline) {
      //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      t._dirty = true;
      t.totalDuration();
      t = t.timeline;
    }

    return this;
  };

  p.reversed = function (value) {
    if (!arguments.length) {
      return this._reversed;
    }

    if (value != this._reversed) {
      this._reversed = value;
      this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
    }

    return this;
  };

  p.paused = function (value) {
    if (!arguments.length) {
      return this._paused;
    }

    var tl = this._timeline,
        raw,
        elapsed;
    if (value != this._paused) if (tl) {
      if (!_tickerActive && !value) {
        _ticker.wake();
      }

      raw = tl.rawTime();
      elapsed = raw - this._pauseTime;

      if (!value && tl.smoothChildTiming) {
        this._startTime += elapsed;

        this._uncache(false);
      }

      this._pauseTime = value ? raw : null;
      this._paused = value;
      this._active = this.isActive();

      if (!value && elapsed !== 0 && this._initted && this.duration()) {
        raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
        this.render(raw, raw === this._totalTime, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
      }
    }

    if (this._gc && !value) {
      this._enabled(true, false);
    }

    return this;
  };
  /*
   * ----------------------------------------------------------------
   * SimpleTimeline
   * ----------------------------------------------------------------
   */


  var SimpleTimeline = _class("core.SimpleTimeline", function (vars) {
    Animation.call(this, 0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
  });

  p = SimpleTimeline.prototype = new Animation();
  p.constructor = SimpleTimeline;
  p.kill()._gc = false;
  p._first = p._last = p._recent = null;
  p._sortChildren = false;

  p.add = p.insert = function (child, position, align, stagger) {
    var prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    if (child._paused) if (this !== child._timeline) {
      //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
      child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
    }

    if (child.timeline) {
      child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.

    }

    child.timeline = child._timeline = this;

    if (child._gc) {
      child._enabled(true, true);
    }

    prevTween = this._last;

    if (this._sortChildren) {
      st = child._startTime;

      while (prevTween && prevTween._startTime > st) {
        prevTween = prevTween._prev;
      }
    }

    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }

    child._prev = prevTween;
    this._recent = child;

    if (this._timeline) {
      this._uncache(true);
    }

    return this;
  };

  p._remove = function (tween, skipDisable) {
    if (tween.timeline === this) {
      if (!skipDisable) {
        tween._enabled(false, true);
      }

      if (tween._prev) {
        tween._prev._next = tween._next;
      } else if (this._first === tween) {
        this._first = tween._next;
      }

      if (tween._next) {
        tween._next._prev = tween._prev;
      } else if (this._last === tween) {
        this._last = tween._prev;
      }

      tween._next = tween._prev = tween.timeline = null;

      if (tween === this._recent) {
        this._recent = this._last;
      }

      if (this._timeline) {
        this._uncache(true);
      }
    }

    return this;
  };

  p.render = function (time, suppressEvents, force) {
    var tween = this._first,
        next;
    this._totalTime = this._time = this._rawPrevTime = time;

    while (tween) {
      next = tween._next; //record it here because the value could change after rendering...

      if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) {
        if (!tween._reversed) {
          tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
        } else {
          tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
        }
      }

      tween = next;
    }
  };

  p.rawTime = function () {
    if (!_tickerActive) {
      _ticker.wake();
    }

    return this._totalTime;
  };
  /*
   * ----------------------------------------------------------------
   * TweenLite
   * ----------------------------------------------------------------
   */


  var TweenLite = _class("TweenLite", function (target, duration, vars) {
    Animation.call(this, duration, vars);
    this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

    if (target == null) {
      throw "Cannot tween a null target.";
    }

    this.target = target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
        overwrite = this.vars.overwrite,
        i,
        targ,
        targets;
    this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];

    if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
      this._targets = targets = _slice(target); //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()

      this._propLookup = [];
      this._siblings = [];

      for (i = 0; i < targets.length; i++) {
        targ = targets[i];

        if (!targ) {
          targets.splice(i--, 1);
          continue;
        } else if (typeof targ === "string") {
          targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings

          if (typeof targ === "string") {
            targets.splice(i + 1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
          }

          continue;
        } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
          //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
          targets.splice(i--, 1);
          this._targets = targets = targets.concat(_slice(targ));
          continue;
        }

        this._siblings[i] = _register(targ, this, false);
        if (overwrite === 1) if (this._siblings[i].length > 1) {
          _applyOverwrite(targ, this, null, 1, this._siblings[i]);
        }
      }
    } else {
      this._propLookup = {};
      this._siblings = _register(target, this, false);
      if (overwrite === 1) if (this._siblings.length > 1) {
        _applyOverwrite(target, this, null, 1, this._siblings);
      }
    }

    if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(Math.min(0, -this._delay)); //in case delay is negative
    }
  }, true),
      _isSelector = function _isSelector(v) {
    return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
  },
      _autoCSS = function _autoCSS(vars, target) {
    var css = {},
        p;

    for (p in vars) {
      if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
        //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
        css[p] = vars[p];
        delete vars[p];
      }
    }

    vars.css = css;
  };

  p = TweenLite.prototype = new Animation();
  p.constructor = TweenLite;
  p.kill()._gc = false; //----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

  p.ratio = 0;
  p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
  p._notifyPluginsOfEnabled = p._lazy = false;
  TweenLite.version = "2.1.3";
  TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
  TweenLite.defaultOverwrite = "auto";
  TweenLite.ticker = _ticker;
  TweenLite.autoSleep = 120;

  TweenLite.lagSmoothing = function (threshold, adjustedLag) {
    _ticker.lagSmoothing(threshold, adjustedLag);
  };

  TweenLite.selector = window.$ || window.jQuery || function (e) {
    var selector = window.$ || window.jQuery;

    if (selector) {
      TweenLite.selector = selector;
      return selector(e);
    }

    if (!_doc) {
      //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
      _doc = window.document;
    }

    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
  };

  var _lazyTweens = [],
      _lazyLookup = {},
      _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
      _relExp = /[\+-]=-?[\.\d]/,
      //_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
  _setRatio = function _setRatio(v) {
    var pt = this._firstPT,
        min = 0.000001,
        val;

    while (pt) {
      val = !pt.blob ? pt.c * v + pt.s : v === 1 && this.end != null ? this.end : v ? this.join("") : this.start;

      if (pt.m) {
        val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
      } else if (val < min) if (val > -min && !pt.blob) {
        //prevents issues with converting very small numbers to strings in the browser
        val = 0;
      }

      if (!pt.f) {
        pt.t[pt.p] = val;
      } else if (pt.fp) {
        pt.t[pt.p](pt.fp, val);
      } else {
        pt.t[pt.p](val);
      }

      pt = pt._next;
    }
  },
      _blobRound = function _blobRound(v) {
    return (v * 1000 | 0) / 1000 + "";
  },
      //compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
  _blobDif = function _blobDif(start, end, filter, pt) {
    var a = [],
        charIndex = 0,
        s = "",
        color = 0,
        startNums,
        endNums,
        num,
        i,
        l,
        nonNumbers,
        currentNum;
    a.start = start;
    a.end = end;
    start = a[0] = start + ""; //ensure values are strings

    end = a[1] = end + "";

    if (filter) {
      filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }

    a.length = 0;
    startNums = start.match(_numbersExp) || [];
    endNums = end.match(_numbersExp) || [];

    if (pt) {
      pt._next = null;
      pt.blob = 1;
      a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
    }

    l = endNums.length;

    for (i = 0; i < l; i++) {
      currentNum = endNums[i];
      nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
      s += nonNumbers || !i ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.

      charIndex += nonNumbers.length;

      if (color) {
        //sense rgba() values and round them.
        color = (color + 1) % 5;
      } else if (nonNumbers.substr(-5) === "rgba(") {
        color = 1;
      }

      if (currentNum === startNums[i] || startNums.length <= i) {
        s += currentNum;
      } else {
        if (s) {
          a.push(s);
          s = "";
        }

        num = parseFloat(startNums[i]);
        a.push(num);
        a._firstPT = {
          _next: a._firstPT,
          t: a,
          p: a.length - 1,
          s: num,
          c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
          f: 0,
          m: color && color < 4 ? Math.round : _blobRound
        }; //limiting to 3 decimal places and casting as a string can really help performance when array.join() is called!
        //note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
      }

      charIndex += currentNum.length;
    }

    s += end.substr(charIndex);

    if (s) {
      a.push(s);
    }

    a.setRatio = _setRatio;

    if (_relExp.test(end)) {
      //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
      a.end = null;
    }

    return a;
  },
      //note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
  _addPropTween = function _addPropTween(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
    if (typeof end === "function") {
      end = end(index || 0, target);
    }

    var type = _typeof(target[prop]),
        getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3),
        s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
        isRelative = typeof end === "string" && end.charAt(1) === "=",
        pt = {
      t: target,
      p: prop,
      s: s,
      f: type === "function",
      pg: 0,
      n: overwriteProp || prop,
      m: !mod ? 0 : typeof mod === "function" ? mod : Math.round,
      pr: 0,
      c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
    },
        blob;

    if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
      if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
        //a blob (string that has multiple numbers in it)
        pt.fp = funcParam;
        blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite.defaultStringFilter, pt);
        pt = {
          t: blob,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 2,
          pg: 0,
          n: overwriteProp || prop,
          pr: 0,
          m: 0
        }; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
      } else {
        pt.s = parseFloat(s);

        if (!isRelative) {
          pt.c = parseFloat(end) - pt.s || 0;
        }
      }
    }

    if (pt.c) {
      //only add it to the linked list if there's a change.
      if (pt._next = this._firstPT) {
        pt._next._prev = pt;
      }

      this._firstPT = pt;
      return pt;
    }
  },
      _internals = TweenLite._internals = {
    isArray: _isArray,
    isSelector: _isSelector,
    lazyTweens: _lazyTweens,
    blobDif: _blobDif
  },
      //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
  _plugins = TweenLite._plugins = {},
      _tweenLookup = _internals.tweenLookup = {},
      _tweenLookupNum = 0,
      _reservedProps = _internals.reservedProps = {
    ease: 1,
    delay: 1,
    overwrite: 1,
    onComplete: 1,
    onCompleteParams: 1,
    onCompleteScope: 1,
    useFrames: 1,
    runBackwards: 1,
    startAt: 1,
    onUpdate: 1,
    onUpdateParams: 1,
    onUpdateScope: 1,
    onStart: 1,
    onStartParams: 1,
    onStartScope: 1,
    onReverseComplete: 1,
    onReverseCompleteParams: 1,
    onReverseCompleteScope: 1,
    onRepeat: 1,
    onRepeatParams: 1,
    onRepeatScope: 1,
    easeParams: 1,
    yoyo: 1,
    immediateRender: 1,
    repeat: 1,
    repeatDelay: 1,
    data: 1,
    paused: 1,
    reversed: 1,
    autoCSS: 1,
    lazy: 1,
    onOverwrite: 1,
    callbackScope: 1,
    stringFilter: 1,
    id: 1,
    yoyoEase: 1,
    stagger: 1
  },
      _overwriteLookup = {
    none: 0,
    all: 1,
    auto: 2,
    concurrent: 3,
    allOnStart: 4,
    preexisting: 5,
    "true": 1,
    "false": 0
  },
      _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
      _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
      _nextGCFrame = 30,
      _lazyRender = _internals.lazyRender = function () {
    var l = _lazyTweens.length,
        i,
        tween;
    _lazyLookup = {};

    for (i = 0; i < l; i++) {
      tween = _lazyTweens[i];

      if (tween && tween._lazy !== false) {
        tween.render(tween._lazy[0], tween._lazy[1], true);
        tween._lazy = false;
      }
    }

    _lazyTweens.length = 0;
  };

  _rootTimeline._startTime = _ticker.time;
  _rootFramesTimeline._startTime = _ticker.frame;
  _rootTimeline._active = _rootFramesTimeline._active = true;
  setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

  Animation._updateRoot = TweenLite.render = function () {
    var i, a, p;

    if (_lazyTweens.length) {
      //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
      _lazyRender();
    }

    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);

    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);

    if (_lazyTweens.length) {
      _lazyRender();
    }

    if (_ticker.frame >= _nextGCFrame) {
      //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
      _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);

      for (p in _tweenLookup) {
        a = _tweenLookup[p].tweens;
        i = a.length;

        while (--i > -1) {
          if (a[i]._gc) {
            a.splice(i, 1);
          }
        }

        if (a.length === 0) {
          delete _tweenLookup[p];
        }
      } //if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly


      p = _rootTimeline._first;
      if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
        while (p && p._paused) {
          p = p._next;
        }

        if (!p) {
          _ticker.sleep();
        }
      }
    }
  };

  _ticker.addEventListener("tick", Animation._updateRoot);

  var _register = function _register(target, tween, scrub) {
    var id = target._gsTweenID,
        a,
        i;

    if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
      _tweenLookup[id] = {
        target: target,
        tweens: []
      };
    }

    if (tween) {
      a = _tweenLookup[id].tweens;
      a[i = a.length] = tween;

      if (scrub) {
        while (--i > -1) {
          if (a[i] === tween) {
            a.splice(i, 1);
          }
        }
      }
    }

    return _tweenLookup[id].tweens;
  },
      _onOverwrite = function _onOverwrite(overwrittenTween, overwritingTween, target, killedProps) {
    var func = overwrittenTween.vars.onOverwrite,
        r1,
        r2;

    if (func) {
      r1 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    func = TweenLite.onOverwrite;

    if (func) {
      r2 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    return r1 !== false && r2 !== false;
  },
      _applyOverwrite = function _applyOverwrite(target, tween, props, mode, siblings) {
    var i, changed, curTween, l;

    if (mode === 1 || mode >= 4) {
      l = siblings.length;

      for (i = 0; i < l; i++) {
        if ((curTween = siblings[i]) !== tween) {
          if (!curTween._gc) {
            if (curTween._kill(null, target, tween)) {
              changed = true;
            }
          }
        } else if (mode === 5) {
          break;
        }
      }

      return changed;
    } //NOTE: Add tiny amount to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)


    var startTime = tween._startTime + _tinyNum,
        overlaps = [],
        oCount = 0,
        zeroDur = tween._duration === 0,
        globalStart;
    i = siblings.length;

    while (--i > -1) {
      if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {//ignore
      } else if (curTween._timeline !== tween._timeline) {
        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);

        if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
          overlaps[oCount++] = curTween;
        }
      } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= _tinyNum * 2)) {
        overlaps[oCount++] = curTween;
      }
    }

    i = oCount;

    while (--i > -1) {
      curTween = overlaps[i];
      l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278

      if (mode === 2) if (curTween._kill(props, target, tween)) {
        changed = true;
      }

      if (mode !== 2 || !curTween._firstPT && curTween._initted && l) {
        if (mode !== 2 && !_onOverwrite(curTween, tween)) {
          continue;
        }

        if (curTween._enabled(false, false)) {
          //if all property tweens have been overwritten, kill the tween.
          changed = true;
        }
      }
    }

    return changed;
  },
      _checkOverlap = function _checkOverlap(tween, reference, zeroDur) {
    var tl = tween._timeline,
        ts = tl._timeScale,
        t = tween._startTime;

    while (tl._timeline) {
      t += tl._startTime;
      ts *= tl._timeScale;

      if (tl._paused) {
        return -100;
      }

      tl = tl._timeline;
    }

    t /= ts;
    return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
  }; //---- TweenLite instance methods -----------------------------------------------------------------------------


  p._init = function () {
    var v = this.vars,
        op = this._overwrittenProps,
        dur = this._duration,
        immediate = !!v.immediateRender,
        ease = v.ease,
        startAt = this._startAt,
        i,
        initPlugins,
        pt,
        p,
        startVars,
        l;

    if (v.startAt) {
      if (startAt) {
        startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.

        startAt.kill();
      }

      startVars = {};

      for (p in v.startAt) {
        //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
        startVars[p] = v.startAt[p];
      }

      startVars.data = "isStart";
      startVars.overwrite = false;
      startVars.immediateRender = true;
      startVars.lazy = immediate && v.lazy !== false;
      startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).

      startVars.onUpdate = v.onUpdate;
      startVars.onUpdateParams = v.onUpdateParams;
      startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
      this._startAt = TweenLite.to(this.target || {}, 0, startVars);

      if (immediate) {
        if (this._time > 0) {
          this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
        } else if (dur !== 0) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (v.runBackwards && dur !== 0) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (startAt) {
        startAt.render(-1, true);
        startAt.kill();
        this._startAt = null;
      } else {
        if (this._time !== 0) {
          //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
          immediate = false;
        }

        pt = {};

        for (p in v) {
          //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
          if (!_reservedProps[p] || p === "autoCSS") {
            pt[p] = v[p];
          }
        }

        pt.overwrite = 0;
        pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.

        pt.lazy = immediate && v.lazy !== false;
        pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)

        this._startAt = TweenLite.to(this.target, 0, pt);

        if (!immediate) {
          this._startAt._init(); //ensures that the initial values are recorded


          this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.


          if (this.vars.immediateRender) {
            this._startAt = null;
          }
        } else if (this._time === 0) {
          return;
        }
      }
    }

    this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : typeof ease === "function" ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;

    if (v.easeParams instanceof Array && ease.config) {
      this._ease = ease.config.apply(ease, v.easeParams);
    }

    this._easeType = this._ease._type;
    this._easePower = this._ease._power;
    this._firstPT = null;

    if (this._targets) {
      l = this._targets.length;

      for (i = 0; i < l; i++) {
        if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) {
          initPlugins = true;
        }
      }
    } else {
      initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
    }

    if (initPlugins) {
      TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite

    }

    if (op) if (!this._firstPT) if (typeof this.target !== "function") {
      //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
      this._enabled(false, false);
    }

    if (v.runBackwards) {
      pt = this._firstPT;

      while (pt) {
        pt.s += pt.c;
        pt.c = -pt.c;
        pt = pt._next;
      }
    }

    this._onUpdate = v.onUpdate;
    this._initted = true;
  };

  p._initProps = function (target, propLookup, siblings, overwrittenProps, index) {
    var p, i, initPlugins, plugin, pt, v;

    if (target == null) {
      return false;
    }

    if (_lazyLookup[target._gsTweenID]) {
      _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

    }

    if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) {
      //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
      _autoCSS(this.vars, target);
    }

    for (p in this.vars) {
      v = this.vars[p];

      if (_reservedProps[p]) {
        if (v) if (v instanceof Array || v.push && _isArray(v)) if (v.join("").indexOf("{self}") !== -1) {
          this.vars[p] = v = this._swapSelfInParams(v, this);
        }
      } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {
        //t - target 		[object]
        //p - property 		[string]
        //s - start			[number]
        //c - change		[number]
        //f - isFunction	[boolean]
        //n - name			[string]
        //pg - isPlugin 	[boolean]
        //pr - priority		[number]
        //m - mod           [function | 0]
        this._firstPT = pt = {
          _next: this._firstPT,
          t: plugin,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          n: p,
          pg: 1,
          pr: plugin._priority,
          m: 0
        };
        i = plugin._overwriteProps.length;

        while (--i > -1) {
          propLookup[plugin._overwriteProps[i]] = this._firstPT;
        }

        if (plugin._priority || plugin._onInitAllProps) {
          initPlugins = true;
        }

        if (plugin._onDisable || plugin._onEnable) {
          this._notifyPluginsOfEnabled = true;
        }

        if (pt._next) {
          pt._next._prev = pt;
        }
      } else {
        propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
      }
    }

    if (overwrittenProps) if (this._kill(overwrittenProps, target)) {
      //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
      this._kill(propLookup, target);

      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._firstPT) if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
      //zero duration tweens don't lazy render by default; everything else does.
      _lazyLookup[target._gsTweenID] = true;
    }
    return initPlugins;
  };

  p.render = function (time, suppressEvents, force) {
    var self = this,
        prevTime = self._time,
        duration = self._duration,
        prevRawPrevTime = self._rawPrevTime,
        isComplete,
        callback,
        pt,
        rawPrevTime;

    if (time >= duration - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = self._time = duration;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;

      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (self._initted || !self.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (self._startTime === self._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;

      if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) if (self._initted || !self.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && self.data === "isPause")) {
            force = true;
          }

          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!self._initted || self._startAt && self._startAt.progress()) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
        force = true;
      }
    } else {
      self._totalTime = self._time = time;

      if (self._easeType) {
        var r = time / duration,
            type = self._easeType,
            pow = self._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        self.ratio = type === 1 ? 1 - r : type === 2 ? r : time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else {
        self.ratio = self._ease.getRatio(time / duration);
      }
    }

    if (self._time === prevTime && !force) {
      return;
    } else if (!self._initted) {
      self._init();

      if (!self._initted || self._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        self._time = self._totalTime = prevTime;
        self._rawPrevTime = prevRawPrevTime;

        _lazyTweens.push(self);

        self._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (self._time && !isComplete) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && self._ease._calcEnd) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }

    if (self._lazy !== false) {
      //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
      self._lazy = false;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
      self._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTime === 0) {
      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (self.vars.onStart) if (self._time !== 0 || duration === 0) if (!suppressEvents) {
        self._callback("onStart");
      }
    }

    pt = self._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (self._onUpdate) {
      if (time < 0) if (self._startAt && time !== -0.0001) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (self._time !== prevTime || isComplete || force) {
        self._callback("onUpdate");
      }
    }

    if (callback) if (!self._gc || force) {
      //check _gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && self._startAt && !self._onUpdate && time !== -0.0001) {
        //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
        self._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }

      if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        self._rawPrevTime = 0;
      }
    }
  };

  p._kill = function (vars, target, overwritingTween) {
    if (vars === "all") {
      vars = null;
    }

    if (vars == null) if (target == null || target === this.target) {
      this._lazy = false;
      return this._enabled(false, false);
    }
    target = typeof target !== "string" ? target || this._targets || this.target : TweenLite.selector(target) || target;
    var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline,
        firstPT = this._firstPT,
        i,
        overwrittenProps,
        p,
        pt,
        propLookup,
        changed,
        killProps,
        record,
        killed;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;

      while (--i > -1) {
        if (this._kill(vars, target[i], overwritingTween)) {
          changed = true;
        }
      }
    } else {
      if (this._targets) {
        i = this._targets.length;

        while (--i > -1) {
          if (target === this._targets[i]) {
            propLookup = this._propLookup[i] || {};
            this._overwrittenProps = this._overwrittenProps || [];
            overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
            break;
          }
        }
      } else if (target !== this.target) {
        return false;
      } else {
        propLookup = this._propLookup;
        overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
      }

      if (propLookup) {
        killProps = vars || propLookup;
        record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (_typeof(vars) !== "object" || !vars._tempKill); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)

        if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
          for (p in killProps) {
            if (propLookup[p]) {
              if (!killed) {
                killed = [];
              }

              killed.push(p);
            }
          }

          if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
            //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
            return false;
          }
        }

        for (p in killProps) {
          if (pt = propLookup[p]) {
            if (simultaneousOverwrite) {
              //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
              if (pt.f) {
                pt.t[pt.p](pt.s);
              } else {
                pt.t[pt.p] = pt.s;
              }

              changed = true;
            }

            if (pt.pg && pt.t._kill(killProps)) {
              changed = true; //some plugins need to be notified so they can perform cleanup tasks first
            }

            if (!pt.pg || pt.t._overwriteProps.length === 0) {
              if (pt._prev) {
                pt._prev._next = pt._next;
              } else if (pt === this._firstPT) {
                this._firstPT = pt._next;
              }

              if (pt._next) {
                pt._next._prev = pt._prev;
              }

              pt._next = pt._prev = null;
            }

            delete propLookup[p];
          }

          if (record) {
            overwrittenProps[p] = 1;
          }
        }

        if (!this._firstPT && this._initted && firstPT) {
          //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
          this._enabled(false, false);
        }
      }
    }

    return changed;
  };

  p.invalidate = function () {
    if (this._notifyPluginsOfEnabled) {
      TweenLite._onPluginEvent("_onDisable", this);
    }

    var t = this._time;
    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
    this._propLookup = this._targets ? {} : [];
    Animation.prototype.invalidate.call(this);

    if (this.vars.immediateRender) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(t, false, this.vars.lazy !== false);
    }

    return this;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (enabled && this._gc) {
      var targets = this._targets,
          i;

      if (targets) {
        i = targets.length;

        while (--i > -1) {
          this._siblings[i] = _register(targets[i], this, true);
        }
      } else {
        this._siblings = _register(this.target, this, true);
      }
    }

    Animation.prototype._enabled.call(this, enabled, ignoreTimeline);

    if (this._notifyPluginsOfEnabled) if (this._firstPT) {
      return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
    }
    return false;
  }; //----TweenLite static methods -----------------------------------------------------


  TweenLite.to = function (target, duration, vars) {
    return new TweenLite(target, duration, vars);
  };

  TweenLite.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenLite(target, duration, vars);
  };

  TweenLite.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenLite(target, duration, toVars);
  };

  TweenLite.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenLite(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      lazy: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenLite.set = function (target, vars) {
    return new TweenLite(target, 0, vars);
  };

  TweenLite.getTweensOf = function (target, onlyActive) {
    if (target == null) {
      return [];
    }

    target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var i, a, j, t;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;
      a = [];

      while (--i > -1) {
        a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
      }

      i = a.length; //now get rid of any duplicates (tweens of arrays of objects could cause duplicates)

      while (--i > -1) {
        t = a[i];
        j = i;

        while (--j > -1) {
          if (t === a[j]) {
            a.splice(i, 1);
          }
        }
      }
    } else if (target._gsTweenID) {
      a = _register(target).concat();
      i = a.length;

      while (--i > -1) {
        if (a[i]._gc || onlyActive && !a[i].isActive()) {
          a.splice(i, 1);
        }
      }
    }

    return a || [];
  };

  TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function (target, onlyActive, vars) {
    if (_typeof(onlyActive) === "object") {
      vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)

      onlyActive = false;
    }

    var a = TweenLite.getTweensOf(target, onlyActive),
        i = a.length;

    while (--i > -1) {
      a[i]._kill(vars, target);
    }
  };
  /*
   * ----------------------------------------------------------------
   * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
   * ----------------------------------------------------------------
   */


  var TweenPlugin = _class("plugins.TweenPlugin", function (props, priority) {
    this._overwriteProps = (props || "").split(",");
    this._propName = this._overwriteProps[0];
    this._priority = priority || 0;
    this._super = TweenPlugin.prototype;
  }, true);

  p = TweenPlugin.prototype;
  TweenPlugin.version = "1.19.0";
  TweenPlugin.API = 2;
  p._firstPT = null;
  p._addTween = _addPropTween;
  p.setRatio = _setRatio;

  p._kill = function (lookup) {
    var a = this._overwriteProps,
        pt = this._firstPT,
        i;

    if (lookup[this._propName] != null) {
      this._overwriteProps = [];
    } else {
      i = a.length;

      while (--i > -1) {
        if (lookup[a[i]] != null) {
          a.splice(i, 1);
        }
      }
    }

    while (pt) {
      if (lookup[pt.n] != null) {
        if (pt._next) {
          pt._next._prev = pt._prev;
        }

        if (pt._prev) {
          pt._prev._next = pt._next;
          pt._prev = null;
        } else if (this._firstPT === pt) {
          this._firstPT = pt._next;
        }
      }

      pt = pt._next;
    }

    return false;
  };

  p._mod = p._roundProps = function (lookup) {
    var pt = this._firstPT,
        val;

    while (pt) {
      val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];

      if (val && typeof val === "function") {
        //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
        if (pt.f === 2) {
          pt.t._applyPT.m = val;
        } else {
          pt.m = val;
        }
      }

      pt = pt._next;
    }
  };

  TweenLite._onPluginEvent = function (type, tween) {
    var pt = tween._firstPT,
        changed,
        pt2,
        first,
        last,
        next;

    if (type === "_onInitAllProps") {
      //sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      pt = tween._firstPT = first;
    }

    while (pt) {
      if (pt.pg) if (typeof pt.t[type] === "function") if (pt.t[type]()) {
        changed = true;
      }
      pt = pt._next;
    }

    return changed;
  };

  TweenPlugin.activate = function (plugins) {
    var i = plugins.length;

    while (--i > -1) {
      if (plugins[i].API === TweenPlugin.API) {
        _plugins[new plugins[i]()._propName] = plugins[i];
      }
    }

    return true;
  }; //provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.


  _gsDefine.plugin = function (config) {
    if (!config || !config.propName || !config.init || !config.API) {
      throw "illegal plugin definition.";
    }

    var propName = config.propName,
        priority = config.priority || 0,
        overwriteProps = config.overwriteProps,
        map = {
      init: "_onInitTween",
      set: "setRatio",
      kill: "_kill",
      round: "_mod",
      mod: "_mod",
      initAll: "_onInitAllProps"
    },
        Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function () {
      TweenPlugin.call(this, propName, priority);
      this._overwriteProps = overwriteProps || [];
    }, config.global === true),
        p = Plugin.prototype = new TweenPlugin(propName),
        prop;

    p.constructor = Plugin;
    Plugin.API = config.API;

    for (prop in map) {
      if (typeof config[prop] === "function") {
        p[map[prop]] = config[prop];
      }
    }

    Plugin.version = config.version;
    TweenPlugin.activate([Plugin]);
    return Plugin;
  }; //now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.


  a = window._gsQueue;

  if (a) {
    for (i = 0; i < a.length; i++) {
      a[i]();
    }

    for (p in _defLookup) {
      if (!_defLookup[p].func) {
        window.console.log("GSAP encountered missing dependency: " + p);
      }
    }
  }

  _tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

  return TweenLite;
}(_gsScope, "TweenLite");

exports.default = exports.TweenLite = TweenLite;
var globals = _gsScope.GreenSockGlobals;
exports.globals = globals;
var nonGlobals = globals.com.greensock;
var SimpleTimeline = nonGlobals.core.SimpleTimeline;
exports.SimpleTimeline = SimpleTimeline;
var Animation = nonGlobals.core.Animation;
exports.Animation = Animation;
var Ease = globals.Ease;
exports.Ease = Ease;
var Linear = globals.Linear;
exports.Linear = Linear;
var Power0 = Linear;
exports.Power0 = Power0;
var Power1 = globals.Power1;
exports.Power1 = Power1;
var Power2 = globals.Power2;
exports.Power2 = Power2;
var Power3 = globals.Power3;
exports.Power3 = Power3;
var Power4 = globals.Power4;
exports.Power4 = Power4;
var TweenPlugin = globals.TweenPlugin;
exports.TweenPlugin = TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;
exports.EventDispatcher = EventDispatcher;
},{}],"../node_modules/gsap/TweenMaxBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
exports.TweenMaxBase = exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var _slice = function _slice(a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _applyCycle = function _applyCycle(vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }

    delete vars.cycle;
  },
      //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  _distribute = function _distribute(v) {
    if (typeof v === "function") {
      return v;
    }

    var vars = _typeof(v) === "object" ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = vars.ease,
        from = vars.from || 0,
        base = vars.base || 0,
        cache = {},
        isFromKeyword = isNaN(from),
        axis = vars.axis,
        ratio = {
      center: 0.5,
      end: 1
    }[from] || 0;
    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrap;

      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];

        if (!wrap) {
          max = -Infinity;

          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {}

          wrap--;
        }

        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;

        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);

          if (d > max) {
            max = d;
          }

          if (d < min) {
            min = d;
          }
        }

        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }

      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  },
      TweenMax = function TweenMax(target, duration, vars) {
    _TweenLite.default.call(this, target, duration, vars);

    this._cycle = 0;
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    if (this._repeat) {
      this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.

    }

    this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      p = TweenMax.prototype = _TweenLite.default.to({}, 0.1, {}),
      _blankArray = [];

  TweenMax.version = "2.1.3";
  p.constructor = TweenMax;
  p.kill()._gc = false;
  TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = _TweenLite.default.killTweensOf;
  TweenMax.getTweensOf = _TweenLite.default.getTweensOf;
  TweenMax.lagSmoothing = _TweenLite.default.lagSmoothing;
  TweenMax.ticker = _TweenLite.default.ticker;
  TweenMax.render = _TweenLite.default.render;
  TweenMax.distribute = _distribute;

  p.invalidate = function () {
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._yoyoEase = null;

    this._uncache(true);

    return _TweenLite.default.prototype.invalidate.call(this);
  };

  p.updateTo = function (vars, resetDuration) {
    var self = this,
        curRatio = self.ratio,
        immediate = self.vars.immediateRender || vars.immediateRender,
        p;

    if (resetDuration && self._startTime < self._timeline._time) {
      self._startTime = self._timeline._time;

      self._uncache(false);

      if (self._gc) {
        self._enabled(true, false);
      } else {
        self._timeline.insert(self, self._startTime - self._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.

      }
    }

    for (p in vars) {
      self.vars[p] = vars[p];
    }

    if (self._initted || immediate) {
      if (resetDuration) {
        self._initted = false;

        if (immediate) {
          self.render(0, true, true);
        }
      } else {
        if (self._gc) {
          self._enabled(true, false);
        }

        if (self._notifyPluginsOfEnabled && self._firstPT) {
          _TweenLite.default._onPluginEvent("_onDisable", self); //in case a plugin like MotionBlur must perform some cleanup tasks

        }

        if (self._time / self._duration > 0.998) {
          //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards.
          var prevTime = self._totalTime;
          self.render(0, true, false);
          self._initted = false;
          self.render(prevTime, true, false);
        } else {
          self._initted = false;

          self._init();

          if (self._time > 0 || immediate) {
            var inv = 1 / (1 - curRatio),
                pt = self._firstPT,
                endValue;

            while (pt) {
              endValue = pt.s + pt.c;
              pt.c *= inv;
              pt.s = endValue - pt.c;
              pt = pt._next;
            }
          }
        }
      }
    }

    return self;
  };

  p.render = function (time, suppressEvents, force) {
    if (!this._initted) if (this._duration === 0 && this.vars.repeat) {
      //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
      this.invalidate();
    }
    var self = this,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        prevTime = self._time,
        prevTotalTime = self._totalTime,
        prevCycle = self._cycle,
        duration = self._duration,
        prevRawPrevTime = self._rawPrevTime,
        isComplete,
        callback,
        pt,
        cycleDuration,
        r,
        type,
        pow,
        rawPrevTime,
        yoyoEase;

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = totalDur;
      self._cycle = self._repeat;

      if (self._yoyo && (self._cycle & 1) !== 0) {
        self._time = 0;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      } else {
        self._time = duration;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
      }

      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (self._initted || !self.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (self._startTime === self._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = self._cycle = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;

      if (prevTotalTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) if (self._initted || !self.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0) {
            force = true;
          }

          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!self._initted) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        force = true;
      }
    } else {
      self._totalTime = self._time = time;

      if (self._repeat !== 0) {
        cycleDuration = duration + self._repeatDelay;
        self._cycle = self._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (self._cycle !== 0) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
          self._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
        }
        self._time = self._totalTime - self._cycle * cycleDuration;
        if (self._yoyo) if ((self._cycle & 1) !== 0) {
          self._time = duration - self._time;
          yoyoEase = self._yoyoEase || self.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.

          if (yoyoEase) {
            if (!self._yoyoEase) {
              if (yoyoEase === true && !self._initted) {
                //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
                yoyoEase = self.vars.ease;
                self._yoyoEase = yoyoEase = !yoyoEase ? _TweenLite.default.defaultEase : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : typeof yoyoEase === "function" ? new _TweenLite.Ease(yoyoEase, self.vars.easeParams) : _TweenLite.Ease.map[yoyoEase] || _TweenLite.default.defaultEase;
              } else {
                self._yoyoEase = yoyoEase = yoyoEase === true ? self._ease : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : _TweenLite.Ease.map[yoyoEase];
              }
            }

            self.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - self._time) / duration) : 0;
          }
        }

        if (self._time > duration) {
          self._time = duration;
        } else if (self._time < 0) {
          self._time = 0;
        }
      }

      if (self._easeType && !yoyoEase) {
        r = self._time / duration;
        type = self._easeType;
        pow = self._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        self.ratio = type === 1 ? 1 - r : type === 2 ? r : self._time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else if (!yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      }
    }

    if (prevTime === self._time && !force && prevCycle === self._cycle) {
      if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        self._callback("onUpdate");
      }
      return;
    } else if (!self._initted) {
      self._init();

      if (!self._initted || self._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
        self._time = prevTime;
        self._totalTime = prevTotalTime;
        self._rawPrevTime = prevRawPrevTime;
        self._cycle = prevCycle;
        TweenLiteInternals.lazyTweens.push(self);
        self._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (self._time && !isComplete && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && this._ease._calcEnd && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }

    if (self._lazy !== false) {
      self._lazy = false;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
      self._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTotalTime === 0) {
      if (self._initted === 2 && time > 0) {
        self._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true

      }

      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (self.vars.onStart) if (self._totalTime !== 0 || duration === 0) if (!suppressEvents) {
        self._callback("onStart");
      }
    }

    pt = self._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (self._onUpdate) {
      if (time < 0) if (self._startAt && self._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (self._totalTime !== prevTotalTime || callback) {
        self._callback("onUpdate");
      }
    }

    if (self._cycle !== prevCycle) if (!suppressEvents) if (!self._gc) if (self.vars.onRepeat) {
      self._callback("onRepeat");
    }
    if (callback) if (!self._gc || force) {
      //check gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && self._startAt && !self._onUpdate && self._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }

      if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        self._rawPrevTime = 0;
      }
    }
  }; //---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------


  TweenMax.to = function (target, duration, vars) {
    return new TweenMax(target, duration, vars);
  };

  TweenMax.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenMax(target, duration, vars);
  };

  TweenMax.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenMax(target, duration, toVars);
  };

  TweenMax.staggerTo = TweenMax.allTo = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var a = [],
        staggerFunc = _distribute(vars.stagger || stagger),
        cycle = vars.cycle,
        fromCycle = (vars.startAt || _blankArray).cycle,
        l,
        copy,
        i,
        p;

    if (!_isArray(targets)) {
      if (typeof targets === "string") {
        targets = _TweenLite.default.selector(targets) || targets;
      }

      if (_isSelector(targets)) {
        targets = _slice(targets);
      }
    }

    targets = targets || [];
    l = targets.length - 1;

    for (i = 0; i <= l; i++) {
      copy = {};

      for (p in vars) {
        copy[p] = vars[p];
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      if (fromCycle) {
        fromCycle = copy.startAt = {};

        for (p in vars.startAt) {
          fromCycle[p] = vars.startAt[p];
        }

        _applyCycle(copy.startAt, targets, i);
      }

      copy.delay = staggerFunc(i, targets[i], targets) + (copy.delay || 0);

      if (i === l && onCompleteAll) {
        copy.onComplete = function () {
          if (vars.onComplete) {
            vars.onComplete.apply(vars.onCompleteScope || this, arguments);
          }

          onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
        };
      }

      a[i] = new TweenMax(targets[i], duration, copy);
    }

    return a;
  };

  TweenMax.staggerFrom = TweenMax.allFrom = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.staggerFromTo = TweenMax.allFromTo = function (targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenMax(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenMax.set = function (target, vars) {
    return new TweenMax(target, 0, vars);
  };

  TweenMax.isTweening = function (target) {
    return _TweenLite.default.getTweensOf(target, true).length > 0;
  };

  var _getChildrenOf = function _getChildrenOf(timeline, includeTimelines) {
    var a = [],
        cnt = 0,
        tween = timeline._first;

    while (tween) {
      if (tween instanceof _TweenLite.default) {
        a[cnt++] = tween;
      } else {
        if (includeTimelines) {
          a[cnt++] = tween;
        }

        a = a.concat(_getChildrenOf(tween, includeTimelines));
        cnt = a.length;
      }

      tween = tween._next;
    }

    return a;
  },
      getAllTweens = TweenMax.getAllTweens = function (includeTimelines) {
    return _getChildrenOf(_TweenLite.Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(_TweenLite.Animation._rootFramesTimeline, includeTimelines));
  };

  TweenMax.killAll = function (complete, tweens, delayedCalls, timelines) {
    if (tweens == null) {
      tweens = true;
    }

    if (delayedCalls == null) {
      delayedCalls = true;
    }

    var a = getAllTweens(timelines != false),
        l = a.length,
        allTrue = tweens && delayedCalls && timelines,
        isDC,
        tween,
        i;

    for (i = 0; i < l; i++) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        if (complete) {
          tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
        } else {
          tween._enabled(false, false);
        }
      }
    }
  };

  TweenMax.killChildTweensOf = function (parent, complete) {
    if (parent == null) {
      return;
    }

    var tl = TweenLiteInternals.tweenLookup,
        a,
        curParent,
        p,
        i,
        l;

    if (typeof parent === "string") {
      parent = _TweenLite.default.selector(parent) || parent;
    }

    if (_isSelector(parent)) {
      parent = _slice(parent);
    }

    if (_isArray(parent)) {
      i = parent.length;

      while (--i > -1) {
        TweenMax.killChildTweensOf(parent[i], complete);
      }

      return;
    }

    a = [];

    for (p in tl) {
      curParent = tl[p].target.parentNode;

      while (curParent) {
        if (curParent === parent) {
          a = a.concat(tl[p].tweens);
        }

        curParent = curParent.parentNode;
      }
    }

    l = a.length;

    for (i = 0; i < l; i++) {
      if (complete) {
        a[i].totalTime(a[i].totalDuration());
      }

      a[i]._enabled(false, false);
    }
  };

  var _changePause = function _changePause(pause, tweens, delayedCalls, timelines) {
    tweens = tweens !== false;
    delayedCalls = delayedCalls !== false;
    timelines = timelines !== false;
    var a = getAllTweens(timelines),
        allTrue = tweens && delayedCalls && timelines,
        i = a.length,
        isDC,
        tween;

    while (--i > -1) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        tween.paused(pause);
      }
    }
  };

  TweenMax.pauseAll = function (tweens, delayedCalls, timelines) {
    _changePause(true, tweens, delayedCalls, timelines);
  };

  TweenMax.resumeAll = function (tweens, delayedCalls, timelines) {
    _changePause(false, tweens, delayedCalls, timelines);
  };

  TweenMax.globalTimeScale = function (value) {
    var tl = _TweenLite.Animation._rootTimeline,
        t = _TweenLite.default.ticker.time;

    if (!arguments.length) {
      return tl._timeScale;
    }

    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl = _TweenLite.Animation._rootFramesTimeline;
    t = _TweenLite.default.ticker.frame;
    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl._timeScale = _TweenLite.Animation._rootTimeline._timeScale = value;
    return value;
  }; //---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this.duration() ? this._time / this._duration : this.ratio : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    var duration = this._duration,
        cycle = this._cycle,
        cycleDur = cycle * (duration + this._repeatDelay);

    if (value > duration) {
      value = duration;
    }

    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };

  p.duration = function (value) {
    if (!arguments.length) {
      return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
    }

    return _TweenLite.Animation.prototype.duration.call(this, value);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        //instead of Infinity, we use 999999999999 so that we can accommodate reverses
        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
        this._dirty = false;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1));
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  return TweenMax;
}, true);

var TweenMax = _TweenLite.globals.TweenMax;
exports.default = exports.TweenMax = TweenMax;
var TweenMaxBase = TweenMax;
exports.TweenMaxBase = TweenMaxBase;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/TimelineLite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimelineLite = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var TimelineLite = function TimelineLite(vars) {
    _TweenLite.SimpleTimeline.call(this, vars);

    var self = this,
        v = self.vars,
        val,
        p;
    self._labels = {};
    self.autoRemoveChildren = !!v.autoRemoveChildren;
    self.smoothChildTiming = !!v.smoothChildTiming;
    self._sortChildren = true;
    self._onUpdate = v.onUpdate;

    for (p in v) {
      val = v[p];
      if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
        v[p] = self._swapSelfInParams(val);
      }
    }

    if (_isArray(v.tweens)) {
      self.add(v.tweens, 0, v.align, v.stagger);
    }
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _internals = TimelineLite._internals = {},
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _copy = function _copy(vars) {
    var copy = {},
        p;

    for (p in vars) {
      copy[p] = vars[p];
    }

    return copy;
  },
      _applyCycle = function _applyCycle(vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }

    delete vars.cycle;
  },
      _pauseCallback = _internals.pauseCallback = function () {},
      _slice = function _slice(a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _defaultImmediateRender = function _defaultImmediateRender(tl, toVars, fromVars, defaultFalse) {
    //default to immediateRender:true unless otherwise set in toVars, fromVars or if defaultFalse is passed in as true
    var ir = "immediateRender";

    if (!(ir in toVars)) {
      toVars[ir] = !(fromVars && fromVars[ir] === false || defaultFalse);
    }

    return toVars;
  },
      //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  _distribute = function _distribute(v) {
    if (typeof v === "function") {
      return v;
    }

    var vars = _typeof(v) === "object" ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = vars.ease,
        from = vars.from || 0,
        base = vars.base || 0,
        cache = {},
        isFromKeyword = isNaN(from),
        axis = vars.axis,
        ratio = {
      center: 0.5,
      end: 1
    }[from] || 0;
    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrap;

      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];

        if (!wrap) {
          max = -Infinity;

          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {}

          wrap--;
        }

        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;

        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);

          if (d > max) {
            max = d;
          }

          if (d < min) {
            min = d;
          }
        }

        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }

      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  },
      p = TimelineLite.prototype = new _TweenLite.SimpleTimeline();

  TimelineLite.version = "2.1.3";
  TimelineLite.distribute = _distribute;
  p.constructor = TimelineLite;
  p.kill()._gc = p._forcingPlayhead = p._hasPause = false;
  /* might use later...
  //translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
  function localToGlobal(time, animation) {
  	while (animation) {
  		time = (time / animation._timeScale) + animation._startTime;
  		animation = animation.timeline;
  	}
  	return time;
  }
  	//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
  function globalToLocal(time, animation) {
  	var scale = 1;
  	time -= localToGlobal(0, animation);
  	while (animation) {
  		scale *= animation._timeScale;
  		animation = animation.timeline;
  	}
  	return time * scale;
  }
  */

  p.to = function (target, duration, vars, position) {
    var Engine = vars.repeat && _globals.TweenMax || _TweenLite.default;
    return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
  };

  p.from = function (target, duration, vars, position) {
    return this.add((vars.repeat && _globals.TweenMax || _TweenLite.default).from(target, duration, _defaultImmediateRender(this, vars)), position);
  };

  p.fromTo = function (target, duration, fromVars, toVars, position) {
    var Engine = toVars.repeat && _globals.TweenMax || _TweenLite.default;
    toVars = _defaultImmediateRender(this, toVars, fromVars);
    return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
  };

  p.staggerTo = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var tl = new TimelineLite({
      onComplete: onCompleteAll,
      onCompleteParams: onCompleteAllParams,
      callbackScope: onCompleteAllScope,
      smoothChildTiming: this.smoothChildTiming
    }),
        staggerFunc = _distribute(vars.stagger || stagger),
        startAt = vars.startAt,
        cycle = vars.cycle,
        copy,
        i;

    if (typeof targets === "string") {
      targets = _TweenLite.default.selector(targets) || targets;
    }

    targets = targets || [];

    if (_isSelector(targets)) {
      //if the targets object is a selector, translate it into an array.
      targets = _slice(targets);
    }

    for (i = 0; i < targets.length; i++) {
      copy = _copy(vars);

      if (startAt) {
        copy.startAt = _copy(startAt);

        if (startAt.cycle) {
          _applyCycle(copy.startAt, targets, i);
        }
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      tl.to(targets[i], duration, copy, staggerFunc(i, targets[i], targets));
    }

    return this.add(tl, position);
  };

  p.staggerFrom = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, vars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, toVars, fromVars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.call = function (callback, params, scope, position) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.set = function (target, vars, position) {
    return this.add(new _TweenLite.default(target, 0, _defaultImmediateRender(this, vars, null, true)), position);
  };

  TimelineLite.exportRoot = function (vars, ignoreDelayedCalls) {
    vars = vars || {};

    if (vars.smoothChildTiming == null) {
      vars.smoothChildTiming = true;
    }

    var tl = new TimelineLite(vars),
        root = tl._timeline,
        hasNegativeStart,
        time,
        tween,
        next;

    if (ignoreDelayedCalls == null) {
      ignoreDelayedCalls = true;
    }

    root._remove(tl, true);

    tl._startTime = 0;
    tl._rawPrevTime = tl._time = tl._totalTime = root._time;
    tween = root._first;

    while (tween) {
      next = tween._next;

      if (!ignoreDelayedCalls || !(tween instanceof _TweenLite.default && tween.target === tween.vars.onComplete)) {
        time = tween._startTime - tween._delay;

        if (time < 0) {
          hasNegativeStart = 1;
        }

        tl.add(tween, time);
      }

      tween = next;
    }

    root.add(tl, 0);

    if (hasNegativeStart) {
      //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
      tl.totalDuration();
    }

    return tl;
  };

  p.add = function (value, position, align, stagger) {
    var self = this,
        curTime,
        l,
        i,
        child,
        tl,
        beforeRawTime;

    if (typeof position !== "number") {
      position = self._parseTimeOrLabel(position, 0, true, value);
    }

    if (!(value instanceof _TweenLite.Animation)) {
      if (value instanceof Array || value && value.push && _isArray(value)) {
        align = align || "normal";
        stagger = stagger || 0;
        curTime = position;
        l = value.length;

        for (i = 0; i < l; i++) {
          if (_isArray(child = value[i])) {
            child = new TimelineLite({
              tweens: child
            });
          }

          self.add(child, curTime);

          if (typeof child !== "string" && typeof child !== "function") {
            if (align === "sequence") {
              curTime = child._startTime + child.totalDuration() / child._timeScale;
            } else if (align === "start") {
              child._startTime -= child.delay();
            }
          }

          curTime += stagger;
        }

        return self._uncache(true);
      } else if (typeof value === "string") {
        return self.addLabel(value, position);
      } else if (typeof value === "function") {
        value = _TweenLite.default.delayedCall(0, value);
      } else {
        throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
      }
    }

    _TweenLite.SimpleTimeline.prototype.add.call(self, value, position);

    if (value._time || !value._duration && value._initted) {
      //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      curTime = (self.rawTime() - value._startTime) * value._timeScale;

      if (!value._duration || Math.abs(Math.max(0, Math.min(value.totalDuration(), curTime))) - value._totalTime > 0.00001) {
        value.render(curTime, false, false);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


    if (self._gc || self._time === self._duration) if (!self._paused) if (self._duration < self.duration()) {
      //in case any of the ancestors had completed but should now be enabled...
      tl = self;
      beforeRawTime = tl.rawTime() > value._startTime; //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.

      while (tl._timeline) {
        if (beforeRawTime && tl._timeline.smoothChildTiming) {
          tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
        } else if (tl._gc) {
          tl._enabled(true, false);
        }

        tl = tl._timeline;
      }
    }
    return self;
  };

  p.remove = function (value) {
    if (value instanceof _TweenLite.Animation) {
      this._remove(value, false);

      var tl = value._timeline = value.vars.useFrames ? _TweenLite.Animation._rootFramesTimeline : _TweenLite.Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.

      value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale; //ensure that if it gets played again, the timing is correct.

      return this;
    } else if (value instanceof Array || value && value.push && _isArray(value)) {
      var i = value.length;

      while (--i > -1) {
        this.remove(value[i]);
      }

      return this;
    } else if (typeof value === "string") {
      return this.removeLabel(value);
    }

    return this.kill(null, value);
  };

  p._remove = function (tween, skipDisable) {
    _TweenLite.SimpleTimeline.prototype._remove.call(this, tween, skipDisable);

    var last = this._last;

    if (!last) {
      this._time = this._totalTime = this._duration = this._totalDuration = 0;
    } else if (this._time > this.duration()) {
      this._time = this._duration;
      this._totalTime = this._totalDuration;
    }

    return this;
  };

  p.append = function (value, offsetOrLabel) {
    return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
  };

  p.insert = p.insertMultiple = function (value, position, align, stagger) {
    return this.add(value, position || 0, align, stagger);
  };

  p.appendMultiple = function (tweens, offsetOrLabel, align, stagger) {
    return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
  };

  p.addLabel = function (label, position) {
    this._labels[label] = this._parseTimeOrLabel(position);
    return this;
  };

  p.addPause = function (position, callback, params, scope) {
    var t = _TweenLite.default.delayedCall(0, _pauseCallback, params, scope || this);

    t.vars.onComplete = t.vars.onReverseComplete = callback;
    t.data = "isPause";
    this._hasPause = true;
    return this.add(t, position);
  };

  p.removeLabel = function (label) {
    delete this._labels[label];
    return this;
  };

  p.getLabelTime = function (label) {
    return this._labels[label] != null ? this._labels[label] : -1;
  };

  p._parseTimeOrLabel = function (timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
    var clippedDuration, i; //if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().

    if (ignore instanceof _TweenLite.Animation && ignore.timeline === this) {
      this.remove(ignore);
    } else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
      i = ignore.length;

      while (--i > -1) {
        if (ignore[i] instanceof _TweenLite.Animation && ignore[i].timeline === this) {
          this.remove(ignore[i]);
        }
      }
    }

    clippedDuration = typeof timeOrLabel === "number" && !offsetOrLabel ? 0 : this.duration() > 99999999999 ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.

    if (typeof offsetOrLabel === "string") {
      return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && typeof timeOrLabel === "number" && this._labels[offsetOrLabel] == null ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
    }

    offsetOrLabel = offsetOrLabel || 0;

    if (typeof timeOrLabel === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      i = timeOrLabel.indexOf("=");

      if (i === -1) {
        if (this._labels[timeOrLabel] == null) {
          return appendIfAbsent ? this._labels[timeOrLabel] = clippedDuration + offsetOrLabel : offsetOrLabel;
        }

        return this._labels[timeOrLabel] + offsetOrLabel;
      }

      offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
      timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : clippedDuration;
    } else if (timeOrLabel == null) {
      timeOrLabel = clippedDuration;
    }

    return Number(timeOrLabel) + offsetOrLabel;
  };

  p.seek = function (position, suppressEvents) {
    return this.totalTime(typeof position === "number" ? position : this._parseTimeOrLabel(position), suppressEvents !== false);
  };

  p.stop = function () {
    return this.paused(true);
  };

  p.gotoAndPlay = function (position, suppressEvents) {
    return this.play(position, suppressEvents);
  };

  p.gotoAndStop = function (position, suppressEvents) {
    return this.pause(position, suppressEvents);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var self = this,
        prevTime = self._time,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        prevStart = self._startTime,
        prevTimeScale = self._timeScale,
        prevPaused = self._paused,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        pauseTween,
        curTime,
        pauseTime;

    if (prevTime !== self._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += self._time - prevTime;
    }

    if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
      if (time > prevTime) {
        tween = self._first;

        while (tween && tween._startTime <= time && !pauseTween) {
          if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
            pauseTween = tween;
          }
          tween = tween._next;
        }
      } else {
        tween = self._last;

        while (tween && tween._startTime >= time && !pauseTween) {
          if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
            pauseTween = tween;
          }
          tween = tween._prev;
        }
      }

      if (pauseTween) {
        self._time = self._totalTime = time = pauseTween._startTime;
        pauseTime = self._startTime + (self._reversed ? self._duration - time : time) / self._timeScale;
      }
    }

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = self._time = totalDur;
      if (!self._reversed) if (!self._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (self._duration === 0) if (time <= 0 && time >= -_tinyNum || self._rawPrevTime < 0 || self._rawPrevTime === _tinyNum) if (self._rawPrevTime !== time && self._first) {
          internalForce = true;

          if (self._rawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = 0;

      if (time > -_tinyNum) {
        time = 0;
      }

      if (prevTime !== 0 || self._duration === 0 && self._rawPrevTime !== _tinyNum && (self._rawPrevTime > 0 || time < 0 && self._rawPrevTime >= 0)) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time < 0) {
        self._active = false;

        if (self._timeline.autoRemoveChildren && self._reversed) {
          //ensures proper GC if a timeline is resumed after it's finished reversing.
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (self._rawPrevTime >= 0 && self._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = self._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      self._totalTime = self._time = self._rawPrevTime = time;
    }

    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      return;
    } else if (!self._initted) {
      self._initted = true;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time > 0) {
      self._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTime === 0) if (self.vars.onStart) if (self._time !== 0 || !self._duration) if (!suppressEvents) {
      self._callback("onStart");
    }
    curTime = self._time;

    if (curTime >= prevTime) {
      tween = self._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = self._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (self._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      self._callback("onUpdate");
    }
    if (callback) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (self._time === 0 || totalDur >= self.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }
    }
  };

  p._hasPausedChild = function () {
    var tween = this._first;

    while (tween) {
      if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) {
        return true;
      }

      tween = tween._next;
    }

    return false;
  };

  p.getChildren = function (nested, tweens, timelines, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || -9999999999;
    var a = [],
        tween = this._first,
        cnt = 0;

    while (tween) {
      if (tween._startTime < ignoreBeforeTime) {//do nothing
      } else if (tween instanceof _TweenLite.default) {
        if (tweens !== false) {
          a[cnt++] = tween;
        }
      } else {
        if (timelines !== false) {
          a[cnt++] = tween;
        }

        if (nested !== false) {
          a = a.concat(tween.getChildren(true, tweens, timelines));
          cnt = a.length;
        }
      }

      tween = tween._next;
    }

    return a;
  };

  p.getTweensOf = function (target, nested) {
    var disabled = this._gc,
        a = [],
        cnt = 0,
        tweens,
        i;

    if (disabled) {
      this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.

    }

    tweens = _TweenLite.default.getTweensOf(target);
    i = tweens.length;

    while (--i > -1) {
      if (tweens[i].timeline === this || nested && this._contains(tweens[i])) {
        a[cnt++] = tweens[i];
      }
    }

    if (disabled) {
      this._enabled(false, true);
    }

    return a;
  };

  p.recent = function () {
    return this._recent;
  };

  p._contains = function (tween) {
    var tl = tween.timeline;

    while (tl) {
      if (tl === this) {
        return true;
      }

      tl = tl.timeline;
    }

    return false;
  };

  p.shiftChildren = function (amount, adjustLabels, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || 0;
    var tween = this._first,
        labels = this._labels,
        p;

    while (tween) {
      if (tween._startTime >= ignoreBeforeTime) {
        tween._startTime += amount;
      }

      tween = tween._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return this._uncache(true);
  };

  p._kill = function (vars, target) {
    if (!vars && !target) {
      return this._enabled(false, false);
    }

    var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target),
        i = tweens.length,
        changed = false;

    while (--i > -1) {
      if (tweens[i]._kill(vars, target)) {
        changed = true;
      }
    }

    return changed;
  };

  p.clear = function (labels) {
    var tweens = this.getChildren(false, true, true),
        i = tweens.length;
    this._time = this._totalTime = 0;

    while (--i > -1) {
      tweens[i]._enabled(false, false);
    }

    if (labels !== false) {
      this._labels = {};
    }

    return this._uncache(true);
  };

  p.invalidate = function () {
    var tween = this._first;

    while (tween) {
      tween.invalidate();
      tween = tween._next;
    }

    return _TweenLite.Animation.prototype.invalidate.call(this);
    ;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (enabled === this._gc) {
      var tween = this._first;

      while (tween) {
        tween._enabled(enabled, true);

        tween = tween._next;
      }
    }

    return _TweenLite.SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    this._forcingPlayhead = true;

    var val = _TweenLite.Animation.prototype.totalTime.apply(this, arguments);

    this._forcingPlayhead = false;
    return val;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        this.totalDuration(); //just triggers recalculation
      }

      return this._duration;
    }

    if (this.duration() !== 0 && value !== 0) {
      this.timeScale(this._duration / value);
    }

    return this;
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        var max = 0,
            self = this,
            tween = self._last,
            prevStart = 999999999999,
            prev,
            end;

        while (tween) {
          prev = tween._prev; //record it here in case the tween changes position in the sequence...

          if (tween._dirty) {
            tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
          }

          if (tween._startTime > prevStart && self._sortChildren && !tween._paused && !self._calculatingDuration) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            self._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().

            self.add(tween, tween._startTime - tween._delay);
            self._calculatingDuration = 0;
          } else {
            prevStart = tween._startTime;
          }

          if (tween._startTime < 0 && !tween._paused) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= tween._startTime;

            if (self._timeline.smoothChildTiming) {
              self._startTime += tween._startTime / self._timeScale;
              self._time -= tween._startTime;
              self._totalTime -= tween._startTime;
              self._rawPrevTime -= tween._startTime;
            }

            self.shiftChildren(-tween._startTime, false, -9999999999);
            prevStart = 0;
          }

          end = tween._startTime + tween._totalDuration / tween._timeScale;

          if (end > max) {
            max = end;
          }

          tween = prev;
        }

        self._duration = self._totalDuration = max;
        self._dirty = false;
      }

      return this._totalDuration;
    }

    return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
  };

  p.paused = function (value) {
    if (value === false && this._paused) {
      //if there's a pause directly at the spot from where we're unpausing, skip it.
      var tween = this._first;

      while (tween) {
        if (tween._startTime === this._time && tween.data === "isPause") {
          tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
        }

        tween = tween._next;
      }
    }

    return _TweenLite.Animation.prototype.paused.apply(this, arguments);
  };

  p.usesFrames = function () {
    var tl = this._timeline;

    while (tl._timeline) {
      tl = tl._timeline;
    }

    return tl === _TweenLite.Animation._rootFramesTimeline;
  };

  p.rawTime = function (wrapRepeats) {
    return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
  };

  return TimelineLite;
}, true);

var TimelineLite = _TweenLite.globals.TimelineLite;
exports.default = exports.TimelineLite = TimelineLite;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/TimelineMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
exports.default = exports.TimelineMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
_TweenLite._gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function () {
  var TimelineMax = function TimelineMax(vars) {
    _TimelineLite.default.call(this, vars);

    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._cycle = 0;
    this._yoyo = !!this.vars.yoyo;
    this._dirty = true;
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _easeNone = new _TweenLite.Ease(null, null, 1, 0),
      p = TimelineMax.prototype = new _TimelineLite.default();

  p.constructor = TimelineMax;
  p.kill()._gc = false;
  TimelineMax.version = "2.1.3";

  p.invalidate = function () {
    this._yoyo = !!this.vars.yoyo;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    this._uncache(true);

    return _TimelineLite.default.prototype.invalidate.call(this);
  };

  p.addCallback = function (callback, position, params, scope) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.removeCallback = function (callback, position) {
    if (callback) {
      if (position == null) {
        this._kill(null, callback);
      } else {
        var a = this.getTweensOf(callback, false),
            i = a.length,
            time = this._parseTimeOrLabel(position);

        while (--i > -1) {
          if (a[i]._startTime === time) {
            a[i]._enabled(false, false);
          }
        }
      }
    }

    return this;
  };

  p.removePause = function (position) {
    return this.removeCallback(_TimelineLite.default._internals.pauseCallback, position);
  };

  p.tweenTo = function (position, vars) {
    vars = vars || {};
    var copy = {
      ease: _easeNone,
      useFrames: this.usesFrames(),
      immediateRender: false,
      lazy: false
    },
        Engine = vars.repeat && _globals.TweenMax || _TweenLite.default,
        duration,
        p,
        t;

    for (p in vars) {
      copy[p] = vars[p];
    }

    copy.time = this._parseTimeOrLabel(position);
    duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || 0.001;
    t = new Engine(this, duration, copy);

    copy.onStart = function () {
      t.target.paused(true);

      if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) {
        //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
        t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
      }

      if (vars.onStart) {
        //in case the user had an onStart in the vars - we don't want to overwrite it.
        vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
      }
    };

    return t;
  };

  p.tweenFromTo = function (fromPosition, toPosition, vars) {
    vars = vars || {};
    fromPosition = this._parseTimeOrLabel(fromPosition);
    vars.startAt = {
      onComplete: this.seek,
      onCompleteParams: [fromPosition],
      callbackScope: this
    };
    vars.immediateRender = vars.immediateRender !== false;
    var t = this.tweenTo(toPosition, vars);
    t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)

    return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || 0.001);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var self = this,
        prevTime = self._time,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        dur = self._duration,
        prevTotalTime = self._totalTime,
        prevStart = self._startTime,
        prevTimeScale = self._timeScale,
        prevRawPrevTime = self._rawPrevTime,
        prevPaused = self._paused,
        prevCycle = self._cycle,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        cycleDuration,
        pauseTween,
        curTime,
        pauseTime;

    if (prevTime !== self._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += self._time - prevTime;
    }

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      if (!self._locked) {
        self._totalTime = totalDur;
        self._cycle = self._repeat;
      }

      if (!self._reversed) if (!self._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (self._duration === 0) if (time <= 0 && time >= -_tinyNum || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && self._first) {
          internalForce = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      if (self._yoyo && self._cycle & 1) {
        self._time = time = 0;
      } else {
        self._time = dur;
        time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      if (!self._locked) {
        self._totalTime = self._cycle = 0;
      }

      self._time = 0;

      if (time > -_tinyNum) {
        time = 0;
      }

      if (prevTime !== 0 || dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !self._locked) {
        //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time < 0) {
        self._active = false;

        if (self._timeline.autoRemoveChildren && self._reversed) {
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (prevRawPrevTime >= 0 && self._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = dur || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = self._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      if (dur === 0 && prevRawPrevTime < 0) {
        //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
        internalForce = true;
      }

      self._time = self._rawPrevTime = time;

      if (!self._locked) {
        self._totalTime = time;

        if (self._repeat !== 0) {
          cycleDuration = dur + self._repeatDelay;
          self._cycle = self._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)

          if (self._cycle) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
            self._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
          }
          self._time = self._totalTime - self._cycle * cycleDuration;
          if (self._yoyo) if (self._cycle & 1) {
            self._time = dur - self._time;
          }

          if (self._time > dur) {
            self._time = dur;
            time = dur + 0.0001; //to avoid occasional floating point rounding error
          } else if (self._time < 0) {
            self._time = time = 0;
          } else {
            time = self._time;
          }
        }
      }
    }

    if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
      time = self._time;

      if (time > prevTime || self._repeat && prevCycle !== self._cycle) {
        tween = self._first;

        while (tween && tween._startTime <= time && !pauseTween) {
          if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
            pauseTween = tween;
          }
          tween = tween._next;
        }
      } else {
        tween = self._last;

        while (tween && tween._startTime >= time && !pauseTween) {
          if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
            pauseTween = tween;
          }
          tween = tween._prev;
        }
      }

      if (pauseTween) {
        pauseTime = self._startTime + (self._reversed ? self._duration - pauseTween._startTime : pauseTween._startTime) / self._timeScale;

        if (pauseTween._startTime < dur) {
          self._time = self._rawPrevTime = time = pauseTween._startTime;
          self._totalTime = time + self._cycle * (self._totalDuration + self._repeatDelay);
        }
      }
    }

    if (self._cycle !== prevCycle) if (!self._locked) {
      /*
      make sure children at the end/beginning of the timeline are rendered properly. If, for example,
      a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
      would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
      could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
      we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
      ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
      */
      var backwards = self._yoyo && (prevCycle & 1) !== 0,
          wrap = backwards === (self._yoyo && (self._cycle & 1) !== 0),
          recTotalTime = self._totalTime,
          recCycle = self._cycle,
          recRawPrevTime = self._rawPrevTime,
          recTime = self._time;
      self._totalTime = prevCycle * dur;

      if (self._cycle < prevCycle) {
        backwards = !backwards;
      } else {
        self._totalTime += dur;
      }

      self._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

      self._rawPrevTime = dur === 0 ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
      self._cycle = prevCycle;
      self._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()

      prevTime = backwards ? 0 : dur;
      self.render(prevTime, suppressEvents, dur === 0);
      if (!suppressEvents) if (!self._gc) {
        if (self.vars.onRepeat) {
          self._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.

          self._locked = false;

          self._callback("onRepeat");
        }
      }

      if (prevTime !== self._time) {
        //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
        return;
      }

      if (wrap) {
        self._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.

        self._locked = true;
        prevTime = backwards ? dur + 0.0001 : -0.0001;
        self.render(prevTime, true, false);
      }

      self._locked = false;

      if (self._paused && !prevPaused) {
        //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
        return;
      }

      self._time = recTime;
      self._totalTime = recTotalTime;
      self._cycle = recCycle;
      self._rawPrevTime = recRawPrevTime;
    }

    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        self._callback("onUpdate");
      }
      return;
    } else if (!self._initted) {
      self._initted = true;
    }

    if (!self._active) if (!self._paused && self._totalTime !== prevTotalTime && time > 0) {
      self._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTotalTime === 0) if (self.vars.onStart) if (self._totalTime !== 0 || !self._totalDuration) if (!suppressEvents) {
      self._callback("onStart");
    }
    curTime = self._time;

    if (curTime >= prevTime) {
      tween = self._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= self._time && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = self._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (self._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      self._callback("onUpdate");
    }
    if (callback) if (!self._locked) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (self._time === 0 || totalDur >= self.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }
    }
  };

  p.getActive = function (nested, tweens, timelines) {
    var a = [],
        all = this.getChildren(nested || nested == null, tweens || nested == null, !!timelines),
        cnt = 0,
        l = all.length,
        i,
        tween;

    for (i = 0; i < l; i++) {
      tween = all[i];

      if (tween.isActive()) {
        a[cnt++] = tween;
      }
    }

    return a;
  };

  p.getLabelAfter = function (time) {
    if (!time) if (time !== 0) {
      //faster than isNan()
      time = this._time;
    }
    var labels = this.getLabelsArray(),
        l = labels.length,
        i;

    for (i = 0; i < l; i++) {
      if (labels[i].time > time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelBefore = function (time) {
    if (time == null) {
      time = this._time;
    }

    var labels = this.getLabelsArray(),
        i = labels.length;

    while (--i > -1) {
      if (labels[i].time < time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelsArray = function () {
    var a = [],
        cnt = 0,
        p;

    for (p in this._labels) {
      a[cnt++] = {
        time: this._labels[p],
        name: p
      };
    }

    a.sort(function (a, b) {
      return a.time - b.time;
    });
    return a;
  };

  p.invalidate = function () {
    this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat

    return _TimelineLite.default.prototype.invalidate.call(this);
  }; //---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() || 0 : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() || 0 : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        _TimelineLite.default.prototype.totalDuration.call(this); //just forces refresh
        //Instead of Infinity, we use 999999999999 so that we can accommodate reverses.


        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 || !value ? this : this.timeScale(this.totalDuration() / value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    var duration = this._duration,
        cycle = this._cycle,
        cycleDur = cycle * (duration + this._repeatDelay);

    if (value > duration) {
      value = duration;
    }

    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  p.currentLabel = function (value) {
    if (!arguments.length) {
      return this.getLabelBefore(this._time + _tinyNum);
    }

    return this.seek(value, true);
  };

  return TimelineMax;
}, true);

var TimelineMax = _TweenLite.globals.TimelineMax;
exports.default = exports.TimelineMax = TimelineMax;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./TimelineLite.js":"../node_modules/gsap/TimelineLite.js"}],"../node_modules/gsap/AttrPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AttrPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
var AttrPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "attr",
  API: 2,
  version: "0.6.1",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    var p, end;

    if (typeof target.setAttribute !== "function") {
      return false;
    }

    for (p in value) {
      end = value[p];

      if (typeof end === "function") {
        end = end(index, target);
      }

      this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);

      this._overwriteProps.push(p);
    }

    return true;
  }
});

exports.default = exports.AttrPlugin = AttrPlugin;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/BezierPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BezierPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.3.9
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
var _RAD2DEG = 180 / Math.PI,
    _r1 = [],
    _r2 = [],
    _r3 = [],
    _corProps = {},
    _globals = _TweenLite._gsScope._gsDefine.globals,
    Segment = function Segment(a, b, c, d) {
  if (c === d) {
    //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
    c = d - (d - b) / 1000000;
  }

  if (a === b) {
    //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
    b = a + (c - a) / 1000000;
  }

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.da = d - a;
  this.ca = c - a;
  this.ba = b - a;
},
    _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
    cubicToQuadratic = function cubicToQuadratic(a, b, c, d) {
  var q1 = {
    a: a
  },
      q2 = {},
      q3 = {},
      q4 = {
    c: d
  },
      mab = (a + b) / 2,
      mbc = (b + c) / 2,
      mcd = (c + d) / 2,
      mabc = (mab + mbc) / 2,
      mbcd = (mbc + mcd) / 2,
      m8 = (mbcd - mabc) / 8;
  q1.b = mab + (a - mab) / 4;
  q2.b = mabc + m8;
  q1.c = q2.a = (q1.b + q2.b) / 2;
  q2.c = q3.a = (mabc + mbcd) / 2;
  q3.b = mbcd - m8;
  q4.b = mcd + (d - mcd) / 4;
  q3.c = q4.a = (q3.b + q4.b) / 2;
  return [q1, q2, q3, q4];
},
    _calculateControlPoints = function _calculateControlPoints(a, curviness, quad, basic, correlate) {
  var l = a.length - 1,
      ii = 0,
      cp1 = a[0].a,
      i,
      p1,
      p2,
      p3,
      seg,
      m1,
      m2,
      mm,
      cp2,
      qb,
      r1,
      r2,
      tl;

  for (i = 0; i < l; i++) {
    seg = a[ii];
    p1 = seg.a;
    p2 = seg.d;
    p3 = a[ii + 1].d;

    if (correlate) {
      r1 = _r1[i];
      r2 = _r2[i];
      tl = (r2 + r1) * curviness * 0.25 / (basic ? 0.5 : _r3[i] || 0.5);
      m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : r1 !== 0 ? tl / r1 : 0);
      m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : r2 !== 0 ? tl / r2 : 0);
      mm = p2 - (m1 + ((m2 - m1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    } else {
      m1 = p2 - (p2 - p1) * curviness * 0.5;
      m2 = p2 + (p3 - p2) * curviness * 0.5;
      mm = p2 - (m1 + m2) / 2;
    }

    m1 += mm;
    m2 += mm;
    seg.c = cp2 = m1;

    if (i !== 0) {
      seg.b = cp1;
    } else {
      seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
    }

    seg.da = p2 - p1;
    seg.ca = cp2 - p1;
    seg.ba = cp1 - p1;

    if (quad) {
      qb = cubicToQuadratic(p1, cp1, cp2, p2);
      a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
      ii += 4;
    } else {
      ii++;
    }

    cp1 = m2;
  }

  seg = a[ii];
  seg.b = cp1;
  seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.

  seg.da = seg.d - seg.a;
  seg.ca = seg.c - seg.a;
  seg.ba = cp1 - seg.a;

  if (quad) {
    qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
  }
},
    _parseAnchors = function _parseAnchors(values, p, correlate, prepend) {
  var a = [],
      l,
      i,
      p1,
      p2,
      p3,
      tmp;

  if (prepend) {
    values = [prepend].concat(values);
    i = values.length;

    while (--i > -1) {
      if (typeof (tmp = values[i][p]) === "string") if (tmp.charAt(1) === "=") {
        values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
      }
    }
  }

  l = values.length - 2;

  if (l < 0) {
    a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
    return a;
  }

  for (i = 0; i < l; i++) {
    p1 = values[i][p];
    p2 = values[i + 1][p];
    a[i] = new Segment(p1, 0, 0, p2);

    if (correlate) {
      p3 = values[i + 2][p];
      _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
      _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
    }
  }

  a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
  return a;
},
    bezierThrough = function bezierThrough(values, curviness, quadratic, basic, correlate, prepend) {
  var obj = {},
      props = [],
      first = prepend || values[0],
      i,
      p,
      a,
      j,
      r,
      l,
      seamless,
      last;
  correlate = typeof correlate === "string" ? "," + correlate + "," : _correlate;

  if (curviness == null) {
    curviness = 1;
  }

  for (p in values[0]) {
    props.push(p);
  } //check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)


  if (values.length > 1) {
    last = values[values.length - 1];
    seamless = true;
    i = props.length;

    while (--i > -1) {
      p = props[i];

      if (Math.abs(first[p] - last[p]) > 0.05) {
        //build in a tolerance of +/-0.05 to accommodate rounding errors.
        seamless = false;
        break;
      }
    }

    if (seamless) {
      values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens

      if (prepend) {
        values.unshift(prepend);
      }

      values.push(values[1]);
      prepend = values[values.length - 3];
    }
  }

  _r1.length = _r2.length = _r3.length = 0;
  i = props.length;

  while (--i > -1) {
    p = props[i];
    _corProps[p] = correlate.indexOf("," + p + ",") !== -1;
    obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
  }

  i = _r1.length;

  while (--i > -1) {
    _r1[i] = Math.sqrt(_r1[i]);
    _r2[i] = Math.sqrt(_r2[i]);
  }

  if (!basic) {
    i = props.length;

    while (--i > -1) {
      if (_corProps[p]) {
        a = obj[props[i]];
        l = a.length - 1;

        for (j = 0; j < l; j++) {
          r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0;
          _r3[j] = (_r3[j] || 0) + r * r;
        }
      }
    }

    i = _r3.length;

    while (--i > -1) {
      _r3[i] = Math.sqrt(_r3[i]);
    }
  }

  i = props.length;
  j = quadratic ? 4 : 1;

  while (--i > -1) {
    p = props[i];
    a = obj[p];

    _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties


    if (seamless) {
      a.splice(0, j);
      a.splice(a.length - j, j);
    }
  }

  return obj;
},
    _parseBezierData = function _parseBezierData(values, type, prepend) {
  type = type || "soft";
  var obj = {},
      inc = type === "cubic" ? 3 : 2,
      soft = type === "soft",
      props = [],
      a,
      b,
      c,
      d,
      cur,
      i,
      j,
      l,
      p,
      cnt,
      tmp;

  if (soft && prepend) {
    values = [prepend].concat(values);
  }

  if (values == null || values.length < inc + 1) {
    throw "invalid Bezier data";
  }

  for (p in values[0]) {
    props.push(p);
  }

  i = props.length;

  while (--i > -1) {
    p = props[i];
    obj[p] = cur = [];
    cnt = 0;
    l = values.length;

    for (j = 0; j < l; j++) {
      a = prepend == null ? values[j][p] : typeof (tmp = values[j][p]) === "string" && tmp.charAt(1) === "=" ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
      if (soft) if (j > 1) if (j < l - 1) {
        cur[cnt++] = (a + cur[cnt - 2]) / 2;
      }
      cur[cnt++] = a;
    }

    l = cnt - inc + 1;
    cnt = 0;

    for (j = 0; j < l; j += inc) {
      a = cur[j];
      b = cur[j + 1];
      c = cur[j + 2];
      d = inc === 2 ? 0 : cur[j + 3];
      cur[cnt++] = tmp = inc === 3 ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
    }

    cur.length = cnt;
  }

  return obj;
},
    _addCubicLengths = function _addCubicLengths(a, steps, resolution) {
  var inc = 1 / resolution,
      j = a.length,
      d,
      d1,
      s,
      da,
      ca,
      ba,
      p,
      i,
      inv,
      bez,
      index;

  while (--j > -1) {
    bez = a[j];
    s = bez.a;
    da = bez.d - s;
    ca = bez.c - s;
    ba = bez.b - s;
    d = d1 = 0;

    for (i = 1; i <= resolution; i++) {
      p = inc * i;
      inv = 1 - p;
      d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
      index = j * resolution + i - 1;
      steps[index] = (steps[index] || 0) + d * d;
    }
  }
},
    _parseLengthData = function _parseLengthData(obj, resolution) {
  resolution = resolution >> 0 || 6;
  var a = [],
      lengths = [],
      d = 0,
      total = 0,
      threshold = resolution - 1,
      segments = [],
      curLS = [],
      //current length segments array
  p,
      i,
      l,
      index;

  for (p in obj) {
    _addCubicLengths(obj[p], a, resolution);
  }

  l = a.length;

  for (i = 0; i < l; i++) {
    d += Math.sqrt(a[i]);
    index = i % resolution;
    curLS[index] = d;

    if (index === threshold) {
      total += d;
      index = i / resolution >> 0;
      segments[index] = curLS;
      lengths[index] = total;
      d = 0;
      curLS = [];
    }
  }

  return {
    length: total,
    lengths: lengths,
    segments: segments
  };
},
    BezierPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "bezier",
  priority: -1,
  version: "1.3.9",
  API: 2,
  global: true,
  //gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, vars, tween) {
    this._target = target;

    if (vars instanceof Array) {
      vars = {
        values: vars
      };
    }

    this._func = {};
    this._mod = {};
    this._props = [];
    this._timeRes = vars.timeResolution == null ? 6 : parseInt(vars.timeResolution, 10);
    var values = vars.values || [],
        first = {},
        second = values[0],
        autoRotate = vars.autoRotate || tween.vars.orientToBezier,
        p,
        isFunc,
        i,
        j,
        prepend;
    this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [["x", "y", "rotation", autoRotate === true ? 0 : Number(autoRotate) || 0]] : null;

    for (p in second) {
      this._props.push(p);
    }

    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];

      this._overwriteProps.push(p);

      isFunc = this._func[p] = typeof target[p] === "function";
      first[p] = !isFunc ? parseFloat(target[p]) : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]();
      if (!prepend) if (first[p] !== values[0][p]) {
        prepend = first;
      }
    }

    this._beziers = vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft" ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, vars.type === "thruBasic", vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
    this._segCount = this._beziers[p].length;

    if (this._timeRes) {
      var ld = _parseLengthData(this._beziers, this._timeRes);

      this._length = ld.length;
      this._lengths = ld.lengths;
      this._segments = ld.segments;
      this._l1 = this._li = this._s1 = this._si = 0;
      this._l2 = this._lengths[0];
      this._curSeg = this._segments[0];
      this._s2 = this._curSeg[0];
      this._prec = 1 / this._curSeg.length;
    }

    if (autoRotate = this._autoRotate) {
      this._initialRotations = [];

      if (!(autoRotate[0] instanceof Array)) {
        this._autoRotate = autoRotate = [autoRotate];
      }

      i = autoRotate.length;

      while (--i > -1) {
        for (j = 0; j < 3; j++) {
          p = autoRotate[i][j];
          this._func[p] = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)] : false;
        }

        p = autoRotate[i][2];
        this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;

        this._overwriteProps.push(p);
      }
    }

    this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(v) {
    var segments = this._segCount,
        func = this._func,
        target = this._target,
        notStart = v !== this._startRatio,
        curIndex,
        inv,
        i,
        p,
        b,
        t,
        val,
        l,
        lengths,
        curSeg,
        v1;

    if (!this._timeRes) {
      curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0;
      t = (v - curIndex * (1 / segments)) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      v1 = v * this._length;
      i = this._li; //find the appropriate segment (if the currently cached one isn't correct)

      if (v1 > this._l2 && i < segments - 1) {
        l = segments - 1;

        while (i < l && (this._l2 = lengths[++i]) <= v1) {}

        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[this._s1 = this._si = 0];
      } else if (v1 < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= v1) {}

        if (i === 0 && v1 < this._l1) {
          this._l1 = 0;
        } else {
          i++;
        }

        this._l2 = lengths[i];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
        this._s2 = curSeg[this._si];
      }

      curIndex = i; //now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)

      v1 -= this._l1;
      i = this._si;

      if (v1 > this._s2 && i < curSeg.length - 1) {
        l = curSeg.length - 1;

        while (i < l && (this._s2 = curSeg[++i]) <= v1) {}

        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (v1 < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= v1) {}

        if (i === 0 && v1 < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }

        this._s2 = curSeg[i];
        this._si = i;
      }

      t = v === 1 ? 1 : (i + (v1 - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
    }

    inv = 1 - t;
    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];
      b = this._beziers[p][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;

      if (this._mod[p]) {
        val = this._mod[p](val, target);
      }

      if (func[p]) {
        target[p](val);
      } else {
        target[p] = val;
      }
    }

    if (this._autoRotate) {
      var ar = this._autoRotate,
          b2,
          x1,
          y1,
          x2,
          y2,
          add,
          conv;
      i = ar.length;

      while (--i > -1) {
        p = ar[i][2];
        add = ar[i][3] || 0;
        conv = ar[i][4] === true ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];

        if (b && b2) {
          //in case one of the properties got overwritten.
          b = b[curIndex];
          b2 = b2[curIndex];
          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += (b.c + (b.d - b.c) * t - x2) * t;
          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
          val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

          if (this._mod[p]) {
            val = this._mod[p](val, target); //for modProps
          }

          if (func[p]) {
            target[p](val);
          } else {
            target[p] = val;
          }
        }
      }
    }
  }
}),
    p = BezierPlugin.prototype;

exports.default = exports.BezierPlugin = BezierPlugin;
BezierPlugin.bezierThrough = bezierThrough;
BezierPlugin.cubicToQuadratic = cubicToQuadratic;
BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite

BezierPlugin.quadraticToCubic = function (a, b, c) {
  return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};

BezierPlugin._cssRegister = function () {
  var CSSPlugin = _globals.CSSPlugin;

  if (!CSSPlugin) {
    return;
  }

  var _internals = CSSPlugin._internals,
      _parseToProxy = _internals._parseToProxy,
      _setPluginRatio = _internals._setPluginRatio,
      CSSPropTween = _internals.CSSPropTween;

  _internals._registerComplexSpecialProp("bezier", {
    parser: function parser(t, e, prop, cssp, pt, plugin) {
      if (e instanceof Array) {
        e = {
          values: e
        };
      }

      plugin = new BezierPlugin();
      var values = e.values,
          l = values.length - 1,
          pluginValues = [],
          v = {},
          i,
          p,
          data;

      if (l < 0) {
        return pt;
      }

      for (i = 0; i <= l; i++) {
        data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i);
        pluginValues[i] = data.end;
      }

      for (p in e) {
        v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
      }

      v.values = pluginValues;
      pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
      pt.data = data;
      pt.plugin = plugin;
      pt.setRatio = _setPluginRatio;

      if (v.autoRotate === 0) {
        v.autoRotate = true;
      }

      if (v.autoRotate && !(v.autoRotate instanceof Array)) {
        i = v.autoRotate === true ? 0 : Number(v.autoRotate);
        v.autoRotate = data.end.left != null ? [["left", "top", "rotation", i, false]] : data.end.x != null ? [["x", "y", "rotation", i, false]] : false;
      }

      if (v.autoRotate) {
        if (!cssp._transform) {
          cssp._enableTransforms(false);
        }

        data.autoRotate = cssp._target._gsTransform;
        data.proxy.rotation = data.autoRotate.rotation || 0;

        cssp._overwriteProps.push("rotation");
      }

      plugin._onInitTween(data.proxy, v, cssp._tween);

      return pt;
    }
  });
};

p._mod = function (lookup) {
  var op = this._overwriteProps,
      i = op.length,
      val;

  while (--i > -1) {
    val = lookup[op[i]];

    if (val && typeof val === "function") {
      this._mod[op[i]] = val;
    }
  }
};

p._kill = function (lookup) {
  var a = this._props,
      p,
      i;

  for (p in this._beziers) {
    if (p in lookup) {
      delete this._beziers[p];
      delete this._func[p];
      i = a.length;

      while (--i > -1) {
        if (a[i] === p) {
          a.splice(i, 1);
        }
      }
    }
  }

  a = this._autoRotate;

  if (a) {
    i = a.length;

    while (--i > -1) {
      if (lookup[a[i][2]]) {
        a.splice(i, 1);
      }
    }
  }

  return this._super._kill.call(this, lookup);
};
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/ColorPropsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColorPropsPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.5.3
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
var _numExp = /(\d|\.)+/g,
    _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
    _colorLookup = {
  aqua: [0, 255, 255],
  lime: [0, 255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  white: [255, 255, 255],
  fuchsia: [255, 0, 255],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [255, 0, 0],
  pink: [255, 192, 203],
  cyan: [0, 255, 255],
  transparent: [255, 255, 255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
},

/**
 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
 */
_parseColor = function _parseColor(v, toHSL) {
  var a, r, g, b, h, s, l, max, min, d, wasHSL;

  if (!v) {
    a = _colorLookup.black;
  } else if (typeof v === "number") {
    a = [v >> 16, v >> 8 & 255, v & 255];
  } else {
    if (v.charAt(v.length - 1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length === 4) {
        //for shorthand like #9F0
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b;
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_numExp);

      if (!toHSL) {
        h = Number(a[0]) % 360 / 360;
        s = Number(a[1]) / 100;
        l = Number(a[2]) / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;

        if (a.length > 3) {
          a[3] = Number(a[3]);
        }

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (v.indexOf("=") !== -1) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        return v.match(_relNumExp);
      }
    } else {
      a = v.match(_numExp) || _colorLookup.transparent;
    }

    a[0] = Number(a[0]);
    a[1] = Number(a[1]);
    a[2] = Number(a[2]);

    if (a.length > 3) {
      a[3] = Number(a[3]);
    }
  }

  if (toHSL && !wasHSL) {
    r = a[0] / 255;
    g = a[1] / 255;
    b = a[2] / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = h + 0.5 | 0;
    a[1] = s * 100 + 0.5 | 0;
    a[2] = l * 100 + 0.5 | 0;
  }

  return a;
},
    _formatColors = function _formatColors(s, toHSL) {
  var colors = (s + "").match(_colorExp) || [],
      charIndex = 0,
      parsed = "",
      i,
      color,
      temp;

  if (!colors.length) {
    return s;
  }

  for (i = 0; i < colors.length; i++) {
    color = colors[i];
    temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
    charIndex += temp.length + color.length;
    color = _parseColor(color, toHSL);

    if (color.length === 3) {
      color.push(1);
    }

    parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
  }

  return parsed + s.substr(charIndex);
},
    p,
    _colorStringFilter,
    TweenLite = (_TweenLite._gsScope.GreenSockGlobals || _TweenLite._gsScope).TweenLite,
    _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
    //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.
ColorPropsPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "colorProps",
  version: "1.5.3",
  priority: -1,
  API: 2,
  global: true,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    var p, proxy, pt, val;
    this._target = target;
    this._proxy = proxy = (value.format + "").toUpperCase() === "NUMBER" ? {} : 0;

    for (p in value) {
      if (p !== "format") {
        if (proxy) {
          this._firstNumPT = pt = {
            _next: this._firstNumPT,
            t: target,
            p: p,
            f: typeof target[p] === "function"
          };
          proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]()).join(",") + ")";
          val = value[p];

          if (typeof val === "function") {
            val = val(index, target);
          }

          this._addTween(proxy, p, "get", typeof val === "number" ? "rgb(" + _parseColor(val, false).join(",") + ")" : val, p, null, null, _colorStringFilter);
        } else {
          this._addTween(target, p, "get", value[p], p, null, null, _colorStringFilter, index);
        }
      }
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(v) {
    var pt = this._firstNumPT,
        val;

    this._super.setRatio.call(this, v);

    while (pt) {
      val = _parseColor(this._proxy[pt.p], false);
      val = val[0] << 16 | val[1] << 8 | val[2];

      if (pt.f) {
        this._target[pt.p](val);
      } else {
        this._target[pt.p] = val;
      }

      pt = pt._next;
    }
  }
});

exports.default = exports.ColorPropsPlugin = ColorPropsPlugin;

for (p in _colorLookup) {
  _colorExp += "|" + p + "\\b";
}

_colorExp = new RegExp(_colorExp + ")", "gi");

ColorPropsPlugin.colorStringFilter = _colorStringFilter = function _colorStringFilter(a) {
  var combined = a[0] + " " + a[1],
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
    a[0] = _formatColors(a[0], toHSL);
    a[1] = _formatColors(a[1], toHSL);
  }
};

if (!TweenLite.defaultStringFilter) {
  TweenLite.defaultStringFilter = ColorPropsPlugin.colorStringFilter;
}

ColorPropsPlugin.parseColor = _parseColor;
p = ColorPropsPlugin.prototype;
p._firstNumPT = null;

p._kill = function (lookup) {
  var pt = this._firstNumPT,
      prev;

  while (pt) {
    if (pt.p in lookup) {
      if (pt === p._firstNumPT) {
        this._firstNumPT = pt._next;
      }

      if (prev) {
        prev._next = pt._next;
      }
    } else {
      prev = pt;
    }

    pt = pt._next;
  }

  return this._super._kill(lookup);
};
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CSSPlugin = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function () {
  /** @constructor **/
  var CSSPlugin = function CSSPlugin() {
    _TweenLite.TweenPlugin.call(this, "css");

    this._overwriteProps.length = 0;
    this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _hasPriority,
      //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
  _suffixMap,
      //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
  _cs,
      //computed style (we store this in a shared variable to conserve memory and make minification tighter
  _overwriteProps,
      //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
  _specialProps = {},
      p = CSSPlugin.prototype = new _TweenLite.TweenPlugin("css");

  p.constructor = CSSPlugin;
  CSSPlugin.version = "2.1.3";
  CSSPlugin.API = 2;
  CSSPlugin.defaultTransformPerspective = 0;
  CSSPlugin.defaultSkewType = "compensated";
  CSSPlugin.defaultSmoothOrigin = true;
  p = "px"; //we'll reuse the "p" variable to keep file size down

  CSSPlugin.suffixMap = {
    top: p,
    right: p,
    bottom: p,
    left: p,
    width: p,
    height: p,
    fontSize: p,
    padding: p,
    margin: p,
    perspective: p,
    lineHeight: ""
  };

  var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
      _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
      _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
      //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
  _valuesExpWithCommas = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
      //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
  _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
      //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
  _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
      _opacityExp = /opacity *= *([^)]*)/i,
      _opacityValExp = /opacity:([^;]*)/i,
      _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
      _rgbhslExp = /^(rgb|hsl)/,
      _capsExp = /([A-Z])/g,
      _camelExp = /-([a-z])/gi,
      _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
      //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
  _camelFunc = function _camelFunc(s, g) {
    return g.toUpperCase();
  },
      _horizExp = /(?:Left|Right|Width)/i,
      _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
      _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
      _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi,
      //finds any commas that are not within parenthesis
  _complexExp = /[\s,\(]/i,
      //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
  _DEG2RAD = Math.PI / 180,
      _RAD2DEG = 180 / Math.PI,
      _forcePT = {},
      _dummyElement = {
    style: {}
  },
      _doc = _TweenLite._gsScope.document || {
    createElement: function createElement() {
      return _dummyElement;
    }
  },
      _createElement = function _createElement(type, ns) {
    var e = _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
    return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
      _tempDiv = _createElement("div"),
      _tempImg = _createElement("img"),
      _internals = CSSPlugin._internals = {
    _specialProps: _specialProps
  },
      //provides a hook to a few internal methods that we need to access from inside other plugins
  _agent = (_TweenLite._gsScope.navigator || {}).userAgent || "",
      _autoRound,
      _reqSafariFix,
      //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).
  _isSafari,
      _isFirefox,
      //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
  _isSafariLT6,
      //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
  _ieVers,
      _supportsOpacity = function () {
    //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
    var i = _agent.indexOf("Android"),
        a = _createElement("a");

    _isSafari = _agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i + 8, 2)) > 3);
    _isSafariLT6 = _isSafari && parseFloat(_agent.substr(_agent.indexOf("Version/") + 8, 2)) < 6;
    _isFirefox = _agent.indexOf("Firefox") !== -1;

    if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) {
      _ieVers = parseFloat(RegExp.$1);
    }

    if (!a) {
      return false;
    }

    a.style.cssText = "top:1px;opacity:.55;";
    return /^0.55/.test(a.style.opacity);
  }(),
      _getIEOpacity = function _getIEOpacity(v) {
    return _opacityExp.test(typeof v === "string" ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
  },
      _log = function _log(s) {
    //for logging messages, but in a way that won't throw errors in old versions of IE.
    if (_TweenLite._gsScope.console) {
      console.log(s);
    }
  },
      _target,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _index,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _prefixCSS = "",
      //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
  _prefix = "",
      //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".
  // @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
  _checkPropPrefix = function _checkPropPrefix(p, e) {
    e = e || _tempDiv;
    var s = e.style,
        a,
        i;

    if (s[p] !== undefined) {
      return p;
    }

    p = p.charAt(0).toUpperCase() + p.substr(1);
    a = ["O", "Moz", "ms", "Ms", "Webkit"];
    i = 5;

    while (--i > -1 && s[a[i] + p] === undefined) {}

    if (i >= 0) {
      _prefix = i === 3 ? "ms" : a[i];
      _prefixCSS = "-" + _prefix.toLowerCase() + "-";
      return _prefix + p;
    }

    return null;
  },
      _computedStyleScope = typeof window !== "undefined" ? window : _doc.defaultView || {
    getComputedStyle: function getComputedStyle() {}
  },
      _getComputedStyle = function _getComputedStyle(e) {
    return _computedStyleScope.getComputedStyle(e); //to avoid errors in Microsoft Edge, we need to call getComputedStyle() from a specific scope, typically window.
  },

  /**
   * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
   * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
   *
   * @param {!Object} t Target element whose style property you want to query
   * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
   * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
   * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
   * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
   * @return {?string} The current property value
   */
  _getStyle = CSSPlugin.getStyle = function (t, p, cs, calc, dflt) {
    var rv;
    if (!_supportsOpacity) if (p === "opacity") {
      //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
      return _getIEOpacity(t);
    }

    if (!calc && t.style[p]) {
      rv = t.style[p];
    } else if (cs = cs || _getComputedStyle(t)) {
      rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
    } else if (t.currentStyle) {
      rv = t.currentStyle[p];
    }

    return dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto") ? dflt : rv;
  },

  /**
   * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
   * @param {!Object} t Target element
   * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
   * @param {!number} v Value
   * @param {string=} sfx Suffix (like "px" or "%" or "em")
   * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
   * @return {number} value in pixels
   */
  _convertToPixels = _internals.convertToPixels = function (t, p, v, sfx, recurse) {
    if (sfx === "px" || !sfx && p !== "lineHeight") {
      return v;
    }

    if (sfx === "auto" || !v) {
      return 0;
    }

    var horiz = _horizExp.test(p),
        node = t,
        style = _tempDiv.style,
        neg = v < 0,
        precise = v === 1,
        pix,
        cache,
        time;

    if (neg) {
      v = -v;
    }

    if (precise) {
      v *= 100;
    }

    if (p === "lineHeight" && !sfx) {
      //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
      cache = _getComputedStyle(t).lineHeight;
      t.style.lineHeight = v;
      pix = parseFloat(_getComputedStyle(t).lineHeight);
      t.style.lineHeight = cache;
    } else if (sfx === "%" && p.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";

      if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
        node = t.parentNode || _doc.body;

        if (_getStyle(node, "display").indexOf("flex") !== -1) {
          //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
          style.position = "absolute";
        }

        cache = node._gsCache;
        time = _TweenLite.default.ticker.frame;

        if (cache && horiz && cache.time === time) {
          //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
          return cache.width * v / 100;
        }

        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }

      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);

      if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
        cache = node._gsCache = node._gsCache || {};
        cache.time = time;
        cache.width = pix / v * 100;
      }

      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p, v, sfx, true);
      }
    }

    if (precise) {
      pix /= 100;
    }

    return neg ? -pix : pix;
  },
      _calculateOffset = _internals.calculateOffset = function (t, p, cs) {
    //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
    if (_getStyle(t, "position", cs) !== "absolute") {
      return 0;
    }

    var dim = p === "left" ? "Left" : "Top",
        v = _getStyle(t, "margin" + dim, cs);

    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
  },
      // @private returns at object containing ALL of the style properties in camelCase and their associated values.
  _getAllStyles = function _getAllStyles(t, cs) {
    var s = {},
        i,
        tr,
        p;

    if (cs = cs || _getComputedStyle(t, null)) {
      if (i = cs.length) {
        while (--i > -1) {
          p = cs[i];

          if (p.indexOf("-transform") === -1 || _transformPropCSS === p) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
          }
        }
      } else {
        //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
        for (i in cs) {
          if (i.indexOf("Transform") === -1 || _transformProp === i) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[i] = cs[i];
          }
        }
      }
    } else if (cs = t.currentStyle || t.style) {
      for (i in cs) {
        if (typeof i === "string" && s[i] === undefined) {
          s[i.replace(_camelExp, _camelFunc)] = cs[i];
        }
      }
    }

    if (!_supportsOpacity) {
      s.opacity = _getIEOpacity(t);
    }

    tr = _getTransform(t, cs, false);
    s.rotation = tr.rotation;
    s.skewX = tr.skewX;
    s.scaleX = tr.scaleX;
    s.scaleY = tr.scaleY;
    s.x = tr.x;
    s.y = tr.y;

    if (_supports3D) {
      s.z = tr.z;
      s.rotationX = tr.rotationX;
      s.rotationY = tr.rotationY;
      s.scaleZ = tr.scaleZ;
    }

    if (s.filters) {
      delete s.filters;
    }

    return s;
  },
      // @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
  _cssDif = function _cssDif(t, s1, s2, vars, forceLookup) {
    var difs = {},
        style = t.style,
        val,
        p,
        mpt;

    for (p in s2) {
      if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || forceLookup && forceLookup[p]) if (p.indexOf("Origin") === -1) if (typeof val === "number" || typeof val === "string") {
        difs[p] = val === "auto" && (p === "left" || p === "top") ? _calculateOffset(t, p) : (val === "" || val === "auto" || val === "none") && typeof s1[p] === "string" && s1[p].replace(_NaNExp, "") !== "" ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.

        if (style[p] !== undefined) {
          //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
          mpt = new MiniPropTween(style, p, style[p], mpt);
        }
      }
    }

    if (vars) {
      for (p in vars) {
        //copy properties (except className)
        if (p !== "className") {
          difs[p] = vars[p];
        }
      }
    }

    return {
      difs: difs,
      firstMPT: mpt
    };
  },
      _dimensions = {
    width: ["Left", "Right"],
    height: ["Top", "Bottom"]
  },
      _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],

  /**
   * @private Gets the width or height of an element
   * @param {!Object} t Target element
   * @param {!string} p Property name ("width" or "height")
   * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
   * @return {number} Dimension (in pixels)
   */
  _getDimension = function _getDimension(t, p, cs) {
    if ((t.nodeName + "").toLowerCase() === "svg") {
      //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
      return (cs || _getComputedStyle(t))[p] || 0;
    } else if (t.getCTM && _isSVG(t)) {
      return t.getBBox()[p] || 0;
    }

    var v = parseFloat(p === "width" ? t.offsetWidth : t.offsetHeight),
        a = _dimensions[p],
        i = a.length;
    cs = cs || _getComputedStyle(t, null);

    while (--i > -1) {
      v -= parseFloat(_getStyle(t, "padding" + a[i], cs, true)) || 0;
      v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, true)) || 0;
    }

    return v;
  },
      // @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
  _parsePosition = function _parsePosition(v, recObj) {
    if (v === "contain" || v === "auto" || v === "auto auto") {
      //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
      return v + " ";
    }

    if (v == null || v === "") {
      v = "0 0";
    }

    var a = v.split(" "),
        x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0],
        y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1],
        i;

    if (a.length > 3 && !recObj) {
      //multiple positions
      a = v.split(", ").join(",").split(",");
      v = [];

      for (i = 0; i < a.length; i++) {
        v.push(_parsePosition(a[i]));
      }

      return v.join(",");
    }

    if (y == null) {
      y = x === "center" ? "50%" : "0";
    } else if (y === "center") {
      y = "50%";
    }

    if (x === "center" || isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1) {
      //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
      x = "50%";
    }

    v = x + " " + y + (a.length > 2 ? " " + a[2] : "");

    if (recObj) {
      recObj.oxp = x.indexOf("%") !== -1;
      recObj.oyp = y.indexOf("%") !== -1;
      recObj.oxr = x.charAt(1) === "=";
      recObj.oyr = y.charAt(1) === "=";
      recObj.ox = parseFloat(x.replace(_NaNExp, ""));
      recObj.oy = parseFloat(y.replace(_NaNExp, ""));
      recObj.v = v;
    }

    return recObj || v;
  },

  /**
   * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
   * @param {(number|string)} e End value which is typically a string, but could be a number
   * @param {(number|string)} b Beginning value which is typically a string but could be a number
   * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
   */
  _parseChange = function _parseChange(e, b) {
    if (typeof e === "function") {
      e = e(_index, _target);
    }

    return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0;
  },

  /**
   * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @return {number} Parsed value
   */
  _parseVal = function _parseVal(v, d) {
    if (typeof v === "function") {
      v = v(_index, _target);
    }

    var isRelative = typeof v === "string" && v.charAt(1) === "=";

    if (typeof v === "string" && v.charAt(v.length - 2) === "v") {
      //convert vw and vh into px-equivalents.
      v = (isRelative ? v.substr(0, 2) : 0) + window["inner" + (v.substr(-2) === "vh" ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100);
    }

    return v == null ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
  },

  /**
   * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
   * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
   * @return {number} parsed angle in radians
   */
  _parseAngle = function _parseAngle(v, d, p, directionalEnd) {
    var min = 0.000001,
        cap,
        split,
        dif,
        result,
        isRelative;

    if (typeof v === "function") {
      v = v(_index, _target);
    }

    if (v == null) {
      result = d;
    } else if (typeof v === "number") {
      result = v;
    } else {
      cap = 360;
      split = v.split("_");
      isRelative = v.charAt(1) === "=";
      dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (v.indexOf("rad") === -1 ? 1 : _RAD2DEG) - (isRelative ? 0 : d);

      if (split.length) {
        if (directionalEnd) {
          directionalEnd[p] = d + dif;
        }

        if (v.indexOf("short") !== -1) {
          dif = dif % cap;

          if (dif !== dif % (cap / 2)) {
            dif = dif < 0 ? dif + cap : dif - cap;
          }
        }

        if (v.indexOf("_cw") !== -1 && dif < 0) {
          dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
        } else if (v.indexOf("ccw") !== -1 && dif > 0) {
          dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
        }
      }

      result = d + dif;
    }

    if (result < min && result > -min) {
      result = 0;
    }

    return result;
  },
      _colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  },
      _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
  },

  /**
   * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
   * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
   * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
   * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
   */
  _parseColor = CSSPlugin.parseColor = function (v, toHSL) {
    var a, r, g, b, h, s, l, max, min, d, wasHSL;

    if (!v) {
      a = _colorLookup.black;
    } else if (typeof v === "number") {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          //for shorthand like #9F0
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_numExp);

        if (!toHSL) {
          h = Number(a[0]) % 360 / 360;
          s = Number(a[1]) / 100;
          l = Number(a[2]) / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;

          if (a.length > 3) {
            a[3] = Number(a[3]);
          }

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (v.indexOf("=") !== -1) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          return v.match(_relNumExp);
        }
      } else {
        a = v.match(_numExp) || _colorLookup.transparent;
      }

      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);

      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }

    if (toHSL && !wasHSL) {
      r = a[0] / 255;
      g = a[1] / 255;
      b = a[2] / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = h + 0.5 | 0;
      a[1] = s * 100 + 0.5 | 0;
      a[2] = l * 100 + 0.5 | 0;
    }

    return a;
  },
      _formatColors = function _formatColors(s, toHSL) {
    var colors = s.match(_colorExp) || [],
        charIndex = 0,
        parsed = "",
        i,
        color,
        temp;

    if (!colors.length) {
      return s;
    }

    for (i = 0; i < colors.length; i++) {
      color = colors[i];
      temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
      charIndex += temp.length + color.length;
      color = _parseColor(color, toHSL);

      if (color.length === 3) {
        color.push(1);
      }

      parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
    }

    return parsed + s.substr(charIndex);
  },
      _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.


  for (p in _colorLookup) {
    _colorExp += "|" + p + "\\b";
  }

  _colorExp = new RegExp(_colorExp + ")", "gi");

  CSSPlugin.colorStringFilter = function (a) {
    var combined = a[0] + " " + a[1],
        toHSL;

    if (_colorExp.test(combined)) {
      toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
      a[0] = _formatColors(a[0], toHSL);
      a[1] = _formatColors(a[1], toHSL);
    }

    _colorExp.lastIndex = 0;
  };

  if (!_TweenLite.default.defaultStringFilter) {
    _TweenLite.default.defaultStringFilter = CSSPlugin.colorStringFilter;
  }
  /**
   * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
   * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
   * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
   * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
   * @return {Function} formatter function
   */


  var _getFormatter = function _getFormatter(dflt, clr, collapsible, multi) {
    if (dflt == null) {
      return function (v) {
        return v;
      };
    }

    var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
        dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
        pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
        sfx = dflt.charAt(dflt.length - 1) === ")" ? ")" : "",
        delim = dflt.indexOf(" ") !== -1 ? " " : ",",
        numVals = dVals.length,
        dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "",
        _formatter2;

    if (!numVals) {
      return function (v) {
        return v;
      };
    }

    if (clr) {
      _formatter2 = function formatter(v) {
        var color, vals, i, a;

        if (typeof v === "number") {
          v += dSfx;
        } else if (multi && _commasOutsideParenExp.test(v)) {
          a = v.replace(_commasOutsideParenExp, "|").split("|");

          for (i = 0; i < a.length; i++) {
            a[i] = _formatter2(a[i]);
          }

          return a.join(",");
        }

        color = (v.match(_colorExp) || [dColor])[0];
        vals = v.split(color).join("").match(_valuesExp) || [];
        i = vals.length;

        if (numVals > i--) {
          while (++i < numVals) {
            vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
          }
        }

        return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
      };

      return _formatter2;
    }

    _formatter2 = function _formatter(v) {
      var vals, a, i;

      if (typeof v === "number") {
        v += dSfx;
      } else if (multi && _commasOutsideParenExp.test(v)) {
        a = v.replace(_commasOutsideParenExp, "|").split("|");

        for (i = 0; i < a.length; i++) {
          a[i] = _formatter2(a[i]);
        }

        return a.join(",");
      }

      vals = v.match(delim === "," ? _valuesExp : _valuesExpWithCommas) || [];
      i = vals.length;

      if (numVals > i--) {
        while (++i < numVals) {
          vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
        }
      }

      return (pfx && v !== "none" ? v.substr(0, v.indexOf(vals[0])) || pfx : pfx) + vals.join(delim) + sfx; //note: prefix might be different, like for clipPath it could start with inset( or polygon(
    };

    return _formatter2;
  },

  /**
   * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
   * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
   * @return {Function} a formatter function
   */
  _getEdgeParser = function _getEdgeParser(props) {
    props = props.split(",");
    return function (t, e, p, cssp, pt, plugin, vars) {
      var a = (e + "").split(" "),
          i;
      vars = {};

      for (i = 0; i < 4; i++) {
        vars[props[i]] = a[i] = a[i] || a[(i - 1) / 2 >> 0];
      }

      return cssp.parse(t, vars, pt, plugin);
    };
  },
      // @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
  _setPluginRatio = _internals._setPluginRatio = function (v) {
    this.plugin.setRatio(v);
    var d = this.data,
        proxy = d.proxy,
        mpt = d.firstMPT,
        min = 0.000001,
        val,
        pt,
        i,
        str,
        p;

    while (mpt) {
      val = proxy[mpt.v];

      if (mpt.r) {
        val = mpt.r(val);
      } else if (val < min && val > -min) {
        val = 0;
      }

      mpt.t[mpt.p] = val;
      mpt = mpt._next;
    }

    if (d.autoRotate) {
      d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
    } //at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.


    if (v === 1 || v === 0) {
      mpt = d.firstMPT;
      p = v === 1 ? "e" : "b";

      while (mpt) {
        pt = mpt.t;

        if (!pt.type) {
          pt[p] = pt.s + pt.xs0;
        } else if (pt.type === 1) {
          str = pt.xs0 + pt.s + pt.xs1;

          for (i = 1; i < pt.l; i++) {
            str += pt["xn" + i] + pt["xs" + (i + 1)];
          }

          pt[p] = str;
        }

        mpt = mpt._next;
      }
    }
  },

  /**
   * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
   * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
   * @param {!string} p property name
   * @param {(number|string|object)} v value
   * @param {MiniPropTween=} next next MiniPropTween in the linked list
   * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
   */
  MiniPropTween = function MiniPropTween(t, p, v, next, r) {
    this.t = t;
    this.p = p;
    this.v = v;
    this.r = r;

    if (next) {
      next._prev = this;
      this._next = next;
    }
  },

  /**
   * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
   * This method returns an object that has the following properties:
   *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
   *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
   *  - firstMPT: the first MiniPropTween in the linked list
   *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
   * @param {!Object} t target object to be tweened
   * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
   * @param {!CSSPlugin} cssp The CSSPlugin instance
   * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
   * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
   * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
   */
  _parseToProxy = _internals._parseToProxy = function (t, vars, cssp, pt, plugin, shallow) {
    var bpt = pt,
        start = {},
        end = {},
        transform = cssp._transform,
        oldForce = _forcePT,
        i,
        p,
        xp,
        mpt,
        firstPT;
    cssp._transform = null;
    _forcePT = vars;
    pt = firstPT = cssp.parse(t, vars, pt, plugin);
    _forcePT = oldForce; //break off from the linked list so the new ones are isolated.

    if (shallow) {
      cssp._transform = transform;

      if (bpt) {
        bpt._prev = null;

        if (bpt._prev) {
          bpt._prev._next = null;
        }
      }
    }

    while (pt && pt !== bpt) {
      if (pt.type <= 1) {
        p = pt.p;
        end[p] = pt.s + pt.c;
        start[p] = pt.s;

        if (!shallow) {
          mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
          pt.c = 0;
        }

        if (pt.type === 1) {
          i = pt.l;

          while (--i > 0) {
            xp = "xn" + i;
            p = pt.p + "_" + xp;
            end[p] = pt.data[xp];
            start[p] = pt[xp];

            if (!shallow) {
              mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
            }
          }
        }
      }

      pt = pt._next;
    }

    return {
      proxy: start,
      end: end,
      firstMPT: mpt,
      pt: firstPT
    };
  },

  /**
   * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
   * CSSPropTweens have the following optional properties as well (not defined through the constructor):
   *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
   *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
   *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
   *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
   *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
   * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
   * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
   * @param {number} s Starting numeric value
   * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
   * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
   * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
   * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
   * @param {boolean=} r If true, the value(s) should be rounded
   * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
   * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
   * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
   */
  CSSPropTween = _internals.CSSPropTween = function (t, p, s, c, next, type, n, r, pr, b, e) {
    this.t = t; //target

    this.p = p; //property

    this.s = s; //starting value

    this.c = c; //change value

    this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)

    if (!(t instanceof CSSPropTween)) {
      _overwriteProps.push(this.n);
    }

    this.r = !r ? r : typeof r === "function" ? r : Math.round; //round (boolean)

    this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work

    if (pr) {
      this.pr = pr;
      _hasPriority = true;
    }

    this.b = b === undefined ? s : b;
    this.e = e === undefined ? s + c : e;

    if (next) {
      this._next = next;
      next._prev = this;
    }
  },
      _addNonTweeningNumericPT = function _addNonTweeningNumericPT(target, prop, start, end, next, overwriteProp) {
    //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
    var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
    pt.b = start;
    pt.e = pt.xs0 = end;
    return pt;
  },

  /**
   * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
   * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
   * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
   * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
   *
   * @param {!Object} t Target whose property will be tweened
   * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
   * @param {string} b Beginning value
   * @param {string} e Ending value
   * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
   * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
   * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
   * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
   * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
   * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
   */
  _parseComplex = CSSPlugin.parseComplex = function (t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
    //DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
    b = b || dflt || "";

    if (typeof e === "function") {
      e = e(_index, _target);
    }

    pt = new CSSPropTween(t, p, 0, 0, pt, setRatio ? 2 : 1, null, false, pr, b, e);
    e += ""; //ensures it's a string

    if (clrs && _colorExp.test(e + b)) {
      //if colors are found, normalize the formatting to rgba() or hsla().
      e = [b, e];
      CSSPlugin.colorStringFilter(e);
      b = e[0];
      e = e[1];
    }

    var ba = b.split(", ").join(",").split(" "),
        //beginning array
    ea = e.split(", ").join(",").split(" "),
        //ending array
    l = ba.length,
        autoRound = _autoRound !== false,
        i,
        xi,
        ni,
        bv,
        ev,
        bnums,
        enums,
        bn,
        hasAlpha,
        temp,
        cv,
        str,
        useHSL;

    if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
      if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) {
        //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
      } else {
        ba = ba.join(" ").split(",").join(", ").split(" ");
        ea = ea.join(" ").split(",").join(", ").split(" ");
      }

      l = ba.length;
    }

    if (l !== ea.length) {
      //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
      ba = (dflt || "").split(" ");
      l = ba.length;
    }

    pt.plugin = plugin;
    pt.setRatio = setRatio;
    _colorExp.lastIndex = 0;

    for (i = 0; i < l; i++) {
      bv = ba[i];
      ev = ea[i] + "";
      bn = parseFloat(bv); //if the value begins with a number (most common). It's fine if it has a suffix like px

      if (bn || bn === 0) {
        pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && ev.indexOf("px") !== -1 ? Math.round : false, true); //if the value is a color
      } else if (clrs && _colorExp.test(bv)) {
        str = ev.indexOf(")") + 1;
        str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.

        useHSL = ev.indexOf("hsl") !== -1 && _supportsOpacity;
        temp = ev; //original string value so we can look for any prefix later.

        bv = _parseColor(bv, useHSL);
        ev = _parseColor(ev, useHSL);
        hasAlpha = bv.length + ev.length > 6;

        if (hasAlpha && !_supportsOpacity && ev[3] === 0) {
          //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
          pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
          pt.e = pt.e.split(ea[i]).join("transparent");
        } else {
          if (!_supportsOpacity) {
            //old versions of IE don't support rgba().
            hasAlpha = false;
          }

          if (useHSL) {
            pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, false);
          } else {
            pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true).appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, Math.round);
          }

          if (hasAlpha) {
            bv = bv.length < 4 ? 1 : bv[3];
            pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, false);
          }
        }

        _colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.
      } else {
        bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array
        //if no number is found, treat it as a non-tweening value and just append the string to the current xs.

        if (!bnums) {
          pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev; //loop through all the numbers that are found and construct the extra values on the pt.
        } else {
          enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5

          if (!enums || enums.length !== bnums.length) {
            //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
            return pt;
          }

          ni = 0;

          for (xi = 0; xi < bnums.length; xi++) {
            cv = bnums[xi];
            temp = bv.indexOf(cv, ni);
            pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && bv.substr(temp + cv.length, 2) === "px" ? Math.round : false, xi === 0);
            ni = temp + cv.length;
          }

          pt["xs" + pt.l] += bv.substr(ni);
        }
      }
    } //if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.


    if (e.indexOf("=") !== -1) if (pt.data) {
      str = pt.xs0 + pt.data.s;

      for (i = 1; i < pt.l; i++) {
        str += pt["xs" + i] + pt.data["xn" + i];
      }

      pt.e = str + pt["xs" + i];
    }

    if (!pt.l) {
      pt.type = -1;
      pt.xs0 = pt.e;
    }

    return pt.xfirst || pt;
  },
      i = 9;

  p = CSSPropTween.prototype;
  p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.

  while (--i > 0) {
    p["xn" + i] = 0;
    p["xs" + i] = "";
  }

  p.xs0 = "";
  p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
  /**
   * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
   * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
   * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
   * @param {string=} pfx Prefix (if any)
   * @param {!number} s Starting value
   * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
   * @param {string=} sfx Suffix (if any)
   * @param {boolean=} r Round (if true).
   * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
   * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
   */

  p.appendXtra = function (pfx, s, c, sfx, r, pad) {
    var pt = this,
        l = pt.l;
    pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "";
    if (!c) if (l !== 0 && !pt.plugin) {
      //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
      pt["xs" + l] += s + (sfx || "");
      return pt;
    }
    pt.l++;
    pt.type = pt.setRatio ? 2 : 1;
    pt["xs" + pt.l] = sfx || "";

    if (l > 0) {
      pt.data["xn" + l] = s + c;
      pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)

      pt["xn" + l] = s;

      if (!pt.plugin) {
        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
        pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
      }

      return pt;
    }

    pt.data = {
      s: s + c
    };
    pt.rxp = {};
    pt.s = s;
    pt.c = c;
    pt.r = r;
    return pt;
  };
  /**
   * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
   * @param {!string} p Property name (like "boxShadow" or "throwProps")
   * @param {Object=} options An object containing any of the following configuration options:
   *                      - defaultValue: the default value
   *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
   *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
   *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
   *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
   *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
   *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
   *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
   *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
   */


  var SpecialProp = function SpecialProp(p, options) {
    options = options || {};
    this.p = options.prefix ? _checkPropPrefix(p) || p : p;
    _specialProps[p] = _specialProps[this.p] = this;
    this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);

    if (options.parser) {
      this.parse = options.parser;
    }

    this.clrs = options.color;
    this.multi = options.multi;
    this.keyword = options.keyword;
    this.dflt = options.defaultValue;
    this.allowFunc = options.allowFunc;
    this.pr = options.priority || 0;
  },
      //shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
  _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function (p, options, defaults) {
    if (_typeof(options) !== "object") {
      options = {
        parser: defaults
      }; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
    }

    var a = p.split(","),
        d = options.defaultValue,
        i,
        temp;
    defaults = defaults || [d];

    for (i = 0; i < a.length; i++) {
      options.prefix = i === 0 && options.prefix;
      options.defaultValue = defaults[i] || d;
      temp = new SpecialProp(a[i], options);
    }
  },
      //creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
  _registerPluginProp = _internals._registerPluginProp = function (p) {
    if (!_specialProps[p]) {
      var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";

      _registerComplexSpecialProp(p, {
        parser: function parser(t, e, p, cssp, pt, plugin, vars) {
          var pluginClass = _globals.com.greensock.plugins[pluginName];

          if (!pluginClass) {
            _log("Error: " + pluginName + " js file not loaded.");

            return pt;
          }

          pluginClass._cssRegister();

          return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
        }
      });
    }
  };

  p = SpecialProp.prototype;
  /**
   * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
   * @param {!Object} t target element
   * @param {(string|number|object)} b beginning value
   * @param {(string|number|object)} e ending (destination) value
   * @param {CSSPropTween=} pt next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
   * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
   * @return {CSSPropTween=} First CSSPropTween in the linked list
   */

  p.parseComplex = function (t, b, e, pt, plugin, setRatio) {
    var kwd = this.keyword,
        i,
        ba,
        ea,
        l,
        bi,
        ei; //if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)

    if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
      ba = b.replace(_commasOutsideParenExp, "|").split("|");
      ea = e.replace(_commasOutsideParenExp, "|").split("|");
    } else if (kwd) {
      ba = [b];
      ea = [e];
    }

    if (ea) {
      l = ea.length > ba.length ? ea.length : ba.length;

      for (i = 0; i < l; i++) {
        b = ba[i] = ba[i] || this.dflt;
        e = ea[i] = ea[i] || this.dflt;

        if (kwd) {
          bi = b.indexOf(kwd);
          ei = e.indexOf(kwd);

          if (bi !== ei) {
            if (ei === -1) {
              //if the keyword isn't in the end value, remove it from the beginning one.
              ba[i] = ba[i].split(kwd).join("");
            } else if (bi === -1) {
              //if the keyword isn't in the beginning, add it.
              ba[i] += " " + kwd;
            }
          }
        }
      }

      b = ba.join(", ");
      e = ea.join(", ");
    }

    return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
  };
  /**
   * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
   * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
   * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
   * @param {!Object} t Target object whose property is being tweened
   * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
   * @param {!string} p Property name
   * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
   * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
   * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
   * @param {Object=} vars Original vars object that contains the data for parsing.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
   */


  p.parse = function (t, e, p, cssp, pt, plugin, vars) {
    return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
  };
  /**
   * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
   *  1) Target object whose property should be tweened (typically a DOM element)
   *  2) The end/destination value (could be a string, number, object, or whatever you want)
   *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
   *
   * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
   *
   * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
   *      var start = target.style.width;
   *      return function(ratio) {
   *              target.style.width = (start + value * ratio) + "px";
   *              console.log("set width to " + target.style.width);
   *          }
   * }, 0);
   *
   * Then, when I do this tween, it will trigger my special property:
   *
   * TweenLite.to(element, 1, {css:{myCustomProp:100}});
   *
   * In the example, of course, we're just changing the width, but you can do anything you want.
   *
   * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
   * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
   * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
   */


  CSSPlugin.registerSpecialProp = function (name, onInitTween, priority) {
    _registerComplexSpecialProp(name, {
      parser: function parser(t, e, p, cssp, pt, plugin, vars) {
        var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
        rv.plugin = plugin;
        rv.setRatio = onInitTween(t, e, cssp._tween, p);
        return rv;
      },
      priority: priority
    });
  }; //transform-related methods and properties


  CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).

  var _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
      _transformProp = _checkPropPrefix("transform"),
      //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
  _transformPropCSS = _prefixCSS + "transform",
      _transformOriginProp = _checkPropPrefix("transformOrigin"),
      _supports3D = _checkPropPrefix("perspective") !== null,
      Transform = _internals.Transform = function () {
    this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
    this.force3D = CSSPlugin.defaultForce3D === false || !_supports3D ? false : CSSPlugin.defaultForce3D || "auto";
  },
      _SVGElement = _TweenLite._gsScope.SVGElement,
      _useSVGTransformAttr,
      //Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.
  _createSVG = function _createSVG(type, container, attributes) {
    var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
        reg = /([a-z])([A-Z])/g,
        p;

    for (p in attributes) {
      element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
    }

    container.appendChild(element);
    return element;
  },
      _docElement = _doc.documentElement || {},
      _forceSVGTransformAttr = function () {
    //IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
    var force = _ieVers || /Android/i.test(_agent) && !_TweenLite._gsScope.chrome,
        svg,
        rect,
        width;

    if (_doc.createElementNS && _docElement.appendChild && !force) {
      //IE8 and earlier doesn't support SVG anyway
      svg = _createSVG("svg", _docElement);
      rect = _createSVG("rect", svg, {
        width: 100,
        height: 50,
        x: 100
      });
      width = rect.getBoundingClientRect().width;
      rect.style[_transformOriginProp] = "50% 50%";
      rect.style[_transformProp] = "scaleX(0.5)";
      force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).

      _docElement.removeChild(svg);
    }

    return force;
  }(),
      _parseSVGOrigin = function _parseSVGOrigin(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
    var tm = e._gsTransform,
        m = _getMatrix(e, true),
        v,
        x,
        y,
        xOrigin,
        yOrigin,
        a,
        b,
        c,
        d,
        tx,
        ty,
        determinant,
        xOriginOld,
        yOriginOld;

    if (tm) {
      xOriginOld = tm.xOrigin; //record the original values before we alter them.

      yOriginOld = tm.yOrigin;
    }

    if (!absolute || (v = absolute.split(" ")).length < 2) {
      b = e.getBBox();

      if (b.x === 0 && b.y === 0 && b.width + b.height === 0) {
        //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
        b = {
          x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
          y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
          width: 0,
          height: 0
        };
      }

      local = _parsePosition(local).split(" ");
      v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
    }

    decoratee.xOrigin = xOrigin = parseFloat(v[0]);
    decoratee.yOrigin = yOrigin = parseFloat(v[1]);

    if (absolute && m !== _identity2DMatrix) {
      //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;

      if (determinant) {
        //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = decoratee.xOrigin = v[0] = x;
        yOrigin = decoratee.yOrigin = v[1] = y;
      }
    }

    if (tm) {
      //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
      if (skipRecord) {
        decoratee.xOffset = tm.xOffset;
        decoratee.yOffset = tm.yOffset;
        tm = decoratee;
      }

      if (smoothOrigin || smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false) {
        x = xOrigin - xOriginOld;
        y = yOrigin - yOriginOld; //originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
        //tm.x -= x - (x * m[0] + y * m[2]);
        //tm.y -= y - (x * m[1] + y * m[3]);

        tm.xOffset += x * m[0] + y * m[2] - x;
        tm.yOffset += x * m[1] + y * m[3] - y;
      } else {
        tm.xOffset = tm.yOffset = 0;
      }
    }

    if (!skipRecord) {
      e.setAttribute("data-svg-origin", v.join(" "));
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._originalGetBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._originalGetBBox) {
      bbox = this._originalGetBBox();
    }

    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getBBox = function _getBBox(e) {
    try {
      return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      return _getBBoxHack.call(e, true);
    }
  },
      _isSVG = function _isSVG(e) {
    //reports if the element is an SVG on which getBBox() actually works
    return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _getMatrix = function _getMatrix(e, force2D) {
    var tm = e._gsTransform || new Transform(),
        rnd = 100000,
        style = e.style,
        isDefault,
        s,
        m,
        n,
        dec,
        nextSibling,
        parent;

    if (_transformProp) {
      s = _getStyle(e, _transformPropCSS, null, true);
    } else if (e.currentStyle) {
      //for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
      s = e.currentStyle.filter.match(_ieGetMatrixExp);
      s = s && s.length === 4 ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0].join(",") : "";
    }

    isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

    if (_transformProp && isDefault && !e.offsetParent && e !== _docElement) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      n = style.display;
      style.display = "block";
      parent = e.parentNode;

      if (!parent || !e.offsetParent) {
        dec = 1; //flag

        nextSibling = e.nextSibling;

        _docElement.appendChild(e); //we must add it to the DOM in order to get values properly

      }

      s = _getStyle(e, _transformPropCSS, null, true);
      isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

      if (n) {
        style.display = n;
      } else {
        _removeProp(style, "display");
      }

      if (dec) {
        if (nextSibling) {
          parent.insertBefore(e, nextSibling);
        } else if (parent) {
          parent.appendChild(e);
        } else {
          _docElement.removeChild(e);
        }
      }
    }

    if (tm.svg || e.getCTM && _isSVG(e)) {
      if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) {
        //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
        s = style[_transformProp];
        isDefault = 0;
      }

      m = e.getAttribute("transform");

      if (isDefault && m) {
        m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

        s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
        isDefault = 0;
      }
    }

    if (isDefault) {
      return _identity2DMatrix;
    } //split the matrix values out into an array (m for matrix)


    m = (s || "").match(_numExp) || [];
    i = m.length;

    while (--i > -1) {
      n = Number(m[i]);
      m[i] = (dec = n - (n |= 0)) ? (dec * rnd + (dec < 0 ? -0.5 : 0.5) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
    }

    return force2D && m.length > 6 ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
  },

  /**
   * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
   * @param {!Object} t target element
   * @param {Object=} cs computed style object (optional)
   * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
   * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
   * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
   */
  _getTransform = _internals.getTransform = function (t, cs, rec, parse) {
    if (t._gsTransform && rec && !parse) {
      return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
    }

    var tm = rec ? t._gsTransform || new Transform() : new Transform(),
        invX = tm.scaleX < 0,
        //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
    min = 0.00002,
        rnd = 100000,
        zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0,
        defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
        m,
        i,
        scaleX,
        scaleY,
        rotation,
        skewX;
    tm.svg = !!(t.getCTM && _isSVG(t));

    if (tm.svg) {
      _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));

      _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
    }

    m = _getMatrix(t);

    if (m !== _identity2DMatrix) {
      if (m.length === 16) {
        //we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
        var a11 = m[0],
            a21 = m[1],
            a31 = m[2],
            a41 = m[3],
            a12 = m[4],
            a22 = m[5],
            a32 = m[6],
            a42 = m[7],
            a13 = m[8],
            a23 = m[9],
            a33 = m[10],
            a14 = m[12],
            a24 = m[13],
            a34 = m[14],
            a43 = m[11],
            angle = Math.atan2(a32, a33),
            t1,
            t2,
            t3,
            t4,
            cos,
            sin; //we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari

        if (tm.zOrigin) {
          a34 = -tm.zOrigin;
          a14 = a13 * a34 - m[12];
          a24 = a23 * a34 - m[13];
          a34 = a33 * a34 + tm.zOrigin - m[14];
        } //note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.


        tm.rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY


        angle = Math.atan2(-a31, a33);
        tm.rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a11 * cos - a13 * sin;
          t2 = a21 * cos - a23 * sin;
          t3 = a31 * cos - a33 * sin;
          a23 = a21 * sin + a23 * cos;
          a33 = a31 * sin + a33 * cos;
          a43 = a41 * sin + a43 * cos;
          a11 = t1;
          a21 = t2;
          a31 = t3;
        } //rotationZ


        angle = Math.atan2(a21, a11);
        tm.rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a11 * cos + a21 * sin;
          t2 = a12 * cos + a22 * sin;
          t3 = a13 * cos + a23 * sin;
          a21 = a21 * cos - a11 * sin;
          a22 = a22 * cos - a12 * sin;
          a23 = a23 * cos - a13 * sin;
          a11 = t1;
          a12 = t2;
          a13 = t3;
        }

        if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          tm.rotationX = tm.rotation = 0;
          tm.rotationY = 180 - tm.rotationY;
        } //skewX


        angle = Math.atan2(a12, a22); //scales

        tm.scaleX = (Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5 | 0) / rnd;
        tm.scaleY = (Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5 | 0) / rnd;
        tm.scaleZ = (Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5 | 0) / rnd;
        a11 /= tm.scaleX;
        a12 /= tm.scaleY;
        a21 /= tm.scaleX;
        a22 /= tm.scaleY;

        if (Math.abs(angle) > min) {
          tm.skewX = angle * _RAD2DEG;
          a12 = 0; //unskews

          if (tm.skewType !== "simple") {
            tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
          }
        } else {
          tm.skewX = 0;
        }
        /* //for testing purposes
        var transform = "matrix3d(",
        	comma = ",",
        	zero = "0";
        a13 /= tm.scaleZ;
        a23 /= tm.scaleZ;
        a31 /= tm.scaleX;
        a32 /= tm.scaleY;
        a33 /= tm.scaleZ;
        transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
        transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
        transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
        transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
        transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
        console.log(transform);
        document.querySelector(".test").style[_transformProp] = transform;
        */


        tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        tm.x = a14;
        tm.y = a24;
        tm.z = a34;

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
          tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
        }
      } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
        //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
        var k = m.length >= 6,
            a = k ? m[0] : 1,
            b = m[1] || 0,
            c = m[2] || 0,
            d = k ? m[3] : 1;
        tm.x = m[4] || 0;
        tm.y = m[5] || 0;
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
        tm.scaleX = scaleX;
        tm.scaleY = scaleY;
        tm.rotation = rotation;
        tm.skewX = skewX;

        if (_supports3D) {
          tm.rotationX = tm.rotationY = tm.z = 0;
          tm.perspective = defaultTransformPerspective;
          tm.scaleZ = 1;
        }

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
          tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
        }
      }

      if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
        if (invX) {
          tm.scaleX *= -1;
          tm.skewX += tm.rotation <= 0 ? 180 : -180;
          tm.rotation += tm.rotation <= 0 ? 180 : -180;
        } else {
          tm.scaleY *= -1;
          tm.skewX += tm.skewX <= 0 ? 180 : -180;
        }
      }

      tm.zOrigin = zOrigin; //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.

      for (i in tm) {
        if (tm[i] < min) if (tm[i] > -min) {
          tm[i] = 0;
        }
      }
    } //DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);


    if (rec) {
      t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)

      if (tm.svg) {
        //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
        if (_useSVGTransformAttr && t.style[_transformProp]) {
          _TweenLite.default.delayedCall(0.001, function () {
            //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
            _removeProp(t.style, _transformProp);
          });
        } else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
          _TweenLite.default.delayedCall(0.001, function () {
            t.removeAttribute("transform");
          });
        }
      }
    }

    return tm;
  },
      //for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
  _setIETransformRatio = function _setIETransformRatio(v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    ang = -t.rotation * _DEG2RAD,
        skew = ang + t.skewX * _DEG2RAD,
        rnd = 100000,
        a = (Math.cos(ang) * t.scaleX * rnd | 0) / rnd,
        b = (Math.sin(ang) * t.scaleX * rnd | 0) / rnd,
        c = (Math.sin(skew) * -t.scaleY * rnd | 0) / rnd,
        d = (Math.cos(skew) * t.scaleY * rnd | 0) / rnd,
        style = this.t.style,
        cs = this.t.currentStyle,
        filters,
        val;

    if (!cs) {
      return;
    }

    val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)

    b = -c;
    c = -val;
    filters = cs.filter;
    style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight

    var w = this.t.offsetWidth,
        h = this.t.offsetHeight,
        clip = cs.position !== "absolute",
        m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
        ox = t.x + w * t.xPercent / 100,
        oy = t.y + h * t.yPercent / 100,
        dx,
        dy; //if transformOrigin is being used, adjust the offset x and y

    if (t.ox != null) {
      dx = (t.oxp ? w * t.ox * 0.01 : t.ox) - w / 2;
      dy = (t.oyp ? h * t.oy * 0.01 : t.oy) - h / 2;
      ox += dx - (dx * a + dy * b);
      oy += dy - (dx * c + dy * d);
    }

    if (!clip) {
      m += ", sizingMethod='auto expand')";
    } else {
      dx = w / 2;
      dy = h / 2; //translate to ensure that transformations occur around the correct origin (default is center).

      m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
    }

    if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
      style.filter = filters.replace(_ieSetMatrixExp, m);
    } else {
      style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
    } //at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.


    if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
      style.removeAttribute("filter");
    } //we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).

    if (!clip) {
      var mult = _ieVers < 8 ? 1 : -1,
          //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
      marg,
          prop,
          dif;
      dx = t.ieOffsetX || 0;
      dy = t.ieOffsetY || 0;
      t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
      t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);

      for (i = 0; i < 4; i++) {
        prop = _margins[i];
        marg = cs[prop]; //we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)

        val = marg.indexOf("px") !== -1 ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;

        if (val !== t[prop]) {
          dif = i < 2 ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
        } else {
          dif = i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY;
        }

        style[prop] = (t[prop] = Math.round(val - dif * (i === 0 || i === 2 ? 1 : mult))) + "px";
      }
    }
  },

  /* translates a super small decimal to a string WITHOUT scientific notation
  _safeDecimal = function(n) {
  	var s = (n < 0 ? -n : n) + "",
  		a = s.split("e-");
  	return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
  },
  */
  _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function (v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    style = this.t.style,
        angle = t.rotation,
        rotationX = t.rotationX,
        rotationY = t.rotationY,
        sx = t.scaleX,
        sy = t.scaleY,
        sz = t.scaleZ,
        x = t.x,
        y = t.y,
        z = t.z,
        isSVG = t.svg,
        perspective = t.perspective,
        force3D = t.force3D,
        skewY = t.skewY,
        skewX = t.skewX,
        t1,
        a11,
        a12,
        a13,
        a21,
        a22,
        a23,
        a31,
        a32,
        a33,
        a41,
        a42,
        a43,
        zOrigin,
        min,
        cos,
        sin,
        t2,
        transform,
        comma,
        zero,
        skew,
        rnd;

    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewX += skewY;
      angle += skewY;
    } //check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)


    if (((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1 || _useSVGTransformAttr && isSVG || !_supports3D) {
      //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.
      //2D
      if (angle || skewX || isSVG) {
        angle *= _DEG2RAD;
        skew = skewX * _DEG2RAD;
        rnd = 100000;
        a11 = Math.cos(angle) * sx;
        a21 = Math.sin(angle) * sx;
        a12 = Math.sin(angle - skew) * -sy;
        a22 = Math.cos(angle - skew) * sy;

        if (skew && t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan(skew - skewY * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          a12 *= t1;
          a22 *= t1;

          if (skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }

        if (isSVG) {
          x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
          y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;

          if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
            //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
            min = this.t.getBBox();
            x += t.xPercent * 0.01 * min.width;
            y += t.yPercent * 0.01 * min.height;
          }

          min = 0.000001;
          if (x < min) if (x > -min) {
            x = 0;
          }
          if (y < min) if (y > -min) {
            y = 0;
          }
        }

        transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")";

        if (isSVG && _useSVGTransformAttr) {
          this.t.setAttribute("transform", "matrix(" + transform);
        } else {
          //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
          style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
        }
      } else {
        style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
      }

      return;
    }

    if (_isFirefox) {
      //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
      min = 0.0001;

      if (sx < min && sx > -min) {
        sx = sz = 0.00002;
      }

      if (sy < min && sy > -min) {
        sy = sz = 0.00002;
      }

      if (perspective && !t.z && !t.rotationX && !t.rotationY) {
        //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
        perspective = 0;
      }
    }

    if (angle || skewX) {
      angle *= _DEG2RAD;
      cos = a11 = Math.cos(angle);
      sin = a21 = Math.sin(angle);

      if (skewX) {
        angle -= skewX * _DEG2RAD;
        cos = Math.cos(angle);
        sin = Math.sin(angle);

        if (t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan((skewX - skewY) * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          cos *= t1;
          sin *= t1;

          if (t.skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }
      }

      a12 = -sin;
      a22 = cos;
    } else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) {
      //if we're only translating and/or 2D scaling, this is faster...
      style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (sx !== 1 || sy !== 1 ? " scale(" + sx + "," + sy + ")" : "");
      return;
    } else {
      a11 = a22 = 1;
      a12 = a21 = 0;
    } // KEY  INDEX   AFFECTS a[row][column]
    // a11  0       rotation, rotationY, scaleX
    // a21  1       rotation, rotationY, scaleX
    // a31  2       rotationY, scaleX
    // a41  3       rotationY, scaleX
    // a12  4       rotation, skewX, rotationX, scaleY
    // a22  5       rotation, skewX, rotationX, scaleY
    // a32  6       rotationX, scaleY
    // a42  7       rotationX, scaleY
    // a13  8       rotationY, rotationX, scaleZ
    // a23  9       rotationY, rotationX, scaleZ
    // a33  10      rotationY, rotationX, scaleZ
    // a43  11      rotationY, rotationX, perspective, scaleZ
    // a14  12      x, zOrigin, svgOrigin
    // a24  13      y, zOrigin, svgOrigin
    // a34  14      z, zOrigin
    // a44  15
    // rotation: Math.atan2(a21, a11)
    // rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
    // rotationX: Math.atan2(a32, a33)


    a33 = 1;
    a13 = a23 = a31 = a32 = a41 = a42 = 0;
    a43 = perspective ? -1 / perspective : 0;
    zOrigin = t.zOrigin;
    min = 0.000001; //threshold below which browsers use scientific notation which won't work.

    comma = ",";
    zero = "0";
    angle = rotationY * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      a31 = -sin;
      a41 = a43 * -sin;
      a13 = a11 * sin;
      a23 = a21 * sin;
      a33 = cos;
      a43 *= cos;
      a11 *= cos;
      a21 *= cos;
    }

    angle = rotationX * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      t1 = a12 * cos + a13 * sin;
      t2 = a22 * cos + a23 * sin;
      a32 = a33 * sin;
      a42 = a43 * sin;
      a13 = a12 * -sin + a13 * cos;
      a23 = a22 * -sin + a23 * cos;
      a33 = a33 * cos;
      a43 = a43 * cos;
      a12 = t1;
      a22 = t2;
    }

    if (sz !== 1) {
      a13 *= sz;
      a23 *= sz;
      a33 *= sz;
      a43 *= sz;
    }

    if (sy !== 1) {
      a12 *= sy;
      a22 *= sy;
      a32 *= sy;
      a42 *= sy;
    }

    if (sx !== 1) {
      a11 *= sx;
      a21 *= sx;
      a31 *= sx;
      a41 *= sx;
    }

    if (zOrigin || isSVG) {
      if (zOrigin) {
        x += a13 * -zOrigin;
        y += a23 * -zOrigin;
        z += a33 * -zOrigin + zOrigin;
      }

      if (isSVG) {
        //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
        x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
        y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
      }

      if (x < min && x > -min) {
        x = zero;
      }

      if (y < min && y > -min) {
        y = zero;
      }

      if (z < min && z > -min) {
        z = 0; //don't use string because we calculate perspective later and need the number.
      }
    } //optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:


    transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
    transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31);
    transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22);

    if (rotationX || rotationY || sz !== 1) {
      //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
      transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13);
      transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma;
    } else {
      transform += ",0,0,0,0,1,0,";
    }

    transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")";
    style[_transformProp] = transform;
  };

  p = Transform.prototype;
  p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
  p.scaleX = p.scaleY = p.scaleZ = 1;

  _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
    parser: function parser(t, e, parsingProp, cssp, pt, plugin, vars) {
      if (cssp._lastParsedTransform === vars) {
        return pt;
      } //only need to parse the transform once, and only if the browser supports it.


      cssp._lastParsedTransform = vars;
      var scaleFunc = vars.scale && typeof vars.scale === "function" ? vars.scale : 0; //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).

      if (scaleFunc) {
        vars.scale = scaleFunc(_index, t);
      }

      var originalGSTransform = t._gsTransform,
          style = t.style,
          min = 0.000001,
          i = _transformProps.length,
          v = vars,
          endRotations = {},
          transformOriginString = "transformOrigin",
          m1 = _getTransform(t, _cs, true, v.parseTransform),
          orig = v.transform && (typeof v.transform === "function" ? v.transform(_index, _target) : v.transform),
          m2,
          copy,
          has3D,
          hasChange,
          dr,
          x,
          y,
          matrix,
          p;

      m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
      cssp._transform = m1;

      if ("rotationZ" in v) {
        v.rotation = v.rotationZ;
      }

      if (orig && typeof orig === "string" && _transformProp) {
        //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
        copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.

        copy[_transformProp] = orig;
        copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.

        copy.position = "absolute";

        if (orig.indexOf("%") !== -1) {
          //%-based translations will fail unless we set the width/height to match the original target...
          copy.width = _getStyle(t, "width");
          copy.height = _getStyle(t, "height");
        }

        _doc.body.appendChild(_tempDiv);

        m2 = _getTransform(_tempDiv, null, false);

        if (m1.skewType === "simple") {
          //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
          m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
        }

        if (m1.svg) {
          //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
          x = m1.xOrigin;
          y = m1.yOrigin;
          m2.x -= m1.xOffset;
          m2.y -= m1.yOffset;

          if (v.transformOrigin || v.svgOrigin) {
            //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
            orig = {};

            _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);

            x = orig.xOrigin;
            y = orig.yOrigin;
            m2.x -= orig.xOffset - m1.xOffset;
            m2.y -= orig.yOffset - m1.yOffset;
          }

          if (x || y) {
            matrix = _getMatrix(_tempDiv, true);
            m2.x -= x - (x * matrix[0] + y * matrix[2]);
            m2.y -= y - (x * matrix[1] + y * matrix[3]);
          }
        }

        _doc.body.removeChild(_tempDiv);

        if (!m2.perspective) {
          m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        }

        if (v.xPercent != null) {
          m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
        }

        if (v.yPercent != null) {
          m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
        }
      } else if (_typeof(v) === "object") {
        //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
        m2 = {
          scaleX: _parseVal(v.scaleX != null ? v.scaleX : v.scale, m1.scaleX),
          scaleY: _parseVal(v.scaleY != null ? v.scaleY : v.scale, m1.scaleY),
          scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
          x: _parseVal(v.x, m1.x),
          y: _parseVal(v.y, m1.y),
          z: _parseVal(v.z, m1.z),
          xPercent: _parseVal(v.xPercent, m1.xPercent),
          yPercent: _parseVal(v.yPercent, m1.yPercent),
          perspective: _parseVal(v.transformPerspective, m1.perspective)
        };
        dr = v.directionalRotation;

        if (dr != null) {
          if (_typeof(dr) === "object") {
            for (copy in dr) {
              v[copy] = dr[copy];
            }
          } else {
            v.rotation = dr;
          }
        }

        if (typeof v.x === "string" && v.x.indexOf("%") !== -1) {
          m2.x = 0;
          m2.xPercent = _parseVal(v.x, m1.xPercent);
        }

        if (typeof v.y === "string" && v.y.indexOf("%") !== -1) {
          m2.y = 0;
          m2.yPercent = _parseVal(v.y, m1.yPercent);
        }

        m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);

        if (_supports3D) {
          m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
          m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
        }

        m2.skewX = _parseAngle(v.skewX, m1.skewX);
        m2.skewY = _parseAngle(v.skewY, m1.skewY);
      }

      if (_supports3D && v.force3D != null) {
        m1.force3D = v.force3D;
        hasChange = true;
      }

      has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective;

      if (!has3D && v.scale != null) {
        m2.scaleZ = 1; //no need to tween scaleZ.
      }

      while (--i > -1) {
        p = _transformProps[i];
        orig = m2[p] - m1[p];

        if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
          hasChange = true;
          pt = new CSSPropTween(m1, p, m1[p], orig, pt);

          if (p in endRotations) {
            pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
          }

          pt.xs0 = 0; //ensures the value stays numeric in setRatio()

          pt.plugin = plugin;

          cssp._overwriteProps.push(pt.n);
        }
      }

      orig = typeof v.transformOrigin === "function" ? v.transformOrigin(_index, _target) : v.transformOrigin;

      if (m1.svg && (orig || v.svgOrigin)) {
        x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin

        y = m1.yOffset;

        _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);

        pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.

        pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);

        if (x !== m1.xOffset || y !== m1.yOffset) {
          pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, transformOriginString);
          pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, transformOriginString);
        }

        orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
      }

      if (orig || _supports3D && has3D && m1.zOrigin) {
        //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
        if (_transformProp) {
          hasChange = true;
          p = _transformOriginProp;

          if (!orig) {
            orig = (_getStyle(t, p, _cs, false, "50% 50%") + "").split(" ");
            orig = orig[0] + " " + orig[1] + " " + m1.zOrigin + "px";
          }

          orig += "";
          pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
          pt.b = style[p];
          pt.plugin = plugin;

          if (_supports3D) {
            copy = m1.zOrigin;
            orig = orig.split(" ");
            m1.zOrigin = (orig.length > 2 ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.

            pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!

            pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)

            pt.b = copy;
            pt.xs0 = pt.e = m1.zOrigin;
          } else {
            pt.xs0 = pt.e = orig;
          } //for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).

        } else {
          _parsePosition(orig + "", m1);
        }
      }

      if (hasChange) {
        cssp._transformType = !(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
      }

      if (scaleFunc) {
        vars.scale = scaleFunc;
      }

      return pt;
    },
    allowFunc: true,
    prefix: true
  });

  _registerComplexSpecialProp("boxShadow", {
    defaultValue: "0px 0px 0px 0px #999",
    prefix: true,
    color: true,
    multi: true,
    keyword: "inset"
  });

  _registerComplexSpecialProp("clipPath", {
    defaultValue: "inset(0%)",
    prefix: true,
    multi: true,
    formatter: _getFormatter("inset(0% 0% 0% 0%)", false, true)
  });

  _registerComplexSpecialProp("borderRadius", {
    defaultValue: "0px",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      e = this.format(e);
      var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
          style = t.style,
          ea1,
          i,
          es2,
          bs2,
          bs,
          es,
          bn,
          en,
          w,
          h,
          esfx,
          bsfx,
          rel,
          hn,
          vn,
          em;
      w = parseFloat(t.offsetWidth);
      h = parseFloat(t.offsetHeight);
      ea1 = e.split(" ");

      for (i = 0; i < props.length; i++) {
        //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
        if (this.p.indexOf("border")) {
          //older browsers used a prefix
          props[i] = _checkPropPrefix(props[i]);
        }

        bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");

        if (bs.indexOf(" ") !== -1) {
          bs2 = bs.split(" ");
          bs = bs2[0];
          bs2 = bs2[1];
        }

        es = es2 = ea1[i];
        bn = parseFloat(bs);
        bsfx = bs.substr((bn + "").length);
        rel = es.charAt(1) === "=";

        if (rel) {
          en = parseInt(es.charAt(0) + "1", 10);
          es = es.substr(2);
          en *= parseFloat(es);
          esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
        } else {
          en = parseFloat(es);
          esfx = es.substr((en + "").length);
        }

        if (esfx === "") {
          esfx = _suffixMap[p] || bsfx;
        }

        if (esfx !== bsfx) {
          hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.

          vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number

          if (esfx === "%") {
            bs = hn / w * 100 + "%";
            bs2 = vn / h * 100 + "%";
          } else if (esfx === "em") {
            em = _convertToPixels(t, "borderLeft", 1, "em");
            bs = hn / em + "em";
            bs2 = vn / em + "em";
          } else {
            bs = hn + "px";
            bs2 = vn + "px";
          }

          if (rel) {
            es = parseFloat(bs) + en + esfx;
            es2 = parseFloat(bs2) + en + esfx;
          }
        }

        pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
      }

      return pt;
    },
    prefix: true,
    formatter: _getFormatter("0px 0px 0px 0px", false, true)
  });

  _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
    defaultValue: "0px",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
    },
    prefix: true,
    formatter: _getFormatter("0px 0px", false, true)
  });

  _registerComplexSpecialProp("backgroundPosition", {
    defaultValue: "0 0",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var bp = "background-position",
          cs = _cs || _getComputedStyle(t, null),
          bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
          //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
      es = this.format(e),
          ba,
          ea,
          i,
          pct,
          overlap,
          src;

      if (bs.indexOf("%") !== -1 !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
        src = _getStyle(t, "backgroundImage").replace(_urlExp, "");

        if (src && src !== "none") {
          ba = bs.split(" ");
          ea = es.split(" ");

          _tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height


          i = 2;

          while (--i > -1) {
            bs = ba[i];
            pct = bs.indexOf("%") !== -1;

            if (pct !== (ea[i].indexOf("%") !== -1)) {
              overlap = i === 0 ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
              ba[i] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%";
            }
          }

          bs = ba.join(" ");
        }
      }

      return this.parseComplex(t.style, bs, es, pt, plugin);
    },
    formatter: _parsePosition
  });

  _registerComplexSpecialProp("backgroundSize", {
    defaultValue: "0 0",
    formatter: function formatter(v) {
      v += ""; //ensure it's a string

      return v.substr(0, 2) === "co" ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
    }
  });

  _registerComplexSpecialProp("perspective", {
    defaultValue: "0px",
    prefix: true
  });

  _registerComplexSpecialProp("perspectiveOrigin", {
    defaultValue: "50% 50%",
    prefix: true
  });

  _registerComplexSpecialProp("transformStyle", {
    prefix: true
  });

  _registerComplexSpecialProp("backfaceVisibility", {
    prefix: true
  });

  _registerComplexSpecialProp("userSelect", {
    prefix: true
  });

  _registerComplexSpecialProp("margin", {
    parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
  });

  _registerComplexSpecialProp("padding", {
    parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
  });

  _registerComplexSpecialProp("clip", {
    defaultValue: "rect(0px,0px,0px,0px)",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var b, cs, delim;

      if (_ieVers < 9) {
        //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
        cs = t.currentStyle;
        delim = _ieVers < 8 ? " " : ",";
        b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
        e = this.format(e).split(",").join(delim);
      } else {
        b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
        e = this.format(e);
      }

      return this.parseComplex(t.style, b, e, pt, plugin);
    }
  });

  _registerComplexSpecialProp("textShadow", {
    defaultValue: "0px 0px 0px #999",
    color: true,
    multi: true
  });

  _registerComplexSpecialProp("autoRound,strictUnits", {
    parser: function parser(t, e, p, cssp, pt) {
      return pt;
    }
  }); //just so that we can ignore these properties (not tween them)


  _registerComplexSpecialProp("border", {
    defaultValue: "0px solid #000",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
          end = this.format(e).split(" "),
          esfx = end[0].replace(_suffixExp, "");

      if (esfx !== "px") {
        //if we're animating to a non-px value, we need to convert the beginning width to that unit.
        bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx;
      }

      return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
    },
    color: true,
    formatter: function formatter(v) {
      var a = v.split(" ");
      return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
    }
  });

  _registerComplexSpecialProp("borderWidth", {
    parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
  }); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).


  _registerComplexSpecialProp("float,cssFloat,styleFloat", {
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var s = t.style,
          prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
      return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
    }
  }); //opacity-related


  var _setIEOpacityRatio = function _setIEOpacityRatio(v) {
    var t = this.t,
        //refers to the element's style property
    filters = t.filter || _getStyle(this.data, "filter") || "",
        val = this.s + this.c * v | 0,
        skip;

    if (val === 100) {
      //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
      if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
        t.removeAttribute("filter");
        skip = !_getStyle(this.data, "filter"); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
      } else {
        t.filter = filters.replace(_alphaFilterExp, "");
        skip = true;
      }
    }

    if (!skip) {
      if (this.xn1) {
        t.filter = filters = filters || "alpha(opacity=" + val + ")"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
      }

      if (filters.indexOf("pacity") === -1) {
        //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
        if (val !== 0 || !this.xn1) {
          //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
          t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
        }
      } else {
        t.filter = filters.replace(_opacityExp, "opacity=" + val);
      }
    }
  };

  _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
    defaultValue: "1",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
          style = t.style,
          isAutoAlpha = p === "autoAlpha";

      if (typeof e === "string" && e.charAt(1) === "=") {
        e = (e.charAt(0) === "-" ? -1 : 1) * parseFloat(e.substr(2)) + b;
      }

      if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) {
        //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
        b = 0;
      }

      if (_supportsOpacity) {
        pt = new CSSPropTween(style, "opacity", b, e - b, pt);
      } else {
        pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
        pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.

        style.zoom = 1; //helps correct an IE issue.

        pt.type = 2;
        pt.b = "alpha(opacity=" + pt.s + ")";
        pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
        pt.data = t;
        pt.plugin = plugin;
        pt.setRatio = _setIEOpacityRatio;
      }

      if (isAutoAlpha) {
        //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
        pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, b !== 0 ? "inherit" : "hidden", e === 0 ? "hidden" : "inherit");
        pt.xs0 = "inherit";

        cssp._overwriteProps.push(pt.n);

        cssp._overwriteProps.push(p);
      }

      return pt;
    }
  });

  var _removeProp = function _removeProp(s, p) {
    if (p) {
      if (s.removeProperty) {
        if (p.substr(0, 2) === "ms" || p.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          p = "-" + p;
        }

        s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        s.removeAttribute(p);
      }
    }
  },
      _setClassNameRatio = function _setClassNameRatio(v) {
    this.t._gsClassPT = this;

    if (v === 1 || v === 0) {
      this.t.setAttribute("class", v === 0 ? this.b : this.e);
      var mpt = this.data,
          //first MiniPropTween
      s = this.t.style;

      while (mpt) {
        if (!mpt.v) {
          _removeProp(s, mpt.p);
        } else {
          s[mpt.p] = mpt.v;
        }

        mpt = mpt._next;
      }

      if (v === 1 && this.t._gsClassPT === this) {
        this.t._gsClassPT = null;
      }
    } else if (this.t.getAttribute("class") !== this.e) {
      this.t.setAttribute("class", this.e);
    }
  };

  _registerComplexSpecialProp("className", {
    parser: function parser(t, e, p, cssp, pt, plugin, vars) {
      var b = t.getAttribute("class") || "",
          //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
      cssText = t.style.cssText,
          difData,
          bs,
          cnpt,
          cnptLookup,
          mpt;
      pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClassNameRatio;
      pt.pr = -11;
      _hasPriority = true;
      pt.b = b;
      bs = _getAllStyles(t, _cs); //if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)

      cnpt = t._gsClassPT;

      if (cnpt) {
        cnptLookup = {};
        mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.

        while (mpt) {
          cnptLookup[mpt.p] = 1;
          mpt = mpt._next;
        }

        cnpt.setRatio(1);
      }

      t._gsClassPT = pt;
      pt.e = e.charAt(1) !== "=" ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + (e.charAt(0) === "+" ? " " + e.substr(2) : "");
      t.setAttribute("class", pt.e);
      difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
      t.setAttribute("class", b);
      pt.data = difData.firstMPT;

      if (t.style.cssText !== cssText) {
        //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
        t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
      }

      pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)

      return pt;
    }
  });

  var _setClearPropsRatio = function _setClearPropsRatio(v) {
    if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
      //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
      var s = this.t.style,
          transformParse = _specialProps.transform.parse,
          a,
          p,
          i,
          clearTransform,
          transform;

      if (this.e === "all") {
        s.cssText = "";
        clearTransform = true;
      } else {
        a = this.e.split(" ").join("").split(",");
        i = a.length;

        while (--i > -1) {
          p = a[i];

          if (_specialProps[p]) {
            if (_specialProps[p].parse === transformParse) {
              clearTransform = true;
            } else {
              p = p === "transformOrigin" ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
            }
          }

          _removeProp(s, p);
        }
      }

      if (clearTransform) {
        _removeProp(s, _transformProp);

        transform = this.t._gsTransform;

        if (transform) {
          if (transform.svg) {
            this.t.removeAttribute("data-svg-origin");
            this.t.removeAttribute("transform");
          }

          delete this.t._gsTransform;
        }
      }
    }
  };

  _registerComplexSpecialProp("clearProps", {
    parser: function parser(t, e, p, cssp, pt) {
      pt = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClearPropsRatio;
      pt.e = e;
      pt.pr = -10;
      pt.data = cssp._tween;
      _hasPriority = true;
      return pt;
    }
  });

  p = "bezier,throwProps,physicsProps,physics2D".split(",");
  i = p.length;

  while (i--) {
    _registerPluginProp(p[i]);
  }

  p = CSSPlugin.prototype;
  p._firstPT = p._lastParsedTransform = p._transform = null; //gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.

  p._onInitTween = function (target, vars, tween, index) {
    if (!target.nodeType) {
      //css is only for dom elements
      return false;
    }

    this._target = _target = target;
    this._tween = tween;
    this._vars = vars;
    _index = index;
    _autoRound = vars.autoRound;
    _hasPriority = false;
    _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
    _cs = _getComputedStyle(target, "");
    _overwriteProps = this._overwriteProps;
    var style = target.style,
        v,
        pt,
        pt2,
        first,
        last,
        next,
        zIndex,
        tpt,
        threeD;
    if (_reqSafariFix) if (style.zIndex === "") {
      v = _getStyle(target, "zIndex", _cs);

      if (v === "auto" || v === "") {
        //corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
        this._addLazySet(style, "zIndex", 0);
      }
    }

    if (typeof vars === "string") {
      first = style.cssText;
      v = _getAllStyles(target, _cs);
      style.cssText = first + ";" + vars;
      v = _cssDif(target, v, _getAllStyles(target)).difs;

      if (!_supportsOpacity && _opacityValExp.test(vars)) {
        v.opacity = parseFloat(RegExp.$1);
      }

      vars = v;
      style.cssText = first;
    }

    if (vars.className) {
      //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
      this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
    } else {
      this._firstPT = pt = this.parse(target, vars, null);
    }

    if (this._transformType) {
      threeD = this._transformType === 3;

      if (!_transformProp) {
        style.zoom = 1; //helps correct an IE issue.
      } else if (_isSafari) {
        _reqSafariFix = true; //if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).

        if (style.zIndex === "") {
          zIndex = _getStyle(target, "zIndex", _cs);

          if (zIndex === "auto" || zIndex === "") {
            this._addLazySet(style, "zIndex", 0);
          }
        } //Setting WebkitBackfaceVisibility corrects 3 bugs:
        // 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
        // 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
        // 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
        //Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.


        if (_isSafariLT6) {
          this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
        }
      }

      pt2 = pt;

      while (pt2 && pt2._next) {
        pt2 = pt2._next;
      }

      tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);

      this._linkCSSP(tpt, null, pt2);

      tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
      tpt.data = this._transform || _getTransform(target, _cs, true);
      tpt.tween = tween;
      tpt.pr = -1; //ensures that the transforms get applied after the components are updated.

      _overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.

    }

    if (_hasPriority) {
      //reorders the linked list in order of pr (priority)
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      this._firstPT = first;
    }

    return true;
  };

  p.parse = function (target, vars, pt, plugin) {
    var style = target.style,
        p,
        sp,
        bn,
        en,
        bs,
        es,
        bsfx,
        esfx,
        isStr,
        rel;

    for (p in vars) {
      es = vars[p]; //ending value string

      sp = _specialProps[p]; //SpecialProp lookup.

      if (typeof es === "function" && !(sp && sp.allowFunc)) {
        es = es(_index, _target);
      }

      if (sp) {
        pt = sp.parse(target, es, p, this, pt, plugin, vars);
      } else if (p.substr(0, 2) === "--") {
        //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
        this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
        continue;
      } else {
        bs = _getStyle(target, p, _cs) + "";
        isStr = typeof es === "string";

        if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || isStr && _rgbhslExp.test(es)) {
          //Opera uses background: to define color sometimes in addition to backgroundColor:
          if (!isStr) {
            es = _parseColor(es);
            es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")";
          }

          pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);
        } else if (isStr && _complexExp.test(es)) {
          pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);
        } else {
          bn = parseFloat(bs);
          bsfx = bn || bn === 0 ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

          if (bs === "" || bs === "auto") {
            if (p === "width" || p === "height") {
              bn = _getDimension(target, p, _cs);
              bsfx = "px";
            } else if (p === "left" || p === "top") {
              bn = _calculateOffset(target, p, _cs);
              bsfx = "px";
            } else {
              bn = p !== "opacity" ? 0 : 1;
              bsfx = "";
            }
          }

          rel = isStr && es.charAt(1) === "=";

          if (rel) {
            en = parseInt(es.charAt(0) + "1", 10);
            es = es.substr(2);
            en *= parseFloat(es);
            esfx = es.replace(_suffixExp, "");
          } else {
            en = parseFloat(es);
            esfx = isStr ? es.replace(_suffixExp, "") : "";
          }

          if (esfx === "") {
            esfx = p in _suffixMap ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
          }

          es = en || en === 0 ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
          //if the beginning/ending suffixes don't match, normalize them...

          if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) {
            //note: if the beginning value (bn) is 0, we don't need to convert units!
            bn = _convertToPixels(target, p, bn, bsfx);

            if (esfx === "%") {
              bn /= _convertToPixels(target, p, 100, "%") / 100;

              if (vars.strictUnits !== true) {
                //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
                bs = bn + "%";
              }
            } else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
              bn /= _convertToPixels(target, p, 1, esfx); //otherwise convert to pixels.
            } else if (esfx !== "px") {
              en = _convertToPixels(target, p, en, esfx);
              esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
            }

            if (rel) if (en || en === 0) {
              es = en + bn + esfx; //the changes we made affect relative calculations, so adjust the end value here.
            }
          }

          if (rel) {
            en += bn;
          }

          if ((bn || bn === 0) && (en || en === 0)) {
            //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
            pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, _autoRound !== false && (esfx === "px" || p === "zIndex"), 0, bs, es);
            pt.xs0 = esfx; //DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
          } else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
            _log("invalid " + p + " tween value: " + vars[p]);
          } else {
            pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
            pt.xs0 = es === "none" && (p === "display" || p.indexOf("Style") !== -1) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
            //DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
          }
        }
      }

      if (plugin) if (pt && !pt.plugin) {
        pt.plugin = plugin;
      }
    }

    return pt;
  }; //gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.


  p.setRatio = function (v) {
    var pt = this._firstPT,
        min = 0.000001,
        val,
        str,
        i; //at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).

    if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
      while (pt) {
        if (pt.type !== 2) {
          if (pt.r && pt.type !== -1) {
            val = pt.r(pt.s + pt.c);

            if (!pt.type) {
              pt.t[pt.p] = val + pt.xs0;
            } else if (pt.type === 1) {
              //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
              i = pt.l;
              str = pt.xs0 + val + pt.xs1;

              for (i = 1; i < pt.l; i++) {
                str += pt["xn" + i] + pt["xs" + (i + 1)];
              }

              pt.t[pt.p] = str;
            }
          } else {
            pt.t[pt.p] = pt.e;
          }
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
      while (pt) {
        val = pt.c * v + pt.s;

        if (pt.r) {
          val = pt.r(val);
        } else if (val < min) if (val > -min) {
          val = 0;
        }

        if (!pt.type) {
          pt.t[pt.p] = val + pt.xs0;
        } else if (pt.type === 1) {
          //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
          i = pt.l;

          if (i === 2) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
          } else if (i === 3) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
          } else if (i === 4) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
          } else if (i === 5) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
          } else {
            str = pt.xs0 + val + pt.xs1;

            for (i = 1; i < pt.l; i++) {
              str += pt["xn" + i] + pt["xs" + (i + 1)];
            }

            pt.t[pt.p] = str;
          }
        } else if (pt.type === -1) {
          //non-tweening value
          pt.t[pt.p] = pt.xs0;
        } else if (pt.setRatio) {
          //custom setRatio() for things like SpecialProps, external plugins, etc.
          pt.setRatio(v);
        }

        pt = pt._next;
      } //if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).

    } else {
      while (pt) {
        if (pt.type !== 2) {
          pt.t[pt.p] = pt.b;
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    }
  };
  /**
   * @private
   * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
   * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
   * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
   * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
   * doesn't have any transform-related properties of its own. You can call this method as many times as you
   * want and it won't create duplicate CSSPropTweens.
   *
   * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
   */


  p._enableTransforms = function (threeD) {
    this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.

    this._transformType = !(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3) ? 3 : 2;
  };

  var lazySet = function lazySet(v) {
    this.t[this.p] = this.e;

    this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.

  };
  /** @private Gives us a way to set a value on the first render (and only the first render). **/


  p._addLazySet = function (t, p, v) {
    var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
    pt.e = v;
    pt.setRatio = lazySet;
    pt.data = this;
  };
  /** @private **/


  p._linkCSSP = function (pt, next, prev, remove) {
    if (pt) {
      if (next) {
        next._prev = pt;
      }

      if (pt._next) {
        pt._next._prev = pt._prev;
      }

      if (pt._prev) {
        pt._prev._next = pt._next;
      } else if (this._firstPT === pt) {
        this._firstPT = pt._next;
        remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
      }

      if (prev) {
        prev._next = pt;
      } else if (!remove && this._firstPT === null) {
        this._firstPT = pt;
      }

      pt._next = next;
      pt._prev = prev;
    }

    return pt;
  };

  p._mod = function (lookup) {
    var pt = this._firstPT;

    while (pt) {
      if (typeof lookup[pt.p] === "function") {
        //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
        pt.r = lookup[pt.p];
      }

      pt = pt._next;
    }
  }; //we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.


  p._kill = function (lookup) {
    var copy = lookup,
        pt,
        p,
        xfirst;

    if (lookup.autoAlpha || lookup.alpha) {
      copy = {};

      for (p in lookup) {
        //copy the lookup so that we're not changing the original which may be passed elsewhere.
        copy[p] = lookup[p];
      }

      copy.opacity = 1;

      if (copy.autoAlpha) {
        copy.visibility = 1;
      }
    }

    if (lookup.className && (pt = this._classNamePT)) {
      //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
      xfirst = pt.xfirst;

      if (xfirst && xfirst._prev) {
        this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev

      } else if (xfirst === this._firstPT) {
        this._firstPT = pt._next;
      }

      if (pt._next) {
        this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
      }

      this._classNamePT = null;
    }

    pt = this._firstPT;

    while (pt) {
      if (pt.plugin && pt.plugin !== p && pt.plugin._kill) {
        //for plugins that are registered with CSSPlugin, we should notify them of the kill.
        pt.plugin._kill(lookup);

        p = pt.plugin;
      }

      pt = pt._next;
    }

    return _TweenLite.TweenPlugin.prototype._kill.call(this, copy);
  }; //used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.


  var _getChildStyles = function _getChildStyles(e, props, targets) {
    var children, i, child, type;

    if (e.slice) {
      i = e.length;

      while (--i > -1) {
        _getChildStyles(e[i], props, targets);
      }

      return;
    }

    children = e.childNodes;
    i = children.length;

    while (--i > -1) {
      child = children[i];
      type = child.type;

      if (child.style) {
        props.push(_getAllStyles(child));

        if (targets) {
          targets.push(child);
        }
      }

      if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
        _getChildStyles(child, props, targets);
      }
    }
  };
  /**
   * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
   * and then compares the style properties of all the target's child elements at the tween's start and end, and
   * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
   * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
   * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
   * is because it creates entirely new tweens that may have completely different targets than the original tween,
   * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
   * and it would create other problems. For example:
   *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
   *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
   *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
   *
   * @param {Object} target object to be tweened
   * @param {number} Duration in seconds (or frames for frames-based tweens)
   * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
   * @return {Array} An array of TweenLite instances
   */


  CSSPlugin.cascadeTo = function (target, duration, vars) {
    var tween = _TweenLite.default.to(target, duration, vars),
        results = [tween],
        b = [],
        e = [],
        targets = [],
        _reservedProps = _TweenLite.default._internals.reservedProps,
        i,
        difs,
        p,
        from;

    target = tween._targets || tween.target;

    _getChildStyles(target, b, targets);

    tween.render(duration, true, true);

    _getChildStyles(target, e);

    tween.render(0, true, true);

    tween._enabled(true);

    i = targets.length;

    while (--i > -1) {
      difs = _cssDif(targets[i], b[i], e[i]);

      if (difs.firstMPT) {
        difs = difs.difs;

        for (p in vars) {
          if (_reservedProps[p]) {
            difs[p] = vars[p];
          }
        }

        from = {};

        for (p in difs) {
          from[p] = b[i][p];
        }

        results.push(_TweenLite.default.fromTo(targets[i], duration, from, difs));
      }
    }

    return results;
  };

  _TweenLite.TweenPlugin.activate([CSSPlugin]);

  return CSSPlugin;
}, true);

var CSSPlugin = _TweenLite.globals.CSSPlugin;
exports.default = exports.CSSPlugin = CSSPlugin;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/CSSRulePlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CSSRulePlugin = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*!
 * VERSION: 0.6.8
 * DATE: 2019-02-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
_TweenLite._gsScope._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin", "TweenLite", "plugins.CSSPlugin"], function () {
  /** @constructor **/
  var CSSRulePlugin = function CSSRulePlugin() {
    _TweenLite.TweenPlugin.call(this, "cssRule");

    this._overwriteProps.length = 0;
  },
      _doc = _TweenLite._gsScope.document,
      _superSetRatio = _CSSPlugin.default.prototype.setRatio,
      p = CSSRulePlugin.prototype = new _CSSPlugin.default();

  p._propName = "cssRule";
  p.constructor = CSSRulePlugin;
  CSSRulePlugin.version = "0.6.8";
  CSSRulePlugin.API = 2;
  /**
   * Searches the style sheets in the document for a particular selector like ".myClass" or "a" or "a:hover" or ":after" and
   * returns a reference to that style sheet (or an array of them in the case of a pseudo selector like ":after"). Then you
   * can animate the individual properties of the style sheet.
   *
   * @param {!string} selector a string describing the selector, like ".myClass" or "a" or "a:hover" or ":after"
   * @return a reference to the style sheet (or an array of them in the case of a pseudo selector). If none was found, null is returned (or an empty array for a pseudo selector)
   */

  CSSRulePlugin.getRule = function (selector) {
    var ruleProp = _doc.all ? "rules" : "cssRules",
        ss = _doc.styleSheets,
        i = ss.length,
        pseudo = selector.charAt(0) === ":",
        j,
        curSS,
        cs,
        a;
    selector = (pseudo ? "" : ",") + selector.split("::").join(":").toLowerCase() + ","; //note: old versions of IE report tag name selectors as upper case, so we just change everything to lowercase.

    if (pseudo) {
      a = [];
    }

    while (--i > -1) {
      //Firefox may throw insecure operation errors when css is loaded from other domains, so try/catch.
      try {
        curSS = ss[i][ruleProp];

        if (!curSS) {
          continue;
        }

        j = curSS.length;
      } catch (e) {
        console.log(e);
        continue;
      }

      while (--j > -1) {
        cs = curSS[j];

        if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) {
          //note: IE adds an extra ":" to pseudo selectors, so .myClass:after becomes .myClass::after, so we need to strip the extra one out.
          if (pseudo) {
            a.push(cs.style);
          } else {
            return cs.style;
          }
        }
      }
    }

    return a;
  }; // @private gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.


  p._onInitTween = function (target, value, tween) {
    if (target.cssText === undefined) {
      return false;
    }

    var div = target._gsProxy = target._gsProxy || _doc.createElement("div");

    this._ss = target;
    this._proxy = div.style;
    div.style.cssText = target.cssText;

    _CSSPlugin.default.prototype._onInitTween.call(this, div, value, tween); //we just offload all the work to the regular CSSPlugin and then copy the cssText back over to the rule in the setRatio() method. This allows us to have all of the updates to CSSPlugin automatically flow through to CSSRulePlugin instead of having to maintain both


    return true;
  }; // @private gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.


  p.setRatio = function (v) {
    _superSetRatio.call(this, v);

    var proxy = this._proxy,
        ss = this._ss,
        i = proxy.length;

    while (--i > -1) {
      ss[proxy[i]] = proxy[proxy[i]];
    }
  };

  _TweenLite.TweenPlugin.activate([CSSRulePlugin]);

  return CSSRulePlugin;
}, true);

var CSSRulePlugin = _TweenLite.globals.CSSRulePlugin;
exports.default = exports.CSSRulePlugin = CSSRulePlugin;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js"}],"../node_modules/gsap/DirectionalRotationPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DirectionalRotationPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DirectionalRotationPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "directionalRotation",
  version: "0.3.1",
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    if (_typeof(value) !== "object") {
      value = {
        rotation: value
      };
    }

    this.finals = {};
    var cap = value.useRadians === true ? Math.PI * 2 : 360,
        min = 0.000001,
        p,
        v,
        start,
        end,
        dif,
        split;

    for (p in value) {
      if (p !== "useRadians") {
        end = value[p];

        if (typeof end === "function") {
          end = end(index, target);
        }

        split = (end + "").split("_");
        v = split[0];
        start = parseFloat(typeof target[p] !== "function" ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]());
        end = this.finals[p] = typeof v === "string" && v.charAt(1) === "=" ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
        dif = end - start;

        if (split.length) {
          v = split.join("_");

          if (v.indexOf("short") !== -1) {
            dif = dif % cap;

            if (dif !== dif % (cap / 2)) {
              dif = dif < 0 ? dif + cap : dif - cap;
            }
          }

          if (v.indexOf("_cw") !== -1 && dif < 0) {
            dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
          } else if (v.indexOf("ccw") !== -1 && dif > 0) {
            dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
          }
        }

        if (dif > min || dif < -min) {
          this._addTween(target, p, start, start + dif, p);

          this._overwriteProps.push(p);
        }
      }
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(ratio) {
    var pt;

    if (ratio !== 1) {
      this._super.setRatio.call(this, ratio);
    } else {
      pt = this._firstPT;

      while (pt) {
        if (pt.f) {
          pt.t[pt.p](this.finals[pt.p]);
        } else {
          pt.t[pt.p] = this.finals[pt.p];
        }

        pt = pt._next;
      }
    }
  }
});

exports.default = exports.DirectionalRotationPlugin = DirectionalRotationPlugin;
DirectionalRotationPlugin._autoCSS = true;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/EaselPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EaselPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.2.2
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
var _numExp = /(\d|\.)+/g,
    _ColorFilter,
    _ColorMatrixFilter,
    _colorProps = ["redMultiplier", "greenMultiplier", "blueMultiplier", "alphaMultiplier", "redOffset", "greenOffset", "blueOffset", "alphaOffset"],
    _colorLookup = {
  aqua: [0, 255, 255],
  lime: [0, 255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  white: [255, 255, 255],
  fuchsia: [255, 0, 255],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [255, 0, 0],
  pink: [255, 192, 203],
  cyan: [0, 255, 255],
  transparent: [255, 255, 255, 0]
},
    _parseColor = function _parseColor(color) {
  if (color === "" || color == null || color === "none") {
    return _colorLookup.transparent;
  } else if (_colorLookup[color]) {
    return _colorLookup[color];
  } else if (typeof color === "number") {
    return [color >> 16, color >> 8 & 255, color & 255];
  } else if (color.charAt(0) === "#") {
    if (color.length === 4) {
      //for shorthand like #9F0
      color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
    }

    color = parseInt(color.substr(1), 16);
    return [color >> 16, color >> 8 & 255, color & 255];
  }

  return color.match(_numExp) || _colorLookup.transparent;
},
    _parseColorFilter = function _parseColorFilter(t, v, pg) {
  if (!_ColorFilter) {
    _ColorFilter = _TweenLite._gsScope.ColorFilter || _TweenLite._gsScope.createjs.ColorFilter;

    if (!_ColorFilter) {
      throw "EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.";
    }
  }

  var filters = t.filters || [],
      i = filters.length,
      c,
      s,
      e,
      a,
      p;

  while (--i > -1) {
    if (filters[i] instanceof _ColorFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorFilter();
    filters.push(s);
    t.filters = filters;
  }

  e = s.clone();

  if (v.tint != null) {
    c = _parseColor(v.tint);
    a = v.tintAmount != null ? Number(v.tintAmount) : 1;
    e.redOffset = Number(c[0]) * a;
    e.greenOffset = Number(c[1]) * a;
    e.blueOffset = Number(c[2]) * a;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
  } else {
    for (p in v) {
      if (p !== "exposure") if (p !== "brightness") {
        e[p] = Number(v[p]);
      }
    }
  }

  if (v.exposure != null) {
    e.redOffset = e.greenOffset = e.blueOffset = 255 * (Number(v.exposure) - 1);
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
  } else if (v.brightness != null) {
    a = Number(v.brightness) - 1;
    e.redOffset = e.greenOffset = e.blueOffset = a > 0 ? a * 255 : 0;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
  }

  i = 8;

  while (--i > -1) {
    p = _colorProps[i];

    if (s[p] !== e[p]) {
      pg._addTween(s, p, s[p], e[p], "easel_colorFilter");
    }
  }

  pg._overwriteProps.push("easel_colorFilter");

  if (!t.cacheID) {
    throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t;
  }
},
    _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  if (!(m instanceof Array) || !(m2 instanceof Array)) {
    return m2;
  }

  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  if (isNaN(n)) {
    return m;
  }

  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  if (isNaN(amount)) {
    amount = 1;
  }

  var c = _parseColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;

  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n += 0.01;
  return _applyMatrix([n, 0, 0, 0, 128 * (1 - n), 0, n, 0, 0, 128 * (1 - n), 0, 0, n, 0, 128 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(t, v, pg) {
  if (!_ColorMatrixFilter) {
    _ColorMatrixFilter = _TweenLite._gsScope.ColorMatrixFilter || _TweenLite._gsScope.createjs.ColorMatrixFilter;

    if (!_ColorMatrixFilter) {
      throw "EaselPlugin error: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.";
    }
  }

  var filters = t.filters || [],
      i = filters.length,
      matrix,
      startMatrix,
      s;

  while (--i > -1) {
    if (filters[i] instanceof _ColorMatrixFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorMatrixFilter(_idMatrix.slice());
    filters.push(s);
    t.filters = filters;
  }

  startMatrix = s.matrix;
  matrix = _idMatrix.slice();

  if (v.colorize != null) {
    matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
  }

  if (v.contrast != null) {
    matrix = _setContrast(matrix, Number(v.contrast));
  }

  if (v.hue != null) {
    matrix = _setHue(matrix, Number(v.hue));
  }

  if (v.saturation != null) {
    matrix = _setSaturation(matrix, Number(v.saturation));
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "easel_colorMatrixFilter");
    }
  }

  pg._overwriteProps.push("easel_colorMatrixFilter");

  if (!t.cacheID) {
    throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t;
  }

  pg._matrix = startMatrix;
};

var EaselPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "easel",
  priority: -1,
  version: "0.2.2",
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    this._target = target;
    var p, pt, tint, colorMatrix, end, labels, i;

    for (p in value) {
      end = value[p];

      if (typeof end === "function") {
        end = end(index, target);
      }

      if (p === "colorFilter" || p === "tint" || p === "tintAmount" || p === "exposure" || p === "brightness") {
        if (!tint) {
          _parseColorFilter(target, value.colorFilter || value, this);

          tint = true;
        }
      } else if (p === "saturation" || p === "contrast" || p === "hue" || p === "colorize" || p === "colorizeAmount") {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);

          colorMatrix = true;
        }
      } else if (p === "frame") {
        this._firstPT = pt = {
          _next: this._firstPT,
          t: target,
          p: "gotoAndStop",
          s: target.currentFrame,
          f: true,
          n: "frame",
          pr: 0,
          type: 0,
          m: Math.round
        };

        if (typeof end === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
          for (i = 0; i < labels.length; i++) {
            if (labels[i].label === end) {
              end = labels[i].position;
            }
          }
        }

        pt.c = typeof end === "number" ? end - pt.s : parseFloat((end + "").split("=").join(""));

        if (pt._next) {
          pt._next._prev = pt;
        }
      } else if (target[p] != null) {
        this._firstPT = pt = {
          _next: this._firstPT,
          t: target,
          p: p,
          f: typeof target[p] === "function",
          n: p,
          pr: 0,
          type: 0
        };
        pt.s = !pt.f ? parseFloat(target[p]) : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]();
        pt.c = typeof end === "number" ? end - pt.s : typeof end === "string" ? parseFloat(end.split("=").join("")) : 0;

        if (pt._next) {
          pt._next._prev = pt;
        }
      }
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(v) {
    var pt = this._firstPT,
        min = 0.000001,
        val;

    while (pt) {
      val = pt.c * v + pt.s;

      if (pt.m) {
        val = pt.m(val, pt.t);
      } else if (val < min && val > -min) {
        val = 0;
      }

      if (pt.f) {
        pt.t[pt.p](val);
      } else {
        pt.t[pt.p] = val;
      }

      pt = pt._next;
    }

    if (this._target.cacheID) {
      this._target.updateCache();
    }
  }
});

exports.default = exports.EaselPlugin = EaselPlugin;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/EndArrayPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EndArrayPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.1.3
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
var EndArrayPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "endArray",
  API: 2,
  version: "0.1.3",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween) {
    var i = value.length,
        a = this.a = [],
        start,
        end;
    this.target = target;
    this._mod = 0;

    if (!i) {
      return false;
    }

    while (--i > -1) {
      start = target[i];
      end = value[i];

      if (start !== end) {
        a.push({
          i: i,
          s: start,
          c: end - start
        });
      }
    }

    return true;
  },
  mod: function mod(lookup) {
    if (typeof lookup.endArray === "function") {
      this._mod = lookup.endArray;
    }
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(ratio) {
    var target = this.target,
        a = this.a,
        i = a.length,
        mod = this._mod,
        e,
        val;

    if (mod) {
      while (--i > -1) {
        e = a[i];
        target[e.i] = mod(e.s + e.c * ratio, target);
      }
    } else {
      while (--i > -1) {
        e = a[i];
        val = e.s + e.c * ratio;
        target[e.i] = val < 0.000001 && val > -0.000001 ? 0 : val;
      }
    }
  }
});

exports.default = exports.EndArrayPlugin = EndArrayPlugin;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/ModifiersPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModifiersPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _cssRatioSetter = function _cssRatioSetter(pt, cssp, mod) {
  //Takes an individual CSSPropTween and converts it into a type:2 that has a setRatio that does everything the regular CSSPlugin.setRatio() method does but applying the mod() too. We do this to keep the main CSSPlugin.setRatio() as fast as possible (the vast majority of times, no mod() will be necessary)
  var type = pt.type,
      oldSetRatio = pt.setRatio,
      tween = cssp._tween,
      target = cssp._target;
  pt.type = 2;
  pt.m = mod;

  pt.setRatio = function (v) {
    var min = 0.000001,
        val,
        str,
        i;

    if (v === 1 && (tween._time === tween._duration || tween._time === 0)) {
      if (type !== 2) {
        if (pt.r && type !== -1) {
          val = Math.round(pt.s + pt.c);

          if (!type) {
            pt.t[pt.p] = mod.call(tween, val + pt.xs0, target, tween);
          } else if (type === 1) {
            str = pt.xs0 + val + pt.xs1;

            for (i = 1; i < pt.l; i++) {
              str += pt["xn" + i] + pt["xs" + (i + 1)];
            }

            pt.t[pt.p] = mod.call(tween, str, target, tween);
          }
        } else {
          pt.t[pt.p] = mod.call(tween, pt.e, target, tween);
        }
      } else {
        oldSetRatio.call(pt, v);
      }
    } else if (v || !(tween._time === tween._duration || tween._time === 0) || tween._rawPrevTime === -0.000001) {
      val = pt.c * v + pt.s;

      if (pt.r) {
        val = Math.round(val);
      } else if (val < min) if (val > -min) {
        val = 0;
      }

      if (!type) {
        pt.t[pt.p] = mod.call(tween, val + pt.xs0, target, tween);
      } else if (type === 1) {
        str = pt.xs0 + val + pt.xs1;

        for (i = 1; i < pt.l; i++) {
          str += pt["xn" + i] + pt["xs" + (i + 1)];
        }

        pt.t[pt.p] = mod.call(tween, str, target, tween);
      } else if (type === -1) {
        //non-tweening value
        pt.t[pt.p] = mod.call(tween, pt.xs0, target, tween);
      } else if (oldSetRatio) {
        oldSetRatio.call(pt, v);
      }
    } else {
      if (type !== 2) {
        pt.t[pt.p] = mod.call(tween, pt.b, target, tween);
      } else {
        oldSetRatio.call(pt, v);
      }
    }
  };
},
    _modCSS = function _modCSS(lookup, cssp) {
  var pt = cssp._firstPT,
      hasBezier = lookup.rotation && cssp._overwriteProps.join("").indexOf("bezier") !== -1; //when a Bezier tween is applying autoRotation, it's a very special case we need to handle differently.

  if (lookup.scale) {
    lookup.scaleX = lookup.scaleY = lookup.scale;
  } else if (lookup.rotationZ) {
    lookup.rotation = lookup.rotationZ;
  }

  while (pt) {
    if (typeof lookup[pt.p] === "function") {
      _cssRatioSetter(pt, cssp, lookup[pt.p]);
    } else if (hasBezier && pt.n === "bezier" && pt.plugin._overwriteProps.join("").indexOf("rotation") !== -1) {
      pt.data.mod = lookup.rotation;
    }

    pt = pt._next;
  }
},
    ModifiersPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "modifiers",
  version: "0.0.4",
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween) {
    this._tween = tween;
    this._vars = value;
    return true;
  },
  initAll: function initAll() {
    var tween = this._tween,
        lookup = this._vars,
        mpt = this,
        pt = tween._firstPT,
        val,
        next; //initAll() gets called for each and every ModifiersPlugin instance in a tween, so if there are multiple targets, there will be multiple instances. Since we're ripping through the whole tween (and all the PropTweens), we only need to run this code ONCE. So we're setting a toggle on the first PropTween that just tells us if we've done it already. We don't set it on the tween instance because if it gets invalidated, we don't want to have to track this property and reset it. PropTweens get blown away when a tween is invalidated.

    if (pt._modInitted) {
      return false;
    } else {
      pt._modInitted = 1;
    }

    while (pt) {
      next = pt._next; //record here, because it may get removed

      val = lookup[pt.n];

      if (pt.pg) {
        if (pt.t._propName === "css") {
          //handle CSSPlugin uniquely (for performance, due to the fact that the values almost always are a concatenation of numbers and strings, like suffixes, and we don't want to slow down the regular CSSPlugin setRatio() performance with conditional checks for if the value needs to be modded, so we pull any modding prop out and change it to a type:2 one that simply calls a setRatio() method where we encapsulate the modding and update all together. That way, it says in the main CSSProp linked list and just has some custom logic applied to it inside its setRatio())
          _modCSS(lookup, pt.t);
        } else if (pt.t !== mpt) {
          //don't run modProps on modProps :)
          val = lookup[pt.t._propName];
          pt.t._tween = tween;

          pt.t._mod(_typeof(val) === "object" ? val : lookup);
        }
      } else if (typeof val === "function") {
        if (pt.f === 2 && pt.t) {
          //a blob (text containing multiple numeric values)
          pt.t._applyPT.m = val;
          pt.t._tween = tween;
        } else {
          this._add(pt.t, pt.p, pt.s, pt.c, val); //remove from linked list


          if (next) {
            next._prev = pt._prev;
          }

          if (pt._prev) {
            pt._prev._next = next;
          } else if (tween._firstPT === pt) {
            tween._firstPT = next;
          }

          pt._next = pt._prev = null;
          tween._propLookup[pt.n] = mpt;
        }
      }

      pt = next;
    }

    return false;
  }
}),
    p = ModifiersPlugin.prototype;

exports.default = exports.ModifiersPlugin = ModifiersPlugin;

p._add = function (target, p, s, c, mod) {
  this._addTween(target, p, s, s + c, p, mod);

  this._overwriteProps.push(p);
};

p = _TweenLite._gsScope._gsDefine.globals.TweenLite.version.split(".");

if (Number(p[0]) <= 1 && Number(p[1]) < 19 && _TweenLite._gsScope.console) {
  console.log("ModifiersPlugin requires GSAP 1.19.0 or later.");
}
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/PixiPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PixiPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.3.0
 * DATE: 2019-05-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * PixiPlugin is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
var _numExp = /(\d|\.)+/g,
    _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
    _colorLookup = {
  aqua: [0, 255, 255],
  lime: [0, 255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  white: [255, 255, 255],
  fuchsia: [255, 0, 255],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [255, 0, 0],
  pink: [255, 192, 203],
  cyan: [0, 255, 255],
  transparent: [255, 255, 255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
},

/**
 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if "format" parameter is "hsl", it will populate the array with hue, saturation, and lightness values. Or if "format" is "number", it'll return a number like 0xFF0000 instead of an array. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
 * @param {(string)} format If "hsl", an hsl() or hsla() value will be returned instead of rgb() or rgba(). Or if "number", then a numeric value will be returned, like 0xFF0000. Default is rgb.
 * @return {(array|number)} An array containing red, green, and blue (and optionally alpha) in that order, or if the format parameter was "hsl", the array will contain hue, saturation and lightness (and optionally alpha) in that order. Or if "format" is defined as "number", it'll return a number like 0xFF0000. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and "format" is "hsl".
 */
_parseColor = function _parseColor(v, format) {
  var toHSL = format === "hsl",
      a,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!v) {
    a = _colorLookup.black;
  } else if (typeof v === "number") {
    a = [v >> 16, v >> 8 & 255, v & 255];
  } else {
    if (v.charAt(v.length - 1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length === 4) {
        //for shorthand like #9F0
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b;
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_numExp);

      if (!toHSL) {
        h = Number(a[0]) % 360 / 360;
        s = Number(a[1]) / 100;
        l = Number(a[2]) / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;

        if (a.length > 3) {
          a[3] = Number(v[3]);
        }

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (v.indexOf("=") !== -1) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        return v.match(_relNumExp);
      }
    } else {
      a = v.match(_numExp) || _colorLookup.transparent;
    }

    a[0] = Number(a[0]);
    a[1] = Number(a[1]);
    a[2] = Number(a[2]);

    if (a.length > 3) {
      a[3] = Number(a[3]);
    }
  }

  if (toHSL && !wasHSL) {
    r = a[0] / 255;
    g = a[1] / 255;
    b = a[2] / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = h + 0.5 | 0;
    a[1] = s * 100 + 0.5 | 0;
    a[2] = l * 100 + 0.5 | 0;
  }

  return format === "number" ? a[0] << 16 | a[1] << 8 | a[2] : a;
},
    _formatColors = function _formatColors(s, toHSL) {
  var colors = (s + "").match(_colorExp) || [],
      charIndex = 0,
      parsed = "",
      i,
      color,
      temp;

  if (!colors.length) {
    return s;
  }

  for (i = 0; i < colors.length; i++) {
    color = colors[i];
    temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
    charIndex += temp.length + color.length;
    color = _parseColor(color, toHSL ? "hsl" : "rgb");

    if (color.length === 3) {
      color.push(1);
    }

    parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
  }

  return parsed + s.substr(charIndex);
},
    _colorStringFilter,
    TweenLite = (_TweenLite._gsScope.GreenSockGlobals || _TweenLite._gsScope).TweenLite,
    _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
    //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.
_idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  var c = _parseColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;

  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  return _applyMatrix([n, 0, 0, 0, 0.5 * (1 - n), 0, n, 0, 0, 0.5 * (1 - n), 0, 0, n, 0, 0.5 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _getFilter = function _getFilter(t, type) {
  var filterClass = _TweenLite._gsScope.PIXI.filters[type],
      filters = t.filters || [],
      i = filters.length,
      filter;

  if (!filterClass) {
    throw "PixiPlugin error: " + type + " isn't present.";
  }

  while (--i > -1) {
    if (filters[i] instanceof filterClass) {
      return filters[i];
    }
  }

  filter = new filterClass();

  if (type === "BlurFilter") {
    filter.blur = 0;
  }

  filters.push(filter);
  t.filters = filters;
  return filter;
},
    _addColorMatrixFilterCacheTween = function _addColorMatrixFilterCacheTween(p, pg, cache, vars) {
  //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
  pg._addTween(cache, p, cache[p], vars[p], p);

  pg._overwriteProps.push(p);
},
    _applyBrightnessToMatrix = function _applyBrightnessToMatrix(brightness, matrix) {
  var temp = new _TweenLite._gsScope.PIXI.filters.ColorMatrixFilter();
  temp.matrix = matrix;
  temp.brightness(brightness, true);
  return temp.matrix;
},
    _CMFdefaults = {
  contrast: 1,
  saturation: 1,
  colorizeAmount: 0,
  colorize: "rgb(255,255,255)",
  hue: 0,
  brightness: 1
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(t, v, pg) {
  var filter = _getFilter(t, "ColorMatrixFilter"),
      cache = t._gsColorMatrixFilter = t._gsColorMatrixFilter || {
    contrast: 1,
    saturation: 1,
    colorizeAmount: 0,
    colorize: "rgb(255,255,255)",
    hue: 0,
    brightness: 1
  },
      combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
      i,
      matrix,
      startMatrix;

  startMatrix = filter.matrix;

  if (v.resolution) {
    filter.resolution = v.resolution;
  }

  if (v.matrix && v.matrix.length === startMatrix.length) {
    matrix = v.matrix;

    if (cache.contrast !== 1) {
      _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
    }

    if (cache.hue) {
      _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
    }

    if (cache.brightness !== 1) {
      _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
    }

    if (cache.colorizeAmount) {
      _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
    }

    if (cache.saturation !== 1) {
      _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
    }
  } else {
    matrix = _idMatrix.slice();

    if (v.contrast != null) {
      matrix = _setContrast(matrix, Number(v.contrast));

      _addColorMatrixFilterCacheTween("contrast", pg, cache, v);
    } else if (cache.contrast !== 1) {
      if (combine) {
        matrix = _setContrast(matrix, cache.contrast);
      } else {
        _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
      }
    }

    if (v.hue != null) {
      matrix = _setHue(matrix, Number(v.hue));

      _addColorMatrixFilterCacheTween("hue", pg, cache, v);
    } else if (cache.hue) {
      if (combine) {
        matrix = _setHue(matrix, cache.hue);
      } else {
        _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
      }
    }

    if (v.brightness != null) {
      matrix = _applyBrightnessToMatrix(Number(v.brightness), matrix);

      _addColorMatrixFilterCacheTween("brightness", pg, cache, v);
    } else if (cache.brightness !== 1) {
      if (combine) {
        matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
      } else {
        _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
      }
    }

    if (v.colorize != null) {
      v.colorizeAmount = "colorizeAmount" in v ? Number(v.colorizeAmount) : 1;
      matrix = _colorize(matrix, v.colorize, v.colorizeAmount);

      _addColorMatrixFilterCacheTween("colorize", pg, cache, v);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
    } else if (cache.colorizeAmount) {
      if (combine) {
        matrix = _colorize(matrix, cache.colorize, cache.colorizeAmount);
      } else {
        _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
      }
    }

    if (v.saturation != null) {
      matrix = _setSaturation(matrix, Number(v.saturation));

      _addColorMatrixFilterCacheTween("saturation", pg, cache, v);
    } else if (cache.saturation !== 1) {
      if (combine) {
        matrix = _setSaturation(matrix, cache.saturation);
      } else {
        _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
      }
    }
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
    }
  }

  pg._overwriteProps.push("colorMatrixFilter");
},
    _addColorTween = function _addColorTween(target, p, value, colorSetter, plugin) {
  var pt = colorSetter._firstPT = {
    _next: colorSetter._firstPT,
    t: target,
    p: p,
    proxy: {},
    f: typeof target[p] === "function"
  };
  pt.proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]()).join(",") + ")";

  plugin._addTween(pt.proxy, p, "get", typeof value === "number" ? "rgb(" + _parseColor(value, false).join(",") + ")" : value, p, null, null, _colorStringFilter);
},
    //to improve performance, when a color is sensed, we hijack the setRatio() method of the plugin instance with a new function that this method spits back. This is a special method that handles parsing color values on-the-fly and turns them into numeric values which PixiJS requires. In other words, instead of "rgb(255, 0, 0)", PixiJS wants 0xFF0000. This also works with hsl() values.
_buildColorSetter = function _buildColorSetter(tween, plugin) {
  var setRatio = plugin.setRatio,
      //save the original (super) setRatio() function
  func = function func(v) {
    var pt = func._firstPT,
        val;
    setRatio.call(plugin, v);

    while (pt) {
      val = _parseColor(pt.proxy[pt.p], "number");

      if (pt.f) {
        pt.t[pt.p](val);
      } else {
        pt.t[pt.p] = val;
      }

      pt = pt._next;
    }

    if (func.graphics) {
      //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
      func.graphics.dirty++;
      func.graphics.clearDirty++;
    }
  };

  plugin.setRatio = func;
  return func;
},
    _colorProps = {
  tint: 1,
  lineColor: 1,
  fillColor: 1
},
    _xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
    _contexts = {
  x: "position",
  y: "position",
  tileX: "tilePosition",
  tileY: "tilePosition"
},
    _colorMatrixFilterProps = {
  colorMatrixFilter: 1,
  saturation: 1,
  contrast: 1,
  hue: 1,
  colorize: 1,
  colorizeAmount: 1,
  brightness: 1,
  combineCMF: 1
},
    _DEG2RAD = Math.PI / 180,
    _degreesToRadians = function _degreesToRadians(value) {
  return typeof value === "string" && value.charAt(1) === "=" ? value.substr(0, 2) + parseFloat(value.substr(2)) * _DEG2RAD : value * _DEG2RAD;
},
    i,
    p; //context setup...


for (i = 0; i < _xyContexts.length; i++) {
  p = _xyContexts[i];
  _contexts[p + "X"] = p;
  _contexts[p + "Y"] = p;
} //color parsing setup...


for (p in _colorLookup) {
  _colorExp += "|" + p + "\\b";
}

_colorExp = new RegExp(_colorExp + ")", "gi");

_colorStringFilter = function _colorStringFilter(a) {
  var combined = a[0] + " " + a[1],
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
    a[0] = _formatColors(a[0], toHSL);
    a[1] = _formatColors(a[1], toHSL);
  }
};

if (!TweenLite.defaultStringFilter) {
  TweenLite.defaultStringFilter = _colorStringFilter;
}

var PixiPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "pixi",
  priority: 0,
  API: 2,
  global: true,
  version: "0.3.0",
  init: function init(target, values, tween, index) {
    if (!target instanceof _TweenLite._gsScope.PIXI.DisplayObject) {
      return false;
    }

    var isV4 = _TweenLite._gsScope.PIXI.VERSION.charAt(0) === "4",
        context,
        axis,
        value,
        colorMatrix,
        filter,
        p,
        padding,
        colorSetter,
        i,
        data,
        pt;

    for (p in values) {
      context = _contexts[p];
      value = values[p];

      if (typeof value === "function") {
        value = value(index || 0, target);
      }

      if (context) {
        axis = p.charAt(p.length - 1).toLowerCase().indexOf("x") !== -1 ? "x" : "y";

        this._addTween(target[context], axis, target[context][axis], context === "skew" ? _degreesToRadians(value) : value, p);
      } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
        this._addTween(target[p], "x", target[p].x, value, p + "X");

        this._addTween(target[p], "y", target[p].y, value, p + "Y");
      } else if (p === "rotation") {
        //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
        this._addTween(target, p, target.rotation, _degreesToRadians(value), p);
      } else if (_colorMatrixFilterProps[p]) {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, values.colorMatrixFilter || values, this);

          colorMatrix = true;
        }
      } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
        filter = _getFilter(target, "BlurFilter");

        this._addTween(filter, p, filter[p], value, p);

        if (values.blurPadding !== 0) {
          padding = values.blurPadding || Math.max(filter[p], value) * 2;
          i = target.filters.length;

          while (--i > -1) {
            target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
          }
        }
      } else if (_colorProps[p]) {
        if (!colorSetter) {
          colorSetter = _buildColorSetter(tween, this);
        }

        if ((p === "lineColor" || p === "fillColor") && target instanceof _TweenLite._gsScope.PIXI.Graphics) {
          data = (target.geometry || target).graphicsData; //"geometry" was introduced in PIXI version 5

          i = data.length;

          while (--i > -1) {
            _addColorTween(isV4 ? data[i] : data[i][p.substr(0, 4) + "Style"], isV4 ? p : "color", value, colorSetter, this);
          }

          colorSetter.graphics = target.geometry || target;
        } else {
          _addColorTween(target, p, value, colorSetter, this);
        }
      } else if (p === "autoAlpha") {
        this._firstPT = pt = {
          t: {
            setRatio: function setRatio() {
              target.visible = !!target.alpha;
            }
          },
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          pg: 0,
          n: "visible",
          pr: 0,
          m: 0,
          _next: this._firstPT
        };

        if (pt._next) {
          pt._next._prev = pt;
        }

        this._addTween(target, "alpha", target.alpha, value, "alpha");

        this._overwriteProps.push("alpha", "visible");
      } else {
        this._addTween(target, p, target[p], value, p);
      }

      this._overwriteProps.push(p);
    }

    return true;
  }
});

exports.default = exports.PixiPlugin = PixiPlugin;
PixiPlugin.colorProps = _colorProps;
PixiPlugin.parseColor = _parseColor;
PixiPlugin.formatColors = _formatColors;
PixiPlugin.colorStringFilter = _colorStringFilter;

PixiPlugin.registerPIXI = function (PIXI) {
  _TweenLite._gsScope.PIXI = PIXI;
};
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/RoundPropsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p = exports._roundLinkedList = exports._getRoundFunc = exports.default = exports.RoundPropsPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RoundPropsPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "roundProps",
  version: "1.7.0",
  priority: -1,
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween) {
    this._tween = tween;
    return true;
  }
}),
    _getRoundFunc = function _getRoundFunc(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (n) {
    return (Math.round(n / v) * v * p | 0) / p;
  };
},
    _roundLinkedList = function _roundLinkedList(node, mod) {
  while (node) {
    if (!node.f && !node.blob) {
      node.m = mod || Math.round;
    }

    node = node._next;
  }
},
    p = RoundPropsPlugin.prototype;

exports.p = p;
exports._roundLinkedList = _roundLinkedList;
exports._getRoundFunc = _getRoundFunc;
exports.default = exports.RoundPropsPlugin = RoundPropsPlugin;

p._onInitAllProps = function () {
  var tween = this._tween,
      rp = tween.vars.roundProps,
      lookup = {},
      rpt = tween._propLookup.roundProps,
      pt,
      next,
      i,
      p;

  if (_typeof(rp) === "object" && !rp.push) {
    for (p in rp) {
      lookup[p] = _getRoundFunc(rp[p]);
    }
  } else {
    if (typeof rp === "string") {
      rp = rp.split(",");
    }

    i = rp.length;

    while (--i > -1) {
      lookup[rp[i]] = Math.round;
    }
  }

  for (p in lookup) {
    pt = tween._firstPT;

    while (pt) {
      next = pt._next; //record here, because it may get removed

      if (pt.pg) {
        pt.t._mod(lookup);
      } else if (pt.n === p) {
        if (pt.f === 2 && pt.t) {
          //a blob (text containing multiple numeric values)
          _roundLinkedList(pt.t._firstPT, lookup[p]);
        } else {
          this._add(pt.t, p, pt.s, pt.c, lookup[p]); //remove from linked list


          if (next) {
            next._prev = pt._prev;
          }

          if (pt._prev) {
            pt._prev._next = next;
          } else if (tween._firstPT === pt) {
            tween._firstPT = next;
          }

          pt._next = pt._prev = null;
          tween._propLookup[p] = rpt;
        }
      }

      pt = next;
    }
  }

  return false;
};

p._add = function (target, p, s, c, mod) {
  this._addTween(target, p, s, s + c, p, mod || Math.round);

  this._overwriteProps.push(p);
};
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/ScrollToPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScrollToPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _doc = (_TweenLite._gsScope.document || {}).documentElement,
    _window = _TweenLite._gsScope,
    _max = function _max(element, axis) {
  var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim,
      body = document.body;
  return element === _window || element === _doc || element === body ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
},
    _unwrapElement = function _unwrapElement(value) {
  if (typeof value === "string") {
    value = TweenLite.selector(value);
  }

  if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
    value = value[0];
  }

  return value === _window || value.nodeType && value.style ? value : null;
},
    _buildGetter = function _buildGetter(e, axis) {
  //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
  var p = "scroll" + (axis === "x" ? "Left" : "Top");

  if (e === _window) {
    if (e.pageXOffset != null) {
      p = "page" + axis.toUpperCase() + "Offset";
    } else if (_doc[p] != null) {
      e = _doc;
    } else {
      e = document.body;
    }
  }

  return function () {
    return e[p];
  };
},
    _getOffset = function _getOffset(element, container) {
  var rect = _unwrapElement(element).getBoundingClientRect(),
      b = document.body,
      isRoot = !container || container === _window || container === b,
      cRect = isRoot ? {
    top: _doc.clientTop - (window.pageYOffset || _doc.scrollTop || b.scrollTop || 0),
    left: _doc.clientLeft - (window.pageXOffset || _doc.scrollLeft || b.scrollLeft || 0)
  } : container.getBoundingClientRect(),
      offsets = {
    x: rect.left - cRect.left,
    y: rect.top - cRect.top
  };

  if (!isRoot && container) {
    //only add the current scroll position if it's not the window/body.
    offsets.x += _buildGetter(container, "x")();
    offsets.y += _buildGetter(container, "y")();
  }

  return offsets;
  /*	PREVIOUS
  var rect = _unwrapElement(element).getBoundingClientRect(),
  	isRoot = (!container || container === _window || container === document.body),
  	cRect = (isRoot ? _doc : container).getBoundingClientRect(),
  	offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
  if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
  	offsets.x += _buildGetter(container, "x")();
  	offsets.y += _buildGetter(container, "y")();
  }
  return offsets;
  */
},
    _parseVal = function _parseVal(value, target, axis, currentVal) {
  var type = _typeof(value);

  return !isNaN(value) ? parseFloat(value) : type === "string" && value.charAt(1) === "=" ? parseInt(value.charAt(0) + "1", 10) * parseFloat(value.substr(2)) + currentVal : value === "max" ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
},
    ScrollToPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "scrollTo",
  API: 2,
  global: true,
  version: "1.9.2",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween) {
    this._wdw = target === _window;
    this._target = target;
    this._tween = tween;

    if (_typeof(value) !== "object") {
      value = {
        y: value
      }; //if we don't receive an object as the parameter, assume the user intends "y".

      if (typeof value.y === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
        value.x = value.y;
      }
    } else if (value.nodeType) {
      value = {
        y: value,
        x: value
      };
    }

    this.vars = value;
    this._autoKill = value.autoKill !== false;
    this.getX = _buildGetter(target, "x");
    this.getY = _buildGetter(target, "y");
    this.x = this.xPrev = this.getX();
    this.y = this.yPrev = this.getY();

    if (value.x != null) {
      this._addTween(this, "x", this.x, _parseVal(value.x, target, "x", this.x) - (value.offsetX || 0), "scrollTo_x", true);

      this._overwriteProps.push("scrollTo_x");
    } else {
      this.skipX = true;
    }

    if (value.y != null) {
      this._addTween(this, "y", this.y, _parseVal(value.y, target, "y", this.y) - (value.offsetY || 0), "scrollTo_y", true);

      this._overwriteProps.push("scrollTo_y");
    } else {
      this.skipY = true;
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(v) {
    this._super.setRatio.call(this, v);

    var x = this._wdw || !this.skipX ? this.getX() : this.xPrev,
        y = this._wdw || !this.skipY ? this.getY() : this.yPrev,
        yDif = y - this.yPrev,
        xDif = x - this.xPrev,
        threshold = ScrollToPlugin.autoKillThreshold;

    if (this.x < 0) {
      //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this._autoKill) {
      //note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
      if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
        this.skipX = true; //if the user scrolls separately, we should stop tweening!
      }

      if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
        this.skipY = true; //if the user scrolls separately, we should stop tweening!
      }

      if (this.skipX && this.skipY) {
        this._tween.kill();

        if (this.vars.onAutoKill) {
          this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
        }
      }
    }

    if (this._wdw) {
      _window.scrollTo(!this.skipX ? this.x : x, !this.skipY ? this.y : y);
    } else {
      if (!this.skipY) {
        this._target.scrollTop = this.y;
      }

      if (!this.skipX) {
        this._target.scrollLeft = this.x;
      }
    }

    this.xPrev = this.x;
    this.yPrev = this.y;
  }
}),
    p = ScrollToPlugin.prototype;

exports.default = exports.ScrollToPlugin = ScrollToPlugin;
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
ScrollToPlugin.autoKillThreshold = 7;

p._kill = function (lookup) {
  if (lookup.scrollTo_x) {
    this.skipX = true;
  }

  if (lookup.scrollTo_y) {
    this.skipY = true;
  }

  return this._super._kill.call(this, lookup);
};
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/TextPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TextPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _getText = function _getText(e) {
  var type = e.nodeType,
      result = "";

  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += _getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }

  return result;
},
    _emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
    _emojiExp = new RegExp(_emoji),
    _emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
    _emojiSafeSplit = function _emojiSafeSplit(text, delimiter) {
  return (delimiter === "" || !delimiter) && _emojiExp.test(text) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
},

/* //previous emoji-related splitting. New method above is faster and more concise.
_emojiStart = 0xD800,
_emojiEnd = 0xDBFF,
_emojiLowStart = 0xDC00,
_emojiRegionStart = 0x1F1E6,
_emojiRegionEnd = 0x1F1FF,
_emojiModStart = 0x1f3fb,
_emojiModEnd = 0x1f3ff,
_emojiPairCode = function(s) {
	return ((s.charCodeAt(0) - _emojiStart) << 10) + (s.charCodeAt(1) - _emojiLowStart) + 0x10000;
},
_emojiSafeSplit = function(text, delimiter) { //like calling String.split(delimiter) except that it keeps emoji characters together.
	if (delimiter !== "") {
		return text.split(delimiter);
	}
	var l = text.length,
		a = [],
		character, i, emojiPair1, emojiPair2, j;
	for (i = 0; i < l; i++) {
		character = text.charAt(i);
		if ((character.charCodeAt(0) >= _emojiStart && character.charCodeAt(0) <= _emojiEnd) || (text.charCodeAt(i+1) >= 0xFE00 && text.charCodeAt(i+1) <= 0xFE0F)) { //special emoji characters use 2 or 4 unicode characters that we must keep together.
			emojiPair1 = _emojiPairCode(text.substr(i, 2));
			emojiPair2 = _emojiPairCode(text.substr(i + 2, 2));
			j = ((emojiPair1 >= _emojiRegionStart && emojiPair1 <= _emojiRegionEnd && emojiPair2 >= _emojiRegionStart && emojiPair2 <= _emojiRegionEnd) || (emojiPair2 >= _emojiModStart && emojiPair2 <= _emojiModEnd)) ? 4 : 2;
			a.push(text.substr(i, j));
			i += j - 1;
		} else {
			a.push(character);
		}
	}
	return a;
},
*/
TextPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "text",
  API: 2,
  version: "0.6.2",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    var i = target.nodeName.toUpperCase(),
        shrt;

    if (typeof value === "function") {
      value = value(index, target);
    }

    this._svg = target.getBBox && (i === "TEXT" || i === "TSPAN");

    if (!("innerHTML" in target) && !this._svg) {
      return false;
    }

    this._target = target;

    if (_typeof(value) !== "object") {
      value = {
        value: value
      };
    }

    if (value.value === undefined) {
      this._text = this._original = [""];
      return true;
    }

    this._delimiter = value.delimiter || "";
    this._original = _emojiSafeSplit(_getText(target).replace(/\s+/g, " "), this._delimiter);
    this._text = _emojiSafeSplit(value.value.replace(/\s+/g, " "), this._delimiter);
    this._runBackwards = tween.vars.runBackwards === true;

    if (this._runBackwards) {
      i = this._original;
      this._original = this._text;
      this._text = i;
    }

    if (typeof value.newClass === "string") {
      this._newClass = value.newClass;
      this._hasClass = true;
    }

    if (typeof value.oldClass === "string") {
      this._oldClass = value.oldClass;
      this._hasClass = true;
    }

    i = this._original.length - this._text.length;
    shrt = i < 0 ? this._original : this._text;
    this._fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : "");

    if (i < 0) {
      i = -i;
    }

    while (--i > -1) {
      shrt.push(this._fillChar);
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(ratio) {
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }

    if (this._runBackwards) {
      ratio = 1 - ratio;
    }

    var l = this._text.length,
        i = ratio * l + 0.5 | 0,
        applyNew,
        applyOld,
        str;

    if (this._hasClass) {
      applyNew = this._newClass && i !== 0;
      applyOld = this._oldClass && i !== l;
      str = (applyNew ? "<span class='" + this._newClass + "'>" : "") + this._text.slice(0, i).join(this._delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + this._oldClass + "'>" : "") + this._delimiter + this._original.slice(i).join(this._delimiter) + (applyOld ? "</span>" : "");
    } else {
      str = this._text.slice(0, i).join(this._delimiter) + this._delimiter + this._original.slice(i).join(this._delimiter);
    }

    if (this._svg) {
      //SVG text elements don't have an "innerHTML" in Microsoft browsers.
      this._target.textContent = str;
    } else {
      this._target.innerHTML = this._fillChar === "&nbsp;" && str.indexOf("  ") !== -1 ? str.split("  ").join("&nbsp;&nbsp;") : str;
    }
  }
}),
    p = TextPlugin.prototype;

exports.default = exports.TextPlugin = TextPlugin;
p._newClass = p._oldClass = p._delimiter = "";
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/Draggable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Draggable = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function () {
  var _tempVarsXY = {
    css: {},
    data: "_draggable"
  },
      //speed optimization - we reuse the same vars object for x/y TweenLite.set() calls to minimize garbage collection tasks and improve performance.
  _tempVarsX = {
    css: {},
    data: "_draggable"
  },
      _tempVarsY = {
    css: {},
    data: "_draggable"
  },
      _tempVarsRotation = {
    css: {}
  },
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _tempEvent = {},
      //for populating with pageX/pageY in old versions of IE
  _emptyFunc = function _emptyFunc() {
    return false;
  },
      _dummyElement = {
    style: {},
    appendChild: _emptyFunc,
    removeChild: _emptyFunc
  },
      _doc = _TweenLite._gsScope.document || {
    createElement: function createElement() {
      return _dummyElement;
    }
  },
      _docElement = _doc.documentElement || {},
      _createElement = function _createElement(type) {
    return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
  },
      _tempDiv = _createElement("div"),
      _emptyArray = [],
      _RAD2DEG = 180 / Math.PI,
      _max = 999999999999999,
      _getTime = Date.now || function () {
    return new Date().getTime();
  },
      _isOldIE = !!(!_doc.addEventListener && _doc.all),
      _placeholderDiv = _doc.createElement("div"),
      _renderQueue = [],
      _lookup = {},
      //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
  _lookupCount = 0,
      _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
      _dragCount = 0,
      //total number of elements currently being dragged
  _prefix,
      _isMultiTouching,
      _isAndroid = _TweenLite._gsScope.navigator && _TweenLite._gsScope.navigator.userAgent.toLowerCase().indexOf("android") !== -1,
      //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing
  _lastDragTime = 0,
      _temp1 = {},
      // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
  _windowProxy = {},
      //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
  _supportsPassive,
      _slice = function _slice(a) {
    //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    if (typeof a === "string") {
      a = _TweenLite.default.selector(a);
    }

    if (!a || a.nodeType) {
      //if it's not an array, wrap it in one.
      return [a];
    }

    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _copy = function _copy(obj, factor) {
    var copy = {},
        p;

    if (factor) {
      for (p in obj) {
        copy[p] = obj[p] * factor;
      }
    } else {
      for (p in obj) {
        copy[p] = obj[p];
      }
    }

    return copy;
  },
      ThrowPropsPlugin,
      _renderQueueTick = function _renderQueueTick() {
    var i = _renderQueue.length;

    while (--i > -1) {
      _renderQueue[i]();
    }
  },
      _addToRenderQueue = function _addToRenderQueue(func) {
    _renderQueue.push(func);

    if (_renderQueue.length === 1) {
      _TweenLite.default.ticker.addEventListener("tick", _renderQueueTick, this, false, 1);
    }
  },
      _removeFromRenderQueue = function _removeFromRenderQueue(func) {
    var i = _renderQueue.length;

    while (--i > -1) {
      if (_renderQueue[i] === func) {
        _renderQueue.splice(i, 1);
      }
    }

    _TweenLite.default.to(_renderQueueTimeout, 0, {
      overwrite: "all",
      delay: 15,
      onComplete: _renderQueueTimeout,
      data: "_draggable"
    }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).

  },
      _renderQueueTimeout = function _renderQueueTimeout() {
    if (!_renderQueue.length) {
      _TweenLite.default.ticker.removeEventListener("tick", _renderQueueTick);
    }
  },
      _extend = function _extend(obj, defaults) {
    var p;

    for (p in defaults) {
      if (obj[p] === undefined) {
        obj[p] = defaults[p];
      }
    }

    return obj;
  },
      _getDocScrollTop = function _getDocScrollTop() {
    return window.pageYOffset != null ? window.pageYOffset : _doc.scrollTop != null ? _doc.scrollTop : _docElement.scrollTop || _doc.body.scrollTop || 0;
  },
      _getDocScrollLeft = function _getDocScrollLeft() {
    return window.pageXOffset != null ? window.pageXOffset : _doc.scrollLeft != null ? _doc.scrollLeft : _docElement.scrollLeft || _doc.body.scrollLeft || 0;
  },
      _addScrollListener = function _addScrollListener(e, callback) {
    _addListener(e, "scroll", callback);

    if (!_isRoot(e.parentNode)) {
      _addScrollListener(e.parentNode, callback);
    }
  },
      _removeScrollListener = function _removeScrollListener(e, callback) {
    _removeListener(e, "scroll", callback);

    if (!_isRoot(e.parentNode)) {
      _removeScrollListener(e.parentNode, callback);
    }
  },
      _isRoot = function _isRoot(e) {
    return !!(!e || e === _docElement || e === _doc || e === _doc.body || e === window || !e.nodeType || !e.parentNode);
  },
      _getMaxScroll = function _getMaxScroll(element, axis) {
    var dim = axis === "x" ? "Width" : "Height",
        scroll = "scroll" + dim,
        client = "client" + dim,
        body = _doc.body;
    return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], body[scroll]) - (window["inner" + dim] || _docElement[client] || body[client]) : element[scroll] - element[client]);
  },
      _recordMaxScrolls = function _recordMaxScrolls(e) {
    //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
    var isRoot = _isRoot(e),
        x = _getMaxScroll(e, "x"),
        y = _getMaxScroll(e, "y");

    if (isRoot) {
      e = _windowProxy;
    } else {
      _recordMaxScrolls(e.parentNode);
    }

    e._gsMaxScrollX = x;
    e._gsMaxScrollY = y;
    e._gsScrollX = e.scrollLeft || 0;
    e._gsScrollY = e.scrollTop || 0;
  },
      //just used for IE8 and earlier to normalize events and populate pageX/pageY
  _populateIEEvent = function _populateIEEvent(e, preventDefault) {
    e = e || window.event;
    _tempEvent.pageX = e.clientX + _doc.body.scrollLeft + _docElement.scrollLeft;
    _tempEvent.pageY = e.clientY + _doc.body.scrollTop + _docElement.scrollTop;

    if (preventDefault) {
      e.returnValue = false;
    }

    return _tempEvent;
  },
      //grabs the first element it finds (and we include the window as an element), so if it's selector text, it'll feed that value to TweenLite.selector, if it's a jQuery object or some other selector engine's result, it'll grab the first one, and same for an array. If the value doesn't contain a DOM element, it'll just return null.
  _unwrapElement = function _unwrapElement(value) {
    if (!value) {
      return value;
    }

    if (typeof value === "string") {
      value = _TweenLite.default.selector(value);
    }

    if (value.length && value !== window && value[0] && value[0].style && !value.nodeType) {
      value = value[0];
    }

    return value === window || value.nodeType && value.style ? value : null;
  },
      _checkPrefix = function _checkPrefix(e, p) {
    var s = e.style,
        capped,
        i,
        a;

    if (s[p] === undefined) {
      a = ["O", "Moz", "ms", "Ms", "Webkit"];
      i = 5;
      capped = p.charAt(0).toUpperCase() + p.substr(1);

      while (--i > -1 && s[a[i] + capped] === undefined) {}

      if (i < 0) {
        return "";
      }

      _prefix = i === 3 ? "ms" : a[i];
      p = _prefix + capped;
    }

    return p;
  },
      _setStyle = function _setStyle(e, p, value) {
    var s = e.style;

    if (!s) {
      return;
    }

    if (s[p] === undefined) {
      p = _checkPrefix(e, p);
    }

    if (value == null) {
      if (s.removeProperty) {
        s.removeProperty(p.replace(/([A-Z])/g, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        s.removeAttribute(p);
      }
    } else if (s[p] !== undefined) {
      s[p] = value;
    }
  },
      _computedStyleScope = typeof window !== "undefined" ? window : _doc.defaultView || {
    getComputedStyle: function getComputedStyle() {}
  },
      _getComputedStyle = function _getComputedStyle(e, s) {
    return _computedStyleScope.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e, s); //the "host" stuff helps to accommodate ShadowDom objects.
  },
      _horizExp = /(?:Left|Right|Width)/i,
      _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
      _convertToPixels = function _convertToPixels(t, p, v, sfx, recurse) {
    if (sfx === "px" || !sfx) {
      return v;
    }

    if (sfx === "auto" || !v) {
      return 0;
    }

    var horiz = _horizExp.test(p),
        node = t,
        style = _tempDiv.style,
        neg = v < 0,
        pix;

    if (neg) {
      v = -v;
    }

    if (sfx === "%" && p.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position", true) + ";line-height:0;";

      if (sfx === "%" || !node.appendChild) {
        node = t.parentNode || _doc.body;
        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }

      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);

      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p, v, sfx, true);
      }
    }

    return neg ? -pix : pix;
  },
      _calculateOffset = function _calculateOffset(t, p) {
    //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
    if (_getStyle(t, "position", true) !== "absolute") {
      return 0;
    }

    var dim = p === "left" ? "Left" : "Top",
        v = _getStyle(t, "margin" + dim, true);

    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), (v + "").replace(_suffixExp, "")) || 0);
  },
      _getStyle = function _getStyle(element, prop, keepUnits) {
    var rv = (element._gsTransform || {})[prop],
        cs;

    if (rv || rv === 0) {
      return rv;
    } else if (element.style && element.style[prop]) {
      //shadow dom elements don't have "style".
      rv = element.style[prop];
    } else if (cs = _getComputedStyle(element)) {
      rv = cs.getPropertyValue(prop.replace(/([A-Z])/g, "-$1").toLowerCase());
      rv = rv || cs.length ? rv : cs[prop]; //Opera behaves VERY strangely - length is usually 0 and cs[prop] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
    } else if (element.currentStyle) {
      rv = element.currentStyle[prop];
    }

    if (rv === "auto" && (prop === "top" || prop === "left")) {
      rv = _calculateOffset(element, prop);
    }

    return keepUnits ? rv : parseFloat(rv) || 0;
  },
      _dispatchEvent = function _dispatchEvent(instance, type, callbackName) {
    var vars = instance.vars,
        callback = vars[callbackName],
        listeners = instance._listeners[type];

    if (typeof callback === "function") {
      callback.apply(vars[callbackName + "Scope"] || vars.callbackScope || instance, vars[callbackName + "Params"] || [instance.pointerEvent]);
    }

    if (listeners) {
      instance.dispatchEvent(type);
    }
  },
      _getBounds = function _getBounds(obj, context) {
    //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
    var e = _unwrapElement(obj),
        top,
        left,
        offset;

    if (!e) {
      if (obj.left !== undefined) {
        offset = _getOffsetTransformOrigin(context); //the bounds should be relative to the origin

        return {
          left: obj.left - offset.x,
          top: obj.top - offset.y,
          width: obj.width,
          height: obj.height
        };
      }

      left = obj.min || obj.minX || obj.minRotation || 0;
      top = obj.min || obj.minY || 0;
      return {
        left: left,
        top: top,
        width: (obj.max || obj.maxX || obj.maxRotation || 0) - left,
        height: (obj.max || obj.maxY || 0) - top
      };
    }

    return _getElementBounds(e, context);
  },
      _svgBorderFactor,
      _svgBorderScales,
      _svgScrollOffset,
      _hasBorderBug,
      _hasReparentBug,
      //some browsers, like Chrome 49, alter the offsetTop/offsetLeft/offsetParent of elements when a non-identity transform is applied.
  _setEnvironmentVariables = function _setEnvironmentVariables() {
    //some browsers factor the border into the SVG coordinate space, some don't (like Firefox). Some apply transforms to them, some don't. We feature-detect here so we know how to handle the border(s). We can't do this immediately - we must wait for the document.body to exist.
    if (!_doc.createElementNS) {
      _svgBorderFactor = 0;
      _svgBorderScales = false;
      return;
    }

    var div = _createElement("div"),
        svg = _doc.createElementNS("http://www.w3.org/2000/svg", "svg"),
        wrapper = _createElement("div"),
        style = div.style,
        parent = _doc.body || _docElement,
        isFlex = _getStyle(parent, "display", true) === "flex",
        //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
    matrix,
        e1,
        point,
        oldValue;

    if (_doc.body && _transformProp) {
      style.position = "absolute";
      parent.appendChild(wrapper);
      wrapper.appendChild(div);
      oldValue = div.offsetParent;
      wrapper.style[_transformProp] = "rotate(1deg)";
      _hasReparentBug = div.offsetParent === oldValue;
      wrapper.style.position = "absolute";
      style.height = "10px";
      oldValue = div.offsetTop;
      wrapper.style.border = "5px solid red";
      _hasBorderBug = oldValue !== div.offsetTop; //some browsers, like Firefox 38, cause the offsetTop/Left to be affected by a parent's border.

      parent.removeChild(wrapper);
    }

    style = svg.style;
    svg.setAttributeNS(null, "width", "400px");
    svg.setAttributeNS(null, "height", "400px");
    svg.setAttributeNS(null, "viewBox", "0 0 400 400");
    style.display = "block";
    style.boxSizing = "border-box";
    style.border = "0px solid red";
    style.transform = "none"; // in some browsers (like certain flavors of Android), the getScreenCTM() matrix is contaminated by the scroll position. We can run some logic here to detect that condition, but we ended up not needing this because we found another workaround using getBoundingClientRect().

    div.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;";
    parent.appendChild(div);
    div.appendChild(svg);
    point = svg.createSVGPoint().matrixTransform(svg.getScreenCTM());
    e1 = point.y;
    div.scrollTop = 100;
    point.x = point.y = 0;
    point = point.matrixTransform(svg.getScreenCTM());
    _svgScrollOffset = e1 - point.y < 100.1 ? 0 : e1 - point.y - 150;
    div.removeChild(svg);
    parent.removeChild(div); // -- end _svgScrollOffset calculation.

    parent.appendChild(svg);

    if (isFlex) {
      parent.style.display = "block"; //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
    }

    matrix = svg.getScreenCTM();
    e1 = matrix.e;
    style.border = "50px solid red";
    matrix = svg.getScreenCTM();

    if (e1 === 0 && matrix.e === 0 && matrix.f === 0 && matrix.a === 1) {
      //Opera has a bunch of bugs - it doesn't adjust the x/y of the matrix, nor does it scale when box-sizing is border-box but it does so elsewhere; to get the correct behavior we set _svgBorderScales to true.
      _svgBorderFactor = 1;
      _svgBorderScales = true;
    } else {
      _svgBorderFactor = e1 !== matrix.e ? 1 : 0;
      _svgBorderScales = matrix.a !== 1;
    }

    if (isFlex) {
      parent.style.display = "flex";
    }

    parent.removeChild(svg);
  },
      _supports3D = _checkPrefix(_tempDiv, "perspective") !== "",
      // start matrix and point conversion methods...
  _transformOriginProp = _checkPrefix(_tempDiv, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
      _transformProp = _checkPrefix(_tempDiv, "transform"),
      _transformPropCSS = _transformProp.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
      _point1 = {},
      //we reuse _point1 and _point2 objects inside matrix and point conversion methods to conserve memory and minimize garbage collection tasks.
  _point2 = {},
      _SVGElement = _TweenLite._gsScope.SVGElement,
      _isSVG = function _isSVG(e) {
    return !!(_SVGElement && typeof e.getBBox === "function" && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM));
  },
      _isIE10orBelow = _TweenLite._gsScope.navigator && (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_TweenLite._gsScope.navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_TweenLite._gsScope.navigator.userAgent)) && parseFloat(RegExp.$1) < 11,
      //Ideally we'd avoid user agent sniffing, but there doesn't seem to be a way to feature-detect and sense a border-related bug that only affects IE10 and IE9.
  _tempTransforms = [],
      _tempElements = [],
      _getSVGOffsets = function _getSVGOffsets(e) {
    //SVG elements don't always report offsetTop/offsetLeft/offsetParent at all (I'm looking at you, Firefox 29 and Android), so we have to do some work to manufacture those values. You can pass any SVG element and it'll spit back an object with offsetTop, offsetLeft, offsetParent, scaleX, and scaleY properties. We need the scaleX and scaleY to handle the way SVG can resize itself based on the container.
    if (!e.getBoundingClientRect || !e.parentNode || !_transformProp) {
      return {
        offsetTop: 0,
        offsetLeft: 0,
        scaleX: 1,
        scaleY: 1,
        offsetParent: _docElement
      };
    }

    if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === _TweenLite.default.ticker.frame) {
      //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
      return e._dCache;
    }

    var curElement = e,
        cache = _cache(e),
        eRect,
        parentRect,
        offsetParent,
        cs,
        m,
        i,
        point1,
        point2,
        borderWidth,
        borderHeight,
        width,
        height;

    cache.lastUpdate = _TweenLite.default.ticker.frame;

    if (e.getBBox && !cache.isSVGRoot) {
      //if it's a nested/child SVG element, we must find the parent SVG canvas and measure the offset from there.
      curElement = e.parentNode;
      eRect = e.getBBox();

      while (curElement && (curElement.nodeName + "").toLowerCase() !== "svg") {
        curElement = curElement.parentNode;
      }

      cs = _getSVGOffsets(curElement);
      cache.offsetTop = eRect.y * cs.scaleY;
      cache.offsetLeft = eRect.x * cs.scaleX;
      cache.scaleX = cs.scaleX;
      cache.scaleY = cs.scaleY;
      cache.offsetParent = curElement || _docElement;
      return cache;
    } //only root SVG elements continue here...


    offsetParent = cache.offsetParent;

    if (offsetParent === _doc.body) {
      offsetParent = _docElement; //avoids problems with margins/padding on the body
    } //walk up the ancestors and record any non-identity transforms (and reset them to "none") until we reach the offsetParent. We must do this so that the getBoundingClientRect() is accurate for measuring the offsetTop/offsetLeft. We'll revert the values later...


    _tempElements.length = _tempTransforms.length = 0;

    while (curElement && curElement.parentNode) {
      m = _getStyle(curElement, _transformProp, true);

      if (m !== "matrix(1, 0, 0, 1, 0, 0)" && m !== "none" && m !== "translate3d(0px, 0px, 0px)") {
        _tempElements.push(curElement);

        _tempTransforms.push(curElement.style[_transformProp]);

        curElement.style[_transformProp] = "none";
      }

      curElement = curElement.parentNode;
    }

    parentRect = offsetParent.getBoundingClientRect();
    m = e.getScreenCTM();
    point2 = e.createSVGPoint();
    point1 = point2.matrixTransform(m);
    cache.scaleX = Math.sqrt(m.a * m.a + m.b * m.b);
    cache.scaleY = Math.sqrt(m.d * m.d + m.c * m.c);

    if (_svgBorderFactor === undefined) {
      _setEnvironmentVariables();
    }

    if (cache.borderBox && !_svgBorderScales && e.getAttribute("width")) {
      //some browsers (like Safari) don't properly scale the matrix to accommodate the border when box-sizing is border-box, so we must calculate it here...
      cs = _getComputedStyle(e) || {};
      borderWidth = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth) || 0;
      borderHeight = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) || 0;
      width = parseFloat(cs.width) || 0;
      height = parseFloat(cs.height) || 0;
      cache.scaleX *= (width - borderWidth) / width;
      cache.scaleY *= (height - borderHeight) / height;
    }

    if (_svgScrollOffset) {
      //some browsers (like Chrome for Android) have bugs in the way getScreenCTM() is reported (it doesn't factor in scroll position), so we must revert to a more expensive technique for calculating offsetTop/Left.
      eRect = e.getBoundingClientRect();
      cache.offsetLeft = eRect.left - parentRect.left;
      cache.offsetTop = eRect.top - parentRect.top;
    } else {
      cache.offsetLeft = point1.x - parentRect.left;
      cache.offsetTop = point1.y - parentRect.top;
    }

    cache.offsetParent = offsetParent;
    i = _tempElements.length;

    while (--i > -1) {
      _tempElements[i].style[_transformProp] = _tempTransforms[i];
    }

    return cache;
  },
      _getOffsetTransformOrigin = function _getOffsetTransformOrigin(e, decoratee) {
    //returns the x/y position of the transformOrigin of the element, in its own local coordinate system (pixels), offset from the top left corner.
    decoratee = decoratee || {};

    if (!e || e === _docElement || !e.parentNode || e === window) {
      return {
        x: 0,
        y: 0
      };
    }

    var cs = _getComputedStyle(e),
        v = _transformOriginProp && cs ? cs.getPropertyValue(_transformOriginProp) : "50% 50%",
        a = v.split(" "),
        x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0],
        y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1];

    if (y === "center" || y == null) {
      y = "50%";
    }

    if (x === "center" || isNaN(parseFloat(x))) {
      //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
      x = "50%";
    }

    if (e.getBBox && _isSVG(e)) {
      //SVG elements must be handled in a special way because their origins are calculated from the top left.
      if (!e._gsTransform) {
        _TweenLite.default.set(e, {
          x: "+=0",
          overwrite: false
        }); //forces creation of the _gsTransform where we store all the transform components including xOrigin and yOrigin for SVG elements, as of GSAP 1.15.0 which also takes care of calculating the origin from the upper left corner of the SVG canvas.


        if (e._gsTransform.xOrigin === undefined) {
          console.log("Draggable requires at least GSAP 1.17.0");
        }
      }

      v = e.getBBox();
      decoratee.x = e._gsTransform.xOrigin - v.x;
      decoratee.y = e._gsTransform.yOrigin - v.y;
    } else {
      if (e.getBBox && (x + y).indexOf("%") !== -1) {
        //Firefox doesn't report offsetWidth/height on <svg> elements.
        e = e.getBBox();
        e = {
          offsetWidth: e.width,
          offsetHeight: e.height
        };
      }

      decoratee.x = x.indexOf("%") !== -1 ? e.offsetWidth * parseFloat(x) / 100 : parseFloat(x);
      decoratee.y = y.indexOf("%") !== -1 ? e.offsetHeight * parseFloat(y) / 100 : parseFloat(y);
    }

    return decoratee;
  },
      _cache = function _cache(e) {
    //computes some important values and stores them in a _dCache object attached to the element itself so that we can optimize performance
    if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === _TweenLite.default.ticker.frame) {
      //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
      return e._dCache;
    }

    var cache = e._dCache = e._dCache || {},
        cs = _getComputedStyle(e),
        isSVG = e.getBBox && _isSVG(e),
        isSVGRoot = (e.nodeName + "").toLowerCase() === "svg",
        curSVG;

    cache.isSVG = isSVG;
    cache.isSVGRoot = isSVGRoot;
    cache.borderBox = cs.boxSizing === "border-box";
    cache.computedStyle = cs;

    if (isSVGRoot) {
      //some browsers don't report parentNode on SVG elements.
      curSVG = e.parentNode || _docElement;
      curSVG.insertBefore(_tempDiv, e);
      cache.offsetParent = _tempDiv.offsetParent || _docElement; //in some cases, Firefox still reports offsetParent as null.

      curSVG.removeChild(_tempDiv);
    } else if (isSVG) {
      curSVG = e.parentNode;

      while (curSVG && (curSVG.nodeName + "").toLowerCase() !== "svg") {
        //offsetParent is always the SVG canvas for SVG elements.
        curSVG = curSVG.parentNode;
      }

      cache.offsetParent = curSVG;
    } else {
      cache.offsetParent = e.offsetParent;
    }

    return cache;
  },
      _getOffset2DMatrix = function _getOffset2DMatrix(e, offsetOrigin, parentOffsetOrigin, zeroOrigin, isBase) {
    //"isBase" helps us discern context - it should only be true when the element is the base one (the one at which we're starting to walk up the chain). It only matters in cases when it's an <svg> element itself because that's a case when we don't apply scaling.
    if (e === window || !e || !e.style || !e.parentNode) {
      return [1, 0, 0, 1, 0, 0];
    }

    var cache = e._dCache || _cache(e),
        parent = e.parentNode,
        parentCache = parent._dCache || _cache(parent),
        cs = cache.computedStyle,
        parentOffsetParent = cache.isSVG ? parentCache.offsetParent : parent.offsetParent,
        m,
        isRoot,
        offsets,
        rect,
        t,
        sx,
        sy,
        offsetX,
        offsetY,
        parentRect,
        borderTop,
        borderLeft,
        borderTranslateX,
        borderTranslateY;

    m = cache.isSVG && (e.style[_transformProp] + "").indexOf("matrix") !== -1 ? e.style[_transformProp] : cs ? cs.getPropertyValue(_transformPropCSS) : e.currentStyle ? e.currentStyle[_transformProp] : "1,0,0,1,0,0"; //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values

    if (e.getBBox && (e.getAttribute("transform") + "").indexOf("matrix") !== -1) {
      //SVG can store transform data in its "transform" attribute instead of the CSS, so look for that here (only accept matrix()).
      m = e.getAttribute("transform");
    }

    m = (m + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0];

    if (m.length > 6) {
      m = [m[0], m[1], m[4], m[5], m[12], m[13]];
    }

    if (zeroOrigin) {
      m[4] = m[5] = 0;
    } else if (cache.isSVG && (t = e._gsTransform) && (t.xOrigin || t.yOrigin)) {
      //SVGs handle origin very differently. Factor in GSAP's handling of origin values here:
      m[0] = parseFloat(m[0]);
      m[1] = parseFloat(m[1]);
      m[2] = parseFloat(m[2]);
      m[3] = parseFloat(m[3]);
      m[4] = parseFloat(m[4]) - (t.xOrigin - (t.xOrigin * m[0] + t.yOrigin * m[2]));
      m[5] = parseFloat(m[5]) - (t.yOrigin - (t.xOrigin * m[1] + t.yOrigin * m[3]));
    }

    if (offsetOrigin) {
      if (_svgBorderFactor === undefined) {
        _setEnvironmentVariables();
      }

      offsets = cache.isSVG || cache.isSVGRoot ? _getSVGOffsets(e) : e;

      if (cache.isSVG) {
        //don't just rely on "instanceof _SVGElement" because if the SVG is embedded via an object tag, it won't work (SVGElement is mapped to a different object))
        rect = e.getBBox();
        parentRect = parentCache.isSVGRoot ? {
          x: 0,
          y: 0
        } : parent.getBBox();
        offsets = {
          offsetLeft: rect.x - parentRect.x,
          offsetTop: rect.y - parentRect.y,
          offsetParent: cache.offsetParent
        };
      } else if (cache.isSVGRoot) {
        borderTop = parseInt(cs.borderTopWidth, 10) || 0;
        borderLeft = parseInt(cs.borderLeftWidth, 10) || 0;
        borderTranslateX = (m[0] - _svgBorderFactor) * borderLeft + m[2] * borderTop;
        borderTranslateY = m[1] * borderLeft + (m[3] - _svgBorderFactor) * borderTop;
        sx = offsetOrigin.x;
        sy = offsetOrigin.y;
        offsetX = sx - (sx * m[0] + sy * m[2]); //accommodate the SVG root's transforms when the origin isn't in the top left.

        offsetY = sy - (sx * m[1] + sy * m[3]);
        m[4] = parseFloat(m[4]) + offsetX;
        m[5] = parseFloat(m[5]) + offsetY;
        offsetOrigin.x -= offsetX;
        offsetOrigin.y -= offsetY;
        sx = offsets.scaleX;
        sy = offsets.scaleY;

        if (!isBase) {
          //when getting the matrix for a root <svg> element itself (NOT in the context of an SVG element that's nested inside of it like a <path>), we do NOT apply the scaling!
          offsetOrigin.x *= sx;
          offsetOrigin.y *= sy;
        }

        m[0] *= sx;
        m[1] *= sy;
        m[2] *= sx;
        m[3] *= sy;

        if (!_isIE10orBelow) {
          offsetOrigin.x += borderTranslateX;
          offsetOrigin.y += borderTranslateY;
        }

        if (parentOffsetParent === _doc.body && offsets.offsetParent === _docElement) {
          //to avoid issues with margin/padding on the <body>, we always set the offsetParent to _docElement in the _getSVGOffsets() function but there's a condition we check later in this function for (parentOffsetParent === offsets.offsetParent) which would fail if we don't run this logic. In other words, parentOffsetParent may be <body> and the <svg>'s offsetParent is also <body> but artificially set to _docElement to avoid margin/padding issues.
          parentOffsetParent = _docElement;
        }
      } else if (!_hasBorderBug && e.offsetParent) {
        offsetOrigin.x += parseInt(_getStyle(e.offsetParent, "borderLeftWidth"), 10) || 0;
        offsetOrigin.y += parseInt(_getStyle(e.offsetParent, "borderTopWidth"), 10) || 0;
      }

      isRoot = parent === _docElement || parent === _doc.body;
      m[4] = Number(m[4]) + offsetOrigin.x + (offsets.offsetLeft || 0) - parentOffsetOrigin.x - (isRoot ? 0 : parent.scrollLeft || 0);
      m[5] = Number(m[5]) + offsetOrigin.y + (offsets.offsetTop || 0) - parentOffsetOrigin.y - (isRoot ? 0 : parent.scrollTop || 0);

      if (parent && _getStyle(e, "position", true) === "fixed") {
        //fixed position elements should factor in the scroll position of the document.
        m[4] += _getDocScrollLeft();
        m[5] += _getDocScrollTop();
        parent = parent.offsetParent;

        while (parent) {
          m[4] -= parent.offsetLeft;
          m[5] -= parent.offsetTop;
          parent = parent.offsetParent;
        }
      } else if (parent && parent !== _docElement && parentOffsetParent === offsets.offsetParent && !parentCache.isSVG && (!_hasReparentBug || _getOffset2DMatrix(parent).join("") === "100100")) {
        offsets = parentCache.isSVGRoot ? _getSVGOffsets(parent) : parent;
        m[4] -= offsets.offsetLeft || 0;
        m[5] -= offsets.offsetTop || 0;

        if (!_hasBorderBug && parentCache.offsetParent && !cache.isSVG && !cache.isSVGRoot) {
          m[4] -= parseInt(_getStyle(parentCache.offsetParent, "borderLeftWidth"), 10) || 0;
          m[5] -= parseInt(_getStyle(parentCache.offsetParent, "borderTopWidth"), 10) || 0;
        }
      }
    }

    return m;
  },
      _getConcatenatedMatrix = function _getConcatenatedMatrix(e, invert) {
    if (!e || e === window || !e.parentNode) {
      return [1, 0, 0, 1, 0, 0];
    } //note: we keep reusing _point1 and _point2 in order to minimize memory usage and garbage collection chores.


    var originOffset = _getOffsetTransformOrigin(e, _point1),
        parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, _point2),
        m = _getOffset2DMatrix(e, originOffset, parentOriginOffset, false, !invert),
        a,
        b,
        c,
        d,
        tx,
        ty,
        m2,
        determinant;

    while ((e = e.parentNode) && e.parentNode && e !== _docElement) {
      originOffset = parentOriginOffset;
      parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, originOffset === _point1 ? _point2 : _point1);
      m2 = _getOffset2DMatrix(e, originOffset, parentOriginOffset);
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      m[0] = a * m2[0] + b * m2[2];
      m[1] = a * m2[1] + b * m2[3];
      m[2] = c * m2[0] + d * m2[2];
      m[3] = c * m2[1] + d * m2[3];
      m[4] = tx * m2[0] + ty * m2[2] + m2[4];
      m[5] = tx * m2[1] + ty * m2[3] + m2[5];
    }

    if (invert) {
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;
      m[0] = d / determinant;
      m[1] = -b / determinant;
      m[2] = -c / determinant;
      m[3] = a / determinant;
      m[4] = (c * ty - d * tx) / determinant;
      m[5] = -(a * ty - b * tx) / determinant;
    }

    return m;
  },
      _localToGlobal = function _localToGlobal(e, p, fromTopLeft, decoratee) {
    e = _unwrapElement(e);

    var m = _getConcatenatedMatrix(e, false),
        x = p.x,
        y = p.y;

    if (fromTopLeft) {
      _getOffsetTransformOrigin(e, p);

      x -= p.x;
      y -= p.y;
    }

    decoratee = decoratee === true ? p : decoratee || {};
    decoratee.x = x * m[0] + y * m[2] + m[4];
    decoratee.y = x * m[1] + y * m[3] + m[5];
    return decoratee;
  },
      _localizePoint = function _localizePoint(p, localToGlobal, globalToLocal) {
    var x = p.x * localToGlobal[0] + p.y * localToGlobal[2] + localToGlobal[4],
        y = p.x * localToGlobal[1] + p.y * localToGlobal[3] + localToGlobal[5];
    p.x = x * globalToLocal[0] + y * globalToLocal[2] + globalToLocal[4];
    p.y = x * globalToLocal[1] + y * globalToLocal[3] + globalToLocal[5];
    return p;
  },
      _getElementBounds = function _getElementBounds(e, context, fromTopLeft) {
    if (!(e = _unwrapElement(e))) {
      return null;
    }

    context = _unwrapElement(context);

    var isSVG = e.getBBox && _isSVG(e),
        origin,
        left,
        right,
        top,
        bottom,
        mLocalToGlobal,
        mGlobalToLocal,
        p1,
        p2,
        p3,
        p4,
        bbox,
        width,
        height,
        cache,
        borderLeft,
        borderTop,
        viewBox,
        viewBoxX,
        viewBoxY,
        computedDimensions,
        cs;

    if (e === window) {
      top = _getDocScrollTop();
      left = _getDocScrollLeft();
      right = left + (_docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0);
      bottom = top + ((e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
    } else if (context === undefined || context === window) {
      return e.getBoundingClientRect();
    } else {
      origin = _getOffsetTransformOrigin(e);
      left = -origin.x;
      top = -origin.y;

      if (isSVG) {
        bbox = e.getBBox();
        width = bbox.width;
        height = bbox.height;
      } else if ((e.nodeName + "").toLowerCase() !== "svg" && e.offsetWidth) {
        //Chrome dropped support for "offsetWidth" on SVG elements
        width = e.offsetWidth;
        height = e.offsetHeight;
      } else {
        computedDimensions = _getComputedStyle(e);
        width = parseFloat(computedDimensions.width);
        height = parseFloat(computedDimensions.height);
      }

      right = left + width;
      bottom = top + height;

      if (e.nodeName.toLowerCase() === "svg" && !_isOldIE) {
        //root SVG elements are a special beast because they have 2 types of scaling - transforms on themselves as well as the stretching of the SVG canvas itself based on the outer size and the viewBox. If, for example, the SVG's viewbox is "0 0 100 100" but the CSS is set to width:200px; height:200px, that'd make it appear at 2x scale even though the element itself has no CSS transforms but the offsetWidth/offsetHeight are based on that css, not the viewBox so we need to adjust them accordingly.
        cache = _getSVGOffsets(e);
        cs = cache.computedStyle || {};
        viewBox = (e.getAttribute("viewBox") || "0 0").split(" ");
        viewBoxX = parseFloat(viewBox[0]);
        viewBoxY = parseFloat(viewBox[1]);
        borderLeft = parseFloat(cs.borderLeftWidth) || 0;
        borderTop = parseFloat(cs.borderTopWidth) || 0;
        left /= cache.scaleX;
        top /= cache.scaleY;
        right = left + width - (width - (width - borderLeft) / cache.scaleX - viewBoxX);
        bottom = top + height - (height - (height - borderTop) / cache.scaleY - viewBoxY);
        left -= borderLeft / cache.scaleX - viewBoxX;
        top -= borderTop / cache.scaleY - viewBoxY;

        if (computedDimensions) {
          //when we had to use computed styles, factor in the border now.
          right += (parseFloat(cs.borderRightWidth) + borderLeft) / cache.scaleX;
          bottom += (borderTop + parseFloat(cs.borderBottomWidth)) / cache.scaleY;
        }
      }
    }

    if (e === context) {
      return {
        left: left,
        top: top,
        width: right - left,
        height: bottom - top
      };
    }

    mLocalToGlobal = _getConcatenatedMatrix(e);
    mGlobalToLocal = _getConcatenatedMatrix(context, true);
    p1 = _localizePoint({
      x: left,
      y: top
    }, mLocalToGlobal, mGlobalToLocal);
    p2 = _localizePoint({
      x: right,
      y: top
    }, mLocalToGlobal, mGlobalToLocal);
    p3 = _localizePoint({
      x: right,
      y: bottom
    }, mLocalToGlobal, mGlobalToLocal);
    p4 = _localizePoint({
      x: left,
      y: bottom
    }, mLocalToGlobal, mGlobalToLocal);
    left = Math.min(p1.x, p2.x, p3.x, p4.x);
    top = Math.min(p1.y, p2.y, p3.y, p4.y);
    _temp1.x = _temp1.y = 0;

    if (fromTopLeft) {
      _getOffsetTransformOrigin(context, _temp1);
    }

    return {
      left: left + _temp1.x,
      top: top + _temp1.y,
      width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
      height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
    };
  },
      // end matrix and point conversion methods
  _isArrayLike = function _isArrayLike(e) {
    return e && e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? true : false; //could be an array of jQuery objects too, so accommodate that.
  },
      _flattenArray = function _flattenArray(a) {
    var result = [],
        l = a.length,
        i,
        e,
        j;

    for (i = 0; i < l; i++) {
      e = a[i];

      if (_isArrayLike(e)) {
        j = e.length;

        for (j = 0; j < e.length; j++) {
          result.push(e[j]);
        }
      } else if (e && e.length !== 0) {
        result.push(e);
      }
    }

    return result;
  },
      _isTouchDevice = typeof window !== "undefined" && "ontouchstart" in _docElement && "orientation" in window,
      _touchEventLookup = function (types) {
    //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
    var standard = types.split(","),
        converted = (_tempDiv.onpointerdown !== undefined ? "pointerdown,pointermove,pointerup,pointercancel" : _tempDiv.onmspointerdown !== undefined ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
        obj = {},
        i = 4;

    while (--i > -1) {
      obj[standard[i]] = converted[i];
      obj[converted[i]] = standard[i];
    } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().


    try {
      _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function get() {
          _supportsPassive = 1;
        }
      }));
    } catch (e) {}

    return obj;
  }("touchstart,touchmove,touchend,touchcancel"),
      _addListener = function _addListener(element, type, func, capture) {
    if (element.addEventListener) {
      var touchType = _touchEventLookup[type];
      capture = capture || (_supportsPassive ? {
        passive: false
      } : null);
      element.addEventListener(touchType || type, func, capture);

      if (touchType && type !== touchType) {
        //some browsers actually support both, so must we.
        element.addEventListener(type, func, capture);
      }
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, func);
    }
  },
      _removeListener = function _removeListener(element, type, func) {
    if (element.removeEventListener) {
      var touchType = _touchEventLookup[type];
      element.removeEventListener(touchType || type, func);

      if (touchType && type !== touchType) {
        element.removeEventListener(type, func);
      }
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, func);
    }
  },
      _hasTouchID = function _hasTouchID(list, ID) {
    var i = list.length;

    while (--i > -1) {
      if (list[i].identifier === ID) {
        return true;
      }
    }

    return false;
  },
      _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(e) {
    _isMultiTouching = e.touches && _dragCount < e.touches.length;

    _removeListener(e.target, "touchend", _onMultiTouchDocumentEnd);
  },
      _onMultiTouchDocument = function _onMultiTouchDocument(e) {
    _isMultiTouching = e.touches && _dragCount < e.touches.length;

    _addListener(e.target, "touchend", _onMultiTouchDocumentEnd);
  },
      _parseThrowProps = function _parseThrowProps(draggable, snap, max, min, factor, forceZeroVelocity) {
    var vars = {},
        a,
        i,
        l;

    if (snap) {
      if (factor !== 1 && snap instanceof Array) {
        //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
        vars.end = a = [];
        l = snap.length;

        if (_typeof(snap[0]) === "object") {
          //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
          for (i = 0; i < l; i++) {
            a[i] = _copy(snap[i], factor);
          }
        } else {
          for (i = 0; i < l; i++) {
            a[i] = snap[i] * factor;
          }
        }

        max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

        min -= 1.1;
      } else if (typeof snap === "function") {
        vars.end = function (value) {
          var result = snap.call(draggable, value),
              copy,
              p;

          if (factor !== 1) {
            if (_typeof(result) === "object") {
              copy = {};

              for (p in result) {
                copy[p] = result[p] * factor;
              }

              result = copy;
            } else {
              result *= factor;
            }
          }

          return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
        };
      } else {
        vars.end = snap;
      }
    }

    if (max || max === 0) {
      vars.max = max;
    }

    if (min || min === 0) {
      vars.min = min;
    }

    if (forceZeroVelocity) {
      vars.velocity = 0;
    }

    return vars;
  },
      _isClickable = function _isClickable(e) {
    //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
    var data;
    return !e || !e.getAttribute || e.nodeName === "BODY" ? false : (data = e.getAttribute("data-clickable")) === "true" || data !== "false" && (e.onclick || _clickableTagExp.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true") ? true : _isClickable(e.parentNode);
  },
      _setSelectable = function _setSelectable(elements, selectable) {
    var i = elements.length,
        e;

    while (--i > -1) {
      e = elements[i];
      e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;

      _setStyle(e, "userSelect", selectable ? "text" : "none");
    }
  },
      _addPaddingBR = function () {
    //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
    var div = _doc.createElement("div"),
        child = _doc.createElement("div"),
        childStyle = child.style,
        parent = _doc.body || _tempDiv,
        val;

    childStyle.display = "inline-block";
    childStyle.position = "relative";
    div.style.cssText = child.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden";
    div.appendChild(child);
    parent.appendChild(div);
    val = child.offsetHeight + 18 > div.scrollHeight; //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.

    parent.removeChild(div);
    return val;
  }(),
      //The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
  ScrollProxy = function ScrollProxy(element, vars) {
    element = _unwrapElement(element);
    vars = vars || {};

    var content = _doc.createElement("div"),
        style = content.style,
        node = element.firstChild,
        offsetTop = 0,
        offsetLeft = 0,
        prevTop = element.scrollTop,
        prevLeft = element.scrollLeft,
        scrollWidth = element.scrollWidth,
        scrollHeight = element.scrollHeight,
        extraPadRight = 0,
        maxLeft = 0,
        maxTop = 0,
        elementWidth,
        elementHeight,
        contentHeight,
        nextNode,
        transformStart,
        transformEnd;

    if (_supports3D && vars.force3D !== false) {
      transformStart = "translate3d(";
      transformEnd = "px,0px)";
    } else if (_transformProp) {
      transformStart = "translate(";
      transformEnd = "px)";
    }

    this.scrollTop = function (value, force) {
      if (!arguments.length) {
        return -this.top();
      }

      this.top(-value, force);
    };

    this.scrollLeft = function (value, force) {
      if (!arguments.length) {
        return -this.left();
      }

      this.left(-value, force);
    };

    this.left = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollLeft + offsetLeft);
      }

      var dif = element.scrollLeft - prevLeft,
          oldOffset = offsetLeft;

      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevLeft = element.scrollLeft;

        _TweenLite.default.killTweensOf(this, true, {
          left: 1,
          scrollLeft: 1
        });

        this.left(-prevLeft);

        if (vars.onKill) {
          vars.onKill();
        }

        return;
      }

      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetLeft = value - 0.5 | 0;
        value = 0;
      } else if (value > maxLeft) {
        offsetLeft = value - maxLeft | 0;
        value = maxLeft;
      } else {
        offsetLeft = 0;
      }

      if (offsetLeft || oldOffset) {
        if (transformStart) {
          if (!this._suspendTransforms) {
            style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }
        } else {
          style.left = -offsetLeft + "px";
        }

        if (offsetLeft + extraPadRight >= 0) {
          style.paddingRight = offsetLeft + extraPadRight + "px";
        }
      }

      element.scrollLeft = value | 0;
      prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjsut the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
    };

    this.top = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollTop + offsetTop);
      }

      var dif = element.scrollTop - prevTop,
          oldOffset = offsetTop;

      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevTop = element.scrollTop;

        _TweenLite.default.killTweensOf(this, true, {
          top: 1,
          scrollTop: 1
        });

        this.top(-prevTop);

        if (vars.onKill) {
          vars.onKill();
        }

        return;
      }

      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetTop = value - 0.5 | 0;
        value = 0;
      } else if (value > maxTop) {
        offsetTop = value - maxTop | 0;
        value = maxTop;
      } else {
        offsetTop = 0;
      }

      if (offsetTop || oldOffset) {
        if (transformStart) {
          if (!this._suspendTransforms) {
            style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }
        } else {
          style.top = -offsetTop + "px";
        }
      }

      element.scrollTop = value | 0;
      prevTop = element.scrollTop;
    };

    this.maxScrollTop = function () {
      return maxTop;
    };

    this.maxScrollLeft = function () {
      return maxLeft;
    };

    this.disable = function () {
      node = content.firstChild;

      while (node) {
        nextNode = node.nextSibling;
        element.appendChild(node);
        node = nextNode;
      }

      if (element === content.parentNode) {
        //in case disable() is called when it's already disabled.
        element.removeChild(content);
      }
    };

    this.enable = function () {
      node = element.firstChild;

      if (node === content) {
        return;
      }

      while (node) {
        nextNode = node.nextSibling;
        content.appendChild(node);
        node = nextNode;
      }

      element.appendChild(content);
      this.calibrate();
    };

    this.calibrate = function (force) {
      var widthMatches = element.clientWidth === elementWidth,
          x,
          y;
      prevTop = element.scrollTop;
      prevLeft = element.scrollLeft;

      if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
        return; //no need to recalculate things if the width and height haven't changed.
      }

      if (offsetTop || offsetLeft) {
        x = this.left();
        y = this.top();
        this.left(-element.scrollLeft);
        this.top(-element.scrollTop);
      } //first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)


      if (!widthMatches || force) {
        style.display = "block";
        style.width = "auto";
        style.paddingRight = "0px";
        extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth); //if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.

        if (extraPadRight) {
          extraPadRight += _getStyle(element, "paddingLeft") + (_addPaddingBR ? _getStyle(element, "paddingRight") : 0);
        }
      }

      style.display = "inline-block";
      style.position = "relative";
      style.overflow = "visible";
      style.verticalAlign = "top";
      style.width = "100%";
      style.paddingRight = extraPadRight + "px"; //some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error

      if (_addPaddingBR) {
        style.paddingBottom = _getStyle(element, "paddingBottom", true);
      }

      if (_isOldIE) {
        style.zoom = "1";
      }

      elementWidth = element.clientWidth;
      elementHeight = element.clientHeight;
      scrollWidth = element.scrollWidth;
      scrollHeight = element.scrollHeight;
      maxLeft = element.scrollWidth - elementWidth;
      maxTop = element.scrollHeight - elementHeight;
      contentHeight = content.offsetHeight;
      style.display = "block";

      if (x || y) {
        this.left(x);
        this.top(y);
      }
    };

    this.content = content;
    this.element = element;
    this._suspendTransforms = false;
    this.enable();
  },
      Draggable = function Draggable(target, vars) {
    _TweenLite.EventDispatcher.call(this, target);

    target = _unwrapElement(target); //in case the target is a selector object or selector text

    if (!ThrowPropsPlugin) {
      ThrowPropsPlugin = _globals.com.greensock.plugins.ThrowPropsPlugin;
    }

    this.vars = vars = _copy(vars || {});
    this.target = target;
    this.x = this.y = this.rotation = 0;
    this.dragResistance = parseFloat(vars.dragResistance) || 0;
    this.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    this.lockAxis = vars.lockAxis;
    this.autoScroll = vars.autoScroll || 0;
    this.lockedAxis = null;
    this.allowEventDefault = !!vars.allowEventDefault;

    var type = (vars.type || (_isOldIE ? "top,left" : "x,y")).toLowerCase(),
        xyMode = type.indexOf("x") !== -1 || type.indexOf("y") !== -1,
        rotationMode = type.indexOf("rotation") !== -1,
        xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
        yProp = xyMode ? "y" : "top",
        allowX = type.indexOf("x") !== -1 || type.indexOf("left") !== -1 || type === "scroll",
        allowY = type.indexOf("y") !== -1 || type.indexOf("top") !== -1 || type === "scroll",
        minimumMovement = vars.minimumMovement || 2,
        self = this,
        triggers = _slice(vars.trigger || vars.handle || target),
        killProps = {},
        dragEndTime = 0,
        checkAutoScrollBounds = false,
        autoScrollMarginTop = vars.autoScrollMarginTop || 40,
        autoScrollMarginRight = vars.autoScrollMarginRight || 40,
        autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
        autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
        isClickable = vars.clickableTest || _isClickable,
        clickTime = 0,
        enabled,
        scrollProxy,
        startPointerX,
        startPointerY,
        startElementX,
        startElementY,
        hasBounds,
        hasDragCallback,
        maxX,
        minX,
        maxY,
        minY,
        tempVars,
        cssVars,
        touch,
        touchID,
        rotationOrigin,
        dirty,
        old,
        snapX,
        snapY,
        snapXY,
        isClicking,
        touchEventTarget,
        matrix,
        interrupted,
        startScrollTop,
        startScrollLeft,
        applyObj,
        allowNativeTouchScrolling,
        touchDragAxis,
        isDispatching,
        clickDispatch,
        trustedClickDispatch,
        onContextMenu = function onContextMenu(e) {
      //used to prevent long-touch from triggering a context menu.
      if (self.isPressed && e.which < 2) {
        self.endDrag();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
        //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
    render = function render(suppressEvents) {
      if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
        var e = target,
            autoScrollFactor = self.autoScroll * 15,
            //multiplying by 15 just gives us a better "feel" speed-wise.
        parent,
            isRoot,
            rect,
            pointerX,
            pointerY,
            changeX,
            changeY,
            gap;
        checkAutoScrollBounds = false;
        _windowProxy.scrollTop = window.pageYOffset != null ? window.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _doc.body.scrollTop;
        _windowProxy.scrollLeft = window.pageXOffset != null ? window.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _doc.body.scrollLeft;
        pointerX = self.pointerX - _windowProxy.scrollLeft;
        pointerY = self.pointerY - _windowProxy.scrollTop;

        while (e && !isRoot) {
          //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
          isRoot = _isRoot(e.parentNode);
          parent = isRoot ? _windowProxy : e.parentNode;
          rect = isRoot ? {
            bottom: Math.max(_docElement.clientHeight, window.innerHeight || 0),
            right: Math.max(_docElement.clientWidth, window.innerWidth || 0),
            left: 0,
            top: 0
          } : parent.getBoundingClientRect();
          changeX = changeY = 0;

          if (allowY) {
            gap = parent._gsMaxScrollY - parent.scrollTop;

            if (gap < 0) {
              changeY = gap;
            } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
              checkAutoScrollBounds = true;
              changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
            } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
              checkAutoScrollBounds = true;
              changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
            }

            if (changeY) {
              parent.scrollTop += changeY;
            }
          }

          if (allowX) {
            gap = parent._gsMaxScrollX - parent.scrollLeft;

            if (gap < 0) {
              changeX = gap;
            } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
              checkAutoScrollBounds = true;
              changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
            } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
              checkAutoScrollBounds = true;
              changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
            }

            if (changeX) {
              parent.scrollLeft += changeX;
            }
          }

          if (isRoot && (changeX || changeY)) {
            window.scrollTo(parent.scrollLeft, parent.scrollTop);
            setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
          }

          e = parent;
        }
      }

      if (dirty) {
        var x = self.x,
            y = self.y,
            min = 0.000001;

        if (x < min && x > -min) {
          //browsers don't handle super small decimals well.
          x = 0;
        }

        if (y < min && y > -min) {
          y = 0;
        }

        if (rotationMode) {
          self.deltaX = x - applyObj.data.rotation;
          applyObj.data.rotation = self.rotation = x;
          applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
        } else {
          if (scrollProxy) {
            if (allowY) {
              self.deltaY = y - scrollProxy.top();
              scrollProxy.top(y);
            }

            if (allowX) {
              self.deltaX = x - scrollProxy.left();
              scrollProxy.left(x);
            }
          } else if (xyMode) {
            if (allowY) {
              self.deltaY = y - applyObj.data.y;
              applyObj.data.y = y;
            }

            if (allowX) {
              self.deltaX = x - applyObj.data.x;
              applyObj.data.x = x;
            }

            applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
          } else {
            if (allowY) {
              self.deltaY = y - parseFloat(target.style.top || 0);
              target.style.top = y + "px";
            }

            if (allowX) {
              self.deltaY = x - parseFloat(target.style.left || 0);
              target.style.left = x + "px";
            }
          }
        }

        if (hasDragCallback && !suppressEvents && !isDispatching) {
          isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

          _dispatchEvent(self, "drag", "onDrag");

          isDispatching = false;
        }
      }

      dirty = false;
    },
        //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the ThrowPropsPlugin tween in an onUpdate to ensure things are synced and snapped.
    syncXY = function syncXY(skipOnUpdate, skipSnap) {
      var x = self.x,
          y = self.y,
          snappedValue;

      if (!target._gsTransform && (xyMode || rotationMode)) {
        //just in case the _gsTransform got wiped, like if the user called clearProps on the transform or something (very rare), doing an x tween forces a re-parsing of the transforms and population of the _gsTransform.
        _TweenLite.default.set(target, {
          x: "+=0",
          overwrite: false,
          data: "_draggable"
        });
      }

      if (xyMode) {
        self.y = target._gsTransform.y;
        self.x = target._gsTransform.x;
      } else if (rotationMode) {
        self.x = self.rotation = target._gsTransform.rotation;
      } else if (scrollProxy) {
        self.y = scrollProxy.top();
        self.x = scrollProxy.left();
      } else {
        self.y = parseInt(target.style.top, 10) || 0;
        self.x = parseInt(target.style.left, 10) || 0;
      }

      if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
        if (snapXY) {
          _temp1.x = self.x;
          _temp1.y = self.y;
          snappedValue = snapXY(_temp1);

          if (snappedValue.x !== self.x) {
            self.x = snappedValue.x;
            dirty = true;
          }

          if (snappedValue.y !== self.y) {
            self.y = snappedValue.y;
            dirty = true;
          }
        }

        if (snapX) {
          snappedValue = snapX(self.x);

          if (snappedValue !== self.x) {
            self.x = snappedValue;

            if (rotationMode) {
              self.rotation = snappedValue;
            }

            dirty = true;
          }
        }

        if (snapY) {
          snappedValue = snapY(self.y);

          if (snappedValue !== self.y) {
            self.y = snappedValue;
          }

          dirty = true;
        }
      }

      if (dirty) {
        render(true);
      }

      if (!skipOnUpdate) {
        self.deltaX = self.x - x;
        self.deltaY = self.y - y;

        _dispatchEvent(self, "throwupdate", "onThrowUpdate");
      }
    },
        calculateBounds = function calculateBounds() {
      var bounds, targetBounds, snap, snapIsRaw;
      hasBounds = false;

      if (scrollProxy) {
        scrollProxy.calibrate();
        self.minX = minX = -scrollProxy.maxScrollLeft();
        self.minY = minY = -scrollProxy.maxScrollTop();
        self.maxX = maxX = self.maxY = maxY = 0;
        hasBounds = true;
      } else if (!!vars.bounds) {
        bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

        if (rotationMode) {
          self.minX = minX = bounds.left;
          self.maxX = maxX = bounds.left + bounds.width;
          self.minY = minY = self.maxY = maxY = 0;
        } else if (vars.bounds.maxX !== undefined || vars.bounds.maxY !== undefined) {
          bounds = vars.bounds;
          self.minX = minX = bounds.minX;
          self.minY = minY = bounds.minY;
          self.maxX = maxX = bounds.maxX;
          self.maxY = maxY = bounds.maxY;
        } else {
          targetBounds = _getBounds(target, target.parentNode);
          self.minX = minX = _getStyle(target, xProp) + bounds.left - targetBounds.left;
          self.minY = minY = _getStyle(target, yProp) + bounds.top - targetBounds.top;
          self.maxX = maxX = minX + (bounds.width - targetBounds.width);
          self.maxY = maxY = minY + (bounds.height - targetBounds.height);
        }

        if (minX > maxX) {
          self.minX = maxX;
          self.maxX = maxX = minX;
          minX = self.minX;
        }

        if (minY > maxY) {
          self.minY = maxY;
          self.maxY = maxY = minY;
          minY = self.minY;
        }

        if (rotationMode) {
          self.minRotation = minX;
          self.maxRotation = maxX;
        }

        hasBounds = true;
      }

      if (vars.liveSnap) {
        snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
        snapIsRaw = snap instanceof Array || typeof snap === "function";

        if (rotationMode) {
          snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
          snapY = null;
        } else {
          if (snap.points) {
            snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
          } else {
            if (allowX) {
              snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
            }

            if (allowY) {
              snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
            }
          }
        }
      }
    },
        onThrowComplete = function onThrowComplete() {
      self.isThrowing = false;

      _dispatchEvent(self, "throwcomplete", "onThrowComplete");
    },
        onThrowOverwrite = function onThrowOverwrite() {
      self.isThrowing = false;
    },
        animate = function animate(throwProps, forceZeroVelocity) {
      var snap, snapIsRaw, tween, overshootTolerance;

      if (throwProps && ThrowPropsPlugin) {
        if (throwProps === true) {
          snap = vars.snap || vars.liveSnap || {};
          snapIsRaw = snap instanceof Array || typeof snap === "function";
          throwProps = {
            resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
          };

          if (rotationMode) {
            throwProps.rotation = _parseThrowProps(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
          } else {
            if (allowX) {
              throwProps[xProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.x || snap.left || snap.scrollLeft, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
            }

            if (allowY) {
              throwProps[yProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.y || snap.top || snap.scrollTop, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
            }

            if (snap.points || snap instanceof Array && _typeof(snap[0]) === "object") {
              throwProps.linkedProps = xProp + "," + yProp;
              throwProps.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
            }
          }
        }

        self.isThrowing = true;
        overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;
        self.tween = tween = ThrowPropsPlugin.to(scrollProxy || target, {
          throwProps: throwProps,
          data: "_draggable",
          ease: vars.ease || _globals.Power3.easeOut,
          onComplete: onThrowComplete,
          onOverwrite: onThrowOverwrite,
          onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
          onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : _emptyArray
        }, Math.max(vars.minDuration || 0, vars.maxDuration || 0) || 2, !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _typeof(throwProps) === "object" && throwProps.resistance > 1000 ? 0 : 0.5, overshootTolerance);

        if (!vars.fastMode) {
          //to populate the end values, we just scrub the tween to the end, record the values, and then jump back to the beginning.
          if (scrollProxy) {
            scrollProxy._suspendTransforms = true; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
          }

          tween.render(tween.duration(), true, true);
          syncXY(true, true);
          self.endX = self.x;
          self.endY = self.y;

          if (rotationMode) {
            self.endRotation = self.x;
          }

          tween.play(0);
          syncXY(true, true);

          if (scrollProxy) {
            scrollProxy._suspendTransforms = false;
          }
        }
      } else if (hasBounds) {
        self.applyBounds();
      }
    },
        updateMatrix = function updateMatrix(shiftStart) {
      var start = matrix || [1, 0, 0, 1, 0, 0],
          a,
          b,
          c,
          d,
          tx,
          ty,
          determinant,
          pointerX,
          pointerY;
      matrix = _getConcatenatedMatrix(target.parentNode, true);

      if (shiftStart && self.isPressed && start.join(",") !== matrix.join(",")) {
        //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
        a = start[0];
        b = start[1];
        c = start[2];
        d = start[3];
        tx = start[4];
        ty = start[5];
        determinant = a * d - b * c;
        pointerX = startPointerX * (d / determinant) + startPointerY * (-c / determinant) + (c * ty - d * tx) / determinant;
        pointerY = startPointerX * (-b / determinant) + startPointerY * (a / determinant) + -(a * ty - b * tx) / determinant;
        startPointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
        startPointerX = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
      }

      if (!matrix[1] && !matrix[2] && matrix[0] == 1 && matrix[3] == 1 && matrix[4] == 0 && matrix[5] == 0) {
        //if there are no transforms, we can optimize performance by not factoring in the matrix
        matrix = null;
      }
    },
        recordStartPositions = function recordStartPositions() {
      var edgeTolerance = 1 - self.edgeResistance;
      updateMatrix(false);

      if (matrix) {
        startPointerX = self.pointerX * matrix[0] + self.pointerY * matrix[2] + matrix[4]; //translate to local coordinate system

        startPointerY = self.pointerX * matrix[1] + self.pointerY * matrix[3] + matrix[5];
      }

      if (dirty) {
        setPointerPosition(self.pointerX, self.pointerY);
        render(true);
      }

      if (scrollProxy) {
        calculateBounds();
        startElementY = scrollProxy.top();
        startElementX = scrollProxy.left();
      } else {
        //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
        if (isTweening()) {
          syncXY(true, true);
          calculateBounds();
        } else {
          self.applyBounds();
        }

        if (rotationMode) {
          rotationOrigin = self.rotationOrigin = _localToGlobal(target, {
            x: 0,
            y: 0
          });
          syncXY(true, true);
          startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

          startElementY = self.y = Math.atan2(rotationOrigin.y - self.pointerY, self.pointerX - rotationOrigin.x) * _RAD2DEG;
        } else {
          startScrollTop = target.parentNode ? target.parentNode.scrollTop || 0 : 0;
          startScrollLeft = target.parentNode ? target.parentNode.scrollLeft || 0 : 0;
          startElementY = _getStyle(target, yProp); //record the starting top and left values so that we can just add the mouse's movement to them later.

          startElementX = _getStyle(target, xProp);
        }
      }

      if (hasBounds && edgeTolerance) {
        if (startElementX > maxX) {
          startElementX = maxX + (startElementX - maxX) / edgeTolerance;
        } else if (startElementX < minX) {
          startElementX = minX - (minX - startElementX) / edgeTolerance;
        }

        if (!rotationMode) {
          if (startElementY > maxY) {
            startElementY = maxY + (startElementY - maxY) / edgeTolerance;
          } else if (startElementY < minY) {
            startElementY = minY - (minY - startElementY) / edgeTolerance;
          }
        }
      }

      self.startX = startElementX;
      self.startY = startElementY;
    },
        isTweening = function isTweening() {
      return self.tween && self.tween.isActive();
    },
        removePlaceholder = function removePlaceholder() {
      if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
        //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
        _placeholderDiv.parentNode.removeChild(_placeholderDiv);
      }
    },
        buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
      if (min == null) {
        min = -_max;
      }

      if (max == null) {
        max = _max;
      }

      if (typeof snap === "function") {
        return function (n) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          return snap.call(self, n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor;
        };
      }

      if (snap instanceof Array) {
        return function (n) {
          var i = snap.length,
              closest = 0,
              absDif = _max,
              val,
              dif;

          while (--i > -1) {
            val = snap[i];
            dif = val - n;

            if (dif < 0) {
              dif = -dif;
            }

            if (dif < absDif && val >= min && val <= max) {
              closest = i;
              absDif = dif;
            }
          }

          return snap[closest];
        };
      }

      return isNaN(snap) ? function (n) {
        return n;
      } : function () {
        return snap * factor;
      };
    },
        buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
      radius = radius && radius < _max ? radius * radius : _max; //so we don't have to Math.sqrt() in the functions. Performance optimization.

      if (typeof snap === "function") {
        return function (point) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
              x = point.x,
              y = point.y,
              result,
              dx,
              dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
          point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
          result = snap.call(self, point);

          if (result !== point) {
            point.x = result.x;
            point.y = result.y;
          }

          if (factor !== 1) {
            point.x *= factor;
            point.y *= factor;
          }

          if (radius < _max) {
            dx = point.x - x;
            dy = point.y - y;

            if (dx * dx + dy * dy > radius) {
              point.x = x;
              point.y = y;
            }
          }

          return point;
        };
      }

      if (snap instanceof Array) {
        return function (p) {
          var i = snap.length,
              closest = 0,
              minDist = _max,
              x,
              y,
              point,
              dist;

          while (--i > -1) {
            point = snap[i];
            x = point.x - p.x;
            y = point.y - p.y;
            dist = x * x + y * y;

            if (dist < minDist) {
              closest = i;
              minDist = dist;
            }
          }

          return minDist <= radius ? snap[closest] : p;
        };
      }

      return function (n) {
        return n;
      };
    },
        //called when the mouse is pressed (or touch starts)
    onPress = function onPress(e, force) {
      var i;

      if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
        //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
        return;
      }

      interrupted = isTweening();
      self.pointerEvent = e;

      if (_touchEventLookup[e.type]) {
        //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
        touchEventTarget = e.type.indexOf("touch") !== -1 ? e.currentTarget || e.target : _doc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

        _addListener(touchEventTarget, "touchend", onRelease);

        _addListener(touchEventTarget, "touchmove", onMove);

        _addListener(touchEventTarget, "touchcancel", onRelease);

        _addListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        touchEventTarget = null;

        _addListener(_doc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.

      }

      touchDragAxis = null;

      _addListener(_doc, "mouseup", onRelease);

      if (e && e.target) {
        _addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"

      }

      isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;

      if (isClicking) {
        _addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.


        _dispatchEvent(self, "pressInit", "onPressInit");

        _dispatchEvent(self, "press", "onPress");

        _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)


        return;
      }

      allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

      if (_isOldIE) {
        e = _populateIEEvent(e, true);
      } else if (!allowNativeTouchScrolling && !self.allowEventDefault) {
        e.preventDefault();

        if (e.preventManipulation) {
          e.preventManipulation(); //for some Microsoft browsers
        }
      }

      if (e.changedTouches) {
        //touch events store the data slightly differently
        e = touch = e.changedTouches[0];
        touchID = e.identifier;
      } else if (e.pointerId) {
        touchID = e.pointerId; //for some Microsoft browsers
      } else {
        touch = touchID = null;
      }

      _dragCount++;

      _addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)


      startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

      startPointerX = self.pointerX = e.pageX;

      _dispatchEvent(self, "pressInit", "onPressInit");

      if (allowNativeTouchScrolling || self.autoScroll) {
        _recordMaxScrolls(target.parentNode);
      }

      if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
        //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
        _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
        target.parentNode.appendChild(_placeholderDiv);
      }

      recordStartPositions();

      if (self.tween) {
        self.tween.kill();
      }

      self.isThrowing = false;

      _TweenLite.default.killTweensOf(scrollProxy || target, true, killProps); //in case the user tries to drag it before the last tween is done.


      if (scrollProxy) {
        _TweenLite.default.killTweensOf(target, true, {
          scrollTo: 1
        }); //just in case the original target's scroll position is being tweened somewhere else.

      }

      self.tween = self.lockedAxis = null;

      if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
        target.style.zIndex = Draggable.zIndex++;
      }

      self.isPressed = true;
      hasDragCallback = !!(vars.onDrag || self._listeners.drag);

      if (!rotationMode && (vars.cursor !== false || vars.activeCursor)) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.activeCursor || vars.cursor || "move");
        }
      }

      _dispatchEvent(self, "press", "onPress");
    },
        //called every time the mouse/touch moves
    onMove = function onMove(e) {
      var originalEvent = e,
          touches,
          pointerX,
          pointerY,
          i,
          dx,
          dy;

      if (!enabled || _isMultiTouching || !self.isPressed || !e) {
        return;
      }

      self.pointerEvent = e;
      touches = e.changedTouches;

      if (touches) {
        //touch events store the data slightly differently
        e = touches[0];

        if (e !== touch && e.identifier !== touchID) {
          //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
          i = touches.length;

          while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

          if (i < 0) {
            return;
          }
        }
      } else if (e.pointerId && touchID && e.pointerId !== touchID) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      if (_isOldIE) {
        e = _populateIEEvent(e, true);
      } else {
        if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
          //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
          pointerX = e.pageX;
          pointerY = e.pageY;

          if (matrix) {
            i = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
            pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
            pointerX = i;
          }

          dx = Math.abs(pointerX - startPointerX);
          dy = Math.abs(pointerY - startPointerY);

          if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            touchDragAxis = dx > dy && allowX ? "x" : "y";

            if (self.vars.lockAxisOnTouchScroll !== false) {
              self.lockedAxis = touchDragAxis === "x" ? "y" : "x";

              if (typeof self.vars.onLockAxis === "function") {
                self.vars.onLockAxis.call(self, originalEvent);
              }
            }

            if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
              onRelease(originalEvent);
              return;
            }
          }
        }

        if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
          originalEvent.preventDefault();

          if (originalEvent.preventManipulation) {
            //for some Microsoft browsers
            originalEvent.preventManipulation();
          }
        }
      }

      if (self.autoScroll) {
        checkAutoScrollBounds = true;
      }

      setPointerPosition(e.pageX, e.pageY);
    },
        setPointerPosition = function setPointerPosition(pointerX, pointerY) {
      var dragTolerance = 1 - self.dragResistance,
          edgeTolerance = 1 - self.edgeResistance,
          xChange,
          yChange,
          x,
          y,
          dif,
          temp;
      self.pointerX = pointerX;
      self.pointerY = pointerY;

      if (rotationMode) {
        y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
        dif = self.y - y;

        if (dif > 180) {
          startElementY -= 360;
          self.y = y;
        } else if (dif < -180) {
          startElementY += 360;
          self.y = y;
        }

        if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
          self.y = y;
          x = startElementX + (startElementY - y) * dragTolerance;
        } else {
          x = startElementX;
        }
      } else {
        if (matrix) {
          temp = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
          pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
          pointerX = temp;
        }

        yChange = pointerY - startPointerY;
        xChange = pointerX - startPointerX;

        if (yChange < minimumMovement && yChange > -minimumMovement) {
          yChange = 0;
        }

        if (xChange < minimumMovement && xChange > -minimumMovement) {
          xChange = 0;
        }

        if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
          temp = self.lockedAxis;

          if (!temp) {
            self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;

            if (temp && typeof self.vars.onLockAxis === "function") {
              self.vars.onLockAxis.call(self, self.pointerEvent);
            }
          }

          if (temp === "y") {
            yChange = 0;
          } else if (temp === "x") {
            xChange = 0;
          }
        }

        x = startElementX + xChange * dragTolerance;
        y = startElementY + yChange * dragTolerance;
      }

      if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
        if (snapXY) {
          _temp1.x = x;
          _temp1.y = y;
          temp = snapXY(_temp1);
          x = temp.x;
          y = temp.y;
        }

        if (snapX) {
          x = snapX(x);
        }

        if (snapY) {
          y = snapY(y);
        }
      } else if (hasBounds) {
        if (x > maxX) {
          x = maxX + (x - maxX) * edgeTolerance;
        } else if (x < minX) {
          x = minX + (x - minX) * edgeTolerance;
        }

        if (!rotationMode) {
          if (y > maxY) {
            y = maxY + (y - maxY) * edgeTolerance;
          } else if (y < minY) {
            y = minY + (y - minY) * edgeTolerance;
          }
        }
      }

      if (!rotationMode && !matrix) {
        x = Math.round(x); //helps work around an issue with some Win Touch devices

        y = Math.round(y);
      }

      if (self.x !== x || self.y !== y && !rotationMode) {
        if (rotationMode) {
          self.endRotation = self.x = self.endX = x;
          dirty = true;
        } else {
          if (allowY) {
            self.y = self.endY = y;
            dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
          }

          if (allowX) {
            self.x = self.endX = x;
            dirty = true;
          }
        }

        if (!self.isDragging && self.isPressed) {
          self.isDragging = true;

          _dispatchEvent(self, "dragstart", "onDragStart");
        }
      }
    },
        //called when the mouse/touch is released
    onRelease = function onRelease(e, force) {
      if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      self.isPressed = false;

      var originalEvent = e,
          wasDragging = self.isDragging,
          isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
          placeholderDelayedCall = _TweenLite.default.delayedCall(0.001, removePlaceholder),
          touches,
          i,
          syntheticEvent,
          eventTarget,
          syntheticClick;

      if (touchEventTarget) {
        _removeListener(touchEventTarget, "touchend", onRelease);

        _removeListener(touchEventTarget, "touchmove", onMove);

        _removeListener(touchEventTarget, "touchcancel", onRelease);

        _removeListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        _removeListener(_doc, "mousemove", onMove);
      }

      _removeListener(_doc, "mouseup", onRelease);

      if (e && e.target) {
        _removeListener(e.target, "mouseup", onRelease);
      }

      dirty = false;

      if (isClicking && !isContextMenuRelease) {
        if (e) {
          _removeListener(e.target, "change", onRelease);

          self.pointerEvent = originalEvent;
        }

        _setSelectable(triggers, false);

        _dispatchEvent(self, "release", "onRelease");

        _dispatchEvent(self, "click", "onClick");

        isClicking = false;
        return;
      }

      _removeFromRenderQueue(render);

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? "move" : null));
        }
      }

      if (wasDragging) {
        dragEndTime = _lastDragTime = _getTime();
        self.isDragging = false;
      }

      _dragCount--;

      if (e) {
        if (_isOldIE) {
          e = _populateIEEvent(e, false);
        }

        touches = e.changedTouches;

        if (touches) {
          //touch events store the data slightly differently
          e = touches[0];

          if (e !== touch && e.identifier !== touchID) {
            //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
            i = touches.length;

            while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

            if (i < 0) {
              return;
            }
          }
        }

        self.pointerEvent = originalEvent;
        self.pointerX = e.pageX;
        self.pointerY = e.pageY;
      }

      if (isContextMenuRelease && originalEvent) {
        originalEvent.preventDefault();

        if (originalEvent.preventManipulation) {
          originalEvent.preventManipulation(); //for some Microsoft browsers
        }

        _dispatchEvent(self, "release", "onRelease");
      } else if (originalEvent && !wasDragging) {
        if (interrupted && (vars.snap || vars.bounds)) {
          //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
          animate(vars.throwProps);
        }

        _dispatchEvent(self, "release", "onRelease");

        if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
          //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
          _dispatchEvent(self, "click", "onClick");

          if (_getTime() - clickTime < 300) {
            _dispatchEvent(self, "doubleclick", "onDoubleClick");
          }

          eventTarget = originalEvent.target || originalEvent.srcElement || target; //old IE uses srcElement

          clickTime = _getTime();

          syntheticClick = function syntheticClick() {
            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
            if (clickTime !== clickDispatch && self.enabled() && !self.isPressed) {
              if (eventTarget.click) {
                //some browsers (like mobile Safari) don't properly trigger the click event
                eventTarget.click();
              } else if (_doc.createEvent) {
                syntheticEvent = _doc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, window, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                eventTarget.dispatchEvent(syntheticEvent);
              }
            }
          };

          if (!_isAndroid && !originalEvent.defaultPrevented) {
            //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
            _TweenLite.default.delayedCall(0.00001, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click.

          }
        }
      } else {
        animate(vars.throwProps); //will skip if throwProps isn't defined or ThrowPropsPlugin isn't loaded.

        if (!_isOldIE && !self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
          originalEvent.preventDefault();

          if (originalEvent.preventManipulation) {
            originalEvent.preventManipulation(); //for some Microsoft browsers
          }
        }

        _dispatchEvent(self, "release", "onRelease");
      }

      if (isTweening()) {
        placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets
      }

      if (wasDragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return true;
    },
        updateScroll = function updateScroll(e) {
      if (e && self.isDragging && !scrollProxy) {
        var parent = e.target || e.srcElement || target.parentNode,
            deltaX = parent.scrollLeft - parent._gsScrollX,
            deltaY = parent.scrollTop - parent._gsScrollY;

        if (deltaX || deltaY) {
          if (matrix) {
            startPointerX -= deltaX * matrix[0] + deltaY * matrix[2];
            startPointerY -= deltaY * matrix[3] + deltaX * matrix[1];
          } else {
            startPointerX -= deltaX;
            startPointerY -= deltaY;
          }

          parent._gsScrollX += deltaX;
          parent._gsScrollY += deltaY;
          setPointerPosition(self.pointerX, self.pointerY);
        }
      }
    },
        onClick = function onClick(e) {
      //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
      var time = _getTime(),
          recentlyClicked = time - clickTime < 40,
          recentlyDragged = time - dragEndTime < 40,
          alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
          isModern = !!e.preventDefault,
          defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
          alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
          trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?


      if (isModern && (alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false)) {
        e.stopImmediatePropagation();
      }

      if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted !== alreadyDispatchedTrusted)) {
        //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
        if (trusted && alreadyDispatched) {
          trustedClickDispatch = clickTime;
        }

        clickDispatch = clickTime;
        return;
      }

      if (self.isPressed || recentlyDragged || recentlyClicked) {
        if (!isModern) {
          e.returnValue = false;
        } else if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
          e.preventDefault();

          if (e.preventManipulation) {
            e.preventManipulation(); //for some Microsoft browsers
          }
        }
      }
    },
        localizePoint = function localizePoint(p) {
      return matrix ? {
        x: p.x * matrix[0] + p.y * matrix[2] + matrix[4],
        y: p.x * matrix[1] + p.y * matrix[3] + matrix[5]
      } : {
        x: p.x,
        y: p.y
      };
    };

    old = Draggable.get(this.target);

    if (old) {
      old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
    } //give the user access to start/stop dragging...


    this.startDrag = function (e, align) {
      var r1, r2, p1, p2;
      onPress(e || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

      if (align && !self.hitTest(e || self.pointerEvent)) {
        r1 = _parseRect(e || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }

      if (!self.isDragging) {
        self.isDragging = true;

        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };

    this.drag = onMove;

    this.endDrag = function (e) {
      onRelease(e || self.pointerEvent, true);
    };

    this.timeSinceDrag = function () {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
    };

    this.timeSinceClick = function () {
      return (_getTime() - clickTime) / 1000;
    };

    this.hitTest = function (target, threshold) {
      return Draggable.hitTest(self.target, target, threshold);
    };

    this.getDirection = function (from, diagonalThreshold) {
      //from can be "start" (default), "velocity", or an element
      var mode = from === "velocity" && ThrowPropsPlugin ? from : _typeof(from) === "object" && !rotationMode ? "element" : "start",
          xChange,
          yChange,
          ratio,
          direction,
          r1,
          r2;

      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }

      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? ThrowPropsPlugin.getVelocity(this.target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);

      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? ThrowPropsPlugin.getVelocity(this.target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";

        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }

          direction += yChange < 0 ? "up" : "down";
        }
      }

      return direction;
    };

    this.applyBounds = function (newBounds) {
      var x, y, forceZeroVelocity, e, parent, isRoot;

      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true);
      }

      syncXY(true);
      calculateBounds();

      if (hasBounds) {
        x = self.x;
        y = self.y;

        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }

        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }

        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;

          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }

          dirty = true;
          render(true);

          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);

            e = target;
            _windowProxy.scrollTop = window.pageYOffset != null ? window.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _doc.body.scrollTop;
            _windowProxy.scrollLeft = window.pageXOffset != null ? window.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _doc.body.scrollLeft;

            while (e && !isRoot) {
              //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;

              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }

              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }

              e = parent;
            }
          }
        }

        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.throwProps, forceZeroVelocity);
        }
      }

      return self;
    };

    this.update = function (applyBounds, sticky, ignoreExternalChanges) {
      var x = self.x,
          y = self.y;
      updateMatrix(!sticky);

      if (applyBounds) {
        self.applyBounds();
      } else {
        if (dirty && ignoreExternalChanges) {
          render(true);
        }

        syncXY(true);
      }

      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);

        if (dirty) {
          render(true);
        }
      }

      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }

      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode);

        checkAutoScrollBounds = self.isDragging;
        render(true);
      }

      if (self.autoScroll) {
        //in case reparenting occurred.
        _removeScrollListener(target, updateScroll);

        _addScrollListener(target, updateScroll);
      }

      return self;
    };

    this.enable = function (type) {
      var id, i, trigger;

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _addListener(trigger, "mousedown", onPress);

          _addListener(trigger, "touchstart", onPress);

          _addListener(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.


          if (!rotationMode && vars.cursor !== false) {
            _setStyle(trigger, "cursor", vars.cursor || "move");
          }

          _setStyle(trigger, "touchCallout", "none");

          _setStyle(trigger, "touchAction", allowX === allowY ? "none" : allowX ? "pan-y" : "pan-x");

          if (_isSVG(trigger)) {
            // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
            _setStyle(trigger.ownerSVGElement || trigger, "touchAction", allowX === allowY ? "none" : allowX ? "pan-y" : "pan-x");
          }

          if (!this.vars.allowContextMenu) {
            _addListener(trigger, "contextmenu", onContextMenu);
          }
        }

        _setSelectable(triggers, false);
      }

      _addScrollListener(target, updateScroll);

      enabled = true;

      if (ThrowPropsPlugin && type !== "soft") {
        ThrowPropsPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      if (scrollProxy) {
        scrollProxy.enable();
      }

      target._gsDragID = id = "d" + _lookupCount++;
      _lookup[id] = this;

      if (scrollProxy) {
        scrollProxy.element._gsDragID = id;
      }

      _TweenLite.default.set(target, {
        x: "+=0",
        overwrite: false,
        data: "_draggable"
      }); //simply ensures that there's a _gsTransform on the element.


      applyObj = {
        t: target,
        data: _isOldIE ? cssVars : target._gsTransform,
        tween: {},
        setRatio: _isOldIE ? function () {
          _TweenLite.default.set(target, tempVars);
        } : _CSSPlugin.default._internals.setTransformRatio || _CSSPlugin.default._internals.set3DTransformRatio
      };
      recordStartPositions();
      self.update(true);
      return self;
    };

    this.disable = function (type) {
      var dragging = self.isDragging,
          i,
          trigger;

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", null);
        }
      }

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _setStyle(trigger, "touchCallout", null);

          _setStyle(trigger, "touchAction", null);

          _removeListener(trigger, "mousedown", onPress);

          _removeListener(trigger, "touchstart", onPress);

          _removeListener(trigger, "click", onClick);

          _removeListener(trigger, "contextmenu", onContextMenu);
        }

        _setSelectable(triggers, true);

        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);

          _removeListener(touchEventTarget, "touchend", onRelease);

          _removeListener(touchEventTarget, "touchmove", onMove);
        }

        _removeListener(_doc, "mouseup", onRelease);

        _removeListener(_doc, "mousemove", onMove);
      }

      _removeScrollListener(target, updateScroll);

      enabled = false;

      if (ThrowPropsPlugin && type !== "soft") {
        ThrowPropsPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      if (scrollProxy) {
        scrollProxy.disable();
      }

      _removeFromRenderQueue(render);

      self.isDragging = self.isPressed = isClicking = false;

      if (dragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return self;
    };

    this.enabled = function (value, type) {
      return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
    };

    this.kill = function () {
      self.isThrowing = false;

      _TweenLite.default.killTweensOf(scrollProxy || target, true, killProps);

      self.disable();

      _TweenLite.default.set(triggers, {
        clearProps: "userSelect"
      });

      delete _lookup[target._gsDragID];
      return self;
    };

    if (type.indexOf("scroll") !== -1) {
      scrollProxy = this.scrollProxy = new ScrollProxy(target, _extend({
        onKill: function onKill() {
          //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
          if (self.isPressed) {
            onRelease(null);
          }
        }
      }, vars)); //a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)

      target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
      target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
      target = scrollProxy.content;
    }

    if (vars.force3D !== false) {
      _TweenLite.default.set(target, {
        force3D: true
      }); //improve performance by forcing a GPU layer when possible

    }

    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }

      if (allowY) {
        killProps[yProp] = 1;
      }
    }

    if (rotationMode) {
      tempVars = _tempVarsRotation;
      cssVars = tempVars.css;
      tempVars.overwrite = false;
    } else if (xyMode) {
      tempVars = allowX && allowY ? _tempVarsXY : allowX ? _tempVarsX : _tempVarsY;
      cssVars = tempVars.css;
      tempVars.overwrite = false;
    }

    this.enable();
  },
      p = Draggable.prototype = new _TweenLite.EventDispatcher();

  p.constructor = Draggable;
  p.pointerX = p.pointerY = p.startX = p.startY = p.deltaX = p.deltaY = 0;
  p.isDragging = p.isPressed = false;
  Draggable.version = "0.17.1";
  Draggable.zIndex = 1000;

  _addListener(_doc, "touchcancel", function () {//some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.
  });

  _addListener(_doc, "contextmenu", function (e) {
    var p;

    for (p in _lookup) {
      if (_lookup[p].isPressed) {
        _lookup[p].endDrag();
      }
    }
  });

  Draggable.create = function (targets, vars) {
    if (typeof targets === "string") {
      targets = _TweenLite.default.selector(targets);
    }

    var a = !targets || targets.length === 0 ? [] : _isArrayLike(targets) ? _flattenArray(targets) : [targets],
        i = a.length;

    while (--i > -1) {
      a[i] = new Draggable(a[i], vars);
    }

    return a;
  };

  Draggable.get = function (target) {
    return _lookup[(_unwrapElement(target) || {})._gsDragID];
  };

  Draggable.timeSinceDrag = function () {
    return (_getTime() - _lastDragTime) / 1000;
  };

  var _tempRect = {},
      //reuse to reduce garbage collection tasks
  _oldIERect = function _oldIERect(e) {
    //IE8 doesn't support getBoundingClientRect(), so we use this as a backup.
    var top = 0,
        left = 0,
        width,
        height;
    e = _unwrapElement(e);
    width = e.offsetWidth;
    height = e.offsetHeight;

    while (e) {
      top += e.offsetTop;
      left += e.offsetLeft;
      e = e.offsetParent;
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height
    };
  },
      _parseRect = function _parseRect(e, undefined) {
    //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
    if (e === window) {
      _tempRect.left = _tempRect.top = 0;
      _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0;
      _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0;
      return _tempRect;
    }

    var r = e.pageX !== undefined ? {
      left: e.pageX - _getDocScrollLeft(),
      top: e.pageY - _getDocScrollTop(),
      right: e.pageX - _getDocScrollLeft() + 1,
      bottom: e.pageY - _getDocScrollTop() + 1
    } : !e.nodeType && e.left !== undefined && e.top !== undefined ? e : _isOldIE ? _oldIERect(e) : _unwrapElement(e).getBoundingClientRect();

    if (r.right === undefined && r.width !== undefined) {
      r.right = r.left + r.width;
      r.bottom = r.top + r.height;
    } else if (r.width === undefined) {
      //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
      r = {
        width: r.right - r.left,
        height: r.bottom - r.top,
        right: r.right,
        left: r.left,
        bottom: r.bottom,
        top: r.top
      };
    }

    return r;
  };

  Draggable.hitTest = function (obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }

    var r1 = _parseRect(obj1),
        r2 = _parseRect(obj2),
        isOutside = r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top,
        overlap,
        area,
        isRatio;

    if (isOutside || !threshold) {
      return !isOutside;
    }

    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(r1.left, r2.left),
      top: Math.max(r1.top, r2.top)
    };
    overlap.width = Math.min(r1.right, r2.right) - overlap.left;
    overlap.height = Math.min(r1.bottom, r2.bottom) - overlap.top;

    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }

    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= r1.width * r1.height * threshold || area >= r2.width * r2.height * threshold;
    }

    return overlap.width > threshold && overlap.height > threshold;
  };

  _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;";
  return Draggable;
}, true);

var Draggable = _TweenLite.globals.Draggable;
exports.default = exports.Draggable = Draggable;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js"}],"../node_modules/gsap/EasePack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
exports.ExpoScaleEase = exports.Sine = exports.Expo = exports.Circ = exports.SteppedEase = exports.SlowMo = exports.RoughEase = exports.Bounce = exports.Elastic = exports.Back = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
_TweenLite._gsScope._gsDefine("easing.Back", ["easing.Ease"], function () {
  var w = _TweenLite._gsScope.GreenSockGlobals || _TweenLite._gsScope,
      gs = w.com.greensock,
      _2PI = Math.PI * 2,
      _HALF_PI = Math.PI / 2,
      _class = gs._class,
      _create = function _create(n, f) {
    var C = _class("easing." + n, function () {}, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;
    return C;
  },
      _easeReg = _TweenLite.Ease.register || function () {},
      //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
  _wrap = function _wrap(name, EaseOut, EaseIn, EaseInOut, aliases) {
    var C = _class("easing." + name, {
      easeOut: new EaseOut(),
      easeIn: new EaseIn(),
      easeInOut: new EaseInOut()
    }, true);

    _easeReg(C, name);

    return C;
  },
      EasePoint = function EasePoint(time, value, next) {
    this.t = time;
    this.v = value;

    if (next) {
      this.next = next;
      next.prev = this;
      this.c = next.v - value;
      this.gap = next.t - time;
    }
  },
      //Back
  _createBack = function _createBack(n, f) {
    var C = _class("easing." + n, function (overshoot) {
      this._p1 = overshoot || overshoot === 0 ? overshoot : 1.70158;
      this._p2 = this._p1 * 1.525;
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (overshoot) {
      return new C(overshoot);
    };

    return C;
  },
      Back = _wrap("Back", _createBack("BackOut", function (p) {
    return (p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1;
  }), _createBack("BackIn", function (p) {
    return p * p * ((this._p1 + 1) * p - this._p1);
  }), _createBack("BackInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
  })),
      //SlowMo
  SlowMo = _class("easing.SlowMo", function (linearRatio, power, yoyoMode) {
    power = power || power === 0 ? power : 0.7;

    if (linearRatio == null) {
      linearRatio = 0.7;
    } else if (linearRatio > 1) {
      linearRatio = 1;
    }

    this._p = linearRatio !== 1 ? power : 0;
    this._p1 = (1 - linearRatio) / 2;
    this._p2 = linearRatio;
    this._p3 = this._p1 + this._p2;
    this._calcEnd = yoyoMode === true;
  }, true),
      p = SlowMo.prototype = new _TweenLite.Ease(),
      SteppedEase,
      ExpoScaleEase,
      RoughEase,
      _createElastic;

  p.constructor = SlowMo;

  p.getRatio = function (p) {
    var r = p + (0.5 - p) * this._p;

    if (p < this._p1) {
      return this._calcEnd ? 1 - (p = 1 - p / this._p1) * p : r - (p = 1 - p / this._p1) * p * p * p * r;
    } else if (p > this._p3) {
      return this._calcEnd ? p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p : r + (p - r) * (p = (p - this._p3) / this._p1) * p * p * p; //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
    }

    return this._calcEnd ? 1 : r;
  };

  SlowMo.ease = new SlowMo(0.7, 0.7);

  p.config = SlowMo.config = function (linearRatio, power, yoyoMode) {
    return new SlowMo(linearRatio, power, yoyoMode);
  }; //SteppedEase


  SteppedEase = _class("easing.SteppedEase", function (steps, immediateStart) {
    steps = steps || 1;
    this._p1 = 1 / steps;
    this._p2 = steps + (immediateStart ? 0 : 1);
    this._p3 = immediateStart ? 1 : 0;
  }, true);
  p = SteppedEase.prototype = new _TweenLite.Ease();
  p.constructor = SteppedEase;

  p.getRatio = function (p) {
    if (p < 0) {
      p = 0;
    } else if (p >= 1) {
      p = 0.999999999;
    }

    return ((this._p2 * p | 0) + this._p3) * this._p1;
  };

  p.config = SteppedEase.config = function (steps, immediateStart) {
    return new SteppedEase(steps, immediateStart);
  }; //ExpoScaleEase


  ExpoScaleEase = _class("easing.ExpoScaleEase", function (start, end, ease) {
    this._p1 = Math.log(end / start);
    this._p2 = end - start;
    this._p3 = start;
    this._ease = ease;
  }, true);
  p = ExpoScaleEase.prototype = new _TweenLite.Ease();
  p.constructor = ExpoScaleEase;

  p.getRatio = function (p) {
    if (this._ease) {
      p = this._ease.getRatio(p);
    }

    return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
  };

  p.config = ExpoScaleEase.config = function (start, end, ease) {
    return new ExpoScaleEase(start, end, ease);
  }; //RoughEase


  RoughEase = _class("easing.RoughEase", function (vars) {
    vars = vars || {};
    var taper = vars.taper || "none",
        a = [],
        cnt = 0,
        points = (vars.points || 20) | 0,
        i = points,
        randomize = vars.randomize !== false,
        clamp = vars.clamp === true,
        template = vars.template instanceof _TweenLite.Ease ? vars.template : null,
        strength = typeof vars.strength === "number" ? vars.strength * 0.4 : 0.4,
        x,
        y,
        bump,
        invX,
        obj,
        pnt;

    while (--i > -1) {
      x = randomize ? Math.random() : 1 / points * i;
      y = template ? template.getRatio(x) : x;

      if (taper === "none") {
        bump = strength;
      } else if (taper === "out") {
        invX = 1 - x;
        bump = invX * invX * strength;
      } else if (taper === "in") {
        bump = x * x * strength;
      } else if (x < 0.5) {
        //"both" (start)
        invX = x * 2;
        bump = invX * invX * 0.5 * strength;
      } else {
        //"both" (end)
        invX = (1 - x) * 2;
        bump = invX * invX * 0.5 * strength;
      }

      if (randomize) {
        y += Math.random() * bump - bump * 0.5;
      } else if (i % 2) {
        y += bump * 0.5;
      } else {
        y -= bump * 0.5;
      }

      if (clamp) {
        if (y > 1) {
          y = 1;
        } else if (y < 0) {
          y = 0;
        }
      }

      a[cnt++] = {
        x: x,
        y: y
      };
    }

    a.sort(function (a, b) {
      return a.x - b.x;
    });
    pnt = new EasePoint(1, 1, null);
    i = points;

    while (--i > -1) {
      obj = a[i];
      pnt = new EasePoint(obj.x, obj.y, pnt);
    }

    this._prev = new EasePoint(0, 0, pnt.t !== 0 ? pnt : pnt.next);
  }, true);
  p = RoughEase.prototype = new _TweenLite.Ease();
  p.constructor = RoughEase;

  p.getRatio = function (p) {
    var pnt = this._prev;

    if (p > pnt.t) {
      while (pnt.next && p >= pnt.t) {
        pnt = pnt.next;
      }

      pnt = pnt.prev;
    } else {
      while (pnt.prev && p <= pnt.t) {
        pnt = pnt.prev;
      }
    }

    this._prev = pnt;
    return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
  };

  p.config = function (vars) {
    return new RoughEase(vars);
  };

  RoughEase.ease = new RoughEase(); //Bounce

  _wrap("Bounce", _create("BounceOut", function (p) {
    if (p < 1 / 2.75) {
      return 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    }

    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
  }), _create("BounceIn", function (p) {
    if ((p = 1 - p) < 1 / 2.75) {
      return 1 - 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
    } else if (p < 2.5 / 2.75) {
      return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
    }

    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
  }), _create("BounceInOut", function (p) {
    var invert = p < 0.5;

    if (invert) {
      p = 1 - p * 2;
    } else {
      p = p * 2 - 1;
    }

    if (p < 1 / 2.75) {
      p = 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    } else {
      p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
    }

    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
  })); //CIRC


  _wrap("Circ", _create("CircOut", function (p) {
    return Math.sqrt(1 - (p = p - 1) * p);
  }), _create("CircIn", function (p) {
    return -(Math.sqrt(1 - p * p) - 1);
  }), _create("CircInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
  })); //Elastic


  _createElastic = function _createElastic(n, f, def) {
    var C = _class("easing." + n, function (amplitude, period) {
      this._p1 = amplitude >= 1 ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.

      this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
      this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
      this._p2 = _2PI / this._p2; //precalculate to optimize
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (amplitude, period) {
      return new C(amplitude, period);
    };

    return C;
  };

  _wrap("Elastic", _createElastic("ElasticOut", function (p) {
    return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1;
  }, 0.3), _createElastic("ElasticIn", function (p) {
    return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2));
  }, 0.3), _createElastic("ElasticInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * 0.5 + 1;
  }, 0.45)); //Expo


  _wrap("Expo", _create("ExpoOut", function (p) {
    return 1 - Math.pow(2, -10 * p);
  }), _create("ExpoIn", function (p) {
    return Math.pow(2, 10 * (p - 1)) - 0.001;
  }), _create("ExpoInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  })); //Sine


  _wrap("Sine", _create("SineOut", function (p) {
    return Math.sin(p * _HALF_PI);
  }), _create("SineIn", function (p) {
    return -Math.cos(p * _HALF_PI) + 1;
  }), _create("SineInOut", function (p) {
    return -0.5 * (Math.cos(Math.PI * p) - 1);
  }));

  _class("easing.EaseLookup", {
    find: function find(s) {
      return _TweenLite.Ease.map[s];
    }
  }, true); //register the non-standard eases


  _easeReg(w.SlowMo, "SlowMo", "ease,");

  _easeReg(RoughEase, "RoughEase", "ease,");

  _easeReg(SteppedEase, "SteppedEase", "ease,");

  return Back;
}, true);

var Back = _TweenLite.globals.Back;
exports.Back = Back;
var Elastic = _TweenLite.globals.Elastic;
exports.Elastic = Elastic;
var Bounce = _TweenLite.globals.Bounce;
exports.Bounce = Bounce;
var RoughEase = _TweenLite.globals.RoughEase;
exports.RoughEase = RoughEase;
var SlowMo = _TweenLite.globals.SlowMo;
exports.SlowMo = SlowMo;
var SteppedEase = _TweenLite.globals.SteppedEase;
exports.SteppedEase = SteppedEase;
var Circ = _TweenLite.globals.Circ;
exports.Circ = Circ;
var Expo = _TweenLite.globals.Expo;
exports.Expo = Expo;
var Sine = _TweenLite.globals.Sine;
exports.Sine = Sine;
var ExpoScaleEase = _TweenLite.globals.ExpoScaleEase;
exports.ExpoScaleEase = ExpoScaleEase;
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js"}],"../node_modules/gsap/all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "_gsScope", {
  enumerable: true,
  get: function () {
    return _TweenLite._gsScope;
  }
});
Object.defineProperty(exports, "TweenMax", {
  enumerable: true,
  get: function () {
    return _TweenMaxBase.default;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _TimelineMax.default;
  }
});
Object.defineProperty(exports, "AttrPlugin", {
  enumerable: true,
  get: function () {
    return _AttrPlugin.default;
  }
});
Object.defineProperty(exports, "BezierPlugin", {
  enumerable: true,
  get: function () {
    return _BezierPlugin.default;
  }
});
Object.defineProperty(exports, "ColorPropsPlugin", {
  enumerable: true,
  get: function () {
    return _ColorPropsPlugin.default;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.default;
  }
});
Object.defineProperty(exports, "CSSRulePlugin", {
  enumerable: true,
  get: function () {
    return _CSSRulePlugin.default;
  }
});
Object.defineProperty(exports, "DirectionalRotationPlugin", {
  enumerable: true,
  get: function () {
    return _DirectionalRotationPlugin.default;
  }
});
Object.defineProperty(exports, "EaselPlugin", {
  enumerable: true,
  get: function () {
    return _EaselPlugin.default;
  }
});
Object.defineProperty(exports, "EndArrayPlugin", {
  enumerable: true,
  get: function () {
    return _EndArrayPlugin.default;
  }
});
Object.defineProperty(exports, "ModifiersPlugin", {
  enumerable: true,
  get: function () {
    return _ModifiersPlugin.default;
  }
});
Object.defineProperty(exports, "PixiPlugin", {
  enumerable: true,
  get: function () {
    return _PixiPlugin.default;
  }
});
Object.defineProperty(exports, "RoundPropsPlugin", {
  enumerable: true,
  get: function () {
    return _RoundPropsPlugin.default;
  }
});
Object.defineProperty(exports, "ScrollToPlugin", {
  enumerable: true,
  get: function () {
    return _ScrollToPlugin.default;
  }
});
Object.defineProperty(exports, "TextPlugin", {
  enumerable: true,
  get: function () {
    return _TextPlugin.default;
  }
});
Object.defineProperty(exports, "Draggable", {
  enumerable: true,
  get: function () {
    return _Draggable.default;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _EasePack.Back;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _EasePack.Elastic;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _EasePack.Bounce;
  }
});
Object.defineProperty(exports, "RoughEase", {
  enumerable: true,
  get: function () {
    return _EasePack.RoughEase;
  }
});
Object.defineProperty(exports, "SlowMo", {
  enumerable: true,
  get: function () {
    return _EasePack.SlowMo;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _EasePack.SteppedEase;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _EasePack.Circ;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _EasePack.Expo;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _EasePack.Sine;
  }
});
Object.defineProperty(exports, "ExpoScaleEase", {
  enumerable: true,
  get: function () {
    return _EasePack.ExpoScaleEase;
  }
});

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TweenMaxBase = _interopRequireDefault(require("./TweenMaxBase.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

var _TimelineMax = _interopRequireDefault(require("./TimelineMax.js"));

var _AttrPlugin = _interopRequireDefault(require("./AttrPlugin.js"));

var _BezierPlugin = _interopRequireDefault(require("./BezierPlugin.js"));

var _ColorPropsPlugin = _interopRequireDefault(require("./ColorPropsPlugin.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

var _CSSRulePlugin = _interopRequireDefault(require("./CSSRulePlugin.js"));

var _DirectionalRotationPlugin = _interopRequireDefault(require("./DirectionalRotationPlugin.js"));

var _EaselPlugin = _interopRequireDefault(require("./EaselPlugin.js"));

var _EndArrayPlugin = _interopRequireDefault(require("./EndArrayPlugin.js"));

var _ModifiersPlugin = _interopRequireDefault(require("./ModifiersPlugin.js"));

var _PixiPlugin = _interopRequireDefault(require("./PixiPlugin.js"));

var _RoundPropsPlugin = _interopRequireDefault(require("./RoundPropsPlugin.js"));

var _ScrollToPlugin = _interopRequireDefault(require("./ScrollToPlugin.js"));

var _TextPlugin = _interopRequireDefault(require("./TextPlugin.js"));

var _Draggable = _interopRequireDefault(require("./Draggable.js"));

var _EasePack = require("./EasePack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./TweenMaxBase.js":"../node_modules/gsap/TweenMaxBase.js","./TimelineLite.js":"../node_modules/gsap/TimelineLite.js","./TimelineMax.js":"../node_modules/gsap/TimelineMax.js","./AttrPlugin.js":"../node_modules/gsap/AttrPlugin.js","./BezierPlugin.js":"../node_modules/gsap/BezierPlugin.js","./ColorPropsPlugin.js":"../node_modules/gsap/ColorPropsPlugin.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js","./CSSRulePlugin.js":"../node_modules/gsap/CSSRulePlugin.js","./DirectionalRotationPlugin.js":"../node_modules/gsap/DirectionalRotationPlugin.js","./EaselPlugin.js":"../node_modules/gsap/EaselPlugin.js","./EndArrayPlugin.js":"../node_modules/gsap/EndArrayPlugin.js","./ModifiersPlugin.js":"../node_modules/gsap/ModifiersPlugin.js","./PixiPlugin.js":"../node_modules/gsap/PixiPlugin.js","./RoundPropsPlugin.js":"../node_modules/gsap/RoundPropsPlugin.js","./ScrollToPlugin.js":"../node_modules/gsap/ScrollToPlugin.js","./TextPlugin.js":"../node_modules/gsap/TextPlugin.js","./Draggable.js":"../node_modules/gsap/Draggable.js","./EasePack.js":"../node_modules/gsap/EasePack.js"}],"../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js":[function(require,module,exports) {
var define;
/*!
 * ScrollMagic v2.0.7 (2019-05-07)
 * The javascript library for magical scroll interactions.
 * (c) 2019 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.7
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */

/**
 * @namespace ScrollMagic
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.ScrollMagic = factory();
  }
})(this, function () {
  "use strict";

  var ScrollMagic = function () {
    _util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
  };

  ScrollMagic.version = "2.0.7"; // TODO: temporary workaround for chrome's scroll jitter bug

  window.addEventListener("mousewheel", function () {}); // global const

  var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer";
  /**
   * The main class that is needed once per scroll container.
   *
   * @class
   *
   * @example
   * // basic initialization
   * var controller = new ScrollMagic.Controller();
   *
   * // passing options
   * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
   *
   * @param {object} [options] - An object containing one or more options for the controller.
   * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
   * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
   * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
   * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
  										 ** `0` => silent
  										 ** `1` => errors
  										 ** `2` => errors, warnings
  										 ** `3` => errors, warnings, debuginfo
   * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
   																										 This interval polls these parameters to fire the necessary events.  
   																										 If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
   *
   */

  ScrollMagic.Controller = function (options) {
    /*
     * ----------------------------------------------------------------
     * settings
     * ----------------------------------------------------------------
     */
    var NAMESPACE = 'ScrollMagic.Controller',
        SCROLL_DIRECTION_FORWARD = 'FORWARD',
        SCROLL_DIRECTION_REVERSE = 'REVERSE',
        SCROLL_DIRECTION_PAUSED = 'PAUSED',
        DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;
    /*
     * ----------------------------------------------------------------
     * private vars
     * ----------------------------------------------------------------
     */

    var Controller = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _sceneObjects = [],
        _updateScenesOnNextCycle = false,
        // can be boolean (true => all scenes) or an array of scenes to be updated
    _scrollPos = 0,
        _scrollDirection = SCROLL_DIRECTION_PAUSED,
        _isDocument = true,
        _viewPortSize = 0,
        _enabled = true,
        _updateTimeout,
        _refreshTimeout;
    /*
     * ----------------------------------------------------------------
     * private functions
     * ----------------------------------------------------------------
     */

    /**
     * Internal constructor function of the ScrollMagic Controller
     * @private
     */


    var construct = function () {
      for (var key in _options) {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      }

      _options.container = _util.get.elements(_options.container)[0]; // check ScrollContainer

      if (!_options.container) {
        log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
        throw NAMESPACE + " init failed."; // cancel
      }

      _isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container); // normalize to window

      if (_isDocument) {
        _options.container = window;
      } // update container size immediately


      _viewPortSize = getViewportSize(); // set event handlers

      _options.container.addEventListener("resize", onChange);

      _options.container.addEventListener("scroll", onChange);

      var ri = parseInt(_options.refreshInterval, 10);
      _options.refreshInterval = _util.type.Number(ri) ? ri : DEFAULT_OPTIONS.refreshInterval;
      scheduleRefresh();
      log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
    };
    /**
     * Schedule the next execution of the refresh function
     * @private
     */


    var scheduleRefresh = function () {
      if (_options.refreshInterval > 0) {
        _refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
      }
    };
    /**
     * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
     * @private
     */


    var getScrollPos = function () {
      return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
    };
    /**
     * Returns the current viewport Size (width vor horizontal, height for vertical)
     * @private
     */


    var getViewportSize = function () {
      return _options.vertical ? _util.get.height(_options.container) : _util.get.width(_options.container);
    };
    /**
     * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
     * Make available publicly for pinned mousewheel workaround.
     * @private
     */


    var setScrollPos = this._setScrollPos = function (pos) {
      if (_options.vertical) {
        if (_isDocument) {
          window.scrollTo(_util.get.scrollLeft(), pos);
        } else {
          _options.container.scrollTop = pos;
        }
      } else {
        if (_isDocument) {
          window.scrollTo(pos, _util.get.scrollTop());
        } else {
          _options.container.scrollLeft = pos;
        }
      }
    };
    /**
     * Handle updates in cycles instead of on scroll (performance)
     * @private
     */


    var updateScenes = function () {
      if (_enabled && _updateScenesOnNextCycle) {
        // determine scenes to update
        var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0); // reset scenes

        _updateScenesOnNextCycle = false;
        var oldScrollPos = _scrollPos; // update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)

        _scrollPos = Controller.scrollPos();
        var deltaScroll = _scrollPos - oldScrollPos;

        if (deltaScroll !== 0) {
          // scroll position changed?
          _scrollDirection = deltaScroll > 0 ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
        } // reverse order of scenes if scrolling reverse


        if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
          scenesToUpdate.reverse();
        } // update scenes


        scenesToUpdate.forEach(function (scene, index) {
          log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
          scene.update(true);
        });

        if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
          log(3, "updating 0 Scenes (nothing added to controller)");
        }
      }
    };
    /**
     * Initializes rAF callback
     * @private
     */


    var debounceUpdate = function () {
      _updateTimeout = _util.rAF(updateScenes);
    };
    /**
     * Handles Container changes
     * @private
     */


    var onChange = function (e) {
      log(3, "event fired causing an update:", e.type);

      if (e.type == "resize") {
        // resize
        _viewPortSize = getViewportSize();
        _scrollDirection = SCROLL_DIRECTION_PAUSED;
      } // schedule update


      if (_updateScenesOnNextCycle !== true) {
        _updateScenesOnNextCycle = true;
        debounceUpdate();
      }
    };

    var refresh = function () {
      if (!_isDocument) {
        // simulate resize event. Only works for viewport relevant param (performance)
        if (_viewPortSize != getViewportSize()) {
          var resizeEvent;

          try {
            resizeEvent = new Event('resize', {
              bubbles: false,
              cancelable: false
            });
          } catch (e) {
            // stupid IE
            resizeEvent = document.createEvent("Event");
            resizeEvent.initEvent("resize", false, false);
          }

          _options.container.dispatchEvent(resizeEvent);
        }
      }

      _sceneObjects.forEach(function (scene, index) {
        // refresh all scenes
        scene.refresh();
      });

      scheduleRefresh();
    };
    /**
     * Send a debug message to the console.
     * provided publicly with _log for plugins
     * @private
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */


    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    }; // for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins


    this._options = _options;
    /**
     * Sort scenes in ascending order of their start offset.
     * @private
     *
     * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
     * @return {array} The sorted array of Scenes.
     */

    var sortScenes = function (ScenesArray) {
      if (ScenesArray.length <= 1) {
        return ScenesArray;
      } else {
        var scenes = ScenesArray.slice(0);
        scenes.sort(function (a, b) {
          return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
        });
        return scenes;
      }
    };
    /**
     * ----------------------------------------------------------------
     * public functions
     * ----------------------------------------------------------------
     */

    /**
     * Add one ore more scene(s) to the controller.  
     * This is the equivalent to `Scene.addTo(controller)`.
     * @public
     * @example
     * // with a previously defined scene
     * controller.addScene(scene);
     *
     * // with a newly created scene.
     * controller.addScene(new ScrollMagic.Scene({duration : 0}));
     *
     * // adding multiple scenes
     * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
     *
     * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
     * @return {Controller} Parent object for chaining.
     */


    this.addScene = function (newScene) {
      if (_util.type.Array(newScene)) {
        newScene.forEach(function (scene, index) {
          Controller.addScene(scene);
        });
      } else if (newScene instanceof ScrollMagic.Scene) {
        if (newScene.controller() !== Controller) {
          newScene.addTo(Controller);
        } else if (_sceneObjects.indexOf(newScene) < 0) {
          // new scene
          _sceneObjects.push(newScene); // add to array


          _sceneObjects = sortScenes(_sceneObjects); // sort

          newScene.on("shift.controller_sort", function () {
            // resort whenever scene moves
            _sceneObjects = sortScenes(_sceneObjects);
          }); // insert Global defaults.

          for (var key in _options.globalSceneOptions) {
            if (newScene[key]) {
              newScene[key].call(newScene, _options.globalSceneOptions[key]);
            }
          }

          log(3, "adding Scene (now " + _sceneObjects.length + " total)");
        }
      } else {
        log(1, "ERROR: invalid argument supplied for '.addScene()'");
      }

      return Controller;
    };
    /**
     * Remove one ore more scene(s) from the controller.  
     * This is the equivalent to `Scene.remove()`.
     * @public
     * @example
     * // remove a scene from the controller
     * controller.removeScene(scene);
     *
     * // remove multiple scenes from the controller
     * controller.removeScene([scene, scene2, scene3]);
     *
     * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
     * @returns {Controller} Parent object for chaining.
     */


    this.removeScene = function (Scene) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.removeScene(scene);
        });
      } else {
        var index = _sceneObjects.indexOf(Scene);

        if (index > -1) {
          Scene.off("shift.controller_sort");

          _sceneObjects.splice(index, 1);

          log(3, "removing Scene (now " + _sceneObjects.length + " left)");
          Scene.remove();
        }
      }

      return Controller;
    };
    /**
    * Update one ore more scene(s) according to the scroll position of the container.  
    * This is the equivalent to `Scene.update()`.  
    * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
    * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
    * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
    * @public
    * @example
    * // update a specific scene on next cycle
     * controller.updateScene(scene);
     *
    * // update a specific scene immediately
    * controller.updateScene(scene, true);
     *
    * // update multiple scenes scene on next cycle
    * controller.updateScene([scene1, scene2, scene3]);
    *
    * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
    * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
    										  This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
    * @return {Controller} Parent object for chaining.
    */


    this.updateScene = function (Scene, immediately) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.updateScene(scene, immediately);
        });
      } else {
        if (immediately) {
          Scene.update(true);
        } else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) {
          // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
          // prep array for next update cycle
          _updateScenesOnNextCycle = _updateScenesOnNextCycle || [];

          if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
            _updateScenesOnNextCycle.push(Scene);
          }

          _updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort

          debounceUpdate();
        }
      }

      return Controller;
    };
    /**
     * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
     * See `Controller.updateScene()` for more information about what this means.  
     * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
     * The only application for this method is when ScrollMagic fails to detect these events.  
     * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
     * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
     * @public
     * @example
     * // update the controller on next cycle (saves performance due to elimination of redundant updates)
     * controller.update();
     *
     * // update the controller immediately
     * controller.update(true);
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
     * @return {Controller} Parent object for chaining.
     */


    this.update = function (immediately) {
      onChange({
        type: "resize"
      }); // will update size and set _updateScenesOnNextCycle to true

      if (immediately) {
        updateScenes();
      }

      return Controller;
    };
    /**
     * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
     * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
     * @public
     *
     * @since 1.1.0
     * @example
     * // scroll to an offset of 100
     * controller.scrollTo(100);
     *
     * // scroll to a DOM element
     * controller.scrollTo("#anchor");
     *
     * // scroll to the beginning of a scene
     * var scene = new ScrollMagic.Scene({offset: 200});
     * controller.scrollTo(scene);
     *
     * // define a new scroll position modification function (jQuery animate instead of jump)
     * controller.scrollTo(function (newScrollPos) {
     *	$("html, body").animate({scrollTop: newScrollPos});
     * });
     * controller.scrollTo(100); // call as usual, but the new function will be used instead
     *
     * // define a new scroll function with an additional parameter
     * controller.scrollTo(function (newScrollPos, message) {
     *  console.log(message);
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter to the defined custom function
     * controller.scrollTo(100, "my message");
     *
     * // define a new scroll function with an additional parameter containing multiple variables
     * controller.scrollTo(function (newScrollPos, options) {
     *  someGlobalVar = options.a + options.b;
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter containing multiple options
     * controller.scrollTo(100, {a: 1, b: 2});
     *
     * // define a new scroll function with a callback supplied as an additional parameter
     * controller.scrollTo(function (newScrollPos, callback) {
     *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
     * });
     * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
     * controller.scrollTo(100, function() {
     *	console.log("scroll has finished.");
     * });
     *
     * @param {mixed} scrollTarget - The supplied argument can be one of these types:
     * 1. `number` -> The container will scroll to this new scroll offset.
     * 2. `string` or `object` -> Can be a selector or a DOM object.  
     *  The container will scroll to the position of this element.
     * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
     * 4. `function` -> This function will be used for future scroll position modifications.  
     *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
     *  It may also optionally receive an optional additional parameter (see below)  
     *  _**NOTE:**  
     *  All other options will still work as expected, using the new function to scroll._
     * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
     * @returns {Controller} Parent object for chaining.
     */


    this.scrollTo = function (scrollTarget, additionalParameter) {
      if (_util.type.Number(scrollTarget)) {
        // excecute
        setScrollPos.call(_options.container, scrollTarget, additionalParameter);
      } else if (scrollTarget instanceof ScrollMagic.Scene) {
        // scroll to scene
        if (scrollTarget.controller() === Controller) {
          // check if the controller is associated with this scene
          Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
        }
      } else if (_util.type.Function(scrollTarget)) {
        // assign new scroll function
        setScrollPos = scrollTarget;
      } else {
        // scroll to element
        var elem = _util.get.elements(scrollTarget)[0];

        if (elem) {
          // if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
          while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            elem = elem.parentNode;
          }

          var param = _options.vertical ? "top" : "left",
              // which param is of interest ?
          containerOffset = _util.get.offset(_options.container),
              // container position is needed because element offset is returned in relation to document, not in relation to container.
          elementOffset = _util.get.offset(elem);

          if (!_isDocument) {
            // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
            containerOffset[param] -= Controller.scrollPos();
          }

          Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
        }
      }

      return Controller;
    };
    /**
     * **Get** the current scrollPosition or **Set** a new method to calculate it.  
     * -> **GET**:
     * When used as a getter this function will return the current scroll position.  
     * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
     * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
     *
     * -> **SET**:
     * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
     * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
     * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
     * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
     * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
     *
     * To change the current scroll position please use `Controller.scrollTo()`.
     * @public
     *
     * @example
     * // get the current scroll Position
     * var scrollPos = controller.scrollPos();
     *
     * // set a new scroll position calculation method
     * controller.scrollPos(function () {
     *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
     * });
     *
     * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
     * @returns {(number|Controller)} Current scroll position or parent object for chaining.
     */


    this.scrollPos = function (scrollPosMethod) {
      if (!arguments.length) {
        // get
        return getScrollPos.call(Controller);
      } else {
        // set
        if (_util.type.Function(scrollPosMethod)) {
          getScrollPos = scrollPosMethod;
        } else {
          log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
        }
      }

      return Controller;
    };
    /**
     * **Get** all infos or one in particular about the controller.
     * @public
     * @example
     * // returns the current scroll position (number)
     * var scrollPos = controller.info("scrollPos");
     *
     * // returns all infos as an object
     * var infos = controller.info();
     *
     * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
     							 Valid options are:
     							 ** `"size"` => the current viewport size of the container
     							 ** `"vertical"` => true if vertical scrolling, otherwise false
     							 ** `"scrollPos"` => the current scroll position
     							 ** `"scrollDirection"` => the last known direction of the scroll
     							 ** `"container"` => the container element
     							 ** `"isDocument"` => true if container element is the document.
     * @returns {(mixed|object)} The requested info(s).
     */


    this.info = function (about) {
      var values = {
        size: _viewPortSize,
        // contains height or width (in regard to orientation);
        vertical: _options.vertical,
        scrollPos: _scrollPos,
        scrollDirection: _scrollDirection,
        container: _options.container,
        isDocument: _isDocument
      };

      if (!arguments.length) {
        // get all as an object
        return values;
      } else if (values[about] !== undefined) {
        return values[about];
      } else {
        log(1, "ERROR: option \"" + about + "\" is not available");
        return;
      }
    };
    /**
     * **Get** or **Set** the current loglevel option value.
     * @public
     *
     * @example
     * // get the current value
     * var loglevel = controller.loglevel();
     *
     * // set a new value
     * controller.loglevel(3);
     *
     * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
     * @returns {(number|Controller)} Current loglevel or parent object for chaining.
     */


    this.loglevel = function (newLoglevel) {
      if (!arguments.length) {
        // get
        return _options.loglevel;
      } else if (_options.loglevel != newLoglevel) {
        // set
        _options.loglevel = newLoglevel;
      }

      return Controller;
    };
    /**
     * **Get** or **Set** the current enabled state of the controller.  
     * This can be used to disable all Scenes connected to the controller without destroying or removing them.
     * @public
     *
     * @example
     * // get the current value
     * var enabled = controller.enabled();
     *
     * // disable the controller
     * controller.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
     * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Controller.updateScene(_sceneObjects, true);
      }

      return Controller;
    };
    /**
     * Destroy the Controller, all Scenes and everything.
     * @public
     *
     * @example
     * // without resetting the scenes
     * controller = controller.destroy();
     *
     * // with scene reset
     * controller = controller.destroy(true);
     *
     * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (resetScenes) {
      window.clearTimeout(_refreshTimeout);
      var i = _sceneObjects.length;

      while (i--) {
        _sceneObjects[i].destroy(resetScenes);
      }

      _options.container.removeEventListener("resize", onChange);

      _options.container.removeEventListener("scroll", onChange);

      _util.cAF(_updateTimeout);

      log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
      return null;
    }; // INIT


    construct();
    return Controller;
  }; // store pagewide controller options


  var CONTROLLER_OPTIONS = {
    defaults: {
      container: window,
      vertical: true,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   */

  ScrollMagic.Controller.addOption = function (name, defaultValue) {
    CONTROLLER_OPTIONS.defaults[name] = defaultValue;
  }; // instance extension function for plugins


  ScrollMagic.Controller.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Controller = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Controller, oldClass); // copy properties


    ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
  };
  /**
   * A Scene defines where the controller should react and how.
   *
   * @class
   *
   * @example
   * // create a standard scene and add it to a controller
   * new ScrollMagic.Scene()
   *		.addTo(controller);
   *
   * // create a scene with custom options and assign a handler to it.
   * var scene = new ScrollMagic.Scene({
   * 		duration: 100,
   *		offset: 200,
   *		triggerHook: "onEnter",
   *		reverse: false
   * });
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
   							   Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
   							   When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
   * @param {(number|string|function)} [options.duration=0] - The duration of the scene. 
   					Please see `Scene.duration()` for details.
   * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
   * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
   * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
   															  Can also be defined using a string:
   															  ** `"onEnter"` => `1`
   															  ** `"onCenter"` => `0.5`
   															  ** `"onLeave"` => `0`
   * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
   * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   										  ** `0` => silent
   										  ** `1` => errors
   										  ** `2` => errors, warnings
   										  ** `3` => errors, warnings, debuginfo
   * 
   */


  ScrollMagic.Scene = function (options) {
    /*
     * ----------------------------------------------------------------
     * settings
     * ----------------------------------------------------------------
     */
    var NAMESPACE = 'ScrollMagic.Scene',
        SCENE_STATE_BEFORE = 'BEFORE',
        SCENE_STATE_DURING = 'DURING',
        SCENE_STATE_AFTER = 'AFTER',
        DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;
    /*
     * ----------------------------------------------------------------
     * private vars
     * ----------------------------------------------------------------
     */

    var Scene = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _state = SCENE_STATE_BEFORE,
        _progress = 0,
        _scrollOffset = {
      start: 0,
      end: 0
    },
        // reflects the controllers's scroll position for the start and end of the scene respectively
    _triggerPos = 0,
        _enabled = true,
        _durationUpdateMethod,
        _controller;
    /**
     * Internal constructor function of the ScrollMagic Scene
     * @private
     */


    var construct = function () {
      for (var key in _options) {
        // check supplied options
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      } // add getters/setters for all possible options


      for (var optionName in DEFAULT_OPTIONS) {
        addSceneOption(optionName);
      } // validate all options


      validateOption();
    };
    /*
     * ----------------------------------------------------------------
     * Event Management
     * ----------------------------------------------------------------
     */


    var _listeners = {};
    /**
     * Scene start event.  
     * Fires whenever the scroll position its the starting point of the scene.  
     * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#start
     *
     * @example
     * scene.on("start", function (event) {
     * 	console.log("Hit start point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene end event.  
     * Fires whenever the scroll position its the ending point of the scene.  
     * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#end
     *
     * @example
     * scene.on("end", function (event) {
     * 	console.log("Hit end point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene enter event.  
     * Fires whenever the scene enters the "DURING" state.  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#enter
     *
     * @example
     * scene.on("enter", function (event) {
     * 	console.log("Scene entered.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene - always `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene leave event.  
     * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#leave
     *
     * @example
     * scene.on("leave", function (event) {
     * 	console.log("Scene left.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene update event.  
     * Fires whenever the scene is updated (but not necessarily changes the progress).
     *
     * @event ScrollMagic.Scene#update
     *
     * @example
     * scene.on("update", function (event) {
     * 	console.log("Scene updated.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
     * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
     * @property {number} event.scrollPos - The current scroll position of the container
     */

    /**
     * Scene progress event.  
     * Fires whenever the progress of the scene changes.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#progress
     *
     * @example
     * scene.on("progress", function (event) {
     * 	console.log("Scene progress changed to " + event.progress);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene change event.  
     * Fires whenvever a property of the scene is changed.
     *
     * @event ScrollMagic.Scene#change
     *
     * @example
     * scene.on("change", function (event) {
     * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.what - Indicates what value has been changed
     * @property {mixed} event.newval - The new value of the changed property
     */

    /**
     * Scene shift event.  
     * Fires whenvever the start or end **scroll offset** of the scene change.
     * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
     * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
     * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
     *
     * @event ScrollMagic.Scene#shift
     * @since 1.1.0
     *
     * @example
     * scene.on("shift", function (event) {
     * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.reason - Indicates why the scene has shifted
     */

    /**
     * Scene destroy event.  
     * Fires whenvever the scene is destroyed.
     * This can be used to tidy up custom behaviour used in events.
     *
     * @event ScrollMagic.Scene#destroy
     * @since 1.1.0
     *
     * @example
     * scene.on("enter", function (event) {
     *        // add custom action
     *        $("#my-elem").left("200");
     *      })
     *      .on("destroy", function (event) {
     *        // reset my element to start position
     *        if (event.reset) {
     *          $("#my-elem").left("0");
     *        }
     *      });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
     */

    /**
     * Scene add event.  
     * Fires when the scene is added to a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#add
     * @since 2.0.0
     *
     * @example
     * scene.on("add", function (event) {
     * 	console.log('Scene was added to a new controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.controller - The controller object the scene was added to.
     */

    /**
     * Scene remove event.  
     * Fires when the scene is removed from a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#remove
     * @since 2.0.0
     *
     * @example
     * scene.on("remove", function (event) {
     * 	console.log('Scene was removed from its controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     */

    /**
     * Add one ore more event listener.  
     * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
     * @method ScrollMagic.Scene#on
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update progress start end enter leave", callback);
     *
     * @param {string} names - The name or names of the event the callback should be attached to.
     * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */

    this.on = function (names, callback) {
      if (_util.type.Function(callback)) {
        names = names.trim().split(' ');
        names.forEach(function (fullname) {
          var nameparts = fullname.split('.'),
              eventname = nameparts[0],
              namespace = nameparts[1];

          if (eventname != "*") {
            // disallow wildcards
            if (!_listeners[eventname]) {
              _listeners[eventname] = [];
            }

            _listeners[eventname].push({
              namespace: namespace || '',
              callback: callback
            });
          }
        });
      } else {
        log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
      }

      return Scene;
    };
    /**
     * Remove one or more event listener.
     * @method ScrollMagic.Scene#off
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update", callback);
     * // remove listeners
     * scene.off("change update", callback);
     *
     * @param {string} names - The name or names of the event that should be removed.
     * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.off = function (names, callback) {
      if (!names) {
        log(1, "ERROR: Invalid event name supplied.");
        return Scene;
      }

      names = names.trim().split(' ');
      names.forEach(function (fullname, key) {
        var nameparts = fullname.split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1] || '',
            removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
        removeList.forEach(function (remove) {
          var list = _listeners[remove] || [],
              i = list.length;

          while (i--) {
            var listener = list[i];

            if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
              list.splice(i, 1);
            }
          }

          if (!list.length) {
            delete _listeners[remove];
          }
        });
      });
      return Scene;
    };
    /**
     * Trigger an event.
     * @method ScrollMagic.Scene#trigger
     *
     * @example
     * this.trigger("change");
     *
     * @param {string} name - The name of the event that should be triggered.
     * @param {object} [vars] - An object containing info that should be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */


    this.trigger = function (name, vars) {
      if (name) {
        var nameparts = name.trim().split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1],
            listeners = _listeners[eventname];
        log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');

        if (listeners) {
          listeners.forEach(function (listener, key) {
            if (!namespace || namespace === listener.namespace) {
              listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
            }
          });
        }
      } else {
        log(1, "ERROR: Invalid event name supplied.");
      }

      return Scene;
    }; // set event listeners


    Scene.on("change.internal", function (e) {
      if (e.what !== "loglevel" && e.what !== "tweenChanges") {
        // no need for a scene update scene with these options...
        if (e.what === "triggerElement") {
          updateTriggerElementPosition();
        } else if (e.what === "reverse") {
          // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
          Scene.update();
        }
      }
    }).on("shift.internal", function (e) {
      updateScrollOffset();
      Scene.update(); // update scene to reflect new position
    });
    /**
     * Send a debug message to the console.
     * @private
     * but provided publicly with _log for plugins
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */

    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    };
    /**
     * Add the scene to a controller.  
     * This is the equivalent to `Controller.addScene(scene)`.
     * @method ScrollMagic.Scene#addTo
     *
     * @example
     * // add a scene to a ScrollMagic Controller
     * scene.addTo(controller);
     *
     * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
     * @returns {Scene} Parent object for chaining.
     */


    this.addTo = function (controller) {
      if (!(controller instanceof ScrollMagic.Controller)) {
        log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
      } else if (_controller != controller) {
        // new controller
        if (_controller) {
          // was associated to a different controller before, so remove it...
          _controller.removeScene(Scene);
        }

        _controller = controller;
        validateOption();
        updateDuration(true);
        updateTriggerElementPosition(true);
        updateScrollOffset();

        _controller.info("container").addEventListener('resize', onContainerResize);

        controller.addScene(Scene);
        Scene.trigger("add", {
          controller: _controller
        });
        log(3, "added " + NAMESPACE + " to controller");
        Scene.update();
      }

      return Scene;
    };
    /**
     * **Get** or **Set** the current enabled state of the scene.  
     * This can be used to disable this scene without removing or destroying it.
     * @method ScrollMagic.Scene#enabled
     *
     * @example
     * // get the current value
     * var enabled = scene.enabled();
     *
     * // disable the scene
     * scene.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
     * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Scene.update(true);
      }

      return Scene;
    };
    /**
     * Remove the scene from the controller.  
     * This is the equivalent to `Controller.removeScene(scene)`.
     * The scene will not be updated anymore until you readd it to a controller.
     * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
     * @method ScrollMagic.Scene#remove
     * @example
     * // remove the scene from its controller
     * scene.remove();
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.remove = function () {
      if (_controller) {
        _controller.info("container").removeEventListener('resize', onContainerResize);

        var tmpParent = _controller;
        _controller = undefined;
        tmpParent.removeScene(Scene);
        Scene.trigger("remove");
        log(3, "removed " + NAMESPACE + " from controller");
      }

      return Scene;
    };
    /**
     * Destroy the scene and everything.
     * @method ScrollMagic.Scene#destroy
     * @example
     * // destroy the scene without resetting the pin and tween to their initial positions
     * scene = scene.destroy();
     *
     * // destroy the scene and reset the pin and tween
     * scene = scene.destroy(true);
     *
     * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (reset) {
      Scene.trigger("destroy", {
        reset: reset
      });
      Scene.remove();
      Scene.off("*.*");
      log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
      return null;
    };
    /**
     * Updates the Scene to reflect the current state.  
     * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
     * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
     * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @method ScrollMagic.Scene#update
     * @example
     * // update the scene on next tick
     * scene.update();
     *
     * // update the scene immediately
     * scene.update(true);
     *
     * @fires Scene.update
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
     * @returns {Scene} Parent object for chaining.
     */


    this.update = function (immediately) {
      if (_controller) {
        if (immediately) {
          if (_controller.enabled() && _enabled) {
            var scrollPos = _controller.info("scrollPos"),
                newProgress;

            if (_options.duration > 0) {
              newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
            } else {
              newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
            }

            Scene.trigger("update", {
              startPos: _scrollOffset.start,
              endPos: _scrollOffset.end,
              scrollPos: scrollPos
            });
            Scene.progress(newProgress);
          } else if (_pin && _state === SCENE_STATE_DURING) {
            updatePinState(true); // unpin in position
          }
        } else {
          _controller.updateScene(Scene, false);
        }
      }

      return Scene;
    };
    /**
     * Updates dynamic scene variables like the trigger element position or the duration.
     * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
     * 
     * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
     * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
     *
     * @method ScrollMagic.Scene#refresh
     * @since 1.1.0
     * @example
     * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
     * 
     * // change the position of the trigger
     * $("#trigger").css("top", 500);
     * // immediately let the scene know of this change
     * scene.refresh();
     *
     * @fires {@link Scene.shift}, if the trigger element position or the duration changed
     * @fires {@link Scene.change}, if the duration changed
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.refresh = function () {
      updateDuration();
      updateTriggerElementPosition(); // update trigger element position

      return Scene;
    };
    /**
     * **Get** or **Set** the scene's progress.  
     * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
     * The order in which the events are fired depends on the duration of the scene:
     *  1. Scenes with `duration == 0`:  
     *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
     *  When the trigger position of the scene is passed the events are always fired in this order:  
     *  `enter`, `start`, `progress` when scrolling forward  
     *  and  
     *  `progress`, `start`, `leave` when scrolling in reverse
     *  2. Scenes with `duration > 0`:  
     *  Scenes with a set duration have a defined start and end point.  
     *  When scrolling past the start position of the scene it will fire these events in this order:  
     *  `enter`, `start`, `progress`  
     *  When continuing to scroll and passing the end point it will fire these events:  
     *  `progress`, `end`, `leave`  
     *  When reversing through the end point these events are fired:  
     *  `enter`, `end`, `progress`  
     *  And when continuing to scroll past the start position in reverse it will fire:  
     *  `progress`, `start`, `leave`  
     *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
     * 
     * In short:  
     * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
     * `start` and `end` will always trigger at their respective position.
     * 
     * Please review the event descriptions for details on the events and the event object that is passed to the callback.
     * 
     * @method ScrollMagic.Scene#progress
     * @example
     * // get the current scene progress
     * var progress = scene.progress();
     *
     * // set new scene progress
     * scene.progress(0.3);
     *
     * @fires {@link Scene.enter}, when used as setter
     * @fires {@link Scene.start}, when used as setter
     * @fires {@link Scene.progress}, when used as setter
     * @fires {@link Scene.end}, when used as setter
     * @fires {@link Scene.leave}, when used as setter
     *
     * @param {number} [progress] - The new progress value of the scene `[0-1]`.
     * @returns {number} `get` -  Current scene progress.
     * @returns {Scene} `set` -  Parent object for chaining.
     */


    this.progress = function (progress) {
      if (!arguments.length) {
        // get
        return _progress;
      } else {
        // set
        var doUpdate = false,
            oldState = _state,
            scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
            reverseOrForward = _options.reverse || progress >= _progress;

        if (_options.duration === 0) {
          // zero duration scenes
          doUpdate = _progress != progress;
          _progress = progress < 1 && reverseOrForward ? 0 : 1;
          _state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
        } else {
          // scenes with start and end
          if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
            // go back to initial state
            _progress = 0;
            _state = SCENE_STATE_BEFORE;
            doUpdate = true;
          } else if (progress >= 0 && progress < 1 && reverseOrForward) {
            _progress = progress;
            _state = SCENE_STATE_DURING;
            doUpdate = true;
          } else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
            _progress = 1;
            _state = SCENE_STATE_AFTER;
            doUpdate = true;
          } else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
            updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
          }
        }

        if (doUpdate) {
          // fire events
          var eventVars = {
            progress: _progress,
            state: _state,
            scrollDirection: scrollDirection
          },
              stateChanged = _state != oldState;

          var trigger = function (eventName) {
            // tmp helper to simplify code
            Scene.trigger(eventName, eventVars);
          };

          if (stateChanged) {
            // enter events
            if (oldState !== SCENE_STATE_DURING) {
              trigger("enter");
              trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
            }
          }

          trigger("progress");

          if (stateChanged) {
            // leave events
            if (_state !== SCENE_STATE_DURING) {
              trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
              trigger("leave");
            }
          }
        }

        return Scene;
      }
    };
    /**
     * Update the start and end scrollOffset of the container.
     * The positions reflect what the controller's scroll position will be at the start and end respectively.
     * Is called, when:
     *   - Scene event "change" is called with: offset, triggerHook, duration 
     *   - scroll container event "resize" is called
     *   - the position of the triggerElement changes
     *   - the controller changes -> addTo()
     * @private
     */


    var updateScrollOffset = function () {
      _scrollOffset = {
        start: _triggerPos + _options.offset
      };

      if (_controller && _options.triggerElement) {
        // take away triggerHook portion to get relative to top
        _scrollOffset.start -= _controller.info("size") * _options.triggerHook;
      }

      _scrollOffset.end = _scrollOffset.start + _options.duration;
    };
    /**
     * Updates the duration if set to a dynamic function.
     * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.change}, if the duration changed
     * @fires {@link Scene.shift}, if the duration changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateDuration = function (suppressEvents) {
      // update duration
      if (_durationUpdateMethod) {
        var varname = "duration";

        if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) {
          // set
          Scene.trigger("change", {
            what: varname,
            newval: _options[varname]
          });
          Scene.trigger("shift", {
            reason: varname
          });
        }
      }
    };
    /**
     * Updates the position of the triggerElement, if present.
     * This method is called ...
     *  - ... when the triggerElement is changed
     *  - ... when the scene is added to a (new) controller
     *  - ... in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.shift}, if the position changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateTriggerElementPosition = function (suppressEvents) {
      var elementPos = 0,
          telem = _options.triggerElement;

      if (_controller && (telem || _triggerPos > 0)) {
        // either an element exists or was removed and the triggerPos is still > 0
        if (telem) {
          // there currently a triggerElement set
          if (telem.parentNode) {
            // check if element is still attached to DOM
            var controllerInfo = _controller.info(),
                containerOffset = _util.get.offset(controllerInfo.container),
                // container position is needed because element offset is returned in relation to document, not in relation to container.
            param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
            // if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.


            while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
              telem = telem.parentNode;
            }

            var elementOffset = _util.get.offset(telem);

            if (!controllerInfo.isDocument) {
              // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
              containerOffset[param] -= _controller.scrollPos();
            }

            elementPos = elementOffset[param] - containerOffset[param];
          } else {
            // there was an element, but it was removed from DOM
            log(2, "WARNING: triggerElement was removed from DOM and will be reset to", undefined);
            Scene.triggerElement(undefined); // unset, so a change event is triggered
          }
        }

        var changed = elementPos != _triggerPos;
        _triggerPos = elementPos;

        if (changed && !suppressEvents) {
          Scene.trigger("shift", {
            reason: "triggerElementPosition"
          });
        }
      }
    };
    /**
     * Trigger a shift event, when the container is resized and the triggerHook is > 1.
     * @private
     */


    var onContainerResize = function (e) {
      if (_options.triggerHook > 0) {
        Scene.trigger("shift", {
          reason: "containerResize"
        });
      }
    };

    var _validate = _util.extend(SCENE_OPTIONS.validate, {
      // validation for duration handled internally for reference to private var _durationMethod
      duration: function (val) {
        if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
          // percentage value
          var perc = parseFloat(val) / 100;

          val = function () {
            return _controller ? _controller.info("size") * perc : 0;
          };
        }

        if (_util.type.Function(val)) {
          // function
          _durationUpdateMethod = val;

          try {
            val = parseFloat(_durationUpdateMethod.call(Scene));
          } catch (e) {
            val = -1; // will cause error below
          }
        } // val has to be float


        val = parseFloat(val);

        if (!_util.type.Number(val) || val < 0) {
          if (_durationUpdateMethod) {
            _durationUpdateMethod = undefined;
            throw ["Invalid return value of supplied function for option \"duration\":", val];
          } else {
            throw ["Invalid value for option \"duration\":", val];
          }
        }

        return val;
      }
    });
    /**
     * Checks the validity of a specific or all options and reset to default if neccessary.
     * @private
     */


    var validateOption = function (check) {
      check = arguments.length ? [check] : Object.keys(_validate);
      check.forEach(function (optionName, key) {
        var value;

        if (_validate[optionName]) {
          // there is a validation method for this option
          try {
            // validate value
            value = _validate[optionName](_options[optionName]);
          } catch (e) {
            // validation failed -> reset to default
            value = DEFAULT_OPTIONS[optionName];
            var logMSG = _util.type.String(e) ? [e] : e;

            if (_util.type.Array(logMSG)) {
              logMSG[0] = "ERROR: " + logMSG[0];
              logMSG.unshift(1); // loglevel 1 for error msg

              log.apply(this, logMSG);
            } else {
              log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
            }
          } finally {
            _options[optionName] = value;
          }
        }
      });
    };
    /**
     * Helper used by the setter/getters for scene options
     * @private
     */


    var changeOption = function (varname, newval) {
      var changed = false,
          oldval = _options[varname];

      if (_options[varname] != newval) {
        _options[varname] = newval;
        validateOption(varname); // resets to default if necessary

        changed = oldval != _options[varname];
      }

      return changed;
    }; // generate getters/setters for all options


    var addSceneOption = function (optionName) {
      if (!Scene[optionName]) {
        Scene[optionName] = function (newVal) {
          if (!arguments.length) {
            // get
            return _options[optionName];
          } else {
            if (optionName === "duration") {
              // new duration is set, so any previously set function must be unset
              _durationUpdateMethod = undefined;
            }

            if (changeOption(optionName, newVal)) {
              // set
              Scene.trigger("change", {
                what: optionName,
                newval: _options[optionName]
              });

              if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
                Scene.trigger("shift", {
                  reason: optionName
                });
              }
            }
          }

          return Scene;
        };
      }
    };
    /**
     * **Get** or **Set** the duration option value.
     *
     * As a **setter** it accepts three types of parameters:
     * 1. `number`: Sets the duration of the scene to exactly this amount of pixels.  
     *   This means the scene will last for exactly this amount of pixels scrolled. Sub-Pixels are also valid.
     *   A value of `0` means that the scene is 'open end' and no end will be triggered. Pins will never unpin and animations will play independently of scroll progress.
     * 2. `string`: Always updates the duration relative to parent scroll container.  
     *   For example `"100%"` will keep the duration always exactly at the inner height of the scroll container.
     *   When scrolling vertically the width is used for reference respectively.
     * 3. `function`: The supplied function will be called to return the scene duration.
     *   This is useful in setups where the duration depends on other elements who might change size. By supplying a function you can return a value instead of updating potentially multiple scene durations.  
     *   The scene can be referenced inside the callback using `this`.
     *   _**WARNING:** This is an easy way to kill performance, as the callback will be executed every time `Scene.refresh()` is called, which happens a lot. The interval is defined by the controller (see ScrollMagic.Controller option `refreshInterval`).  
     *   It's recomended to avoid calculations within the function and use cached variables as return values.  
     *   This counts double if you use the same function for multiple scenes._
     *
     * @method ScrollMagic.Scene#duration
     * @example
     * // get the current duration value
     * var duration = scene.duration();
     *
     * // set a new duration
     * scene.duration(300);
     *
     * // set duration responsively to container size
     * scene.duration("100%");
     *
     * // use a function to randomize the duration for some reason.
     * var durationValueCache;
     * function durationCallback () {
     *   return durationValueCache;
     * }
     * function updateDuration () {
     *   durationValueCache = Math.random() * 100;
     * }
     * updateDuration(); // set to initial value
     * scene.duration(durationCallback); // set duration callback
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string|function)} [newDuration] - The new duration setting for the scene.
     * @returns {number} `get` -  Current scene duration.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the offset option value.
     * @method ScrollMagic.Scene#offset
     * @example
     * // get the current offset
     * var offset = scene.offset();
     *
     * // set a new offset
     * scene.offset(100);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {number} [newOffset] - The new offset of the scene.
     * @returns {number} `get` -  Current scene offset.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerElement option value.
     * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
     * @method ScrollMagic.Scene#triggerElement
     * @example
     * // get the current triggerElement
     * var triggerElement = scene.triggerElement();
     *
     * // set a new triggerElement using a selector
     * scene.triggerElement("#trigger");
     * // set a new triggerElement using a DOM object
     * scene.triggerElement(document.getElementById("trigger"));
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
     * @returns {(string|object)} `get` -  Current triggerElement.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerHook option value.
     * @method ScrollMagic.Scene#triggerHook
     * @example
     * // get the current triggerHook value
     * var triggerHook = scene.triggerHook();
     *
     * // set a new triggerHook using a string
     * scene.triggerHook("onLeave");
     * // set a new triggerHook using a number
     * scene.triggerHook(0.7);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
     * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the reverse option value.
     * @method ScrollMagic.Scene#reverse
     * @example
     * // get the current reverse option
     * var reverse = scene.reverse();
     *
     * // set new reverse option
     * scene.reverse(false);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newReverse] - The new reverse setting of the scene.
     * @returns {boolean} `get` -  Current reverse option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the loglevel option value.
     * @method ScrollMagic.Scene#loglevel
     * @example
     * // get the current loglevel
     * var loglevel = scene.loglevel();
     *
     * // set new loglevel
     * scene.loglevel(3);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
     * @returns {number} `get` -  Current loglevel.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** the associated controller.
     * @method ScrollMagic.Scene#controller
     * @example
     * // get the controller of a scene
     * var controller = scene.controller();
     *
     * @returns {ScrollMagic.Controller} Parent controller or `undefined`
     */


    this.controller = function () {
      return _controller;
    };
    /**
     * **Get** the current state.
     * @method ScrollMagic.Scene#state
     * @example
     * // get the current state
     * var state = scene.state();
     *
     * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
     */


    this.state = function () {
      return _state;
    };
    /**
     * **Get** the current scroll offset for the start of the scene.  
     * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
     * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
     * @method ScrollMagic.Scene#scrollOffset
     * @example
     * // get the current scroll offset for the start and end of the scene.
     * var start = scene.scrollOffset();
     * var end = scene.scrollOffset() + scene.duration();
     * console.log("the scene starts at", start, "and ends at", end);
     *
     * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
     */


    this.scrollOffset = function () {
      return _scrollOffset.start;
    };
    /**
     * **Get** the trigger position of the scene (including the value of the `offset` option).  
     * @method ScrollMagic.Scene#triggerPosition
     * @example
     * // get the scene's trigger position
     * var triggerPosition = scene.triggerPosition();
     *
     * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
     */


    this.triggerPosition = function () {
      var pos = _options.offset; // the offset is the basis

      if (_controller) {
        // get the trigger position
        if (_options.triggerElement) {
          // Element as trigger
          pos += _triggerPos;
        } else {
          // return the height of the triggerHook to start at the beginning
          pos += _controller.info("size") * Scene.triggerHook();
        }
      }

      return pos;
    };

    var _pin, _pinOptions;

    Scene.on("shift.internal", function (e) {
      var durationChanged = e.reason === "duration";

      if (_state === SCENE_STATE_AFTER && durationChanged || _state === SCENE_STATE_DURING && _options.duration === 0) {
        // if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
        updatePinState();
      }

      if (durationChanged) {
        updatePinDimensions();
      }
    }).on("progress.internal", function (e) {
      updatePinState();
    }).on("add.internal", function (e) {
      updatePinDimensions();
    }).on("destroy.internal", function (e) {
      Scene.removePin(e.reset);
    });
    /**
     * Update the pin state.
     * @private
     */

    var updatePinState = function (forceUnpin) {
      if (_pin && _controller) {
        var containerInfo = _controller.info(),
            pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins


        if (!forceUnpin && _state === SCENE_STATE_DURING) {
          // during scene or if duration is 0 and we are past the trigger
          // pinned state
          if (_util.css(pinTarget, "position") != "fixed") {
            // change state before updating pin spacer (position changes due to fixed collapsing might occur.)
            _util.css(pinTarget, {
              "position": "fixed"
            }); // update pin spacer


            updatePinDimensions();
          }

          var fixedPos = _util.get.offset(_pinOptions.spacer, true),
              // get viewport position of spacer
          scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
          : Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
          // add scrollDistance


          fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance; // set new values

          _util.css(_pinOptions.spacer.firstChild, {
            top: fixedPos.top,
            left: fixedPos.left
          });
        } else {
          // unpinned state
          var newCSS = {
            position: _pinOptions.inFlow ? "relative" : "absolute",
            top: 0,
            left: 0
          },
              change = _util.css(pinTarget, "position") != newCSS.position;

          if (!_pinOptions.pushFollowers) {
            newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
          } else if (_options.duration > 0) {
            // only concerns scenes with duration
            if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
              change = true; // if in after state but havent updated spacer yet (jumped past pin)
            } else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) {
              // before
              change = true; // jumped past fixed state upward direction
            }
          } // set new values


          _util.css(pinTarget, newCSS);

          if (change) {
            // update pin spacer if state changed
            updatePinDimensions();
          }
        }
      }
    };
    /**
     * Update the pin spacer and/or element size.
     * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
     * @private
     */


    var updatePinDimensions = function () {
      if (_pin && _controller && _pinOptions.inFlow) {
        // no spacerresize, if original position is absolute
        var after = _state === SCENE_STATE_AFTER,
            before = _state === SCENE_STATE_BEFORE,
            during = _state === SCENE_STATE_DURING,
            vertical = _controller.info("vertical"),
            pinTarget = _pinOptions.spacer.firstChild,
            // usually the pined element but can also be another spacer (cascaded pins)
        marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
            css = {}; // set new size
        // if relsize: spacer -> pin | else: pin -> spacer


        if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
          if (during) {
            _util.css(_pin, {
              "width": _util.get.width(_pinOptions.spacer)
            });
          } else {
            _util.css(_pin, {
              "width": "100%"
            });
          }
        } else {
          // minwidth is needed for cascaded pins.
          css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
          css.width = during ? css["min-width"] : "auto";
        }

        if (_pinOptions.relSize.height) {
          if (during) {
            // the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
            _util.css(_pin, {
              "height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
            });
          } else {
            _util.css(_pin, {
              "height": "100%"
            });
          }
        } else {
          // margin is only included if it's a cascaded pin to resolve an IE9 bug
          css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins

          css.height = during ? css["min-height"] : "auto";
        } // add space for duration if pushFollowers is true


        if (_pinOptions.pushFollowers) {
          css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
          css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
        }

        _util.css(_pinOptions.spacer, css);
      }
    };
    /**
     * Updates the Pin state (in certain scenarios)
     * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
     * So this function is called on resize and scroll of the document.
     * @private
     */


    var updatePinInContainer = function () {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        updatePinState();
      }
    };
    /**
     * Updates the Pin spacer size state (in certain scenarios)
     * If container is resized during pin and relatively sized the size of the pin might need to be updated...
     * So this function is called on resize of the container.
     * @private
     */


    var updateRelativePinSpacer = function () {
      if (_controller && _pin && // well, duh
      _state === SCENE_STATE_DURING && ( // element in pinned state?
      // is width or height relatively sized, but not in relation to body? then we need to recalc.
      (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode) || _pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode))) {
        updatePinDimensions();
      }
    };
    /**
     * Is called, when the mousewhel is used while over a pinned element inside a div container.
     * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
     * @private
     */


    var onMousewheelOverPin = function (e) {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        // in pin state
        e.preventDefault();

        _controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
      }
    };
    /**
     * Pin an element for the duration of the scene.
     * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
     * Make sure only one pin is applied to an element at the same time.
     * An element can be pinned multiple times, but only successively.
     * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
     * @method ScrollMagic.Scene#setPin
     * @example
     * // pin element and push all following elements down by the amount of the pin duration.
     * scene.setPin("#pin");
     *
     * // pin element and keeping all following elements in their place. The pinned element will move past them.
     * scene.setPin("#pin", {pushFollowers: false});
     *
     * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
     * @param {object} [settings] - settings for the pin
     * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
     												   Ignored, when duration is `0`.
     * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.setPin = function (element, settings) {
      var defaultSettings = {
        pushFollowers: true,
        spacerClass: "scrollmagic-pin-spacer"
      };
      var pushFollowersActivelySet = settings && settings.hasOwnProperty('pushFollowers');
      settings = _util.extend({}, defaultSettings, settings); // validate Element

      element = _util.get.elements(element)[0];

      if (!element) {
        log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
        return Scene; // cancel
      } else if (_util.css(element, "position") === "fixed") {
        log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
        return Scene; // cancel
      }

      if (_pin) {
        // preexisting pin?
        if (_pin === element) {
          // same pin we already have -> do nothing
          return Scene; // cancel
        } else {
          // kill old pin
          Scene.removePin();
        }
      }

      _pin = element;
      var parentDisplay = _pin.parentNode.style.display,
          boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
      _pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.

      var inFlow = _util.css(_pin, "position") != "absolute",
          pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
          sizeCSS = _util.css(_pin, ["width", "height"]);

      _pin.parentNode.style.display = parentDisplay; // hack end.

      if (!inFlow && settings.pushFollowers) {
        log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
        settings.pushFollowers = false;
      }

      window.setTimeout(function () {
        // wait until all finished, because with responsive duration it will only be set after scene is added to controller
        if (_pin && _options.duration === 0 && pushFollowersActivelySet && settings.pushFollowers) {
          log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
        }
      }, 0); // create spacer and insert

      var spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
          spacerCSS = _util.extend(pinCSS, {
        position: inFlow ? "relative" : "absolute",
        boxSizing: "content-box",
        mozBoxSizing: "content-box",
        webkitBoxSizing: "content-box"
      });

      if (!inFlow) {
        // copy size if positioned absolutely, to work for bottom/right positioned elements.
        _util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
      }

      _util.css(spacer, spacerCSS);

      spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");

      _util.addClass(spacer, settings.spacerClass); // set the pin Options


      _pinOptions = {
        spacer: spacer,
        relSize: {
          // save if size is defined using % values. if so, handle spacer resize differently...
          width: sizeCSS.width.slice(-1) === "%",
          height: sizeCSS.height.slice(-1) === "%",
          autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
        },
        pushFollowers: settings.pushFollowers,
        inFlow: inFlow // stores if the element takes up space in the document flow

      };

      if (!_pin.___origStyle) {
        _pin.___origStyle = {};
        var pinInlineCSS = _pin.style,
            copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
        copyStyles.forEach(function (val) {
          _pin.___origStyle[val] = pinInlineCSS[val] || "";
        });
      } // if relative size, transfer it to spacer and make pin calculate it...


      if (_pinOptions.relSize.width) {
        _util.css(spacer, {
          width: sizeCSS.width
        });
      }

      if (_pinOptions.relSize.height) {
        _util.css(spacer, {
          height: sizeCSS.height
        });
      } // now place the pin element inside the spacer	


      spacer.appendChild(_pin); // and set new css

      _util.css(_pin, {
        position: inFlow ? "relative" : "absolute",
        margin: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto"
      });

      if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
        _util.css(_pin, {
          boxSizing: "border-box",
          mozBoxSizing: "border-box",
          webkitBoxSizing: "border-box"
        });
      } // add listener to document to update pin position in case controller is not the document.


      window.addEventListener('scroll', updatePinInContainer);
      window.addEventListener('resize', updatePinInContainer);
      window.addEventListener('resize', updateRelativePinSpacer); // add mousewheel listener to catch scrolls over fixed elements

      _pin.addEventListener("mousewheel", onMousewheelOverPin);

      _pin.addEventListener("DOMMouseScroll", onMousewheelOverPin);

      log(3, "added pin"); // finally update the pin to init

      updatePinState();
      return Scene;
    };
    /**
     * Remove the pin from the scene.
     * @method ScrollMagic.Scene#removePin
     * @example
     * // remove the pin from the scene without resetting it (the spacer is not removed)
     * scene.removePin();
     *
     * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
     * scene.removePin(true);
     *
     * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
     * @returns {Scene} Parent object for chaining.
     */


    this.removePin = function (reset) {
      if (_pin) {
        if (_state === SCENE_STATE_DURING) {
          updatePinState(true); // force unpin at position
        }

        if (reset || !_controller) {
          // if there's no controller no progress was made anyway...
          var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...

          if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // copy margins to child spacer
            var style = _pinOptions.spacer.style,
                values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"],
                margins = {};
            values.forEach(function (val) {
              margins[val] = style[val] || "";
            });

            _util.css(pinTarget, margins);
          }

          _pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);

          _pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);

          if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // if it's the last pin for this element -> restore inline styles
            // TODO: only correctly set for first pin (when cascading) - how to fix?
            _util.css(_pin, _pin.___origStyle);

            delete _pin.___origStyle;
          }
        }

        window.removeEventListener('scroll', updatePinInContainer);
        window.removeEventListener('resize', updatePinInContainer);
        window.removeEventListener('resize', updateRelativePinSpacer);

        _pin.removeEventListener("mousewheel", onMousewheelOverPin);

        _pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin);

        _pin = undefined;
        log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };

    var _cssClasses,
        _cssClassElems = [];

    Scene.on("destroy.internal", function (e) {
      Scene.removeClassToggle(e.reset);
    });
    /**
     * Define a css class modification while the scene is active.  
     * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
     * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
     * @method ScrollMagic.Scene#setClassToggle
     * @example
     * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
     * scene.setClassToggle("#my-elem", "myclass");
     *
     * // add multiple classes to multiple elements defined by the selector '.classChange'
     * scene.setClassToggle(".classChange", "class1 class2 class3");
     *
     * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
     * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
     *
     * @returns {Scene} Parent object for chaining.
     */

    this.setClassToggle = function (element, classes) {
      var elems = _util.get.elements(element);

      if (elems.length === 0 || !_util.type.String(classes)) {
        log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
        return Scene;
      }

      if (_cssClassElems.length > 0) {
        // remove old ones
        Scene.removeClassToggle();
      }

      _cssClasses = classes;
      _cssClassElems = elems;
      Scene.on("enter.internal_class leave.internal_class", function (e) {
        var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;

        _cssClassElems.forEach(function (elem, key) {
          toggle(elem, _cssClasses);
        });
      });
      return Scene;
    };
    /**
     * Remove the class binding from the scene.
     * @method ScrollMagic.Scene#removeClassToggle
     * @example
     * // remove class binding from the scene without reset
     * scene.removeClassToggle();
     *
     * // remove class binding and remove the changes it caused
     * scene.removeClassToggle(true);
     *
     * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.removeClassToggle = function (reset) {
      if (reset) {
        _cssClassElems.forEach(function (elem, key) {
          _util.removeClass(elem, _cssClasses);
        });
      }

      Scene.off("start.internal_class end.internal_class");
      _cssClasses = undefined;
      _cssClassElems = [];
      return Scene;
    }; // INIT


    construct();
    return Scene;
  }; // store pagewide scene options


  var SCENE_OPTIONS = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: undefined,
      triggerHook: 0.5,
      reverse: true,
      loglevel: 2
    },
    validate: {
      offset: function (val) {
        val = parseFloat(val);

        if (!_util.type.Number(val)) {
          throw ["Invalid value for option \"offset\":", val];
        }

        return val;
      },
      triggerElement: function (val) {
        val = val || undefined;

        if (val) {
          var elem = _util.get.elements(val)[0];

          if (elem && elem.parentNode) {
            val = elem;
          } else {
            throw ["Element defined in option \"triggerElement\" was not found:", val];
          }
        }

        return val;
      },
      triggerHook: function (val) {
        var translate = {
          "onCenter": 0.5,
          "onEnter": 1,
          "onLeave": 0
        };

        if (_util.type.Number(val)) {
          val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
        } else if (val in translate) {
          val = translate[val];
        } else {
          throw ["Invalid value for option \"triggerHook\": ", val];
        }

        return val;
      },
      reverse: function (val) {
        return !!val; // force boolean
      },
      loglevel: function (val) {
        val = parseInt(val);

        if (!_util.type.Number(val) || val < 0 || val > 3) {
          throw ["Invalid value for option \"loglevel\":", val];
        }

        return val;
      }
    },
    // holder for  validation methods. duration validation is handled in 'getters-setters.js'
    shifts: ["duration", "offset", "triggerHook"] // list of options that trigger a `shift` event

  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   * TODO: DOC (private for dev)
   */

  ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
    if (!(name in SCENE_OPTIONS.defaults)) {
      SCENE_OPTIONS.defaults[name] = defaultValue;
      SCENE_OPTIONS.validate[name] = validationCallback;

      if (shifts) {
        SCENE_OPTIONS.shifts.push(name);
      }
    } else {
      ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
    }
  }; // instance extension function for plugins
  // TODO: DOC (private for dev)


  ScrollMagic.Scene.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Scene = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Scene, oldClass); // copy properties


    ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
  };
  /**
   * TODO: DOCS (private for dev)
   * @class
   * @private
   */


  ScrollMagic.Event = function (type, namespace, target, vars) {
    vars = vars || {};

    for (var key in vars) {
      this[key] = vars[key];
    }

    this.type = type;
    this.target = this.currentTarget = target;
    this.namespace = namespace || '';
    this.timeStamp = this.timestamp = Date.now();
    return this;
  };
  /*
   * TODO: DOCS (private for dev)
   */


  var _util = ScrollMagic._util = function (window) {
    var U = {},
        i;
    /**
     * ------------------------------
     * internal helpers
     * ------------------------------
     */
    // parse float and fall back to 0.

    var floatval = function (number) {
      return parseFloat(number) || 0;
    }; // get current style IE safe (otherwise IE would return calculated values for 'auto')


    var _getComputedStyle = function (elem) {
      return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
    }; // get element dimension (width or height)


    var _dimension = function (which, elem, outer, includeMargin) {
      elem = elem === document ? window : elem;

      if (elem === window) {
        includeMargin = false;
      } else if (!_type.DomElement(elem)) {
        return 0;
      }

      which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
      var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;

      if (outer && includeMargin) {
        var style = _getComputedStyle(elem);

        dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
      }

      return dimension;
    }; // converts 'margin-top' into 'marginTop'


    var _camelCase = function (str) {
      return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    /**
     * ------------------------------
     * external helpers
     * ------------------------------
     */
    // extend obj – same as jQuery.extend({}, objA, objB)


    U.extend = function (obj) {
      obj = obj || {};

      for (i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    }; // check if a css display type results in margin-collapse or not


    U.isMarginCollapseType = function (str) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
    }; // implementation of requestAnimationFrame
    // based on https://gist.github.com/paulirish/1579671


    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    var _requestAnimationFrame = window.requestAnimationFrame;
    var _cancelAnimationFrame = window.cancelAnimationFrame; // try vendor prefixes if the above doesn't work

    for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
      _requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
      _cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    } // fallbacks


    if (!_requestAnimationFrame) {
      _requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!_cancelAnimationFrame) {
      _cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
      };
    }

    U.rAF = _requestAnimationFrame.bind(window);
    U.cAF = _cancelAnimationFrame.bind(window);
    var loglevels = ["error", "warn", "log"],
        console = window.console || {};

    console.log = console.log || function () {}; // no console log, well - do nothing then...
    // make sure methods for all levels exist.


    for (i = 0; i < loglevels.length; i++) {
      var method = loglevels[i];

      if (!console[method]) {
        console[method] = console.log; // prefer .log over nothing
      }
    }

    U.log = function (loglevel) {
      if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
      var now = new Date(),
          time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
          method = loglevels[loglevel - 1],
          args = Array.prototype.splice.call(arguments, 1),
          func = Function.prototype.bind.call(console[method], console);
      args.unshift(time);
      func.apply(console, args);
    };
    /**
     * ------------------------------
     * type testing
     * ------------------------------
     */


    var _type = U.type = function (v) {
      return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };

    _type.String = function (v) {
      return _type(v) === 'string';
    };

    _type.Function = function (v) {
      return _type(v) === 'function';
    };

    _type.Array = function (v) {
      return Array.isArray(v);
    };

    _type.Number = function (v) {
      return !_type.Array(v) && v - parseFloat(v) + 1 >= 0;
    };

    _type.DomElement = function (o) {
      return typeof HTMLElement === "object" || typeof HTMLElement === "function" ? o instanceof HTMLElement || o instanceof SVGElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
    };
    /**
     * ------------------------------
     * DOM Element info
     * ------------------------------
     */
    // always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors


    var _get = U.get = {};

    _get.elements = function (selector) {
      var arr = [];

      if (_type.String(selector)) {
        try {
          selector = document.querySelectorAll(selector);
        } catch (e) {
          // invalid selector
          return arr;
        }
      }

      if (_type(selector) === 'nodelist' || _type.Array(selector) || selector instanceof NodeList) {
        for (var i = 0, ref = arr.length = selector.length; i < ref; i++) {
          // list of elements
          var elem = selector[i];
          arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
        }
      } else if (_type.DomElement(selector) || selector === document || selector === window) {
        arr = [selector]; // only the element
      }

      return arr;
    }; // get scroll top value


    _get.scrollTop = function (elem) {
      return elem && typeof elem.scrollTop === 'number' ? elem.scrollTop : window.pageYOffset || 0;
    }; // get scroll left value


    _get.scrollLeft = function (elem) {
      return elem && typeof elem.scrollLeft === 'number' ? elem.scrollLeft : window.pageXOffset || 0;
    }; // get element height


    _get.width = function (elem, outer, includeMargin) {
      return _dimension('width', elem, outer, includeMargin);
    }; // get element width


    _get.height = function (elem, outer, includeMargin) {
      return _dimension('height', elem, outer, includeMargin);
    }; // get element position (optionally relative to viewport)


    _get.offset = function (elem, relativeToViewport) {
      var offset = {
        top: 0,
        left: 0
      };

      if (elem && elem.getBoundingClientRect) {
        // check if available
        var rect = elem.getBoundingClientRect();
        offset.top = rect.top;
        offset.left = rect.left;

        if (!relativeToViewport) {
          // clientRect is by default relative to viewport...
          offset.top += _get.scrollTop();
          offset.left += _get.scrollLeft();
        }
      }

      return offset;
    };
    /**
     * ------------------------------
     * DOM Element manipulation
     * ------------------------------
     */


    U.addClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.add(classname);else elem.className += ' ' + classname;
      }
    };

    U.removeClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.remove(classname);else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }; // if options is string -> returns css value
    // if options is array -> returns object with css value pairs
    // if options is object -> set new css values


    U.css = function (elem, options) {
      if (_type.String(options)) {
        return _getComputedStyle(elem)[_camelCase(options)];
      } else if (_type.Array(options)) {
        var obj = {},
            style = _getComputedStyle(elem);

        options.forEach(function (option, key) {
          obj[option] = style[_camelCase(option)];
        });
        return obj;
      } else {
        for (var option in options) {
          var val = options[option];

          if (val == parseFloat(val)) {
            // assume pixel for seemingly numerical values
            val += 'px';
          }

          elem.style[_camelCase(option)] = val;
        }
      }
    };

    return U;
  }(window || {});

  ScrollMagic.Scene.prototype.addIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  return ScrollMagic;
});
},{}],"../node_modules/gsap/TweenMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "TweenPlugin", {
  enumerable: true,
  get: function () {
    return _TweenLite.TweenPlugin;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.default;
  }
});
Object.defineProperty(exports, "AttrPlugin", {
  enumerable: true,
  get: function () {
    return _AttrPlugin.default;
  }
});
Object.defineProperty(exports, "RoundPropsPlugin", {
  enumerable: true,
  get: function () {
    return _RoundPropsPlugin.default;
  }
});
Object.defineProperty(exports, "DirectionalRotationPlugin", {
  enumerable: true,
  get: function () {
    return _DirectionalRotationPlugin.default;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _TimelineMax.default;
  }
});
Object.defineProperty(exports, "BezierPlugin", {
  enumerable: true,
  get: function () {
    return _BezierPlugin.default;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _EasePack.Back;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _EasePack.Elastic;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _EasePack.Bounce;
  }
});
Object.defineProperty(exports, "RoughEase", {
  enumerable: true,
  get: function () {
    return _EasePack.RoughEase;
  }
});
Object.defineProperty(exports, "SlowMo", {
  enumerable: true,
  get: function () {
    return _EasePack.SlowMo;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _EasePack.SteppedEase;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _EasePack.Circ;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _EasePack.Expo;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _EasePack.Sine;
  }
});
Object.defineProperty(exports, "ExpoScaleEase", {
  enumerable: true,
  get: function () {
    return _EasePack.ExpoScaleEase;
  }
});
exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TweenMaxBase = _interopRequireDefault(require("./TweenMaxBase.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

var _AttrPlugin = _interopRequireDefault(require("./AttrPlugin.js"));

var _RoundPropsPlugin = _interopRequireDefault(require("./RoundPropsPlugin.js"));

var _DirectionalRotationPlugin = _interopRequireDefault(require("./DirectionalRotationPlugin.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

var _TimelineMax = _interopRequireDefault(require("./TimelineMax.js"));

var _BezierPlugin = _interopRequireDefault(require("./BezierPlugin.js"));

var _EasePack = require("./EasePack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
//the following two lines are designed to prevent tree shaking of the classes that were historically included with TweenMax (otherwise, folks would have to reference CSSPlugin, for example, to ensure their CSS-related animations worked)
var TweenMax = _TweenMaxBase.default;
exports.default = exports.TweenMax = TweenMax;
TweenMax._autoActivated = [_TimelineLite.default, _TimelineMax.default, _CSSPlugin.default, _AttrPlugin.default, _BezierPlugin.default, _RoundPropsPlugin.default, _DirectionalRotationPlugin.default, _EasePack.Back, _EasePack.Elastic, _EasePack.Bounce, _EasePack.RoughEase, _EasePack.SlowMo, _EasePack.SteppedEase, _EasePack.Circ, _EasePack.Expo, _EasePack.Sine, _EasePack.ExpoScaleEase];
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./TweenMaxBase.js":"../node_modules/gsap/TweenMaxBase.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js","./AttrPlugin.js":"../node_modules/gsap/AttrPlugin.js","./RoundPropsPlugin.js":"../node_modules/gsap/RoundPropsPlugin.js","./DirectionalRotationPlugin.js":"../node_modules/gsap/DirectionalRotationPlugin.js","./TimelineLite.js":"../node_modules/gsap/TimelineLite.js","./TimelineMax.js":"../node_modules/gsap/TimelineMax.js","./BezierPlugin.js":"../node_modules/gsap/BezierPlugin.js","./EasePack.js":"../node_modules/gsap/EasePack.js"}],"../node_modules/gsap/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "_gsScope", {
  enumerable: true,
  get: function () {
    return _TweenLite._gsScope;
  }
});
Object.defineProperty(exports, "TweenPlugin", {
  enumerable: true,
  get: function () {
    return _TweenLite.TweenPlugin;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _TimelineMax.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TweenMax.default;
  }
});
Object.defineProperty(exports, "TweenMax", {
  enumerable: true,
  get: function () {
    return _TweenMax.default;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.default;
  }
});
Object.defineProperty(exports, "AttrPlugin", {
  enumerable: true,
  get: function () {
    return _AttrPlugin.default;
  }
});
Object.defineProperty(exports, "RoundPropsPlugin", {
  enumerable: true,
  get: function () {
    return _RoundPropsPlugin.default;
  }
});
Object.defineProperty(exports, "DirectionalRotationPlugin", {
  enumerable: true,
  get: function () {
    return _DirectionalRotationPlugin.default;
  }
});
Object.defineProperty(exports, "BezierPlugin", {
  enumerable: true,
  get: function () {
    return _BezierPlugin.default;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _EasePack.Back;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _EasePack.Elastic;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _EasePack.Bounce;
  }
});
Object.defineProperty(exports, "RoughEase", {
  enumerable: true,
  get: function () {
    return _EasePack.RoughEase;
  }
});
Object.defineProperty(exports, "SlowMo", {
  enumerable: true,
  get: function () {
    return _EasePack.SlowMo;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _EasePack.SteppedEase;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _EasePack.Circ;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _EasePack.Expo;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _EasePack.Sine;
  }
});
Object.defineProperty(exports, "ExpoScaleEase", {
  enumerable: true,
  get: function () {
    return _EasePack.ExpoScaleEase;
  }
});

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

var _TimelineMax = _interopRequireDefault(require("./TimelineMax.js"));

var _TweenMax = _interopRequireDefault(require("./TweenMax.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

var _AttrPlugin = _interopRequireDefault(require("./AttrPlugin.js"));

var _RoundPropsPlugin = _interopRequireDefault(require("./RoundPropsPlugin.js"));

var _DirectionalRotationPlugin = _interopRequireDefault(require("./DirectionalRotationPlugin.js"));

var _BezierPlugin = _interopRequireDefault(require("./BezierPlugin.js"));

var _EasePack = require("./EasePack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./TweenLite.js":"../node_modules/gsap/TweenLite.js","./TimelineLite.js":"../node_modules/gsap/TimelineLite.js","./TimelineMax.js":"../node_modules/gsap/TimelineMax.js","./TweenMax.js":"../node_modules/gsap/TweenMax.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js","./AttrPlugin.js":"../node_modules/gsap/AttrPlugin.js","./RoundPropsPlugin.js":"../node_modules/gsap/RoundPropsPlugin.js","./DirectionalRotationPlugin.js":"../node_modules/gsap/DirectionalRotationPlugin.js","./BezierPlugin.js":"../node_modules/gsap/BezierPlugin.js","./EasePack.js":"../node_modules/gsap/EasePack.js"}],"../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js":[function(require,module,exports) {
var define;
/*!
 * ScrollMagic v2.0.7 (2019-05-07)
 * The javascript library for magical scroll interactions.
 * (c) 2019 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.7
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */

/**
 * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
 * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
 *
 * Both the `lite` and the `max` versions of the GSAP library are supported.  
 * The most basic requirement is `TweenLite`.
 * 
 * To have access to this extension, please include `plugins/animation.gsap.js`.
 * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
 * @mixin animation.GSAP
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic', 'TweenMax', 'TimelineMax'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    // Loads whole gsap package onto global scope.
    require('gsap');

    factory(require('scrollmagic'), TweenMax, TimelineMax);
  } else {
    // Browser globals
    factory(root.ScrollMagic || root.jQuery && root.jQuery.ScrollMagic, root.TweenMax || root.TweenLite, root.TimelineMax || root.TimelineLite);
  }
})(this, function (ScrollMagic, Tween, Timeline) {
  "use strict";

  var NAMESPACE = "animation.gsap";
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!Tween) {
    err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  }
  /*
   * ----------------------------------------------------------------
   * Extensions for Scene
   * ----------------------------------------------------------------
   */

  /**
   * Every instance of ScrollMagic.Scene now accepts an additional option.  
   * See {@link ScrollMagic.Scene} for a complete list of the standard options.
   * @memberof! animation.GSAP#
   * @method new ScrollMagic.Scene(options)
   * @example
   * var scene = new ScrollMagic.Scene({tweenChanges: true});
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.
   * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
   												  Does not affect animations where duration is `0`.
   */

  /**
   * **Get** or **Set** the tweenChanges option value.  
   * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
   * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
   * @memberof! animation.GSAP#
   * @method Scene.tweenChanges
   * 
   * @example
   * // get the current tweenChanges option
   * var tweenChanges = scene.tweenChanges();
   *
   * // set new tweenChanges option
   * scene.tweenChanges(true);
   *
   * @fires {@link Scene.change}, when used as setter
   * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
   * @returns {boolean} `get` -  Current tweenChanges option value.
   * @returns {Scene} `set` -  Parent object for chaining.
   */
  // add option (TODO: DOC (private for dev))


  ScrollMagic.Scene.addOption("tweenChanges", // name
  false, // default
  function (val) {
    // validation callback
    return !!val;
  }); // extend scene

  ScrollMagic.Scene.extend(function () {
    var Scene = this,
        _tween;

    var log = function () {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    }; // set listeners


    Scene.on("progress.plugin_gsap", function () {
      updateTweenProgress();
    });
    Scene.on("destroy.plugin_gsap", function (e) {
      Scene.removeTween(e.reset);
    });
    /**
     * Update the tween progress to current position.
     * @private
     */

    var updateTweenProgress = function () {
      if (_tween) {
        var progress = Scene.progress(),
            state = Scene.state();

        if (_tween.repeat && _tween.repeat() === -1) {
          // infinite loop, so not in relation to progress
          if (state === 'DURING' && _tween.paused()) {
            _tween.play();
          } else if (state !== 'DURING' && !_tween.paused()) {
            _tween.pause();
          }
        } else if (progress != _tween.progress()) {
          // do we even need to update the progress?
          // no infinite loop - so should we just play or go to a specific point in time?
          if (Scene.duration() === 0) {
            // play the animation
            if (progress > 0) {
              // play from 0 to 1
              _tween.play();
            } else {
              // play from 1 to 0
              _tween.reverse();
            }
          } else {
            // go to a specific point in time
            if (Scene.tweenChanges() && _tween.tweenTo) {
              // go smooth
              _tween.tweenTo(progress * _tween.duration());
            } else {
              // just hard set it
              _tween.progress(progress).pause();
            }
          }
        }
      }
    };
    /**
     * Add a tween to the scene.  
     * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
     * 
     * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
     * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
     * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
     *
     * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
     * @memberof! animation.GSAP#
     *
     * @example
     * // add a single tween directly
     * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
     *
     * // add a single tween via variable
     * var tween = TweenMax.to("obj"), 1, {x: 100};
     * scene.setTween(tween);
     *
     * // add multiple tweens, wrapped in a timeline.
     * var timeline = new TimelineMax();
     * var tween1 = TweenMax.from("obj1", 1, {x: 100});
     * var tween2 = TweenMax.to("obj2", 1, {y: 100});
     * timeline
     *		.add(tween1)
     *		.add(tween2);
     * scene.addTween(timeline);
     *
     * // short hand to add a TweenMax.to() tween
     * scene.setTween("obj3", 0.5, {y: 100});
     *
     * // short hand to add a TweenMax.to() tween for 1 second
     * // this is useful, when the scene has a duration and the tween duration isn't important anyway
     * scene.setTween("obj3", {y: 100});
     *
     * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
     * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
     * @param {object} params - The parameters for the tween
     * @returns {Scene} Parent object for chaining.
     */


    Scene.setTween = function (TweenObject, duration, params) {
      var newTween;

      if (arguments.length > 1) {
        if (arguments.length < 3) {
          params = duration;
          duration = 1;
        }

        TweenObject = Tween.to(TweenObject, duration, params);
      }

      try {
        // wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
        if (Timeline) {
          newTween = new Timeline({
            smoothChildTiming: true
          }).add(TweenObject);
        } else {
          newTween = TweenObject;
        }

        newTween.pause();
      } catch (e) {
        log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
        return Scene;
      }

      if (_tween) {
        // kill old tween?
        Scene.removeTween();
      }

      _tween = newTween; // some properties need to be transferred it to the wrapper, otherwise they would get lost.

      if (TweenObject.repeat && TweenObject.repeat() === -1) {
        // TweenMax or TimelineMax Object?
        _tween.repeat(-1);

        _tween.yoyo(TweenObject.yoyo());
      } // Some tween validations and debugging helpers


      if (Scene.tweenChanges() && !_tween.tweenTo) {
        log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
      } // check if there are position tweens defined for the trigger and warn about it :)


      if (_tween && Scene.controller() && Scene.triggerElement() && Scene.loglevel() >= 2) {
        // controller is needed to know scroll direction.
        var triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
            vertical = Scene.controller().info("vertical");
        triggerTweens.forEach(function (value, index) {
          var tweenvars = value.vars.css || value.vars,
              condition = vertical ? tweenvars.top !== undefined || tweenvars.bottom !== undefined : tweenvars.left !== undefined || tweenvars.right !== undefined;

          if (condition) {
            log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
            return false;
          }
        });
      } // warn about tween overwrites, when an element is tweened multiple times


      if (parseFloat(TweenLite.version) >= 1.14) {
        // onOverwrite only present since GSAP v1.14.0
        var list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween],
            // get all nested tween objects
        newCallback = function () {
          log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
        };

        for (var i = 0, thisTween, oldCallback; i < list.length; i++) {
          /*jshint loopfunc: true */
          thisTween = list[i];

          if (oldCallback !== newCallback) {
            // if tweens is added more than once
            oldCallback = thisTween.vars.onOverwrite;

            thisTween.vars.onOverwrite = function () {
              if (oldCallback) {
                oldCallback.apply(this, arguments);
              }

              newCallback.apply(this, arguments);
            };
          }
        }
      }

      log(3, "added tween");
      updateTweenProgress();
      return Scene;
    };
    /**
     * Remove the tween from the scene.  
     * This will terminate the control of the Scene over the tween.
     *
     * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
     * @memberof! animation.GSAP#
     *
     * @example
     * // remove the tween from the scene without resetting it
     * scene.removeTween();
     *
     * // remove the tween from the scene and reset it to initial position
     * scene.removeTween(true);
     *
     * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
     * @returns {Scene} Parent object for chaining.
     */


    Scene.removeTween = function (reset) {
      if (_tween) {
        if (reset) {
          _tween.progress(0).pause();
        }

        _tween.kill();

        _tween = undefined;
        log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };
  });
});
},{"gsap":"../node_modules/gsap/index.js","scrollmagic":"../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"}],"../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js":[function(require,module,exports) {
var define;
/*!
 * ScrollMagic v2.0.7 (2019-05-07)
 * The javascript library for magical scroll interactions.
 * (c) 2019 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.7
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file Debug Extension for ScrollMagic.
 */

/**
 * This plugin was formerly known as the ScrollMagic debug extension.
 *
 * It enables you to add visual indicators to your page, to be able to see exactly when a scene is triggered.
 *
 * To have access to this extension, please include `plugins/debug.addIndicators.js`.
 * @mixin debug.addIndicators
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('scrollmagic'));
  } else {
    // no browser global export needed, just execute
    factory(root.ScrollMagic || root.jQuery && root.jQuery.ScrollMagic);
  }
})(this, function (ScrollMagic) {
  "use strict";

  var NAMESPACE = "debug.addIndicators";
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  } // plugin settings


  var FONT_SIZE = "0.85em",
      ZINDEX = "9999",
      EDGE_OFFSET = 15; // minimum edge distance, added to indentation
  // overall vars

  var _util = ScrollMagic._util,
      _autoindex = 0;
  ScrollMagic.Scene.extend(function () {
    var Scene = this,
        _indicator;

    var log = function () {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    };
    /**
     * Add visual indicators for a ScrollMagic.Scene.  
     * @memberof! debug.addIndicators#
     *
     * @example
     * // add basic indicators
     * scene.addIndicators()
     *
     * // passing options
     * scene.addIndicators({name: "pin scene", colorEnd: "#FFFFFF"});
     *
     * @param {object} [options] - An object containing one or more options for the indicators.
     * @param {(string|object)} [options.parent] - A selector, DOM Object or a jQuery object that the indicators should be added to.  
     														 														 If undefined, the controller's container will be used.
     * @param {number} [options.name=""] - This string will be displayed at the start and end indicators of the scene for identification purposes. If no name is supplied an automatic index will be used.
     * @param {number} [options.indent=0] - Additional position offset for the indicators (useful, when having multiple scenes starting at the same position).
     * @param {string} [options.colorStart=green] - CSS color definition for the start indicator.
     * @param {string} [options.colorEnd=red] - CSS color definition for the end indicator.
     * @param {string} [options.colorTrigger=blue] - CSS color definition for the trigger indicator.
     */


    Scene.addIndicators = function (options) {
      if (!_indicator) {
        var DEFAULT_OPTIONS = {
          name: "",
          indent: 0,
          parent: undefined,
          colorStart: "green",
          colorEnd: "red",
          colorTrigger: "blue"
        };
        options = _util.extend({}, DEFAULT_OPTIONS, options);
        _autoindex++;
        _indicator = new Indicator(Scene, options);
        Scene.on("add.plugin_addIndicators", _indicator.add);
        Scene.on("remove.plugin_addIndicators", _indicator.remove);
        Scene.on("destroy.plugin_addIndicators", Scene.removeIndicators); // it the scene already has a controller we can start right away.

        if (Scene.controller()) {
          _indicator.add();
        }
      }

      return Scene;
    };
    /**
     * Removes visual indicators from a ScrollMagic.Scene.
     * @memberof! debug.addIndicators#
     *
     * @example
     * // remove previously added indicators
     * scene.removeIndicators()
     *
     */


    Scene.removeIndicators = function () {
      if (_indicator) {
        _indicator.remove();

        this.off("*.plugin_addIndicators");
        _indicator = undefined;
      }

      return Scene;
    };
  });
  /*
   * ----------------------------------------------------------------
   * Extension for controller to store and update related indicators
   * ----------------------------------------------------------------
   */
  // add option to globally auto-add indicators to scenes

  /**
   * Every ScrollMagic.Controller instance now accepts an additional option.  
   * See {@link ScrollMagic.Controller} for a complete list of the standard options.
   * @memberof! debug.addIndicators#
   * @method new ScrollMagic.Controller(options)
   * @example
   * // make a controller and add indicators to all scenes attached
   * var controller = new ScrollMagic.Controller({addIndicators: true});
   * // this scene will automatically have indicators added to it
   * new ScrollMagic.Scene()
   *                .addTo(controller);
   *
   * @param {object} [options] - Options for the Controller.
   * @param {boolean} [options.addIndicators=false] - If set to `true` every scene that is added to the controller will automatically get indicators added to it.
   */

  ScrollMagic.Controller.addOption("addIndicators", false); // extend Controller

  ScrollMagic.Controller.extend(function () {
    var Controller = this,
        _info = Controller.info(),
        _container = _info.container,
        _isDocument = _info.isDocument,
        _vertical = _info.vertical,
        _indicators = {
      // container for all indicators and methods
      groups: []
    };

    var log = function () {
      if (Controller._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Controller._log.apply(this, arguments);
      }
    };

    if (Controller._indicators) {
      log(2, "WARNING: Scene already has a property '_indicators', which will be overwritten by plugin.");
    } // add indicators container


    this._indicators = _indicators;
    /*
    	needed updates:
    	+++++++++++++++
    	start/end position on scene shift (handled in Indicator class)
    	trigger parameters on triggerHook value change (handled in Indicator class)
    	bounds position on container scroll or resize (to keep alignment to bottom/right)
    	trigger position on container resize, window resize (if container isn't document) and window scroll (if container isn't document)
    */
    // event handler for when associated bounds markers need to be repositioned

    var handleBoundsPositionChange = function () {
      _indicators.updateBoundsPositions();
    }; // event handler for when associated trigger groups need to be repositioned


    var handleTriggerPositionChange = function () {
      _indicators.updateTriggerGroupPositions();
    };

    _container.addEventListener("resize", handleTriggerPositionChange);

    if (!_isDocument) {
      window.addEventListener("resize", handleTriggerPositionChange);
      window.addEventListener("scroll", handleTriggerPositionChange);
    } // update all related bounds containers


    _container.addEventListener("resize", handleBoundsPositionChange);

    _container.addEventListener("scroll", handleBoundsPositionChange); // updates the position of the bounds container to aligned to the right for vertical containers and to the bottom for horizontal


    this._indicators.updateBoundsPositions = function (specificIndicator) {
      var // constant for all bounds
      groups = specificIndicator ? [_util.extend({}, specificIndicator.triggerGroup, {
        members: [specificIndicator]
      })] : // create a group with only one element
      _indicators.groups,
          // use all
      g = groups.length,
          css = {},
          paramPos = _vertical ? "left" : "top",
          paramDimension = _vertical ? "width" : "height",
          edge = _vertical ? _util.get.scrollLeft(_container) + _util.get.width(_container) - EDGE_OFFSET : _util.get.scrollTop(_container) + _util.get.height(_container) - EDGE_OFFSET,
          b,
          triggerSize,
          group;

      while (g--) {
        // group loop
        group = groups[g];
        b = group.members.length;
        triggerSize = _util.get[paramDimension](group.element.firstChild);

        while (b--) {
          // indicators loop
          css[paramPos] = edge - triggerSize;

          _util.css(group.members[b].bounds, css);
        }
      }
    }; // updates the positions of all trigger groups attached to a controller or a specific one, if provided


    this._indicators.updateTriggerGroupPositions = function (specificGroup) {
      var // constant vars
      groups = specificGroup ? [specificGroup] : _indicators.groups,
          i = groups.length,
          container = _isDocument ? document.body : _container,
          containerOffset = _isDocument ? {
        top: 0,
        left: 0
      } : _util.get.offset(container, true),
          edge = _vertical ? _util.get.width(_container) - EDGE_OFFSET : _util.get.height(_container) - EDGE_OFFSET,
          paramDimension = _vertical ? "width" : "height",
          paramTransform = _vertical ? "Y" : "X";
      var // changing vars
      group, elem, pos, elemSize, transform;

      while (i--) {
        group = groups[i];
        elem = group.element;
        pos = group.triggerHook * Controller.info("size");
        elemSize = _util.get[paramDimension](elem.firstChild.firstChild);
        transform = pos > elemSize ? "translate" + paramTransform + "(-100%)" : "";

        _util.css(elem, {
          top: containerOffset.top + (_vertical ? pos : edge - group.members[0].options.indent),
          left: containerOffset.left + (_vertical ? edge - group.members[0].options.indent : pos)
        });

        _util.css(elem.firstChild.firstChild, {
          "-ms-transform": transform,
          "-webkit-transform": transform,
          "transform": transform
        });
      }
    }; // updates the label for the group to contain the name, if it only has one member


    this._indicators.updateTriggerGroupLabel = function (group) {
      var text = "trigger" + (group.members.length > 1 ? "" : " " + group.members[0].options.name),
          elem = group.element.firstChild.firstChild,
          doUpdate = elem.textContent !== text;

      if (doUpdate) {
        elem.textContent = text;

        if (_vertical) {
          // bounds position is dependent on text length, so update
          _indicators.updateBoundsPositions();
        }
      }
    }; // add indicators if global option is set


    this.addScene = function (newScene) {
      if (this._options.addIndicators && newScene instanceof ScrollMagic.Scene && newScene.controller() === Controller) {
        newScene.addIndicators();
      } // call original destroy method


      this.$super.addScene.apply(this, arguments);
    }; // remove all previously set listeners on destroy


    this.destroy = function () {
      _container.removeEventListener("resize", handleTriggerPositionChange);

      if (!_isDocument) {
        window.removeEventListener("resize", handleTriggerPositionChange);
        window.removeEventListener("scroll", handleTriggerPositionChange);
      }

      _container.removeEventListener("resize", handleBoundsPositionChange);

      _container.removeEventListener("scroll", handleBoundsPositionChange); // call original destroy method


      this.$super.destroy.apply(this, arguments);
    };

    return Controller;
  });
  /*
   * ----------------------------------------------------------------
   * Internal class for the construction of Indicators
   * ----------------------------------------------------------------
   */

  var Indicator = function (Scene, options) {
    var Indicator = this,
        _elemBounds = TPL.bounds(),
        _elemStart = TPL.start(options.colorStart),
        _elemEnd = TPL.end(options.colorEnd),
        _boundsContainer = options.parent && _util.get.elements(options.parent)[0],
        _vertical,
        _ctrl;

    var log = function () {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    };

    options.name = options.name || _autoindex; // prepare bounds elements

    _elemStart.firstChild.textContent += " " + options.name;
    _elemEnd.textContent += " " + options.name;

    _elemBounds.appendChild(_elemStart);

    _elemBounds.appendChild(_elemEnd); // set public variables


    Indicator.options = options;
    Indicator.bounds = _elemBounds; // will be set later

    Indicator.triggerGroup = undefined; // add indicators to DOM

    this.add = function () {
      _ctrl = Scene.controller();
      _vertical = _ctrl.info("vertical");

      var isDocument = _ctrl.info("isDocument");

      if (!_boundsContainer) {
        // no parent supplied or doesnt exist
        _boundsContainer = isDocument ? document.body : _ctrl.info("container"); // check if window/document (then use body)
      }

      if (!isDocument && _util.css(_boundsContainer, "position") === 'static') {
        // position mode needed for correct positioning of indicators
        _util.css(_boundsContainer, {
          position: "relative"
        });
      } // add listeners for updates


      Scene.on("change.plugin_addIndicators", handleTriggerParamsChange);
      Scene.on("shift.plugin_addIndicators", handleBoundsParamsChange); // updates trigger & bounds (will add elements if needed)

      updateTriggerGroup();
      updateBounds();
      setTimeout(function () {
        // do after all execution is finished otherwise sometimes size calculations are off
        _ctrl._indicators.updateBoundsPositions(Indicator);
      }, 0);
      log(3, "added indicators");
    }; // remove indicators from DOM


    this.remove = function () {
      if (Indicator.triggerGroup) {
        // if not set there's nothing to remove
        Scene.off("change.plugin_addIndicators", handleTriggerParamsChange);
        Scene.off("shift.plugin_addIndicators", handleBoundsParamsChange);

        if (Indicator.triggerGroup.members.length > 1) {
          // just remove from memberlist of old group
          var group = Indicator.triggerGroup;
          group.members.splice(group.members.indexOf(Indicator), 1);

          _ctrl._indicators.updateTriggerGroupLabel(group);

          _ctrl._indicators.updateTriggerGroupPositions(group);

          Indicator.triggerGroup = undefined;
        } else {
          // remove complete group
          removeTriggerGroup();
        }

        removeBounds();
        log(3, "removed indicators");
      }
    };
    /*
     * ----------------------------------------------------------------
     * internal Event Handlers
     * ----------------------------------------------------------------
     */
    // event handler for when bounds params change


    var handleBoundsParamsChange = function () {
      updateBounds();
    }; // event handler for when trigger params change


    var handleTriggerParamsChange = function (e) {
      if (e.what === "triggerHook") {
        updateTriggerGroup();
      }
    };
    /*
     * ----------------------------------------------------------------
     * Bounds (start / stop) management
     * ----------------------------------------------------------------
     */
    // adds an new bounds elements to the array and to the DOM


    var addBounds = function () {
      var v = _ctrl.info("vertical"); // apply stuff we didn't know before...


      _util.css(_elemStart.firstChild, {
        "border-bottom-width": v ? 1 : 0,
        "border-right-width": v ? 0 : 1,
        "bottom": v ? -1 : options.indent,
        "right": v ? options.indent : -1,
        "padding": v ? "0 8px" : "2px 4px"
      });

      _util.css(_elemEnd, {
        "border-top-width": v ? 1 : 0,
        "border-left-width": v ? 0 : 1,
        "top": v ? "100%" : "",
        "right": v ? options.indent : "",
        "bottom": v ? "" : options.indent,
        "left": v ? "" : "100%",
        "padding": v ? "0 8px" : "2px 4px"
      }); // append


      _boundsContainer.appendChild(_elemBounds);
    }; // remove bounds from list and DOM


    var removeBounds = function () {
      _elemBounds.parentNode.removeChild(_elemBounds);
    }; // update the start and end positions of the scene


    var updateBounds = function () {
      if (_elemBounds.parentNode !== _boundsContainer) {
        addBounds(); // Add Bounds elements (start/end)
      }

      var css = {};
      css[_vertical ? "top" : "left"] = Scene.triggerPosition();
      css[_vertical ? "height" : "width"] = Scene.duration();

      _util.css(_elemBounds, css);

      _util.css(_elemEnd, {
        display: Scene.duration() > 0 ? "" : "none"
      });
    };
    /*
     * ----------------------------------------------------------------
     * trigger and trigger group management
     * ----------------------------------------------------------------
     */
    // adds an new trigger group to the array and to the DOM


    var addTriggerGroup = function () {
      var triggerElem = TPL.trigger(options.colorTrigger); // new trigger element

      var css = {};
      css[_vertical ? "right" : "bottom"] = 0;
      css[_vertical ? "border-top-width" : "border-left-width"] = 1;

      _util.css(triggerElem.firstChild, css);

      _util.css(triggerElem.firstChild.firstChild, {
        padding: _vertical ? "0 8px 3px 8px" : "3px 4px"
      });

      document.body.appendChild(triggerElem); // directly add to body

      var newGroup = {
        triggerHook: Scene.triggerHook(),
        element: triggerElem,
        members: [Indicator]
      };

      _ctrl._indicators.groups.push(newGroup);

      Indicator.triggerGroup = newGroup; // update right away

      _ctrl._indicators.updateTriggerGroupLabel(newGroup);

      _ctrl._indicators.updateTriggerGroupPositions(newGroup);
    };

    var removeTriggerGroup = function () {
      _ctrl._indicators.groups.splice(_ctrl._indicators.groups.indexOf(Indicator.triggerGroup), 1);

      Indicator.triggerGroup.element.parentNode.removeChild(Indicator.triggerGroup.element);
      Indicator.triggerGroup = undefined;
    }; // updates the trigger group -> either join existing or add new one

    /*	
     * Logic:
     * 1 if a trigger group exist, check if it's in sync with Scene settings – if so, nothing else needs to happen
     * 2 try to find an existing one that matches Scene parameters
     * 	 2.1 If a match is found check if already assigned to an existing group
     *			 If so:
     *       A: it was the last member of existing group -> kill whole group
     *       B: the existing group has other members -> just remove from member list
     *	 2.2 Assign to matching group
     * 3 if no new match could be found, check if assigned to existing group
     *   A: yes, and it's the only member -> just update parameters and positions and keep using this group
     *   B: yes but there are other members -> remove from member list and create a new one
     *   C: no, so create a new one
     */


    var updateTriggerGroup = function () {
      var triggerHook = Scene.triggerHook(),
          closeEnough = 0.0001; // Have a group, check if it still matches

      if (Indicator.triggerGroup) {
        if (Math.abs(Indicator.triggerGroup.triggerHook - triggerHook) < closeEnough) {
          // _util.log(0, "trigger", options.name, "->", "no need to change, still in sync");
          return; // all good
        }
      } // Don't have a group, check if a matching one exists
      // _util.log(0, "trigger", options.name, "->", "out of sync!");


      var groups = _ctrl._indicators.groups,
          group,
          i = groups.length;

      while (i--) {
        group = groups[i];

        if (Math.abs(group.triggerHook - triggerHook) < closeEnough) {
          // found a match!
          // _util.log(0, "trigger", options.name, "->", "found match");
          if (Indicator.triggerGroup) {
            // do I have an old group that is out of sync?
            if (Indicator.triggerGroup.members.length === 1) {
              // is it the only remaining group?
              // _util.log(0, "trigger", options.name, "->", "kill");
              // was the last member, remove the whole group
              removeTriggerGroup();
            } else {
              Indicator.triggerGroup.members.splice(Indicator.triggerGroup.members.indexOf(Indicator), 1); // just remove from memberlist of old group

              _ctrl._indicators.updateTriggerGroupLabel(Indicator.triggerGroup);

              _ctrl._indicators.updateTriggerGroupPositions(Indicator.triggerGroup); // _util.log(0, "trigger", options.name, "->", "removing from previous member list");

            }
          } // join new group


          group.members.push(Indicator);
          Indicator.triggerGroup = group;

          _ctrl._indicators.updateTriggerGroupLabel(group);

          return;
        }
      } // at this point I am obviously out of sync and don't match any other group


      if (Indicator.triggerGroup) {
        if (Indicator.triggerGroup.members.length === 1) {
          // _util.log(0, "trigger", options.name, "->", "updating existing");
          // out of sync but i'm the only member => just change and update
          Indicator.triggerGroup.triggerHook = triggerHook;

          _ctrl._indicators.updateTriggerGroupPositions(Indicator.triggerGroup);

          return;
        } else {
          // _util.log(0, "trigger", options.name, "->", "removing from previous member list");
          Indicator.triggerGroup.members.splice(Indicator.triggerGroup.members.indexOf(Indicator), 1); // just remove from memberlist of old group

          _ctrl._indicators.updateTriggerGroupLabel(Indicator.triggerGroup);

          _ctrl._indicators.updateTriggerGroupPositions(Indicator.triggerGroup);

          Indicator.triggerGroup = undefined; // need a brand new group...
        }
      } // _util.log(0, "trigger", options.name, "->", "add a new one");
      // did not find any match, make new trigger group


      addTriggerGroup();
    };
  };
  /*
   * ----------------------------------------------------------------
   * Templates for the indicators
   * ----------------------------------------------------------------
   */


  var TPL = {
    start: function (color) {
      // inner element (for bottom offset -1, while keeping top position 0)
      var inner = document.createElement("div");
      inner.textContent = "start";

      _util.css(inner, {
        position: "absolute",
        overflow: "visible",
        "border-width": 0,
        "border-style": "solid",
        color: color,
        "border-color": color
      });

      var e = document.createElement('div'); // wrapper

      _util.css(e, {
        position: "absolute",
        overflow: "visible",
        width: 0,
        height: 0
      });

      e.appendChild(inner);
      return e;
    },
    end: function (color) {
      var e = document.createElement('div');
      e.textContent = "end";

      _util.css(e, {
        position: "absolute",
        overflow: "visible",
        "border-width": 0,
        "border-style": "solid",
        color: color,
        "border-color": color
      });

      return e;
    },
    bounds: function () {
      var e = document.createElement('div');

      _util.css(e, {
        position: "absolute",
        overflow: "visible",
        "white-space": "nowrap",
        "pointer-events": "none",
        "font-size": FONT_SIZE
      });

      e.style.zIndex = ZINDEX;
      return e;
    },
    trigger: function (color) {
      // inner to be above or below line but keep position
      var inner = document.createElement('div');
      inner.textContent = "trigger";

      _util.css(inner, {
        position: "relative"
      }); // inner wrapper for right: 0 and main element has no size


      var w = document.createElement('div');

      _util.css(w, {
        position: "absolute",
        overflow: "visible",
        "border-width": 0,
        "border-style": "solid",
        color: color,
        "border-color": color
      });

      w.appendChild(inner); // wrapper

      var e = document.createElement('div');

      _util.css(e, {
        position: "fixed",
        overflow: "visible",
        "white-space": "nowrap",
        "pointer-events": "none",
        "font-size": FONT_SIZE
      });

      e.style.zIndex = ZINDEX;
      e.appendChild(w);
      return e;
    }
  };
});
},{"scrollmagic":"../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"}],"scripts/Landing/Animations/LandingAnimations.js":[function(require,module,exports) {
"use strict";

var _all = require("gsap/all");

var _scrollmagic = _interopRequireDefault(require("scrollmagic"));

require("scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap");

require("scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  //Landing Animations
  //Variables ------
  //Landing Intro
  var LandingLoading = document.getElementById('Landing_Loading-In');
  var LandingCover = document.getElementById('Landing_Cover');
  var LandingLoadingPercent = document.getElementById('Landing_Loading-In-Percent');
  var LandingHeader = document.getElementById('Landing_Header');
  var LandingConstantAddress = document.getElementById('Landing-Constants_LeftFixed-Address');
  var LandingConstantSocials = document.getElementById('Landing-Constants_LeftFixed-Socials');
  var LandingConstantConnectIcon = document.getElementById('Landing-Constants-ConnectIcon');
  var LandingIntroHeader = document.getElementById('Landing_Intro-Header');
  var LandingIntroRight = document.getElementById('LandingIntro_Right');
  var LandingClients = document.getElementById('Landing_Clients'); //Variables ------
  //Pure GSAP -------- ------- ----- ---- --- -- -
  //Intro Scene

  var LandingIntroTl = new _all.TimelineMax();
  LandingIntroTl //Hide All
  .add('Init').set(LandingHeader, {
    opacity: 0,
    y: 50
  }, 'Init').set(LandingConstantAddress, {
    opacity: 0,
    x: -50
  }, 'Init').set(LandingConstantSocials, {
    opacity: 0,
    y: 50
  }, 'Init').set(LandingConstantConnectIcon, {
    opacity: 0,
    y: 50
  }, 'Init').set(LandingIntroHeader, {
    opacity: 0,
    y: 50
  }, 'Init').set(LandingIntroRight, {
    opacity: 0,
    y: 50
  }, 'Init').set(LandingClients, {
    opacity: 0
  }) //Loading
  .to(LandingLoading, 1.5, {
    left: 0,
    ease: _all.Power1.easeInOut,
    delay: .4
  }).set(LandingCover, {
    display: 'none'
  }).to(LandingLoadingPercent, .5, {
    opacity: 0,
    delay: .3
  }).to(LandingLoading, .8, {
    top: '-100%',
    delay: .3,
    ease: _all.Expo.easeInOut
  }).set(LandingLoading, {
    display: 'none'
  }) //In
  .add('wave1').to(LandingHeader, .6, {
    opacity: 1,
    y: 0,
    delay: .5,
    ease: _all.Power1.easeInOut
  }, 'wave1').to(LandingIntroHeader, 1, {
    opacity: 1,
    y: 0,
    ease: _all.Power1.easeInOut
  }, '-=.7').to(LandingIntroRight, 1, {
    opacity: 1,
    y: 0,
    ease: _all.Power1.easeInOut
  }, '-=.9').to(LandingConstantAddress, 1, {
    opacity: 1,
    x: 0,
    ease: _all.Power1.easeInOut
  }, '-=.8').to(LandingConstantSocials, 1, {
    opacity: 1,
    y: 0,
    ease: _all.Power1.easeInOut
  }, '-=.8').to(LandingConstantConnectIcon, 1, {
    opacity: 1,
    y: 0,
    ease: _all.Power1.easeInOut
  }, '-=.9').to(LandingClients, 1, {
    opacity: 1
  }, '-=1.3'); // ScrollMagic -------- ------- ----- ---- --- -- -

  var controller = new _scrollmagic.default.Controller(); //Scenes --------------
  //Projects ------ 
  //Project1 -------

  var LandingProject1Scene = new _scrollmagic.default.Scene({
    triggerElement: '#LandingProject1',
    reverse: false,
    triggerHook: .75
  }).setClassToggle('#Landing_CaseStudy-Project-Cover1', 'Slide-Right') // .addIndicators({
  //     name: 'Project1',
  //     colorTrigger: 'black',
  //     indent: 0,
  //     colorStart: 'green',
  //     colorEnd: 'pink'
  // })
  .addTo(controller); //Project2 -------

  var LandingProject2Scene = new _scrollmagic.default.Scene({
    triggerElement: '#LandingProject2',
    reverse: false,
    triggerHook: .75
  }).setClassToggle('#Landing_CaseStudy-Project-Cover2', 'Slide-Right') // .addIndicators({
  //     name: 'Project2',
  //     colorTrigger: 'black',
  //     indent: 0,
  //     colorStart: 'green',
  //     colorEnd: 'pink'
  // })
  .addTo(controller); //Project3 -------

  var LandingProject3Scene = new _scrollmagic.default.Scene({
    triggerElement: '#LandingProject3',
    reverse: false,
    triggerHook: .75
  }).setClassToggle('#Landing_CaseStudy-Project-Cover3', 'Slide-Right') // .addIndicators({
  //     name: 'Project3',
  //     colorTrigger: 'black',
  //     indent: 0,
  //     colorStart: 'green',
  //     colorEnd: 'pink'
  // })
  .addTo(controller); //Project4 -------

  var LandingProject4Scene = new _scrollmagic.default.Scene({
    triggerElement: '#LandingProject4',
    reverse: false,
    triggerHook: .75
  }).setClassToggle('#Landing_CaseStudy-Project-Cover4', 'Slide-Right') // .addIndicators({
  //     name: 'Project4',
  //     colorTrigger: 'black',
  //     indent: 0,
  //     colorStart: 'green',
  //     colorEnd: 'pink'
  // })
  .addTo(controller); //Project5 -------

  var LandingProject5Scene = new _scrollmagic.default.Scene({
    triggerElement: '#LandingProject5',
    reverse: false,
    triggerHook: .75
  }).setClassToggle('#Landing_CaseStudy-Project-Cover5', 'Slide-Right') // .addIndicators({
  //     name: 'Project5',
  //     colorTrigger: 'black',
  //     indent: 0,
  //     colorStart: 'green',
  //     colorEnd: 'pink'
  // })
  .addTo(controller); //Services --------
  //Header

  var LandingServicesIntroScene = new _scrollmagic.default.Scene({
    triggerElement: '#Landing_Services-IntroHeader',
    reverse: false,
    triggerHook: .85
  }).setClassToggle('#Landing_Services-IntroHeader', 'Fade-In') // .addIndicators({
  //         name: 'ServicesHeader',
  //         colorTrigger: 'black',
  //         indent: 0,
  //         colorStart: 'green',
  //         colorEnd: 'pink'
  //     })
  .addTo(controller); //Description

  var LandingServicesDescriptionScene = new _scrollmagic.default.Scene({
    triggerElement: '#Landing_Services-IntroHeader',
    reverse: false,
    triggerHook: .65
  }).setClassToggle('#Landing_Services-IntroRight', 'Fade-In') // .addIndicators({
  //         name: 'ServicesHeader',
  //         colorTrigger: 'black',
  //         indent: 0,
  //         colorStart: 'green',
  //         colorEnd: 'pink'
  //     })
  .addTo(controller); //Breakdown

  var LandingServicesBreakdownScene = new _scrollmagic.default.Scene({
    triggerElement: '#Landing_Services-BreakDown',
    reverse: false,
    triggerHook: .8
  }).setClassToggle('#Landing_Services-BreakDown', 'Fade-In') // .addIndicators({
  //         name: 'ServicesHeader',
  //         colorTrigger: 'black',
  //         indent: 0,
  //         colorStart: 'green',
  //         colorEnd: 'pink'
  //     })
  .addTo(controller);
})();
},{"gsap/all":"../node_modules/gsap/all.js","scrollmagic":"../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js","scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap":"../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js","scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators":"../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js"}],"scripts/Landing/Animations/HideLandingNav.js":[function(require,module,exports) {
"use strict";

var _TimelineMax = require("gsap/TimelineMax");

// //Nav
//---- Landing ----
(function () {
  var LandingHeader = document.getElementById('Landing_Header');
  var HideLandingHeaderTl = new _TimelineMax.TimelineMax();
  HideLandingHeaderTl.set(LandingHeader, {
    top: 0
  }).to(LandingHeader, 1, {
    top: '-100%',
    ease: Power2.easeIn
  });
  HideLandingHeaderTl.pause();
  var prevScrollpos = window.pageYOffset;

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      HideLandingHeaderTl.reverse();
    } else if (currentScrollPos > 200) {
      HideLandingHeaderTl.play();
    }

    prevScrollpos = currentScrollPos;
  };
})();
},{"gsap/TimelineMax":"../node_modules/gsap/TimelineMax.js"}],"scripts/Landing/Landing.js":[function(require,module,exports) {
"use strict";

var _LandingAnimations = _interopRequireDefault(require("./Animations/LandingAnimations"));

var _HideLandingNav = _interopRequireDefault(require("./Animations/HideLandingNav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Animations/LandingAnimations":"scripts/Landing/Animations/LandingAnimations.js","./Animations/HideLandingNav":"scripts/Landing/Animations/HideLandingNav.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52781" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/Landing/Landing.js"], null)
//# sourceMappingURL=/Landing.a7136427.js.map