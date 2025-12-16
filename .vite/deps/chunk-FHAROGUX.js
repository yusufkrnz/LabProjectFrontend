import {
  date_default,
  number_default,
  selectorChartHasZoom,
  selectorChartPropsHeight,
  selectorChartPropsWidth,
  selectorChartSvgHeight,
  selectorChartSvgWidth,
  selectorChartsHasFocusedItem,
  selectorChartsIsKeyboardNavigationEnabled,
  useChartGradientIdBuilder,
  useChartGradientIdObjectBoundBuilder,
  useDrawingArea,
  useSelector,
  useStore,
  useSvgRef,
  useXAxes,
  useYAxes,
  useZAxes
} from "./chunk-JL4PRXGQ.js";
import {
  _objectWithoutPropertiesLoose,
  useForkRef,
  useThemeProps
} from "./chunk-BPKUEUDS.js";
import {
  _extends,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  require_prop_types,
  styled_default
} from "./chunk-3RQXYIJS.js";
import {
  require_react
} from "./chunk-GH6UE3LJ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@mui/x-charts/esm/ChartsSurface/ChartsSurface.js
var import_prop_types = __toESM(require_prop_types(), 1);
var React3 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var React2 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsPiecewiseGradient.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ChartsPiecewiseGradient(props) {
  const {
    isReversed,
    gradientId,
    size,
    direction,
    scale,
    colorMap
  } = props;
  if (size <= 0) {
    return null;
  }
  return (0, import_jsx_runtime.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse",
    children: colorMap.thresholds.map((threshold, index) => {
      const x = scale(threshold);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      if (Number.isNaN(offset)) {
        return null;
      }
      return (0, import_jsx_runtime.jsxs)(React.Fragment, {
        children: [(0, import_jsx_runtime.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index],
          stopOpacity: 1
        }), (0, import_jsx_runtime.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index + 1],
          stopOpacity: 1
        })]
      }, threshold.toString() + index);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsContinuousGradient.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var PX_PRECISION = 10;
function ChartsContinuousGradient(props) {
  const {
    gradientUnits,
    isReversed,
    gradientId,
    size,
    direction,
    scale,
    colorScale,
    colorMap
  } = props;
  const extremumValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const extremumPositions = extremumValues.map(scale).filter((p) => p !== void 0);
  if (extremumPositions.length !== 2) {
    return null;
  }
  const interpolator = typeof extremumValues[0] === "number" ? number_default(extremumValues[0], extremumValues[1]) : date_default(extremumValues[0], extremumValues[1]);
  const numberOfPoints = Math.round((Math.max(...extremumPositions) - Math.min(...extremumPositions)) / PX_PRECISION);
  const keyPrefix = `${extremumValues[0]}-${extremumValues[1]}-`;
  return (0, import_jsx_runtime2.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: gradientUnits === "objectBoundingBox" ? 1 : `${size}px`,
    gradientUnits: gradientUnits ?? "userSpaceOnUse",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index) => {
      const value = interpolator(index / numberOfPoints);
      if (value === void 0) {
        return null;
      }
      const x = scale(value);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      const color = colorScale(value);
      if (color === null) {
        return null;
      }
      return (0, import_jsx_runtime2.jsx)("stop", {
        offset,
        stopColor: color,
        stopOpacity: 1
      }, keyPrefix + index);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsContinuousGradientObjectBound.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var PX_PRECISION2 = 10;
var getDirection = (isReversed) => {
  if (isReversed) {
    return {
      x1: "1",
      x2: "0",
      y1: "0",
      y2: "0"
    };
  }
  return {
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  };
};
function ChartsContinuousGradientObjectBound(props) {
  const {
    isReversed,
    gradientId,
    colorScale,
    colorMap
  } = props;
  const extremumValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const interpolator = typeof extremumValues[0] === "number" ? number_default(extremumValues[0], extremumValues[1]) : date_default(extremumValues[0], extremumValues[1]);
  const numberOfPoints = PX_PRECISION2;
  const keyPrefix = `${extremumValues[0]}-${extremumValues[1]}-`;
  return (0, import_jsx_runtime3.jsx)("linearGradient", _extends({
    id: gradientId
  }, getDirection(isReversed), {
    gradientUnits: "objectBoundingBox",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index) => {
      const offset = index / numberOfPoints;
      const value = interpolator(offset);
      if (value === void 0) {
        return null;
      }
      const color = colorScale(value);
      if (color === null) {
        return null;
      }
      return (0, import_jsx_runtime3.jsx)("stop", {
        offset,
        stopColor: color,
        stopOpacity: 1
      }, keyPrefix + index);
    })
  }));
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = useDrawingArea();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradientIdBuilder();
  const getObjectBoundGradientId = useChartGradientIdObjectBoundBuilder();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  const filteredYAxisIds = yAxisIds.filter((axisId) => yAxis[axisId].colorMap !== void 0);
  const filteredXAxisIds = xAxisIds.filter((axisId) => xAxis[axisId].colorMap !== void 0);
  const filteredZAxisIds = zAxisIds.filter((axisId) => zAxis[axisId].colorMap !== void 0);
  if (filteredYAxisIds.length === 0 && filteredXAxisIds.length === 0 && filteredZAxisIds.length === 0) {
    return null;
  }
  return (0, import_jsx_runtime4.jsxs)("defs", {
    children: [filteredYAxisIds.map((axisId) => {
      const gradientId = getGradientId(axisId);
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        scale,
        colorScale,
        reverse
      } = yAxis[axisId];
      if (colorMap?.type === "piecewise") {
        return (0, import_jsx_runtime4.jsx)(ChartsPiecewiseGradient, {
          isReversed: !reverse,
          scale,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      if (colorMap?.type === "continuous") {
        return (0, import_jsx_runtime4.jsxs)(React2.Fragment, {
          children: [(0, import_jsx_runtime4.jsx)(ChartsContinuousGradient, {
            isReversed: !reverse,
            scale,
            colorScale,
            colorMap,
            size: svgHeight,
            gradientId,
            direction: "y"
          }), (0, import_jsx_runtime4.jsx)(ChartsContinuousGradientObjectBound, {
            isReversed: reverse,
            colorScale,
            colorMap,
            gradientId: objectBoundGradientId
          })]
        }, gradientId);
      }
      return null;
    }), filteredXAxisIds.map((axisId) => {
      const gradientId = getGradientId(axisId);
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        scale,
        reverse,
        colorScale
      } = xAxis[axisId];
      if (colorMap?.type === "piecewise") {
        return (0, import_jsx_runtime4.jsx)(ChartsPiecewiseGradient, {
          isReversed: reverse,
          scale,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      if (colorMap?.type === "continuous") {
        return (0, import_jsx_runtime4.jsxs)(React2.Fragment, {
          children: [(0, import_jsx_runtime4.jsx)(ChartsContinuousGradient, {
            isReversed: reverse,
            scale,
            colorScale,
            colorMap,
            size: svgWidth,
            gradientId,
            direction: "x"
          }), (0, import_jsx_runtime4.jsx)(ChartsContinuousGradientObjectBound, {
            isReversed: reverse,
            colorScale,
            colorMap,
            gradientId: objectBoundGradientId
          })]
        }, gradientId);
      }
      return null;
    }), filteredZAxisIds.map((axisId) => {
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        colorScale
      } = zAxis[axisId];
      if (colorMap?.type === "continuous") {
        return (0, import_jsx_runtime4.jsx)(ChartsContinuousGradientObjectBound, {
          colorScale,
          colorMap,
          gradientId: objectBoundGradientId
        }, objectBoundGradientId);
      }
      return null;
    })]
  });
}

// node_modules/@mui/x-charts/esm/ChartsSurface/chartsSurfaceClasses.js
function getSurfaceUtilityClass(slot) {
  return generateUtilityClass("MuiChartsSurface", slot);
}
var useUtilityClasses = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getSurfaceUtilityClass);
};
var chartsSurfaceClasses = generateUtilityClasses("MuiChartsSurface", ["root"]);

// node_modules/@mui/x-charts/esm/ChartsSurface/ChartsSurface.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded = ["children", "className", "title", "desc"];
var ChartsSurfaceStyles = styled_default("svg", {
  name: "MuiChartsSurface",
  slot: "Root"
})(({
  ownerState,
  theme
}) => ({
  width: ownerState.width ?? "100%",
  height: ownerState.height ?? "100%",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  // This prevents default touch actions when using the svg on mobile devices.
  // For example, prevent page scroll & zoom.
  touchAction: ownerState.hasZoom ? "pan-y" : void 0,
  userSelect: "none",
  gridArea: "chart",
  "&:focus": {
    outline: "none"
    // By default don't show focus on the SVG container
  },
  "&:focus-visible": {
    // Show focus outline on the SVG container only when using keyboard navigation
    outline: `${(theme.vars ?? theme).palette.text.primary} solid 2px`,
    "&[data-has-focused-item=true]": {
      // But not if the chart has a focused children item
      outline: "none"
    }
  },
  "& [data-focused=true]": {
    outline: `${(theme.vars ?? theme).palette.text.primary} solid 2px`
  }
}));
var ChartsSurface = React3.forwardRef(function ChartsSurface2(inProps, ref) {
  const store = useStore();
  const svgWidth = useSelector(store, selectorChartSvgWidth);
  const svgHeight = useSelector(store, selectorChartSvgHeight);
  const propsWidth = useSelector(store, selectorChartPropsWidth);
  const propsHeight = useSelector(store, selectorChartPropsHeight);
  const isKeyboardNavigationEnabled = useSelector(store, selectorChartsIsKeyboardNavigationEnabled);
  const hasFocusedItem = useSelector(store, selectorChartsHasFocusedItem);
  const hasZoom = useSelector(store, selectorChartHasZoom);
  const svgRef = useSvgRef();
  const handleRef = useForkRef(svgRef, ref);
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiChartsSurface"
  });
  const {
    children,
    className,
    title,
    desc
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded);
  const classes = useUtilityClasses();
  const hasIntrinsicSize = svgHeight > 0 && svgWidth > 0;
  return (0, import_jsx_runtime5.jsxs)(ChartsSurfaceStyles, _extends({
    ownerState: {
      width: propsWidth,
      height: propsHeight,
      hasZoom
    },
    viewBox: `${0} ${0} ${svgWidth} ${svgHeight}`,
    className: clsx_default(classes.root, className),
    tabIndex: isKeyboardNavigationEnabled ? 0 : void 0,
    "data-has-focused-item": hasFocusedItem || void 0
  }, other, {
    ref: handleRef,
    children: [title && (0, import_jsx_runtime5.jsx)("title", {
      children: title
    }), desc && (0, import_jsx_runtime5.jsx)("desc", {
      children: desc
    }), (0, import_jsx_runtime5.jsx)(ChartsAxesGradients, {}), hasIntrinsicSize && children]
  }));
});
if (true) ChartsSurface.displayName = "ChartsSurface";
true ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  className: import_prop_types.default.string,
  desc: import_prop_types.default.string,
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  title: import_prop_types.default.string
} : void 0;

export {
  chartsSurfaceClasses,
  ChartsSurface
};
//# sourceMappingURL=chunk-FHAROGUX.js.map
