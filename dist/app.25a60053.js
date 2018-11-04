// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"assets/javascript/storageHelper.js":[function(require,module,exports) {
/* Initialize Firebase*/
var config = {
  apiKey: "AIzaSyAaBxgXJBVE_9C8qzRu_ebV1sscAVqiers",
  authDomain: "group-project-4da86.firebaseapp.com",
  databaseURL: "https://group-project-4da86.firebaseio.com",
  projectId: "group-project-4da86",
  storageBucket: "group-project-4da86.appspot.com",
  messagingSenderId: "847074672907"
};
firebase.initializeApp(config);

var getAllItemsFB = function getAllItemsFB() {
  console.log("FB");
  var database = firebase.database();
};
/* add an item to the local storage */


var setLocalStorage = function setLocalStorage(key, val) {
  localStorage.setItem(key, val);
};
/* retreives an item from the local storage based on the key */


var getLocalStorage = function getLocalStorage(key) {
  localStorage.getItem(key);
};
/* removes an item from the local storage based on the key */


var deleteLocalStorage = function deleteLocalStorage(key) {
  localStorage.removeItem(key);
};

module.exports = {
  setLocalStorage: setLocalStorage,
  getLocalStorage: getLocalStorage,
  deleteLocalStorage: deleteLocalStorage,
  getAllItemsFB: getAllItemsFB
};
},{}],"assets/javascript/app.js":[function(require,module,exports) {
var storageHelper = require('./storageHelper');

$(document).ready(function () {
  /**
   * 
   * GLOBALS
   */
  storageHelper.setLocalStorage('name', 'james'); //  Initialize Firebase

  var config = {
    apiKey: "AIzaSyAaBxgXJBVE_9C8qzRu_ebV1sscAVqiers",
    authDomain: "group-project-4da86.firebaseapp.com",
    databaseURL: "https://group-project-4da86.firebaseio.com",
    projectId: "group-project-4da86",
    storageBucket: "group-project-4da86.appspot.com",
    messagingSenderId: "847074672907"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  /**
   *  geoIP defaults to empty string
   *  rangeInMile defaults to 10
   *  sortField defaults to datetime_local
   *  sortOrder defaults to desc the other option is asc
   */

  var seatgeek = {
    url: "https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA",
    rangeInMiles: 0,
    sortField: "datetime_local",
    sortOrder: "desc",
    events: [],
    urlStr: "",
    getEvents: function getEvents(rangeInMile, isAsc, taxonomies) {
      // validation
      this.rangeInMiles = rangeInMile; // sort order 

      if (isAsc) {
        this.sortOrder = "asc";
      } else {
        this.sortOrder = "desc";
      } // api


      $.ajax({
        url: "https://api.ipify.org/?format=json",
        method: "GET"
      }).then(function (res) {
        var ip = res.ip;
        var taxonomiesStr = '';

        for (var i = 0; i < taxonomies.length; i++) {
          taxonomiesStr = taxonomiesStr + "&taxonomies.name=" + taxonomies[i];
        }

        seatgeek.urlStr = seatgeek.url + "&geoip=" + ip + "&range=" + seatgeek.rangeInMiles + "mi" + "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder + taxonomiesStr;
        $.ajax({
          url: seatgeek.url + "&geoip=" + ip + "&range=" + seatgeek.rangeInMiles + "mi" + "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder + taxonomiesStr,
          method: "GET"
        }).then(function (res) {
          seatgeek.setEvents(res.events);
        });
      });
    },
    setEvents: function setEvents(events) {
      this.events = events;
    }
  }; // click function rendering search input. 

  $("#search").on("click", function (event) {
    event.preventDefault();
    var taxonomies = [];
    $.each($("input:checked"), function () {
      var search = $(this).val();
      taxonomies.push(search);
      console.log(search);
    });
    seatgeek.getEvents(11, false, taxonomies);
    console.log(seatgeek);
    renderResults(seatgeek);
  }); // function to render api results to ui

  function renderResults(seatgeek) {
    for (var i = 0; i < seatgeek.events.length; i++) {
      console.log(seatgeek.events[i]);
      var mainEvents = $("<ul>");
      mainEvents.addClass("list-group");
      $(".events").append(mainEvents);
      var title = seatgeek.events[i].title;
      var eventsList = $("<li class='event-list-title'></li>");
      eventsList.append("<span class='label label-primary'>" + title + "</span>");
      var eventDate = seatgeek.events[i].datetime_local;
      eventsList.append("<h5>" + eventDate + "</h5>");
      mainEvents.append(eventsList);
      $(".events").html(mainEvents);
    }

    ;
  }

  ;

  function populateList(response) {
    for (var i = 0; i < response.events.length; i++) {
      var div = $("<div>");
      var row = $("<div>");
      var title = $("<div>");
      row.addClass("eventContainer");
      title.addClass("title");
      div.addClass("eventButton");
      var event = response.events[i];
      title.text(event.title);
      row.append(title);
      div.append(row);
      $(".events").append(div);
    }
  }
  /********** Storage Helper's ************/

  /* Get's all values from Fire Base */


  var getAllValuesFB = function getAllValuesFB() {
    database.ref().on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
      }, function (errorObject) {
        console.log("Error " + errorObject.code);
      });
    });
  };
  /* Get's child from Fire Base */


  var checkChildAdded = function checkChildAdded() {
    database.ref().on("child_added", function (snapshot) {
      var val = snapshot.val();
      console.log(val);
    }, function (errorObject) {
      console.log("Error " + errorObject.code);
    });
  };
  /* add an item to the local storage */


  var setLocalStorage = function setLocalStorage(key, val) {
    localStorage.setItem(key, value);
  };
  /* retreives an item from the local storage based on the key */


  var getLocalStorage = function getLocalStorage(key) {
    localStorage.getItem(key);
  };
  /* removes an item from the local storage based on the key */


  var deleteLocalStorage = function deleteLocalStorage(key) {
    localStorage.removeItem(key);
  };
});
},{"./storageHelper":"assets/javascript/storageHelper.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52006" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/javascript/app.js"], null)
//# sourceMappingURL=/app.25a60053.map