import {
  _objectWithoutPropertiesLoose,
  ownerWindow,
  useEventCallback_default,
  useLazyRef,
  useOnMount,
  useThemeProps
} from "./chunk-BPKUEUDS.js";
import {
  _extends,
  require_jsx_runtime,
  require_prop_types,
  useEnhancedEffect_default,
  useId
} from "./chunk-3RQXYIJS.js";
import {
  require_react
} from "./chunk-GH6UE3LJ.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is2(x2, y2) {
        return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React23.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState3({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect12(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React23 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is2, useState3 = React23.useState, useEffect12 = React23.useEffect, useLayoutEffect = React23.useLayoutEffect, useDebugValue = React23.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React23.useSyncExternalStore ? React23.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    (function() {
      function is2(x2, y2) {
        return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React23 = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is2, useSyncExternalStore2 = shim.useSyncExternalStore, useRef10 = React23.useRef, useEffect12 = React23.useEffect, useMemo4 = React23.useMemo, useDebugValue = React23.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef10(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo4(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore2(subscribe, instRef[0], instRef[1]);
        useEffect12(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/bezier-easing/src/index.js
var require_src = __commonJS({
  "node_modules/bezier-easing/src/index.js"(exports, module) {
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 1e-3;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A2(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B2(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C2(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A2(aA1, aA2) * aT + B2(aA1, aA2)) * aT + C2(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A2(aA1, aA2) * aT * aT + 2 * B2(aA1, aA2) * aT + C2(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function LinearEasing(x2) {
      return x2;
    }
    module.exports = function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
      }
      var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function BezierEasing2(x2) {
        if (x2 === 0) {
          return 0;
        }
        if (x2 === 1) {
          return 1;
        }
        return calcBezier(getTForX(x2), mY1, mY2);
      };
    };
  }
});

// node_modules/reselect/dist/reselect.mjs
var runIdentityFunctionCheck = (resultFunc, inputSelectorsResults, outputSelectorResult) => {
  if (inputSelectorsResults.length === 1 && inputSelectorsResults[0] === outputSelectorResult) {
    let isInputSameAsOutput = false;
    try {
      const emptyObject = {};
      if (resultFunc(emptyObject) === emptyObject)
        isInputSameAsOutput = true;
    } catch {
    }
    if (isInputSameAsOutput) {
      let stack = void 0;
      try {
        throw new Error();
      } catch (e) {
        ;
        ({ stack } = e);
      }
      console.warn(
        "The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",
        { stack }
      );
    }
  }
};
var runInputStabilityCheck = (inputSelectorResultsObject, options, inputSelectorArgs) => {
  const { memoize, memoizeOptions } = options;
  const { inputSelectorResults, inputSelectorResultsCopy } = inputSelectorResultsObject;
  const createAnEmptyObject = memoize(() => ({}), ...memoizeOptions);
  const areInputSelectorResultsEqual = createAnEmptyObject.apply(null, inputSelectorResults) === createAnEmptyObject.apply(null, inputSelectorResultsCopy);
  if (!areInputSelectorResultsEqual) {
    let stack = void 0;
    try {
      throw new Error();
    } catch (e) {
      ;
      ({ stack } = e);
    }
    console.warn(
      "An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",
      {
        arguments: inputSelectorArgs,
        firstInputs: inputSelectorResults,
        secondInputs: inputSelectorResultsCopy,
        stack
      }
    );
  }
};
var globalDevModeChecks = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
var NOT_FOUND = Symbol("NOT_FOUND");
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
  if (typeof object !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array2, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array2.every((item) => typeof item === "function")) {
    const itemTypes = array2.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
var getDevModeChecksExecutionInfo = (firstRun, devModeChecks) => {
  const { identityFunctionCheck, inputStabilityCheck } = {
    ...globalDevModeChecks,
    ...devModeChecks
  };
  return {
    identityFunctionCheck: {
      shouldRun: identityFunctionCheck === "always" || identityFunctionCheck === "once" && firstRun,
      run: runIdentityFunctionCheck
    },
    inputStabilityCheck: {
      shouldRun: inputStabilityCheck === "always" || inputStabilityCheck === "once" && firstRun,
      run: runInputStabilityCheck
    }
  };
};
var REDUX_PROXY_LABEL = Symbol();
var proto = Object.getPrototypeOf({});
function createSingletonCache(equals) {
  let entry;
  return {
    get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put(key, value) {
      entry = { key, value };
    },
    getEntries() {
      return entry ? [entry] : [];
    },
    clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  let entries = [];
  function get(key) {
    const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return { get, put, getEntries, clear };
}
var referenceEqualityCheck = (a2, b) => a2 === b;
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    const { length } = prev;
    for (let i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  };
}
function lruMemoize(func, equalityCheckOrOptions) {
  const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
  const {
    equalityCheck = referenceEqualityCheck,
    maxSize = 1,
    resultEqualityCheck
  } = providedOptions;
  const comparator = createCacheKeyComparator(equalityCheck);
  let resultsCount = 0;
  const cache = maxSize <= 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    let value = cache.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const entries = cache.getEntries();
        const matchingEntry = entries.find(
          (entry) => resultEqualityCheck(entry.value, value)
        );
        if (matchingEntry) {
          value = matchingEntry.value;
          resultsCount !== 0 && resultsCount--;
        }
      }
      cache.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = () => {
    cache.clear();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult;
  let resultsCount = 0;
  function memoized() {
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l = length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = lastResult?.deref?.() ?? lastResult;
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult = needsWeakRef ? new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector22 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = [],
      devModeChecks = {}
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    let firstRun = true;
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
      if (true) {
        const { identityFunctionCheck, inputStabilityCheck } = getDevModeChecksExecutionInfo(firstRun, devModeChecks);
        if (identityFunctionCheck.shouldRun) {
          identityFunctionCheck.run(
            resultFunc,
            inputSelectorResults,
            lastResult
          );
        }
        if (inputStabilityCheck.shouldRun) {
          const inputSelectorResultsCopy = collectInputSelectorResults(
            dependencies,
            arguments
          );
          inputStabilityCheck.run(
            { inputSelectorResults, inputSelectorResultsCopy },
            { memoize, memoizeOptions: finalMemoizeOptions },
            arguments
          );
        }
        if (firstRun)
          firstRun = false;
      }
      return lastResult;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize,
      argsMemoize
    });
  };
  Object.assign(createSelector22, {
    withTypes: () => createSelector22
  });
  return createSelector22;
}
var createSelector = createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index2) => {
          composition[inputSelectorKeys[index2]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);

// node_modules/@mui/x-internals/esm/store/createSelector.js
var reselectCreateSelector = createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: {
    maxSize: 1,
    equalityCheck: Object.is
  }
});
var createSelector2 = (a2, b, c, d, e, f, g, h, ...other) => {
  if (other.length > 0) {
    throw new Error("Unsupported number of selectors");
  }
  let selector;
  if (a2 && b && c && d && e && f && g && h) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      const vc = c(state, a1, a22, a3);
      const vd = d(state, a1, a22, a3);
      const ve = e(state, a1, a22, a3);
      const vf = f(state, a1, a22, a3);
      const vg = g(state, a1, a22, a3);
      return h(va, vb, vc, vd, ve, vf, vg, a1, a22, a3);
    };
  } else if (a2 && b && c && d && e && f && g) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      const vc = c(state, a1, a22, a3);
      const vd = d(state, a1, a22, a3);
      const ve = e(state, a1, a22, a3);
      const vf = f(state, a1, a22, a3);
      return g(va, vb, vc, vd, ve, vf, a1, a22, a3);
    };
  } else if (a2 && b && c && d && e && f) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      const vc = c(state, a1, a22, a3);
      const vd = d(state, a1, a22, a3);
      const ve = e(state, a1, a22, a3);
      return f(va, vb, vc, vd, ve, a1, a22, a3);
    };
  } else if (a2 && b && c && d && e) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      const vc = c(state, a1, a22, a3);
      const vd = d(state, a1, a22, a3);
      return e(va, vb, vc, vd, a1, a22, a3);
    };
  } else if (a2 && b && c && d) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      const vc = c(state, a1, a22, a3);
      return d(va, vb, vc, a1, a22, a3);
    };
  } else if (a2 && b && c) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      const vb = b(state, a1, a22, a3);
      return c(va, vb, a1, a22, a3);
    };
  } else if (a2 && b) {
    selector = (state, a1, a22, a3) => {
      const va = a2(state, a1, a22, a3);
      return b(va, a1, a22, a3);
    };
  } else if (a2) {
    selector = a2;
  } else {
    throw new Error("Missing arguments");
  }
  return selector;
};
var createSelectorMemoizedWithOptions = (options) => (...inputs) => {
  const cache = /* @__PURE__ */ new WeakMap();
  let nextCacheId = 1;
  const combiner = inputs[inputs.length - 1];
  const nSelectors = inputs.length - 1 || 1;
  const argsLength = Math.max(combiner.length - nSelectors, 0);
  if (argsLength > 3) {
    throw new Error("Unsupported number of arguments");
  }
  const selector = (state, a1, a2, a3) => {
    let cacheKey = state.__cacheKey__;
    if (!cacheKey) {
      cacheKey = {
        id: nextCacheId
      };
      state.__cacheKey__ = cacheKey;
      nextCacheId += 1;
    }
    let fn = cache.get(cacheKey);
    if (!fn) {
      const selectors = inputs.length === 1 ? [(x2) => x2, combiner] : inputs;
      let reselectArgs = inputs;
      const selectorArgs = [void 0, void 0, void 0];
      switch (argsLength) {
        case 0:
          break;
        case 1: {
          reselectArgs = [...selectors.slice(0, -1), () => selectorArgs[0], combiner];
          break;
        }
        case 2: {
          reselectArgs = [...selectors.slice(0, -1), () => selectorArgs[0], () => selectorArgs[1], combiner];
          break;
        }
        case 3: {
          reselectArgs = [...selectors.slice(0, -1), () => selectorArgs[0], () => selectorArgs[1], () => selectorArgs[2], combiner];
          break;
        }
        default:
          throw new Error("Unsupported number of arguments");
      }
      if (options) {
        reselectArgs = [...reselectArgs, options];
      }
      fn = reselectCreateSelector(...reselectArgs);
      fn.selectorArgs = selectorArgs;
      cache.set(cacheKey, fn);
    }
    switch (argsLength) {
      case 3:
        fn.selectorArgs[2] = a3;
      case 2:
        fn.selectorArgs[1] = a2;
      case 1:
        fn.selectorArgs[0] = a1;
      case 0:
      default:
    }
    switch (argsLength) {
      case 0:
        return fn(state);
      case 1:
        return fn(state, a1);
      case 2:
        return fn(state, a1, a2);
      case 3:
        return fn(state, a1, a2, a3);
      default:
        throw new Error("unreachable");
    }
  };
  return selector;
};
var createSelectorMemoized = createSelectorMemoizedWithOptions();

// node_modules/@mui/x-internals/esm/store/useStore.js
var React2 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);

// node_modules/@mui/x-internals/esm/reactMajor/index.js
var React = __toESM(require_react(), 1);
var reactMajor_default = parseInt(React.version, 10);

// node_modules/@mui/x-internals/esm/store/useStore.js
var canUseRawUseSyncExternalStore = reactMajor_default >= 19;
var useStoreImplementation = canUseRawUseSyncExternalStore ? useStoreR19 : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
  return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
  const getSelection = React2.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [store, selector, a1, a2, a3]);
  return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
function useStoreLegacy(store, selector, a1, a2, a3) {
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a2, a3));
}

// node_modules/@mui/x-internals/esm/store/useStoreEffect.js
var noop = () => {
};
function useStoreEffect(store, selector, effect) {
  const instance = useLazyRef(initialize, {
    store,
    selector
  }).current;
  instance.effect = effect;
  useOnMount(instance.onMount);
}
function initialize(params) {
  const {
    store,
    selector
  } = params;
  let previousState = selector(store.state);
  const instance = {
    effect: noop,
    dispose: null,
    // We want a single subscription done right away and cleared on unmount only,
    // but React triggers `useOnMount` multiple times in dev, so we need to manage
    // the subscription anyway.
    subscribe: () => {
      instance.dispose ??= store.subscribe((state) => {
        const nextState = selector(state);
        if (!Object.is(previousState, nextState)) {
          const prev = previousState;
          previousState = nextState;
          instance.effect(prev, nextState);
        }
      });
    },
    onMount: () => {
      instance.subscribe();
      return () => {
        instance.dispose?.();
        instance.dispose = null;
      };
    }
  };
  instance.subscribe();
  return instance;
}

// node_modules/@mui/x-internals/esm/store/Store.js
var Store = class _Store {
  // HACK: `any` fixes adding listeners that accept partial state.
  // Internal state to handle recursive `setState()` calls
  static create(state) {
    return new _Store(state);
  }
  constructor(state) {
    this.state = state;
    this.listeners = /* @__PURE__ */ new Set();
    this.updateTick = 0;
  }
  subscribe = (fn) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };
  getSnapshot = () => {
    return this.state;
  };
  setState(newState) {
    this.state = newState;
    this.updateTick += 1;
    const currentTick = this.updateTick;
    const it = this.listeners.values();
    let result;
    while (result = it.next(), !result.done) {
      if (currentTick !== this.updateTick) {
        return;
      }
      const listener = result.value;
      listener(newState);
    }
  }
  update(changes) {
    for (const key in changes) {
      if (!Object.is(this.state[key], changes[key])) {
        this.setState(_extends({}, this.state, changes));
        return;
      }
    }
  }
  set(key, value) {
    if (!Object.is(this.state[key], value)) {
      this.setState(_extends({}, this.state, {
        [key]: value
      }));
    }
  }
  use = /* @__PURE__ */ (() => (selector, a1, a2, a3) => {
    return useStore(this, selector, a1, a2, a3);
  })();
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxisLayout.selectors.js
var selectorChartRawXAxis = (state) => state.cartesianAxis?.x;
var selectorChartRawYAxis = (state) => state.cartesianAxis?.y;

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartAxisSize.selectors.js
var selectorChartLeftAxisSize = createSelector2(selectorChartRawYAxis, function selectorChartLeftAxisSize2(yAxis) {
  return (yAxis ?? []).reduce((acc, axis) => axis.position === "left" ? acc + (axis.width || 0) + (axis.zoom?.slider.enabled ? axis.zoom.slider.size : 0) : acc, 0);
});
var selectorChartRightAxisSize = createSelector2(selectorChartRawYAxis, function selectorChartRightAxisSize2(yAxis) {
  return (yAxis ?? []).reduce((acc, axis) => axis.position === "right" ? acc + (axis.width || 0) + (axis.zoom?.slider.enabled ? axis.zoom.slider.size : 0) : acc, 0);
});
var selectorChartTopAxisSize = createSelector2(selectorChartRawXAxis, function selectorChartTopAxisSize2(xAxis) {
  return (xAxis ?? []).reduce((acc, axis) => axis.position === "top" ? acc + (axis.height || 0) + (axis.zoom?.slider.enabled ? axis.zoom.slider.size : 0) : acc, 0);
});
var selectorChartBottomAxisSize = createSelector2(selectorChartRawXAxis, function selectorChartBottomAxisSize2(xAxis) {
  return (xAxis ?? []).reduce((acc, axis) => axis.position === "bottom" ? acc + (axis.height || 0) + (axis.zoom?.slider.enabled ? axis.zoom.slider.size : 0) : acc, 0);
});
var selectorChartAxisSizes = createSelectorMemoized(selectorChartLeftAxisSize, selectorChartRightAxisSize, selectorChartTopAxisSize, selectorChartBottomAxisSize, function selectorChartAxisSizes2(left, right, top, bottom) {
  return {
    left,
    right,
    top,
    bottom
  };
});

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.selectors.js
var selectorChartDimensionsState = (state) => state.dimensions;
var selectorChartMargin = (state) => state.dimensions.margin;
var selectorChartDrawingArea = createSelectorMemoized(selectorChartDimensionsState, selectorChartMargin, selectorChartAxisSizes, function selectorChartDrawingArea2({
  width,
  height
}, {
  top: marginTop,
  right: marginRight,
  bottom: marginBottom,
  left: marginLeft
}, {
  left: axisSizeLeft,
  right: axisSizeRight,
  top: axisSizeTop,
  bottom: axisSizeBottom
}) {
  return {
    width: width - marginLeft - marginRight - axisSizeLeft - axisSizeRight,
    left: marginLeft + axisSizeLeft,
    right: marginRight + axisSizeRight,
    height: height - marginTop - marginBottom - axisSizeTop - axisSizeBottom,
    top: marginTop + axisSizeTop,
    bottom: marginBottom + axisSizeBottom
  };
});
var selectorChartSvgWidth = createSelector2(selectorChartDimensionsState, (dimensionsState) => dimensionsState.width);
var selectorChartSvgHeight = createSelector2(selectorChartDimensionsState, (dimensionsState) => dimensionsState.height);
var selectorChartPropsWidth = createSelector2(selectorChartDimensionsState, (dimensionsState) => dimensionsState.propsWidth);
var selectorChartPropsHeight = createSelector2(selectorChartDimensionsState, (dimensionsState) => dimensionsState.propsHeight);

// node_modules/@mui/x-charts/esm/internals/store/useSelector.js
var useSelector = useStore;

// node_modules/@mui/x-charts/esm/internals/defaultizeMargin.js
function defaultizeMargin(input, defaultMargin) {
  if (typeof input === "number") {
    return {
      top: input,
      bottom: input,
      left: input,
      right: input
    };
  }
  if (defaultMargin) {
    return _extends({}, defaultMargin, input);
  }
  return input;
}

// node_modules/@mui/x-internals/esm/warning/warning.js
var warnedOnceCache = /* @__PURE__ */ new Set();
function warnOnce(message, gravity = "warning") {
  if (false) {
    return;
  }
  const cleanMessage = Array.isArray(message) ? message.join("\n") : message;
  if (!warnedOnceCache.has(cleanMessage)) {
    warnedOnceCache.add(cleanMessage);
    if (gravity === "error") {
      console.error(cleanMessage);
    } else {
      console.warn(cleanMessage);
    }
  }
}

// node_modules/@mui/x-charts/esm/internals/scaleGuards.js
function isOrdinalScale(scale) {
  return scale.bandwidth !== void 0;
}
function isBandScale(scale) {
  return isOrdinalScale(scale) && scale.paddingOuter !== void 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.js
var React4 = __toESM(require_react(), 1);

// node_modules/@mui/x-internals/esm/useEffectAfterFirstRender/useEffectAfterFirstRender.js
var React3 = __toESM(require_react(), 1);
function useEffectAfterFirstRender(effect, deps) {
  const isFirstRender = React3.useRef(true);
  React3.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return void 0;
    }
    return effect();
  }, deps);
}

// node_modules/@mui/x-charts/esm/constants/index.js
var DEFAULT_X_AXIS_KEY = "DEFAULT_X_AXIS_KEY";
var DEFAULT_Y_AXIS_KEY = "DEFAULT_Y_AXIS_KEY";
var DEFAULT_ROTATION_AXIS_KEY = "DEFAULT_ROTATION_AXIS_KEY";
var DEFAULT_RADIUS_AXIS_KEY = "DEFAULT_RADIUS_AXIS_KEY";
var DEFAULT_MARGINS = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};
var DEFAULT_AXIS_SIZE_WIDTH = 45;
var DEFAULT_AXIS_SIZE_HEIGHT = 25;
var AXIS_LABEL_DEFAULT_HEIGHT = 20;

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.js
var MAX_COMPUTE_RUN = 10;
var useChartDimensions = ({
  params,
  store,
  svgRef
}) => {
  const hasInSize = params.width !== void 0 && params.height !== void 0;
  const stateRef = React4.useRef({
    displayError: false,
    initialCompute: true,
    computeRun: 0
  });
  const [innerWidth, setInnerWidth] = React4.useState(0);
  const [innerHeight, setInnerHeight] = React4.useState(0);
  const computeSize = React4.useCallback(() => {
    const mainEl = svgRef?.current;
    if (!mainEl) {
      return {};
    }
    const win = ownerWindow(mainEl);
    const computedStyle = win.getComputedStyle(mainEl);
    const newHeight = Math.floor(parseFloat(computedStyle.height)) || 0;
    const newWidth = Math.floor(parseFloat(computedStyle.width)) || 0;
    if (store.state.dimensions.width !== newWidth || store.state.dimensions.height !== newHeight) {
      store.set("dimensions", {
        margin: {
          top: params.margin.top,
          right: params.margin.right,
          bottom: params.margin.bottom,
          left: params.margin.left
        },
        width: params.width ?? newWidth,
        height: params.height ?? newHeight,
        propsWidth: params.width,
        propsHeight: params.height
      });
    }
    return {
      height: newHeight,
      width: newWidth
    };
  }, [
    store,
    svgRef,
    params.height,
    params.width,
    // Margin is an object, so we need to include all the properties to prevent infinite loops.
    params.margin.left,
    params.margin.right,
    params.margin.top,
    params.margin.bottom
  ]);
  useEffectAfterFirstRender(() => {
    const width = params.width ?? store.state.dimensions.width;
    const height = params.height ?? store.state.dimensions.height;
    store.set("dimensions", {
      margin: {
        top: params.margin.top,
        right: params.margin.right,
        bottom: params.margin.bottom,
        left: params.margin.left
      },
      width,
      height,
      propsHeight: params.height,
      propsWidth: params.width
    });
  }, [
    store,
    params.height,
    params.width,
    // Margin is an object, so we need to include all the properties to prevent infinite loops.
    params.margin.left,
    params.margin.right,
    params.margin.top,
    params.margin.bottom
  ]);
  React4.useEffect(() => {
    stateRef.current.displayError = true;
  }, []);
  useEnhancedEffect_default(() => {
    if (hasInSize || !stateRef.current.initialCompute || stateRef.current.computeRun > MAX_COMPUTE_RUN) {
      return;
    }
    const computedSize = computeSize();
    if (computedSize.width !== innerWidth || computedSize.height !== innerHeight) {
      stateRef.current.computeRun += 1;
      if (computedSize.width !== void 0) {
        setInnerWidth(computedSize.width);
      }
      if (computedSize.height !== void 0) {
        setInnerHeight(computedSize.height);
      }
    } else if (stateRef.current.initialCompute) {
      stateRef.current.initialCompute = false;
    }
  }, [innerHeight, innerWidth, computeSize, hasInSize]);
  useEnhancedEffect_default(() => {
    if (hasInSize) {
      return () => {
      };
    }
    computeSize();
    const elementToObserve = svgRef.current;
    if (typeof ResizeObserver === "undefined") {
      return () => {
      };
    }
    let animationFrame;
    const observer = new ResizeObserver(() => {
      animationFrame = requestAnimationFrame(() => {
        computeSize();
      });
    });
    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [computeSize, hasInSize, svgRef]);
  if (true) {
    if (stateRef.current.displayError && params.width === void 0 && innerWidth === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`width\` prop, and its container has no \`width\` defined.`);
      stateRef.current.displayError = false;
    }
    if (stateRef.current.displayError && params.height === void 0 && innerHeight === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`height\` prop, and its container has no \`height\` defined.`);
      stateRef.current.displayError = false;
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const isXInside = React4.useCallback((x2) => x2 >= drawingArea.left - 1 && x2 <= drawingArea.left + drawingArea.width, [drawingArea.left, drawingArea.width]);
  const isYInside = React4.useCallback((y2) => y2 >= drawingArea.top - 1 && y2 <= drawingArea.top + drawingArea.height, [drawingArea.height, drawingArea.top]);
  const isPointInside = React4.useCallback((x2, y2, targetElement) => {
    if (targetElement && "closest" in targetElement && targetElement.closest("[data-drawing-container]")) {
      return true;
    }
    return isXInside(x2) && isYInside(y2);
  }, [isXInside, isYInside]);
  return {
    instance: {
      isPointInside,
      isXInside,
      isYInside
    }
  };
};
useChartDimensions.params = {
  width: true,
  height: true,
  margin: true
};
useChartDimensions.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  margin: defaultizeMargin(params.margin, DEFAULT_MARGINS)
});
useChartDimensions.getInitialState = ({
  width,
  height,
  margin
}) => {
  return {
    dimensions: {
      margin,
      width: width ?? 0,
      height: height ?? 0,
      propsWidth: width,
      propsHeight: height
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.js
var React5 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/colorPalettes/categorical/rainbowSurge.js
var rainbowSurgePaletteLight = ["#4254FB", "#FFB422", "#FA4F58", "#0DBEFF", "#22BF75", "#FA83B4", "#FF7511"];
var rainbowSurgePaletteDark = ["#495AFB", "#FFC758", "#F35865", "#30C8FF", "#44CE8D", "#F286B3", "#FF8C39"];
var rainbowSurgePalette = (mode2) => mode2 === "dark" ? rainbowSurgePaletteDark : rainbowSurgePaletteLight;

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/processSeries.js
var defaultizeSeries = ({
  series,
  colors,
  seriesConfig
}) => {
  const seriesGroups = {};
  series.forEach((seriesData, seriesIndex) => {
    const seriesWithDefaultValues = seriesConfig[seriesData.type].getSeriesWithDefaultValues(seriesData, seriesIndex, colors);
    const id = seriesWithDefaultValues.id;
    if (seriesGroups[seriesData.type] === void 0) {
      seriesGroups[seriesData.type] = {
        series: {},
        seriesOrder: []
      };
    }
    if (seriesGroups[seriesData.type]?.series[id] !== void 0) {
      throw new Error(`MUI X Charts: series' id "${id}" is not unique.`);
    }
    seriesGroups[seriesData.type].series[id] = seriesWithDefaultValues;
    seriesGroups[seriesData.type].seriesOrder.push(id);
  });
  return seriesGroups;
};
var applySeriesProcessors = (defaultizedSeries, seriesConfig, dataset) => {
  const processedSeries = {};
  Object.keys(seriesConfig).forEach((type) => {
    const group2 = defaultizedSeries[type];
    if (group2 !== void 0) {
      processedSeries[type] = seriesConfig[type]?.seriesProcessor?.(group2, dataset) ?? group2;
    }
  });
  return processedSeries;
};
var applySeriesLayout = (processedSeries, seriesConfig, drawingArea) => {
  let processingDetected = false;
  const seriesLayout = {};
  Object.keys(processedSeries).forEach((type) => {
    const processor = seriesConfig[type]?.seriesLayout;
    const thisSeries = processedSeries[type];
    if (processor !== void 0 && thisSeries !== void 0) {
      const newValue = processor(thisSeries, drawingArea);
      if (newValue && newValue !== processedSeries[type]) {
        processingDetected = true;
        seriesLayout[type] = newValue;
      }
    }
  });
  if (!processingDetected) {
    return {};
  }
  return seriesLayout;
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.js
var useChartSeries = ({
  params,
  store,
  seriesConfig
}) => {
  const {
    series,
    dataset,
    theme,
    colors
  } = params;
  const isFirstRender = React5.useRef(true);
  React5.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.set("series", _extends({}, store.state.series, {
      defaultizedSeries: defaultizeSeries({
        series,
        colors: typeof colors === "function" ? colors(theme) : colors,
        seriesConfig
      }),
      dataset
    }));
  }, [colors, dataset, series, theme, seriesConfig, store]);
  return {};
};
useChartSeries.params = {
  dataset: true,
  series: true,
  colors: true,
  theme: true
};
var EMPTY_ARRAY = [];
useChartSeries.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  series: params.series?.length ? params.series : EMPTY_ARRAY,
  colors: params.colors ?? rainbowSurgePalette,
  theme: params.theme ?? "light"
});
useChartSeries.getInitialState = ({
  series = [],
  colors,
  theme,
  dataset
}, _, seriesConfig) => {
  return {
    series: {
      seriesConfig,
      defaultizedSeries: defaultizeSeries({
        series,
        colors: typeof colors === "function" ? colors(theme) : colors,
        seriesConfig
      }),
      dataset
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.selectors.js
var selectorChartSeriesState = (state) => state.series;
var selectorChartDefaultizedSeries = createSelector2(selectorChartSeriesState, (seriesState) => seriesState.defaultizedSeries);
var selectorChartSeriesConfig = createSelector2(selectorChartSeriesState, (seriesState) => seriesState.seriesConfig);
var selectorChartDataset = createSelector2(selectorChartSeriesState, (seriesState) => seriesState.dataset);
var selectorChartSeriesProcessed = createSelectorMemoized(selectorChartDefaultizedSeries, selectorChartSeriesConfig, selectorChartDataset, function selectorChartSeriesProcessed2(defaultizedSeries, seriesConfig, dataset) {
  return applySeriesProcessors(defaultizedSeries, seriesConfig, dataset);
});
var selectorChartSeriesLayout = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartDrawingArea, function selectorChartSeriesLayout2(processedSeries, seriesConfig, drawingArea) {
  return applySeriesLayout(processedSeries, seriesConfig, drawingArea);
});

// node_modules/@mui/x-charts/esm/internals/defaultValueFormatters.js
function createScalarFormatter(tickNumber, zoomScale) {
  return function defaultScalarValueFormatter(value, context) {
    if (context.location === "tick") {
      const domain = context.scale.domain();
      const zeroSizeDomain = domain[0] === domain[1];
      if (zeroSizeDomain) {
        return context.scale.tickFormat(1)(value);
      }
      return context.scale.tickFormat(tickNumber)(value);
    }
    if (context.location === "zoom-slider-tooltip") {
      return zoomScale.tickFormat(2)(value);
    }
    return `${value}`;
  };
}

// node_modules/@mui/x-charts/esm/models/axis.js
function isBandScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "band";
}
function isPointScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "point";
}
function isContinuousScaleConfig(scaleConfig) {
  return scaleConfig.scaleType !== "point" && scaleConfig.scaleType !== "band";
}
function isSymlogScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "symlog";
}

// node_modules/d3-array/src/ascending.js
function ascending(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-array/src/descending.js
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
    delta = (d, x2) => f(d) - x2;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}

// node_modules/d3-array/src/number.js
function number(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/blur.js
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur3) {
  return function(data, rx, ry = rx) {
    if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
    if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
    let { data: values, width, height } = data;
    if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
    if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0)) throw new RangeError("invalid height");
    if (!width || !height || !rx && !ry) return data;
    const blurx = rx && blur3(rx);
    const blury = ry && blur3(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}
function blurh(blur3, T, S, w, h) {
  for (let y2 = 0, n = w * h; y2 < n; ) {
    blur3(T, S, y2, y2 += w, 1);
  }
}
function blurv(blur3, T, S, w, h) {
  for (let x2 = 0, n = w * h; x2 < w; ++x2) {
    blur3(T, S, x2, x2 + n, w);
  }
}
function blurfImage(radius) {
  const blur3 = blurf(radius);
  return (T, S, start, stop, step) => {
    start <<= 2, stop <<= 2, step <<= 2;
    blur3(T, S, start + 0, stop + 0, step);
    blur3(T, S, start + 1, stop + 1, step);
    blur3(T, S, start + 2, stop + 2, step);
    blur3(T, S, start + 3, stop + 3, step);
  };
}
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius) return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    if (!((stop -= step) >= start)) return;
    let sum3 = radius0 * S[start];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start, j = start + s0; i < j; i += step) {
      sum3 += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum3 += S[Math.min(stop, i + s0)];
      T[i] = (sum3 + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum3 -= S[Math.max(start, i - s0)];
    }
  };
}
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    if (!((stop -= step) >= start)) return;
    let sum3 = radius * S[start];
    const s2 = step * radius;
    for (let i = start, j = start + s2; i < j; i += step) {
      sum3 += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum3 += S[Math.min(stop, i + s2)];
      T[i] = sum3 / w;
      sum3 -= S[Math.max(start, i - s2)];
    }
  };
}

// node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start, stop, count2) {
  const step = (stop - start) / Math.max(0, count2), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count2 && count2 < 2) return tickSpec(start, stop, count2 * 2);
  return [i1, i2, inc];
}
function ticks(start, stop, count2) {
  stop = +stop, start = +start, count2 = +count2;
  if (!(count2 > 0)) return [];
  if (start === stop) return [start];
  const reverse2 = stop < start, [i1, i2, inc] = reverse2 ? tickSpec(stop, start, count2) : tickSpec(start, stop, count2);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse2) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start, stop, count2) {
  stop = +stop, start = +start, count2 = +count2;
  return tickSpec(start, stop, count2)[2];
}
function tickStep(start, stop, count2) {
  stop = +stop, start = +start, count2 = +count2;
  const reverse2 = stop < start, inc = reverse2 ? tickIncrement(stop, start, count2) : tickIncrement(start, stop, count2);
  return (reverse2 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-array/src/range.js
function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start + i * step;
  }
  return range2;
}

// node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array2, i0 = 0, i1 = array2.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array2[m + i0];
      array2[m + i0] = array2[i + i0];
      array2[i + i0] = t;
    }
    return array2;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index2 = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    let i = index2.get(d);
    if (i === void 0) {
      if (unknown !== implicit) return unknown;
      index2.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index2 = new InternMap();
    for (const value of _) {
      if (index2.has(value)) continue;
      index2.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a2) {
  if (a2 <= 0) h = s2 = l = NaN;
  else if (l <= 0 || l >= 1) h = s2 = NaN;
  else if (s2 <= 0) h = NaN;
  return new Hsl(h, s2, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max3 = Math.max(r, g, b), h = NaN, s2 = max3 - min3, l = (max3 + min3) / 2;
  if (s2) {
    if (r === max3) h = (g - b) / s2 + (g < b) * 6;
    else if (g === max3) h = (b - r) / s2 + 2;
    else h = (r - g) / s2 + 4;
    s2 /= l < 0.5 ? max3 + min3 : 2 - max3 - min3;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y2 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x2, z;
  if (r === g && g === b) x2 = z = y2;
  else {
    x2 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
}
function lab(l, a2, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b, opacity == null ? 1 : opacity);
}
function Lab(l, a2, b, opacity) {
  this.l = +l;
  this.a = +a2;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k2) {
    return new Lab(this.l + K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  darker(k2) {
    return new Lab(this.l - K * (k2 == null ? 1 : k2), this.a, this.b, this.opacity);
  },
  rgb() {
    var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x2 = Xn * lab2xyz(x2);
    y2 = Yn * lab2xyz(y2);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z),
      lrgb2rgb(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x2) {
  return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x2) {
  return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k2) {
    return new Hcl(this.h, this.c, this.l + K * (k2 == null ? 1 : k2), this.opacity);
  },
  darker(k2) {
    return new Hcl(this.h, this.c, this.l - K * (k2 == null ? 1 : k2), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k2 = (E * (g - l) - C * bl) / D, s2 = Math.sqrt(k2 * k2 + bl * bl) / (E * l * (1 - l)), h = s2 ? Math.atan2(k2, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s2, l, o.opacity);
}
function cubehelix(h, s2, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s2, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h), sinh2 = Math.sin(h);
    return new Rgb(
      255 * (l + a2 * (A * cosh2 + B * sinh2)),
      255 * (l + a2 * (C * cosh2 + D * sinh2)),
      255 * (l + a2 * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y2) {
  return a2 = Math.pow(a2, y2), b = Math.pow(b, y2) - a2, y2 = 1 / y2, function(t) {
    return Math.pow(a2 + t * b, y2);
  };
}
function hue(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default(isNaN(a2) ? b : a2);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y2) : constant_default(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d) : constant_default(isNaN(a2) ? b : a2);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = (function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
})(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a2, b) {
  if (!b) b = [];
  var n = a2 ? Math.min(b.length, a2.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a2[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a2, b) {
  var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = value_default(a2[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x2[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a2, b) {
  var d = /* @__PURE__ */ new Date();
  return a2 = +a2, b = +b, function(t) {
    return d.setTime(a2 * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a2, b) {
  var i = {}, c = {}, k2;
  if (a2 === null || typeof a2 !== "object") a2 = {};
  if (b === null || typeof b !== "object") b = {};
  for (k2 in b) {
    if (k2 in a2) {
      i[k2] = value_default(a2[k2], b[k2]);
    } else {
      c[k2] = b[k2];
    }
  }
  return function(t) {
    for (k2 in i) c[k2] = i[k2](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i]) s2[i] += bs;
      else s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i]) s2[i] += bm;
      else s2[++i] = bm;
    } else {
      s2[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i]) s2[i] += bs;
    else s2[++i] = bs;
  }
  return s2.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s2[(o = q[i2]).i] = o.x(t);
    return s2.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a2, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a2, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return Math.round(a2 * (1 - t) + b * t);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b)) a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c + b * d) c -= a2 * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b * c) a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a2) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity2 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity2;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity2;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b, s2, q) {
    if (a2 !== b) {
      if (a2 - b > 180) b += 360;
      else if (b - a2 > 180) a2 += 360;
      q.push({ i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s2, q) {
    if (a2 !== b) {
      q.push({ i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s2.push(pop(s2) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push(pop(s2) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s2 = [], q = [];
    a2 = parse(a2), b = parse(b);
    translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s2, q);
    rotate(a2.rotate, b.rotate, s2, q);
    skewX(a2.skewX, b.skewX, s2, q);
    scale(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s2, q);
    a2 = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s2[(o = q[i]).i] = o.x(t);
      return s2.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
var zoom_default = (function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s2 = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s2 + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s2 + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
})(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hsl(start)).h, (end = hsl(end)).h), s2 = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s2(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return (function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix3(start, end) {
      var h = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s2 = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s2(t);
        start.l = l(Math.pow(t, y2));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  })(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number2(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity3(x2) {
  return x2;
}
function normalize(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a2, b) {
  var t;
  if (a2 > b) t = a2, a2 = b, b = t;
  return function(x2) {
    return Math.max(a2, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity3, piecewise2, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp !== identity3) clamp = clamper(domain[0], domain[n - 1]);
    piecewise2 = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate)))(transform(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise2(range2, domain.map(transform), number_default)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number2), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate = round_default, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity3, rescale()) : clamp !== identity3;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity3, identity3);
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out: for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s2[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s2[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x2, p) => (x2 * 100).toFixed(p),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal_default,
  "e": (x2, p) => x2.toExponential(p),
  "f": (x2, p) => x2.toFixed(p),
  "g": (x2, p) => x2.toPrecision(p),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p) => formatRounded_default(x2 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map3 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map3.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map3.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes_default[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=") zero3 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign2 !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3) value = group2(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3) value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k2 = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k2 * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max3) {
  step = Math.abs(step), max3 = Math.abs(max3) - step;
  return Math.max(0, exponent_default(max3) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop, count2, specifier) {
  var step = tickStep(start, stop, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null) count2 = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count2);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear2() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear2());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-scale/src/nice.js
function nice2(domain, interval2) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }
  domain[i0] = interval2.floor(x0);
  domain[i1] = interval2.ceil(x1);
  return domain;
}

// node_modules/d3-scale/src/log.js
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x2) => Math.pow(base, x2);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x2) => Math.log(x2) / base);
}
function reflect(f) {
  return (x2, k2) => -f(-x2, k2);
}
function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = (count2) => {
    const d = domain();
    let u = d[0];
    let v = d[d.length - 1];
    const r = v < u;
    if (r) [u, v] = [v, u];
    let i = logs(u);
    let j = logs(v);
    let k2;
    let t;
    const n = count2 == null ? 10 : +count2;
    let z = [];
    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k2 = 1; k2 < base; ++k2) {
          t = i < 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      else for (; i <= j; ++i) {
        for (k2 = base - 1; k2 >= 1; --k2) {
          t = i > 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };
  scale.tickFormat = (count2, specifier) => {
    if (count2 == null) count2 = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count2 === Infinity) return specifier;
    const k2 = Math.max(1, base * count2 / scale.ticks().length);
    return (d) => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k2 ? specifier(d) : "";
    };
  };
  scale.nice = () => {
    return domain(nice2(domain(), {
      floor: (x2) => pows(Math.floor(logs(x2))),
      ceil: (x2) => pows(Math.ceil(logs(x2)))
    }));
  };
  return scale;
}
function log() {
  const scale = loggish(transformer()).domain([1, 10]);
  scale.copy = () => copy(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3-scale/src/symlog.js
function transformSymlog(c) {
  return function(x2) {
    return Math.sign(x2) * Math.log1p(Math.abs(x2 / c));
  };
}
function transformSymexp(c) {
  return function(x2) {
    return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c;
  };
}
function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent) : Math.pow(x2, exponent);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform) {
  var scale = transform(identity3, identity3), exponent = 1;
  function rescale() {
    return exponent === 1 ? transform(identity3, identity3) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
  }
  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };
  return linearish(scale);
}
function pow() {
  var scale = powish(transformer());
  scale.copy = function() {
    return copy(scale, pow()).exponent(scale.exponent());
  };
  initRange.apply(scale, arguments);
  return scale;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale/src/threshold.js
function threshold() {
  var domain = [0.5], range2 = [0, 1], unknown, n = 1;
  function scale(x2) {
    return x2 != null && x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
  }
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return threshold().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}

// node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count2, field) {
  function interval2(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval2.floor = (date2) => {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval2.ceil = (date2) => {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval2.round = (date2) => {
    const d0 = interval2(date2), d1 = interval2.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval2.offset = (date2, step) => {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval2.range = (start, stop, step) => {
    const range2 = [];
    start = interval2.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval2.filter = (test) => {
    return timeInterval((date2) => {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, (date2, step) => {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval2.count = (start, end) => {
      t02.setTime(+start), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count2(t02, t12));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date2, step) => {
  date2.setTime(+date2 + step);
}, (start, end) => {
  return end - start;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0)) return null;
  if (!(k2 > 1)) return millisecond;
  return timeInterval((date2) => {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, (date2, step) => {
    date2.setTime(+date2 + step * k2);
  }, (start, end) => {
    return (end - start) / k2;
  });
};
var milliseconds = millisecond.range;

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/second.js
var second = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds());
}, (date2, step) => {
  date2.setTime(+date2 + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date2) => {
  return date2.getUTCSeconds();
});
var seconds = second.range;

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date2) => {
  date2.setUTCSeconds(0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date2) => {
  date2.setUTCMinutes(0, 0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
var timeDays = timeDay.range;
var utcDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return date2.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return Math.floor(date2 / durationDay);
});
var unixDays = unixDay.range;

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date2) => {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setDate(date2.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date2) => {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date2) => {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setMonth(date2.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date2) => {
  return date2.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date2) => {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date2) => {
  return date2.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/d3-time/src/year.js
var timeYear = timeInterval((date2) => {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setFullYear(date2.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date2) => {
  return date2.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date2) => {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date2) => {
  return date2.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks2(start, stop, count2) {
    const reverse2 = stop < start;
    if (reverse2) [start, stop] = [stop, start];
    const interval2 = count2 && typeof count2.range === "function" ? count2 : tickInterval(start, stop, count2);
    const ticks3 = interval2 ? interval2.range(start, +stop + 1) : [];
    return reverse2 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start, stop, count2) {
    const target = Math.abs(stop - start) / count2;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count2));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count2), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format2;
      if (!(date2 instanceof Date)) date2 = /* @__PURE__ */ new Date(+date2);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad2 = c === "e" ? " " : "0";
          if (format2 = formats2[c]) c = format2(date2, pad2);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse;
    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date2) {
  return date2.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date2 = new Date(string);
  return isNaN(date2) ? null : date2;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/d3-scale/src/time.js
function date(t) {
  return new Date(t);
}
function number3(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number3)) : domain().map(date);
  };
  scale.ticks = function(interval2) {
    var d = domain();
    return ticks2(d[0], d[d.length - 1], interval2 == null ? 10 : interval2);
  };
  scale.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval2) {
    var d = domain();
    if (!interval2 || typeof interval2.range !== "function") interval2 = tickInterval(d[0], d[d.length - 1], interval2 == null ? 10 : interval2);
    return interval2 ? domain(nice2(d, interval2)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/utcTime.js
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/sequential.js
function transformer2() {
  var x0 = 0, x1 = 1, t03, t13, k10, transform, interpolator = identity3, clamp = false, unknown;
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform(x2) - t03) * k10, clamp ? Math.max(0, Math.min(1, x2)) : x2));
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t03 = transform(x0 = +x0), t13 = transform(x1 = +x1), k10 = t03 === t13 ? 0 : 1 / (t13 - t03), scale) : [x0, x1];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range2(interpolate) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }
  scale.range = range2(value_default);
  scale.rangeRound = range2(round_default);
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t) {
    transform = t, t03 = t(x0), t13 = t(x1), k10 = t03 === t13 ? 0 : 1 / (t13 - t03);
    return scale;
  };
}
function copy2(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale = linearish(transformer2()(identity3));
  scale.copy = function() {
    return copy2(scale, sequential());
  };
  return initInterpolator.apply(scale, arguments);
}

// node_modules/@mui/x-charts/esm/internals/colorScale.js
function getSequentialColorScale(config) {
  if (config.type === "piecewise") {
    return threshold(config.thresholds, config.colors);
  }
  return sequential([config.min ?? 0, config.max ?? 100], config.color);
}
function getOrdinalColorScale(config) {
  if (config.values) {
    return ordinal(config.values, config.colors).unknown(config.unknownColor ?? null);
  }
  return ordinal(config.colors.map((_, index2) => index2), config.colors).unknown(config.unknownColor ?? null);
}
function getColorScale(config) {
  return config.type === "ordinal" ? getOrdinalColorScale(config) : getSequentialColorScale(config);
}

// node_modules/@mui/x-charts/esm/internals/ticks.js
function getTickNumber(params, domain, defaultTickNumber) {
  const {
    tickMaxStep,
    tickMinStep,
    tickNumber
  } = params;
  const maxTicks = tickMinStep === void 0 ? 999 : Math.floor(Math.abs(domain[1] - domain[0]) / tickMinStep);
  const minTicks = tickMaxStep === void 0 ? 2 : Math.ceil(Math.abs(domain[1] - domain[0]) / tickMaxStep);
  const defaultizedTickNumber = tickNumber ?? defaultTickNumber;
  return Math.min(maxTicks, Math.max(minTicks, defaultizedTickNumber));
}
function scaleTickNumberByRange(tickNumber, range2) {
  const rangeGap = range2[1] - range2[0];
  if (rangeGap === 0) {
    return 1;
  }
  return tickNumber / ((range2[1] - range2[0]) / 100);
}
function getDefaultTickNumber(dimension) {
  return Math.floor(Math.abs(dimension) / 50);
}

// node_modules/@mui/x-charts/esm/internals/scales/scaleBand.js
function keyof2(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value === "object" && value !== null) {
    return value.valueOf();
  }
  return value;
}
function scaleBand(...args) {
  let index2 = new InternMap(void 0, keyof2);
  let domain = [];
  let ordinalRange = [];
  let r0 = 0;
  let r1 = 1;
  let step;
  let bandwidth;
  let isRound = false;
  let paddingInner = 0;
  let paddingOuter = 0;
  let align = 0.5;
  const scale = (d) => {
    const i = index2.get(d);
    if (i === void 0) {
      return void 0;
    }
    return ordinalRange[i % ordinalRange.length];
  };
  const rescale = () => {
    const n = domain.length;
    const reverse2 = r1 < r0;
    const start = reverse2 ? r1 : r0;
    const stop = reverse2 ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (isRound) {
      step = Math.floor(step);
    }
    const adjustedStart = start + (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    const finalStart = isRound ? Math.round(adjustedStart) : adjustedStart;
    const finalBandwidth = isRound ? Math.round(bandwidth) : bandwidth;
    bandwidth = finalBandwidth;
    const values = range(n).map((i) => finalStart + step * i);
    ordinalRange = reverse2 ? values.reverse() : values;
    return scale;
  };
  scale.domain = function(_) {
    if (!arguments.length) {
      return domain.slice();
    }
    domain = [];
    index2 = new InternMap(void 0, keyof2);
    for (const value of _) {
      if (index2.has(value)) {
        continue;
      }
      index2.set(value, domain.push(value) - 1);
    }
    return rescale();
  };
  scale.range = function(_) {
    if (!arguments.length) {
      return [r0, r1];
    }
    const [v0, v1] = _;
    r0 = +v0;
    r1 = +v1;
    return rescale();
  };
  scale.rangeRound = function(_) {
    const [v0, v1] = _;
    r0 = +v0;
    r1 = +v1;
    isRound = true;
    return rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    if (!arguments.length) {
      return isRound;
    }
    isRound = !!_;
    return rescale();
  };
  scale.padding = function(_) {
    if (!arguments.length) {
      return paddingInner;
    }
    paddingInner = Math.min(1, paddingOuter = +_);
    return rescale();
  };
  scale.paddingInner = function(_) {
    if (!arguments.length) {
      return paddingInner;
    }
    paddingInner = Math.min(1, _);
    return rescale();
  };
  scale.paddingOuter = function(_) {
    if (!arguments.length) {
      return paddingOuter;
    }
    paddingOuter = +_;
    return rescale();
  };
  scale.align = function(_) {
    if (!arguments.length) {
      return align;
    }
    align = Math.max(0, Math.min(1, _));
    return rescale();
  };
  scale.copy = () => {
    return scaleBand(domain, [r0, r1]).round(isRound).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  const [arg0, arg1] = args;
  if (args.length > 1) {
    scale.domain(arg0);
    scale.range(arg1);
  } else if (arg0) {
    scale.range(arg0);
  } else {
    rescale();
  }
  return scale;
}

// node_modules/@mui/x-charts/esm/internals/scales/scalePoint.js
function scalePoint(...args) {
  const scale = scaleBand(...args).paddingInner(1);
  const originalCopy = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = () => {
    const copied = originalCopy();
    copied.padding = copied.paddingOuter;
    delete copied.paddingInner;
    delete copied.paddingOuter;
    copied.copy = scale.copy;
    return copied;
  };
  return scale;
}

// node_modules/@mui/x-charts/esm/internals/scales/scaleSymlog.js
function scaleSymlog(...args) {
  const scale = symlog(...args);
  const originalTicks = scale.ticks;
  const {
    negativeScale,
    linearScale,
    positiveScale
  } = generateScales(scale);
  scale.ticks = (count2) => {
    const ticks2 = originalTicks(count2);
    const constant2 = scale.constant();
    let negativeLogTickCount = 0;
    let linearTickCount = 0;
    let positiveLogTickCount = 0;
    ticks2.forEach((tick) => {
      if (tick > -constant2 && tick < constant2) {
        linearTickCount += 1;
      }
      if (tick <= -constant2) {
        negativeLogTickCount += 1;
      }
      if (tick >= constant2) {
        positiveLogTickCount += 1;
      }
    });
    const finalTicks = [];
    if (negativeLogTickCount > 0) {
      finalTicks.push(...negativeScale.ticks(negativeLogTickCount));
    }
    if (linearTickCount > 0) {
      const linearTicks = linearScale.ticks(linearTickCount);
      if (finalTicks.at(-1) === linearTicks[0]) {
        finalTicks.push(...linearTicks.slice(1));
      } else {
        finalTicks.push(...linearTicks);
      }
    }
    if (positiveLogTickCount > 0) {
      const positiveTicks = positiveScale.ticks(positiveLogTickCount);
      if (finalTicks.at(-1) === positiveTicks[0]) {
        finalTicks.push(...positiveTicks.slice(1));
      } else {
        finalTicks.push(...positiveTicks);
      }
    }
    return finalTicks;
  };
  scale.tickFormat = (count2 = 10, specifier) => {
    const constant2 = scale.constant();
    const [start, end] = scale.domain();
    const extent2 = end - start;
    const negativeScaleDomain = negativeScale.domain();
    const negativeScaleExtent = negativeScaleDomain[1] - negativeScaleDomain[0];
    const negativeScaleRatio = extent2 === 0 ? 0 : negativeScaleExtent / extent2;
    const negativeScaleTickCount = negativeScaleRatio * count2;
    const linearScaleDomain = linearScale.domain();
    const linearScaleExtent = linearScaleDomain[1] - linearScaleDomain[0];
    const linearScaleRatio = extent2 === 0 ? 0 : linearScaleExtent / extent2;
    const linearScaleTickCount = linearScaleRatio * count2;
    const positiveScaleDomain = positiveScale.domain();
    const positiveScaleExtent = positiveScaleDomain[1] - positiveScaleDomain[0];
    const positiveScaleRatio = extent2 === 0 ? 0 : positiveScaleExtent / extent2;
    const positiveScaleTickCount = positiveScaleRatio * count2;
    const negativeTickFormat = negativeScale.tickFormat(negativeScaleTickCount, specifier);
    const linearTickFormat = linearScale.tickFormat(linearScaleTickCount, specifier);
    const positiveTickFormat = positiveScale.tickFormat(positiveScaleTickCount, specifier);
    return (tick) => {
      const tickFormat2 = (
        // eslint-disable-next-line no-nested-ternary
        tick.valueOf() <= -constant2 ? negativeTickFormat : tick.valueOf() >= constant2 ? positiveTickFormat : linearTickFormat
      );
      return tickFormat2(tick);
    };
  };
  scale.copy = () => {
    return scaleSymlog(scale.domain(), scale.range()).constant(scale.constant());
  };
  return scale;
}
function generateScales(scale) {
  const constant2 = scale.constant();
  const domain = scale.domain();
  const negativeDomain = [domain[0], Math.min(domain[1], -constant2)];
  const negativeLogScale = log(negativeDomain, scale.range());
  const linearDomain = [Math.max(domain[0], -constant2), Math.min(domain[1], constant2)];
  const linearScale = linear2(linearDomain, scale.range());
  const positiveDomain = [Math.max(domain[0], constant2), domain[1]];
  const positiveLogScale = log(positiveDomain, scale.range());
  return {
    negativeScale: negativeLogScale,
    linearScale,
    positiveScale: positiveLogScale
  };
}

// node_modules/@mui/x-charts/esm/internals/getScale.js
function getScale(scaleType, domain, range2) {
  switch (scaleType) {
    case "log":
      return log(domain, range2);
    case "pow":
      return pow(domain, range2);
    case "sqrt":
      return sqrt(domain, range2);
    case "time":
      return time(domain, range2);
    case "utc":
      return utcTime(domain, range2);
    case "symlog":
      return scaleSymlog(domain, range2);
    default:
      return linear2(domain, range2);
  }
}

// node_modules/@mui/x-charts/esm/internals/dateHelpers.js
var isDateData = (data) => data?.[0] instanceof Date;
function createDateFormatter(data, range2, tickNumber) {
  const timeScale = time(data, range2);
  return (v, {
    location
  }) => location === "tick" ? timeScale.tickFormat(tickNumber)(v) : `${v.toLocaleString()}`;
}

// node_modules/@mui/x-charts/esm/internals/configInit.js
var cartesianInstance;
var polarInstance;
var CartesianSeriesTypes = class {
  types = /* @__PURE__ */ (() => /* @__PURE__ */ new Set())();
  constructor() {
    if (cartesianInstance) {
      throw new Error("You can only create one instance!");
    }
    cartesianInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
};
var PolarSeriesTypes = class {
  types = /* @__PURE__ */ (() => /* @__PURE__ */ new Set())();
  constructor() {
    if (polarInstance) {
      throw new Error("You can only create one instance!");
    }
    polarInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
};
var cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType("bar");
cartesianSeriesTypes.addType("line");
cartesianSeriesTypes.addType("scatter");
var polarSeriesTypes = new PolarSeriesTypes();
polarSeriesTypes.addType("radar");

// node_modules/@mui/x-charts/esm/internals/isCartesian.js
function isCartesianSeriesType(seriesType) {
  return cartesianSeriesTypes.getTypes().has(seriesType);
}
function isCartesianSeries(series) {
  return isCartesianSeriesType(series.type);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisTriggerTooltip.js
var getAxisTriggerTooltip = (axisDirection, seriesConfig, formattedSeries, defaultAxisId) => {
  const tooltipAxesIds = /* @__PURE__ */ new Set();
  const chartTypes = Object.keys(seriesConfig).filter(isCartesianSeriesType);
  chartTypes.forEach((chartType) => {
    const series = formattedSeries[chartType]?.series ?? {};
    const tooltipAxes = seriesConfig[chartType].axisTooltipGetter?.(series);
    if (tooltipAxes === void 0) {
      return;
    }
    tooltipAxes.forEach(({
      axisId,
      direction
    }) => {
      if (direction === axisDirection) {
        tooltipAxesIds.add(axisId ?? defaultAxisId);
      }
    });
  });
  return tooltipAxesIds;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/computeAxisValue.js
function getRange(drawingArea, axisDirection, reverse2) {
  const range2 = axisDirection === "x" ? [drawingArea.left, drawingArea.left + drawingArea.width] : [drawingArea.top + drawingArea.height, drawingArea.top];
  return reverse2 ? [range2[1], range2[0]] : range2;
}
var DEFAULT_CATEGORY_GAP_RATIO = 0.2;
var DEFAULT_BAR_GAP_RATIO = 0.1;
function computeAxisValue({
  scales,
  drawingArea,
  formattedSeries,
  axis: allAxis,
  seriesConfig,
  axisDirection,
  zoomMap,
  domains
}) {
  if (allAxis === void 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const axisIdsTriggeringTooltip = getAxisTriggerTooltip(axisDirection, seriesConfig, formattedSeries, allAxis[0].id);
  const completeAxis = {};
  allAxis.forEach((eachAxis) => {
    const axis = eachAxis;
    const scale = scales[axis.id];
    const zoom = zoomMap?.get(axis.id);
    const zoomRange = zoom ? [zoom.start, zoom.end] : [0, 100];
    const range2 = getRange(drawingArea, axisDirection, axis.reverse ?? false);
    const triggerTooltip = !axis.ignoreTooltip && axisIdsTriggeringTooltip.has(axis.id);
    const data = axis.data ?? [];
    if (isOrdinalScale(scale)) {
      const scaleRange = axisDirection === "y" ? [range2[1], range2[0]] : range2;
      if (isBandScale(scale) && isBandScaleConfig(axis)) {
        const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO;
        const barGapRatio = axis.barGapRatio ?? DEFAULT_BAR_GAP_RATIO;
        completeAxis[axis.id] = _extends({
          offset: 0,
          height: 0,
          categoryGapRatio,
          barGapRatio,
          triggerTooltip
        }, axis, {
          data,
          scale,
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (isPointScaleConfig(axis)) {
        completeAxis[axis.id] = _extends({
          offset: 0,
          height: 0,
          triggerTooltip
        }, axis, {
          data,
          scale,
          tickNumber: axis.data.length,
          colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
            values: axis.data
          }, axis.colorMap)) : getColorScale(axis.colorMap))
        });
      }
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis.data, scaleRange, axis.tickNumber);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
      return;
    }
    if (axis.scaleType === "band" || axis.scaleType === "point") {
      return;
    }
    const rawTickNumber = domains[axis.id].tickNumber;
    const continuousAxis = axis;
    const scaleType = continuousAxis.scaleType ?? "linear";
    const tickNumber = scaleTickNumberByRange(rawTickNumber, zoomRange);
    completeAxis[axis.id] = _extends({
      offset: 0,
      height: 0,
      triggerTooltip
    }, continuousAxis, {
      data,
      scaleType,
      scale,
      tickNumber,
      colorScale: continuousAxis.colorMap && getSequentialColorScale(continuousAxis.colorMap),
      valueFormatter: axis.valueFormatter ?? createScalarFormatter(tickNumber, getScale(scaleType, range2.map((v) => scale.invert(v)), range2))
    });
  });
  return {
    axis: completeAxis,
    axisIds: allAxis.map(({
      id
    }) => id)
  };
}

// node_modules/@mui/x-charts/esm/internals/isDefined.js
function isDefined(value) {
  return value !== null && value !== void 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/createAxisFilterMapper.js
function createDiscreteScaleGetAxisFilter(axisData, zoomStart, zoomEnd, direction) {
  const maxIndex2 = axisData?.length ?? 0;
  const minVal = Math.floor(zoomStart * maxIndex2 / 100);
  const maxVal = Math.ceil(zoomEnd * maxIndex2 / 100);
  return function filterAxis(value, dataIndex) {
    const val = value[direction] ?? axisData?.[dataIndex];
    if (val == null) {
      return true;
    }
    return dataIndex >= minVal && dataIndex < maxVal;
  };
}
function createContinuousScaleGetAxisFilter(domain, zoomStart, zoomEnd, direction, axisData) {
  const min3 = domain[0].valueOf();
  const max3 = domain[1].valueOf();
  const minVal = min3 + zoomStart * (max3 - min3) / 100;
  const maxVal = min3 + zoomEnd * (max3 - min3) / 100;
  return function filterAxis(value, dataIndex) {
    const val = value[direction] ?? axisData?.[dataIndex];
    if (val == null) {
      return true;
    }
    return val >= minVal && val <= maxVal;
  };
}
var createGetAxisFilters = (filters) => ({
  currentAxisId,
  seriesXAxisId,
  seriesYAxisId,
  isDefaultAxis
}) => {
  return (value, dataIndex) => {
    const axisId = currentAxisId === seriesXAxisId ? seriesYAxisId : seriesXAxisId;
    if (!axisId || isDefaultAxis) {
      return Object.values(filters ?? {})[0]?.(value, dataIndex) ?? true;
    }
    const data = [seriesYAxisId, seriesXAxisId].filter((id) => id !== currentAxisId).map((id) => filters[id ?? ""]).filter(isDefined);
    return data.every((f) => f(value, dataIndex));
  };
};

// node_modules/@mui/x-charts/esm/internals/constants.js
var ZOOM_SLIDER_MARGIN = 4;
var ZOOM_SLIDER_PREVIEW_SIZE = 40;
var DEFAULT_ZOOM_SLIDER_SIZE = 20 + 2 * ZOOM_SLIDER_MARGIN;
var DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE = 40 + 2 * ZOOM_SLIDER_MARGIN;
var DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP = "hover";

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/defaultizeZoom.js
var defaultZoomOptions = {
  minStart: 0,
  maxEnd: 100,
  step: 5,
  minSpan: 10,
  maxSpan: 100,
  panning: true,
  filterMode: "keep",
  reverse: false,
  slider: {
    enabled: false,
    preview: false,
    size: DEFAULT_ZOOM_SLIDER_SIZE,
    showTooltip: DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP
  }
};
var defaultizeZoom = (zoom, axisId, axisDirection, reverse2) => {
  if (!zoom) {
    return void 0;
  }
  if (zoom === true) {
    return _extends({
      axisId,
      axisDirection
    }, defaultZoomOptions, {
      reverse: reverse2 ?? false
    });
  }
  return _extends({
    axisId,
    axisDirection
  }, defaultZoomOptions, {
    reverse: reverse2 ?? false
  }, zoom, {
    slider: _extends({}, defaultZoomOptions.slider, {
      size: zoom.slider?.preview ?? defaultZoomOptions.slider.preview ? DEFAULT_ZOOM_SLIDER_PREVIEW_SIZE : DEFAULT_ZOOM_SLIDER_SIZE
    }, zoom.slider)
  });
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/createZoomLookup.js
var createZoomLookup = (axisDirection) => (axes = []) => axes.reduce((acc, v) => {
  const {
    zoom,
    id: axisId,
    reverse: reverse2
  } = v;
  const defaultizedZoom = defaultizeZoom(zoom, axisId, axisDirection, reverse2);
  if (defaultizedZoom) {
    acc[axisId] = defaultizedZoom;
  }
  return acc;
}, {});

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.js
var useChartExperimentalFeatures = ({
  params,
  store
}) => {
  useEnhancedEffect_default(() => {
    store.set("experimentalFeatures", params.experimentalFeatures);
  }, [store, params.experimentalFeatures]);
  return {};
};
useChartExperimentalFeatures.params = {
  experimentalFeatures: true
};
useChartExperimentalFeatures.getInitialState = ({
  experimentalFeatures
}) => {
  return {
    experimentalFeatures
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartExperimentalFeature/useChartExperimentalFeature.selectors.js
var selectorChartExperimentalFeaturesState = (state) => state.experimentalFeatures;
var selectorPreferStrictDomainInLineCharts = createSelector2(selectorChartExperimentalFeaturesState, (features) => Boolean(features?.preferStrictDomainInLineCharts));

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisScale.js
var DEFAULT_CATEGORY_GAP_RATIO2 = 0.2;
function getRange2(drawingArea, axisDirection, axis) {
  const range2 = axisDirection === "x" ? [drawingArea.left, drawingArea.left + drawingArea.width] : [drawingArea.top + drawingArea.height, drawingArea.top];
  return axis.reverse ? [range2[1], range2[0]] : range2;
}
function getNormalizedAxisScale(axis, domain) {
  const range2 = [0, 1];
  if (isBandScaleConfig(axis)) {
    const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO2;
    return scaleBand(domain, range2).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2);
  }
  if (isPointScaleConfig(axis)) {
    return scalePoint(domain, range2);
  }
  const scaleType = axis.scaleType ?? "linear";
  const scale = getScale(scaleType, domain, range2);
  if (isSymlogScaleConfig(axis) && axis.constant != null) {
    scale.constant(axis.constant);
  }
  return scale;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/zoom.js
var zoomScaleRange = (scaleRange, zoomRange) => {
  const rangeGap = scaleRange[1] - scaleRange[0];
  const zoomGap = zoomRange[1] - zoomRange[0];
  const min3 = scaleRange[0] - zoomRange[0] * rangeGap / zoomGap;
  const max3 = scaleRange[1] + (100 - zoomRange[1]) * rangeGap / zoomGap;
  return [min3, max3];
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisExtrema.js
var axisExtremumCallback = (chartType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters) => {
  const getter = axisDirection === "x" ? seriesConfig[chartType].xExtremumGetter : seriesConfig[chartType].yExtremumGetter;
  const series = formattedSeries[chartType]?.series ?? {};
  return getter?.({
    series,
    axis,
    axisIndex,
    isDefaultAxis: axisIndex === 0,
    getFilters
  }) ?? [Infinity, -Infinity];
};
function getAxisExtrema(axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters) {
  const cartesianChartTypes = Object.keys(seriesConfig).filter(isCartesianSeriesType);
  let extrema = [Infinity, -Infinity];
  for (const chartType of cartesianChartTypes) {
    const [min3, max3] = axisExtremumCallback(chartType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters);
    extrema = [Math.min(extrema[0], min3), Math.max(extrema[1], max3)];
  }
  if (Number.isNaN(extrema[0]) || Number.isNaN(extrema[1])) {
    return [Infinity, -Infinity];
  }
  return extrema;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisDomainLimit.js
var getAxisDomainLimit = (axis, axisDirection, axisIndex, formattedSeries) => {
  if (axis.domainLimit !== void 0) {
    return axis.domainLimit;
  }
  if (axisDirection === "x") {
    for (const seriesId of formattedSeries.line?.seriesOrder ?? []) {
      const series = formattedSeries.line.series[seriesId];
      if (series.xAxisId === axis.id || series.xAxisId === void 0 && axisIndex === 0) {
        return "strict";
      }
    }
  }
  return "nice";
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/domain.js
function niceDomain(scaleType, domain, tickNumber) {
  return getScale(scaleType ?? "linear", domain, [0, 1]).nice(tickNumber).domain();
}
function calculateInitialDomainAndTickNumber(axis, axisDirection, axisIndex, formattedSeries, [minData, maxData], defaultTickNumber, preferStrictDomainInLineCharts) {
  const domainLimit = getDomainLimit(axis, axisDirection, axisIndex, formattedSeries, preferStrictDomainInLineCharts);
  let axisExtrema = getActualAxisExtrema(axis, minData, maxData);
  if (typeof domainLimit === "function") {
    const {
      min: min3,
      max: max3
    } = domainLimit(minData.valueOf(), maxData.valueOf());
    axisExtrema[0] = min3;
    axisExtrema[1] = max3;
  }
  const tickNumber = getTickNumber(axis, axisExtrema, defaultTickNumber);
  if (domainLimit === "nice") {
    axisExtrema = niceDomain(axis.scaleType, axisExtrema, tickNumber);
  }
  axisExtrema = ["min" in axis ? axis.min ?? axisExtrema[0] : axisExtrema[0], "max" in axis ? axis.max ?? axisExtrema[1] : axisExtrema[1]];
  return {
    domain: axisExtrema,
    tickNumber
  };
}
function calculateFinalDomain(axis, axisDirection, axisIndex, formattedSeries, [minData, maxData], tickNumber, preferStrictDomainInLineCharts) {
  const domainLimit = getDomainLimit(axis, axisDirection, axisIndex, formattedSeries, preferStrictDomainInLineCharts);
  let axisExtrema = getActualAxisExtrema(axis, minData, maxData);
  if (typeof domainLimit === "function") {
    const {
      min: min3,
      max: max3
    } = domainLimit(minData.valueOf(), maxData.valueOf());
    axisExtrema[0] = min3;
    axisExtrema[1] = max3;
  }
  if (domainLimit === "nice") {
    axisExtrema = niceDomain(axis.scaleType, axisExtrema, tickNumber);
  }
  return [axis.min ?? axisExtrema[0], axis.max ?? axisExtrema[1]];
}
function getDomainLimit(axis, axisDirection, axisIndex, formattedSeries, preferStrictDomainInLineCharts) {
  return preferStrictDomainInLineCharts ? getAxisDomainLimit(axis, axisDirection, axisIndex, formattedSeries) : axis.domainLimit ?? "nice";
}
function getActualAxisExtrema(axisExtrema, minData, maxData) {
  let min3 = minData;
  let max3 = maxData;
  if ("max" in axisExtrema && axisExtrema.max != null && axisExtrema.max < minData) {
    min3 = axisExtrema.max;
  }
  if ("min" in axisExtrema && axisExtrema.min != null && axisExtrema.min > minData) {
    max3 = axisExtrema.min;
  }
  if (!("min" in axisExtrema) && !("max" in axisExtrema)) {
    return [min3, max3];
  }
  return [axisExtrema.min ?? min3, axisExtrema.max ?? max3];
}

// node_modules/flatqueue/index.js
var FlatQueue = class {
  constructor() {
    this.ids = [];
    this.values = [];
    this.length = 0;
  }
  /** Removes all items from the queue. */
  clear() {
    this.length = 0;
  }
  /**
   * Adds `item` to the queue with the specified `priority`.
   *
   * `priority` must be a number. Items are sorted and returned from low to high priority. Multiple items
   * with the same priority value can be added to the queue, but there is no guaranteed order between these items.
   *
   * @param {T} item
   * @param {number} priority
   */
  push(item, priority) {
    let pos = this.length++;
    while (pos > 0) {
      const parent = pos - 1 >> 1;
      const parentValue = this.values[parent];
      if (priority >= parentValue) break;
      this.ids[pos] = this.ids[parent];
      this.values[pos] = parentValue;
      pos = parent;
    }
    this.ids[pos] = item;
    this.values[pos] = priority;
  }
  /**
   * Removes and returns the item from the head of this queue, which is one of
   * the items with the lowest priority. If this queue is empty, returns `undefined`.
   */
  pop() {
    if (this.length === 0) return void 0;
    const ids = this.ids, values = this.values, top = ids[0], last = --this.length;
    if (last > 0) {
      const id = ids[last];
      const value = values[last];
      let pos = 0;
      const halfLen = last >> 1;
      while (pos < halfLen) {
        const left = (pos << 1) + 1;
        const right = left + 1;
        const child = left + (+(right < last) & +(values[right] < values[left]));
        if (values[child] >= value) break;
        ids[pos] = ids[child];
        values[pos] = values[child];
        pos = child;
      }
      ids[pos] = id;
      values[pos] = value;
    }
    return top;
  }
  /** Returns the item from the head of this queue without removing it. If this queue is empty, returns `undefined`. */
  peek() {
    return this.length > 0 ? this.ids[0] : void 0;
  }
  /**
   * Returns the priority value of the item at the head of this queue without
   * removing it. If this queue is empty, returns `undefined`.
   */
  peekValue() {
    return this.length > 0 ? this.values[0] : void 0;
  }
  /**
   * Shrinks the internal arrays to `this.length`.
   *
   * `pop()` and `clear()` calls don't free memory automatically to avoid unnecessary resize operations.
   * This also means that items that have been added to the queue can't be garbage collected until
   * a new item is pushed in their place, or this method is called.
   */
  shrink() {
    this.ids.length = this.values.length = this.length;
  }
};

// node_modules/@mui/x-charts/esm/internals/Flatbush.js
var ARRAY_TYPES = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
var VERSION = 3;
var Flatbush = class _Flatbush {
  /**
   * Recreate a Flatbush index from raw `ArrayBuffer` or `SharedArrayBuffer` data.
   * @param {ArrayBufferLike} data
   * @param {number} [byteOffset=0] byte offset to the start of the Flatbush buffer in the referenced ArrayBuffer.
   * @returns {Flatbush} index
   */
  static from(data, byteOffset = 0) {
    if (byteOffset % 8 !== 0) {
      throw new Error("byteOffset must be 8-byte aligned.");
    }
    if (!data || data.byteLength === void 0 || data.buffer) {
      throw new Error("Data must be an instance of ArrayBuffer or SharedArrayBuffer.");
    }
    const [magic, versionAndType] = new Uint8Array(data, byteOffset + 0, 2);
    if (magic !== 251) {
      throw new Error("Data does not appear to be in a Flatbush format.");
    }
    const version2 = versionAndType >> 4;
    if (version2 !== VERSION) {
      throw new Error(`Got v${version2} data when expected v${VERSION}.`);
    }
    const ArrayType = ARRAY_TYPES[versionAndType & 15];
    if (!ArrayType) {
      throw new Error("Unrecognized array type.");
    }
    const [nodeSize] = new Uint16Array(data, byteOffset + 2, 1);
    const [numItems] = new Uint32Array(data, byteOffset + 4, 1);
    return new _Flatbush(numItems, nodeSize, ArrayType, void 0, data, byteOffset);
  }
  /**
   * Create a Flatbush index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=16] Size of the tree node (16 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBufferConstructor | SharedArrayBufferConstructor} [ArrayBufferType=ArrayBuffer] The array buffer type used to store data (`ArrayBuffer` by default).
   * @param {ArrayBufferLike} [data] (Only used internally)
   * @param {number} [byteOffset=0] (Only used internally)
   */
  constructor(numItems, nodeSize = 16, ArrayType = Float64Array, ArrayBufferType = ArrayBuffer, data, byteOffset = 0) {
    if (numItems === void 0) {
      throw new Error("Missing required argument: numItems.");
    }
    if (isNaN(numItems) || numItems <= 0) {
      throw new Error(`Unexpected numItems value: ${numItems}.`);
    }
    this.numItems = +numItems;
    this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
    this.byteOffset = byteOffset;
    let n = numItems;
    let numNodes = n;
    this._levelBounds = [n * 4];
    do {
      n = Math.ceil(n / this.nodeSize);
      numNodes += n;
      this._levelBounds.push(numNodes * 4);
    } while (n !== 1);
    this.ArrayType = ArrayType;
    this.IndexArrayType = numNodes < 16384 ? Uint16Array : Uint32Array;
    const arrayTypeIndex = ARRAY_TYPES.indexOf(ArrayType);
    const nodesByteSize = numNodes * 4 * ArrayType.BYTES_PER_ELEMENT;
    if (arrayTypeIndex < 0) {
      throw new Error(`Unexpected typed array class: ${ArrayType}.`);
    }
    if (data) {
      this.data = data;
      this._boxes = new ArrayType(data, byteOffset + 8, numNodes * 4);
      this._indices = new this.IndexArrayType(data, byteOffset + 8 + nodesByteSize, numNodes);
      this._pos = numNodes * 4;
      this.minX = this._boxes[this._pos - 4];
      this.minY = this._boxes[this._pos - 3];
      this.maxX = this._boxes[this._pos - 2];
      this.maxY = this._boxes[this._pos - 1];
    } else {
      const data2 = this.data = new ArrayBufferType(8 + nodesByteSize + numNodes * this.IndexArrayType.BYTES_PER_ELEMENT);
      this._boxes = new ArrayType(data2, 8, numNodes * 4);
      this._indices = new this.IndexArrayType(data2, 8 + nodesByteSize, numNodes);
      this._pos = 0;
      this.minX = Infinity;
      this.minY = Infinity;
      this.maxX = -Infinity;
      this.maxY = -Infinity;
      new Uint8Array(data2, 0, 2).set([251, (VERSION << 4) + arrayTypeIndex]);
      new Uint16Array(data2, 2, 1)[0] = nodeSize;
      new Uint32Array(data2, 4, 1)[0] = numItems;
    }
    this._queue = new FlatQueue();
  }
  /**
   * Add a given rectangle to the index.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number} A zero-based, incremental number that represents the newly added rectangle.
   */
  add(minX, minY, maxX = minX, maxY = minY) {
    const index2 = this._pos >> 2;
    const boxes = this._boxes;
    this._indices[index2] = index2;
    boxes[this._pos++] = minX;
    boxes[this._pos++] = minY;
    boxes[this._pos++] = maxX;
    boxes[this._pos++] = maxY;
    if (minX < this.minX) {
      this.minX = minX;
    }
    if (minY < this.minY) {
      this.minY = minY;
    }
    if (maxX > this.maxX) {
      this.maxX = maxX;
    }
    if (maxY > this.maxY) {
      this.maxY = maxY;
    }
    return index2;
  }
  /** Perform indexing of the added rectangles. */
  finish() {
    if (this._pos >> 2 !== this.numItems) {
      throw new Error(`Added ${this._pos >> 2} items when expected ${this.numItems}.`);
    }
    const boxes = this._boxes;
    if (this.numItems <= this.nodeSize) {
      boxes[this._pos++] = this.minX;
      boxes[this._pos++] = this.minY;
      boxes[this._pos++] = this.maxX;
      boxes[this._pos++] = this.maxY;
      return;
    }
    const width = this.maxX - this.minX || 1;
    const height = this.maxY - this.minY || 1;
    const hilbertValues = new Uint32Array(this.numItems);
    const hilbertMax = (1 << 16) - 1;
    for (let i = 0, pos = 0; i < this.numItems; i++) {
      const minX = boxes[pos++];
      const minY = boxes[pos++];
      const maxX = boxes[pos++];
      const maxY = boxes[pos++];
      const x2 = Math.floor(hilbertMax * ((minX + maxX) / 2 - this.minX) / width);
      const y2 = Math.floor(hilbertMax * ((minY + maxY) / 2 - this.minY) / height);
      hilbertValues[i] = hilbert(x2, y2);
    }
    sort2(hilbertValues, boxes, this._indices, 0, this.numItems - 1, this.nodeSize);
    for (let i = 0, pos = 0; i < this._levelBounds.length - 1; i++) {
      const end = this._levelBounds[i];
      while (pos < end) {
        const nodeIndex = pos;
        let nodeMinX = boxes[pos++];
        let nodeMinY = boxes[pos++];
        let nodeMaxX = boxes[pos++];
        let nodeMaxY = boxes[pos++];
        for (let j = 1; j < this.nodeSize && pos < end; j++) {
          nodeMinX = Math.min(nodeMinX, boxes[pos++]);
          nodeMinY = Math.min(nodeMinY, boxes[pos++]);
          nodeMaxX = Math.max(nodeMaxX, boxes[pos++]);
          nodeMaxY = Math.max(nodeMaxY, boxes[pos++]);
        }
        this._indices[this._pos >> 2] = nodeIndex;
        boxes[this._pos++] = nodeMinX;
        boxes[this._pos++] = nodeMinY;
        boxes[this._pos++] = nodeMaxX;
        boxes[this._pos++] = nodeMaxY;
      }
    }
  }
  /**
   * Search the index by a bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @param {(index: number) => boolean} [filterFn] An optional function for filtering the results.
   * @returns {number[]} An array containing the index, the x coordinate and the y coordinate of the points intersecting or touching the given bounding box.
   */
  search(minX, minY, maxX, maxY, filterFn) {
    if (this._pos !== this._boxes.length) {
      throw new Error("Data not yet indexed - call index.finish().");
    }
    let nodeIndex = this._boxes.length - 4;
    const queue = [];
    const results = [];
    while (nodeIndex !== void 0) {
      const end = Math.min(nodeIndex + this.nodeSize * 4, upperBound(nodeIndex, this._levelBounds));
      for (let pos = nodeIndex; pos < end; pos += 4) {
        if (maxX < this._boxes[pos]) {
          continue;
        }
        if (maxY < this._boxes[pos + 1]) {
          continue;
        }
        if (minX > this._boxes[pos + 2]) {
          continue;
        }
        if (minY > this._boxes[pos + 3]) {
          continue;
        }
        const index2 = this._indices[pos >> 2] | 0;
        if (nodeIndex >= this.numItems * 4) {
          queue.push(index2);
        } else if (filterFn === void 0 || filterFn(index2)) {
          results.push(index2);
          results.push(this._boxes[pos]);
          results.push(this._boxes[pos + 1]);
        }
      }
      nodeIndex = queue.pop();
    }
    return results;
  }
  /**
   * Search items in order of distance from the given point.
   * @param x
   * @param y
   * @param [maxResults=Infinity]
   * @param maxDistSq
   * @param [filterFn] An optional function for filtering the results.
   * @param [sqDistFn] An optional function to calculate squared distance from the point to the item.
   * @returns {number[]} An array of indices of items found.
   */
  neighbors(x2, y2, maxResults = Infinity, maxDistSq = Infinity, filterFn, sqDistFn = sqDist) {
    if (this._pos !== this._boxes.length) {
      throw new Error("Data not yet indexed - call index.finish().");
    }
    let nodeIndex = this._boxes.length - 4;
    const q = this._queue;
    const results = [];
    outer: while (nodeIndex !== void 0) {
      const end = Math.min(nodeIndex + this.nodeSize * 4, upperBound(nodeIndex, this._levelBounds));
      for (let pos = nodeIndex; pos < end; pos += 4) {
        const index2 = this._indices[pos >> 2] | 0;
        const minX = this._boxes[pos];
        const minY = this._boxes[pos + 1];
        const maxX = this._boxes[pos + 2];
        const maxY = this._boxes[pos + 3];
        const dx = x2 < minX ? minX - x2 : x2 > maxX ? x2 - maxX : 0;
        const dy = y2 < minY ? minY - y2 : y2 > maxY ? y2 - maxY : 0;
        const dist = sqDistFn(dx, dy);
        if (dist > maxDistSq) {
          continue;
        }
        if (nodeIndex >= this.numItems * 4) {
          q.push(index2 << 1, dist);
        } else if (filterFn === void 0 || filterFn(index2)) {
          q.push((index2 << 1) + 1, dist);
        }
      }
      while (q.length && q.peek() & 1) {
        const dist = q.peekValue();
        if (dist > maxDistSq) {
          break outer;
        }
        results.push(q.pop() >> 1);
        if (results.length === maxResults) {
          break outer;
        }
      }
      nodeIndex = q.length ? q.pop() >> 1 : void 0;
    }
    q.clear();
    return results;
  }
};
function sqDist(dx, dy) {
  return dx * dx + dy * dy;
}
function upperBound(value, arr) {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    const m = i + j >> 1;
    if (arr[m] > value) {
      j = m;
    } else {
      i = m + 1;
    }
  }
  return arr[i];
}
function sort2(values, boxes, indices, left, right, nodeSize) {
  if (Math.floor(left / nodeSize) >= Math.floor(right / nodeSize)) {
    return;
  }
  const start = values[left];
  const mid = values[left + right >> 1];
  const end = values[right];
  let pivot = end;
  const x2 = Math.max(start, mid);
  if (end > x2) {
    pivot = x2;
  } else if (x2 === start) {
    pivot = Math.max(mid, end);
  } else if (x2 === mid) {
    pivot = Math.max(start, end);
  }
  let i = left - 1;
  let j = right + 1;
  while (true) {
    do {
      i++;
    } while (values[i] < pivot);
    do {
      j--;
    } while (values[j] > pivot);
    if (i >= j) {
      break;
    }
    swap(values, boxes, indices, i, j);
  }
  sort2(values, boxes, indices, left, j, nodeSize);
  sort2(values, boxes, indices, j + 1, right, nodeSize);
}
function swap(values, boxes, indices, i, j) {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
  const k2 = 4 * i;
  const m = 4 * j;
  const a2 = boxes[k2];
  const b = boxes[k2 + 1];
  const c = boxes[k2 + 2];
  const d = boxes[k2 + 3];
  boxes[k2] = boxes[m];
  boxes[k2 + 1] = boxes[m + 1];
  boxes[k2 + 2] = boxes[m + 2];
  boxes[k2 + 3] = boxes[m + 3];
  boxes[m] = a2;
  boxes[m + 1] = b;
  boxes[m + 2] = c;
  boxes[m + 3] = d;
  const e = indices[i];
  indices[i] = indices[j];
  indices[j] = e;
}
function hilbert(x2, y2) {
  let a2 = x2 ^ y2;
  let b = 65535 ^ a2;
  let c = 65535 ^ (x2 | y2);
  let d = x2 & (y2 ^ 65535);
  let A2 = a2 | b >> 1;
  let B2 = a2 >> 1 ^ a2;
  let C2 = c >> 1 ^ b & d >> 1 ^ c;
  let D2 = a2 & c >> 1 ^ d >> 1 ^ d;
  a2 = A2;
  b = B2;
  c = C2;
  d = D2;
  A2 = a2 & a2 >> 2 ^ b & b >> 2;
  B2 = a2 & b >> 2 ^ b & (a2 ^ b) >> 2;
  C2 ^= a2 & c >> 2 ^ b & d >> 2;
  D2 ^= b & c >> 2 ^ (a2 ^ b) & d >> 2;
  a2 = A2;
  b = B2;
  c = C2;
  d = D2;
  A2 = a2 & a2 >> 4 ^ b & b >> 4;
  B2 = a2 & b >> 4 ^ b & (a2 ^ b) >> 4;
  C2 ^= a2 & c >> 4 ^ b & d >> 4;
  D2 ^= b & c >> 4 ^ (a2 ^ b) & d >> 4;
  a2 = A2;
  b = B2;
  c = C2;
  d = D2;
  C2 ^= a2 & c >> 8 ^ b & d >> 8;
  D2 ^= b & c >> 8 ^ (a2 ^ b) & d >> 8;
  a2 = C2 ^ C2 >> 1;
  b = D2 ^ D2 >> 1;
  let i0 = x2 ^ y2;
  let i1 = b | 65535 ^ (i0 | a2);
  i0 = (i0 | i0 << 8) & 16711935;
  i0 = (i0 | i0 << 4) & 252645135;
  i0 = (i0 | i0 << 2) & 858993459;
  i0 = (i0 | i0 << 1) & 1431655765;
  i1 = (i1 | i1 << 8) & 16711935;
  i1 = (i1 | i1 << 4) & 252645135;
  i1 = (i1 | i1 << 2) & 858993459;
  i1 = (i1 | i1 << 1) & 1431655765;
  return (i1 << 1 | i0) >>> 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxisRendering.selectors.js
var createZoomMap = (zoom) => {
  const zoomItemMap = /* @__PURE__ */ new Map();
  zoom.forEach((zoomItem) => {
    zoomItemMap.set(zoomItem.axisId, zoomItem);
  });
  return zoomItemMap;
};
var selectorChartZoomState = (state) => state.zoom;
var selectorChartHasZoom = createSelector2(selectorChartRawXAxis, selectorChartRawYAxis, (xAxes, yAxes) => xAxes?.some((axis) => Boolean(axis.zoom)) || yAxes?.some((axis) => Boolean(axis.zoom)) || false);
var selectorChartZoomIsInteracting = createSelector2(selectorChartZoomState, (zoom) => zoom?.isInteracting);
var selectorChartZoomMap = createSelectorMemoized(selectorChartZoomState, function selectorChartZoomMap2(zoom) {
  return zoom?.zoomData && createZoomMap(zoom?.zoomData);
});
var selectorChartAxisZoomData = createSelector2(selectorChartZoomMap, (zoomMap, axisId) => zoomMap?.get(axisId));
var selectorChartZoomOptionsLookup = createSelectorMemoized(selectorChartRawXAxis, selectorChartRawYAxis, function selectorChartZoomOptionsLookup2(xAxis, yAxis) {
  return _extends({}, createZoomLookup("x")(xAxis), createZoomLookup("y")(yAxis));
});
var selectorChartAxisZoomOptionsLookup = createSelector2(selectorChartZoomOptionsLookup, (axisLookup, axisId) => axisLookup[axisId]);
var selectorDefaultXAxisTickNumber = createSelector2(selectorChartDrawingArea, function selectorDefaultXAxisTickNumber2(drawingArea) {
  return getDefaultTickNumber(drawingArea.width);
});
var selectorDefaultYAxisTickNumber = createSelector2(selectorChartDrawingArea, function selectorDefaultYAxisTickNumber2(drawingArea) {
  return getDefaultTickNumber(drawingArea.height);
});
var selectorChartXAxisWithDomains = createSelectorMemoized(selectorChartRawXAxis, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorPreferStrictDomainInLineCharts, selectorDefaultXAxisTickNumber, function selectorChartXAxisWithDomains2(axes, formattedSeries, seriesConfig, preferStrictDomainInLineCharts, defaultTickNumber) {
  const axisDirection = "x";
  const domains = {};
  axes?.forEach((eachAxis, axisIndex) => {
    const axis = eachAxis;
    if (isBandScaleConfig(axis) || isPointScaleConfig(axis)) {
      domains[axis.id] = {
        domain: axis.data
      };
      return;
    }
    const axisExtrema = getAxisExtrema(axis, axisDirection, seriesConfig, axisIndex, formattedSeries);
    domains[axis.id] = calculateInitialDomainAndTickNumber(axis, "x", axisIndex, formattedSeries, axisExtrema, defaultTickNumber, preferStrictDomainInLineCharts);
  });
  return {
    axes,
    domains
  };
});
var selectorChartYAxisWithDomains = createSelectorMemoized(selectorChartRawYAxis, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorPreferStrictDomainInLineCharts, selectorDefaultYAxisTickNumber, function selectorChartYAxisWithDomains2(axes, formattedSeries, seriesConfig, preferStrictDomainInLineCharts, defaultTickNumber) {
  const axisDirection = "y";
  const domains = {};
  axes?.forEach((eachAxis, axisIndex) => {
    const axis = eachAxis;
    if (isBandScaleConfig(axis) || isPointScaleConfig(axis)) {
      domains[axis.id] = {
        domain: axis.data
      };
      return;
    }
    const axisExtrema = getAxisExtrema(axis, axisDirection, seriesConfig, axisIndex, formattedSeries);
    domains[axis.id] = calculateInitialDomainAndTickNumber(axis, "y", axisIndex, formattedSeries, axisExtrema, defaultTickNumber, preferStrictDomainInLineCharts);
  });
  return {
    axes,
    domains
  };
});
var selectorChartZoomAxisFilters = createSelectorMemoized(selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartXAxisWithDomains, selectorChartYAxisWithDomains, function selectorChartZoomAxisFilters2(zoomMap, zoomOptions, {
  axes: xAxis,
  domains: xDomains
}, {
  axes: yAxis,
  domains: yDomains
}) {
  if (!zoomMap || !zoomOptions) {
    return void 0;
  }
  let hasFilter = false;
  const filters = {};
  const axes = [...xAxis ?? [], ...yAxis ?? []];
  for (let i = 0; i < axes.length; i += 1) {
    const axis = axes[i];
    if (!zoomOptions[axis.id] || zoomOptions[axis.id].filterMode !== "discard") {
      continue;
    }
    const zoom = zoomMap.get(axis.id);
    if (zoom === void 0 || zoom.start <= 0 && zoom.end >= 100) {
      continue;
    }
    const axisDirection = i < (xAxis?.length ?? 0) ? "x" : "y";
    if (axis.scaleType === "band" || axis.scaleType === "point") {
      filters[axis.id] = createDiscreteScaleGetAxisFilter(axis.data, zoom.start, zoom.end, axisDirection);
    } else {
      const {
        domain
      } = axisDirection === "x" ? xDomains[axis.id] : yDomains[axis.id];
      filters[axis.id] = createContinuousScaleGetAxisFilter(
        // For continuous scales, the domain is always a two-value array.
        domain,
        zoom.start,
        zoom.end,
        axisDirection,
        axis.data
      );
    }
    hasFilter = true;
  }
  if (!hasFilter) {
    return void 0;
  }
  return createGetAxisFilters(filters);
});
var selectorChartFilteredXDomains = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartZoomAxisFilters, selectorPreferStrictDomainInLineCharts, selectorChartXAxisWithDomains, function selectorChartFilteredXDomains2(formattedSeries, seriesConfig, zoomMap, zoomOptions, getFilters, preferStrictDomainInLineCharts, {
  axes,
  domains
}) {
  const filteredDomains = {};
  axes?.forEach((axis, axisIndex) => {
    const domain = domains[axis.id].domain;
    if (isBandScaleConfig(axis) || isPointScaleConfig(axis)) {
      filteredDomains[axis.id] = domain;
      return;
    }
    const zoom = zoomMap?.get(axis.id);
    const zoomOption = zoomOptions?.[axis.id];
    const filter2 = zoom === void 0 && !zoomOption ? getFilters : void 0;
    if (!filter2) {
      filteredDomains[axis.id] = domain;
      return;
    }
    const rawTickNumber = domains[axis.id].tickNumber;
    const axisExtrema = getAxisExtrema(axis, "x", seriesConfig, axisIndex, formattedSeries, filter2);
    filteredDomains[axis.id] = calculateFinalDomain(axis, "x", axisIndex, formattedSeries, axisExtrema, rawTickNumber, preferStrictDomainInLineCharts);
  });
  return filteredDomains;
});
var selectorChartFilteredYDomains = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartZoomAxisFilters, selectorPreferStrictDomainInLineCharts, selectorChartYAxisWithDomains, function selectorChartFilteredYDomains2(formattedSeries, seriesConfig, zoomMap, zoomOptions, getFilters, preferStrictDomainInLineCharts, {
  axes,
  domains
}) {
  const filteredDomains = {};
  axes?.forEach((axis, axisIndex) => {
    const domain = domains[axis.id].domain;
    if (isBandScaleConfig(axis) || isPointScaleConfig(axis)) {
      filteredDomains[axis.id] = domain;
      return;
    }
    const zoom = zoomMap?.get(axis.id);
    const zoomOption = zoomOptions?.[axis.id];
    const filter2 = zoom === void 0 && !zoomOption ? getFilters : void 0;
    if (!filter2) {
      filteredDomains[axis.id] = domain;
      return;
    }
    const rawTickNumber = domains[axis.id].tickNumber;
    const axisExtrema = getAxisExtrema(axis, "y", seriesConfig, axisIndex, formattedSeries, filter2);
    filteredDomains[axis.id] = calculateFinalDomain(axis, "y", axisIndex, formattedSeries, axisExtrema, rawTickNumber, preferStrictDomainInLineCharts);
  });
  return filteredDomains;
});
var selectorChartNormalizedXScales = createSelectorMemoized(selectorChartRawXAxis, selectorChartFilteredXDomains, function selectorChartNormalizedXScales2(axes, filteredDomains) {
  const scales = {};
  axes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const domain = filteredDomains[axis.id];
    scales[axis.id] = getNormalizedAxisScale(axis, domain);
  });
  return scales;
});
var selectorChartNormalizedYScales = createSelectorMemoized(selectorChartRawYAxis, selectorChartFilteredYDomains, function selectorChartNormalizedYScales2(axes, filteredDomains) {
  const scales = {};
  axes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const domain = filteredDomains[axis.id];
    scales[axis.id] = getNormalizedAxisScale(axis, domain);
  });
  return scales;
});
var selectorChartXScales = createSelectorMemoized(selectorChartRawXAxis, selectorChartNormalizedXScales, selectorChartDrawingArea, selectorChartZoomMap, function selectorChartXScales2(axes, normalizedScales, drawingArea, zoomMap) {
  const scales = {};
  axes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const zoom = zoomMap?.get(axis.id);
    const zoomRange = zoom ? [zoom.start, zoom.end] : [0, 100];
    const range2 = getRange2(drawingArea, "x", axis);
    const scale = normalizedScales[axis.id].copy();
    const zoomedRange = zoomScaleRange(range2, zoomRange);
    scale.range(zoomedRange);
    scales[axis.id] = scale;
  });
  return scales;
});
var selectorChartYScales = createSelectorMemoized(selectorChartRawYAxis, selectorChartNormalizedYScales, selectorChartDrawingArea, selectorChartZoomMap, function selectorChartYScales2(axes, normalizedScales, drawingArea, zoomMap) {
  const scales = {};
  axes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const zoom = zoomMap?.get(axis.id);
    const zoomRange = zoom ? [zoom.start, zoom.end] : [0, 100];
    const range2 = getRange2(drawingArea, "y", axis);
    const scale = normalizedScales[axis.id].copy();
    const scaleRange = isOrdinalScale(scale) ? range2.reverse() : range2;
    const zoomedRange = zoomScaleRange(scaleRange, zoomRange);
    scale.range(zoomedRange);
    scales[axis.id] = scale;
  });
  return scales;
});
var selectorChartXAxis = createSelectorMemoized(selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartXAxisWithDomains, selectorChartXScales, function selectorChartXAxis2(drawingArea, formattedSeries, seriesConfig, zoomMap, {
  axes,
  domains
}, scales) {
  return computeAxisValue({
    scales,
    drawingArea,
    formattedSeries,
    axis: axes,
    seriesConfig,
    axisDirection: "x",
    zoomMap,
    domains
  });
});
var selectorChartYAxis = createSelectorMemoized(selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartYAxisWithDomains, selectorChartYScales, function selectorChartYAxis2(drawingArea, formattedSeries, seriesConfig, zoomMap, {
  axes,
  domains
}, scales) {
  return computeAxisValue({
    scales,
    drawingArea,
    formattedSeries,
    axis: axes,
    seriesConfig,
    axisDirection: "y",
    zoomMap,
    domains
  });
});
var selectorChartAxis = createSelector2(selectorChartXAxis, selectorChartYAxis, (xAxes, yAxes, axisId) => xAxes?.axis[axisId] ?? yAxes?.axis[axisId]);
var selectorChartRawAxis = createSelector2(selectorChartRawXAxis, selectorChartRawYAxis, (xAxes, yAxes, axisId) => {
  const axis = xAxes?.find((a2) => a2.id === axisId) ?? yAxes?.find((a2) => a2.id === axisId) ?? null;
  if (!axis) {
    return void 0;
  }
  return axis;
});
var selectorChartDefaultXAxisId = createSelector2(selectorChartRawXAxis, (xAxes) => xAxes[0].id);
var selectorChartDefaultYAxisId = createSelector2(selectorChartRawYAxis, (yAxes) => yAxes[0].id);
var EMPTY_MAP = /* @__PURE__ */ new Map();
var selectorChartSeriesEmptyFlatbushMap = () => EMPTY_MAP;
var selectorChartSeriesFlatbushMap = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartNormalizedXScales, selectorChartNormalizedYScales, selectorChartDefaultXAxisId, selectorChartDefaultYAxisId, function selectChartSeriesFlatbushMap(allSeries, xAxesScaleMap, yAxesScaleMap, defaultXAxisId, defaultYAxisId) {
  const validSeries = allSeries.scatter;
  const flatbushMap = /* @__PURE__ */ new Map();
  if (!validSeries) {
    return flatbushMap;
  }
  validSeries.seriesOrder.forEach((seriesId) => {
    const {
      data,
      xAxisId = defaultXAxisId,
      yAxisId = defaultYAxisId
    } = validSeries.series[seriesId];
    const flatbush = new Flatbush(data.length);
    const originalXScale = xAxesScaleMap[xAxisId];
    const originalYScale = yAxesScaleMap[yAxisId];
    for (const datum of data) {
      flatbush.add(originalXScale(datum.x), originalYScale(datum.y));
    }
    flatbush.finish();
    flatbushMap.set(seriesId, flatbush);
  });
  return flatbushMap;
});

// node_modules/@mui/x-internals/esm/fastObjectShallowCompare/fastObjectShallowCompare.js
var is = Object.is;
function fastObjectShallowCompare(a2, b) {
  if (a2 === b) {
    return true;
  }
  if (!(a2 instanceof Object) || !(b instanceof Object)) {
    return false;
  }
  let aLength = 0;
  let bLength = 0;
  for (const key in a2) {
    aLength += 1;
    if (!is(a2[key], b[key])) {
      return false;
    }
    if (!(key in b)) {
      return false;
    }
  }
  for (const _ in b) {
    bLength += 1;
  }
  return aLength === bLength;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/useChartInteraction.js
var useChartInteraction = ({
  store
}) => {
  const cleanInteraction = useEventCallback_default(function cleanInteraction2() {
    store.set("interaction", _extends({}, store.state.interaction, {
      pointer: null,
      item: null
    }));
  });
  const removeItemInteraction = useEventCallback_default(function removeItemInteraction2(itemToRemove) {
    const prevItem = store.state.interaction.item;
    if (!itemToRemove) {
      if (prevItem !== null) {
        store.set("interaction", _extends({}, store.state.interaction, {
          item: null
        }));
      }
      return;
    }
    if (prevItem === null || Object.keys(itemToRemove).some((key) => itemToRemove[key] !== prevItem[key])) {
      return;
    }
    store.set("interaction", _extends({}, store.state.interaction, {
      item: null
    }));
  });
  const setItemInteraction = useEventCallback_default(function setItemInteraction2(newItem, context) {
    if (!fastObjectShallowCompare(store.state.interaction.item, newItem)) {
      store.set("interaction", _extends({}, store.state.interaction, {
        lastUpdate: context.interaction,
        item: newItem
      }));
    }
  });
  const setPointerCoordinate = useEventCallback_default(function setPointerCoordinate2(coordinate) {
    store.set("interaction", _extends({}, store.state.interaction, {
      pointer: coordinate,
      lastUpdate: coordinate !== null ? "pointer" : store.state.interaction.lastUpdate
    }));
  });
  return {
    instance: {
      cleanInteraction,
      setItemInteraction,
      removeItemInteraction,
      setPointerCoordinate
    }
  };
};
useChartInteraction.getInitialState = () => ({
  interaction: {
    item: null,
    pointer: null,
    lastUpdate: "pointer"
  }
});
useChartInteraction.params = {};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartKeyboardNavigation/useChartKeyboardNavigation.selectors.js
var selectKeyboardNavigation = (state) => state.keyboardNavigation;
var selectorChartsItemIsFocused = createSelector2(selectKeyboardNavigation, (keyboardNavigationState, item) => {
  return keyboardNavigationState?.item != null && keyboardNavigationState.item.type === item.seriesType && keyboardNavigationState.item.seriesId === item.seriesId && keyboardNavigationState.item.dataIndex === item.dataIndex;
});
var selectorChartsHasFocusedItem = createSelector2(selectKeyboardNavigation, (keyboardNavigationState) => keyboardNavigationState?.item != null);
var selectorChartsFocusedSeriesType = createSelector2(selectKeyboardNavigation, (keyboardNavigationState) => keyboardNavigationState?.item?.type);
var selectorChartsFocusedSeriesId = createSelector2(selectKeyboardNavigation, (keyboardNavigationState) => keyboardNavigationState?.item?.seriesId);
var selectorChartsFocusedDataIndex = createSelector2(selectKeyboardNavigation, (keyboardNavigationState) => keyboardNavigationState?.item?.dataIndex);
var selectorChartsIsKeyboardNavigationEnabled = createSelector2(selectKeyboardNavigation, (keyboardNavigationState) => !!keyboardNavigationState?.enableKeyboardNavigation);
var createSelectAxisHighlight = (direction) => (type, seriesId, dataIndex, axis, series) => {
  if (type === void 0 || seriesId === void 0 || dataIndex === void 0) {
    return void 0;
  }
  const seriesConfig = series[type]?.series[seriesId];
  if (!seriesConfig) {
    return void 0;
  }
  let axisId = direction === "x" ? "xAxisId" in seriesConfig && seriesConfig.xAxisId : "yAxisId" in seriesConfig && seriesConfig.yAxisId;
  if (axisId === void 0 || axisId === false) {
    axisId = axis.axisIds[0];
  }
  return {
    axisId,
    dataIndex
  };
};
var selectorChartsKeyboardXAxisIndex = createSelector2(selectorChartsFocusedSeriesType, selectorChartsFocusedSeriesId, selectorChartsFocusedDataIndex, selectorChartXAxis, selectorChartSeriesProcessed, createSelectAxisHighlight("x"));
var selectorChartsKeyboardYAxisIndex = createSelector2(selectorChartsFocusedSeriesType, selectorChartsFocusedSeriesId, selectorChartsFocusedDataIndex, selectorChartYAxis, selectorChartSeriesProcessed, createSelectAxisHighlight("y"));
var selectorChartsKeyboardItem = createSelector2(selectKeyboardNavigation, function selectorChartsKeyboardItem2(keyboardState) {
  if (keyboardState?.item == null) {
    return null;
  }
  const {
    type,
    seriesId
  } = keyboardState.item;
  if (type === void 0 || seriesId === void 0) {
    return null;
  }
  return keyboardState.item;
});
var selectorChartsKeyboardItemIsDefined = createSelector2(selectorChartsFocusedSeriesType, selectorChartsFocusedSeriesId, selectorChartsFocusedDataIndex, function selectorChartsKeyboardItemIsDefined2(seriesType, seriesId, dataIndex) {
  return seriesId !== void 0 && dataIndex !== void 0;
});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartKeyboardNavigation/useChartKeyboardNavigation.js
var React6 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartKeyboardNavigation/isFocusableSeriesType.js
var FOCUSABLE_SERIES_TYPES = /* @__PURE__ */ new Set(["bar", "line", "scatter", "pie"]);
function isFocusableSeriesType(type) {
  return FOCUSABLE_SERIES_TYPES.has(type);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartKeyboardNavigation/useChartKeyboardNavigation.helpers.js
function getNextSeriesWithData(series, type, seriesId) {
  const seriesType = Object.keys(series);
  const startingTypeIndex = type !== void 0 && series[type] ? seriesType.indexOf(type) : 0;
  const currentSeriesIndex = type !== void 0 && seriesId !== void 0 && series[type] && series[type].series[seriesId] ? series[type].seriesOrder.indexOf(seriesId) : -1;
  const typesAvailable = seriesType.filter(isFocusableSeriesType);
  for (let typeGap = 0; typeGap < typesAvailable.length; typeGap += 1) {
    const typeIndex2 = (startingTypeIndex + typeGap) % typesAvailable.length;
    const seriesOfType2 = series[typesAvailable[typeIndex2]];
    const startingSeriesIndex = typeGap === 0 ? currentSeriesIndex + 1 : 0;
    for (let seriesIndex = startingSeriesIndex; seriesIndex < seriesOfType2.seriesOrder.length; seriesIndex += 1) {
      if (seriesOfType2.series[seriesOfType2.seriesOrder[seriesIndex]].data.length > 0) {
        return {
          type: typesAvailable[typeIndex2],
          seriesId: seriesOfType2.seriesOrder[seriesIndex]
        };
      }
    }
  }
  const typeIndex = startingTypeIndex;
  const seriesOfType = series[typesAvailable[typeIndex]];
  const endingSeriesIndex = currentSeriesIndex;
  for (let seriesIndex = 0; seriesIndex < endingSeriesIndex; seriesIndex += 1) {
    if (seriesOfType.series[seriesOfType.seriesOrder[seriesIndex]].data.length > 0) {
      return {
        type: typesAvailable[typeIndex],
        seriesId: seriesOfType.seriesOrder[seriesIndex]
      };
    }
  }
  return null;
}
function getPreviousSeriesWithData(series, type, seriesId) {
  const seriesType = Object.keys(series);
  const startingTypeIndex = type !== void 0 && series[type] ? seriesType.indexOf(type) : 0;
  const startingSeriesIndex = type !== void 0 && seriesId !== void 0 && series[type] && series[type].series[seriesId] ? series[type].seriesOrder.indexOf(seriesId) : 1;
  const typesAvailable = seriesType.filter(isFocusableSeriesType);
  for (let typeGap = 0; typeGap < typesAvailable.length; typeGap += 1) {
    const typeIndex2 = (typesAvailable.length + startingTypeIndex - typeGap) % typesAvailable.length;
    const seriesOfType2 = series[typesAvailable[typeIndex2]];
    const maxGap = typeGap === 0 ? startingSeriesIndex + 1 : seriesOfType2.seriesOrder.length;
    for (let seriesGap = 1; seriesGap < maxGap; seriesGap += 1) {
      const seriesIndex = (seriesOfType2.seriesOrder.length + startingSeriesIndex - seriesGap) % seriesOfType2.seriesOrder.length;
      if (seriesOfType2.series[seriesOfType2.seriesOrder[seriesIndex]].data.length > 0) {
        return {
          type: typesAvailable[typeIndex2],
          seriesId: seriesOfType2.seriesOrder[seriesIndex]
        };
      }
    }
  }
  const typeIndex = startingTypeIndex;
  const seriesOfType = series[typesAvailable[typeIndex]];
  const availableSeriesIds = seriesOfType.seriesOrder;
  for (let seriesIndex = availableSeriesIds.length - 1; seriesIndex > startingSeriesIndex; seriesIndex -= 1) {
    if (seriesOfType.series[seriesOfType.seriesOrder[seriesIndex]].data.length > 0) {
      return {
        type: typesAvailable[typeIndex],
        seriesId: seriesOfType.seriesOrder[seriesIndex]
      };
    }
  }
  return null;
}
function seriesHasData(series, type, seriesId) {
  if (type === "sankey") {
    return false;
  }
  const data = series[type]?.series[seriesId]?.data;
  return data && data.length > 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartKeyboardNavigation/useChartKeyboardNavigation.js
function getNextIndexFocusedItem(state) {
  const processedSeries = selectorChartSeriesProcessed(state);
  let {
    type,
    seriesId
  } = state.keyboardNavigation.item ?? {};
  if (type === void 0 || // @ts-ignore sankey is not in MIT version
  type === "sankey" || seriesId === void 0 || !seriesHasData(processedSeries, type, seriesId)) {
    const nextSeries = getNextSeriesWithData(processedSeries, type, seriesId);
    if (nextSeries === null) {
      return null;
    }
    type = nextSeries.type;
    seriesId = nextSeries.seriesId;
  }
  const dataLength = processedSeries[type].series[seriesId].data.length;
  return {
    type,
    seriesId,
    dataIndex: ((state.keyboardNavigation.item?.dataIndex ?? -1) + 1) % dataLength
  };
}
function getPreviousIndexFocusedItem(state) {
  const processedSeries = selectorChartSeriesProcessed(state);
  let {
    type,
    seriesId
  } = state.keyboardNavigation.item ?? {};
  if (type === void 0 || // @ts-ignore sankey is not in MIT version
  type === "sankey" || seriesId === void 0 || !seriesHasData(processedSeries, type, seriesId)) {
    const previousSeries = getPreviousSeriesWithData(processedSeries, type, seriesId);
    if (previousSeries === null) {
      return null;
    }
    type = previousSeries.type;
    seriesId = previousSeries.seriesId;
  }
  const dataLength = processedSeries[type].series[seriesId].data.length;
  return {
    type,
    seriesId,
    dataIndex: (dataLength + (state.keyboardNavigation.item?.dataIndex ?? 1) - 1) % dataLength
  };
}
function getNextSeriesFocusedItem(state) {
  const processedSeries = selectorChartSeriesProcessed(state);
  let {
    type,
    seriesId
  } = state.keyboardNavigation.item ?? {};
  const nextSeries = getNextSeriesWithData(processedSeries, type, seriesId);
  if (nextSeries === null) {
    return null;
  }
  type = nextSeries.type;
  seriesId = nextSeries.seriesId;
  const dataLength = processedSeries[type].series[seriesId].data.length;
  return {
    type,
    seriesId,
    dataIndex: Math.min(dataLength - 1, state.keyboardNavigation.item?.dataIndex ?? 0)
  };
}
function getPreviousSeriesFocusedItem(state) {
  const processedSeries = selectorChartSeriesProcessed(state);
  let {
    type,
    seriesId
  } = state.keyboardNavigation.item ?? {};
  const previousSeries = getPreviousSeriesWithData(processedSeries, type, seriesId);
  if (previousSeries === null) {
    return null;
  }
  type = previousSeries.type;
  seriesId = previousSeries.seriesId;
  const dataLength = processedSeries[type].series[seriesId].data.length;
  return {
    type,
    seriesId,
    dataIndex: Math.min(dataLength - 1, state.keyboardNavigation.item?.dataIndex ?? 0)
  };
}
var useChartKeyboardNavigation = ({
  params,
  store,
  svgRef
}) => {
  const removeFocus = useEventCallback_default(function removeFocus2() {
    if (store.state.keyboardNavigation.item !== null) {
      store.set("keyboardNavigation", _extends({}, store.state.keyboardNavigation, {
        item: null
      }));
    }
  });
  React6.useEffect(() => {
    const element = svgRef.current;
    if (!element || !params.enableKeyboardNavigation) {
      return void 0;
    }
    function keyboardHandler(event) {
      let newFocusedItem = store.state.keyboardNavigation.item;
      switch (event.key) {
        case "ArrowRight":
          newFocusedItem = getNextIndexFocusedItem(store.state);
          break;
        case "ArrowLeft":
          newFocusedItem = getPreviousIndexFocusedItem(store.state);
          break;
        case "ArrowDown": {
          newFocusedItem = getPreviousSeriesFocusedItem(store.state);
          break;
        }
        case "ArrowUp": {
          newFocusedItem = getNextSeriesFocusedItem(store.state);
          break;
        }
        default:
          break;
      }
      if (newFocusedItem !== store.state.keyboardNavigation.item) {
        event.preventDefault();
        store.update(_extends({}, store.state.highlight && {
          highlight: _extends({}, store.state.highlight, {
            lastUpdate: "keyboard"
          })
        }, store.state.interaction && {
          interaction: _extends({}, store.state.interaction, {
            lastUpdate: "keyboard"
          })
        }, {
          keyboardNavigation: _extends({}, store.state.keyboardNavigation, {
            item: newFocusedItem
          })
        }));
      }
    }
    element.addEventListener("keydown", keyboardHandler);
    element.addEventListener("blur", removeFocus);
    return () => {
      element.removeEventListener("keydown", keyboardHandler);
      element.removeEventListener("blur", removeFocus);
    };
  }, [svgRef, removeFocus, params.enableKeyboardNavigation, store]);
  useEnhancedEffect_default(() => {
    if (store.state.keyboardNavigation.enableKeyboardNavigation !== params.enableKeyboardNavigation) {
      store.set("keyboardNavigation", _extends({}, store.state.keyboardNavigation, {
        enableKeyboardNavigation: !!params.enableKeyboardNavigation
      }));
    }
  }, [store, params.enableKeyboardNavigation]);
  return {};
};
useChartKeyboardNavigation.getInitialState = (params) => ({
  keyboardNavigation: {
    item: null,
    enableKeyboardNavigation: !!params.enableKeyboardNavigation
  }
});
useChartKeyboardNavigation.params = {
  enableKeyboardNavigation: true
};

// node_modules/@mui/x-charts/esm/internals/angleConversion.js
var deg2rad = (value, defaultRad) => {
  if (value === void 0) {
    return defaultRad;
  }
  return Math.PI * value / 180;
};
var rad2deg = (value, defaultDeg) => {
  if (value === void 0) {
    return defaultDeg;
  }
  return 180 * value / Math.PI;
};

// node_modules/@mui/x-charts/esm/internals/isPolar.js
function isPolarSeriesType(seriesType) {
  return polarSeriesTypes.getTypes().has(seriesType);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisExtremum.js
var axisExtremumCallback2 = (acc, chartType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries) => {
  const getter = axisDirection === "rotation" ? seriesConfig[chartType].rotationExtremumGetter : seriesConfig[chartType].radiusExtremumGetter;
  const series = formattedSeries[chartType]?.series ?? {};
  const [minChartTypeData, maxChartTypeData] = getter?.({
    series,
    axis,
    axisIndex,
    isDefaultAxis: axisIndex === 0
  }) ?? [Infinity, -Infinity];
  const [minData, maxData] = acc;
  return [Math.min(minChartTypeData, minData), Math.max(maxChartTypeData, maxData)];
};
var getAxisExtremum = (axis, axisDirection, seriesConfig, axisIndex, formattedSeries) => {
  const polarSeriesTypes2 = Object.keys(seriesConfig).filter(isPolarSeriesType);
  const extremums = polarSeriesTypes2.reduce((acc, charType) => axisExtremumCallback2(acc, charType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries), [Infinity, -Infinity]);
  if (Number.isNaN(extremums[0]) || Number.isNaN(extremums[1])) {
    return [Infinity, -Infinity];
  }
  return extremums;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisTriggerTooltip.js
var getAxisTriggerTooltip2 = (axisDirection, seriesConfig, formattedSeries, defaultAxisId) => {
  const tooltipAxesIds = /* @__PURE__ */ new Set();
  const chartTypes = Object.keys(seriesConfig).filter(isPolarSeriesType);
  chartTypes.forEach((chartType) => {
    const series = formattedSeries[chartType]?.series ?? {};
    const tooltipAxes = seriesConfig[chartType].axisTooltipGetter?.(series);
    if (tooltipAxes === void 0) {
      return;
    }
    tooltipAxes.forEach(({
      axisId,
      direction
    }) => {
      if (direction === axisDirection) {
        tooltipAxesIds.add(axisId ?? defaultAxisId);
      }
    });
  });
  return tooltipAxesIds;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/computeAxisValue.js
function getRange3(drawingArea, axisDirection, axis) {
  if (axisDirection === "rotation") {
    if (axis.scaleType === "point") {
      const angles = [deg2rad(axis.startAngle, 0), deg2rad(axis.endAngle, 2 * Math.PI)];
      const diff = angles[1] - angles[0];
      if (diff > Math.PI * 2 - 0.1) {
        angles[1] -= diff / axis.data.length;
      }
      return angles;
    }
    return [deg2rad(axis.startAngle, 0), deg2rad(axis.endAngle, 2 * Math.PI)];
  }
  return [0, Math.min(drawingArea.height, drawingArea.width) / 2];
}
var DEFAULT_CATEGORY_GAP_RATIO3 = 0.2;
var DEFAULT_BAR_GAP_RATIO2 = 0.1;
function computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis: allAxis,
  seriesConfig,
  axisDirection
}) {
  if (allAxis === void 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const axisIdsTriggeringTooltip = getAxisTriggerTooltip2(axisDirection, seriesConfig, formattedSeries, allAxis[0].id);
  const completeAxis = {};
  allAxis.forEach((eachAxis, axisIndex) => {
    const axis = eachAxis;
    const range2 = getRange3(drawingArea, axisDirection, axis);
    const [minData, maxData] = getAxisExtremum(axis, axisDirection, seriesConfig, axisIndex, formattedSeries);
    const triggerTooltip = !axis.ignoreTooltip && axisIdsTriggeringTooltip.has(axis.id);
    const data = axis.data ?? [];
    if (isBandScaleConfig(axis)) {
      const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO3;
      const barGapRatio = axis.barGapRatio ?? DEFAULT_BAR_GAP_RATIO2;
      completeAxis[axis.id] = _extends({
        offset: 0,
        categoryGapRatio,
        barGapRatio,
        triggerTooltip
      }, axis, {
        data,
        scale: scaleBand(axis.data, range2).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis.data, range2, axis.tickNumber);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (isPointScaleConfig(axis)) {
      completeAxis[axis.id] = _extends({
        offset: 0,
        triggerTooltip
      }, axis, {
        data,
        scale: scalePoint(axis.data, range2),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis.data, range2, axis.tickNumber);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (!isContinuousScaleConfig(axis)) {
      return;
    }
    const scaleType = axis.scaleType ?? "linear";
    const domainLimit = axis.domainLimit ?? "nice";
    const axisExtremums = [axis.min ?? minData, axis.max ?? maxData];
    if (typeof domainLimit === "function") {
      const {
        min: min3,
        max: max3
      } = domainLimit(minData, maxData);
      axisExtremums[0] = min3;
      axisExtremums[1] = max3;
    }
    const rawTickNumber = getTickNumber(axis, axisExtremums, getDefaultTickNumber(Math.abs(range2[1] - range2[0])));
    const tickNumber = scaleTickNumberByRange(rawTickNumber, range2);
    const scale = getScale(scaleType, axisExtremums, range2);
    const finalScale = domainLimit === "nice" ? scale.nice(rawTickNumber) : scale;
    const [minDomain, maxDomain] = finalScale.domain();
    const domain = [axis.min ?? minDomain, axis.max ?? maxDomain];
    completeAxis[axis.id] = _extends({
      offset: 0,
      triggerTooltip
    }, axis, {
      data,
      scaleType,
      scale: finalScale.domain(domain),
      tickNumber,
      colorScale: axis.colorMap && getColorScale(axis.colorMap)
    });
  });
  return {
    axis: completeAxis,
    axisIds: allAxis.map(({
      id
    }) => id)
  };
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.selectors.js
var selectorChartPolarAxisState = (state) => state.polarAxis;
var selectorChartRawRotationAxis = createSelector2(selectorChartPolarAxisState, (axis) => axis?.rotation);
var selectorChartRawRadiusAxis = createSelector2(selectorChartPolarAxisState, (axis) => axis?.radius);
var selectorChartRotationAxis = createSelectorMemoized(selectorChartRawRotationAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, (axis, drawingArea, formattedSeries, seriesConfig) => computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig,
  axisDirection: "rotation"
}));
var selectorChartRadiusAxis = createSelectorMemoized(selectorChartRawRadiusAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, (axis, drawingArea, formattedSeries, seriesConfig) => computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig,
  axisDirection: "radius"
}));
function getDrawingAreaCenter(drawingArea) {
  return {
    cx: drawingArea.left + drawingArea.width / 2,
    cy: drawingArea.top + drawingArea.height / 2
  };
}
var selectorChartPolarCenter = createSelectorMemoized(selectorChartDrawingArea, getDrawingAreaCenter);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/useChartInteraction.selectors.js
var selectInteraction = (state) => state.interaction;
var selectorChartsInteractionIsInitialized = createSelector2(selectInteraction, (interaction) => interaction !== void 0);
var selectorChartsInteractionItem = createSelector2(selectInteraction, (interaction) => interaction?.item ?? null);
var selectorChartsInteractionPointer = createSelector2(selectInteraction, (interaction) => interaction?.pointer ?? null);
var selectorChartsInteractionPointerX = createSelector2(selectorChartsInteractionPointer, (pointer) => pointer && pointer.x);
var selectorChartsInteractionPointerY = createSelector2(selectorChartsInteractionPointer, (pointer) => pointer && pointer.y);
var selectorChartsInteractionItemIsDefined = createSelector2(selectorChartsInteractionItem, (item) => item !== null);
var selectorChartsLastInteraction = createSelector2(selectInteraction, (interaction) => interaction?.lastUpdate);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/useChartTooltip.selectors.js
var selectorChartsTooltipItem = createSelector2(selectorChartsLastInteraction, selectorChartsInteractionItem, selectorChartsKeyboardItem, (lastInteraction, interactionItem, keyboardItem) => lastInteraction === "keyboard" ? keyboardItem : interactionItem ?? null);
var selectorChartsTooltipItemIsDefined = createSelector2(selectorChartsLastInteraction, selectorChartsInteractionItemIsDefined, selectorChartsKeyboardItemIsDefined, (lastInteraction, interactionItemIsDefined, keyboardItemIsDefined) => lastInteraction === "keyboard" ? keyboardItemIsDefined : interactionItemIsDefined);
var selectorChartsTooltipAxisConfig = createSelectorMemoized(selectorChartsTooltipItem, selectorChartXAxis, selectorChartYAxis, selectorChartRotationAxis, selectorChartRadiusAxis, selectorChartSeriesProcessed, function selectorChartsTooltipAxisConfig2(identifier, {
  axis: xAxis,
  axisIds: xAxisIds
}, {
  axis: yAxis,
  axisIds: yAxisIds
}, rotationAxes, radiusAxes, series) {
  if (!identifier) {
    return {};
  }
  const itemSeries = series[identifier.type]?.series[identifier.seriesId];
  if (!itemSeries) {
    return {};
  }
  const axesConfig = {
    rotationAxes,
    radiusAxes
  };
  const xAxisId = isCartesianSeries(itemSeries) ? itemSeries.xAxisId ?? xAxisIds[0] : void 0;
  const yAxisId = isCartesianSeries(itemSeries) ? itemSeries.yAxisId ?? yAxisIds[0] : void 0;
  if (xAxisId !== void 0) {
    axesConfig.x = xAxis[xAxisId];
  }
  if (yAxisId !== void 0) {
    axesConfig.y = yAxis[yAxisId];
  }
  return axesConfig;
});
var selectorChartsTooltipItemPosition = createSelectorMemoized(selectorChartsTooltipItem, selectorChartDrawingArea, selectorChartSeriesConfig, selectorChartSeriesProcessed, selectorChartSeriesLayout, selectorChartsTooltipAxisConfig, function selectorChartsTooltipItemPosition2(identifier, drawingArea, seriesConfig, series, seriesLayout, axesConfig, placement = "top") {
  if (!identifier) {
    return null;
  }
  const itemSeries = series[identifier.type]?.series[identifier.seriesId];
  if (!itemSeries) {
    return null;
  }
  return seriesConfig[itemSeries.type].tooltipItemPositionGetter?.({
    series,
    seriesLayout,
    drawingArea,
    axesConfig,
    identifier,
    placement
  }) ?? null;
});

// node_modules/@mui/x-internals/esm/useAssertModelConsistency/useAssertModelConsistency.js
var React7 = __toESM(require_react(), 1);
function useAssertModelConsistencyOutsideOfProduction(parameters) {
  const {
    componentName,
    propName,
    controlled,
    defaultValue,
    warningPrefix = "MUI X"
  } = parameters;
  const [{
    initialDefaultValue,
    isControlled
  }] = React7.useState({
    initialDefaultValue: defaultValue,
    isControlled: controlled !== void 0
  });
  if (isControlled !== (controlled !== void 0)) {
    warnOnce([`${warningPrefix}: A component is changing the ${isControlled ? "" : "un"}controlled ${propName} state of ${componentName} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${propName} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"], "error");
  }
  if (JSON.stringify(initialDefaultValue) !== JSON.stringify(defaultValue)) {
    warnOnce([`${warningPrefix}: A component is changing the default ${propName} state of an uncontrolled ${componentName} after being initialized. To suppress this warning opt to use a controlled ${componentName}.`], "error");
  }
}
var useAssertModelConsistency = false ? () => {
} : useAssertModelConsistencyOutsideOfProduction;

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/useChartHighlight.js
var useChartHighlight = ({
  store,
  params
}) => {
  useAssertModelConsistency({
    warningPrefix: "MUI X Charts",
    componentName: "Chart",
    propName: "highlightedItem",
    controlled: params.highlightedItem,
    defaultValue: null
  });
  useEnhancedEffect_default(() => {
    if (store.state.highlight.item !== params.highlightedItem) {
      store.set("highlight", _extends({}, store.state.highlight, {
        item: params.highlightedItem
      }));
    }
    if (true) {
      if (params.highlightedItem !== void 0 && !store.state.highlight.isControlled) {
        warnOnce(["MUI X Charts: The `highlightedItem` switched between controlled and uncontrolled state.", "To remove the highlight when using controlled state, you must provide `null` to the `highlightedItem` prop instead of `undefined`."].join("\n"));
      }
    }
  }, [store, params.highlightedItem]);
  const clearHighlight = useEventCallback_default(() => {
    params.onHighlightChange?.(null);
    const prevHighlight = store.getSnapshot().highlight;
    if (prevHighlight.item === null || prevHighlight.isControlled) {
      return;
    }
    store.set("highlight", {
      item: null,
      lastUpdate: "pointer",
      isControlled: false
    });
  });
  const setHighlight = useEventCallback_default((newItem) => {
    const prevHighlight = store.getSnapshot().highlight;
    if (prevHighlight.isControlled || fastObjectShallowCompare(prevHighlight.item, newItem)) {
      return;
    }
    params.onHighlightChange?.(newItem);
    store.set("highlight", {
      item: newItem,
      lastUpdate: "pointer",
      isControlled: false
    });
  });
  return {
    instance: {
      clearHighlight,
      setHighlight
    }
  };
};
useChartHighlight.getInitialState = (params) => ({
  highlight: {
    item: params.highlightedItem,
    lastUpdate: "pointer",
    isControlled: params.highlightedItem !== void 0
  }
});
useChartHighlight.params = {
  highlightedItem: true,
  onHighlightChange: true
};

// node_modules/@mui/x-charts/esm/internals/getSeriesColorFn.js
function getSeriesColorFn(series) {
  return series.colorGetter ? series.colorGetter : () => series.color;
}

// node_modules/@mui/x-charts/esm/internals/clampAngle.js
function clampAngle(angle) {
  return (angle % 360 + 360) % 360;
}
var TWO_PI = 2 * Math.PI;
function clampAngleRad(angle) {
  return (angle % TWO_PI + TWO_PI) % TWO_PI;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.js
var React8 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/defaultizeAxis.js
function defaultizeAxis(inAxis, dataset, axisName) {
  const DEFAULT_AXIS_KEY = axisName === "rotation" ? DEFAULT_ROTATION_AXIS_KEY : DEFAULT_RADIUS_AXIS_KEY;
  const inputAxes = inAxis && inAxis.length > 0 ? inAxis : [{
    id: DEFAULT_AXIS_KEY
  }];
  return inputAxes.map((axisConfig, index2) => {
    const id = `defaultized-${axisName}-axis-${index2}`;
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return _extends({
        id
      }, axisConfig);
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: ${axisName}-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({
      id,
      data: dataset.map((d) => d[dataKey])
    }, axisConfig);
  });
}

// node_modules/@mui/x-charts/esm/internals/getSVGPoint.js
function getSVGPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/coordinateTransformation.js
var generateSvg2rotation = (center) => (x2, y2) => Math.atan2(x2 - center.cx, center.cy - y2);
var generateSvg2polar = (center) => (x2, y2) => {
  const angle = Math.atan2(x2 - center.cx, center.cy - y2);
  return [Math.sqrt((x2 - center.cx) ** 2 + (center.cy - y2) ** 2), angle];
};
var generatePolar2svg = (center) => (radius, rotation) => {
  return [center.cx + radius * Math.sin(rotation), center.cy - radius * Math.cos(rotation)];
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisIndex.js
function getAxisIndex(axisConfig, pointerValue) {
  const {
    scale,
    data: axisData,
    reverse: reverse2
  } = axisConfig;
  if (!isOrdinalScale(scale)) {
    throw new Error("MUI X Charts: getAxisValue is not implemented for polare continuous axes.");
  }
  if (!axisData) {
    return -1;
  }
  const angleGap = clampAngleRad(pointerValue - Math.min(...scale.range()));
  const dataIndex = scale.bandwidth() === 0 ? Math.floor((angleGap + scale.step() / 2) / scale.step()) % axisData.length : Math.floor(angleGap / scale.step());
  if (dataIndex < 0 || dataIndex >= axisData.length) {
    return -1;
  }
  return reverse2 ? axisData.length - 1 - dataIndex : dataIndex;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/checkHasInteractionPlugin.js
function checkHasInteractionPlugin(instance) {
  return instance.setPointerCoordinate !== void 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.js
var useChartPolarAxis = ({
  params,
  store,
  seriesConfig,
  svgRef,
  instance
}) => {
  const {
    rotationAxis,
    radiusAxis,
    dataset
  } = params;
  if (true) {
    const ids = [...rotationAxis ?? [], ...radiusAxis ?? []].filter((axis) => axis.id).map((axis) => axis.id);
    const duplicates = new Set(ids.filter((id, index2) => ids.indexOf(id) !== index2));
    if (duplicates.size > 0) {
      warnOnce([`MUI X Charts: The following axis ids are duplicated: ${Array.from(duplicates).join(", ")}.`, `Please make sure that each axis has a unique id.`].join("\n"), "error");
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const processedSeries = useSelector(store, selectorChartSeriesProcessed);
  const center = useSelector(store, selectorChartPolarCenter);
  const isInteractionEnabled = useSelector(store, selectorChartsInteractionIsInitialized);
  const {
    axis: rotationAxisWithScale,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  const {
    axis: radiusAxisWithScale,
    axisIds: radiusAxisIds
  } = useSelector(store, selectorChartRadiusAxis);
  const isFirstRender = React8.useRef(true);
  React8.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.set("polarAxis", _extends({}, store.state.polarAxis, {
      rotation: defaultizeAxis(rotationAxis, dataset, "rotation"),
      radius: defaultizeAxis(radiusAxis, dataset, "radius")
    }));
  }, [seriesConfig, drawingArea, rotationAxis, radiusAxis, dataset, store]);
  const svg2rotation = React8.useMemo(() => generateSvg2rotation({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const svg2polar = React8.useMemo(() => generateSvg2polar({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const polar2svg = React8.useMemo(() => generatePolar2svg({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const usedRotationAxisId = rotationAxisIds[0];
  const usedRadiusAxisId = radiusAxisIds[0];
  const mousePosition = React8.useRef({
    isInChart: false
  });
  const hasInteractionPlugin = checkHasInteractionPlugin(instance);
  React8.useEffect(() => {
    const element = svgRef.current;
    if (!isInteractionEnabled || !hasInteractionPlugin || element === null || params.disableAxisListener) {
      return () => {
      };
    }
    const moveEndHandler = instance.addInteractionListener("moveEnd", (event) => {
      if (!event.detail.activeGestures.pan) {
        mousePosition.current.isInChart = false;
        instance.cleanInteraction();
      }
    });
    const panEndHandler = instance.addInteractionListener("panEnd", (event) => {
      if (!event.detail.activeGestures.move) {
        mousePosition.current.isInChart = false;
        instance.cleanInteraction?.();
      }
    });
    const pressEndHandler = instance.addInteractionListener("quickPressEnd", (event) => {
      if (!event.detail.activeGestures.move && !event.detail.activeGestures.pan) {
        mousePosition.current.isInChart = false;
        instance.cleanInteraction?.();
      }
    });
    const gestureHandler = (event) => {
      const srcEvent = event.detail.srcEvent;
      if (event.detail.srcEvent.pointerType === "touch") {
        const svgRect = element.getBoundingClientRect();
        if (srcEvent.clientX < svgRect.left || srcEvent.clientX > svgRect.right || srcEvent.clientY < svgRect.top || srcEvent.clientY > svgRect.bottom) {
          mousePosition.current.isInChart = false;
          instance.cleanInteraction?.();
          return;
        }
        const svgPoint2 = getSVGPoint(element, srcEvent);
        mousePosition.current.isInChart = true;
        instance.setPointerCoordinate?.(svgPoint2);
        return;
      }
      const svgPoint = getSVGPoint(element, srcEvent);
      if (!instance.isPointInside(svgPoint.x, svgPoint.y, event.detail.target)) {
        if (mousePosition.current.isInChart) {
          instance.cleanInteraction?.();
          mousePosition.current.isInChart = false;
        }
        return;
      }
      const radiusSquare = (center.cx - svgPoint.x) ** 2 + (center.cy - svgPoint.y) ** 2;
      const maxRadius = radiusAxisWithScale[usedRadiusAxisId].scale.range()[1];
      if (radiusSquare > maxRadius ** 2) {
        if (mousePosition.current.isInChart) {
          instance.cleanInteraction?.();
          mousePosition.current.isInChart = false;
        }
        return;
      }
      mousePosition.current.isInChart = true;
      instance.setPointerCoordinate?.(svgPoint);
    };
    const moveHandler = instance.addInteractionListener("move", gestureHandler);
    const panHandler = instance.addInteractionListener("pan", gestureHandler);
    const pressHandler = instance.addInteractionListener("quickPress", gestureHandler);
    return () => {
      moveHandler.cleanup();
      moveEndHandler.cleanup();
      panHandler.cleanup();
      panEndHandler.cleanup();
      pressHandler.cleanup();
      pressEndHandler.cleanup();
    };
  }, [svgRef, store, center, radiusAxisWithScale, usedRadiusAxisId, rotationAxisWithScale, usedRotationAxisId, instance, params.disableAxisListener, isInteractionEnabled, svg2rotation, hasInteractionPlugin]);
  React8.useEffect(() => {
    const element = svgRef.current;
    const onAxisClick = params.onAxisClick;
    if (element === null || !onAxisClick) {
      return () => {
      };
    }
    const axisClickHandler = instance.addInteractionListener("tap", (event) => {
      let dataIndex = null;
      let isRotationAxis = false;
      const svgPoint = getSVGPoint(element, event.detail.srcEvent);
      const rotation = generateSvg2rotation(center)(svgPoint.x, svgPoint.y);
      const rotationIndex = getAxisIndex(rotationAxisWithScale[usedRotationAxisId], rotation);
      isRotationAxis = rotationIndex !== -1;
      dataIndex = isRotationAxis ? rotationIndex : null;
      const USED_AXIS_ID = isRotationAxis ? usedRotationAxisId : usedRadiusAxisId;
      if (dataIndex == null || dataIndex === -1) {
        return;
      }
      const axisValue = (isRotationAxis ? rotationAxisWithScale : radiusAxisWithScale)[USED_AXIS_ID].data[dataIndex];
      const seriesValues = {};
      Object.keys(processedSeries).filter((seriesType) => seriesType === "radar").forEach((seriesType) => {
        processedSeries[seriesType]?.seriesOrder.forEach((seriesId) => {
          const seriesItem = processedSeries[seriesType].series[seriesId];
          seriesValues[seriesId] = seriesItem.data[dataIndex];
        });
      });
      onAxisClick(event.detail.srcEvent, {
        dataIndex,
        axisValue,
        seriesValues
      });
    });
    return () => {
      axisClickHandler.cleanup();
    };
  }, [center, instance, params.onAxisClick, processedSeries, radiusAxisWithScale, rotationAxisWithScale, svgRef, usedRadiusAxisId, usedRotationAxisId]);
  return {
    instance: {
      svg2polar,
      svg2rotation,
      polar2svg
    }
  };
};
useChartPolarAxis.params = {
  rotationAxis: true,
  radiusAxis: true,
  dataset: true,
  disableAxisListener: true,
  onAxisClick: true
};
useChartPolarAxis.getInitialState = (params) => ({
  polarAxis: {
    rotation: defaultizeAxis(params.rotationAxis, params.dataset, "rotation"),
    radius: defaultizeAxis(params.radiusAxis, params.dataset, "radius")
  }
});

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartProvider.js
var React21 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/store/useCharts.js
var React12 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartAnimation/useChartAnimation.js
var React9 = __toESM(require_react(), 1);
var useChartAnimation = ({
  params,
  store
}) => {
  React9.useEffect(() => {
    store.set("animation", _extends({}, store.state.animation, {
      skip: params.skipAnimation
    }));
  }, [store, params.skipAnimation]);
  const disableAnimation = React9.useCallback(() => {
    let disableCalled = false;
    store.set("animation", _extends({}, store.state.animation, {
      skipAnimationRequests: store.state.animation.skipAnimationRequests + 1
    }));
    return () => {
      if (disableCalled) {
        return;
      }
      disableCalled = true;
      store.set("animation", _extends({}, store.state.animation, {
        skipAnimationRequests: store.state.animation.skipAnimationRequests - 1
      }));
    };
  }, [store]);
  useEnhancedEffect_default(() => {
    const isAnimationDisabledEnvironment = typeof window === "undefined" || !window?.matchMedia;
    if (isAnimationDisabledEnvironment) {
      return void 0;
    }
    let disableAnimationCleanup;
    const handleMediaChange = (event) => {
      if (event.matches) {
        disableAnimationCleanup = disableAnimation();
      } else {
        disableAnimationCleanup?.();
      }
    };
    const mql = window.matchMedia("(prefers-reduced-motion)");
    handleMediaChange(mql);
    mql.addEventListener("change", handleMediaChange);
    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [disableAnimation, store]);
  return {
    instance: {
      disableAnimation
    }
  };
};
useChartAnimation.params = {
  skipAnimation: true
};
useChartAnimation.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  skipAnimation: params.skipAnimation ?? false
});
useChartAnimation.getInitialState = ({
  skipAnimation
}) => {
  const isAnimationDisabledEnvironment = typeof window === "undefined" || !window?.matchMedia;
  const disableAnimations = false ? isAnimationDisabledEnvironment : false;
  return {
    animation: {
      skip: skipAnimation,
      // By initializing the skipAnimationRequests to 1, we ensure that the animation is always skipped
      skipAnimationRequests: disableAnimations ? 1 : 0
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartAnimation/useChartAnimation.selectors.js
var selectorChartAnimationState = (state) => state.animation;
var selectorChartSkipAnimation = createSelector2(selectorChartAnimationState, (state) => state.skip || state.skipAnimationRequests > 0);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.js
var React10 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.utils.js
var globalChartDefaultId = 0;
var createChartDefaultId = () => {
  globalChartDefaultId += 1;
  return `mui-chart-${globalChartDefaultId}`;
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.js
var useChartId = ({
  params,
  store
}) => {
  React10.useEffect(() => {
    if (params.id === void 0 || params.id === store.state.id.providedChartId && store.state.id.chartId !== void 0) {
      return;
    }
    store.set("id", _extends({}, store.state.id, {
      chartId: params.id ?? createChartDefaultId()
    }));
  }, [store, params.id]);
  return {};
};
useChartId.params = {
  id: true
};
useChartId.getInitialState = ({
  id
}) => ({
  id: {
    chartId: id,
    providedChartId: id
  }
});

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.selectors.js
var selectorChartIdState = (state) => state.id;
var selectorChartId = createSelector2(selectorChartIdState, (idState) => idState.chartId);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartInteractionListener/useChartInteractionListener.js
var React11 = __toESM(require_react(), 1);

// node_modules/@mui/x-internal-gestures/esm/core/utils/eventList.js
var eventList = {
  abort: true,
  animationcancel: true,
  animationend: true,
  animationiteration: true,
  animationstart: true,
  auxclick: true,
  beforeinput: true,
  beforetoggle: true,
  blur: true,
  cancel: true,
  canplay: true,
  canplaythrough: true,
  change: true,
  click: true,
  close: true,
  compositionend: true,
  compositionstart: true,
  compositionupdate: true,
  contextlost: true,
  contextmenu: true,
  contextrestored: true,
  copy: true,
  cuechange: true,
  cut: true,
  dblclick: true,
  drag: true,
  dragend: true,
  dragenter: true,
  dragleave: true,
  dragover: true,
  dragstart: true,
  drop: true,
  durationchange: true,
  emptied: true,
  ended: true,
  error: true,
  focus: true,
  focusin: true,
  focusout: true,
  formdata: true,
  gotpointercapture: true,
  input: true,
  invalid: true,
  keydown: true,
  keypress: true,
  keyup: true,
  load: true,
  loadeddata: true,
  loadedmetadata: true,
  loadstart: true,
  lostpointercapture: true,
  mousedown: true,
  mouseenter: true,
  mouseleave: true,
  mousemove: true,
  mouseout: true,
  mouseover: true,
  mouseup: true,
  paste: true,
  pause: true,
  play: true,
  playing: true,
  pointercancel: true,
  pointerdown: true,
  pointerenter: true,
  pointerleave: true,
  pointermove: true,
  pointerout: true,
  pointerover: true,
  pointerup: true,
  progress: true,
  ratechange: true,
  reset: true,
  resize: true,
  scroll: true,
  scrollend: true,
  securitypolicyviolation: true,
  seeked: true,
  seeking: true,
  select: true,
  selectionchange: true,
  selectstart: true,
  slotchange: true,
  stalled: true,
  submit: true,
  suspend: true,
  timeupdate: true,
  toggle: true,
  touchcancel: true,
  touchend: true,
  touchmove: true,
  touchstart: true,
  transitioncancel: true,
  transitionend: true,
  transitionrun: true,
  transitionstart: true,
  volumechange: true,
  waiting: true,
  webkitanimationend: true,
  webkitanimationiteration: true,
  webkitanimationstart: true,
  webkittransitionend: true,
  wheel: true,
  beforematch: true,
  pointerrawupdate: true
};

// node_modules/@mui/x-internal-gestures/esm/core/Gesture.js
var Gesture = class {
  /** Unique name identifying this gesture type */
  /** Whether to prevent default browser action for gesture events */
  /** Whether to stop propagation of gesture events */
  /**
   * List of gesture names that should prevent this gesture from activating when they are active.
   */
  /**
   * Array of keyboard keys that must be pressed for the gesture to be recognized.
   */
  /**
   * KeyboardManager instance for tracking key presses
   */
  /**
   * List of pointer types that can trigger this gesture.
   * If undefined, all pointer types are allowed.
   */
  /**
   * Pointer mode-specific configuration overrides.
   */
  /**
   * User-mutable data object for sharing state between gesture events
   * This object is included in all events emitted by this gesture
   */
  customData = {};
  /** Reference to the singleton PointerManager instance */
  /** Reference to the singleton ActiveGesturesRegistry instance */
  /** The DOM element this gesture is attached to */
  /** Stores the active gesture state */
  /** @internal For types. If false enables phases (xStart, x, xEnd) */
  /** @internal For types. The event type this gesture is associated with */
  /** @internal For types. The options type for this gesture */
  /** @internal For types. The options that can be changed at runtime */
  /** @internal For types. The state that can be changed at runtime */
  /**
   * Create a new gesture instance with the specified options
   *
   * @param options - Configuration options for this gesture
   */
  constructor(options) {
    if (!options || !options.name) {
      throw new Error("Gesture must be initialized with a valid name.");
    }
    if (options.name in eventList) {
      throw new Error(`Gesture can't be created with a native event name. Tried to use "${options.name}". Please use a custom name instead.`);
    }
    this.name = options.name;
    this.preventDefault = options.preventDefault ?? false;
    this.stopPropagation = options.stopPropagation ?? false;
    this.preventIf = options.preventIf ?? [];
    this.requiredKeys = options.requiredKeys ?? [];
    this.pointerMode = options.pointerMode ?? [];
    this.pointerOptions = options.pointerOptions ?? {};
  }
  /**
   * Initialize the gesture by acquiring the pointer manager and gestures registry
   * Must be called before the gesture can be used
   */
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    this.element = element;
    this.pointerManager = pointerManager;
    this.gesturesRegistry = gestureRegistry;
    this.keyboardManager = keyboardManager;
    const changeOptionsEventName = `${this.name}ChangeOptions`;
    this.element.addEventListener(changeOptionsEventName, this.handleOptionsChange);
    const changeStateEventName = `${this.name}ChangeState`;
    this.element.addEventListener(changeStateEventName, this.handleStateChange);
  }
  /**
   * Handle option change events
   * @param event Custom event with new options in the detail property
   */
  handleOptionsChange = (event) => {
    if (event && event.detail) {
      this.updateOptions(event.detail);
    }
  };
  /**
   * Update the gesture options with new values
   * @param options Object containing properties to update
   */
  updateOptions(options) {
    this.preventDefault = options.preventDefault ?? this.preventDefault;
    this.stopPropagation = options.stopPropagation ?? this.stopPropagation;
    this.preventIf = options.preventIf ?? this.preventIf;
    this.requiredKeys = options.requiredKeys ?? this.requiredKeys;
    this.pointerMode = options.pointerMode ?? this.pointerMode;
    this.pointerOptions = options.pointerOptions ?? this.pointerOptions;
  }
  /**
   * Get the default configuration for the pointer specific options.
   * Change this function in child classes to provide different defaults.
   */
  getBaseConfig() {
    return {
      requiredKeys: this.requiredKeys
    };
  }
  /**
   * Get the effective configuration for a specific pointer mode.
   * This merges the base configuration with pointer mode-specific overrides.
   *
   * @param pointerType - The pointer type to get configuration for
   * @returns The effective configuration object
   */
  getEffectiveConfig(pointerType, baseConfig) {
    if (pointerType !== "mouse" && pointerType !== "touch" && pointerType !== "pen") {
      return baseConfig;
    }
    const pointerModeOverrides = this.pointerOptions[pointerType];
    if (pointerModeOverrides) {
      return _extends({}, baseConfig, pointerModeOverrides);
    }
    return baseConfig;
  }
  /**
   * Handle state change events
   * @param event Custom event with new state values in the detail property
   */
  handleStateChange = (event) => {
    if (event && event.detail) {
      this.updateState(event.detail);
    }
  };
  /**
   * Update the gesture state with new values
   * @param stateChanges Object containing state properties to update
   */
  updateState(stateChanges) {
    Object.assign(this.state, stateChanges);
  }
  /**
   * Create a deep clone of this gesture for a new element
   *
   * @param overrides - Optional configuration options that override the defaults
   * @returns A new instance of this gesture with the same configuration and any overrides applied
   */
  /**
   * Check if the event's target is or is contained within any of our registered elements
   *
   * @param event - The browser event to check
   * @returns The matching element or null if no match is found
   */
  getTargetElement(event) {
    if (this.isActive || this.element === event.target || "contains" in this.element && this.element.contains(event.target) || "getRootNode" in this.element && this.element.getRootNode() instanceof ShadowRoot && event.composedPath().includes(this.element)) {
      return this.element;
    }
    return null;
  }
  /** Whether the gesture is currently active */
  set isActive(isActive) {
    if (isActive) {
      this.gesturesRegistry.registerActiveGesture(this.element, this);
    } else {
      this.gesturesRegistry.unregisterActiveGesture(this.element, this);
    }
  }
  /** Whether the gesture is currently active */
  get isActive() {
    return this.gesturesRegistry.isGestureActive(this.element, this) ?? false;
  }
  /**
   * Checks if this gesture should be prevented from activating.
   *
   * @param element - The DOM element to check against
   * @param pointerType - The type of pointer triggering the gesture
   * @returns true if the gesture should be prevented, false otherwise
   */
  shouldPreventGesture(element, pointerType) {
    const effectiveConfig = this.getEffectiveConfig(pointerType, this.getBaseConfig());
    if (!this.keyboardManager.areKeysPressed(effectiveConfig.requiredKeys)) {
      return true;
    }
    if (this.preventIf.length === 0) {
      return false;
    }
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    return this.preventIf.some((gestureName) => activeGestures[gestureName]);
  }
  /**
   * Checks if the given pointer type is allowed for this gesture based on the pointerMode setting.
   *
   * @param pointerType - The type of pointer to check.
   * @returns true if the pointer type is allowed, false otherwise.
   */
  isPointerTypeAllowed(pointerType) {
    if (!this.pointerMode || this.pointerMode.length === 0) {
      return true;
    }
    return this.pointerMode.includes(pointerType);
  }
  /**
   * Clean up the gesture and unregister any listeners
   * Call this method when the gesture is no longer needed to prevent memory leaks
   */
  destroy() {
    const changeOptionsEventName = `${this.name}ChangeOptions`;
    this.element.removeEventListener(changeOptionsEventName, this.handleOptionsChange);
    const changeStateEventName = `${this.name}ChangeState`;
    this.element.removeEventListener(changeStateEventName, this.handleStateChange);
  }
  /**
   * Reset the gesture state to its initial values
   */
};

// node_modules/@mui/x-internal-gestures/esm/core/ActiveGesturesRegistry.js
var ActiveGesturesRegistry = class {
  /** Map of elements to their active gestures */
  activeGestures = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
  /**
   * Register a gesture as active on an element
   *
   * @param element - The DOM element on which the gesture is active
   * @param gesture - The gesture instance that is active
   */
  registerActiveGesture(element, gesture) {
    if (!this.activeGestures.has(element)) {
      this.activeGestures.set(element, /* @__PURE__ */ new Set());
    }
    const elementGestures = this.activeGestures.get(element);
    const entry = {
      gesture,
      element
    };
    elementGestures.add(entry);
  }
  /**
   * Remove a gesture from the active registry
   *
   * @param element - The DOM element on which the gesture was active
   * @param gesture - The gesture instance to deactivate
   */
  unregisterActiveGesture(element, gesture) {
    const elementGestures = this.activeGestures.get(element);
    if (!elementGestures) {
      return;
    }
    elementGestures.forEach((entry) => {
      if (entry.gesture === gesture) {
        elementGestures.delete(entry);
      }
    });
    if (elementGestures.size === 0) {
      this.activeGestures.delete(element);
    }
  }
  /**
   * Get all active gestures for a specific element
   *
   * @param element - The DOM element to query
   * @returns Array of active gesture names
   */
  getActiveGestures(element) {
    const elementGestures = this.activeGestures.get(element);
    if (!elementGestures) {
      return {};
    }
    return Array.from(elementGestures).reduce((acc, entry) => {
      acc[entry.gesture.name] = true;
      return acc;
    }, {});
  }
  /**
   * Check if a specific gesture is active on an element
   *
   * @param element - The DOM element to check
   * @param gesture - The gesture instance to check
   * @returns True if the gesture is active on the element, false otherwise
   */
  isGestureActive(element, gesture) {
    const elementGestures = this.activeGestures.get(element);
    if (!elementGestures) {
      return false;
    }
    return Array.from(elementGestures).some((entry) => entry.gesture === gesture);
  }
  /**
   * Clear all active gestures from the registry
   */
  destroy() {
    this.activeGestures.clear();
  }
  /**
   * Clear all active gestures for a specific element
   *
   * @param element - The DOM element to clear
   */
  unregisterElement(element) {
    this.activeGestures.delete(element);
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/KeyboardManager.js
var KeyboardManager = class {
  pressedKeys = /* @__PURE__ */ (() => /* @__PURE__ */ new Set())();
  /**
   * Create a new KeyboardManager instance
   */
  constructor() {
    this.initialize();
  }
  /**
   * Initialize the keyboard event listeners
   */
  initialize() {
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.clearKeys);
  }
  /**
   * Handle keydown events
   */
  handleKeyDown = (event) => {
    this.pressedKeys.add(event.key);
  };
  /**
   * Handle keyup events
   */
  handleKeyUp = (event) => {
    this.pressedKeys.delete(event.key);
  };
  /**
   * Clear all pressed keys
   */
  clearKeys = () => {
    this.pressedKeys.clear();
  };
  /**
   * Check if a set of keys are all currently pressed
   * @param keys The keys to check
   * @returns True if all specified keys are pressed, false otherwise
   */
  areKeysPressed(keys) {
    if (!keys || keys.length === 0) {
      return true;
    }
    return keys.every((key) => {
      if (key === "ControlOrMeta") {
        return navigator.platform.includes("Mac") ? this.pressedKeys.has("Meta") : this.pressedKeys.has("Control");
      }
      return this.pressedKeys.has(key);
    });
  }
  /**
   * Cleanup method to remove event listeners
   */
  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
      window.removeEventListener("blur", this.clearKeys);
    }
    this.clearKeys();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/PointerManager.js
var PointerManager = class {
  /** Root element where pointer events are captured */
  /** CSS touch-action property value applied to the root element */
  /** Whether to use passive event listeners */
  /** Whether to prevent interrupt events like blur or contextmenu */
  preventEventInterruption = true;
  /** Map of all currently active pointers by their pointerId */
  pointers = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
  /** Set of registered gesture handlers that receive pointer events */
  gestureHandlers = /* @__PURE__ */ (() => /* @__PURE__ */ new Set())();
  constructor(options) {
    this.root = // User provided root element
    options.root ?? // Fallback to document root or body, this fixes shadow DOM scenarios
    document.getRootNode({
      composed: true
    }) ?? // Fallback to document body, for some testing environments
    document.body;
    this.touchAction = options.touchAction || "auto";
    this.passive = options.passive ?? false;
    this.preventEventInterruption = options.preventEventInterruption ?? true;
    this.setupEventListeners();
  }
  /**
   * Register a handler function to receive pointer events.
   *
   * The handler will be called whenever pointer events occur within the root element.
   * It receives the current map of all active pointers and the original event.
   *
   * @param {Function} handler - Function to receive pointer events and current pointer state
   * @returns {Function} An unregister function that removes this handler when called
   */
  registerGestureHandler(handler) {
    this.gestureHandlers.add(handler);
    return () => {
      this.gestureHandlers.delete(handler);
    };
  }
  /**
   * Get a copy of the current active pointers map.
   *
   * Returns a new Map containing all currently active pointers.
   * Modifying the returned map will not affect the internal pointers state.
   *
   * @returns A new Map containing all active pointers
   */
  getPointers() {
    return new Map(this.pointers);
  }
  /**
   * Set up event listeners for pointer events on the root element.
   *
   * This method attaches all necessary event listeners and configures
   * the CSS touch-action property on the root element.
   */
  setupEventListeners() {
    if (this.touchAction !== "auto") {
      this.root.style.touchAction = this.touchAction;
    }
    this.root.addEventListener("pointerdown", this.handlePointerEvent, {
      passive: this.passive
    });
    this.root.addEventListener("pointermove", this.handlePointerEvent, {
      passive: this.passive
    });
    this.root.addEventListener("pointerup", this.handlePointerEvent, {
      passive: this.passive
    });
    this.root.addEventListener("pointercancel", this.handlePointerEvent, {
      passive: this.passive
    });
    this.root.addEventListener("forceCancel", this.handlePointerEvent, {
      passive: this.passive
    });
    this.root.addEventListener("blur", this.handleInterruptEvents);
    this.root.addEventListener("contextmenu", this.handleInterruptEvents);
  }
  /**
   * Handle events that should interrupt all gestures.
   * This clears all active pointers and notifies handlers with a pointercancel-like event.
   *
   * @param event - The event that triggered the interruption (blur or contextmenu)
   */
  handleInterruptEvents = (event) => {
    if (this.preventEventInterruption && "pointerType" in event && event.pointerType === "touch") {
      event.preventDefault();
      return;
    }
    const cancelEvent = new PointerEvent("forceCancel", {
      bubbles: false,
      cancelable: false
    });
    const firstPointer = this.pointers.values().next().value;
    if (this.pointers.size > 0 && firstPointer) {
      Object.defineProperties(cancelEvent, {
        clientX: {
          value: firstPointer.clientX
        },
        clientY: {
          value: firstPointer.clientY
        },
        pointerId: {
          value: firstPointer.pointerId
        },
        pointerType: {
          value: firstPointer.pointerType
        }
      });
      for (const [pointerId, pointer] of this.pointers.entries()) {
        const updatedPointer = _extends({}, pointer, {
          type: "forceCancel"
        });
        this.pointers.set(pointerId, updatedPointer);
      }
    }
    this.notifyHandlers(cancelEvent);
    this.pointers.clear();
  };
  /**
   * Event handler for all pointer events.
   *
   * This method:
   * 1. Updates the internal pointers map based on the event type
   * 2. Manages pointer capture for tracking pointers outside the root element
   * 3. Notifies all registered handlers with the current state
   *
   * @param event - The original pointer event from the browser
   */
  handlePointerEvent = (event) => {
    const {
      type,
      pointerId
    } = event;
    if (type === "pointerdown" || type === "pointermove") {
      this.pointers.set(pointerId, this.createPointerData(event));
    } else if (type === "pointerup" || type === "pointercancel" || type === "forceCancel") {
      this.pointers.set(pointerId, this.createPointerData(event));
      this.notifyHandlers(event);
      this.pointers.delete(pointerId);
      return;
    }
    this.notifyHandlers(event);
  };
  /**
   * Notify all registered gesture handlers about a pointer event.
   *
   * Each handler receives the current map of active pointers and the original event.
   *
   * @param event - The original pointer event that triggered this notification
   */
  notifyHandlers(event) {
    this.gestureHandlers.forEach((handler) => handler(this.pointers, event));
  }
  /**
   * Create a normalized PointerData object from a browser PointerEvent.
   *
   * This method extracts all relevant information from the original event
   * and formats it in a consistent way for gesture recognizers to use.
   *
   * @param event - The original browser pointer event
   * @returns A new PointerData object representing this pointer
   */
  createPointerData(event) {
    return {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
      target: event.target,
      timeStamp: event.timeStamp,
      type: event.type,
      isPrimary: event.isPrimary,
      pressure: event.pressure,
      width: event.width,
      height: event.height,
      pointerType: event.pointerType,
      srcEvent: event
    };
  }
  /**
   * Clean up all event listeners and reset the PointerManager state.
   *
   * This method should be called when the PointerManager is no longer needed
   * to prevent memory leaks. It removes all event listeners, clears the
   * internal state, and resets the singleton instance.
   */
  destroy() {
    this.root.removeEventListener("pointerdown", this.handlePointerEvent);
    this.root.removeEventListener("pointermove", this.handlePointerEvent);
    this.root.removeEventListener("pointerup", this.handlePointerEvent);
    this.root.removeEventListener("pointercancel", this.handlePointerEvent);
    this.root.removeEventListener("forceCancel", this.handlePointerEvent);
    this.root.removeEventListener("blur", this.handleInterruptEvents);
    this.root.removeEventListener("contextmenu", this.handleInterruptEvents);
    this.pointers.clear();
    this.gestureHandlers.clear();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/GestureManager.js
var GestureManager = class {
  /** Repository of gesture templates that can be cloned for specific elements */
  gestureTemplates = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
  /** Maps DOM elements to their active gesture instances */
  elementGestureMap = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
  activeGesturesRegistry = (() => new ActiveGesturesRegistry())();
  keyboardManager = (() => new KeyboardManager())();
  /**
   * Create a new GestureManager instance to coordinate gesture recognition
   *
   * @param options - Configuration options for the gesture manager
   */
  constructor(options) {
    this.pointerManager = new PointerManager({
      root: options.root,
      touchAction: options.touchAction,
      passive: options.passive
    });
    if (options.gestures && options.gestures.length > 0) {
      options.gestures.forEach((gesture) => {
        this.addGestureTemplate(gesture);
      });
    }
  }
  /**
   * Add a gesture template to the manager's template registry.
   * Templates serve as prototypes that can be cloned for individual elements.
   *
   * @param gesture - The gesture instance to use as a template
   */
  addGestureTemplate(gesture) {
    if (this.gestureTemplates.has(gesture.name)) {
      console.warn(`Gesture template with name "${gesture.name}" already exists. It will be overwritten.`);
    }
    this.gestureTemplates.set(gesture.name, gesture);
  }
  /**
   * Updates the options for a specific gesture on a given element and emits a change event.
   *
   * @param gestureName - Name of the gesture whose options should be updated
   * @param element - The DOM element where the gesture is attached
   * @param options - New options to apply to the gesture
   * @returns True if the options were successfully updated, false if the gesture wasn't found
   *
   * @example
   * ```typescript
   * // Update pan gesture sensitivity on the fly
   * manager.setGestureOptions('pan', element, { threshold: 5 });
   * ```
   */
  setGestureOptions(gestureName, element, options) {
    const elementGestures = this.elementGestureMap.get(element);
    if (!elementGestures || !elementGestures.has(gestureName)) {
      console.error(`Gesture "${gestureName}" not found on the provided element.`);
      return;
    }
    const event = new CustomEvent(`${gestureName}ChangeOptions`, {
      detail: options,
      bubbles: false,
      cancelable: false,
      composed: false
    });
    element.dispatchEvent(event);
  }
  /**
   * Updates the state for a specific gesture on a given element and emits a change event.
   *
   * @param gestureName - Name of the gesture whose state should be updated
   * @param element - The DOM element where the gesture is attached
   * @param state - New state to apply to the gesture
   * @returns True if the state was successfully updated, false if the gesture wasn't found
   *
   * @example
   * ```typescript
   * // Update total delta for a turnWheel gesture
   * manager.setGestureState('turnWheel', element, { totalDeltaX: 10 });
   * ```
   */
  setGestureState(gestureName, element, state) {
    const elementGestures = this.elementGestureMap.get(element);
    if (!elementGestures || !elementGestures.has(gestureName)) {
      console.error(`Gesture "${gestureName}" not found on the provided element.`);
      return;
    }
    const event = new CustomEvent(`${gestureName}ChangeState`, {
      detail: state,
      bubbles: false,
      cancelable: false,
      composed: false
    });
    element.dispatchEvent(event);
  }
  /**
   * Register an element to recognize one or more gestures.
   *
   * This method clones the specified gesture template(s) and creates
   * gesture recognizer instance(s) specifically for the provided element.
   * The element is returned with enhanced TypeScript typing for gesture events.
   *
   * @param gestureNames - Name(s) of the gesture(s) to register (must match template names)
   * @param element - The DOM element to attach the gesture(s) to
   * @param options - Optional map of gesture-specific options to override when registering
   * @returns The same element with properly typed event listeners
   *
   * @example
   * ```typescript
   * // Register multiple gestures
   * const element = manager.registerElement(['pan', 'pinch'], myDiv);
   *
   * // Register a single gesture
   * const draggable = manager.registerElement('pan', dragHandle);
   *
   * // Register with customized options for each gesture
   * const customElement = manager.registerElement(
   *   ['pan', 'pinch', 'rotate'],
   *   myElement,
   *   {
   *     pan: { threshold: 20, direction: ['left', 'right'] },
   *     pinch: { threshold: 0.1 }
   *   }
   * );
   * ```
   */
  registerElement(gestureNames, element, options) {
    if (!Array.isArray(gestureNames)) {
      gestureNames = [gestureNames];
    }
    gestureNames.forEach((name) => {
      const gestureOptions = options?.[name];
      this.registerSingleGesture(name, element, gestureOptions);
    });
    return element;
  }
  /**
   * Internal method to register a single gesture on an element.
   *
   * @param gestureName - Name of the gesture to register
   * @param element - DOM element to attach the gesture to
   * @param options - Optional options to override the gesture template configuration
   * @returns True if the registration was successful, false otherwise
   */
  registerSingleGesture(gestureName, element, options) {
    const gestureTemplate = this.gestureTemplates.get(gestureName);
    if (!gestureTemplate) {
      console.error(`Gesture template "${gestureName}" not found.`);
      return false;
    }
    if (!this.elementGestureMap.has(element)) {
      this.elementGestureMap.set(element, /* @__PURE__ */ new Map());
    }
    const elementGestures = this.elementGestureMap.get(element);
    if (elementGestures.has(gestureName)) {
      console.warn(`Element already has gesture "${gestureName}" registered. It will be replaced.`);
      this.unregisterElement(gestureName, element);
    }
    const gestureInstance = gestureTemplate.clone(options);
    gestureInstance.init(element, this.pointerManager, this.activeGesturesRegistry, this.keyboardManager);
    elementGestures.set(gestureName, gestureInstance);
    return true;
  }
  /**
   * Unregister a specific gesture from an element.
   * This removes the gesture recognizer and stops event emission for that gesture.
   *
   * @param gestureName - Name of the gesture to unregister
   * @param element - The DOM element to remove the gesture from
   * @returns True if the gesture was found and removed, false otherwise
   */
  unregisterElement(gestureName, element) {
    const elementGestures = this.elementGestureMap.get(element);
    if (!elementGestures || !elementGestures.has(gestureName)) {
      return false;
    }
    const gesture = elementGestures.get(gestureName);
    gesture.destroy();
    elementGestures.delete(gestureName);
    this.activeGesturesRegistry.unregisterElement(element);
    if (elementGestures.size === 0) {
      this.elementGestureMap.delete(element);
    }
    return true;
  }
  /**
   * Unregister all gestures from an element.
   * Completely removes the element from the gesture system.
   *
   * @param element - The DOM element to remove all gestures from
   */
  unregisterAllGestures(element) {
    const elementGestures = this.elementGestureMap.get(element);
    if (elementGestures) {
      for (const [, gesture] of elementGestures) {
        gesture.destroy();
        this.activeGesturesRegistry.unregisterElement(element);
      }
      this.elementGestureMap.delete(element);
    }
  }
  /**
   * Clean up all gestures and event listeners.
   * Call this method when the GestureManager is no longer needed to prevent memory leaks.
   */
  destroy() {
    for (const [element] of this.elementGestureMap) {
      this.unregisterAllGestures(element);
    }
    this.gestureTemplates.clear();
    this.elementGestureMap.clear();
    this.activeGesturesRegistry.destroy();
    this.keyboardManager.destroy();
    this.pointerManager.destroy();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/PointerGesture.js
var PointerGesture = class extends Gesture {
  /** Function to unregister from the PointerManager when destroying this gesture */
  unregisterHandler = null;
  /** The original target element when the gesture began, used to prevent limbo state if target is removed */
  originalTarget = null;
  /**
   * Minimum number of simultaneous pointers required to activate the gesture.
   * The gesture will not start until at least this many pointers are active.
   */
  /**
   * Maximum number of simultaneous pointers allowed for this gesture.
   * If more than this many pointers are detected, the gesture may be canceled.
   */
  constructor(options) {
    super(options);
    this.minPointers = options.minPointers ?? 1;
    this.maxPointers = options.maxPointers ?? Infinity;
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.unregisterHandler = this.pointerManager.registerGestureHandler(this.handlePointerEvent);
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.minPointers = options.minPointers ?? this.minPointers;
    this.maxPointers = options.maxPointers ?? this.maxPointers;
  }
  getBaseConfig() {
    return {
      requiredKeys: this.requiredKeys,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers
    };
  }
  isWithinPointerCount(pointers, pointerMode) {
    const config = this.getEffectiveConfig(pointerMode, this.getBaseConfig());
    return pointers.length >= config.minPointers && pointers.length <= config.maxPointers;
  }
  /**
   * Handler for pointer events from the PointerManager.
   * Concrete gesture implementations must override this method to provide
   * gesture-specific logic for recognizing and tracking the gesture.
   *
   * @param pointers - Map of active pointers by pointer ID
   * @param event - The original pointer event from the browser
   */
  /**
   * Calculate the target element for the gesture based on the active pointers.
   *
   * It takes into account the original target element.
   *
   * @param pointers - Map of active pointers by pointer ID
   * @param calculatedTarget - The target element calculated from getTargetElement
   * @returns A list of relevant pointers for this gesture
   */
  getRelevantPointers(pointers, calculatedTarget) {
    return pointers.filter((pointer) => this.isPointerTypeAllowed(pointer.pointerType) && (calculatedTarget === pointer.target || pointer.target === this.originalTarget || calculatedTarget === this.originalTarget || "contains" in calculatedTarget && calculatedTarget.contains(pointer.target)) || "getRootNode" in calculatedTarget && calculatedTarget.getRootNode() instanceof ShadowRoot && pointer.srcEvent.composedPath().includes(calculatedTarget));
  }
  destroy() {
    if (this.unregisterHandler) {
      this.unregisterHandler();
      this.unregisterHandler = null;
    }
    super.destroy();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/utils/getDistance.js
function getDistance(pointA, pointB) {
  const deltaX = pointB.x - pointA.x;
  const deltaY = pointB.y - pointA.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/calculateAverageDistance.js
function calculateAverageDistance(pointers) {
  if (pointers.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  let pairCount = 0;
  for (let i = 0; i < pointers.length; i += 1) {
    for (let j = i + 1; j < pointers.length; j += 1) {
      totalDistance += getDistance({
        x: pointers[i].clientX,
        y: pointers[i].clientY
      }, {
        x: pointers[j].clientX,
        y: pointers[j].clientY
      });
      pairCount += 1;
    }
  }
  return pairCount > 0 ? totalDistance / pairCount : 0;
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/calculateCentroid.js
function calculateCentroid(pointers) {
  if (pointers.length === 0) {
    return {
      x: 0,
      y: 0
    };
  }
  const sum3 = pointers.reduce((acc, pointer) => {
    acc.x += pointer.clientX;
    acc.y += pointer.clientY;
    return acc;
  }, {
    x: 0,
    y: 0
  });
  return {
    x: sum3.x / pointers.length,
    y: sum3.y / pointers.length
  };
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/createEventName.js
function createEventName(gesture, phase) {
  return `${gesture}${phase === "ongoing" ? "" : phase.charAt(0).toUpperCase() + phase.slice(1)}`;
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/getDirection.js
var MAIN_THRESHOLD = 1e-5;
var ANGLE_THRESHOLD = 1e-5;
var SECONDARY_THRESHOLD = 0.15;
function getDirection(previous, current) {
  const deltaX = current.x - previous.x;
  const deltaY = current.y - previous.y;
  const direction = {
    vertical: null,
    horizontal: null,
    mainAxis: null
  };
  const isDiagonal = isDiagonalMovement(current, previous);
  const mainMovement = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
  const horizontalThreshold = isDiagonal ? MAIN_THRESHOLD : mainMovement === "horizontal" ? MAIN_THRESHOLD : SECONDARY_THRESHOLD;
  const verticalThreshold = isDiagonal ? MAIN_THRESHOLD : mainMovement === "horizontal" ? SECONDARY_THRESHOLD : MAIN_THRESHOLD;
  if (Math.abs(deltaX) > horizontalThreshold) {
    direction.horizontal = deltaX > 0 ? "right" : "left";
  }
  if (Math.abs(deltaY) > verticalThreshold) {
    direction.vertical = deltaY > 0 ? "down" : "up";
  }
  direction.mainAxis = isDiagonal ? "diagonal" : mainMovement;
  return direction;
}
function isDiagonalMovement(previous, current) {
  const deltaX = current.x - previous.x;
  const deltaY = current.y - previous.y;
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  return angle >= -45 + ANGLE_THRESHOLD && angle <= -22.5 + ANGLE_THRESHOLD || angle >= 22.5 + ANGLE_THRESHOLD && angle <= 45 + ANGLE_THRESHOLD || angle >= 135 + ANGLE_THRESHOLD && angle <= 157.5 + ANGLE_THRESHOLD || angle >= -157.5 + ANGLE_THRESHOLD && angle <= -135 + ANGLE_THRESHOLD;
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/isDirectionAllowed.js
function isDirectionAllowed(direction, allowedDirections) {
  if (!direction.vertical && !direction.horizontal) {
    return false;
  }
  if (allowedDirections.length === 0) {
    return true;
  }
  const verticalAllowed = direction.vertical === null || allowedDirections.includes(direction.vertical);
  const horizontalAllowed = direction.horizontal === null || allowedDirections.includes(direction.horizontal);
  return verticalAllowed && horizontalAllowed;
}

// node_modules/@mui/x-internal-gestures/esm/core/utils/getPinchDirection.js
var DIRECTION_THRESHOLD = 0;
var getPinchDirection = (velocity) => {
  if (velocity > DIRECTION_THRESHOLD) {
    return 1;
  }
  if (velocity < -DIRECTION_THRESHOLD) {
    return -1;
  }
  return 0;
};

// node_modules/@mui/x-internal-gestures/esm/core/utils/preventDefault.js
var preventDefault = (event) => {
  if (event.cancelable) {
    event.preventDefault();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/MoveGesture.js
var MoveGesture = class _MoveGesture extends PointerGesture {
  state = {
    lastPosition: null
  };
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  constructor(options) {
    super(options);
    this.threshold = options.threshold || 0;
  }
  clone(overrides) {
    return new _MoveGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      threshold: this.threshold,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.element.addEventListener("pointerenter", this.handleElementEnter);
    this.element.addEventListener("pointerleave", this.handleElementLeave);
  }
  destroy() {
    this.element.removeEventListener("pointerenter", this.handleElementEnter);
    this.element.removeEventListener("pointerleave", this.handleElementLeave);
    this.resetState();
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
  }
  resetState() {
    this.isActive = false;
    this.state = {
      lastPosition: null
    };
  }
  /**
   * Handle pointer enter events for a specific element
   * @param event The original pointer event
   */
  handleElementEnter = (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }
    const pointers = this.pointerManager.getPointers() || /* @__PURE__ */ new Map();
    const pointersArray = Array.from(pointers.values());
    if (this.isWithinPointerCount(pointersArray, event.pointerType)) {
      this.isActive = true;
      const currentPosition = {
        x: event.clientX,
        y: event.clientY
      };
      this.state.lastPosition = currentPosition;
      this.emitMoveEvent(this.element, "start", pointersArray, event);
      this.emitMoveEvent(this.element, "ongoing", pointersArray, event);
    }
  };
  /**
   * Handle pointer leave events for a specific element
   * @param event The original pointer event
   */
  handleElementLeave = (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }
    if (!this.isActive) {
      return;
    }
    const pointers = this.pointerManager.getPointers() || /* @__PURE__ */ new Map();
    const pointersArray = Array.from(pointers.values());
    this.emitMoveEvent(this.element, "end", pointersArray, event);
    this.resetState();
  };
  /**
   * Handle pointer events for the move gesture (only handles move events now)
   * @param pointers Map of active pointers
   * @param event The original pointer event
   */
  handlePointerEvent = (pointers, event) => {
    if (event.type !== "pointermove" || event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
    const pointersArray = Array.from(pointers.values());
    const targetElement = this.getTargetElement(event);
    if (!targetElement) {
      return;
    }
    if (!this.isWithinPointerCount(pointersArray, event.pointerType)) {
      return;
    }
    if (this.shouldPreventGesture(targetElement, event.pointerType)) {
      if (!this.isActive) {
        return;
      }
      this.resetState();
      this.emitMoveEvent(targetElement, "end", pointersArray, event);
      return;
    }
    const currentPosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.state.lastPosition = currentPosition;
    if (!this.isActive) {
      this.isActive = true;
      this.emitMoveEvent(targetElement, "start", pointersArray, event);
    }
    this.emitMoveEvent(targetElement, "ongoing", pointersArray, event);
  };
  /**
   * Emit move-specific events
   * @param element The DOM element the event is related to
   * @param phase The current phase of the gesture (start, ongoing, end)
   * @param pointers Array of active pointers
   * @param event The original pointer event
   */
  emitMoveEvent(element, phase, pointers, event) {
    const currentPosition = this.state.lastPosition || calculateCentroid(pointers);
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    const customEventData = {
      gestureName: this.name,
      centroid: currentPosition,
      target: event.target,
      srcEvent: event,
      phase,
      pointers,
      timeStamp: event.timeStamp,
      activeGestures,
      customData: this.customData
    };
    const eventName = createEventName(this.name, phase);
    const domEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    element.dispatchEvent(domEvent);
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/PanGesture.js
var PanGesture = class _PanGesture extends PointerGesture {
  state = /* @__PURE__ */ (() => ({
    startPointers: /* @__PURE__ */ new Map(),
    startCentroid: null,
    lastCentroid: null,
    movementThresholdReached: false,
    totalDeltaX: 0,
    totalDeltaY: 0,
    activeDeltaX: 0,
    activeDeltaY: 0,
    lastDirection: {
      vertical: null,
      horizontal: null,
      mainAxis: null
    },
    lastDeltas: null
  }))();
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  /**
   * Allowed directions for the pan gesture
   * Default allows all directions
   */
  constructor(options) {
    super(options);
    this.direction = options.direction || ["up", "down", "left", "right"];
    this.threshold = options.threshold || 0;
  }
  clone(overrides) {
    return new _PanGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      threshold: this.threshold,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      direction: [...this.direction],
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  destroy() {
    this.resetState();
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.direction = options.direction || this.direction;
    this.threshold = options.threshold ?? this.threshold;
  }
  resetState() {
    this.isActive = false;
    this.state = _extends({}, this.state, {
      startPointers: /* @__PURE__ */ new Map(),
      startCentroid: null,
      lastCentroid: null,
      lastDeltas: null,
      activeDeltaX: 0,
      activeDeltaY: 0,
      movementThresholdReached: false,
      lastDirection: {
        vertical: null,
        horizontal: null,
        mainAxis: null
      }
    });
  }
  /**
   * Handle pointer events for the pan gesture
   */
  handlePointerEvent = (pointers, event) => {
    const pointersArray = Array.from(pointers.values());
    if (event.type === "forceCancel") {
      this.cancel(event.target, pointersArray, event);
      return;
    }
    const targetElement = this.getTargetElement(event);
    if (!targetElement) {
      return;
    }
    if (this.shouldPreventGesture(targetElement, event.pointerType)) {
      this.cancel(targetElement, pointersArray, event);
      return;
    }
    const relevantPointers = this.getRelevantPointers(pointersArray, targetElement);
    if (!this.isWithinPointerCount(relevantPointers, event.pointerType)) {
      this.cancel(targetElement, relevantPointers, event);
      return;
    }
    switch (event.type) {
      case "pointerdown":
        if (!this.isActive && !this.state.startCentroid) {
          relevantPointers.forEach((pointer) => {
            this.state.startPointers.set(pointer.pointerId, pointer);
          });
          this.originalTarget = targetElement;
          this.state.startCentroid = calculateCentroid(relevantPointers);
          this.state.lastCentroid = _extends({}, this.state.startCentroid);
        }
        break;
      case "pointermove":
        if (this.state.startCentroid && this.isWithinPointerCount(pointersArray, event.pointerType)) {
          const currentCentroid = calculateCentroid(relevantPointers);
          const distanceDeltaX = currentCentroid.x - this.state.startCentroid.x;
          const distanceDeltaY = currentCentroid.y - this.state.startCentroid.y;
          const distance = Math.sqrt(distanceDeltaX * distanceDeltaX + distanceDeltaY * distanceDeltaY);
          const moveDirection = getDirection(this.state.lastCentroid ?? this.state.startCentroid, currentCentroid);
          const lastDeltaX = this.state.lastCentroid ? currentCentroid.x - this.state.lastCentroid.x : 0;
          const lastDeltaY = this.state.lastCentroid ? currentCentroid.y - this.state.lastCentroid.y : 0;
          if (!this.state.movementThresholdReached && distance >= this.threshold && isDirectionAllowed(moveDirection, this.direction)) {
            this.state.movementThresholdReached = true;
            this.isActive = true;
            this.state.lastDeltas = {
              x: lastDeltaX,
              y: lastDeltaY
            };
            this.state.totalDeltaX += lastDeltaX;
            this.state.totalDeltaY += lastDeltaY;
            this.state.activeDeltaX += lastDeltaX;
            this.state.activeDeltaY += lastDeltaY;
            this.emitPanEvent(targetElement, "start", relevantPointers, event, currentCentroid);
            this.emitPanEvent(targetElement, "ongoing", relevantPointers, event, currentCentroid);
          } else if (this.state.movementThresholdReached && this.isActive) {
            this.state.lastDeltas = {
              x: lastDeltaX,
              y: lastDeltaY
            };
            this.state.totalDeltaX += lastDeltaX;
            this.state.totalDeltaY += lastDeltaY;
            this.state.activeDeltaX += lastDeltaX;
            this.state.activeDeltaY += lastDeltaY;
            this.emitPanEvent(targetElement, "ongoing", relevantPointers, event, currentCentroid);
          }
          this.state.lastCentroid = currentCentroid;
          this.state.lastDirection = moveDirection;
        }
        break;
      case "pointerup":
      case "pointercancel":
      case "forceCancel":
        if (this.isActive && this.state.movementThresholdReached) {
          const remainingPointers = relevantPointers.filter((p) => p.type !== "pointerup" && p.type !== "pointercancel");
          if (!this.isWithinPointerCount(remainingPointers, event.pointerType)) {
            const currentCentroid = this.state.lastCentroid || this.state.startCentroid;
            if (event.type === "pointercancel") {
              this.emitPanEvent(targetElement, "cancel", relevantPointers, event, currentCentroid);
            }
            this.emitPanEvent(targetElement, "end", relevantPointers, event, currentCentroid);
            this.resetState();
          }
        } else {
          this.resetState();
        }
        break;
      default:
        break;
    }
  };
  /**
   * Emit pan-specific events with additional data
   */
  emitPanEvent(element, phase, pointers, event, currentCentroid) {
    if (!this.state.startCentroid) {
      return;
    }
    const deltaX = this.state.lastDeltas?.x ?? 0;
    const deltaY = this.state.lastDeltas?.y ?? 0;
    const firstPointer = this.state.startPointers.values().next().value;
    const timeElapsed = firstPointer ? (event.timeStamp - firstPointer.timeStamp) / 1e3 : 0;
    const velocityX = timeElapsed > 0 ? deltaX / timeElapsed : 0;
    const velocityY = timeElapsed > 0 ? deltaY / timeElapsed : 0;
    const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    const customEventData = {
      gestureName: this.name,
      initialCentroid: this.state.startCentroid,
      centroid: currentCentroid,
      target: event.target,
      srcEvent: event,
      phase,
      pointers,
      timeStamp: event.timeStamp,
      deltaX,
      deltaY,
      direction: this.state.lastDirection,
      velocityX,
      velocityY,
      velocity,
      totalDeltaX: this.state.totalDeltaX,
      totalDeltaY: this.state.totalDeltaY,
      activeDeltaX: this.state.activeDeltaX,
      activeDeltaY: this.state.activeDeltaY,
      activeGestures,
      customData: this.customData
    };
    const eventName = createEventName(this.name, phase);
    const domEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    element.dispatchEvent(domEvent);
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
  }
  /**
   * Cancel the current gesture
   */
  cancel(element, pointers, event) {
    if (this.isActive) {
      const el = element ?? this.element;
      this.emitPanEvent(el, "cancel", pointers, event, this.state.lastCentroid);
      this.emitPanEvent(el, "end", pointers, event, this.state.lastCentroid);
    }
    this.resetState();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/PinchGesture.js
var PinchGesture = class _PinchGesture extends PointerGesture {
  state = {
    startDistance: 0,
    lastDistance: 0,
    lastScale: 1,
    lastTime: 0,
    velocity: 0,
    totalScale: 1,
    deltaScale: 0
  };
  /**
   * Movement threshold in pixels that must be exceeded before the gesture activates.
   * Higher values reduce false positive gesture detection for small movements.
   */
  constructor(options) {
    super(_extends({}, options, {
      minPointers: options.minPointers ?? 2
    }));
    this.threshold = options.threshold ?? 0;
  }
  clone(overrides) {
    return new _PinchGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      threshold: this.threshold,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  destroy() {
    this.resetState();
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
  }
  resetState() {
    this.isActive = false;
    this.state = _extends({}, this.state, {
      startDistance: 0,
      lastDistance: 0,
      lastScale: 1,
      lastTime: 0,
      velocity: 0,
      deltaScale: 0
    });
  }
  /**
   * Handle pointer events for the pinch gesture
   */
  handlePointerEvent = (pointers, event) => {
    const pointersArray = Array.from(pointers.values());
    const targetElement = this.getTargetElement(event);
    if (!targetElement) {
      return;
    }
    if (this.shouldPreventGesture(targetElement, event.pointerType)) {
      if (this.isActive) {
        this.emitPinchEvent(targetElement, "cancel", pointersArray, event);
        this.resetState();
      }
      return;
    }
    const relevantPointers = this.getRelevantPointers(pointersArray, targetElement);
    switch (event.type) {
      case "pointerdown":
        if (relevantPointers.length >= 2 && !this.isActive) {
          const initialDistance = calculateAverageDistance(relevantPointers);
          this.state.startDistance = initialDistance;
          this.state.lastDistance = initialDistance;
          this.state.lastTime = event.timeStamp;
          this.originalTarget = targetElement;
        }
        break;
      case "pointermove":
        if (this.state.startDistance && this.isWithinPointerCount(relevantPointers, event.pointerType)) {
          const currentDistance = calculateAverageDistance(relevantPointers);
          const distanceChange = Math.abs(currentDistance - this.state.lastDistance);
          if (distanceChange !== 0 && distanceChange >= this.threshold) {
            const scale = this.state.startDistance ? currentDistance / this.state.startDistance : 1;
            const scaleChange = scale / this.state.lastScale;
            this.state.totalScale *= scaleChange;
            const deltaTime = (event.timeStamp - this.state.lastTime) / 1e3;
            if (this.state.lastDistance) {
              const deltaDistance = currentDistance - this.state.lastDistance;
              const result = deltaDistance / deltaTime;
              this.state.velocity = Number.isNaN(result) ? 0 : result;
            }
            this.state.lastDistance = currentDistance;
            this.state.deltaScale = scale - this.state.lastScale;
            this.state.lastScale = scale;
            this.state.lastTime = event.timeStamp;
            if (!this.isActive) {
              this.isActive = true;
              this.emitPinchEvent(targetElement, "start", relevantPointers, event);
              this.emitPinchEvent(targetElement, "ongoing", relevantPointers, event);
            } else {
              this.emitPinchEvent(targetElement, "ongoing", relevantPointers, event);
            }
          }
        }
        break;
      case "pointerup":
      case "pointercancel":
      case "forceCancel":
        if (this.isActive) {
          const remainingPointers = relevantPointers.filter((p) => p.type !== "pointerup" && p.type !== "pointercancel");
          if (!this.isWithinPointerCount(remainingPointers, event.pointerType)) {
            if (event.type === "pointercancel") {
              this.emitPinchEvent(targetElement, "cancel", relevantPointers, event);
            }
            this.emitPinchEvent(targetElement, "end", relevantPointers, event);
            this.resetState();
          } else if (remainingPointers.length >= 2) {
            const newDistance = calculateAverageDistance(remainingPointers);
            this.state.startDistance = newDistance / this.state.lastScale;
          }
        }
        break;
      default:
        break;
    }
  };
  /**
   * Emit pinch-specific events with additional data
   */
  emitPinchEvent(element, phase, pointers, event) {
    const centroid = calculateCentroid(pointers);
    const distance = this.state.lastDistance;
    const scale = this.state.lastScale;
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    const customEventData = {
      gestureName: this.name,
      centroid,
      target: event.target,
      srcEvent: event,
      phase,
      pointers,
      timeStamp: event.timeStamp,
      scale,
      deltaScale: this.state.deltaScale,
      totalScale: this.state.totalScale,
      distance,
      velocity: this.state.velocity,
      activeGestures,
      direction: getPinchDirection(this.state.velocity),
      customData: this.customData
    };
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
    const eventName = createEventName(this.name, phase);
    const domEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    element.dispatchEvent(domEvent);
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/PressGesture.js
var PressGesture = class _PressGesture extends PointerGesture {
  state = {
    startCentroid: null,
    lastPosition: null,
    timerId: null,
    startTime: 0,
    pressThresholdReached: false
  };
  /**
   * Duration in milliseconds required to hold before the press gesture is recognized
   */
  /**
   * Maximum distance a pointer can move for a gesture to still be considered a press
   */
  constructor(options) {
    super(options);
    this.duration = options.duration ?? 500;
    this.maxDistance = options.maxDistance ?? 10;
  }
  clone(overrides) {
    return new _PressGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      duration: this.duration,
      maxDistance: this.maxDistance,
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  destroy() {
    this.clearPressTimer();
    this.resetState();
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.duration = options.duration ?? this.duration;
    this.maxDistance = options.maxDistance ?? this.maxDistance;
  }
  resetState() {
    this.clearPressTimer();
    this.isActive = false;
    this.state = _extends({}, this.state, {
      startCentroid: null,
      lastPosition: null,
      timerId: null,
      startTime: 0,
      pressThresholdReached: false
    });
  }
  /**
   * Clear the press timer if it's active
   */
  clearPressTimer() {
    if (this.state.timerId !== null) {
      clearTimeout(this.state.timerId);
      this.state.timerId = null;
    }
  }
  /**
   * Handle pointer events for the press gesture
   */
  handlePointerEvent = (pointers, event) => {
    const pointersArray = Array.from(pointers.values());
    if (event.type === "forceCancel") {
      this.cancelPress(event.target, pointersArray, event);
      return;
    }
    const targetElement = this.getTargetElement(event);
    if (!targetElement) {
      return;
    }
    if (this.shouldPreventGesture(targetElement, event.pointerType)) {
      if (this.isActive) {
        this.cancelPress(targetElement, pointersArray, event);
      }
      return;
    }
    const relevantPointers = this.getRelevantPointers(pointersArray, targetElement);
    if (!this.isWithinPointerCount(relevantPointers, event.pointerType)) {
      if (this.isActive) {
        this.cancelPress(targetElement, relevantPointers, event);
      }
      return;
    }
    switch (event.type) {
      case "pointerdown":
        if (!this.isActive && !this.state.startCentroid) {
          this.state.startCentroid = calculateCentroid(relevantPointers);
          this.state.lastPosition = _extends({}, this.state.startCentroid);
          this.state.startTime = event.timeStamp;
          this.isActive = true;
          this.originalTarget = targetElement;
          this.clearPressTimer();
          this.state.timerId = setTimeout(() => {
            if (this.isActive && this.state.startCentroid) {
              this.state.pressThresholdReached = true;
              const lastPosition = this.state.lastPosition;
              this.emitPressEvent(targetElement, "start", relevantPointers, event, lastPosition);
              this.emitPressEvent(targetElement, "ongoing", relevantPointers, event, lastPosition);
            }
          }, this.duration);
        }
        break;
      case "pointermove":
        if (this.isActive && this.state.startCentroid) {
          const currentPosition = calculateCentroid(relevantPointers);
          this.state.lastPosition = currentPosition;
          const deltaX = currentPosition.x - this.state.startCentroid.x;
          const deltaY = currentPosition.y - this.state.startCentroid.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance > this.maxDistance) {
            this.cancelPress(targetElement, relevantPointers, event);
          }
        }
        break;
      case "pointerup":
        if (this.isActive) {
          if (this.state.pressThresholdReached) {
            const position = this.state.lastPosition || this.state.startCentroid;
            this.emitPressEvent(targetElement, "end", relevantPointers, event, position);
          }
          this.resetState();
        }
        break;
      case "pointercancel":
      case "forceCancel":
        this.cancelPress(targetElement, relevantPointers, event);
        break;
      default:
        break;
    }
  };
  /**
   * Emit press-specific events with additional data
   */
  emitPressEvent(element, phase, pointers, event, position) {
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    const currentDuration = event.timeStamp - this.state.startTime;
    const customEventData = {
      gestureName: this.name,
      centroid: position,
      target: event.target,
      srcEvent: event,
      phase,
      pointers,
      timeStamp: event.timeStamp,
      x: position.x,
      y: position.y,
      duration: currentDuration,
      activeGestures,
      customData: this.customData
    };
    const eventName = createEventName(this.name, phase);
    const domEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    element.dispatchEvent(domEvent);
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
  }
  /**
   * Cancel the current press gesture
   */
  cancelPress(element, pointers, event) {
    if (this.isActive && this.state.pressThresholdReached) {
      const position = this.state.lastPosition || this.state.startCentroid;
      this.emitPressEvent(element ?? this.element, "cancel", pointers, event, position);
      this.emitPressEvent(element ?? this.element, "end", pointers, event, position);
    }
    this.resetState();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/PressAndDragGesture.js
var PressAndDragGesture = class _PressAndDragGesture extends PointerGesture {
  state = {
    phase: "waitingForPress",
    dragTimeoutId: null
  };
  /**
   * Duration required for press recognition
   */
  /**
   * Maximum distance a pointer can move during press for it to still be considered a press
   */
  /**
   * Maximum time between press completion and drag start
   */
  /**
   * Movement threshold for drag activation
   */
  /**
   * Allowed directions for the drag gesture
   */
  constructor(options) {
    super(options);
    this.pressDuration = options.pressDuration ?? 500;
    this.pressMaxDistance = options.pressMaxDistance ?? 10;
    this.dragTimeout = options.dragTimeout ?? 1e3;
    this.dragThreshold = options.dragThreshold ?? 0;
    this.dragDirection = options.dragDirection || ["up", "down", "left", "right"];
    this.pressGesture = new PressGesture({
      name: `${this.name}-press`,
      duration: this.pressDuration,
      maxDistance: this.pressMaxDistance,
      maxPointers: this.maxPointers,
      pointerMode: this.pointerMode,
      requiredKeys: this.requiredKeys,
      preventIf: this.preventIf,
      pointerOptions: structuredClone(this.pointerOptions)
    });
    this.panGesture = new PanGesture({
      name: `${this.name}-pan`,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      threshold: this.dragThreshold,
      direction: this.dragDirection,
      pointerMode: this.pointerMode,
      requiredKeys: this.requiredKeys,
      preventIf: this.preventIf,
      pointerOptions: structuredClone(this.pointerOptions)
    });
  }
  clone(overrides) {
    return new _PressAndDragGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      pressDuration: this.pressDuration,
      pressMaxDistance: this.pressMaxDistance,
      dragTimeout: this.dragTimeout,
      dragThreshold: this.dragThreshold,
      dragDirection: [...this.dragDirection],
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.pressGesture.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.panGesture.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.element.addEventListener(this.pressGesture.name, this.pressHandler);
    this.element.addEventListener(`${this.panGesture.name}Start`, this.dragStartHandler);
    this.element.addEventListener(this.panGesture.name, this.dragMoveHandler);
    this.element.addEventListener(`${this.panGesture.name}End`, this.dragEndHandler);
    this.element.addEventListener(`${this.panGesture.name}Cancel`, this.dragEndHandler);
  }
  destroy() {
    this.resetState();
    this.pressGesture.destroy();
    this.panGesture.destroy();
    this.element.removeEventListener(this.pressGesture.name, this.pressHandler);
    this.element.removeEventListener(`${this.panGesture.name}Start`, this.dragStartHandler);
    this.element.removeEventListener(this.panGesture.name, this.dragMoveHandler);
    this.element.removeEventListener(`${this.panGesture.name}End`, this.dragEndHandler);
    this.element.removeEventListener(`${this.panGesture.name}Cancel`, this.dragEndHandler);
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.pressDuration = options.pressDuration ?? this.pressDuration;
    this.pressMaxDistance = options.pressMaxDistance ?? this.pressMaxDistance;
    this.dragTimeout = options.dragTimeout ?? this.dragTimeout;
    this.dragThreshold = options.dragThreshold ?? this.dragThreshold;
    this.dragDirection = options.dragDirection || this.dragDirection;
    this.element.dispatchEvent(new CustomEvent(`${this.panGesture.name}ChangeOptions`, {
      detail: {
        minPointers: this.minPointers,
        maxPointers: this.maxPointers,
        threshold: this.dragThreshold,
        direction: this.dragDirection,
        pointerMode: this.pointerMode,
        requiredKeys: this.requiredKeys,
        preventIf: this.preventIf,
        pointerOptions: structuredClone(this.pointerOptions)
      }
    }));
    this.element.dispatchEvent(new CustomEvent(`${this.pressGesture.name}ChangeOptions`, {
      detail: {
        duration: this.pressDuration,
        maxDistance: this.pressMaxDistance,
        maxPointers: this.maxPointers,
        pointerMode: this.pointerMode,
        requiredKeys: this.requiredKeys,
        preventIf: this.preventIf,
        pointerOptions: structuredClone(this.pointerOptions)
      }
    }));
  }
  resetState() {
    if (this.state.dragTimeoutId !== null) {
      clearTimeout(this.state.dragTimeoutId);
    }
    this.restoreTouchAction();
    this.isActive = false;
    this.state = {
      phase: "waitingForPress",
      dragTimeoutId: null
    };
  }
  /**
   * This can be empty because the PressAndDragGesture relies on PressGesture and PanGesture to handle pointer events
   * The internal gestures will manage their own state and events, while this class coordinates between them
   */
  handlePointerEvent() {
  }
  pressHandler = () => {
    if (this.state.phase !== "waitingForPress") {
      return;
    }
    this.state.phase = "pressDetected";
    this.setTouchAction();
    this.state.dragTimeoutId = setTimeout(() => {
      this.resetState();
    }, this.dragTimeout);
  };
  dragStartHandler = (event) => {
    if (this.state.phase !== "pressDetected") {
      return;
    }
    if (this.state.dragTimeoutId !== null) {
      clearTimeout(this.state.dragTimeoutId);
      this.state.dragTimeoutId = null;
    }
    this.restoreTouchAction();
    this.state.phase = "dragging";
    this.isActive = true;
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  dragMoveHandler = (event) => {
    if (this.state.phase !== "dragging") {
      return;
    }
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  dragEndHandler = (event) => {
    if (this.state.phase !== "dragging") {
      return;
    }
    this.resetState();
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  setTouchAction() {
    this.element.addEventListener("touchstart", preventDefault, {
      passive: false
    });
    this.element.addEventListener("touchmove", preventDefault, {
      passive: false
    });
    this.element.addEventListener("touchend", preventDefault, {
      passive: false
    });
  }
  restoreTouchAction() {
    this.element.removeEventListener("touchstart", preventDefault);
    this.element.removeEventListener("touchmove", preventDefault);
    this.element.removeEventListener("touchend", preventDefault);
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/TapGesture.js
var TapGesture = class _TapGesture extends PointerGesture {
  state = {
    startCentroid: null,
    currentTapCount: 0,
    lastTapTime: 0,
    lastPosition: null
  };
  /**
   * Maximum distance a pointer can move for a gesture to still be considered a tap
   */
  /**
   * Number of consecutive taps to detect
   */
  constructor(options) {
    super(options);
    this.maxDistance = options.maxDistance ?? 10;
    this.taps = options.taps ?? 1;
  }
  clone(overrides) {
    return new _TapGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      maxDistance: this.maxDistance,
      taps: this.taps,
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  destroy() {
    this.resetState();
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.maxDistance = options.maxDistance ?? this.maxDistance;
    this.taps = options.taps ?? this.taps;
  }
  resetState() {
    this.isActive = false;
    this.state = {
      startCentroid: null,
      currentTapCount: 0,
      lastTapTime: 0,
      lastPosition: null
    };
  }
  /**
   * Handle pointer events for the tap gesture
   */
  handlePointerEvent = (pointers, event) => {
    const pointersArray = Array.from(pointers.values());
    const targetElement = this.getTargetElement(event);
    if (!targetElement) {
      return;
    }
    const relevantPointers = this.getRelevantPointers(pointersArray, targetElement);
    if (this.shouldPreventGesture(targetElement, event.pointerType) || !this.isWithinPointerCount(relevantPointers, event.pointerType)) {
      if (this.isActive) {
        this.cancelTap(targetElement, relevantPointers, event);
      }
      return;
    }
    switch (event.type) {
      case "pointerdown":
        if (!this.isActive) {
          this.state.startCentroid = calculateCentroid(relevantPointers);
          this.state.lastPosition = _extends({}, this.state.startCentroid);
          this.isActive = true;
          this.originalTarget = targetElement;
        }
        break;
      case "pointermove":
        if (this.isActive && this.state.startCentroid) {
          const currentPosition = calculateCentroid(relevantPointers);
          this.state.lastPosition = currentPosition;
          const deltaX = currentPosition.x - this.state.startCentroid.x;
          const deltaY = currentPosition.y - this.state.startCentroid.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance > this.maxDistance) {
            this.cancelTap(targetElement, relevantPointers, event);
          }
        }
        break;
      case "pointerup":
        if (this.isActive) {
          this.state.currentTapCount += 1;
          const position = this.state.lastPosition || this.state.startCentroid;
          if (!position) {
            this.cancelTap(targetElement, relevantPointers, event);
            return;
          }
          if (this.state.currentTapCount >= this.taps) {
            this.fireTapEvent(targetElement, relevantPointers, event, position);
            this.resetState();
          } else {
            this.state.lastTapTime = event.timeStamp;
            this.isActive = false;
            this.state.startCentroid = null;
            setTimeout(() => {
              if (this.state && this.state.currentTapCount > 0 && this.state.currentTapCount < this.taps) {
                this.state.currentTapCount = 0;
              }
            }, 300);
          }
        }
        break;
      case "pointercancel":
      case "forceCancel":
        this.cancelTap(targetElement, relevantPointers, event);
        break;
      default:
        break;
    }
  };
  /**
   * Fire the main tap event when a valid tap is detected
   */
  fireTapEvent(element, pointers, event, position) {
    const activeGestures = this.gesturesRegistry.getActiveGestures(element);
    const customEventData = {
      gestureName: this.name,
      centroid: position,
      target: event.target,
      srcEvent: event,
      phase: "end",
      // The tap is complete, so we use 'end' state for the event data
      pointers,
      timeStamp: event.timeStamp,
      x: position.x,
      y: position.y,
      tapCount: this.state.currentTapCount,
      activeGestures,
      customData: this.customData
    };
    const domEvent = new CustomEvent(this.name, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    element.dispatchEvent(domEvent);
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
  }
  /**
   * Cancel the current tap gesture
   */
  cancelTap(element, pointers, event) {
    if (this.state.startCentroid || this.state.lastPosition) {
      const position = this.state.lastPosition || this.state.startCentroid;
      const activeGestures = this.gesturesRegistry.getActiveGestures(element);
      const customEventData = {
        gestureName: this.name,
        centroid: position,
        target: event.target,
        srcEvent: event,
        phase: "cancel",
        pointers,
        timeStamp: event.timeStamp,
        x: position.x,
        y: position.y,
        tapCount: this.state.currentTapCount,
        activeGestures,
        customData: this.customData
      };
      const eventName = createEventName(this.name, "cancel");
      const domEvent = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: customEventData
      });
      element.dispatchEvent(domEvent);
    }
    this.resetState();
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/TapAndDragGesture.js
var TapAndDragGesture = class _TapAndDragGesture extends PointerGesture {
  state = {
    phase: "waitingForTap",
    dragTimeoutId: null
  };
  /**
   * Maximum distance a pointer can move during tap for it to still be considered a tap
   * (Following TapGesture pattern)
   */
  /**
   * Maximum time between tap completion and drag start
   */
  /**
   * Movement threshold for drag activation
   */
  /**
   * Allowed directions for the drag gesture
   */
  constructor(options) {
    super(options);
    this.tapMaxDistance = options.tapMaxDistance ?? 10;
    this.dragTimeout = options.dragTimeout ?? 1e3;
    this.dragThreshold = options.dragThreshold ?? 0;
    this.dragDirection = options.dragDirection || ["up", "down", "left", "right"];
    this.tapGesture = new TapGesture({
      name: `${this.name}-tap`,
      maxDistance: this.tapMaxDistance,
      maxPointers: this.maxPointers,
      pointerMode: this.pointerMode,
      requiredKeys: this.requiredKeys,
      preventIf: this.preventIf,
      pointerOptions: structuredClone(this.pointerOptions)
    });
    this.panGesture = new PanGesture({
      name: `${this.name}-pan`,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      threshold: this.dragThreshold,
      direction: this.dragDirection,
      pointerMode: this.pointerMode,
      requiredKeys: this.requiredKeys,
      preventIf: this.preventIf,
      pointerOptions: structuredClone(this.pointerOptions)
    });
  }
  clone(overrides) {
    return new _TapAndDragGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      minPointers: this.minPointers,
      maxPointers: this.maxPointers,
      tapMaxDistance: this.tapMaxDistance,
      dragTimeout: this.dragTimeout,
      dragThreshold: this.dragThreshold,
      dragDirection: [...this.dragDirection],
      requiredKeys: [...this.requiredKeys],
      pointerMode: [...this.pointerMode],
      preventIf: [...this.preventIf],
      pointerOptions: structuredClone(this.pointerOptions)
    }, overrides));
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.tapGesture.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.panGesture.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.element.addEventListener(this.tapGesture.name, this.tapHandler);
    this.element.addEventListener(`${this.panGesture.name}Start`, this.dragStartHandler);
    this.element.addEventListener(this.panGesture.name, this.dragMoveHandler);
    this.element.addEventListener(`${this.panGesture.name}End`, this.dragEndHandler);
    this.element.addEventListener(`${this.panGesture.name}Cancel`, this.dragEndHandler);
  }
  destroy() {
    this.resetState();
    this.tapGesture.destroy();
    this.panGesture.destroy();
    this.element.removeEventListener(this.tapGesture.name, this.tapHandler);
    this.element.removeEventListener(`${this.panGesture.name}Start`, this.dragStartHandler);
    this.element.removeEventListener(this.panGesture.name, this.dragMoveHandler);
    this.element.removeEventListener(`${this.panGesture.name}End`, this.dragEndHandler);
    this.element.removeEventListener(`${this.panGesture.name}Cancel`, this.dragEndHandler);
    super.destroy();
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.tapMaxDistance = options.tapMaxDistance ?? this.tapMaxDistance;
    this.dragTimeout = options.dragTimeout ?? this.dragTimeout;
    this.dragThreshold = options.dragThreshold ?? this.dragThreshold;
    this.dragDirection = options.dragDirection || this.dragDirection;
    this.element.dispatchEvent(new CustomEvent(`${this.panGesture.name}ChangeOptions`, {
      detail: {
        minPointers: this.minPointers,
        maxPointers: this.maxPointers,
        threshold: this.dragThreshold,
        direction: this.dragDirection,
        pointerMode: this.pointerMode,
        requiredKeys: this.requiredKeys,
        preventIf: this.preventIf,
        pointerOptions: structuredClone(this.pointerOptions)
      }
    }));
    this.element.dispatchEvent(new CustomEvent(`${this.tapGesture.name}ChangeOptions`, {
      detail: {
        maxDistance: this.tapMaxDistance,
        maxPointers: this.maxPointers,
        pointerMode: this.pointerMode,
        requiredKeys: this.requiredKeys,
        preventIf: this.preventIf,
        pointerOptions: structuredClone(this.pointerOptions)
      }
    }));
  }
  resetState() {
    if (this.state.dragTimeoutId !== null) {
      clearTimeout(this.state.dragTimeoutId);
    }
    this.restoreTouchAction();
    this.isActive = false;
    this.state = {
      phase: "waitingForTap",
      dragTimeoutId: null
    };
  }
  /**
   * This can be empty because the TapAndDragGesture relies on TapGesture and PanGesture to handle pointer events
   * The internal gestures will manage their own state and events, while this class coordinates between them
   */
  handlePointerEvent() {
  }
  tapHandler = () => {
    if (this.state.phase !== "waitingForTap") {
      return;
    }
    this.state.phase = "tapDetected";
    this.setTouchAction();
    this.state.dragTimeoutId = setTimeout(() => {
      this.resetState();
    }, this.dragTimeout);
  };
  dragStartHandler = (event) => {
    if (this.state.phase !== "tapDetected") {
      return;
    }
    if (this.state.dragTimeoutId !== null) {
      clearTimeout(this.state.dragTimeoutId);
      this.state.dragTimeoutId = null;
    }
    this.restoreTouchAction();
    this.state.phase = "dragging";
    this.isActive = true;
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  dragMoveHandler = (event) => {
    if (this.state.phase !== "dragging") {
      return;
    }
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  dragEndHandler = (event) => {
    if (this.state.phase !== "dragging") {
      return;
    }
    this.resetState();
    this.element.dispatchEvent(new CustomEvent(createEventName(this.name, event.detail.phase), event));
  };
  setTouchAction() {
    this.element.addEventListener("touchstart", preventDefault, {
      passive: false
    });
  }
  restoreTouchAction() {
    this.element.removeEventListener("touchstart", preventDefault);
  }
};

// node_modules/@mui/x-internal-gestures/esm/core/gestures/TurnWheelGesture.js
var TurnWheelGesture = class _TurnWheelGesture extends Gesture {
  state = {
    totalDeltaX: 0,
    totalDeltaY: 0,
    totalDeltaZ: 0
  };
  /**
   * Scaling factor for delta values
   * Values > 1 increase sensitivity, values < 1 decrease sensitivity
   */
  /**
   * Maximum value for totalDelta values
   * Limits how large the accumulated wheel deltas can be
   */
  /**
   * Minimum value for totalDelta values
   * Sets a lower bound for accumulated wheel deltas
   */
  /**
   * Initial value for totalDelta values
   * Sets the starting value for delta trackers
   */
  /**
   * Whether to invert the direction of delta changes
   * When true, reverses the sign of deltaX, deltaY, and deltaZ values
   */
  constructor(options) {
    super(options);
    this.sensitivity = options.sensitivity ?? 1;
    this.max = options.max ?? Number.MAX_SAFE_INTEGER;
    this.min = options.min ?? Number.MIN_SAFE_INTEGER;
    this.initialDelta = options.initialDelta ?? 0;
    this.invert = options.invert ?? false;
    this.state.totalDeltaX = this.initialDelta;
    this.state.totalDeltaY = this.initialDelta;
    this.state.totalDeltaZ = this.initialDelta;
  }
  clone(overrides) {
    return new _TurnWheelGesture(_extends({
      name: this.name,
      preventDefault: this.preventDefault,
      stopPropagation: this.stopPropagation,
      sensitivity: this.sensitivity,
      max: this.max,
      min: this.min,
      initialDelta: this.initialDelta,
      invert: this.invert,
      requiredKeys: [...this.requiredKeys],
      preventIf: [...this.preventIf]
    }, overrides));
  }
  init(element, pointerManager, gestureRegistry, keyboardManager) {
    super.init(element, pointerManager, gestureRegistry, keyboardManager);
    this.element.addEventListener("wheel", this.handleWheelEvent);
  }
  destroy() {
    this.element.removeEventListener("wheel", this.handleWheelEvent);
    this.resetState();
    super.destroy();
  }
  resetState() {
    this.isActive = false;
    this.state = {
      totalDeltaX: 0,
      totalDeltaY: 0,
      totalDeltaZ: 0
    };
  }
  updateOptions(options) {
    super.updateOptions(options);
    this.sensitivity = options.sensitivity ?? this.sensitivity;
    this.max = options.max ?? this.max;
    this.min = options.min ?? this.min;
    this.initialDelta = options.initialDelta ?? this.initialDelta;
    this.invert = options.invert ?? this.invert;
  }
  /**
   * Handle wheel events for a specific element
   * @param element The element that received the wheel event
   * @param event The original wheel event
   */
  handleWheelEvent = (event) => {
    if (this.shouldPreventGesture(this.element, "mouse")) {
      return;
    }
    const pointers = this.pointerManager.getPointers() || /* @__PURE__ */ new Map();
    const pointersArray = Array.from(pointers.values());
    this.state.totalDeltaX += event.deltaX * this.sensitivity * (this.invert ? -1 : 1);
    this.state.totalDeltaY += event.deltaY * this.sensitivity * (this.invert ? -1 : 1);
    this.state.totalDeltaZ += event.deltaZ * this.sensitivity * (this.invert ? -1 : 1);
    ["totalDeltaX", "totalDeltaY", "totalDeltaZ"].forEach((axis) => {
      if (this.state[axis] < this.min) {
        this.state[axis] = this.min;
      }
      if (this.state[axis] > this.max) {
        this.state[axis] = this.max;
      }
    });
    this.emitWheelEvent(pointersArray, event);
  };
  /**
   * Emit wheel-specific events
   * @param pointers The current pointers on the element
   * @param event The original wheel event
   */
  emitWheelEvent(pointers, event) {
    const centroid = pointers.length > 0 ? calculateCentroid(pointers) : {
      x: event.clientX,
      y: event.clientY
    };
    const activeGestures = this.gesturesRegistry.getActiveGestures(this.element);
    const customEventData = {
      gestureName: this.name,
      centroid,
      target: event.target,
      srcEvent: event,
      phase: "ongoing",
      // Wheel events are always in "ongoing" state
      pointers,
      timeStamp: event.timeStamp,
      deltaX: event.deltaX * this.sensitivity * (this.invert ? -1 : 1),
      deltaY: event.deltaY * this.sensitivity * (this.invert ? -1 : 1),
      deltaZ: event.deltaZ * this.sensitivity * (this.invert ? -1 : 1),
      deltaMode: event.deltaMode,
      totalDeltaX: this.state.totalDeltaX,
      totalDeltaY: this.state.totalDeltaY,
      totalDeltaZ: this.state.totalDeltaZ,
      activeGestures,
      customData: this.customData
    };
    if (this.preventDefault) {
      event.preventDefault();
    }
    if (this.stopPropagation) {
      event.stopPropagation();
    }
    const eventName = createEventName(this.name, "ongoing");
    const domEvent = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: customEventData
    });
    this.element.dispatchEvent(domEvent);
  }
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartInteractionListener/useChartInteractionListener.js
var preventDefault2 = (event) => event.preventDefault();
var useChartInteractionListener = ({
  svgRef
}) => {
  const gestureManagerRef = React11.useRef(null);
  React11.useEffect(() => {
    const svg = svgRef.current;
    if (!gestureManagerRef.current) {
      gestureManagerRef.current = new GestureManager({
        gestures: [
          // We separate the zoom gestures from the gestures that are not zoom related
          // This allows us to configure the zoom gestures based on the zoom configuration.
          new PanGesture({
            name: "pan",
            threshold: 0,
            maxPointers: 1
          }),
          new MoveGesture({
            name: "move",
            preventIf: ["pan", "zoomPinch", "zoomPan"]
          }),
          new TapGesture({
            name: "tap",
            preventIf: ["pan", "zoomPinch", "zoomPan"]
          }),
          new PressGesture({
            name: "quickPress",
            duration: 50
          }),
          new PanGesture({
            name: "brush",
            threshold: 0,
            maxPointers: 1
          }),
          // Zoom gestures
          new PanGesture({
            name: "zoomPan",
            threshold: 0,
            preventIf: ["zoomTapAndDrag", "zoomPressAndDrag"]
          }),
          new PinchGesture({
            name: "zoomPinch",
            threshold: 5
          }),
          new TurnWheelGesture({
            name: "zoomTurnWheel",
            sensitivity: 0.01,
            initialDelta: 1
          }),
          new TurnWheelGesture({
            name: "panTurnWheel",
            sensitivity: 0.5
          }),
          new TapAndDragGesture({
            name: "zoomTapAndDrag",
            dragThreshold: 10
          }),
          new PressAndDragGesture({
            name: "zoomPressAndDrag",
            dragThreshold: 10,
            preventIf: ["zoomPinch"]
          }),
          new TapGesture({
            name: "zoomDoubleTapReset",
            taps: 2
          })
        ]
      });
    }
    const gestureManager = gestureManagerRef.current;
    if (!svg || !gestureManager) {
      return void 0;
    }
    gestureManager.registerElement(["pan", "move", "zoomPinch", "zoomPan", "zoomTurnWheel", "panTurnWheel", "tap", "quickPress", "zoomTapAndDrag", "zoomPressAndDrag", "zoomDoubleTapReset", "brush"], svg);
    return () => {
      gestureManager.unregisterAllGestures(svg);
    };
  }, [svgRef, gestureManagerRef]);
  const addInteractionListener = React11.useCallback((interaction, callback, options) => {
    const svg = svgRef.current;
    svg?.addEventListener(interaction, callback, options);
    return {
      cleanup: () => svg?.removeEventListener(interaction, callback)
    };
  }, [svgRef]);
  const updateZoomInteractionListeners = React11.useCallback((interaction, options) => {
    const svg = svgRef.current;
    const gestureManager = gestureManagerRef.current;
    if (!gestureManager || !svg) {
      return;
    }
    gestureManager.setGestureOptions(interaction, svg, options ?? {});
  }, [svgRef, gestureManagerRef]);
  React11.useEffect(() => {
    const svg = svgRef.current;
    svg?.addEventListener("gesturestart", preventDefault2);
    svg?.addEventListener("gesturechange", preventDefault2);
    svg?.addEventListener("gestureend", preventDefault2);
    return () => {
      svg?.removeEventListener("gesturestart", preventDefault2);
      svg?.removeEventListener("gesturechange", preventDefault2);
      svg?.removeEventListener("gestureend", preventDefault2);
    };
  }, [svgRef]);
  return {
    instance: {
      addInteractionListener,
      updateZoomInteractionListeners
    }
  };
};
useChartInteractionListener.params = {};
useChartInteractionListener.getInitialState = () => {
  return {};
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/corePlugins.js
var CHART_CORE_PLUGINS = [useChartId, useChartExperimentalFeatures, useChartDimensions, useChartSeries, useChartInteractionListener, useChartAnimation];

// node_modules/@mui/x-charts/esm/internals/store/extractPluginParamsFromProps.js
var _excluded = ["apiRef"];
var extractPluginParamsFromProps = (_ref) => {
  let {
    plugins
  } = _ref, props = _objectWithoutPropertiesLoose(_ref.props, _excluded);
  const paramsLookup = {};
  plugins.forEach((plugin) => {
    Object.assign(paramsLookup, plugin.params);
  });
  const pluginParams = {};
  Object.keys(props).forEach((propName) => {
    const prop = props[propName];
    if (paramsLookup[propName]) {
      pluginParams[propName] = prop;
    }
  });
  const defaultizedPluginParams = plugins.reduce((acc, plugin) => {
    if (plugin.getDefaultizedParams) {
      return plugin.getDefaultizedParams({
        params: acc
      });
    }
    return acc;
  }, pluginParams);
  return defaultizedPluginParams;
};

// node_modules/@mui/x-charts/esm/internals/store/useCharts.js
var globalId = 0;
function useCharts(inPlugins, props, seriesConfig) {
  const chartId = useId();
  const plugins = React12.useMemo(() => [...CHART_CORE_PLUGINS, ...inPlugins], [inPlugins]);
  const pluginParams = extractPluginParamsFromProps({
    plugins,
    props
  });
  pluginParams.id = pluginParams.id ?? chartId;
  const instanceRef = React12.useRef({});
  const instance = instanceRef.current;
  const publicAPI = useChartApiInitialization(props.apiRef);
  const innerChartRootRef = React12.useRef(null);
  const innerSvgRef = React12.useRef(null);
  const storeRef = React12.useRef(null);
  if (storeRef.current == null) {
    globalId += 1;
    const initialState = {
      cacheKey: {
        id: globalId
      }
    };
    plugins.forEach((plugin) => {
      if (plugin.getInitialState) {
        Object.assign(initialState, plugin.getInitialState(pluginParams, initialState, seriesConfig));
      }
    });
    storeRef.current = new Store(initialState);
  }
  const runPlugin = (plugin) => {
    const pluginResponse = plugin({
      instance,
      params: pluginParams,
      plugins,
      store: storeRef.current,
      svgRef: innerSvgRef,
      chartRootRef: innerChartRootRef,
      seriesConfig
    });
    if (pluginResponse.publicAPI) {
      Object.assign(publicAPI.current, pluginResponse.publicAPI);
    }
    if (pluginResponse.instance) {
      Object.assign(instance, pluginResponse.instance);
    }
  };
  plugins.forEach(runPlugin);
  const contextValue = React12.useMemo(() => ({
    store: storeRef.current,
    publicAPI: publicAPI.current,
    instance,
    svgRef: innerSvgRef,
    chartRootRef: innerChartRootRef
  }), [instance, publicAPI]);
  return {
    contextValue
  };
}
function initializeInputApiRef(inputApiRef) {
  if (inputApiRef.current == null) {
    inputApiRef.current = {};
  }
  return inputApiRef;
}
function useChartApiInitialization(inputApiRef) {
  const fallbackPublicApiRef = React12.useRef({});
  if (inputApiRef) {
    return initializeInputApiRef(inputApiRef);
  }
  return fallbackPublicApiRef;
}

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartContext.js
var React13 = __toESM(require_react(), 1);
var ChartContext = React13.createContext(null);
if (true) ChartContext.displayName = "ChartContext";

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxis.js
var React14 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/defaultizeAxis.js
function defaultizeXAxis(inAxes, dataset) {
  const offsets = {
    top: 0,
    bottom: 0,
    none: 0
  };
  const inputAxes = inAxes && inAxes.length > 0 ? inAxes : [{
    id: DEFAULT_X_AXIS_KEY,
    scaleType: "linear"
  }];
  const parsedAxes = inputAxes.map((axisConfig, index2) => {
    const dataKey = axisConfig.dataKey;
    const defaultPosition = index2 === 0 ? "bottom" : "none";
    const position = axisConfig.position ?? defaultPosition;
    const defaultHeight = DEFAULT_AXIS_SIZE_HEIGHT + (axisConfig.label ? AXIS_LABEL_DEFAULT_HEIGHT : 0);
    const id = axisConfig.id ?? `defaultized-x-axis-${index2}`;
    const sharedConfig = _extends({
      offset: offsets[position]
    }, axisConfig, {
      id,
      position,
      height: axisConfig.height ?? defaultHeight,
      zoom: defaultizeZoom(axisConfig.zoom, id, "x", axisConfig.reverse)
    });
    if (position !== "none") {
      offsets[position] += sharedConfig.height;
      if (sharedConfig.zoom?.slider.enabled) {
        offsets[position] += sharedConfig.zoom.slider.size;
      }
    }
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return sharedConfig;
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: x-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({}, sharedConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  });
  return parsedAxes;
}
function defaultizeYAxis(inAxes, dataset) {
  const offsets = {
    right: 0,
    left: 0,
    none: 0
  };
  const inputAxes = inAxes && inAxes.length > 0 ? inAxes : [{
    id: DEFAULT_Y_AXIS_KEY,
    scaleType: "linear"
  }];
  const parsedAxes = inputAxes.map((axisConfig, index2) => {
    const dataKey = axisConfig.dataKey;
    const defaultPosition = index2 === 0 ? "left" : "none";
    const position = axisConfig.position ?? defaultPosition;
    const defaultWidth = DEFAULT_AXIS_SIZE_WIDTH + (axisConfig.label ? AXIS_LABEL_DEFAULT_HEIGHT : 0);
    const id = axisConfig.id ?? `defaultized-y-axis-${index2}`;
    const sharedConfig = _extends({
      offset: offsets[position]
    }, axisConfig, {
      id,
      position,
      width: axisConfig.width ?? defaultWidth,
      zoom: defaultizeZoom(axisConfig.zoom, id, "y", axisConfig.reverse)
    });
    if (position !== "none") {
      offsets[position] += sharedConfig.width;
      if (sharedConfig.zoom?.slider.enabled) {
        offsets[position] += sharedConfig.zoom.slider.size;
      }
    }
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return sharedConfig;
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: y-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({}, sharedConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  });
  return parsedAxes;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisValue.js
function getAsANumber(value) {
  return value instanceof Date ? value.getTime() : value;
}
function getAxisIndex2(axisConfig, pointerValue) {
  const {
    scale,
    data: axisData,
    reverse: reverse2
  } = axisConfig;
  if (!isOrdinalScale(scale)) {
    const value = scale.invert(pointerValue);
    if (axisData === void 0) {
      return -1;
    }
    const valueAsNumber = getAsANumber(value);
    const closestIndex = axisData?.findIndex((pointValue, index2) => {
      const v = getAsANumber(pointValue);
      if (v > valueAsNumber) {
        if (index2 === 0 || Math.abs(valueAsNumber - v) <= Math.abs(valueAsNumber - getAsANumber(axisData[index2 - 1]))) {
          return true;
        }
      }
      if (v <= valueAsNumber) {
        if (index2 === axisData.length - 1 || Math.abs(getAsANumber(value) - v) < Math.abs(getAsANumber(value) - getAsANumber(axisData[index2 + 1]))) {
          return true;
        }
      }
      return false;
    });
    return closestIndex;
  }
  const dataIndex = scale.bandwidth() === 0 ? Math.floor((pointerValue - Math.min(...scale.range()) + scale.step() / 2) / scale.step()) : Math.floor((pointerValue - Math.min(...scale.range())) / scale.step());
  if (dataIndex < 0 || dataIndex >= axisData.length) {
    return -1;
  }
  return reverse2 ? axisData.length - 1 - dataIndex : dataIndex;
}
function getAxisValue(scale, axisData, pointerValue, dataIndex) {
  if (!isOrdinalScale(scale)) {
    if (dataIndex === null) {
      const invertedValue = scale.invert(pointerValue);
      return Number.isNaN(invertedValue) ? null : invertedValue;
    }
    return axisData[dataIndex];
  }
  if (dataIndex === null || dataIndex < 0 || dataIndex >= axisData.length) {
    return null;
  }
  return axisData[dataIndex];
}

// node_modules/@mui/x-internals/esm/isDeepEqual/isDeepEqual.js
function isDeepEqual(a2, b) {
  if (a2 === b) {
    return true;
  }
  if (a2 && b && typeof a2 === "object" && typeof b === "object") {
    if (a2.constructor !== b.constructor) {
      return false;
    }
    if (Array.isArray(a2)) {
      const length2 = a2.length;
      if (length2 !== b.length) {
        return false;
      }
      for (let i = 0; i < length2; i += 1) {
        if (!isDeepEqual(a2[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Map && b instanceof Map) {
      if (a2.size !== b.size) {
        return false;
      }
      const entriesA = Array.from(a2.entries());
      for (let i = 0; i < entriesA.length; i += 1) {
        if (!b.has(entriesA[i][0])) {
          return false;
        }
      }
      for (let i = 0; i < entriesA.length; i += 1) {
        const entryA = entriesA[i];
        if (!isDeepEqual(entryA[1], b.get(entryA[0]))) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Set && b instanceof Set) {
      if (a2.size !== b.size) {
        return false;
      }
      const entries = Array.from(a2.entries());
      for (let i = 0; i < entries.length; i += 1) {
        if (!b.has(entries[i][0])) {
          return false;
        }
      }
      return true;
    }
    if (ArrayBuffer.isView(a2) && ArrayBuffer.isView(b)) {
      const length2 = a2.length;
      if (length2 !== b.length) {
        return false;
      }
      for (let i = 0; i < length2; i += 1) {
        if (a2[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    if (a2.constructor === RegExp) {
      return a2.source === b.source && a2.flags === b.flags;
    }
    if (a2.valueOf !== Object.prototype.valueOf) {
      return a2.valueOf() === b.valueOf();
    }
    if (a2.toString !== Object.prototype.toString) {
      return a2.toString() === b.toString();
    }
    const keys = Object.keys(a2);
    const length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (let i = 0; i < length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (let i = 0; i < length; i += 1) {
      const key = keys[i];
      if (!isDeepEqual(a2[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a2 !== a2 && b !== b;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianInteraction.selectors.js
function indexGetter(value, axes, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map((id) => getAxisIndex2(axes.axis[id], value)) : getAxisIndex2(axes.axis[ids], value);
}
var selectChartsInteractionAxisIndex = (value, axes, id) => {
  if (value === null) {
    return null;
  }
  const index2 = indexGetter(value, axes, id);
  return index2 === -1 ? null : index2;
};
var selectorChartsInteractionXAxisIndex = createSelector2(selectorChartsInteractionPointerX, selectorChartXAxis, selectChartsInteractionAxisIndex);
var selectorChartsInteractionYAxisIndex = createSelector2(selectorChartsInteractionPointerY, selectorChartYAxis, selectChartsInteractionAxisIndex);
var selectorChartAxisInteraction = createSelector2(selectorChartsInteractionPointerX, selectorChartsInteractionPointerY, selectorChartXAxis, selectorChartYAxis, (x2, y2, xAxis, yAxis) => [...x2 === null ? [] : xAxis.axisIds.map((axisId) => ({
  axisId,
  dataIndex: indexGetter(x2, xAxis, axisId)
})), ...y2 === null ? [] : yAxis.axisIds.map((axisId) => ({
  axisId,
  dataIndex: indexGetter(y2, yAxis, axisId)
}))].filter((item) => item.dataIndex !== null && item.dataIndex >= 0));
function valueGetter(value, axes, indexes2, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map((id, axisIndex) => {
    const axis = axes.axis[id];
    return getAxisValue(axis.scale, axis.data, value, indexes2[axisIndex]);
  }) : getAxisValue(axes.axis[ids].scale, axes.axis[ids].data, value, indexes2);
}
var selectorChartsInteractionXAxisValue = createSelector2(selectorChartsInteractionPointerX, selectorChartXAxis, selectorChartsInteractionXAxisIndex, (x2, xAxes, xIndex, id) => {
  if (x2 === null || xAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(x2, xAxes, xIndex, id);
});
var selectorChartsInteractionYAxisValue = createSelector2(selectorChartsInteractionPointerY, selectorChartYAxis, selectorChartsInteractionYAxisIndex, (y2, yAxes, yIndex, id) => {
  if (y2 === null || yAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(y2, yAxes, yIndex, id);
});
var EMPTY_ARRAY2 = [];
var selectorChartsInteractionTooltipXAxes = createSelectorMemoizedWithOptions({
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
})(selectorChartsInteractionPointerX, selectorChartXAxis, (value, axes) => {
  if (value === null) {
    return EMPTY_ARRAY2;
  }
  return axes.axisIds.filter((id) => axes.axis[id].triggerTooltip).map((axisId) => ({
    axisId,
    dataIndex: getAxisIndex2(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
});
var selectorChartsInteractionTooltipYAxes = createSelectorMemoizedWithOptions({
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
})(selectorChartsInteractionPointerY, selectorChartYAxis, (value, axes) => {
  if (value === null) {
    return EMPTY_ARRAY2;
  }
  return axes.axisIds.filter((id) => axes.axis[id].triggerTooltip).map((axisId) => ({
    axisId,
    dataIndex: getAxisIndex2(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
});
var selectorChartsInteractionAxisTooltip = createSelector2(selectorChartsInteractionTooltipXAxes, selectorChartsInteractionTooltipYAxes, (xTooltip, yTooltip) => xTooltip.length > 0 || yTooltip.length > 0);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxis.js
var useChartCartesianAxis = ({
  params,
  store,
  seriesConfig,
  svgRef,
  instance
}) => {
  const {
    xAxis,
    yAxis,
    dataset,
    onHighlightedAxisChange
  } = params;
  if (true) {
    const ids = [...xAxis ?? [], ...yAxis ?? []].filter((axis) => axis.id).map((axis) => axis.id);
    const duplicates = new Set(ids.filter((id, index2) => ids.indexOf(id) !== index2));
    if (duplicates.size > 0) {
      warnOnce([`MUI X Charts: The following axis ids are duplicated: ${Array.from(duplicates).join(", ")}.`, `Please make sure that each axis has a unique id.`].join("\n"), "error");
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const processedSeries = useSelector(store, selectorChartSeriesProcessed);
  const isInteractionEnabled = useSelector(store, selectorChartsInteractionIsInitialized);
  const {
    axis: xAxisWithScale,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const {
    axis: yAxisWithScale,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  useAssertModelConsistency({
    warningPrefix: "MUI X Charts",
    componentName: "Chart",
    propName: "highlightedAxis",
    controlled: params.highlightedAxis,
    defaultValue: void 0
  });
  useEnhancedEffect_default(() => {
    if (params.highlightedAxis !== void 0) {
      store.set("controlledCartesianAxisHighlight", params.highlightedAxis);
    }
  }, [store, params.highlightedAxis]);
  const isFirstRender = React14.useRef(true);
  React14.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.set("cartesianAxis", {
      x: defaultizeXAxis(xAxis, dataset),
      y: defaultizeYAxis(yAxis, dataset)
    });
  }, [seriesConfig, drawingArea, xAxis, yAxis, dataset, store]);
  const usedXAxis = xAxisIds[0];
  const usedYAxis = yAxisIds[0];
  useStoreEffect(store, selectorChartAxisInteraction, (prevAxisInteraction, nextAxisInteraction) => {
    if (!onHighlightedAxisChange) {
      return;
    }
    if (Object.is(prevAxisInteraction, nextAxisInteraction)) {
      return;
    }
    if (prevAxisInteraction.length !== nextAxisInteraction.length) {
      onHighlightedAxisChange(nextAxisInteraction);
      return;
    }
    if (prevAxisInteraction?.some(({
      axisId,
      dataIndex
    }, itemIndex) => nextAxisInteraction[itemIndex].axisId !== axisId || nextAxisInteraction[itemIndex].dataIndex !== dataIndex)) {
      onHighlightedAxisChange(nextAxisInteraction);
    }
  });
  const hasInteractionPlugin = checkHasInteractionPlugin(instance);
  React14.useEffect(() => {
    const element = svgRef.current;
    if (!isInteractionEnabled || !hasInteractionPlugin || !element || params.disableAxisListener) {
      return () => {
      };
    }
    const moveEndHandler = instance.addInteractionListener("moveEnd", (event) => {
      if (!event.detail.activeGestures.pan) {
        instance.cleanInteraction();
      }
    });
    const panEndHandler = instance.addInteractionListener("panEnd", (event) => {
      if (!event.detail.activeGestures.move) {
        instance.cleanInteraction();
      }
    });
    const pressEndHandler = instance.addInteractionListener("quickPressEnd", (event) => {
      if (!event.detail.activeGestures.move && !event.detail.activeGestures.pan) {
        instance.cleanInteraction();
      }
    });
    const gestureHandler = (event) => {
      const srvEvent = event.detail.srcEvent;
      const target = event.detail.target;
      const svgPoint = getSVGPoint(element, srvEvent);
      if (event.detail.srcEvent.buttons >= 1 && target?.hasPointerCapture(event.detail.srcEvent.pointerId) && !target?.closest("[data-charts-zoom-slider]")) {
        target?.releasePointerCapture(event.detail.srcEvent.pointerId);
      }
      if (!instance.isPointInside(svgPoint.x, svgPoint.y, target)) {
        instance.cleanInteraction?.();
        return;
      }
      instance.setPointerCoordinate(svgPoint);
    };
    const moveHandler = instance.addInteractionListener("move", gestureHandler);
    const panHandler = instance.addInteractionListener("pan", gestureHandler);
    const pressHandler = instance.addInteractionListener("quickPress", gestureHandler);
    return () => {
      moveHandler.cleanup();
      moveEndHandler.cleanup();
      panHandler.cleanup();
      panEndHandler.cleanup();
      pressHandler.cleanup();
      pressEndHandler.cleanup();
    };
  }, [svgRef, store, xAxisWithScale, usedXAxis, yAxisWithScale, usedYAxis, instance, params.disableAxisListener, isInteractionEnabled, hasInteractionPlugin]);
  React14.useEffect(() => {
    const element = svgRef.current;
    const onAxisClick = params.onAxisClick;
    if (element === null || !onAxisClick) {
      return () => {
      };
    }
    const axisClickHandler = instance.addInteractionListener("tap", (event) => {
      let dataIndex = null;
      let isXAxis = false;
      const svgPoint = getSVGPoint(element, event.detail.srcEvent);
      const xIndex = getAxisIndex2(xAxisWithScale[usedXAxis], svgPoint.x);
      isXAxis = xIndex !== -1;
      dataIndex = isXAxis ? xIndex : getAxisIndex2(yAxisWithScale[usedYAxis], svgPoint.y);
      const USED_AXIS_ID = isXAxis ? xAxisIds[0] : yAxisIds[0];
      if (dataIndex == null || dataIndex === -1) {
        return;
      }
      const axisValue = (isXAxis ? xAxisWithScale : yAxisWithScale)[USED_AXIS_ID].data[dataIndex];
      const seriesValues = {};
      Object.keys(processedSeries).filter((seriesType) => ["bar", "line"].includes(seriesType)).forEach((seriesType) => {
        processedSeries[seriesType]?.seriesOrder.forEach((seriesId) => {
          const seriesItem = processedSeries[seriesType].series[seriesId];
          const providedXAxisId = seriesItem.xAxisId;
          const providedYAxisId = seriesItem.yAxisId;
          const axisKey = isXAxis ? providedXAxisId : providedYAxisId;
          if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
            seriesValues[seriesId] = seriesItem.data[dataIndex];
          }
        });
      });
      onAxisClick(event.detail.srcEvent, {
        dataIndex,
        axisValue,
        seriesValues
      });
    });
    return () => {
      axisClickHandler.cleanup();
    };
  }, [params.onAxisClick, processedSeries, svgRef, xAxisWithScale, xAxisIds, yAxisWithScale, yAxisIds, usedXAxis, usedYAxis, instance]);
  return {};
};
useChartCartesianAxis.params = {
  xAxis: true,
  yAxis: true,
  dataset: true,
  onAxisClick: true,
  disableAxisListener: true,
  onHighlightedAxisChange: true,
  highlightedAxis: true
};
useChartCartesianAxis.getDefaultizedParams = ({
  params
}) => {
  return _extends({}, params, {
    colors: params.colors ?? rainbowSurgePalette,
    theme: params.theme ?? "light",
    defaultizedXAxis: defaultizeXAxis(params.xAxis, params.dataset),
    defaultizedYAxis: defaultizeYAxis(params.yAxis, params.dataset)
  });
};
useChartCartesianAxis.getInitialState = (params) => _extends({
  cartesianAxis: {
    x: params.defaultizedXAxis,
    y: params.defaultizedYAxis
  }
}, params.highlightedAxis === void 0 ? {} : {
  controlledCartesianAxisHighlight: params.highlightedAxis
});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartBrush/useChartBrush.js
var React15 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartBrush/useChartBrush.selectors.js
var selectorBrush = (state) => state.brush;
var selectorBrushStart = createSelector2(selectorBrush, (brush) => brush?.start);
var selectorBrushCurrent = createSelector2(selectorBrush, (brush) => brush?.current);
var selectorBrushStartX = createSelector2(selectorBrush, (brush) => brush?.start?.x ?? null);
var selectorBrushStartY = createSelector2(selectorBrush, (brush) => brush?.start?.y ?? null);
var selectorBrushCurrentX = createSelector2(selectorBrush, (brush) => brush?.current?.x ?? null);
var selectorBrushCurrentY = createSelector2(selectorBrush, (brush) => brush?.current?.y ?? null);
var selectorBrushState = createSelector2(selectorBrushStartX, selectorBrushStartY, selectorBrushCurrentX, selectorBrushCurrentY, (startX, startY, currentX, currentY) => {
  if (startX === null || startY === null || currentX === null || currentY === null) {
    return null;
  }
  return {
    start: {
      x: startX,
      y: startY
    },
    current: {
      x: currentX,
      y: currentY
    }
  };
});
var selectorBrushConfigNoZoom = createSelector2(selectorChartSeriesProcessed, (series) => {
  let hasHorizontal = false;
  let isBothDirections = false;
  if (series) {
    Object.entries(series).forEach(([seriesType, seriesData]) => {
      if (Object.values(seriesData.series).some((s2) => s2.layout === "horizontal")) {
        hasHorizontal = true;
      }
      if (seriesType === "scatter" && seriesData.seriesOrder.length > 0) {
        isBothDirections = true;
      }
    });
  }
  if (isBothDirections) {
    return "xy";
  }
  if (hasHorizontal) {
    return "y";
  }
  return "x";
});
var selectorBrushConfigZoom = createSelector2(selectorChartZoomOptionsLookup, function selectorBrushConfigZoom2(optionsLookup) {
  let hasX = false;
  let hasY = false;
  Object.values(optionsLookup).forEach((options) => {
    if (options.axisDirection === "y") {
      hasY = true;
    }
    if (options.axisDirection === "x") {
      hasX = true;
    }
  });
  if (hasX && hasY) {
    return "xy";
  }
  if (hasY) {
    return "y";
  }
  if (hasX) {
    return "x";
  }
  return null;
});
var selectorBrushConfig = createSelector2(selectorBrushConfigNoZoom, selectorBrushConfigZoom, (configNoZoom, configZoom) => configZoom ?? configNoZoom);
var selectorIsBrushEnabled = createSelector2(selectorBrush, (brush) => brush?.enabled || brush?.isZoomBrushEnabled);
var selectorIsBrushSelectionActive = createSelector2(selectorIsBrushEnabled, selectorBrush, (isBrushEnabled, brush) => {
  return isBrushEnabled && brush?.start !== null && brush?.current !== null;
});
var selectorBrushShouldPreventAxisHighlight = createSelector2(selectorBrush, selectorIsBrushSelectionActive, (brush, isBrushSelectionActive) => isBrushSelectionActive && brush?.preventHighlight);
var selectorBrushShouldPreventTooltip = createSelector2(selectorBrush, selectorIsBrushSelectionActive, (brush, isBrushSelectionActive) => isBrushSelectionActive && brush?.preventTooltip);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartBrush/useChartBrush.js
var useChartBrush = ({
  store,
  svgRef,
  instance,
  params
}) => {
  const isEnabled = useSelector(store, selectorIsBrushEnabled);
  useEnhancedEffect_default(() => {
    store.set("brush", _extends({}, store.state.brush, {
      enabled: params.brushConfig.enabled,
      preventTooltip: params.brushConfig.preventTooltip,
      preventHighlight: params.brushConfig.preventHighlight
    }));
  }, [store, params.brushConfig.enabled, params.brushConfig.preventTooltip, params.brushConfig.preventHighlight]);
  const setBrushCoordinates = useEventCallback_default(function setBrushCoordinates2(point6) {
    store.set("brush", _extends({}, store.state.brush, {
      start: store.state.brush.start ?? point6,
      current: point6
    }));
  });
  const clearBrush = useEventCallback_default(function clearBrush2() {
    store.set("brush", _extends({}, store.state.brush, {
      start: null,
      current: null
    }));
  });
  const setZoomBrushEnabled = useEventCallback_default(function setZoomBrushEnabled2(enabled) {
    if (store.state.brush.isZoomBrushEnabled === enabled) {
      return;
    }
    store.set("brush", _extends({}, store.state.brush, {
      isZoomBrushEnabled: enabled
    }));
  });
  React15.useEffect(() => {
    const element = svgRef.current;
    if (element === null || !isEnabled) {
      return () => {
      };
    }
    const handleBrushStart = (event) => {
      if (event.detail.target?.closest("[data-charts-zoom-slider]")) {
        return;
      }
      const point6 = getSVGPoint(element, {
        clientX: event.detail.initialCentroid.x,
        clientY: event.detail.initialCentroid.y
      });
      setBrushCoordinates(point6);
    };
    const handleBrush = (event) => {
      const currentPoint = getSVGPoint(element, {
        clientX: event.detail.centroid.x,
        clientY: event.detail.centroid.y
      });
      setBrushCoordinates(currentPoint);
    };
    const brushStartHandler = instance.addInteractionListener("brushStart", handleBrushStart);
    const brushHandler = instance.addInteractionListener("brush", handleBrush);
    const brushCancelHandler = instance.addInteractionListener("brushCancel", clearBrush);
    const brushEndHandler = instance.addInteractionListener("brushEnd", clearBrush);
    return () => {
      brushStartHandler.cleanup();
      brushHandler.cleanup();
      brushEndHandler.cleanup();
      brushCancelHandler.cleanup();
    };
  }, [svgRef, instance, store, clearBrush, setBrushCoordinates, isEnabled]);
  return {
    instance: {
      setBrushCoordinates,
      clearBrush,
      setZoomBrushEnabled
    }
  };
};
useChartBrush.params = {
  brushConfig: true
};
useChartBrush.getDefaultizedParams = ({
  params
}) => {
  return _extends({}, params, {
    brushConfig: {
      enabled: params?.brushConfig?.enabled ?? false,
      preventTooltip: params?.brushConfig?.preventTooltip ?? true,
      preventHighlight: params?.brushConfig?.preventHighlight ?? true
    }
  });
};
useChartBrush.getInitialState = (params) => {
  return {
    brush: {
      enabled: params.brushConfig.enabled,
      isZoomBrushEnabled: false,
      preventTooltip: params.brushConfig.preventTooltip,
      preventHighlight: params.brushConfig.preventHighlight,
      start: null,
      current: null
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianHighlight.selectors.js
var selectorChartControlledCartesianAxisHighlight = (state) => state.controlledCartesianAxisHighlight;
var selectAxisHighlight = (computedIndex, axis, axisItems, isBrushSelectionActive) => {
  if (isBrushSelectionActive) {
    return [];
  }
  if (axisItems !== void 0) {
    return axisItems.filter((item) => axis.axis[item.axisId] !== void 0).map((item) => item);
  }
  return computedIndex === null ? [] : [{
    axisId: axis.axisIds[0],
    dataIndex: computedIndex
  }];
};
var selectorChartsHighlightXAxisIndex = createSelectorMemoized(selectorChartsInteractionXAxisIndex, selectorChartXAxis, selectorChartControlledCartesianAxisHighlight, selectorBrushShouldPreventAxisHighlight, selectAxisHighlight);
var selectorChartsHighlightYAxisIndex = createSelectorMemoized(selectorChartsInteractionYAxisIndex, selectorChartYAxis, selectorChartControlledCartesianAxisHighlight, selectorBrushShouldPreventAxisHighlight, selectAxisHighlight);
var selectAxisHighlightWithValue = (computedIndex, computedValue, axis, controlledAxisItems, keyboardAxisItem, lastInteractionUpdate, isBrushSelectionActive) => {
  if (isBrushSelectionActive) {
    return [];
  }
  if (controlledAxisItems !== void 0) {
    return controlledAxisItems.map((item) => _extends({}, item, {
      value: axis.axis[item.axisId]?.data?.[item.dataIndex]
    })).filter(({
      value
    }) => value !== void 0);
  }
  const pointerHighlight = computedValue !== null && {
    axisId: axis.axisIds[0],
    dataIndex: computedIndex,
    value: computedValue
  };
  const keyboardValue = keyboardAxisItem && axis.axis[keyboardAxisItem.axisId]?.data?.[keyboardAxisItem.dataIndex];
  const keyboardHighlight = keyboardAxisItem && keyboardValue != null && _extends({}, keyboardAxisItem, {
    value: keyboardValue
  });
  if (lastInteractionUpdate === "pointer") {
    if (pointerHighlight) {
      return [pointerHighlight];
    }
    if (keyboardHighlight) {
      return [keyboardHighlight];
    }
  }
  if (lastInteractionUpdate === "keyboard") {
    if (keyboardHighlight) {
      return [keyboardHighlight];
    }
    if (pointerHighlight) {
      return [pointerHighlight];
    }
  }
  return [];
};
var selectorChartsHighlightXAxisValue = createSelectorMemoized(selectorChartsInteractionXAxisIndex, selectorChartsInteractionXAxisValue, selectorChartXAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardXAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlightWithValue);
var selectorChartsHighlightYAxisValue = createSelectorMemoized(selectorChartsInteractionYAxisIndex, selectorChartsInteractionYAxisValue, selectorChartYAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardYAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlightWithValue);
var selectAxis = (axisItems, axis) => {
  if (axisItems === void 0) {
    return [axis.axis[axis.axisIds[0]]];
  }
  const filteredAxes = axisItems.map((item) => axis.axis[item.axisId] ?? null).filter((item) => item !== null);
  return filteredAxes;
};
var selectorChartsHighlightXAxis = createSelector2(selectorChartControlledCartesianAxisHighlight, selectorChartXAxis, selectAxis);
var selectorChartsHighlightYAxis = createSelector2(selectorChartControlledCartesianAxisHighlight, selectorChartYAxis, selectAxis);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxisPreview.selectors.js
function createPreviewDrawingArea(axisDirection, mainChartDrawingArea) {
  return axisDirection === "x" ? {
    left: 0,
    top: 0,
    width: mainChartDrawingArea.width,
    height: ZOOM_SLIDER_PREVIEW_SIZE,
    right: mainChartDrawingArea.width,
    bottom: ZOOM_SLIDER_PREVIEW_SIZE
  } : {
    left: 0,
    top: 0,
    width: ZOOM_SLIDER_PREVIEW_SIZE,
    height: mainChartDrawingArea.height,
    right: ZOOM_SLIDER_PREVIEW_SIZE,
    bottom: mainChartDrawingArea.height
  };
}
var selectorChartPreviewXScales = createSelectorMemoized(selectorChartRawXAxis, selectorChartDrawingArea, selectorChartZoomOptionsLookup, selectorChartNormalizedXScales, function selectorChartPreviewXScales2(xAxes, chartDrawingArea, zoomOptions, normalizedXScales, axisId) {
  const hasAxis = xAxes?.some((axis) => axis.id === axisId);
  const drawingArea = createPreviewDrawingArea(hasAxis ? "x" : "y", chartDrawingArea);
  const options = zoomOptions[axisId];
  const scales = {};
  xAxes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const scale = normalizedXScales[axis.id].copy();
    const range2 = getRange2(drawingArea, "x", axis);
    const zoomedRange = zoomScaleRange(range2, [options.minStart, options.maxEnd]);
    scale.range(zoomedRange);
    scales[axis.id] = scale;
  });
  return scales;
});
var selectorChartPreviewComputedXAxis = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomOptionsLookup, selectorChartDrawingArea, selectorChartPreviewXScales, selectorChartXAxisWithDomains, (formattedSeries, seriesConfig, zoomOptions, chartDrawingArea, scales, {
  axes,
  domains
}, axisId) => {
  const hasAxis = axes?.some((axis) => axis.id === axisId);
  const drawingArea = createPreviewDrawingArea(hasAxis ? "x" : "y", chartDrawingArea);
  const options = zoomOptions[axisId];
  const zoomMap = /* @__PURE__ */ new Map([[axisId, {
    axisId,
    start: options.minStart,
    end: options.maxEnd
  }]]);
  const computedAxes = computeAxisValue({
    scales,
    drawingArea,
    formattedSeries,
    axis: axes,
    seriesConfig,
    axisDirection: "x",
    zoomMap,
    domains
  });
  if (computedAxes.axis[axisId]) {
    return {
      [axisId]: computedAxes.axis[axisId]
    };
  }
  return computedAxes.axis;
});
var selectorChartPreviewYScales = createSelectorMemoized(selectorChartRawYAxis, selectorChartDrawingArea, selectorChartZoomOptionsLookup, selectorChartNormalizedYScales, function selectorChartPreviewYScales2(yAxes, chartDrawingArea, zoomOptions, normalizedYScales, axisId) {
  const hasAxis = yAxes?.some((axis) => axis.id === axisId);
  const drawingArea = createPreviewDrawingArea(hasAxis ? "y" : "x", chartDrawingArea);
  const options = zoomOptions[axisId];
  const scales = {};
  yAxes?.forEach((eachAxis) => {
    const axis = eachAxis;
    const scale = normalizedYScales[axis.id].copy();
    let range2 = getRange2(drawingArea, "y", axis);
    if (isOrdinalScale(scale)) {
      range2 = range2.reverse();
    }
    const zoomedRange = zoomScaleRange(range2, [options.minStart, options.maxEnd]);
    scale.range(zoomedRange);
    scales[axis.id] = scale;
  });
  return scales;
});
var selectorChartPreviewComputedYAxis = createSelectorMemoized(selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomOptionsLookup, selectorChartDrawingArea, selectorChartPreviewYScales, selectorChartYAxisWithDomains, (formattedSeries, seriesConfig, zoomOptions, chartDrawingArea, scales, {
  axes,
  domains
}, axisId) => {
  const hasAxis = axes?.some((axis) => axis.id === axisId);
  const drawingArea = createPreviewDrawingArea(hasAxis ? "y" : "x", chartDrawingArea);
  const options = zoomOptions[axisId];
  const zoomMap = /* @__PURE__ */ new Map([[axisId, {
    axisId,
    start: options.minStart,
    end: options.maxEnd
  }]]);
  const computedAxes = computeAxisValue({
    scales,
    drawingArea,
    formattedSeries,
    axis: axes,
    seriesConfig,
    axisDirection: "y",
    zoomMap,
    domains
  });
  if (computedAxes.axis[axisId]) {
    return {
      [axisId]: computedAxes.axis[axisId]
    };
  }
  return computedAxes.axis;
});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartZAxis/useChartZAxis.js
var React16 = __toESM(require_react(), 1);
function addDefaultId(axisConfig, defaultId) {
  if (axisConfig.id !== void 0) {
    return axisConfig;
  }
  return _extends({
    id: defaultId
  }, axisConfig);
}
function processColorMap(axisConfig) {
  if (!axisConfig.colorMap) {
    return axisConfig;
  }
  return _extends({}, axisConfig, {
    colorScale: axisConfig.colorMap.type === "ordinal" && axisConfig.data ? getOrdinalColorScale(_extends({
      values: axisConfig.data
    }, axisConfig.colorMap)) : getColorScale(axisConfig.colorMap.type === "continuous" ? _extends({
      min: axisConfig.min,
      max: axisConfig.max
    }, axisConfig.colorMap) : axisConfig.colorMap)
  });
}
function getZAxisState(zAxis, dataset) {
  if (!zAxis || zAxis.length === 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const zAxisLookup = {};
  const axisIds = [];
  zAxis.forEach((axisConfig, index2) => {
    const dataKey = axisConfig.dataKey;
    const defaultizedId = axisConfig.id ?? `defaultized-z-axis-${index2}`;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      zAxisLookup[defaultizedId] = processColorMap(addDefaultId(axisConfig, defaultizedId));
      axisIds.push(defaultizedId);
      return;
    }
    if (dataset === void 0) {
      throw new Error("MUI X Charts: z-axis uses `dataKey` but no `dataset` is provided.");
    }
    zAxisLookup[defaultizedId] = processColorMap(addDefaultId(_extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    }), defaultizedId));
    axisIds.push(defaultizedId);
  });
  return {
    axis: zAxisLookup,
    axisIds
  };
}
var useChartZAxis = ({
  params,
  store
}) => {
  const {
    zAxis,
    dataset
  } = params;
  const isFirstRender = React16.useRef(true);
  React16.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.set("zAxis", getZAxisState(zAxis, dataset));
  }, [zAxis, dataset, store]);
  return {};
};
useChartZAxis.params = {
  zAxis: true,
  dataset: true
};
useChartZAxis.getInitialState = (params) => ({
  zAxis: getZAxisState(params.zAxis, params.dataset)
});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartZAxis/useChartZAxis.selectors.js
var selectRootState = (state) => state;
var selectorChartZAxis = createSelector2(selectRootState, (state) => state.zAxis);

// node_modules/@mui/x-charts/esm/internals/findMinMax.js
function findMinMax(data) {
  let min3 = Infinity;
  let max3 = -Infinity;
  for (const value of data ?? []) {
    if (value < min3) {
      min3 = value;
    }
    if (value > max3) {
      max3 = value;
    }
  }
  return [min3, max3];
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/extremums.js
var createResult = (data, direction) => {
  if (direction === "x") {
    return {
      x: data,
      y: null
    };
  }
  return {
    x: null,
    y: data
  };
};
var getBaseExtremum = (params) => {
  const {
    axis,
    getFilters,
    isDefaultAxis
  } = params;
  const filter2 = getFilters?.({
    currentAxisId: axis.id,
    isDefaultAxis
  });
  const data = filter2 ? axis.data?.filter((_, i) => filter2({
    x: null,
    y: null
  }, i)) : axis.data;
  return findMinMax(data ?? []);
};
var getValueExtremum = (direction) => (params) => {
  const {
    series,
    axis,
    getFilters,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const axisId = direction === "x" ? series[seriesId].xAxisId : series[seriesId].yAxisId;
    return axisId === axis.id || isDefaultAxis && axisId === void 0;
  }).reduce((acc, seriesId) => {
    const {
      stackedData
    } = series[seriesId];
    const filter2 = getFilters?.({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const [seriesMin, seriesMax] = stackedData?.reduce((seriesAcc, values, index2) => {
      if (filter2 && (!filter2(createResult(values[0], direction), index2) || !filter2(createResult(values[1], direction), index2))) {
        return seriesAcc;
      }
      return [Math.min(...values, seriesAcc[0]), Math.max(...values, seriesAcc[1])];
    }, [Infinity, -Infinity]) ?? [Infinity, -Infinity];
    return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
  }, [Infinity, -Infinity]);
};
var getExtremumX = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getValueExtremum("x")(params);
  }
  return getBaseExtremum(params);
};
var getExtremumY = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getBaseExtremum(params);
  }
  return getValueExtremum("y")(params);
};

// node_modules/d3-shape/src/constant.js
function constant_default2(x2) {
  return function constant2() {
    return x2;
  };
}

// node_modules/d3-shape/src/math.js
var cos = Math.cos;
var sin = Math.sin;
var sqrt2 = Math.sqrt;
var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

// node_modules/d3-path/src/path.js
var pi2 = Math.PI;
var tau2 = 2 * pi2;
var epsilon3 = 1e-6;
var tauEpsilon = tau2 - epsilon3;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k2 = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k2) / k2 + strings[i];
    }
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon3)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon3) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon3) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon3 || Math.abs(this._y1 - y0) > epsilon3) {
      this._append`L${x0},${y0}`;
    }
    if (!r) return;
    if (da < 0) da = da % tau2 + tau2;
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x2 - dx},${y2 - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon3) {
      this._append`A${r},${r},0,${+(da >= pi2)},${cw},${this._x1 = x2 + r * Math.cos(a1)},${this._y1 = y2 + r * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w, h) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};
function path() {
  return new Path();
}
path.prototype = Path.prototype;

// node_modules/d3-shape/src/array.js
var slice2 = Array.prototype.slice;
function array_default2(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/descending.js
function descending_default(a2, b) {
  return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-shape/src/identity.js
function identity_default2(d) {
  return d;
}

// node_modules/d3-shape/src/pie.js
function pie_default() {
  var value = identity_default2, sortValues = descending_default, sort3 = null, startAngle = constant_default2(0), endAngle = constant_default2(tau), padAngle = constant_default2(0);
  function pie(data) {
    var i, n = (data = array_default2(data)).length, j, k2, sum3 = 0, index2 = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
    for (i = 0; i < n; ++i) {
      if ((v = arcs[index2[i] = i] = +value(data[i], i, data)) > 0) {
        sum3 += v;
      }
    }
    if (sortValues != null) index2.sort(function(i2, j2) {
      return sortValues(arcs[i2], arcs[j2]);
    });
    else if (sort3 != null) index2.sort(function(i2, j2) {
      return sort3(data[i2], data[j2]);
    });
    for (i = 0, k2 = sum3 ? (da - n * pa) / sum3 : 0; i < n; ++i, a0 = a1) {
      j = index2[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k2 : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }
    return arcs;
  }
  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), pie) : value;
  };
  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort3 = null, pie) : sortValues;
  };
  pie.sort = function(_) {
    return arguments.length ? (sort3 = _, sortValues = null, pie) : sort3;
  };
  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : startAngle;
  };
  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : endAngle;
  };
  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : padAngle;
  };
  return pie;
}

// node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a2, r) {
    this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/d3-shape/src/symbol/asterisk.js
var sqrt3 = sqrt2(3);

// node_modules/d3-shape/src/symbol/diamond.js
var tan30 = sqrt2(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/d3-shape/src/symbol/star.js
var kr = sin(pi / 10) / sin(7 * pi / 10);
var kx = sin(tau / 10) * kr;
var ky = -cos(tau / 10) * kr;

// node_modules/d3-shape/src/symbol/triangle.js
var sqrt32 = sqrt2(3);

// node_modules/d3-shape/src/symbol/triangle2.js
var sqrt33 = sqrt2(3);

// node_modules/d3-shape/src/symbol/wye.js
var s = sqrt2(3) / 2;
var k = 1 / sqrt2(12);
var a = (k / 2 + 1) * 3;

// node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/d3-shape/src/curve/basis.js
function point2(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point2(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, j = x2.length - 1;
    if (j > 0) {
      var x0 = x2[0], y0 = y2[0], dx = x2[j] - x0, dy = y2[j] - y0, i = -1, t;
      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x2[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y2[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
var bundle_default = (function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
})(0.85);

// node_modules/d3-shape/src/curve/cardinal.js
function point3(that, x2, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
    that._y2 + that._k * (that._y1 - y2),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal_default = (function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
})(0);

// node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalClosed_default = (function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
})(0);

// node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalOpen_default = (function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
})(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point4(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom_default = (function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomClosed_default = (function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomOpen_default = (function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) this._context.lineTo(x2, y2);
    else this._point = 1, this._context.moveTo(x2, y2);
  }
};

// node_modules/d3-shape/src/curve/monotone.js
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point5(that, t03, t13) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t03, x1 - dx, y1 - dx * t13, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point5(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t13 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point5(this, slope2(this, t13 = slope3(this, x2, y2)), t13);
        break;
      default:
        point5(this, this._t0, t13 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t13;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};

// node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n = x2.length;
    if (n) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
  a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
  for (i = 1; i < n - 1; ++i) a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
  for (i = 1; i < n; ++i) m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a2[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a2[i] = (r[i] - a2[i + 1]) / b[i];
  b[n - 1] = (x2[n] + a2[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x2[i + 1] - a2[i + 1];
  return [a2, b];
}

// node_modules/d3-shape/src/curve/step.js
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};

// node_modules/d3-shape/src/offset/none.js
function none_default(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

// node_modules/d3-shape/src/order/none.js
function none_default2(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

// node_modules/d3-shape/src/stack.js
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function stack_default() {
  var keys = constant_default2([]), order = none_default2, offset = none_default, value = stackValue;
  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }
    for (i = 0, oz = array_default2(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default2(Array.from(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none_default2 : typeof _ === "function" ? _ : constant_default2(Array.from(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none_default : _, stack) : offset;
  };
  return stack;
}

// node_modules/d3-shape/src/offset/expand.js
function expand_default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
    for (y2 = i = 0; i < n; ++i) y2 += series[i][j][1] || 0;
    if (y2) for (i = 0; i < n; ++i) series[i][j][1] /= y2;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}

// node_modules/d3-shape/src/offset/silhouette.js
function silhouette_default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y2 = 0; i < n; ++i) y2 += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y2 / 2;
  }
  none_default(series, order);
}

// node_modules/d3-shape/src/offset/wiggle.js
function wiggle_default(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
      for (var k2 = 0; k2 < i; ++k2) {
        var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    if (s1) y2 -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y2;
  none_default(series, order);
}

// node_modules/d3-shape/src/order/appearance.js
function appearance_default(series) {
  var peaks = series.map(peak);
  return none_default2(series).sort(function(a2, b) {
    return peaks[a2] - peaks[b];
  });
}
function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

// node_modules/d3-shape/src/order/ascending.js
function ascending_default(series) {
  var sums = series.map(sum2);
  return none_default2(series).sort(function(a2, b) {
    return sums[a2] - sums[b];
  });
}
function sum2(series) {
  var s2 = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s2 += v;
  return s2;
}

// node_modules/d3-shape/src/order/descending.js
function descending_default2(series) {
  return ascending_default(series).reverse();
}

// node_modules/d3-shape/src/order/insideOut.js
function insideOut_default(series) {
  var n = series.length, i, j, sums = series.map(sum2), order = appearance_default(series), top = 0, bottom = 0, tops = [], bottoms = [];
  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }
  return bottoms.reverse().concat(tops);
}

// node_modules/d3-shape/src/order/reverse.js
function reverse_default(series) {
  return none_default2(series).reverse();
}

// node_modules/@mui/x-charts/esm/internals/stackSeries.js
var StackOrder = {
  /**
   * Series order such that the earliest series (according to the maximum value) is at the bottom.
   * */
  appearance: appearance_default,
  /**
   *  Series order such that the smallest series (according to the sum of values) is at the bottom.
   * */
  ascending: ascending_default,
  /**
   * Series order such that the largest series (according to the sum of values) is at the bottom.
   */
  descending: descending_default2,
  /**
   * Series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
   */
  insideOut: insideOut_default,
  /**
   * Given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
   */
  none: none_default2,
  /**
   * Reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
   */
  reverse: reverse_default
};
var StackOffset = {
  /**
   * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
   * */
  expand: expand_default,
  /**
   * Positive values are stacked above zero, negative values are stacked below zero, and zero values are stacked at zero.
   * */
  diverging: diverging_default,
  /**
   * Applies a zero baseline.
   * */
  none: none_default,
  /**
   * Shifts the baseline down such that the center of the streamgraph is always at zero.
   * */
  silhouette: silhouette_default,
  /**
   * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order. See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
   * */
  wiggle: wiggle_default
};
var getStackingGroups = (params) => {
  const {
    series,
    seriesOrder,
    defaultStrategy
  } = params;
  const stackingGroups = [];
  const stackIndex = {};
  seriesOrder.forEach((id) => {
    const {
      stack,
      stackOrder,
      stackOffset
    } = series[id];
    if (stack === void 0) {
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder.none,
        stackingOffset: StackOffset.none
      });
    } else if (stackIndex[stack] === void 0) {
      stackIndex[stack] = stackingGroups.length;
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder[stackOrder ?? defaultStrategy?.stackOrder ?? "none"],
        stackingOffset: StackOffset[stackOffset ?? defaultStrategy?.stackOffset ?? "diverging"]
      });
    } else {
      stackingGroups[stackIndex[stack]].ids.push(id);
      if (stackOrder !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOrder = StackOrder[stackOrder];
      }
      if (stackOffset !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOffset = StackOffset[stackOffset];
      }
    }
  });
  return stackingGroups;
};

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/seriesProcessor.js
var barValueFormatter = (v) => v == null ? "" : v.toLocaleString();
var seriesProcessor = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(params);
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index2) => {
        if (d3Dataset.length <= index2) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index2][id] = value;
        }
      });
    } else if (dataset === void 0) {
      throw new Error([`MUI X Charts: bar series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
    if (true) {
      if (!data && dataset) {
        const dataKey = series[id].dataKey;
        if (!dataKey) {
          throw new Error([`MUI X Charts: bar series with id='${id}' has no data and no dataKey.`, "You must provide a dataKey when using the dataset prop."].join("\n"));
        }
        dataset.forEach((entry, index2) => {
          const value = entry[dataKey];
          if (value != null && typeof value !== "number") {
            warnOnce([`MUI X Charts: your dataset key "${dataKey}" is used for plotting bars, but the dataset contains the non-null non-numerical element "${value}" at index ${index2}.`, "Bar plots only support numeric and null values."].join("\n"));
          }
        });
      }
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOffset,
      stackingOrder
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index2) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({
        layout: "vertical",
        labelMarkType: "square",
        minBarSize: 0,
        valueFormatter: series[id].valueFormatter ?? barValueFormatter
      }, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          return typeof value === "number" ? value : null;
        }) : series[id].data,
        stackedData: stackedSeries[index2].map(([a2, b]) => [a2, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: completedSeries
  };
};
var seriesProcessor_default = seriesProcessor;

// node_modules/@mui/x-charts/esm/internals/getLabel.js
function getLabel(value, location) {
  return typeof value === "function" ? value(location) : value;
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/legend.js
var legendGetter = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default = legendGetter;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/getColor.js
var getColor = (series, xAxis, yAxis) => {
  const verticalLayout = series.layout === "vertical";
  const bandColorScale = verticalLayout ? xAxis?.colorScale : yAxis?.colorScale;
  const valueColorScale = verticalLayout ? yAxis?.colorScale : xAxis?.colorScale;
  const bandValues = verticalLayout ? xAxis?.data : yAxis?.data;
  const getSeriesColor = getSeriesColorFn(series);
  if (valueColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : valueColorScale(value);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  if (bandColorScale && bandValues) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = bandValues[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : bandColorScale(value);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  return (dataIndex) => {
    if (dataIndex === void 0) {
      return series.color;
    }
    const value = series.data[dataIndex];
    return getSeriesColor({
      value,
      dataIndex
    });
  };
};
var getColor_default = getColor;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/tooltip.js
var tooltipGetter = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  if (value == null) {
    return null;
  }
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var axisTooltipGetter = (series) => {
  return Object.values(series).map((s2) => s2.layout === "horizontal" ? {
    direction: "y",
    axisId: s2.yAxisId
  } : {
    direction: "x",
    axisId: s2.xAxisId
  });
};
var tooltip_default = tooltipGetter;

// node_modules/@mui/x-charts/esm/hooks/useDrawingArea.js
function useDrawingArea() {
  const store = useStore2();
  return useSelector(store, selectorChartDrawingArea);
}

// node_modules/@mui/x-charts/esm/hooks/useChartId.js
function useChartId2() {
  const store = useStore2();
  return useSelector(store, selectorChartId);
}

// node_modules/@mui/x-charts/esm/hooks/useScale.js
function useRotationScale(axisId) {
  const axis = useRotationAxis(axisId);
  return axis?.scale;
}

// node_modules/@mui/x-charts/esm/hooks/useZAxis.js
function useZAxes() {
  const store = useStore2();
  const {
    axis: zAxis,
    axisIds: zAxisIds
  } = useSelector(store, selectorChartZAxis) ?? {
    axis: {},
    axisIds: []
  };
  return {
    zAxis,
    zAxisIds
  };
}

// node_modules/@mui/x-charts/esm/hooks/useSvgRef.js
function useSvgRef() {
  const context = useChartContext();
  if (!context) {
    throw new Error(["MUI X Charts: Could not find the svg ref context.", "It looks like you rendered your component outside of a ChartContainer parent component."].join("\n"));
  }
  return context.svgRef;
}

// node_modules/@mui/x-charts/esm/hooks/useSeries.js
function useSeries() {
  const store = useStore2();
  return useSelector(store, selectorChartSeriesProcessed);
}

// node_modules/@mui/x-charts/esm/internals/seriesSelectorOfType.js
var selectorAllSeriesOfType = createSelector2(selectorChartSeriesProcessed, (processedSeries, seriesType) => processedSeries[seriesType]);
var selectorSeriesOfType = createSelectorMemoized(selectorChartSeriesProcessed, (processedSeries, seriesType, ids) => {
  if (ids === void 0 || Array.isArray(ids) && ids.length === 0) {
    return processedSeries[seriesType]?.seriesOrder?.map((seriesId) => processedSeries[seriesType]?.series[seriesId]) ?? [];
  }
  if (!Array.isArray(ids)) {
    return processedSeries[seriesType]?.series?.[ids];
  }
  const result = [];
  const failedIds = [];
  for (const id of ids) {
    const series = processedSeries[seriesType]?.series?.[id];
    if (series) {
      result.push(series);
    } else {
      failedIds.push(id);
    }
  }
  if (failedIds.length > 0) {
    const formattedIds = failedIds.map((v) => JSON.stringify(v)).join(", ");
    const fnName = `use${seriesType.charAt(0).toUpperCase()}${seriesType.slice(1)}Series`;
    warnOnce([`MUI X Charts: The following ids provided to "${fnName}" could not be found: ${formattedIds}.`, `Make sure that they exist and their series are using the "${seriesType}" series type.`]);
  }
  return result;
});
var useSeriesOfType = (seriesType, seriesId) => {
  const store = useStore2();
  return useSelector(store, selectorSeriesOfType, seriesType, seriesId);
};

// node_modules/@mui/x-charts/esm/hooks/useRadarSeries.js
function useRadarSeries(seriesIds) {
  return useSeriesOfType("radar", seriesIds);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/createIsHighlighted.js
function alwaysFalse() {
  return false;
}
function createIsHighlighted(highlightScope, highlightedItem) {
  if (!highlightScope || !highlightedItem) {
    return alwaysFalse;
  }
  return function isHighlighted(item) {
    if (!item) {
      return false;
    }
    if (highlightScope.highlight === "series") {
      return item.seriesId === highlightedItem.seriesId;
    }
    if (highlightScope.highlight === "item") {
      return item.dataIndex === highlightedItem.dataIndex && item.seriesId === highlightedItem.seriesId;
    }
    return false;
  };
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/createIsFaded.js
function alwaysFalse2() {
  return false;
}
function createIsFaded(highlightScope, highlightedItem) {
  if (!highlightScope || !highlightedItem) {
    return alwaysFalse2;
  }
  return function isFaded(item) {
    if (!item) {
      return false;
    }
    if (highlightScope.fade === "series") {
      return item.seriesId === highlightedItem.seriesId && item.dataIndex !== highlightedItem.dataIndex;
    }
    if (highlightScope.fade === "global") {
      return item.seriesId !== highlightedItem.seriesId || item.dataIndex !== highlightedItem.dataIndex;
    }
    return false;
  };
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/highlightStates.js
function isSeriesHighlighted(scope, item, seriesId) {
  return scope?.highlight === "series" && item?.seriesId === seriesId;
}
function isSeriesFaded(scope, item, seriesId) {
  if (isSeriesHighlighted(scope, item, seriesId)) {
    return false;
  }
  return scope?.fade === "global" && item != null || scope?.fade === "series" && item?.seriesId === seriesId;
}
function getSeriesHighlightedItem(scope, item, seriesId) {
  return scope?.highlight === "item" && item?.seriesId === seriesId ? item.dataIndex : null;
}
function getSeriesUnfadedItem(scope, item, seriesId) {
  if (isSeriesHighlighted(scope, item, seriesId)) {
    return null;
  }
  if (getSeriesHighlightedItem(scope, item, seriesId) === item?.dataIndex) {
    return null;
  }
  return (scope?.fade === "series" || scope?.fade === "global") && item?.seriesId === seriesId ? item.dataIndex : null;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/useChartHighlight.selectors.js
var selectHighlight = (state) => state.highlight;
var selectorChartsHighlightScopePerSeriesId = createSelector2(selectorChartSeriesProcessed, (processedSeries) => {
  const map4 = /* @__PURE__ */ new Map();
  Object.keys(processedSeries).forEach((seriesType) => {
    const seriesData = processedSeries[seriesType];
    seriesData?.seriesOrder?.forEach((seriesId) => {
      const seriesItem = seriesData?.series[seriesId];
      map4.set(seriesId, seriesItem?.highlightScope);
    });
  });
  return map4;
});
var selectorChartsHighlightedItem = createSelectorMemoized(selectHighlight, selectorChartsKeyboardItem, function selectorChartsHighlightedItem2(highlight, keyboardItem) {
  return highlight.isControlled || highlight.lastUpdate === "pointer" ? highlight.item : keyboardItem;
});
var selectorChartsHighlightScope = createSelector2(selectorChartsHighlightScopePerSeriesId, selectorChartsHighlightedItem, function selectorChartsHighlightScope2(seriesIdToHighlightScope, highlightedItem) {
  if (!highlightedItem) {
    return null;
  }
  const highlightScope = seriesIdToHighlightScope.get(highlightedItem.seriesId);
  if (highlightScope === void 0) {
    return null;
  }
  return highlightScope;
});
var selectorChartsIsHighlightedCallback = createSelectorMemoized(selectorChartsHighlightScope, selectorChartsHighlightedItem, createIsHighlighted);
var selectorChartsIsFadedCallback = createSelectorMemoized(selectorChartsHighlightScope, selectorChartsHighlightedItem, createIsFaded);
var selectorChartsIsHighlighted = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, function selectorChartsIsHighlighted2(highlightScope, highlightedItem, item) {
  return createIsHighlighted(highlightScope, highlightedItem)(item);
});
var selectorChartIsSeriesHighlighted = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, isSeriesHighlighted);
var selectorChartIsSeriesFaded = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, isSeriesFaded);
var selectorChartSeriesUnfadedItem = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, getSeriesUnfadedItem);
var selectorChartSeriesHighlightedItem = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, getSeriesHighlightedItem);
var selectorChartsIsFaded = createSelector2(selectorChartsHighlightScope, selectorChartsHighlightedItem, function selectorChartsIsFaded2(highlightScope, highlightedItem, item) {
  return createIsFaded(highlightScope, highlightedItem)(item);
});

// node_modules/@mui/x-charts/esm/hooks/useItemHighlightedGetter.js
function useItemHighlightedGetter() {
  const store = useStore2();
  const isHighlighted = useSelector(store, selectorChartsIsHighlightedCallback);
  const isFaded = useSelector(store, selectorChartsIsFadedCallback);
  return {
    isHighlighted,
    isFaded
  };
}

// node_modules/@mui/x-charts/esm/hooks/useLegend.js
function getSeriesToDisplay(series, seriesConfig) {
  return Object.keys(series).flatMap((seriesType) => {
    const getter = seriesConfig[seriesType].legendGetter;
    return getter === void 0 ? [] : getter(series[seriesType]);
  });
}
function useLegend() {
  const series = useSeries();
  const store = useStore2();
  const seriesConfig = useSelector(store, selectorChartSeriesConfig);
  return {
    items: getSeriesToDisplay(series, seriesConfig)
  };
}

// node_modules/@mui/x-charts/esm/hooks/useChartGradientId.js
var React17 = __toESM(require_react(), 1);
function useChartGradientIdBuilder() {
  const chartId = useChartId2();
  return React17.useCallback((axisId) => `${chartId}-gradient-${axisId}`, [chartId]);
}
function useChartGradientIdObjectBoundBuilder() {
  const chartId = useChartId2();
  return React17.useCallback((axisId) => `${chartId}-gradient-${axisId}-object-bound`, [chartId]);
}

// node_modules/@mui/x-charts/esm/internals/animation/useAnimateInternal.js
var React18 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/animation/animation.js
var import_bezier_easing = __toESM(require_src(), 1);
var ANIMATION_TIMING_FUNCTION_JS = (0, import_bezier_easing.default)(0.66, 0, 0.34, 1);

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time2) {
  var t = new Timer();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t03, t13 = taskHead, t22, time2 = Infinity;
  while (t13) {
    if (t13._call) {
      if (time2 > t13._time) time2 = t13._time;
      t03 = t13, t13 = t13._next;
    } else {
      t22 = t13._next, t13._next = null;
      t13 = t03 ? t03._next = t22 : taskHead = t22;
    }
  }
  taskTail = t03;
  sleep(time2);
}
function sleep(time2) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity) timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/@mui/x-charts/esm/hooks/useChartRootRef.js
function useChartRootRef() {
  const context = useChartContext();
  return context.chartRootRef;
}

// node_modules/@mui/x-charts/esm/hooks/useChartsLocalization.js
var React20 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/ChartsLocalizationProvider/ChartsLocalizationProvider.js
var React19 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/locales/utils/imageMimeTypes.js
var imageMimeTypes = {
  "image/png": "PNG",
  "image/jpeg": "JPEG",
  "image/webp": "WebP"
};

// node_modules/@mui/x-charts/esm/locales/utils/getChartsLocalization.js
var getChartsLocalization = (chartsTranslations) => {
  return {
    components: {
      MuiChartsLocalizationProvider: {
        defaultProps: {
          localeText: _extends({}, chartsTranslations)
        }
      }
    }
  };
};

// node_modules/@mui/x-charts/esm/locales/enUS.js
var enUSLocaleText = {
  // Overlay
  loading: "Loading data…",
  noData: "No data to display",
  // Toolbar
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  toolbarExport: "Export",
  // Toolbar Export Menu
  toolbarExportPrint: "Print",
  toolbarExportImage: (mimeType) => `Export as ${imageMimeTypes[mimeType] ?? mimeType}`,
  // Charts renderer configuration
  chartTypeBar: "Bar",
  chartTypeColumn: "Column",
  chartTypeLine: "Line",
  chartTypeArea: "Area",
  chartTypePie: "Pie",
  chartPaletteLabel: "Color palette",
  chartPaletteNameRainbowSurge: "Rainbow Surge",
  chartPaletteNameBlueberryTwilight: "Blueberry Twilight",
  chartPaletteNameMangoFusion: "Mango Fusion",
  chartPaletteNameCheerfulFiesta: "Cheerful Fiesta",
  chartPaletteNameStrawberrySky: "Strawberry Sky",
  chartPaletteNameBlue: "Blue",
  chartPaletteNameGreen: "Green",
  chartPaletteNamePurple: "Purple",
  chartPaletteNameRed: "Red",
  chartPaletteNameOrange: "Orange",
  chartPaletteNameYellow: "Yellow",
  chartPaletteNameCyan: "Cyan",
  chartPaletteNamePink: "Pink",
  chartConfigurationSectionChart: "Chart",
  chartConfigurationSectionColumns: "Columns",
  chartConfigurationSectionBars: "Bars",
  chartConfigurationSectionAxes: "Axes",
  chartConfigurationGrid: "Grid",
  chartConfigurationBorderRadius: "Border radius",
  chartConfigurationCategoryGapRatio: "Category gap ratio",
  chartConfigurationBarGapRatio: "Series gap ratio",
  chartConfigurationStacked: "Stacked",
  chartConfigurationShowToolbar: "Show toolbar",
  chartConfigurationSkipAnimation: "Skip animation",
  chartConfigurationInnerRadius: "Inner radius",
  chartConfigurationOuterRadius: "Outer radius",
  chartConfigurationColors: "Colors",
  chartConfigurationHideLegend: "Hide legend",
  chartConfigurationShowMark: "Show mark",
  chartConfigurationHeight: "Height",
  chartConfigurationWidth: "Width",
  chartConfigurationSeriesGap: "Series gap",
  chartConfigurationTickPlacement: "Tick placement",
  chartConfigurationTickLabelPlacement: "Tick label placement",
  chartConfigurationCategoriesAxisLabel: "Categories axis label",
  chartConfigurationSeriesAxisLabel: "Series axis label",
  chartConfigurationXAxisPosition: "X-axis position",
  chartConfigurationYAxisPosition: "Y-axis position",
  chartConfigurationSeriesAxisReverse: "Reverse series axis",
  chartConfigurationTooltipPlacement: "Placement",
  chartConfigurationTooltipTrigger: "Trigger",
  chartConfigurationLegendPosition: "Position",
  chartConfigurationLegendDirection: "Direction",
  chartConfigurationBarLabels: "Bar labels",
  chartConfigurationColumnLabels: "Column labels",
  chartConfigurationInterpolation: "Interpolation",
  chartConfigurationSectionTooltip: "Tooltip",
  chartConfigurationSectionLegend: "Legend",
  chartConfigurationSectionLines: "Lines",
  chartConfigurationSectionAreas: "Areas",
  chartConfigurationSectionArcs: "Arcs",
  chartConfigurationPaddingAngle: "Padding angle",
  chartConfigurationCornerRadius: "Corner radius",
  chartConfigurationArcLabels: "Arc labels",
  chartConfigurationStartAngle: "Start angle",
  chartConfigurationEndAngle: "End angle",
  chartConfigurationPieTooltipTrigger: "Trigger",
  chartConfigurationPieLegendPosition: "Position",
  chartConfigurationPieLegendDirection: "Direction",
  // Common option labels
  chartConfigurationOptionNone: "None",
  chartConfigurationOptionValue: "Value",
  chartConfigurationOptionAuto: "Auto",
  chartConfigurationOptionTop: "Top",
  chartConfigurationOptionTopLeft: "Top Left",
  chartConfigurationOptionTopRight: "Top Right",
  chartConfigurationOptionBottom: "Bottom",
  chartConfigurationOptionBottomLeft: "Bottom Left",
  chartConfigurationOptionBottomRight: "Bottom Right",
  chartConfigurationOptionLeft: "Left",
  chartConfigurationOptionRight: "Right",
  chartConfigurationOptionAxis: "Axis",
  chartConfigurationOptionItem: "Item",
  chartConfigurationOptionHorizontal: "Horizontal",
  chartConfigurationOptionVertical: "Vertical",
  chartConfigurationOptionBoth: "Both",
  chartConfigurationOptionStart: "Start",
  chartConfigurationOptionMiddle: "Middle",
  chartConfigurationOptionEnd: "End",
  chartConfigurationOptionExtremities: "Extremities",
  chartConfigurationOptionTick: "Tick",
  chartConfigurationOptionMonotoneX: "Monotone X",
  chartConfigurationOptionMonotoneY: "Monotone Y",
  chartConfigurationOptionCatmullRom: "Catmull-Rom",
  chartConfigurationOptionLinear: "Linear",
  chartConfigurationOptionNatural: "Natural",
  chartConfigurationOptionStep: "Step",
  chartConfigurationOptionStepBefore: "Step Before",
  chartConfigurationOptionStepAfter: "Step After",
  chartConfigurationOptionBumpX: "Bump X",
  chartConfigurationOptionBumpY: "Bump Y"
};
var DEFAULT_LOCALE = enUSLocaleText;
var enUS = getChartsLocalization(enUSLocaleText);

// node_modules/@mui/x-charts/esm/ChartsLocalizationProvider/ChartsLocalizationProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var _excluded2 = ["localeText"];
var ChartsLocalizationContext = React19.createContext(null);
if (true) ChartsLocalizationContext.displayName = "ChartsLocalizationContext";
function ChartsLocalizationProvider(inProps) {
  const {
    localeText: inLocaleText
  } = inProps, other = _objectWithoutPropertiesLoose(inProps, _excluded2);
  const {
    localeText: parentLocaleText
  } = React19.useContext(ChartsLocalizationContext) ?? {
    localeText: void 0
  };
  const props = useThemeProps({
    // We don't want to pass the `localeText` prop to the theme, that way it will always return the theme value,
    // We will then merge this theme value with our value manually
    props: other,
    name: "MuiChartsLocalizationProvider"
  });
  const {
    children,
    localeText: themeLocaleText
  } = props;
  const localeText = React19.useMemo(() => _extends({}, DEFAULT_LOCALE, themeLocaleText, parentLocaleText, inLocaleText), [themeLocaleText, parentLocaleText, inLocaleText]);
  const contextValue = React19.useMemo(() => {
    return {
      localeText
    };
  }, [localeText]);
  return (0, import_jsx_runtime.jsx)(ChartsLocalizationContext.Provider, {
    value: contextValue,
    children
  });
}
true ? ChartsLocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/hooks/useChartsLocalization.js
var useChartsLocalization = () => {
  const localization = React20.useContext(ChartsLocalizationContext);
  if (localization === null) {
    throw new Error(["MUI X Charts: Can not find the charts localization context.", "It looks like you forgot to wrap your component in ChartsLocalizationProvider.", "This can also happen if you are bundling multiple versions of the `@mui/x-charts` package"].join("\n"));
  }
  return localization;
};

// node_modules/@mui/x-charts/esm/internals/getBandSize.js
function getBandSize(bandWidth, groupCount, gapRatio) {
  if (gapRatio === 0) {
    return {
      barWidth: bandWidth / groupCount,
      offset: 0
    };
  }
  const barWidth = bandWidth / (groupCount + (groupCount - 1) * gapRatio);
  const offset = gapRatio * barWidth;
  return {
    barWidth,
    offset
  };
}

// node_modules/@mui/x-charts/esm/BarChart/useBarPlotData.js
function shouldInvertStartCoordinate(verticalLayout, baseValue, reverse2) {
  const isVerticalAndPositive = verticalLayout && baseValue > 0;
  const isHorizontalAndNegative = !verticalLayout && baseValue < 0;
  const invertStartCoordinate = isVerticalAndPositive || isHorizontalAndNegative;
  return reverse2 ? !invertStartCoordinate : invertStartCoordinate;
}
function getBarDimensions(params) {
  const {
    verticalLayout,
    xAxisConfig,
    yAxisConfig,
    series,
    dataIndex,
    numberOfGroups,
    groupIndex
  } = params;
  const baseScaleConfig = verticalLayout ? xAxisConfig : yAxisConfig;
  const reverse2 = (verticalLayout ? yAxisConfig.reverse : xAxisConfig.reverse) ?? false;
  const {
    barWidth,
    offset
  } = getBandSize(baseScaleConfig.scale.bandwidth(), numberOfGroups, baseScaleConfig.barGapRatio);
  const barOffset = groupIndex * (barWidth + offset);
  const xScale = xAxisConfig.scale;
  const yScale = yAxisConfig.scale;
  const baseValue = baseScaleConfig.data[dataIndex];
  const seriesValue = series.data[dataIndex];
  if (seriesValue == null) {
    return null;
  }
  const values = series.stackedData[dataIndex];
  const valueCoordinates = values.map((v) => verticalLayout ? yScale(v) : xScale(v));
  const minValueCoord = Math.round(Math.min(...valueCoordinates));
  const maxValueCoord = Math.round(Math.max(...valueCoordinates));
  const barSize = seriesValue === 0 ? 0 : Math.max(series.minBarSize, maxValueCoord - minValueCoord);
  const startCoordinate = shouldInvertStartCoordinate(verticalLayout, seriesValue, reverse2) ? maxValueCoord - barSize : minValueCoord;
  return {
    x: verticalLayout ? xScale(baseValue) + barOffset : startCoordinate,
    y: verticalLayout ? startCoordinate : yScale(baseValue) + barOffset,
    height: verticalLayout ? barSize : barWidth,
    width: verticalLayout ? barWidth : barSize
  };
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/tooltipPosition.js
var tooltipItemPositionGetter = (params) => {
  const {
    series,
    identifier,
    axesConfig,
    placement
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const itemSeries = series.bar?.series[identifier.seriesId];
  if (series.bar == null || itemSeries == null) {
    return null;
  }
  if (axesConfig.x === void 0 || axesConfig.y === void 0) {
    return null;
  }
  const dimensions = getBarDimensions({
    verticalLayout: itemSeries.layout === "vertical",
    xAxisConfig: axesConfig.x,
    yAxisConfig: axesConfig.y,
    series: itemSeries,
    dataIndex: identifier.dataIndex,
    numberOfGroups: series.bar.stackingGroups.length,
    groupIndex: series.bar.stackingGroups.findIndex((group2) => group2.ids.includes(itemSeries.id))
  });
  if (dimensions == null) {
    return null;
  }
  const {
    x: x2,
    y: y2,
    width,
    height
  } = dimensions;
  switch (placement) {
    case "right":
      return {
        x: x2 + width,
        y: y2 + height / 2
      };
    case "bottom":
      return {
        x: x2 + width / 2,
        y: y2 + height
      };
    case "left":
      return {
        x: x2,
        y: y2 + height / 2
      };
    case "top":
    default:
      return {
        x: x2 + width / 2,
        y: y2
      };
  }
};
var tooltipPosition_default = tooltipItemPositionGetter;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/bar/getSeriesWithDefaultValues.js
function getSeriesWithDefaultValues(seriesData, seriesIndex, colors) {
  return _extends({}, seriesData, {
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: seriesData.color ?? colors[seriesIndex % colors.length]
  });
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/index.js
var barSeriesConfig = {
  seriesProcessor: seriesProcessor_default,
  colorProcessor: getColor_default,
  legendGetter: legend_default,
  tooltipGetter: tooltip_default,
  tooltipItemPositionGetter: tooltipPosition_default,
  axisTooltipGetter,
  xExtremumGetter: getExtremumX,
  yExtremumGetter: getExtremumY,
  getSeriesWithDefaultValues
};

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/extremums.js
var getExtremumX2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  let min3 = Infinity;
  let max3 = -Infinity;
  for (const seriesId in series) {
    if (!Object.hasOwn(series, seriesId)) {
      continue;
    }
    const axisId = series[seriesId].xAxisId;
    if (!(axisId === axis.id || axisId === void 0 && isDefaultAxis)) {
      continue;
    }
    const filter2 = getFilters?.({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const seriesData = series[seriesId].data ?? [];
    for (let i = 0; i < seriesData.length; i += 1) {
      const d = seriesData[i];
      if (filter2 && !filter2(d, i)) {
        continue;
      }
      if (d.x !== null) {
        if (d.x < min3) {
          min3 = d.x;
        }
        if (d.x > max3) {
          max3 = d.x;
        }
      }
    }
  }
  return [min3, max3];
};
var getExtremumY2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  let min3 = Infinity;
  let max3 = -Infinity;
  for (const seriesId in series) {
    if (!Object.hasOwn(series, seriesId)) {
      continue;
    }
    const axisId = series[seriesId].yAxisId;
    if (!(axisId === axis.id || axisId === void 0 && isDefaultAxis)) {
      continue;
    }
    const filter2 = getFilters?.({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const seriesData = series[seriesId].data ?? [];
    for (let i = 0; i < seriesData.length; i += 1) {
      const d = seriesData[i];
      if (filter2 && !filter2(d, i)) {
        continue;
      }
      if (d.y !== null) {
        if (d.y < min3) {
          min3 = d.y;
        }
        if (d.y > max3) {
          max3 = d.y;
        }
      }
    }
  }
  return [min3, max3];
};

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/seriesProcessor.js
var seriesProcessor2 = ({
  series,
  seriesOrder
}, dataset) => {
  const completeSeries = Object.fromEntries(Object.entries(series).map(([seriesId, seriesData]) => {
    const datasetKeys = seriesData?.datasetKeys;
    const missingKeys = ["x", "y"].filter((key) => typeof datasetKeys?.[key] !== "string");
    if (seriesData?.datasetKeys && missingKeys.length > 0) {
      throw new Error([`MUI X Charts: scatter series with id='${seriesId}' has incomplete datasetKeys.`, `Properties ${missingKeys.map((key) => `"${key}"`).join(", ")} are missing.`].join("\n"));
    }
    const data = !datasetKeys ? seriesData.data ?? [] : dataset?.map((d) => {
      return {
        x: d[datasetKeys.x] ?? null,
        y: d[datasetKeys.y] ?? null,
        z: datasetKeys.z && d[datasetKeys.z],
        id: datasetKeys.id && d[datasetKeys.id]
      };
    }) ?? [];
    return [seriesId, _extends({
      labelMarkType: "circle",
      markerSize: 4
    }, seriesData, {
      preview: _extends({
        markerSize: 1
      }, seriesData?.preview),
      data,
      valueFormatter: seriesData.valueFormatter ?? ((v) => v && `(${v.x}, ${v.y})`)
    })];
  }));
  return {
    series: completeSeries,
    seriesOrder
  };
};
var seriesProcessor_default2 = seriesProcessor2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/getColor.js
var getColor2 = (series, xAxis, yAxis, zAxis) => {
  const zColorScale = zAxis?.colorScale;
  const yColorScale = yAxis?.colorScale;
  const xColorScale = xAxis?.colorScale;
  const getSeriesColor = getSeriesColorFn(series);
  if (zColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      if (zAxis?.data?.[dataIndex] !== void 0) {
        const color3 = zColorScale(zAxis?.data?.[dataIndex]);
        if (color3 !== null) {
          return color3;
        }
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : zColorScale(value.z);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  if (yColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : yColorScale(value.y);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : xColorScale(value.x);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  return (dataIndex) => {
    if (dataIndex === void 0) {
      return series.color;
    }
    const value = series.data[dataIndex];
    return getSeriesColor({
      value,
      dataIndex
    });
  };
};
var getColor_default2 = getColor2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/legend.js
var legendGetter2 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default2 = legendGetter2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/tooltip.js
var tooltipGetter2 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var tooltip_default2 = tooltipGetter2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues2 = (seriesData, seriesIndex, colors) => {
  return _extends({}, seriesData, {
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: seriesData.color ?? colors[seriesIndex % colors.length]
  });
};
var getSeriesWithDefaultValues_default = getSeriesWithDefaultValues2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/tooltipPosition.js
var tooltipItemPositionGetter2 = (params) => {
  const {
    series,
    identifier,
    axesConfig
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const itemSeries = series.scatter?.series[identifier.seriesId];
  if (itemSeries == null) {
    return null;
  }
  if (axesConfig.x === void 0 || axesConfig.y === void 0) {
    return null;
  }
  const xValue = itemSeries.data?.[identifier.dataIndex].x;
  const yValue = itemSeries.data?.[identifier.dataIndex].y;
  if (xValue == null || yValue == null) {
    return null;
  }
  return {
    x: axesConfig.x.scale(xValue),
    y: axesConfig.y.scale(yValue)
  };
};
var tooltipPosition_default2 = tooltipItemPositionGetter2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/index.js
var scatterSeriesConfig = {
  seriesProcessor: seriesProcessor_default2,
  colorProcessor: getColor_default2,
  legendGetter: legend_default2,
  tooltipGetter: tooltip_default2,
  tooltipItemPositionGetter: tooltipPosition_default2,
  xExtremumGetter: getExtremumX2,
  yExtremumGetter: getExtremumY2,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default
};

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/extremums.js
var getExtremumX3 = (params) => {
  const {
    axis
  } = params;
  return findMinMax(axis.data ?? []);
};
function getSeriesExtremums(getValues, data, stackedData, filter2) {
  return stackedData.reduce((seriesAcc, stackedValue, index2) => {
    if (data[index2] === null) {
      return seriesAcc;
    }
    const [base, value] = getValues(stackedValue);
    if (filter2 && (!filter2({
      y: base,
      x: null
    }, index2) || !filter2({
      y: value,
      x: null
    }, index2))) {
      return seriesAcc;
    }
    return [Math.min(base, value, seriesAcc[0]), Math.max(base, value, seriesAcc[1])];
  }, [Infinity, -Infinity]);
}
var getExtremumY3 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const yAxisId = series[seriesId].yAxisId;
    return yAxisId === axis.id || isDefaultAxis && yAxisId === void 0;
  }).reduce((acc, seriesId) => {
    const {
      area,
      stackedData,
      data
    } = series[seriesId];
    const isArea = area !== void 0;
    const filter2 = getFilters?.({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const getValues = isArea && axis.scaleType !== "log" && typeof series[seriesId].baseline !== "string" ? (d) => d : (d) => [d[1], d[1]];
    const seriesExtremums = getSeriesExtremums(getValues, data, stackedData, filter2);
    const [seriesMin, seriesMax] = seriesExtremums;
    return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
  }, [Infinity, -Infinity]);
};

// node_modules/@mui/x-charts/esm/internals/defaultizeValueFormatter.js
function defaultizeValueFormatter(series, defaultValueFormatter) {
  const defaultizedSeries = {};
  Object.keys(series).forEach((seriesId) => {
    defaultizedSeries[seriesId] = _extends({}, series[seriesId], {
      valueFormatter: series[seriesId].valueFormatter ?? defaultValueFormatter
    });
  });
  return defaultizedSeries;
}

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/seriesProcessor.js
var seriesProcessor3 = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(_extends({}, params, {
    defaultStrategy: {
      stackOffset: "none"
    }
  }));
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index2) => {
        if (d3Dataset.length <= index2) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index2][id] = value;
        }
      });
    } else if (dataset === void 0 && true) {
      throw new Error([`MUI X Charts: line series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
    if (true) {
      if (!data && dataset) {
        const dataKey = series[id].dataKey;
        if (!dataKey) {
          throw new Error([`MUI X Charts: line series with id='${id}' has no data and no dataKey.`, "You must provide a dataKey when using the dataset prop."].join("\n"));
        }
        dataset.forEach((entry, index2) => {
          const value = entry[dataKey];
          if (value != null && typeof value !== "number") {
            warnOnce([`MUI X Charts: your dataset key "${dataKey}" is used for plotting lines, but the dataset contains the non-null non-numerical element "${value}" at index ${index2}.`, "Line plots only support numeric and null values."].join("\n"));
          }
        });
      }
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOrder,
      stackingOffset
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index2) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({
        labelMarkType: "line"
      }, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          return typeof value === "number" ? value : null;
        }) : series[id].data,
        stackedData: stackedSeries[index2].map(([a2, b]) => [a2, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: defaultizeValueFormatter(completedSeries, (v) => v == null ? "" : v.toLocaleString())
  };
};
var seriesProcessor_default3 = seriesProcessor3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/getColor.js
var getColor3 = (series, xAxis, yAxis) => {
  const yColorScale = yAxis?.colorScale;
  const xColorScale = xAxis?.colorScale;
  const getSeriesColor = getSeriesColorFn(series);
  if (yColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : yColorScale(value);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = xAxis.data?.[dataIndex];
      const color2 = value === null ? getSeriesColor({
        value,
        dataIndex
      }) : xColorScale(value);
      if (color2 === null) {
        return getSeriesColor({
          value,
          dataIndex
        });
      }
      return color2;
    };
  }
  return (dataIndex) => {
    if (dataIndex === void 0) {
      return series.color;
    }
    const value = series.data[dataIndex];
    return getSeriesColor({
      value,
      dataIndex
    });
  };
};
var getColor_default3 = getColor3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/legend.js
var legendGetter3 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default3 = legendGetter3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/tooltip.js
var tooltipGetter3 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var axisTooltipGetter2 = (series) => {
  return Object.values(series).map((s2) => ({
    direction: "x",
    axisId: s2.xAxisId
  }));
};
var tooltip_default3 = tooltipGetter3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues3 = (seriesData, seriesIndex, colors) => {
  return _extends({}, seriesData, {
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: seriesData.color ?? colors[seriesIndex % colors.length]
  });
};
var getSeriesWithDefaultValues_default2 = getSeriesWithDefaultValues3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/tooltipPosition.js
var tooltipItemPositionGetter3 = (params) => {
  const {
    series,
    identifier,
    axesConfig
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const itemSeries = series.line?.series[identifier.seriesId];
  if (itemSeries == null) {
    return null;
  }
  if (axesConfig.x === void 0 || axesConfig.y === void 0) {
    return null;
  }
  const xValue = axesConfig.x.data?.[identifier.dataIndex];
  const yValue = itemSeries.data[identifier.dataIndex];
  if (xValue == null || yValue == null) {
    return null;
  }
  return {
    x: axesConfig.x.scale(xValue),
    y: axesConfig.y.scale(yValue)
  };
};
var tooltipPosition_default3 = tooltipItemPositionGetter3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/index.js
var lineSeriesConfig = {
  colorProcessor: getColor_default3,
  seriesProcessor: seriesProcessor_default3,
  legendGetter: legend_default3,
  tooltipGetter: tooltip_default3,
  tooltipItemPositionGetter: tooltipPosition_default3,
  axisTooltipGetter: axisTooltipGetter2,
  xExtremumGetter: getExtremumX3,
  yExtremumGetter: getExtremumY3,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default2
};

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/seriesProcessor.js
var getSortingComparator = (comparator = "none") => {
  if (typeof comparator === "function") {
    return comparator;
  }
  switch (comparator) {
    case "none":
      return null;
    case "desc":
      return (a2, b) => b - a2;
    case "asc":
      return (a2, b) => a2 - b;
    default:
      return null;
  }
};
var seriesProcessor4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  const defaultizedSeries = {};
  seriesOrder.forEach((seriesId) => {
    const arcs = pie_default().startAngle(deg2rad(series[seriesId].startAngle ?? 0)).endAngle(deg2rad(series[seriesId].endAngle ?? 360)).padAngle(deg2rad(series[seriesId].paddingAngle ?? 0)).sortValues(getSortingComparator(series[seriesId].sortingValues ?? "none"))(series[seriesId].data.map((piePoint) => piePoint.value));
    defaultizedSeries[seriesId] = _extends({
      labelMarkType: "circle",
      valueFormatter: (item) => item.value.toLocaleString()
    }, series[seriesId], {
      data: series[seriesId].data.map((item, index2) => _extends({}, item, {
        id: item.id ?? `auto-generated-pie-id-${seriesId}-${index2}`
      }, arcs[index2])).map((item, index2) => _extends({
        labelMarkType: "circle"
      }, item, {
        formattedValue: series[seriesId].valueFormatter?.(_extends({}, item, {
          label: getLabel(item.label, "arc")
        }), {
          dataIndex: index2
        }) ?? item.value.toLocaleString()
      }))
    });
  });
  return {
    seriesOrder,
    series: defaultizedSeries
  };
};
var seriesProcessor_default4 = seriesProcessor4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/getColor.js
var getColor4 = (series) => {
  return (dataIndex) => {
    return series.data[dataIndex].color;
  };
};
var getColor_default4 = getColor4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/legend.js
var legendGetter4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    series[seriesId].data.forEach((item, dataIndex) => {
      const formattedLabel = getLabel(item.label, "legend");
      if (formattedLabel === void 0) {
        return;
      }
      acc.push({
        markType: item.labelMarkType ?? series[seriesId].labelMarkType,
        id: item.id ?? dataIndex,
        seriesId,
        color: item.color,
        label: formattedLabel,
        itemId: item.id ?? dataIndex
      });
    });
    return acc;
  }, []);
};
var legend_default4 = legendGetter4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/tooltip.js
var tooltipGetter4 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const point6 = series.data[identifier.dataIndex];
  if (point6 == null) {
    return null;
  }
  const label = getLabel(point6.label, "tooltip");
  const value = _extends({}, point6, {
    label
  });
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: point6.labelMarkType ?? series.labelMarkType
  };
};
var tooltip_default4 = tooltipGetter4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues4 = (seriesData, seriesIndex, colors) => {
  return _extends({}, seriesData, {
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    data: seriesData.data.map((d, index2) => _extends({}, d, {
      color: d.color ?? colors[index2 % colors.length]
    }))
  });
};
var getSeriesWithDefaultValues_default3 = getSeriesWithDefaultValues4;

// node_modules/@mui/x-charts/esm/internals/getPercentageValue.js
function getPercentageValue(value, refValue) {
  if (typeof value === "number") {
    return value;
  }
  if (value === "100%") {
    return refValue;
  }
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value.slice(0, value.length - 1));
    if (!Number.isNaN(percentage)) {
      return percentage * refValue / 100;
    }
  }
  if (value.endsWith("px")) {
    const val = Number.parseFloat(value.slice(0, value.length - 2));
    if (!Number.isNaN(val)) {
      return val;
    }
  }
  throw new Error(`MUI X Charts: Received an unknown value "${value}". It should be a number, or a string with a percentage value.`);
}

// node_modules/@mui/x-charts/esm/PieChart/getPieCoordinates.js
function getPieCoordinates(series, drawing) {
  const {
    height,
    width
  } = drawing;
  const {
    cx: cxParam,
    cy: cyParam
  } = series;
  const availableRadius = Math.min(width, height) / 2;
  const cx = getPercentageValue(cxParam ?? "50%", width);
  const cy = getPercentageValue(cyParam ?? "50%", height);
  return {
    cx,
    cy,
    availableRadius
  };
}

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/tooltipPosition.js
var tooltipItemPositionGetter4 = (params) => {
  const {
    series,
    drawingArea,
    identifier,
    placement
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const itemSeries = series.pie?.series[identifier.seriesId];
  if (itemSeries == null) {
    return null;
  }
  const {
    cx,
    cy,
    availableRadius
  } = getPieCoordinates({
    cx: itemSeries.cx,
    cy: itemSeries.cy
  }, drawingArea);
  const {
    data,
    innerRadius: baseInnerRadius = 0,
    outerRadius: baseOuterRadius
  } = itemSeries;
  const innerRadius = Math.max(0, getPercentageValue(baseInnerRadius ?? 0, availableRadius));
  const outerRadius = Math.max(0, getPercentageValue(baseOuterRadius ?? availableRadius, availableRadius));
  const dataItem = data[identifier.dataIndex];
  if (!dataItem) {
    return null;
  }
  const points = [[innerRadius, dataItem.startAngle], [innerRadius, dataItem.endAngle], [outerRadius, dataItem.startAngle], [outerRadius, dataItem.endAngle]].map(([radius, angle]) => ({
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle)
  }));
  const [x0, x1] = findMinMax(points.map((p) => p.x));
  const [y0, y1] = findMinMax(points.map((p) => p.y));
  switch (placement) {
    case "bottom":
      return {
        x: (x1 + x0) / 2,
        y: y1
      };
    case "left":
      return {
        x: x0,
        y: (y1 + y0) / 2
      };
    case "right":
      return {
        x: x1,
        y: (y1 + y0) / 2
      };
    case "top":
    default:
      return {
        x: (x1 + x0) / 2,
        y: y0
      };
  }
};
var tooltipPosition_default4 = tooltipItemPositionGetter4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/index.js
var pieSeriesConfig = {
  colorProcessor: getColor_default4,
  seriesProcessor: seriesProcessor_default4,
  legendGetter: legend_default4,
  tooltipGetter: tooltip_default4,
  tooltipItemPositionGetter: tooltipPosition_default4,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default3
};

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartProvider.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var defaultSeriesConfig = {
  bar: barSeriesConfig,
  scatter: scatterSeriesConfig,
  line: lineSeriesConfig,
  pie: pieSeriesConfig
};
var defaultPlugins = [useChartZAxis, useChartInteraction, useChartCartesianAxis, useChartHighlight];
function ChartProvider(props) {
  const {
    children,
    plugins = defaultPlugins,
    pluginParams = {},
    seriesConfig = defaultSeriesConfig
  } = props;
  const {
    contextValue
  } = useCharts(plugins, pluginParams, seriesConfig);
  return (0, import_jsx_runtime2.jsx)(ChartContext.Provider, {
    value: contextValue,
    children
  });
}

// node_modules/@mui/x-charts/esm/context/ChartProvider/useChartContext.js
var React22 = __toESM(require_react(), 1);
var useChartContext = () => {
  const context = React22.useContext(ChartContext);
  if (context == null) {
    throw new Error(["MUI X Charts: Could not find the Chart context.", "It looks like you rendered your component outside of a ChartDataProvider.", "This can also happen if you are bundling multiple versions of the library."].join("\n"));
  }
  return context;
};

// node_modules/@mui/x-charts/esm/internals/store/useStore.js
function useStore2() {
  const context = useChartContext();
  if (!context) {
    throw new Error(["MUI X Charts: Could not find the charts context.", "It looks like you rendered your component outside of a ChartContainer parent component."].join("\n"));
  }
  return context.store;
}

// node_modules/@mui/x-charts/esm/hooks/useAxis.js
function useXAxes() {
  const store = useStore2();
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  return {
    xAxis,
    xAxisIds
  };
}
function useYAxes() {
  const store = useStore2();
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  return {
    yAxis,
    yAxisIds
  };
}
function useXAxis(axisId) {
  const store = useStore2();
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const id = axisId ?? xAxisIds[0];
  return xAxis[id];
}
function useYAxis(axisId) {
  const store = useStore2();
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  const id = axisId ?? yAxisIds[0];
  return yAxis[id];
}
function useRotationAxes() {
  const store = useStore2();
  const {
    axis: rotationAxis,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  return {
    rotationAxis,
    rotationAxisIds
  };
}
function useRadiusAxes() {
  const store = useStore2();
  const {
    axis: radiusAxis,
    axisIds: radiusAxisIds
  } = useSelector(store, selectorChartRadiusAxis);
  return {
    radiusAxis,
    radiusAxisIds
  };
}
function useRotationAxis(axisId) {
  const store = useStore2();
  const {
    axis: rotationAxis,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  const id = axisId ?? rotationAxisIds[0];
  return rotationAxis[id];
}

export {
  createSelector2 as createSelector,
  createSelectorMemoizedWithOptions,
  selectorChartRawXAxis,
  selectorChartSvgWidth,
  selectorChartSvgHeight,
  selectorChartPropsWidth,
  selectorChartPropsHeight,
  selectorChartSeriesConfig,
  selectorChartSeriesProcessed,
  useSelector,
  defaultizeMargin,
  warnOnce,
  date_default,
  number_default,
  isCartesianSeriesType,
  isCartesianSeries,
  isOrdinalScale,
  selectorChartHasZoom,
  selectorChartZoomIsInteracting,
  selectorChartAxisZoomData,
  selectorChartXAxis,
  selectorChartYAxis,
  selectorChartSeriesEmptyFlatbushMap,
  selectorChartSeriesFlatbushMap,
  getSVGPoint,
  useChartInteraction,
  selectorChartsInteractionPointerX,
  selectorChartsInteractionPointerY,
  selectorChartsLastInteraction,
  useChartKeyboardNavigation,
  selectorChartsHasFocusedItem,
  selectorChartsIsKeyboardNavigationEnabled,
  isPolarSeriesType,
  rad2deg,
  selectorChartRawRotationAxis,
  selectorChartRotationAxis,
  getDrawingAreaCenter,
  selectorChartPolarCenter,
  selectorChartsTooltipItem,
  selectorChartsTooltipItemIsDefined,
  selectorChartsTooltipItemPosition,
  isDeepEqual,
  selectorChartsInteractionTooltipXAxes,
  selectorChartsInteractionTooltipYAxes,
  selectorChartsInteractionAxisTooltip,
  useChartCartesianAxis,
  selectorBrushShouldPreventTooltip,
  useChartBrush,
  useChartZAxis,
  useChartHighlight,
  getLabel,
  getSeriesColorFn,
  useDrawingArea,
  generateSvg2rotation,
  generatePolar2svg,
  clampAngle,
  getAxisIndex,
  useChartPolarAxis,
  useXAxes,
  useYAxes,
  useXAxis,
  useYAxis,
  useRotationAxes,
  useRadiusAxes,
  useRotationAxis,
  useRotationScale,
  useZAxes,
  useSvgRef,
  useRadarSeries,
  useItemHighlightedGetter,
  useChartGradientIdBuilder,
  useChartGradientIdObjectBoundBuilder,
  useChartRootRef,
  ChartsLocalizationProvider,
  useChartsLocalization,
  defaultizeValueFormatter,
  ChartProvider,
  useChartContext,
  useStore2 as useStore,
  useSeries,
  useLegend
};
//# sourceMappingURL=chunk-JL4PRXGQ.js.map
