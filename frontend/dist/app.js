"use strict";
var LinkllyArcade = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            oldElement.props,
            oldElement._owner,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 1;
                  payload._result = moduleObject;
                  var _ioInfo = payload._ioInfo;
                  null != _ioInfo && (_ioInfo.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 2;
                  payload._result = error;
                  var _ioInfo2 = payload._ioInfo;
                  null != _ioInfo2 && (_ioInfo2.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              }
            );
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
              ioInfo.value = thenable;
              var displayName = thenable.displayName;
              "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
          }
          if (1 === payload._status)
            return ioInfo = payload._result, void 0 === ioInfo && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo
            ), "default" in ioInfo || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo
            ), ioInfo.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function releaseAsyncTransition() {
          ReactSharedInternals.asyncTransitions--;
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        };
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        var fnName = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Activity = REACT_ACTIVITY_TYPE;
        exports.Children = fnName;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.cacheSignal = function() {
          return null;
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            props,
            owner,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            validateChildKeys(arguments[key]);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i]);
          i = {};
          var key = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          key && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            key,
            i,
            getOwner(),
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          ctor = { _status: -1, _result: ctor };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
          }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
          };
          ctor._ioInfo = ioInfo;
          lazyType._debugInfo = [{ awaited: ioInfo }];
          return lazyType;
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
              "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
            ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useEffect(create, deps);
        };
        exports.useEffectEvent = function(callback) {
          return resolveDispatcher().useEffectEvent(callback);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.2.5";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
          var children = config.children;
          if (void 0 !== children)
            if (isStaticChildren)
              if (isArrayImpl(children)) {
                for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                  validateChildKeys(children[isStaticChildren]);
                Object.freeze && Object.freeze(children);
              } else
                console.error(
                  "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                );
            else validateChildKeys(children);
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys2 = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys2.length ? "{key: someKey, " + keys2.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys2 = 0 < keys2.length ? "{" + keys2.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys2,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(
            type,
            children,
            maybeKey,
            getOwner(),
            debugStack,
            debugTask
          );
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        React = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
          React,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutKeySpread = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            false,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.jsxs = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            true,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // src/App.tsx
  var App_exports = {};
  __export(App_exports, {
    default: () => App
  });
  var import_react = __toESM(require_react(), 1);

  // src/api.ts
  async function request(baseUrl, path, options = {}) {
    const cleanBaseUrl = baseUrl.trim().replace(/\/$/, "");
    const headers = new Headers(options.headers);
    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (options.token && !options.public) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }
    const response = await fetch(`${cleanBaseUrl}${path}`, {
      ...options,
      headers
    });
    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json") ? await response.json() : await response.text();
    if (!response.ok) {
      const body = data;
      const message = typeof body === "string" ? body : body.message ?? body.error ?? "Request failed";
      throw new Error(message);
    }
    return data;
  }
  var api = {
    register(baseUrl, body) {
      return request(baseUrl, "/register", {
        method: "POST",
        body: JSON.stringify(body),
        public: true
      });
    },
    login(baseUrl, body) {
      return request(baseUrl, "/login", {
        method: "POST",
        body: JSON.stringify(body),
        public: true
      });
    },
    getPublicProfile(baseUrl, username) {
      return request(
        baseUrl,
        `/profile/${encodeURIComponent(username)}`,
        { public: true }
      );
    },
    updateProfile(baseUrl, token, body) {
      return request(baseUrl, "/profile", {
        method: "PATCH",
        token,
        body: JSON.stringify(body)
      });
    },
    resetPassword(baseUrl, token, body) {
      return request(baseUrl, "/reset", {
        method: "PATCH",
        token,
        body: JSON.stringify(body)
      });
    },
    deleteProfile(baseUrl, token) {
      return request(baseUrl, "/delete", {
        method: "DELETE",
        token
      });
    },
    getLinks(baseUrl, token) {
      return request(baseUrl, "/links", { token });
    },
    createLink(baseUrl, token, body) {
      return request(baseUrl, "/links", {
        method: "POST",
        token,
        body: JSON.stringify(body)
      });
    },
    updateLink(baseUrl, token, id, body) {
      return request(baseUrl, `/links/${id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify(body)
      });
    },
    deleteLink(baseUrl, token, id) {
      return request(baseUrl, `/links/${id}`, {
        method: "DELETE",
        token
      });
    },
    trackClick(baseUrl, id) {
      return request(baseUrl, `/links/${id}/click`, {
        method: "POST",
        public: true
      });
    }
  };

  // src/session.ts
  var import_meta = {};
  var keys = {
    token: "linklly_token",
    username: "linklly_username"
  };
  function getSession() {
    return {
      token: localStorage.getItem(keys.token) ?? "",
      username: localStorage.getItem(keys.username) ?? ""
    };
  }
  function saveSession(session) {
    if (session.token !== void 0) localStorage.setItem(keys.token, session.token);
    if (session.username !== void 0) localStorage.setItem(keys.username, session.username);
  }
  function clearSession() {
    localStorage.removeItem(keys.token);
    localStorage.removeItem(keys.username);
  }
  function getApiBaseUrl() {
    return import_meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
  }

  // src/App.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  function getRoute() {
    const path = window.location.pathname.replace(/\/$/, "");
    const parts = path.split("/").filter(Boolean);
    const last = parts.at(-1);
    if (last === "home") return { name: "home" };
    if (last === "settings") return { name: "settings" };
    if (last === "auth") return { name: "auth" };
    if (last === "profile") {
      return {
        name: "profile",
        username: new URLSearchParams(window.location.search).get("username") ?? void 0
      };
    }
    if (parts.includes("profile")) {
      return { name: "profile", username: last };
    }
    return getSession().token ? { name: "home" } : { name: "auth" };
  }
  function navigate(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  function getRouteStatus(route) {
    if (route.name === "auth") {
      return { message: "Ready to sign in", tone: "ready" };
    }
    if (route.name === "home") {
      return { message: "Home dashboard ready", tone: "ready" };
    }
    if (route.name === "settings") {
      return { message: "Settings ready", tone: "ready" };
    }
    if (route.username) {
      return { message: "Public profile ready", tone: "ready" };
    }
    return { message: "Enter a username to view a public profile", tone: "ready" };
  }
  function getFormValues(event) {
    event.preventDefault();
    return Object.fromEntries(new FormData(event.currentTarget).entries());
  }
  function Shell({
    title,
    status,
    actions,
    children,
    compact = false
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: `app-shell ${compact ? "app-shell--centered" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "topbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "brand-lockup", type: "button", onClick: () => navigate("/"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Linklly" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: title })
        ] }) }),
        actions
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "status-strip", "aria-live": "polite", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `status-light status-light--${status.tone}` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status.message })
      ] }),
      children
    ] });
  }
  function AuthPage({
    apiBaseUrl,
    setStatus,
    status,
    refreshSession
  }) {
    const [mode, setMode] = (0, import_react.useState)("login");
    const [loginUsername, setLoginUsername] = (0, import_react.useState)("");
    const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
    const [registerEmail, setRegisterEmail] = (0, import_react.useState)("");
    const [registerUsername, setRegisterUsername] = (0, import_react.useState)("");
    const [registerPassword, setRegisterPassword] = (0, import_react.useState)("");
    const [showLoginPassword, setShowLoginPassword] = (0, import_react.useState)(false);
    const [showRegisterPassword, setShowRegisterPassword] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      if (getSession().token) navigate("/home");
    }, []);
    async function register(event) {
      const values = getFormValues(event);
      try {
        setStatus({ message: "Creating account", tone: "busy" });
        const response = await api.register(apiBaseUrl, values);
        saveSession({ username: values.username });
        refreshSession();
        setLoginUsername(values.username);
        setMode("login");
        setStatus({ message: response.message, tone: "ready" });
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function login(event) {
      const values = getFormValues(event);
      try {
        setStatus({ message: "Signing in", tone: "busy" });
        const response = await api.login(apiBaseUrl, values);
        saveSession({ username: values.username, token: response.token });
        refreshSession();
        setStatus({ message: response.message, tone: "ready" });
        navigate("/home");
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Shell,
      {
        compact: true,
        title: "",
        status,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "auth-layout", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account Access" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tabs", role: "tablist", "aria-label": "Authentication mode", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: mode === "login" ? "active" : "", type: "button", onClick: () => setMode("login"), children: "Login" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: mode === "register" ? "active" : "", type: "button", onClick: () => setMode("register"), children: "Register" })
          ] }),
          mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "form-stack", onSubmit: login, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
              "Username",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  name: "username",
                  autoComplete: "username",
                  value: loginUsername,
                  onChange: (event) => setLoginUsername(event.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
              "Password",
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "password-control", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    name: "password",
                    type: showLoginPassword ? "text" : "password",
                    autoComplete: "current-password",
                    value: loginPassword,
                    onChange: (event) => setLoginPassword(event.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setShowLoginPassword((value) => !value), children: showLoginPassword ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "primary-button", type: "submit", children: "Sign In" })
          ] }, "login-form") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "form-stack", onSubmit: register, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
              "Email",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  name: "email",
                  type: "email",
                  autoComplete: "email",
                  value: registerEmail,
                  onChange: (event) => setRegisterEmail(event.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
              "Username",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  name: "username",
                  autoComplete: "username",
                  value: registerUsername,
                  onChange: (event) => setRegisterUsername(event.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
              "Password",
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "password-control", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    name: "password",
                    type: showRegisterPassword ? "text" : "password",
                    minLength: 8,
                    autoComplete: "new-password",
                    value: registerPassword,
                    onChange: (event) => setRegisterPassword(event.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setShowRegisterPassword((value) => !value), children: showRegisterPassword ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "primary-button", type: "submit", children: "Register" })
          ] }, "register-form")
        ] }) })
      }
    );
  }
  function HomePage({
    apiBaseUrl,
    session,
    setStatus,
    status
  }) {
    const [links, setLinks] = (0, import_react.useState)([]);
    const shareUrl = (0, import_react.useMemo)(
      () => `${window.location.origin}/profile/${encodeURIComponent(session.username)}`,
      [session.username]
    );
    (0, import_react.useEffect)(() => {
      if (!session.token) {
        navigate("/auth");
        return;
      }
      void loadLinks();
    }, [session.token]);
    async function loadLinks() {
      try {
        setStatus({ message: "Loading links", tone: "busy" });
        const response = await api.getLinks(apiBaseUrl, session.token);
        setLinks(response.links);
        setStatus({ message: "Links loaded", tone: "ready" });
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function updateProfile(event) {
      const values = getFormValues(event);
      try {
        setStatus({ message: "Saving profile", tone: "busy" });
        const response = await api.updateProfile(apiBaseUrl, session.token, values);
        setStatus({ message: response.message, tone: "ready" });
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function createLink(event) {
      const form = event.currentTarget;
      const values = getFormValues(event);
      try {
        setStatus({ message: "Adding link", tone: "busy" });
        const response = await api.createLink(apiBaseUrl, session.token, values);
        form.reset();
        setStatus({ message: response.message, tone: "ready" });
        await loadLinks();
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function editLink(link) {
      const title = window.prompt("Title", link.title);
      if (title === null) return;
      const url = window.prompt("URL", link.url);
      if (url === null) return;
      try {
        setStatus({ message: "Updating link", tone: "busy" });
        const response = await api.updateLink(apiBaseUrl, session.token, link.id, { title, url });
        setStatus({ message: response.message, tone: "ready" });
        await loadLinks();
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function deleteLink(id) {
      if (!window.confirm("Remove this link?")) return;
      try {
        setStatus({ message: "Removing link", tone: "busy" });
        const response = await api.deleteLink(apiBaseUrl, session.token, id);
        setStatus({ message: response.message, tone: "ready" });
        await loadLinks();
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function copyShareUrl() {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setStatus({ message: "Profile link copied", tone: "ready" });
      } catch {
        setStatus({ message: "Could not copy profile link", tone: "error" });
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Shell,
      {
        title: session.username ? `User: ${session.username}` : "Home",
        status,
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "top-actions", "aria-label": "Home actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate(`/profile/${encodeURIComponent(session.username)}`), children: "Public" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate("/settings"), children: "Settings" })
        ] }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dashboard-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Update Profile" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "form-stack", onSubmit: updateProfile, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "Name",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "name", placeholder: "Suzanne" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "Bio",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { name: "bio", rows: 5, placeholder: "Building Linklly" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "primary-button", type: "submit", children: "Save" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "share-field", children: [
              "Share page",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "copy-field", type: "button", onClick: copyShareUrl, children: shareUrl })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel links-panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "panel-heading", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Manage Links" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "icon-button", type: "button", onClick: loadLinks, children: "R" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "link-form", onSubmit: createLink, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "Title",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "title", placeholder: "GitHub", required: true })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "URL",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "url", type: "url", placeholder: "https://github.com/swzxnne", required: true })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "primary-button", type: "submit", children: "Add" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "link-list", children: links.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "empty-state", children: "No links yet" }) : links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "link-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: link.title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: link.url, target: "_blank", rel: "noreferrer", children: link.url })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "score", children: link.clickCount }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => editLink(link), children: "Edit" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => deleteLink(link.id), children: "Delete" })
              ] })
            ] }, link.id)) })
          ] })
        ] })
      }
    );
  }
  function SettingsPage({
    apiBaseUrl,
    session,
    setStatus,
    status,
    refreshSession
  }) {
    const [showOldPassword, setShowOldPassword] = (0, import_react.useState)(false);
    const [showNewPassword, setShowNewPassword] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      if (!session.token) navigate("/auth");
    }, [session.token]);
    async function resetPassword(event) {
      const form = event.currentTarget;
      const values = getFormValues(event);
      try {
        setStatus({ message: "Resetting password", tone: "busy" });
        const response = await api.resetPassword(apiBaseUrl, session.token, values);
        form.reset();
        setStatus({ message: response.message, tone: "ready" });
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    async function deleteProfile() {
      if (!window.confirm("Delete your profile permanently?")) return;
      try {
        setStatus({ message: "Deleting profile", tone: "busy" });
        const response = await api.deleteProfile(apiBaseUrl, session.token);
        clearSession();
        refreshSession();
        setStatus({ message: response.message, tone: "ready" });
        navigate("/auth");
      } catch (error) {
        setStatus({ message: error.message, tone: "error" });
      }
    }
    function logout() {
      clearSession();
      refreshSession();
      navigate("/auth");
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Shell,
      {
        title: "Settings",
        status,
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: "top-actions", "aria-label": "Settings actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate("/home"), children: "Home" }) }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "settings-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Password" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "form-stack", onSubmit: resetPassword, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "Old password",
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "password-control", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      name: "oldPassword",
                      type: showOldPassword ? "text" : "password",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setShowOldPassword((value) => !value), children: showOldPassword ? "Hide" : "Show" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
                "New password",
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "password-control", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      name: "newPassword",
                      type: showNewPassword ? "text" : "password",
                      minLength: 8,
                      required: true
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setShowNewPassword((value) => !value), children: showNewPassword ? "Hide" : "Show" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "danger-button", type: "submit", children: "Reset" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Danger Zone" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "secondary-button full-width", type: "button", onClick: logout, children: "Logout" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "danger-button full-width", type: "button", onClick: deleteProfile, children: "Delete Profile" })
          ] })
        ] })
      }
    );
  }
  function PublicProfilePage({
    apiBaseUrl,
    routeUsername,
    session,
    status,
    setStatus
  }) {
    const [username, setUsername] = (0, import_react.useState)(routeUsername ?? "");
    const [profile, setProfile] = (0, import_react.useState)(null);
    (0, import_react.useEffect)(() => {
      if (routeUsername) void loadProfile(routeUsername);
    }, [routeUsername]);
    async function loadProfile(target = username) {
      if (!target.trim()) {
        setStatus({ message: "Enter a username to view a public profile", tone: "ready" });
        return;
      }
      try {
        setStatus({ message: "Loading public profile", tone: "busy" });
        const response = await api.getPublicProfile(apiBaseUrl, target.trim());
        setProfile(response.data);
        setUsername(response.data.username);
        window.history.replaceState({}, "", `/profile/${encodeURIComponent(response.data.username)}`);
        setStatus({ message: "Public profile loaded", tone: "ready" });
      } catch (error) {
        setProfile(null);
        setStatus({ message: error.message, tone: "error" });
      }
    }
    function openLink(link) {
      void api.trackClick(apiBaseUrl, link.id);
    }
    const displayName = profile?.profile?.name || profile?.username || "No profile loaded";
    const bio = profile?.profile?.bio || (profile ? "This user has not added a bio yet." : "Shared links will appear here.");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Shell,
      {
        title: "Public Profile",
        status,
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "top-actions", "aria-label": "Public profile navigation", children: [
          session.token ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate("/settings"), children: "Settings" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate("/auth"), children: "Login" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => navigate("/home"), children: "Home" })
        ] }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "public-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Profile" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "public-card", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: displayName }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: bio })
            ] }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "panel", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "panel-heading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Links" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "public-links", children: !profile || profile.links.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "empty-state", children: profile ? "No links shared yet" : "No profile loaded" }) : profile.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { className: "public-link", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: link.url, target: "_blank", rel: "noreferrer", onClick: () => openLink(link), children: link.title || link.url }) }, link.id)) })
          ] })
        ] })
      }
    );
  }
  function App() {
    const [route, setRoute] = (0, import_react.useState)(getRoute);
    const [session, setSession] = (0, import_react.useState)(getSession);
    const apiBaseUrl = getApiBaseUrl();
    const [status, setStatus] = (0, import_react.useState)(() => getRouteStatus(getRoute()));
    (0, import_react.useEffect)(() => {
      const onRouteChange = () => setRoute(getRoute());
      window.addEventListener("popstate", onRouteChange);
      return () => window.removeEventListener("popstate", onRouteChange);
    }, []);
    (0, import_react.useEffect)(() => {
      setStatus(getRouteStatus(route));
    }, [route.name, route.name === "profile" ? route.username : void 0]);
    function refreshSession() {
      setSession(getSession());
    }
    if (route.name === "home") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        HomePage,
        {
          apiBaseUrl,
          session,
          status,
          setStatus
        }
      );
    }
    if (route.name === "settings") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        SettingsPage,
        {
          apiBaseUrl,
          session,
          status,
          setStatus,
          refreshSession
        }
      );
    }
    if (route.name === "profile") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        PublicProfilePage,
        {
          apiBaseUrl,
          routeUsername: route.username,
          session,
          status,
          setStatus
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      AuthPage,
      {
        apiBaseUrl,
        status,
        setStatus,
        refreshSession
      }
    );
  }
  return __toCommonJS(App_exports);
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=app.js.map
