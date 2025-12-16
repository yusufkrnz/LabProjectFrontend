import {
  ChartsLabelMark,
  ChartsLegend
} from "./chunk-PYM6XBAU.js";
import {
  Button_default,
  HTMLElementType,
  IconButton_default,
  NoSsr_default,
  Popper_default,
  Typography_default,
  useMediaQuery_default
} from "./chunk-D4DDHDAX.js";
import "./chunk-TR7ZCQBX.js";
import "./chunk-3HME3SJ2.js";
import "./chunk-KHTXFHT2.js";
import {
  ChartsSurface
} from "./chunk-FHAROGUX.js";
import {
  ChartProvider,
  ChartsLocalizationProvider,
  clampAngle,
  createSelector,
  createSelectorMemoizedWithOptions,
  defaultizeMargin,
  defaultizeValueFormatter,
  generatePolar2svg,
  generateSvg2rotation,
  getAxisIndex,
  getDrawingAreaCenter,
  getLabel,
  getSVGPoint,
  getSeriesColorFn,
  isCartesianSeries,
  isCartesianSeriesType,
  isDeepEqual,
  isOrdinalScale,
  isPolarSeriesType,
  rad2deg,
  selectorBrushShouldPreventTooltip,
  selectorChartAxisZoomData,
  selectorChartPolarCenter,
  selectorChartPropsHeight,
  selectorChartPropsWidth,
  selectorChartRawRotationAxis,
  selectorChartRawXAxis,
  selectorChartRotationAxis,
  selectorChartSeriesConfig,
  selectorChartSeriesEmptyFlatbushMap,
  selectorChartSeriesFlatbushMap,
  selectorChartSeriesProcessed,
  selectorChartXAxis,
  selectorChartYAxis,
  selectorChartZoomIsInteracting,
  selectorChartsInteractionAxisTooltip,
  selectorChartsInteractionPointerX,
  selectorChartsInteractionPointerY,
  selectorChartsInteractionTooltipXAxes,
  selectorChartsInteractionTooltipYAxes,
  selectorChartsLastInteraction,
  selectorChartsTooltipItem,
  selectorChartsTooltipItemIsDefined,
  selectorChartsTooltipItemPosition,
  useChartBrush,
  useChartCartesianAxis,
  useChartContext,
  useChartHighlight,
  useChartInteraction,
  useChartKeyboardNavigation,
  useChartPolarAxis,
  useChartRootRef,
  useChartZAxis,
  useChartsLocalization,
  useDrawingArea,
  useItemHighlightedGetter,
  useRadarSeries,
  useRadiusAxes,
  useRotationAxes,
  useRotationAxis,
  useRotationScale,
  useSelector,
  useSeries,
  useStore,
  useSvgRef,
  useXAxes,
  useXAxis,
  useYAxes,
  useYAxis,
  useZAxes,
  warnOnce
} from "./chunk-JL4PRXGQ.js";
import {
  _objectWithoutPropertiesLoose,
  useEventCallback_default,
  useForkRef,
  useLazyRef,
  useTheme,
  useThemeProps
} from "./chunk-BPKUEUDS.js";
import {
  _extends,
  clsx,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  require_prop_types,
  shouldForwardProp,
  styled_default,
  useEnhancedEffect_default,
  useId
} from "./chunk-3RQXYIJS.js";
import {
  require_react
} from "./chunk-GH6UE3LJ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@mui/x-charts/esm/RadarChart/RadarChart.js
var React28 = __toESM(require_react(), 1);
var import_prop_types15 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
var React = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsLoadingOverlay.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var _excluded = ["message"];
var StyledText = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: (theme.vars || theme).palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsLoadingOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  const {
    localeText
  } = useChartsLocalization();
  return (0, import_jsx_runtime.jsx)(StyledText, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? localeText.loading
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsNoDataOverlay.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var _excluded2 = ["message"];
var StyledText2 = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: (theme.vars || theme).palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsNoDataOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  const {
    localeText
  } = useChartsLocalization();
  return (0, import_jsx_runtime2.jsx)(StyledText2, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? localeText.noData
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function useNoData() {
  const seriesPerType = useSeries();
  return Object.values(seriesPerType).every((seriesOfGivenType) => {
    if (!seriesOfGivenType) {
      return true;
    }
    const {
      series,
      seriesOrder
    } = seriesOfGivenType;
    return seriesOrder.every((seriesId) => {
      const seriesItem = series[seriesId];
      if (seriesItem.type === "sankey") {
        return seriesItem.data.links.length === 0;
      }
      return seriesItem.data.length === 0;
    });
  });
}
function ChartsOverlay(props) {
  const noData = useNoData();
  if (props.loading) {
    const LoadingOverlay = props.slots?.loadingOverlay ?? ChartsLoadingOverlay;
    return (0, import_jsx_runtime3.jsx)(LoadingOverlay, _extends({}, props.slotProps?.loadingOverlay));
  }
  if (noData) {
    const NoDataOverlay = props.slots?.noDataOverlay ?? ChartsNoDataOverlay;
    return (0, import_jsx_runtime3.jsx)(NoDataOverlay, _extends({}, props.slotProps?.noDataOverlay));
  }
  return null;
}

// node_modules/@mui/x-charts/esm/RadarChart/useRadarChartProps.js
var _excluded3 = ["apiRef", "series", "radar", "width", "height", "margin", "colors", "sx", "children", "slots", "slotProps", "skipAnimation", "loading", "highlightedItem", "onHighlightChange", "hideLegend", "divisions", "shape", "stripeColor", "highlight", "showToolbar", "onAxisClick", "onAreaClick", "onMarkClick"];
var useRadarChartProps = (props) => {
  const {
    apiRef,
    series,
    radar,
    width,
    height,
    margin,
    colors,
    sx,
    children,
    slots,
    slotProps,
    skipAnimation,
    loading,
    highlightedItem,
    onHighlightChange,
    divisions,
    shape,
    stripeColor,
    highlight = "axis",
    onAxisClick,
    onAreaClick,
    onMarkClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const radarDataProviderProps = {
    apiRef,
    series,
    radar,
    highlight,
    width,
    height,
    margin,
    colors,
    highlightedItem,
    onHighlightChange,
    skipAnimation,
    onAxisClick
  };
  const overlayProps = {
    slots,
    slotProps,
    loading
  };
  const legendProps = {
    slots,
    slotProps
  };
  const chartsWrapperProps = {
    sx,
    hideLegend: props.hideLegend ?? false
  };
  const radarGrid = {
    divisions,
    shape,
    stripeColor
  };
  const radarSeriesAreaProps = {
    onItemClick: onAreaClick
  };
  const radarSeriesMarksProps = {
    onItemClick: onMarkClick
  };
  const chartsSurfaceProps = other;
  return {
    highlight,
    chartsWrapperProps,
    chartsSurfaceProps,
    radarDataProviderProps,
    radarGrid,
    radarSeriesAreaProps,
    radarSeriesMarksProps,
    overlayProps,
    legendProps,
    children
  };
};

// node_modules/@mui/x-charts/esm/ChartsWrapper/ChartsWrapper.js
var React8 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/Toolbar/Toolbar.js
var React5 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-internals/esm/useComponentRenderer/useComponentRenderer.js
var React2 = __toESM(require_react(), 1);
function useComponentRenderer(defaultElement, render, props, state = {}) {
  if (typeof render === "function") {
    return render(props, state);
  }
  if (render) {
    if (render.props.className) {
      props.className = mergeClassNames(render.props.className, props.className);
    }
    if (render.props.style || props.style) {
      props.style = _extends({}, props.style, render.props.style);
    }
    return React2.cloneElement(render, props);
  }
  return React2.createElement(defaultElement, props);
}
function mergeClassNames(className, otherClassName) {
  if (!className || !otherClassName) {
    return className || otherClassName;
  }
  return `${className} ${otherClassName}`;
}

// node_modules/@mui/x-internals/esm/ToolbarContext/ToolbarContext.js
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var ToolbarContext = React3.createContext(void 0);
if (true) ToolbarContext.displayName = "ToolbarContext";
function useToolbarContext() {
  const context = React3.useContext(ToolbarContext);
  if (context === void 0) {
    throw new Error("MUI X: Missing context. Toolbar subcomponents must be placed within a <Toolbar /> component.");
  }
  return context;
}
function ToolbarContextProvider({
  children
}) {
  const [focusableItemId, setFocusableItemId] = React3.useState(null);
  const focusableItemIdRef = React3.useRef(focusableItemId);
  const [items, setItems] = React3.useState([]);
  const getSortedItems = React3.useCallback(() => items.sort(sortByDocumentPosition), [items]);
  const findEnabledItem = React3.useCallback((startIndex, step, wrap = true) => {
    let index = startIndex;
    const sortedItems = getSortedItems();
    const itemCount = sortedItems.length;
    for (let i = 0; i < itemCount; i += 1) {
      index += step;
      if (index >= itemCount) {
        if (!wrap) {
          return -1;
        }
        index = 0;
      } else if (index < 0) {
        if (!wrap) {
          return -1;
        }
        index = itemCount - 1;
      }
      if (!sortedItems[index].ref.current?.disabled && sortedItems[index].ref.current?.ariaDisabled !== "true") {
        return index;
      }
    }
    return -1;
  }, [getSortedItems]);
  const registerItem = React3.useCallback((id, itemRef) => {
    setItems((prevItems) => [...prevItems, {
      id,
      ref: itemRef
    }]);
  }, []);
  const unregisterItem = React3.useCallback((id) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  }, []);
  const onItemKeyDown = React3.useCallback((event) => {
    if (!focusableItemId) {
      return;
    }
    const sortedItems = getSortedItems();
    const focusableItemIndex = sortedItems.findIndex((item) => item.id === focusableItemId);
    let newIndex = -1;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      newIndex = findEnabledItem(focusableItemIndex, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      newIndex = findEnabledItem(focusableItemIndex, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      newIndex = findEnabledItem(-1, 1, false);
    } else if (event.key === "End") {
      event.preventDefault();
      newIndex = findEnabledItem(sortedItems.length, -1, false);
    }
    if (newIndex >= 0 && newIndex < sortedItems.length) {
      const item = sortedItems[newIndex];
      setFocusableItemId(item.id);
      item.ref.current?.focus();
    }
  }, [getSortedItems, focusableItemId, findEnabledItem]);
  const onItemFocus = React3.useCallback((id) => {
    if (focusableItemId !== id) {
      setFocusableItemId(id);
    }
  }, [focusableItemId, setFocusableItemId]);
  const onItemDisabled = React3.useCallback((id) => {
    const sortedItems = getSortedItems();
    const currentIndex = sortedItems.findIndex((item) => item.id === id);
    const newIndex = findEnabledItem(currentIndex, 1);
    if (newIndex >= 0 && newIndex < sortedItems.length) {
      const item = sortedItems[newIndex];
      setFocusableItemId(item.id);
      item.ref.current?.focus();
    }
  }, [getSortedItems, findEnabledItem]);
  React3.useEffect(() => {
    focusableItemIdRef.current = focusableItemId;
  }, [focusableItemId]);
  React3.useEffect(() => {
    const sortedItems = getSortedItems();
    if (sortedItems.length > 0) {
      if (!focusableItemIdRef.current) {
        setFocusableItemId(sortedItems[0].id);
        return;
      }
      const focusableItemIndex = sortedItems.findIndex((item) => item.id === focusableItemIdRef.current);
      if (!sortedItems[focusableItemIndex]) {
        const item = sortedItems[sortedItems.length - 1];
        if (item) {
          setFocusableItemId(item.id);
          item.ref.current?.focus();
        }
      } else if (focusableItemIndex === -1) {
        const item = sortedItems[focusableItemIndex];
        if (item) {
          setFocusableItemId(item.id);
          item.ref.current?.focus();
        }
      }
    }
  }, [getSortedItems, findEnabledItem]);
  const contextValue = React3.useMemo(() => ({
    focusableItemId,
    registerItem,
    unregisterItem,
    onItemKeyDown,
    onItemFocus,
    onItemDisabled
  }), [focusableItemId, registerItem, unregisterItem, onItemKeyDown, onItemFocus, onItemDisabled]);
  return (0, import_jsx_runtime4.jsx)(ToolbarContext.Provider, {
    value: contextValue,
    children
  });
}
function sortByDocumentPosition(a, b) {
  if (!a.ref.current || !b.ref.current) {
    return 0;
  }
  const position = a.ref.current.compareDocumentPosition(b.ref.current);
  if (!position) {
    return 0;
  }
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}

// node_modules/@mui/x-internals/esm/ToolbarContext/useRegisterToolbarButton.js
var React4 = __toESM(require_react(), 1);
function useRegisterToolbarButton(props, ref) {
  const {
    onKeyDown,
    onFocus,
    disabled,
    "aria-disabled": ariaDisabled
  } = props;
  const id = useId();
  const {
    focusableItemId,
    registerItem,
    unregisterItem,
    onItemKeyDown,
    onItemFocus,
    onItemDisabled
  } = useToolbarContext();
  const handleKeyDown = (event) => {
    onItemKeyDown(event);
    onKeyDown?.(event);
  };
  const handleFocus = (event) => {
    onItemFocus(id);
    onFocus?.(event);
  };
  React4.useEffect(() => {
    registerItem(id, ref);
    return () => unregisterItem(id);
  }, [id, ref, registerItem, unregisterItem]);
  const previousDisabled = React4.useRef(disabled);
  React4.useEffect(() => {
    if (previousDisabled.current !== disabled && disabled === true) {
      onItemDisabled(id, disabled);
    }
    previousDisabled.current = disabled;
  }, [disabled, id, onItemDisabled]);
  const previousAriaDisabled = React4.useRef(ariaDisabled);
  React4.useEffect(() => {
    if (previousAriaDisabled.current !== ariaDisabled && ariaDisabled === true) {
      onItemDisabled(id, true);
    }
    previousAriaDisabled.current = ariaDisabled;
  }, [ariaDisabled, id, onItemDisabled]);
  return {
    tabIndex: focusableItemId === id ? 0 : -1,
    disabled,
    "aria-disabled": ariaDisabled,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus
  };
}

// node_modules/@mui/x-charts/esm/Toolbar/chartToolbarClasses.js
var chartsToolbarClasses = generateUtilityClasses("MuiChartsToolbar", ["root"]);

// node_modules/@mui/x-charts/esm/Toolbar/Toolbar.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded4 = ["className", "render"];
var ToolbarRoot = styled_default("div", {
  name: "MuiChartsToolbar",
  slot: "Root"
})(({
  theme
}) => ({
  flex: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  gap: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  minHeight: 44,
  boxSizing: "border-box",
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRadius: 4
}));
var Toolbar = React5.forwardRef(function Toolbar2(_ref, ref) {
  let {
    className,
    render
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded4);
  const element = useComponentRenderer(ToolbarRoot, render, _extends({
    role: "toolbar",
    "aria-orientation": "horizontal",
    className: clsx_default(chartsToolbarClasses.root, className)
  }, other, {
    ref
  }));
  return (0, import_jsx_runtime5.jsx)(ToolbarContextProvider, {
    children: element
  });
});
if (true) Toolbar.displayName = "Toolbar";
true ? Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: import_prop_types.default.string,
  /**
   * A function to customize rendering of the component.
   */
  render: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.func])
} : void 0;

// node_modules/@mui/x-charts/esm/Toolbar/ToolbarButton.js
var import_prop_types2 = __toESM(require_prop_types(), 1);
var React7 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/context/ChartsSlotsContext.js
var React6 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var ChartsSlotsContext = React6.createContext(null);
if (true) ChartsSlotsContext.displayName = "ChartsSlotsContext";
function useChartsSlots() {
  const context = React6.useContext(ChartsSlotsContext);
  if (context == null) {
    throw new Error(["MUI X Charts: Could not find the Charts Slots context.", "It looks like you rendered your component outside of a ChartDataProvider.", "This can also happen if you are bundling multiple versions of the library."].join("\n"));
  }
  return context;
}
function ChartsSlotsProvider(props) {
  const {
    slots,
    slotProps = {},
    defaultSlots,
    children
  } = props;
  const value = React6.useMemo(() => ({
    slots: _extends({}, defaultSlots, slots),
    slotProps
  }), [defaultSlots, slots, slotProps]);
  return (0, import_jsx_runtime6.jsx)(ChartsSlotsContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/esm/Toolbar/ToolbarButton.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var _excluded5 = ["render", "onKeyDown", "onFocus", "disabled", "aria-disabled"];
var _excluded22 = ["tabIndex"];
var ToolbarButton = React7.forwardRef(function ToolbarButton2(props, ref) {
  const {
    render
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const {
    slots,
    slotProps
  } = useChartsSlots();
  const buttonRef = React7.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);
  const _useRegisterToolbarBu = useRegisterToolbarButton(props, buttonRef), {
    tabIndex
  } = _useRegisterToolbarBu, toolbarButtonProps = _objectWithoutPropertiesLoose(_useRegisterToolbarBu, _excluded22);
  const element = useComponentRenderer(slots.baseIconButton, render, _extends({}, slotProps?.baseIconButton, {
    tabIndex
  }, other, toolbarButtonProps, {
    ref: handleRef
  }));
  return (0, import_jsx_runtime7.jsx)(React7.Fragment, {
    children: element
  });
});
if (true) ToolbarButton.displayName = "ToolbarButton";
true ? ToolbarButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  className: import_prop_types2.default.string,
  disabled: import_prop_types2.default.bool,
  id: import_prop_types2.default.string,
  /**
   * A function to customize the rendering of the component.
   */
  render: import_prop_types2.default.oneOfType([import_prop_types2.default.element, import_prop_types2.default.func]),
  size: import_prop_types2.default.oneOf(["large", "medium", "small"]),
  style: import_prop_types2.default.object,
  tabIndex: import_prop_types2.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsWrapper/ChartsWrapper.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var getJustifyItems = (position) => {
  if (position?.horizontal === "start") {
    return "start";
  }
  if (position?.horizontal === "end") {
    return "end";
  }
  return "center";
};
var getAlignItems = (position) => {
  if (position?.vertical === "top") {
    return "flex-start";
  }
  if (position?.vertical === "bottom") {
    return "flex-end";
  }
  return "center";
};
var getGridTemplateAreas = (hideLegend, direction, position) => {
  if (hideLegend) {
    return `"chart"`;
  }
  if (direction === "vertical") {
    if (position?.horizontal === "start") {
      return `"legend chart"`;
    }
    return `"chart legend"`;
  }
  if (position?.vertical === "bottom") {
    return `"chart"
            "legend"`;
  }
  return `"legend"
          "chart"`;
};
var getTemplateColumns = (hideLegend = false, direction = "horizontal", horizontalPosition = "end", width = void 0) => {
  const drawingAreaColumn = width ? "auto" : "1fr";
  if (direction === "horizontal") {
    return drawingAreaColumn;
  }
  if (hideLegend) {
    return drawingAreaColumn;
  }
  return horizontalPosition === "start" ? `auto ${drawingAreaColumn}` : `${drawingAreaColumn} auto`;
};
var getTemplateRows = (hideLegend = false, direction = "horizontal", verticalPosition = "top") => {
  const drawingAreaRow = "1fr";
  if (direction === "vertical") {
    return drawingAreaRow;
  }
  if (hideLegend) {
    return drawingAreaRow;
  }
  return verticalPosition === "bottom" ? `${drawingAreaRow} auto` : `auto ${drawingAreaRow}`;
};
var Root = styled_default("div", {
  name: "MuiChartsWrapper",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "extendVertically" && prop !== "width"
})(({
  ownerState,
  width
}) => {
  const gridTemplateColumns = getTemplateColumns(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition?.horizontal, width);
  const gridTemplateRows = getTemplateRows(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition?.vertical);
  const gridTemplateAreas = getGridTemplateAreas(ownerState.hideLegend, ownerState.legendDirection, ownerState.legendPosition);
  return {
    variants: [{
      props: {
        extendVertically: true
      },
      style: {
        height: "100%",
        minHeight: 0
      }
    }],
    flex: 1,
    display: "grid",
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    [`&:has(.${chartsToolbarClasses.root})`]: {
      // Add a row for toolbar if there is one.
      gridTemplateRows: `auto ${gridTemplateRows}`,
      gridTemplateAreas: `"${gridTemplateColumns.split(" ").map(() => "toolbar").join(" ")}"
        ${gridTemplateAreas}`
    },
    [`& .${chartsToolbarClasses.root}`]: {
      gridArea: "toolbar",
      justifySelf: "center"
    },
    justifyContent: "safe center",
    justifyItems: getJustifyItems(ownerState.legendPosition),
    alignItems: getAlignItems(ownerState.legendPosition)
  };
});
function ChartsWrapper(props) {
  const {
    children,
    sx,
    extendVertically
  } = props;
  const chartRootRef = useChartRootRef();
  const store = useStore();
  const propsWidth = useSelector(store, selectorChartPropsWidth);
  const propsHeight = useSelector(store, selectorChartPropsHeight);
  return (0, import_jsx_runtime8.jsx)(Root, {
    ref: chartRootRef,
    ownerState: props,
    sx,
    extendVertically: extendVertically ?? propsHeight === void 0,
    width: propsWidth,
    children
  });
}
true ? ChartsWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types3.default.node,
  /**
   * If `true`, the chart wrapper set `height: 100%`.
   * @default `false` if the `height` prop is set. And `true` otherwise.
   */
  extendVertically: import_prop_types3.default.bool,
  /**
   * If `true`, the legend is not rendered.
   * @default false
   */
  hideLegend: import_prop_types3.default.bool,
  /**
   * The direction of the legend.
   * @default 'horizontal'
   */
  legendDirection: import_prop_types3.default.oneOf(["horizontal", "vertical"]),
  /**
   * The position of the legend.
   * @default { horizontal: 'center', vertical: 'bottom' }
   */
  legendPosition: import_prop_types3.default.shape({
    horizontal: import_prop_types3.default.oneOf(["center", "end", "start"]),
    vertical: import_prop_types3.default.oneOf(["bottom", "middle", "top"])
  }),
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/RadarGrid.js
var React13 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/useRadarGridData.js
function useRadarGridData() {
  const {
    instance,
    store
  } = useChartContext();
  const rotationScale = useRotationScale();
  const {
    radiusAxis
  } = useRadiusAxes();
  const {
    cx,
    cy
  } = useSelector(store, selectorChartPolarCenter);
  if (!rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const metrics = rotationScale.domain();
  const angles = metrics.map((key) => rotationScale(key));
  return {
    center: {
      x: cx,
      y: cy
    },
    corners: metrics.map((metric, dataIndex) => {
      const radiusScale = radiusAxis[metric].scale;
      const r = radiusScale.range()[1];
      const angle = angles[dataIndex];
      const [x, y] = instance.polar2svg(r, angle);
      return {
        x,
        y
      };
    }),
    radius: radiusAxis[metrics[0]].scale.range()[1]
  };
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/SharpRadarGrid.js
var React9 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function SharpRadarGrid(props) {
  const {
    center,
    corners,
    divisions,
    strokeColor,
    classes
  } = props;
  const divisionRatio = Array.from({
    length: divisions
  }, (_, index) => (index + 1) / divisions);
  return (0, import_jsx_runtime9.jsxs)(React9.Fragment, {
    children: [corners.map(({
      x,
      y
    }, i) => (0, import_jsx_runtime9.jsx)("path", {
      d: `M ${center.x} ${center.y} L ${x} ${y}`,
      stroke: strokeColor,
      strokeWidth: 1,
      strokeOpacity: 0.3,
      fill: "none",
      className: classes?.radial
    }, i)), divisionRatio.map((ratio) => (0, import_jsx_runtime9.jsx)("path", {
      d: `M ${corners.map(({
        x,
        y
      }) => `${center.x * (1 - ratio) + ratio * x} ${center.y * (1 - ratio) + ratio * y}`).join(" L ")} Z`,
      stroke: strokeColor,
      strokeWidth: 1,
      strokeOpacity: 0.3,
      fill: "none",
      className: classes?.divider
    }, ratio))]
  });
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/CircularRadarGrid.js
var React10 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
function CircularRadarGrid(props) {
  const {
    center,
    corners,
    divisions,
    radius,
    strokeColor,
    classes
  } = props;
  const divisionRadius = Array.from({
    length: divisions
  }, (_, index) => radius * (index + 1) / divisions);
  return (0, import_jsx_runtime10.jsxs)(React10.Fragment, {
    children: [corners.map(({
      x,
      y
    }, i) => (0, import_jsx_runtime10.jsx)("path", {
      d: `M ${center.x} ${center.y} L ${x} ${y}`,
      stroke: strokeColor,
      strokeWidth: 1,
      strokeOpacity: 0.3,
      fill: "none",
      className: classes?.radial
    }, i)), divisionRadius.map((r) => (0, import_jsx_runtime10.jsx)("circle", {
      cx: center.x,
      cy: center.y,
      r,
      stroke: strokeColor,
      strokeWidth: 1,
      strokeOpacity: 0.3,
      fill: "none",
      className: classes?.divider
    }, r))]
  });
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/SharpRadarStripes.js
var React11 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var getPath = (corners, center, outerRatio, innerRatio) => ["M", [...corners, corners[0]].map(({
  x,
  y
}) => `${center.x * (1 - outerRatio) + outerRatio * x} ${center.y * (1 - outerRatio) + outerRatio * y}`).join(" L "), "L", [...corners, corners[0]].reverse().map(({
  x,
  y
}) => `${center.x * (1 - innerRatio) + innerRatio * x} ${center.y * (1 - innerRatio) + innerRatio * y}`).join(" L "), "Z"].join(" ");
function SharpRadarStripes(props) {
  const {
    center,
    corners,
    divisions,
    stripeColor,
    classes
  } = props;
  const divisionRatio = Array.from({
    length: divisions
  }, (_, index) => (index + 1) / divisions);
  return (0, import_jsx_runtime11.jsx)(React11.Fragment, {
    children: divisionRatio.map((ratio, index) => {
      const smallerRatio = divisionRatio[index - 1] ?? 0;
      return (0, import_jsx_runtime11.jsx)("path", {
        d: getPath(corners, center, ratio, smallerRatio),
        stroke: "none",
        fill: stripeColor?.(index) ?? "none",
        fillOpacity: 0.1,
        className: classes?.stripe
      }, ratio);
    })
  });
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/CircularRadarStripes.js
var React12 = __toESM(require_react(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var getPath2 = (center, outerRadius, innerRadius) => [`M ${center.x - outerRadius} ${center.y}`, `A ${outerRadius} ${outerRadius} 0 1 0 ${center.x + outerRadius} ${center.y}`, `A ${outerRadius} ${outerRadius} 0 1 0 ${center.x - outerRadius} ${center.y} Z`, `M ${center.x - innerRadius} ${center.y}`, `A ${innerRadius} ${innerRadius} 0 1 0 ${center.x + innerRadius} ${center.y}`, `A ${innerRadius} ${innerRadius} 0 1 0 ${center.x - innerRadius} ${center.y} Z`].join("");
function CircularRadarStripes(props) {
  const {
    center,
    divisions,
    radius,
    stripeColor,
    classes
  } = props;
  const divisionRadius = Array.from({
    length: divisions
  }, (_, index) => radius * (index + 1) / divisions);
  return (0, import_jsx_runtime12.jsx)(React12.Fragment, {
    children: divisionRadius.map((r, index) => {
      const smallerRadius = divisionRadius[index - 1] ?? 0;
      return (0, import_jsx_runtime12.jsx)("path", {
        d: getPath2(center, r, smallerRadius),
        fillRule: "evenodd",
        fill: stripeColor?.(index) ?? "none",
        fillOpacity: 0.1,
        className: classes?.stripe
      }, r);
    })
  });
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/radarGridClasses.js
function getRadarGridUtilityClass(slot) {
  return generateUtilityClass("MuiRadarGrid", slot);
}
var chartsGridClasses = generateUtilityClasses("MuiRadarGrid", ["radial", "divider", "stripe"]);
var useUtilityClasses = (classes) => {
  const slots = {
    radial: ["radial"],
    divider: ["divider"],
    stripe: ["stripe"]
  };
  return composeClasses(slots, getRadarGridUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/RadarChart/RadarGrid/RadarGrid.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function RadarGrid(props) {
  const theme = useTheme();
  const {
    divisions = 5,
    shape = "sharp",
    stripeColor = (index) => index % 2 === 1 ? (theme.vars || theme).palette.text.secondary : "none"
  } = props;
  const gridData = useRadarGridData();
  const classes = useUtilityClasses(props.classes);
  if (gridData === null) {
    return null;
  }
  const {
    center,
    corners,
    radius
  } = gridData;
  return shape === "sharp" ? (0, import_jsx_runtime13.jsxs)(React13.Fragment, {
    children: [stripeColor && (0, import_jsx_runtime13.jsx)(SharpRadarStripes, {
      divisions,
      corners,
      center,
      radius,
      stripeColor,
      classes
    }), (0, import_jsx_runtime13.jsx)(SharpRadarGrid, {
      divisions,
      corners,
      center,
      radius,
      strokeColor: (theme.vars || theme).palette.text.primary,
      classes
    })]
  }) : (0, import_jsx_runtime13.jsxs)(React13.Fragment, {
    children: [stripeColor && (0, import_jsx_runtime13.jsx)(CircularRadarStripes, {
      divisions,
      corners,
      center,
      radius,
      stripeColor,
      classes
    }), (0, import_jsx_runtime13.jsx)(CircularRadarGrid, {
      divisions,
      corners,
      center,
      radius,
      strokeColor: (theme.vars || theme).palette.text.primary,
      classes
    })]
  });
}
true ? RadarGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * The number of divisions in the radar grid.
   * @default 5
   */
  divisions: import_prop_types4.default.number,
  /**
   * The grid shape.
   * @default 'sharp'
   */
  shape: import_prop_types4.default.oneOf(["circular", "sharp"]),
  /**
   * Get stripe fill color. Set it to `null` to remove stripes
   * @param {number} index The index of the stripe band.
   * @returns {string} The color to fill the stripe.
   * @default (index) => index % 2 === 1 ? (theme.vars || theme).palette.text.secondary : 'none'
   */
  stripeColor: import_prop_types4.default.func
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarDataProvider/RadarDataProvider.js
var React16 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/RadarChart/RadarChart.plugins.js
var RADAR_PLUGINS = [useChartInteraction, useChartPolarAxis, useChartHighlight];

// node_modules/@mui/x-charts/esm/ChartDataProvider/ChartDataProvider.js
var React15 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/material/index.js
var baseSlots = {
  baseButton: Button_default,
  baseIconButton: IconButton_default
};
var iconSlots = {};
var defaultSlotsMaterial = _extends({}, baseSlots, iconSlots);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartClosestPoint/useChartClosestPoint.js
var React14 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartClosestPoint/findClosestPoints.js
function findClosestPoints(flatbush, seriesData, xScale, yScale, xZoomStart, xZoomEnd, yZoomStart, yZoomEnd, svgPointX, svgPointY, maxRadius = Infinity, maxResults = 1) {
  const originalXScale = xScale.copy();
  const originalYScale = yScale.copy();
  originalXScale.range([0, 1]);
  originalYScale.range([0, 1]);
  const excludeIfOutsideDrawingArea = function excludeIfOutsideDrawingArea2(index) {
    const x = originalXScale(seriesData[index].x);
    const y = originalYScale(seriesData[index].y);
    return x >= xZoomStart && x <= xZoomEnd && y >= yZoomStart && y <= yZoomEnd;
  };
  const fx = xScale.range()[1] - xScale.range()[0];
  const fy = yScale.range()[1] - yScale.range()[0];
  const fxSq = fx * fx;
  const fySq = fy * fy;
  function sqDistFn(dx, dy) {
    return fxSq * dx * dx + fySq * dy * dy;
  }
  const pointX = originalXScale(invertScale(xScale, svgPointX, (dataIndex) => seriesData[dataIndex]?.x));
  const pointY = originalYScale(invertScale(yScale, svgPointY, (dataIndex) => seriesData[dataIndex]?.y));
  return flatbush.neighbors(pointX, pointY, maxResults, maxRadius != null ? maxRadius * maxRadius : Infinity, excludeIfOutsideDrawingArea, sqDistFn);
}
function invertScale(scale, value, getDataPoint) {
  if (isOrdinalScale(scale)) {
    const dataIndex = scale.bandwidth() === 0 ? Math.floor((value - Math.min(...scale.range()) + scale.step() / 2) / scale.step()) : Math.floor((value - Math.min(...scale.range())) / scale.step());
    return getDataPoint(dataIndex);
  }
  return scale.invert(value);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartClosestPoint/useChartClosestPoint.js
var useChartClosestPoint = ({
  svgRef,
  params,
  store,
  instance
}) => {
  const {
    disableVoronoi,
    voronoiMaxRadius,
    onItemClick
  } = params;
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  const zoomIsInteracting = useSelector(store, selectorChartZoomIsInteracting);
  const {
    series,
    seriesOrder
  } = useSelector(store, selectorChartSeriesProcessed)?.scatter ?? {};
  const flatbushMap = useSelector(store, zoomIsInteracting ? selectorChartSeriesEmptyFlatbushMap : selectorChartSeriesFlatbushMap);
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  useEnhancedEffect_default(() => {
    store.set("voronoi", {
      isVoronoiEnabled: !disableVoronoi
    });
  }, [store, disableVoronoi]);
  React14.useEffect(() => {
    if (svgRef.current === null || disableVoronoi) {
      return void 0;
    }
    const element = svgRef.current;
    function getClosestPoint(event) {
      const svgPoint = getSVGPoint(element, event);
      if (!instance.isPointInside(svgPoint.x, svgPoint.y)) {
        return "outside-chart";
      }
      let closestPoint = void 0;
      for (const seriesId of seriesOrder ?? []) {
        const aSeries = (series ?? {})[seriesId];
        const flatbush = flatbushMap.get(seriesId);
        if (!flatbush) {
          continue;
        }
        const xAxisId = aSeries.xAxisId ?? defaultXAxisId;
        const yAxisId = aSeries.yAxisId ?? defaultYAxisId;
        const xAxisZoom = selectorChartAxisZoomData(store.getSnapshot(), xAxisId);
        const yAxisZoom = selectorChartAxisZoomData(store.getSnapshot(), yAxisId);
        const maxRadius = voronoiMaxRadius === "item" ? aSeries.markerSize : voronoiMaxRadius;
        const xZoomStart = (xAxisZoom?.start ?? 0) / 100;
        const xZoomEnd = (xAxisZoom?.end ?? 100) / 100;
        const yZoomStart = (yAxisZoom?.start ?? 0) / 100;
        const yZoomEnd = (yAxisZoom?.end ?? 100) / 100;
        const xScale = xAxis[xAxisId].scale;
        const yScale = yAxis[yAxisId].scale;
        const closestPointIndex = findClosestPoints(flatbush, aSeries.data, xScale, yScale, xZoomStart, xZoomEnd, yZoomStart, yZoomEnd, svgPoint.x, svgPoint.y, maxRadius)[0];
        if (closestPointIndex === void 0) {
          continue;
        }
        const point = aSeries.data[closestPointIndex];
        const scaledX = xScale(point.x);
        const scaledY = yScale(point.y);
        const distSq = (scaledX - svgPoint.x) ** 2 + (scaledY - svgPoint.y) ** 2;
        if (closestPoint === void 0 || distSq < closestPoint.distanceSq) {
          closestPoint = {
            dataIndex: closestPointIndex,
            seriesId,
            distanceSq: distSq
          };
        }
      }
      if (closestPoint === void 0) {
        return "no-point-found";
      }
      return {
        seriesId: closestPoint.seriesId,
        dataIndex: closestPoint.dataIndex
      };
    }
    const moveEndHandler = instance.addInteractionListener("moveEnd", (event) => {
      if (!event.detail.activeGestures.pan) {
        instance.cleanInteraction?.();
        instance.clearHighlight?.();
      }
    });
    const panEndHandler = instance.addInteractionListener("panEnd", (event) => {
      if (!event.detail.activeGestures.move) {
        instance.cleanInteraction?.();
        instance.clearHighlight?.();
      }
    });
    const pressEndHandler = instance.addInteractionListener("quickPressEnd", (event) => {
      if (!event.detail.activeGestures.move && !event.detail.activeGestures.pan) {
        instance.cleanInteraction?.();
        instance.clearHighlight?.();
      }
    });
    const gestureHandler = (event) => {
      const closestPoint = getClosestPoint(event.detail.srcEvent);
      if (closestPoint === "outside-chart") {
        instance.cleanInteraction?.();
        instance.clearHighlight?.();
        return;
      }
      if (closestPoint === "outside-voronoi-max-radius" || closestPoint === "no-point-found") {
        instance.removeItemInteraction?.();
        instance.clearHighlight?.();
        return;
      }
      const {
        seriesId,
        dataIndex
      } = closestPoint;
      instance.setItemInteraction?.({
        type: "scatter",
        seriesId,
        dataIndex
      }, {
        interaction: "pointer"
      });
      instance.setHighlight?.({
        seriesId,
        dataIndex
      });
    };
    const tapHandler = instance.addInteractionListener("tap", (event) => {
      const closestPoint = getClosestPoint(event.detail.srcEvent);
      if (typeof closestPoint !== "string" && onItemClick) {
        const {
          seriesId,
          dataIndex
        } = closestPoint;
        onItemClick(event.detail.srcEvent, {
          type: "scatter",
          seriesId,
          dataIndex
        });
      }
    });
    const moveHandler = instance.addInteractionListener("move", gestureHandler);
    const panHandler = instance.addInteractionListener("pan", gestureHandler);
    const pressHandler = instance.addInteractionListener("quickPress", gestureHandler);
    return () => {
      tapHandler.cleanup();
      moveHandler.cleanup();
      moveEndHandler.cleanup();
      panHandler.cleanup();
      panEndHandler.cleanup();
      pressHandler.cleanup();
      pressEndHandler.cleanup();
    };
  }, [svgRef, yAxis, xAxis, voronoiMaxRadius, onItemClick, disableVoronoi, instance, seriesOrder, series, flatbushMap, defaultXAxisId, defaultYAxisId, store]);
  const enableVoronoiCallback = useEventCallback_default(() => {
    store.set("voronoi", {
      isVoronoiEnabled: true
    });
  });
  const disableVoronoiCallback = useEventCallback_default(() => {
    store.set("voronoi", {
      isVoronoiEnabled: false
    });
  });
  return {
    instance: {
      enableVoronoi: enableVoronoiCallback,
      disableVoronoi: disableVoronoiCallback
    }
  };
};
useChartClosestPoint.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  disableVoronoi: params.disableVoronoi ?? !params.series.some((item) => item.type === "scatter")
});
useChartClosestPoint.getInitialState = (params) => ({
  voronoi: {
    isVoronoiEnabled: !params.disableVoronoi
  }
});
useChartClosestPoint.params = {
  disableVoronoi: true,
  voronoiMaxRadius: true,
  onItemClick: true
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartClosestPoint/useChartClosestPoint.selectors.js
var selectVoronoi = (state) => state.voronoi;
var selectorChartsIsVoronoiEnabled = createSelector(selectVoronoi, (voronoi) => voronoi?.isVoronoiEnabled);

// node_modules/@mui/x-charts/esm/internals/plugins/allPlugins.js
var DEFAULT_PLUGINS = [useChartZAxis, useChartBrush, useChartInteraction, useChartCartesianAxis, useChartHighlight, useChartClosestPoint, useChartKeyboardNavigation];

// node_modules/@mui/x-charts/esm/ChartDataProvider/useChartDataProviderProps.js
var _excluded6 = ["children", "localeText", "plugins", "seriesConfig", "slots", "slotProps"];
var useChartDataProviderProps = (inProps) => {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartDataProvider"
  });
  const {
    children,
    localeText,
    plugins = DEFAULT_PLUGINS,
    seriesConfig,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const theme = useTheme();
  const chartProviderProps = {
    plugins,
    seriesConfig,
    pluginParams: _extends({
      theme: theme.palette.mode
    }, other)
  };
  return {
    children,
    localeText,
    chartProviderProps,
    slots,
    slotProps
  };
};

// node_modules/@mui/x-charts/esm/ChartDataProvider/ChartDataProvider.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
function ChartDataProvider(props) {
  const {
    children,
    localeText,
    chartProviderProps,
    slots,
    slotProps
  } = useChartDataProviderProps(props);
  return (0, import_jsx_runtime14.jsx)(ChartProvider, _extends({}, chartProviderProps, {
    children: (0, import_jsx_runtime14.jsx)(ChartsLocalizationProvider, {
      localeText,
      children: (0, import_jsx_runtime14.jsx)(ChartsSlotsProvider, {
        slots,
        slotProps,
        defaultSlots: defaultSlotsMaterial,
        children
      })
    })
  }));
}
true ? ChartDataProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: import_prop_types5.default.shape({
    current: import_prop_types5.default.any
  }),
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.string), import_prop_types5.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types5.default.arrayOf(import_prop_types5.default.object),
  /**
   * Options to enable features planned for the next major.
   */
  experimentalFeatures: import_prop_types5.default.shape({
    preferStrictDomainInLineCharts: import_prop_types5.default.bool
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types5.default.number,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types5.default.string,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types5.default.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.shape({
    bottom: import_prop_types5.default.number,
    left: import_prop_types5.default.number,
    right: import_prop_types5.default.number,
    top: import_prop_types5.default.number
  })]),
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types5.default.arrayOf(import_prop_types5.default.object),
  /**
   * If `true`, animations are skipped.
   * If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
   */
  skipAnimation: import_prop_types5.default.bool,
  /**
   * The props for the slots.
   */
  slotProps: import_prop_types5.default.object,
  /**
   * Slots to customize charts' components.
   */
  slots: import_prop_types5.default.object,
  theme: import_prop_types5.default.oneOf(["dark", "light"]),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types5.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/formatter.js
var formatter = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return {
    seriesOrder,
    series: defaultizeValueFormatter(series, (v) => v == null ? "" : v.toLocaleString())
  };
};
var formatter_default = formatter;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/getColor.js
var getColor = (series) => {
  const getSeriesColor = getSeriesColorFn(series);
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

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/extremums.js
var radiusExtremumGetter = ({
  series,
  axisIndex
}) => {
  return Object.keys(series).filter((seriesId) => series[seriesId].type === "radar").reduce((acc, seriesId) => {
    const {
      data
    } = series[seriesId];
    return [Math.min(data[axisIndex], acc[0]), Math.max(data[axisIndex], acc[1])];
  }, [Infinity, -Infinity]);
};
var rotationExtremumGetter = ({
  axis
}) => {
  const min = Math.min(...axis.data ?? []);
  const max = Math.max(...axis.data ?? []);
  return [min, max];
};

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/legend.js
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
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel,
      markType: series[seriesId].labelMarkType ?? "square"
    });
    return acc;
  }, []);
};
var legend_default = legendGetter;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/tooltip.js
var tooltipGetter = (params) => {
  const {
    series,
    axesConfig,
    getColor: getColor2,
    identifier
  } = params;
  const rotationAxis = axesConfig.rotation;
  if (!identifier || !rotationAxis) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const formatter2 = (v) => rotationAxis.valueFormatter?.(v, {
    location: "tooltip",
    scale: rotationAxis.scale
  }) ?? (v == null ? "" : v.toLocaleString());
  return {
    identifier,
    color: getColor2(),
    label,
    markType: series.labelMarkType,
    values: series.data.map((value, dataIndex) => ({
      value,
      formattedValue: series.valueFormatter(value, {
        dataIndex
      }),
      markType: series.labelMarkType,
      label: formatter2(rotationAxis?.data?.[dataIndex])
    }))
  };
};
var axisTooltipGetter = (series) => {
  return Object.values(series).map(() => ({
    direction: "rotation",
    axisId: void 0
  }));
};
var tooltip_default = tooltipGetter;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues = (seriesData, seriesIndex, colors) => {
  return _extends({}, seriesData, {
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: seriesData.color ?? colors[seriesIndex % colors.length]
  });
};
var getSeriesWithDefaultValues_default = getSeriesWithDefaultValues;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/tooltipPosition.js
var tooltipItemPositionGetter = (params) => {
  const {
    series,
    identifier,
    axesConfig,
    drawingArea,
    placement
  } = params;
  if (!identifier) {
    return null;
  }
  const itemSeries = series.radar?.series[identifier.seriesId];
  if (itemSeries == null) {
    return null;
  }
  const {
    radiusAxes,
    rotationAxes
  } = axesConfig;
  if (radiusAxes === void 0 || rotationAxes === void 0) {
    return null;
  }
  const rotationAxis = rotationAxes.axis[rotationAxes.axisIds[0]];
  const metrics = rotationAxis.scale.domain() ?? [];
  const angles = metrics.map((key) => rotationAxis.scale(key));
  const {
    cx,
    cy
  } = getDrawingAreaCenter(drawingArea);
  const polar2svg = generatePolar2svg({
    cx,
    cy
  });
  const points = itemSeries.data.map((value, dataIndex) => {
    const rId = radiusAxes.axisIds[dataIndex];
    const r = radiusAxes.axis[rId].scale(value);
    const angle = angles[dataIndex];
    return polar2svg(r, angle);
  });
  if (points.length === 0) {
    return null;
  }
  const [top, right, bottom, left] = points.reduce((acc, [x, y]) => {
    return [Math.min(y, acc[0]), Math.max(x, acc[1]), Math.max(y, acc[2]), Math.min(x, acc[3])];
  }, [Infinity, -Infinity, -Infinity, Infinity]);
  switch (placement) {
    case "right":
      return {
        x: right,
        y: (top + bottom) / 2
      };
    case "bottom":
      return {
        x: (left + right) / 2,
        y: bottom
      };
    case "left":
      return {
        x: left,
        y: (top + bottom) / 2
      };
    case "top":
    default:
      return {
        x: (left + right) / 2,
        y: top
      };
  }
};
var tooltipPosition_default = tooltipItemPositionGetter;

// node_modules/@mui/x-charts/esm/RadarChart/seriesConfig/index.js
var radarSeriesConfig = {
  colorProcessor: getColor_default,
  seriesProcessor: formatter_default,
  legendGetter: legend_default,
  tooltipGetter: tooltip_default,
  tooltipItemPositionGetter: tooltipPosition_default,
  axisTooltipGetter,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default,
  radiusExtremumGetter,
  rotationExtremumGetter
};

// node_modules/@mui/x-charts/esm/RadarChart/RadarDataProvider/RadarDataProvider.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var _excluded7 = ["series", "children", "width", "height", "colors", "skipAnimation", "margin", "radar", "highlight", "plugins"];
var RADAR_SERIES_CONFIG = {
  radar: radarSeriesConfig
};
var DEFAULT_RADAR_MARGIN = {
  top: 30,
  bottom: 30,
  left: 50,
  right: 50
};
function RadarDataProvider(props) {
  const {
    series,
    children,
    width,
    height,
    colors,
    skipAnimation,
    margin,
    radar,
    highlight,
    plugins
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const rotationAxes = React16.useMemo(() => [{
    id: "radar-rotation-axis",
    scaleType: "point",
    data: radar.metrics.map((metric) => typeof metric === "string" ? metric : metric.name),
    startAngle: radar.startAngle,
    endAngle: radar.startAngle !== void 0 ? radar.startAngle + 360 : void 0,
    labelGap: radar.labelGap,
    valueFormatter: (name, {
      location
    }) => radar.labelFormatter?.(name, {
      location
    }) ?? name
  }], [radar]);
  const radiusAxis = React16.useMemo(() => radar.metrics.map((m) => {
    const {
      name,
      min = 0,
      max = radar.max
    } = typeof m === "string" ? {
      name: m
    } : m;
    return {
      id: name,
      label: name,
      scaleType: "linear",
      min,
      max
    };
  }), [radar]);
  const defaultizedSeries = React16.useMemo(() => series.map((s) => _extends({
    type: "radar",
    highlightScope: s.highlightScope ?? (highlight === "series" ? {
      highlight: "series",
      fade: "global"
    } : void 0)
  }, s)), [series, highlight]);
  const defaultizedMargin = React16.useMemo(() => defaultizeMargin(margin, DEFAULT_RADAR_MARGIN), [margin]);
  return (0, import_jsx_runtime15.jsx)(ChartDataProvider, _extends({}, other, {
    series: defaultizedSeries,
    width,
    height,
    margin: defaultizedMargin,
    colors,
    skipAnimation,
    plugins: plugins ?? RADAR_PLUGINS,
    rotationAxis: rotationAxes,
    radiusAxis,
    seriesConfig: RADAR_SERIES_CONFIG,
    children
  }));
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/RadarSeriesPlot.js
var import_prop_types8 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/useRadarSeriesData.js
function useRadarSeriesData(querySeriesId) {
  const {
    instance
  } = useChartContext();
  const rotationScale = useRotationScale();
  const {
    radiusAxis
  } = useRadiusAxes();
  const radarSeries = useRadarSeries(querySeriesId === void 0 ? void 0 : [querySeriesId]);
  const {
    isFaded: isItemFaded,
    isHighlighted: isItemHighlighted
  } = useItemHighlightedGetter();
  const metrics = rotationScale?.domain() ?? [];
  const angles = metrics.map((key) => rotationScale(key));
  return radarSeries.map((series) => {
    const seriesId = series.id;
    const isSeriesHighlighted = isItemHighlighted({
      seriesId
    });
    const isSeriesFaded = !isSeriesHighlighted && isItemFaded({
      seriesId
    });
    const getColor2 = getSeriesColorFn(series);
    return _extends({}, series, {
      seriesId: series.id,
      isSeriesHighlighted,
      isSeriesFaded,
      points: series.data.map((value, dataIndex) => {
        const highlighted = isItemHighlighted({
          seriesId,
          dataIndex
        });
        const faded = !highlighted && isItemFaded({
          seriesId,
          dataIndex
        });
        const r = radiusAxis[metrics[dataIndex]].scale(value);
        const angle = angles[dataIndex];
        const [x, y] = instance.polar2svg(r, angle);
        return {
          x,
          y,
          isItemHighlighted: highlighted,
          isItemFaded: faded,
          dataIndex,
          value,
          color: getColor2({
            value,
            dataIndex
          })
        };
      })
    });
  });
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/useInteractionAllItemProps.js
var React18 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/hooks/useInteractionItemProps.js
var React17 = __toESM(require_react(), 1);
function onPointerDown(event) {
  if ("hasPointerCapture" in event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}
function getInteractionItemProps(instance, item) {
  function onPointerEnter() {
    if (!item) {
      return;
    }
    instance.setItemInteraction(item, {
      interaction: "pointer"
    });
    instance.setHighlight(item);
  }
  function onPointerLeave() {
    if (!item) {
      return;
    }
    instance.removeItemInteraction(item);
    instance.clearHighlight();
  }
  return {
    onPointerEnter,
    onPointerLeave,
    onPointerDown
  };
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/useInteractionAllItemProps.js
var useInteractionAllItemProps = (data, skip) => {
  const {
    instance
  } = useChartContext();
  const results = React18.useMemo(() => {
    return data.map((item) => {
      return skip ? {} : getInteractionItemProps(instance, {
        type: "radar",
        seriesId: item.seriesId,
        dataIndex: item.dataIndex
      });
    });
  }, [data, instance, skip]);
  return results;
};

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/radarSeriesPlotClasses.js
function getRadarSeriesPlotUtilityClass(slot) {
  return generateUtilityClass("MuiRadarSeriesPlot", slot);
}
var radarSeriesPlotClasses = generateUtilityClasses("MuiRadarSeriesPlot", ["root", "area", "mark", "highlighted", "faded"]);
var useUtilityClasses2 = (classes) => {
  const slots = {
    root: ["root"],
    area: ["area"],
    mark: ["mark"],
    highlighted: ["highlighted"],
    faded: ["faded"]
  };
  return composeClasses(slots, getRadarSeriesPlotUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/RadarSeriesArea.js
var React20 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/getAreaPath.js
function getAreaPath(points) {
  return `M ${points.map((p) => `${p.x} ${p.y}`).join("L")} Z`;
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/useRadarRotationIndex.js
var React19 = __toESM(require_react(), 1);
function useRadarRotationIndex() {
  const svgRef = useSvgRef();
  const store = useStore();
  const rotationAxis = useRotationAxis();
  const center = useSelector(store, selectorChartPolarCenter);
  const rotationIndexGetter = React19.useCallback(function rotationIndexGetter2(event) {
    const element = svgRef.current;
    if (!element || !rotationAxis) {
      throw new Error(`MUI X Charts: The ${!element ? "SVG" : "rotation axis"} was not found to compute radar dataIndex.`);
    }
    const svgPoint = getSVGPoint(element, event);
    const rotation = generateSvg2rotation(center)(svgPoint.x, svgPoint.y);
    const rotationIndex = getAxisIndex(rotationAxis, rotation);
    return rotationIndex;
  }, [center, rotationAxis, svgRef]);
  return rotationIndexGetter;
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/RadarSeriesArea.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var _excluded8 = ["seriesId", "onItemClick"];
function getPathProps(params) {
  const {
    isHighlighted,
    isFaded,
    seriesId,
    classes,
    points,
    fillArea,
    color
  } = params;
  const isItemHighlighted = isHighlighted({
    seriesId
  });
  const isItemFaded = !isItemHighlighted && isFaded({
    seriesId
  });
  return {
    d: getAreaPath(points),
    fill: fillArea ? color : "transparent",
    stroke: color,
    className: clsx_default(classes.area, isItemHighlighted && classes.highlighted || isItemFaded && classes.faded),
    strokeOpacity: isItemFaded ? 0.5 : 1,
    fillOpacity: isItemHighlighted && 0.4 || isItemFaded && 0.1 || 0.2,
    strokeWidth: !fillArea && isItemHighlighted ? 2 : 1
  };
}
function RadarSeriesArea(props) {
  const {
    seriesId,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const seriesCoordinates = useRadarSeriesData(seriesId);
  const getRotationIndex = useRadarRotationIndex();
  const interactionProps = useInteractionAllItemProps(seriesCoordinates);
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  const classes = useUtilityClasses2(props.classes);
  return (0, import_jsx_runtime16.jsx)(React20.Fragment, {
    children: seriesCoordinates?.map(({
      seriesId: id,
      points,
      color,
      fillArea
    }, seriesIndex) => {
      return (0, import_jsx_runtime16.jsx)("path", _extends({}, getPathProps({
        seriesId: id,
        points,
        color,
        fillArea,
        isFaded,
        isHighlighted,
        classes
      }), {
        onClick: (event) => onItemClick?.(event, {
          type: "radar",
          seriesId: id,
          dataIndex: getRotationIndex(event)
        }),
        cursor: onItemClick ? "pointer" : "unset"
      }, interactionProps[seriesIndex], other), id);
    })
  });
}
true ? RadarSeriesArea.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onItemClick: import_prop_types6.default.func,
  /**
   * The id of the series to display.
   * If undefined all series are displayed.
   */
  seriesId: import_prop_types6.default.string
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/RadarSeriesMarks.js
var React21 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var _excluded9 = ["seriesId", "onItemClick"];
function getCircleProps(params) {
  const {
    isHighlighted,
    isFaded,
    seriesId,
    classes,
    point,
    fillArea,
    color
  } = params;
  const isItemHighlighted = isHighlighted({
    seriesId
  });
  const isItemFaded = !isItemHighlighted && isFaded({
    seriesId
  });
  return {
    cx: point.x,
    cy: point.y,
    r: 3,
    fill: color,
    stroke: color,
    opacity: fillArea && isItemFaded ? 0.5 : 1,
    className: clsx(classes.mark, isItemHighlighted && classes.highlighted || isItemFaded && classes.faded)
  };
}
function RadarSeriesMarks(props) {
  const {
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const seriesCoordinates = useRadarSeriesData(props.seriesId);
  const classes = useUtilityClasses2(props.classes);
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  return (0, import_jsx_runtime17.jsx)(React21.Fragment, {
    children: seriesCoordinates?.map(({
      seriesId: id,
      points,
      hideMark,
      fillArea
    }) => {
      if (hideMark) {
        return null;
      }
      return (0, import_jsx_runtime17.jsx)("g", {
        children: points.map((point, index) => (0, import_jsx_runtime17.jsx)("circle", _extends({}, getCircleProps({
          seriesId: id,
          point,
          color: point.color,
          fillArea,
          isFaded,
          isHighlighted,
          classes
        }), {
          pointerEvents: onItemClick ? void 0 : "none",
          onClick: (event) => onItemClick?.(event, {
            type: "radar",
            seriesId: id,
            dataIndex: index
          }),
          cursor: onItemClick ? "pointer" : "unset"
        }, other), index))
      }, id);
    })
  });
}
true ? RadarSeriesMarks.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types7.default.object,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onItemClick: import_prop_types7.default.func,
  /**
   * The id of the series to display.
   * If undefined all series are displayed.
   */
  seriesId: import_prop_types7.default.string
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarSeriesPlot/RadarSeriesPlot.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
function RadarSeriesPlot(props) {
  const {
    seriesId: inSeriesId,
    classes: inClasses,
    onAreaClick,
    onMarkClick
  } = props;
  const seriesCoordinates = useRadarSeriesData(inSeriesId);
  const getRotationIndex = useRadarRotationIndex();
  const interactionProps = useInteractionAllItemProps(seriesCoordinates);
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  const classes = useUtilityClasses2(inClasses);
  return (0, import_jsx_runtime18.jsx)("g", {
    className: classes.root,
    children: seriesCoordinates?.map(({
      seriesId,
      points,
      color,
      hideMark,
      fillArea
    }, seriesIndex) => {
      return (0, import_jsx_runtime18.jsxs)("g", {
        children: [(0, import_jsx_runtime18.jsx)("path", _extends({}, getPathProps({
          seriesId,
          points,
          color,
          fillArea,
          isFaded,
          isHighlighted,
          classes
        }), {
          onClick: (event) => onAreaClick?.(event, {
            type: "radar",
            seriesId,
            dataIndex: getRotationIndex(event)
          }),
          cursor: onAreaClick ? "pointer" : "unset"
        }, interactionProps[seriesIndex]), seriesId), !hideMark && points.map((point, index) => (0, import_jsx_runtime18.jsx)("circle", _extends({}, getCircleProps({
          seriesId,
          point,
          color: point.color,
          fillArea,
          isFaded,
          isHighlighted,
          classes
        }), {
          onClick: (event) => onMarkClick?.(event, {
            type: "radar",
            seriesId,
            dataIndex: index
          }),
          cursor: onMarkClick ? "pointer" : "unset"
        }), index))]
      }, seriesId);
    })
  });
}
true ? RadarSeriesPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types8.default.object,
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: import_prop_types8.default.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: import_prop_types8.default.func,
  /**
   * The id of the series to display.
   * If undefined all series are displayed.
   */
  seriesId: import_prop_types8.default.string
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxisHighlight/RadarAxisHighlight.js
var import_prop_types9 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarInteraction.selectors.js
var optionalGetAxisId = (_, id) => id;
var optionalGetAxisIds = (_, ids) => ids;
function indexGetter(value, axes, ids) {
  return Array.isArray(ids) ? ids.map((id) => getAxisIndex(axes.axis[id], value)) : getAxisIndex(axes.axis[ids], value);
}
var selectorChartsInteractionRotationAngle = createSelector(selectorChartsInteractionPointerX, selectorChartsInteractionPointerY, selectorChartPolarCenter, (x, y, center) => {
  if (x === null || y === null) {
    return null;
  }
  return generateSvg2rotation(center)(x, y);
});
var selectorChartsInteractionRotationAxisIndex = createSelector(selectorChartsInteractionRotationAngle, selectorChartRotationAxis, optionalGetAxisId, (rotation, rotationAxis, id = rotationAxis.axisIds[0]) => rotation === null ? null : indexGetter(rotation, rotationAxis, id));
var selectorChartsInteractionRotationAxisIndexes = createSelector(selectorChartsInteractionRotationAngle, selectorChartRotationAxis, optionalGetAxisIds, (rotation, rotationAxis, ids = rotationAxis.axisIds) => rotation === null ? null : indexGetter(rotation, rotationAxis, ids));
var selectorChartsInteractionRotationAxisValue = createSelector(selectorChartRotationAxis, selectorChartsInteractionRotationAxisIndex, optionalGetAxisId, (rotationAxis, rotationIndex, id = rotationAxis.axisIds[0]) => {
  if (rotationIndex === null || rotationIndex === -1 || rotationAxis.axisIds.length === 0) {
    return null;
  }
  const data = rotationAxis.axis[id]?.data;
  if (!data) {
    return null;
  }
  return data[rotationIndex];
});
var selectorChartsInteractionRotationAxisValues = createSelector(selectorChartRotationAxis, selectorChartsInteractionRotationAxisIndexes, optionalGetAxisIds, (rotationAxis, rotationIndexes, ids = rotationAxis.axisIds) => {
  if (rotationIndexes === null) {
    return null;
  }
  return ids.map((id, axisIndex) => {
    const rotationIndex = rotationIndexes[axisIndex];
    if (rotationIndex === -1) {
      return null;
    }
    return rotationAxis.axis[id].data?.[rotationIndex];
  });
});
var selectorChartsInteractionTooltipRotationAxes = createSelectorMemoizedWithOptions({
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
})(selectorChartsInteractionRotationAxisIndexes, selectorChartRotationAxis, (indexes, axes) => {
  if (indexes === null) {
    return [];
  }
  return axes.axisIds.map((axisId, axisIndex) => ({
    axisId,
    dataIndex: indexes[axisIndex]
  })).filter(({
    axisId,
    dataIndex
  }) => axes.axis[axisId].triggerTooltip && dataIndex >= 0);
});
var selectorChartsInteractionPolarAxisTooltip = createSelector(selectorChartsInteractionTooltipRotationAxes, (rotationTooltip) => rotationTooltip.length > 0);

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxisHighlight/useRadarAxisHighlight.js
function useRadarAxisHighlight() {
  const radarSeries = useRadarSeries();
  const rotationScale = useRotationScale();
  const {
    radiusAxis,
    radiusAxisIds
  } = useRadiusAxes();
  const {
    instance
  } = useChartContext();
  const store = useStore();
  const rotationAxisIndex = useSelector(store, selectorChartsInteractionRotationAxisIndex);
  const rotationAxisValue = useSelector(store, selectorChartsInteractionRotationAxisValue);
  const center = useSelector(store, selectorChartPolarCenter);
  const highlightedIndex = rotationAxisIndex;
  if (!rotationScale) {
    return null;
  }
  if (highlightedIndex === null || highlightedIndex === -1) {
    return null;
  }
  if (radarSeries === void 0 || radarSeries.length === 0) {
    return null;
  }
  const metric = radiusAxisIds[highlightedIndex];
  const radiusScale = radiusAxis[metric].scale;
  const angle = rotationScale(rotationAxisValue);
  const radius = radiusScale.range()[1];
  return {
    center,
    radius,
    instance,
    highlightedIndex,
    highlightedMetric: metric,
    highlightedAngle: angle,
    series: radarSeries,
    points: radarSeries.map((series) => {
      const value = series.data[highlightedIndex];
      const r = radiusScale(value);
      const [x, y] = instance.polar2svg(r, angle);
      const returnedValue = {
        x,
        y,
        r,
        angle,
        value
      };
      return returnedValue;
    })
  };
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxisHighlight/radarAxisHighlightClasses.js
function getRadarAxisHighlightUtilityClass(slot) {
  return generateUtilityClass("MuiRadarAxisHighlight", slot);
}
var chartsAxisHighlightClasses = generateUtilityClasses("MuiRadarAxisHighlight", ["root", "line", "dot"]);

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxisHighlight/RadarAxisHighlight.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses3 = (classes) => {
  const slots = {
    root: ["root"],
    line: ["line"],
    dot: ["dot"]
  };
  return composeClasses(slots, getRadarAxisHighlightUtilityClass, classes);
};
var highlightMarkShadow = {
  r: 7,
  opacity: 0.3
};
var highlightMark = {
  r: 3,
  opacity: 1
};
function RadarAxisHighlight(props) {
  const classes = useUtilityClasses3(props.classes);
  const theme = useTheme();
  const data = useRadarAxisHighlight();
  if (data === null) {
    return null;
  }
  const {
    center,
    series,
    points,
    radius,
    highlightedAngle,
    highlightedIndex,
    instance
  } = data;
  const [x, y] = instance.polar2svg(radius, highlightedAngle);
  return (0, import_jsx_runtime19.jsxs)("g", {
    className: classes.root,
    children: [(0, import_jsx_runtime19.jsx)("path", {
      d: `M ${center.cx} ${center.cy} L ${x} ${y}`,
      stroke: (theme.vars || theme).palette.text.primary,
      strokeWidth: 1,
      className: classes.line,
      pointerEvents: "none",
      strokeDasharray: "4 4"
    }), points.map((point, seriesIndex) => {
      const colorGetter = getSeriesColorFn(series[seriesIndex]);
      return (0, import_jsx_runtime19.jsx)("circle", _extends({
        fill: colorGetter({
          value: point.value,
          dataIndex: highlightedIndex
        }),
        cx: point.x,
        cy: point.y,
        className: classes.dot,
        pointerEvents: "none"
      }, series[seriesIndex].hideMark ? highlightMark : highlightMarkShadow), series[seriesIndex].id);
    })]
  });
}
true ? RadarAxisHighlight.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types9.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarMetricLabels/RadarMetricLabels.js
var React24 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/RadarChart/RadarMetricLabels/useRadarMetricData.js
function useRadarMetricData() {
  const rotationAxis = useRotationAxis();
  const {
    scale: rotationScale,
    valueFormatter,
    labelGap = 10
  } = rotationAxis;
  const {
    radiusAxis
  } = useRadiusAxes();
  const drawingArea = useDrawingArea();
  const cx = drawingArea.left + drawingArea.width / 2;
  const cy = drawingArea.top + drawingArea.height / 2;
  const metrics = rotationScale.domain();
  const angles = metrics.map((key) => rotationScale(key));
  return {
    corners: metrics.map((metric, dataIndex) => {
      const radiusScale = radiusAxis[metric].scale;
      const r = radiusScale.range()[1] + labelGap;
      const angle = angles[dataIndex];
      const defaultTickLabel = metric;
      return {
        x: cx + r * Math.sin(angle),
        y: cy - r * Math.cos(angle),
        angle: rad2deg(angle),
        label: valueFormatter?.(metric, {
          location: "tick",
          scale: rotationScale,
          defaultTickLabel
        }) ?? defaultTickLabel
      };
    })
  };
}

// node_modules/@mui/x-charts/esm/ChartsText/defaultTextPlacement.js
function getDefaultTextAnchor(angle) {
  const adjustedAngle = clampAngle(angle);
  if (adjustedAngle <= 30 || adjustedAngle >= 330) {
    return "middle";
  }
  if (adjustedAngle <= 210 && adjustedAngle >= 150) {
    return "middle";
  }
  if (adjustedAngle <= 180) {
    return "end";
  }
  return "start";
}
function getDefaultBaseline(angle) {
  const adjustedAngle = clampAngle(angle);
  if (adjustedAngle <= 30 || adjustedAngle >= 330) {
    return "hanging";
  }
  if (adjustedAngle <= 210 && adjustedAngle >= 150) {
    return "auto";
  }
  return "central";
}

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
var React23 = __toESM(require_react(), 1);
var import_prop_types10 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/domUtils.js
function isSsr() {
  return typeof window === "undefined";
}
var stringCache = /* @__PURE__ */ new Map();
var MAX_CACHE_NUM = 2e3;
var PIXEL_STYLES = /* @__PURE__ */ new Set(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height", "top", "left", "fontSize", "padding", "margin", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom"]);
function convertPixelValue(name, value) {
  if (PIXEL_STYLES.has(name) && value === +value) {
    return `${value}px`;
  }
  return value;
}
var AZ = /([A-Z])/g;
function camelCaseToDashCase(text) {
  return String(text).replace(AZ, (match) => `-${match.toLowerCase()}`);
}
function getStyleString(style) {
  let result = "";
  for (const key in style) {
    if (Object.hasOwn(style, key)) {
      const k = key;
      const value = style[k];
      if (value === void 0) {
        continue;
      }
      result += `${camelCaseToDashCase(k)}:${convertPixelValue(k, value)};`;
    }
  }
  return result;
}
var getStringSize = (text, style = {}) => {
  if (text === void 0 || text === null || isSsr()) {
    return {
      width: 0,
      height: 0
    };
  }
  const str = String(text);
  const styleString = getStyleString(style);
  const cacheKey = `${str}-${styleString}`;
  const size = stringCache.get(cacheKey);
  if (size) {
    return size;
  }
  try {
    const measurementSpanContainer = getMeasurementContainer();
    const measurementElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    Object.keys(style).map((styleKey) => {
      measurementElem.style[camelCaseToDashCase(styleKey)] = convertPixelValue(styleKey, style[styleKey]);
      return styleKey;
    });
    measurementElem.textContent = str;
    measurementSpanContainer.replaceChildren(measurementElem);
    const result = measureSVGTextElement(measurementElem);
    stringCache.set(cacheKey, result);
    if (stringCache.size + 1 > MAX_CACHE_NUM) {
      stringCache.clear();
    }
    if (false) {
      measurementSpanContainer.replaceChildren();
    }
    return result;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
};
function measureSVGTextElement(element) {
  try {
    const result = element.getBBox();
    return {
      width: result.width,
      height: result.height
    };
  } catch {
    const result = element.getBoundingClientRect();
    return {
      width: result.width,
      height: result.height
    };
  }
}
var measurementContainer = null;
function getMeasurementContainer() {
  if (measurementContainer === null) {
    measurementContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    measurementContainer.setAttribute("aria-hidden", "true");
    measurementContainer.style.position = "absolute";
    measurementContainer.style.top = "-20000px";
    measurementContainer.style.left = "0";
    measurementContainer.style.padding = "0";
    measurementContainer.style.margin = "0";
    measurementContainer.style.border = "none";
    measurementContainer.style.pointerEvents = "none";
    measurementContainer.style.visibility = "hidden";
    measurementContainer.style.contain = "strict";
    document.body.appendChild(measurementContainer);
  }
  return measurementContainer;
}

// node_modules/@mui/x-charts/esm/internals/getWordsByLines.js
function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split("\n").map((subText) => _extends({
    text: subText
  }, needsComputation ? getStringSize(subText, style) : {
    width: 0,
    height: 0
  }));
}

// node_modules/@mui/x-charts/esm/hooks/useIsHydrated.js
var React22 = __toESM(require_react(), 1);
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = React22.useState(false);
  React22.useEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated;
}

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var _excluded10 = ["x", "y", "style", "text", "ownerState"];
var _excluded23 = ["angle", "textAnchor", "dominantBaseline"];
function ChartsText(props) {
  const {
    x,
    y,
    style: styleProps,
    text
  } = props, textProps = _objectWithoutPropertiesLoose(props, _excluded10);
  const _ref = styleProps ?? {}, {
    angle,
    textAnchor,
    dominantBaseline
  } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded23);
  const isHydrated = useIsHydrated();
  const wordsByLines = React23.useMemo(() => getWordsByLines({
    style,
    needsComputation: isHydrated && text.includes("\n"),
    text
  }), [style, text, isHydrated]);
  let startDy;
  switch (dominantBaseline) {
    case "hanging":
    case "text-before-edge":
      startDy = 0;
      break;
    case "central":
      startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
      break;
    default:
      startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
      break;
  }
  return (0, import_jsx_runtime20.jsx)("text", _extends({}, textProps, {
    transform: angle ? `rotate(${angle}, ${x}, ${y})` : void 0,
    x,
    y,
    textAnchor,
    dominantBaseline,
    style,
    children: wordsByLines.map((line, index) => (0, import_jsx_runtime20.jsx)("tspan", {
      x,
      dy: `${index === 0 ? startDy : wordsByLines[0].height}px`,
      dominantBaseline,
      children: line.text
    }, index))
  }));
}
true ? ChartsText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: import_prop_types10.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: import_prop_types10.default.bool,
  ownerState: import_prop_types10.default.any,
  /**
   * Style applied to text elements.
   */
  style: import_prop_types10.default.object,
  /**
   * Text displayed.
   */
  text: import_prop_types10.default.string.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarMetricLabels/RadarMetricLabels.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
function RadarMetricLabels() {
  const {
    corners
  } = useRadarMetricData();
  const theme = useTheme();
  return (0, import_jsx_runtime21.jsx)(React24.Fragment, {
    children: corners.map(({
      x,
      y,
      angle,
      label
    }, i) => (0, import_jsx_runtime21.jsx)(ChartsText, {
      x,
      y,
      fontSize: 14,
      fill: (theme.vars || theme).palette.text.primary,
      stroke: "none",
      text: label,
      style: _extends({}, theme.typography.caption, {
        fontSize: 12,
        lineHeight: 1.25,
        textAnchor: getDefaultTextAnchor(180 + angle),
        dominantBaseline: getDefaultBaseline(180 + angle)
      })
    }, i))
  });
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
var import_prop_types14 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
var import_prop_types11 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsTooltip/chartsTooltipClasses.js
function getChartsTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiChartsTooltip", slot);
}
var chartsTooltipClasses = generateUtilityClasses("MuiChartsTooltip", ["root", "paper", "table", "row", "cell", "mark", "markContainer", "labelCell", "valueCell", "axisValueCell"]);
var useUtilityClasses4 = (classes) => {
  const slots = {
    root: ["root"],
    paper: ["paper"],
    table: ["table"],
    row: ["row"],
    cell: ["cell"],
    mark: ["mark"],
    markContainer: ["markContainer"],
    labelCell: ["labelCell"],
    valueCell: ["valueCell"],
    axisValueCell: ["axisValueCell"]
  };
  return composeClasses(slots, getChartsTooltipUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/ChartsTooltip/useItemTooltip.js
function useInternalItemTooltip() {
  const store = useStore();
  const identifier = useSelector(store, selectorChartsTooltipItem);
  const seriesConfig = useSelector(store, selectorChartSeriesConfig);
  const series = useSeries();
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
  const {
    rotationAxis,
    rotationAxisIds
  } = useRotationAxes();
  if (!identifier) {
    return null;
  }
  const itemSeries = series[identifier.type]?.series[identifier.seriesId];
  if (!itemSeries) {
    return null;
  }
  const xAxisId = isCartesianSeries(itemSeries) ? itemSeries.xAxisId ?? xAxisIds[0] : void 0;
  const yAxisId = isCartesianSeries(itemSeries) ? itemSeries.yAxisId ?? yAxisIds[0] : void 0;
  const zAxisId = "zAxisId" in itemSeries ? itemSeries.zAxisId ?? zAxisIds[0] : zAxisIds[0];
  const rotationAxisId = rotationAxisIds[0];
  const getColor2 = seriesConfig[itemSeries.type].colorProcessor?.(itemSeries, xAxisId !== void 0 ? xAxis[xAxisId] : void 0, yAxisId !== void 0 ? yAxis[yAxisId] : void 0, zAxisId !== void 0 ? zAxis[zAxisId] : void 0) ?? (() => "");
  const axesConfig = {};
  if (xAxisId !== void 0) {
    axesConfig.x = xAxis[xAxisId];
  }
  if (yAxisId !== void 0) {
    axesConfig.y = yAxis[yAxisId];
  }
  if (rotationAxisId !== void 0) {
    axesConfig.rotation = rotationAxis[rotationAxisId];
  }
  return seriesConfig[itemSeries.type].tooltipGetter({
    series: itemSeries,
    axesConfig,
    getColor: getColor2,
    identifier
  });
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipTable.js
var ChartsTooltipPaper = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Container",
  overridesResolver: (props, styles) => styles.paper
  // FIXME: Inconsistent naming with slot
})(({
  theme
}) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  borderRadius: (theme.vars || theme).shape?.borderRadius,
  border: `solid ${(theme.vars || theme).palette.divider} 1px`
}));
var ChartsTooltipTable = styled_default("table", {
  name: "MuiChartsTooltip",
  slot: "Table"
})(({
  theme
}) => ({
  borderSpacing: 0,
  [`& .${chartsTooltipClasses.markContainer}`]: {
    display: "inline-block",
    width: `calc(20px + ${theme.spacing(1.5)})`,
    verticalAlign: "middle"
  },
  "& caption": {
    borderBottom: `solid ${(theme.vars || theme).palette.divider} 1px`,
    padding: theme.spacing(0.5, 1.5),
    textAlign: "start",
    whiteSpace: "nowrap",
    "& span": {
      marginRight: theme.spacing(1.5)
    }
  }
}));
var ChartsTooltipRow = styled_default("tr", {
  name: "MuiChartsTooltip",
  slot: "Row"
})(({
  theme
}) => ({
  "tr:first-of-type& td": {
    paddingTop: theme.spacing(0.5)
  },
  "tr:last-of-type& td": {
    paddingBottom: theme.spacing(0.5)
  }
}));
var ChartsTooltipCell = styled_default(Typography_default, {
  name: "MuiChartsTooltip",
  slot: "Cell"
})(({
  theme
}) => ({
  verticalAlign: "middle",
  color: (theme.vars || theme).palette.text.secondary,
  textAlign: "start",
  [`&.${chartsTooltipClasses.cell}`]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  [`&.${chartsTooltipClasses.labelCell}`]: {
    whiteSpace: "nowrap",
    fontWeight: theme.typography.fontWeightRegular
  },
  [`&.${chartsTooltipClasses.valueCell}, &.${chartsTooltipClasses.axisValueCell}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  [`&.${chartsTooltipClasses.valueCell}`]: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  },
  "td:first-of-type&, th:first-of-type&": {
    paddingLeft: theme.spacing(1.5)
  },
  "td:last-of-type&, th:last-of-type&": {
    paddingRight: theme.spacing(1.5)
  }
}));

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
function ChartsItemTooltipContent(props) {
  const {
    classes: propClasses,
    sx
  } = props;
  const tooltipData = useInternalItemTooltip();
  const classes = useUtilityClasses4(propClasses);
  if (!tooltipData) {
    return null;
  }
  if ("values" in tooltipData) {
    const {
      label: seriesLabel,
      color: color2,
      markType: markType2
    } = tooltipData;
    return (0, import_jsx_runtime22.jsx)(ChartsTooltipPaper, {
      sx,
      className: classes.paper,
      children: (0, import_jsx_runtime22.jsxs)(ChartsTooltipTable, {
        className: classes.table,
        children: [(0, import_jsx_runtime22.jsxs)(Typography_default, {
          component: "caption",
          children: [(0, import_jsx_runtime22.jsx)("div", {
            className: classes.markContainer,
            children: (0, import_jsx_runtime22.jsx)(ChartsLabelMark, {
              type: markType2,
              color: color2,
              className: classes.mark
            })
          }), seriesLabel]
        }), (0, import_jsx_runtime22.jsx)("tbody", {
          children: tooltipData.values.map(({
            formattedValue: formattedValue2,
            label: label2
          }) => (0, import_jsx_runtime22.jsxs)(ChartsTooltipRow, {
            className: classes.row,
            children: [(0, import_jsx_runtime22.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.labelCell, classes.cell),
              component: "th",
              children: label2
            }), (0, import_jsx_runtime22.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.valueCell, classes.cell),
              component: "td",
              children: formattedValue2
            })]
          }, label2))
        })]
      })
    });
  }
  const {
    color,
    label,
    formattedValue,
    markType
  } = tooltipData;
  return (0, import_jsx_runtime22.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.paper,
    children: (0, import_jsx_runtime22.jsx)(ChartsTooltipTable, {
      className: classes.table,
      children: (0, import_jsx_runtime22.jsx)("tbody", {
        children: (0, import_jsx_runtime22.jsxs)(ChartsTooltipRow, {
          className: classes.row,
          children: [(0, import_jsx_runtime22.jsxs)(ChartsTooltipCell, {
            className: clsx_default(classes.labelCell, classes.cell),
            component: "th",
            children: [(0, import_jsx_runtime22.jsx)("div", {
              className: classes.markContainer,
              children: (0, import_jsx_runtime22.jsx)(ChartsLabelMark, {
                type: markType,
                color,
                className: classes.mark
              })
            }), label]
          }), (0, import_jsx_runtime22.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.valueCell, classes.cell),
            component: "td",
            children: formattedValue
          })]
        })
      })
    })
  });
}
true ? ChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types11.default.object,
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
var import_prop_types12 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useColorProcessor.js
var React25 = __toESM(require_react(), 1);
function useColorProcessor(seriesType) {
  const store = useStore();
  const seriesConfig = useSelector(store, selectorChartSeriesConfig);
  const colorProcessors = React25.useMemo(() => {
    const rep = {};
    Object.keys(seriesConfig).forEach((seriesT) => {
      rep[seriesT] = seriesConfig[seriesT].colorProcessor;
    });
    return rep;
  }, [seriesConfig]);
  if (!seriesType) {
    return colorProcessors;
  }
  return colorProcessors[seriesType];
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/utils.js
var React26 = __toESM(require_react(), 1);
function usePointerType() {
  const svgRef = useSvgRef();
  const [pointerType, setPointerType] = React26.useState(null);
  React26.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {
      };
    }
    const handleOut = (event) => {
      if (event.pointerType !== "mouse") {
        setPointerType(null);
      }
    };
    const handleEnter = (event) => {
      setPointerType({
        pointerType: event.pointerType
      });
    };
    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointerup", handleOut);
    return () => {
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointerup", handleOut);
    };
  }, [svgRef]);
  return pointerType;
}
function utcFormatter(v) {
  if (v instanceof Date) {
    return v.toUTCString();
  }
  return v.toLocaleString();
}
var mainPointerFineMediaQuery = "@media (pointer: fine)";
var useIsFineMainPointer = () => {
  return useMediaQuery_default(mainPointerFineMediaQuery, {
    defaultMatches: true
  });
};

// node_modules/@mui/x-charts/esm/ChartsTooltip/useAxisTooltip.js
function defaultAxisTooltipConfig(axis, dataIndex, axisDirection) {
  const axisValue = axis.data?.[dataIndex] ?? null;
  const axisFormatter = axis.valueFormatter ?? ((v) => axis.scaleType === "utc" ? utcFormatter(v) : v.toLocaleString());
  const axisFormattedValue = axisFormatter(axisValue, {
    location: "tooltip",
    scale: axis.scale
  });
  return {
    axisDirection,
    axisId: axis.id,
    mainAxis: axis,
    dataIndex,
    axisValue,
    axisFormattedValue,
    seriesItems: []
  };
}
function useAxisTooltip(params = {}) {
  const {
    multipleAxes,
    directions
  } = params;
  const defaultXAxis = useXAxis();
  const defaultYAxis = useYAxis();
  const defaultRotationAxis = useRotationAxis();
  const store = useStore();
  const tooltipXAxes = useSelector(store, selectorChartsInteractionTooltipXAxes);
  const tooltipYAxes = useSelector(store, selectorChartsInteractionTooltipYAxes);
  const tooltipRotationAxes = useSelector(store, selectorChartsInteractionTooltipRotationAxes);
  const series = useSeries();
  const {
    xAxis
  } = useXAxes();
  const {
    yAxis
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  const {
    rotationAxis
  } = useRotationAxes();
  const colorProcessors = useColorProcessor();
  if (tooltipXAxes.length === 0 && tooltipYAxes.length === 0 && tooltipRotationAxes.length === 0) {
    return null;
  }
  const tooltipAxes = [];
  if (directions === void 0 || directions.includes("x")) {
    tooltipXAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(xAxis[axisId], dataIndex, "x"));
    });
  }
  if (directions === void 0 || directions.includes("y")) {
    tooltipYAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(yAxis[axisId], dataIndex, "y"));
    });
  }
  if (directions === void 0 || directions.includes("rotation")) {
    tooltipRotationAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(rotationAxis[axisId], dataIndex, "rotation"));
    });
  }
  Object.keys(series).filter(isCartesianSeriesType).forEach((seriesType) => {
    const seriesOfType = series[seriesType];
    if (!seriesOfType) {
      return [];
    }
    return seriesOfType.seriesOrder.forEach((seriesId) => {
      const seriesToAdd = seriesOfType.series[seriesId];
      const providedXAxisId = seriesToAdd.xAxisId ?? defaultXAxis.id;
      const providedYAxisId = seriesToAdd.yAxisId ?? defaultYAxis.id;
      const tooltipItemIndex = tooltipAxes.findIndex(({
        axisDirection,
        axisId
      }) => axisDirection === "x" && axisId === providedXAxisId || axisDirection === "y" && axisId === providedYAxisId);
      if (tooltipItemIndex >= 0) {
        const zAxisId = "zAxisId" in seriesToAdd ? seriesToAdd.zAxisId : zAxisIds[0];
        const {
          dataIndex
        } = tooltipAxes[tooltipItemIndex];
        const color = colorProcessors[seriesType]?.(seriesToAdd, xAxis[providedXAxisId], yAxis[providedYAxisId], zAxisId ? zAxis[zAxisId] : void 0)(dataIndex) ?? "";
        const value = seriesToAdd.data[dataIndex] ?? null;
        const formattedValue = seriesToAdd.valueFormatter(value, {
          dataIndex
        });
        const formattedLabel = getLabel(seriesToAdd.label, "tooltip") ?? null;
        tooltipAxes[tooltipItemIndex].seriesItems.push({
          seriesId,
          color,
          value,
          formattedValue,
          formattedLabel,
          markType: seriesToAdd.labelMarkType
        });
      }
    });
  });
  Object.keys(series).filter(isPolarSeriesType).forEach((seriesType) => {
    const seriesOfType = series[seriesType];
    if (!seriesOfType) {
      return [];
    }
    return seriesOfType.seriesOrder.forEach((seriesId) => {
      const seriesToAdd = seriesOfType.series[seriesId];
      const providedRotationAxisId = (
        // @ts-expect-error Should be fixed when we introduce a polar series with a rotationAxisId
        seriesToAdd.rotationAxisId ?? defaultRotationAxis?.id
      );
      const tooltipItemIndex = tooltipAxes.findIndex(({
        axisDirection,
        axisId
      }) => axisDirection === "rotation" && axisId === providedRotationAxisId);
      if (tooltipItemIndex >= 0) {
        const {
          dataIndex
        } = tooltipAxes[tooltipItemIndex];
        const color = colorProcessors[seriesType]?.(seriesToAdd)(dataIndex) ?? "";
        const value = seriesToAdd.data[dataIndex] ?? null;
        const formattedValue = seriesToAdd.valueFormatter(value, {
          dataIndex
        });
        const formattedLabel = getLabel(seriesToAdd.label, "tooltip") ?? null;
        tooltipAxes[tooltipItemIndex].seriesItems.push({
          seriesId,
          color,
          value,
          formattedValue,
          formattedLabel,
          markType: seriesToAdd.labelMarkType
        });
      }
    });
  });
  if (!multipleAxes) {
    return tooltipAxes.length === 0 ? tooltipAxes[0] : null;
  }
  return tooltipAxes;
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/useAxesTooltip.js
function useAxesTooltip(params) {
  return useAxisTooltip(_extends({}, params, {
    multipleAxes: true
  }));
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
function ChartsAxisTooltipContent(props) {
  const classes = useUtilityClasses4(props.classes);
  const tooltipData = useAxesTooltip();
  if (tooltipData === null) {
    return null;
  }
  return (0, import_jsx_runtime23.jsx)(ChartsTooltipPaper, {
    sx: props.sx,
    className: classes.paper,
    children: tooltipData.map(({
      axisId,
      mainAxis,
      axisValue,
      axisFormattedValue,
      seriesItems
    }) => {
      return (0, import_jsx_runtime23.jsxs)(ChartsTooltipTable, {
        className: classes.table,
        children: [axisValue != null && !mainAxis.hideTooltip && (0, import_jsx_runtime23.jsx)(Typography_default, {
          component: "caption",
          children: axisFormattedValue
        }), (0, import_jsx_runtime23.jsx)("tbody", {
          children: seriesItems.map(({
            seriesId,
            color,
            formattedValue,
            formattedLabel,
            markType
          }) => {
            if (formattedValue == null) {
              return null;
            }
            return (0, import_jsx_runtime23.jsxs)(ChartsTooltipRow, {
              className: classes.row,
              children: [(0, import_jsx_runtime23.jsxs)(ChartsTooltipCell, {
                className: clsx_default(classes.labelCell, classes.cell),
                component: "th",
                children: [(0, import_jsx_runtime23.jsx)("div", {
                  className: classes.markContainer,
                  children: (0, import_jsx_runtime23.jsx)(ChartsLabelMark, {
                    type: markType,
                    color,
                    className: classes.mark
                  })
                }), formattedLabel || null]
              }), (0, import_jsx_runtime23.jsx)(ChartsTooltipCell, {
                className: clsx_default(classes.valueCell, classes.cell),
                component: "td",
                children: formattedValue
              })]
            }, seriesId);
          })
        })]
      }, axisId);
    })
  });
}
true ? ChartsAxisTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types12.default.object,
  sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipContainer.js
var React27 = __toESM(require_react(), 1);
var import_prop_types13 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-internals/esm/rafThrottle/rafThrottle.js
function rafThrottle(fn) {
  let lastArgs;
  let rafRef;
  const later = () => {
    rafRef = null;
    fn(...lastArgs);
  };
  function throttled(...args) {
    lastArgs = args;
    if (!rafRef) {
      rafRef = requestAnimationFrame(later);
    }
  }
  throttled.clear = () => {
    if (rafRef) {
      cancelAnimationFrame(rafRef);
      rafRef = null;
    }
  };
  return throttled;
}

// node_modules/@mui/x-charts/esm/hooks/useAxisSystem.js
function useAxisSystem() {
  const store = useStore();
  const rawRotationAxis = useSelector(store, selectorChartRawRotationAxis);
  const rawXAxis = useSelector(store, selectorChartRawXAxis);
  if (rawRotationAxis !== void 0) {
    return "polar";
  }
  if (rawXAxis !== void 0) {
    return "cartesian";
  }
  return "none";
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipContainer.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var _excluded11 = ["trigger", "position", "anchor", "classes", "children"];
var selectorReturnFalse = () => false;
var selectorReturnNull = () => null;
function getIsOpenSelector(trigger, axisSystem, shouldPreventBecauseOfBrush) {
  if (shouldPreventBecauseOfBrush) {
    return selectorReturnFalse;
  }
  if (trigger === "item") {
    return selectorChartsTooltipItemIsDefined;
  }
  if (axisSystem === "polar") {
    return selectorChartsInteractionPolarAxisTooltip;
  }
  if (axisSystem === "cartesian") {
    return selectorChartsInteractionAxisTooltip;
  }
  return selectorReturnFalse;
}
var ChartsTooltipRoot = styled_default(Popper_default, {
  name: "MuiChartsTooltip",
  slot: "Root"
})(({
  theme
}) => ({
  pointerEvents: "none",
  zIndex: theme.zIndex.modal
}));
function ChartsTooltipContainer(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsTooltipContainer"
  });
  const {
    trigger = "axis",
    position,
    anchor = "pointer",
    classes: propClasses,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const svgRef = useSvgRef();
  const classes = useUtilityClasses4(propClasses);
  const pointerType = usePointerType();
  const isFineMainPointer = useIsFineMainPointer();
  const popperRef = React27.useRef(null);
  const positionRef = useLazyRef(() => ({
    x: 0,
    y: 0
  }));
  const axisSystem = useAxisSystem();
  const store = useStore();
  const shouldPreventBecauseOfBrush = useSelector(store, selectorBrushShouldPreventTooltip);
  const isOpen = useSelector(store, getIsOpenSelector(trigger, axisSystem, shouldPreventBecauseOfBrush));
  const lastInteraction = useSelector(store, selectorChartsLastInteraction);
  const computedAnchor = lastInteraction === "keyboard" ? "node" : anchor;
  const itemPosition = useSelector(store, trigger === "item" && computedAnchor === "node" ? selectorChartsTooltipItemPosition : selectorReturnNull, position);
  React27.useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement === null) {
      return () => {
      };
    }
    if (itemPosition !== null) {
      const positionUpdate = rafThrottle(() => {
        positionRef.current = {
          x: svgElement.getBoundingClientRect().left + (itemPosition?.x ?? 0),
          y: svgElement.getBoundingClientRect().top + (itemPosition?.y ?? 0)
        };
        popperRef.current?.update();
      });
      positionUpdate();
      return () => positionUpdate.clear();
    }
    const pointerUpdate = rafThrottle((x, y) => {
      positionRef.current = {
        x,
        y
      };
      popperRef.current?.update();
    });
    const handlePointerEvent = (event) => {
      pointerUpdate(event.clientX, event.clientY);
    };
    svgElement.addEventListener("pointerdown", handlePointerEvent);
    svgElement.addEventListener("pointermove", handlePointerEvent);
    svgElement.addEventListener("pointerenter", handlePointerEvent);
    return () => {
      svgElement.removeEventListener("pointerdown", handlePointerEvent);
      svgElement.removeEventListener("pointermove", handlePointerEvent);
      svgElement.removeEventListener("pointerenter", handlePointerEvent);
      pointerUpdate.clear();
    };
  }, [svgRef, positionRef, itemPosition]);
  const anchorEl = React27.useMemo(() => ({
    getBoundingClientRect: () => ({
      x: positionRef.current.x,
      y: positionRef.current.y,
      top: positionRef.current.y,
      left: positionRef.current.x,
      right: positionRef.current.x,
      bottom: positionRef.current.y,
      width: 0,
      height: 0,
      toJSON: () => ""
    })
  }), [positionRef]);
  const isMouse = pointerType?.pointerType === "mouse" || isFineMainPointer;
  const isTouch = pointerType?.pointerType === "touch" || !isFineMainPointer;
  const modifiers = React27.useMemo(() => [
    {
      name: "offset",
      options: {
        offset: () => {
          if (isTouch) {
            return [0, 64];
          }
          return [0, 8];
        }
      }
    },
    ...!isMouse ? [{
      name: "flip",
      options: {
        fallbackPlacements: ["top-end", "top-start", "bottom-end", "bottom"]
      }
    }] : [],
    // Keep default behavior
    {
      name: "preventOverflow",
      options: {
        altAxis: true
      }
    }
  ], [isMouse, isTouch]);
  if (trigger === "none") {
    return null;
  }
  return (0, import_jsx_runtime24.jsx)(NoSsr_default, {
    children: isOpen && (0, import_jsx_runtime24.jsx)(ChartsTooltipRoot, _extends({}, other, {
      className: classes?.root,
      open: isOpen,
      placement: other.placement ?? position ?? (isMouse ? "right-start" : "top"),
      popperRef,
      anchorEl,
      modifiers,
      children
    }))
  });
}
true ? ChartsTooltipContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Determine if the tooltip should be placed on the pointer location or on the node.
   * @default 'pointer'
   */
  anchor: import_prop_types13.default.oneOf(["node", "pointer"]),
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: import_prop_types13.default.oneOfType([HTMLElementType, import_prop_types13.default.object, import_prop_types13.default.func]),
  /**
   * Popper render function or node.
   */
  children: import_prop_types13.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types13.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types13.default.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: import_prop_types13.default.shape({
    Root: import_prop_types13.default.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: import_prop_types13.default.shape({
    root: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types13.default.oneOfType([(props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  }, import_prop_types13.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types13.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types13.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types13.default.arrayOf(import_prop_types13.default.shape({
    data: import_prop_types13.default.object,
    effect: import_prop_types13.default.func,
    enabled: import_prop_types13.default.bool,
    fn: import_prop_types13.default.func,
    name: import_prop_types13.default.any,
    options: import_prop_types13.default.object,
    phase: import_prop_types13.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types13.default.arrayOf(import_prop_types13.default.string),
    requiresIfExists: import_prop_types13.default.arrayOf(import_prop_types13.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types13.default.bool,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types13.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types13.default.shape({
    modifiers: import_prop_types13.default.array,
    onFirstUpdate: import_prop_types13.default.func,
    placement: import_prop_types13.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types13.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.shape({
    current: import_prop_types13.default.shape({
      destroy: import_prop_types13.default.func.isRequired,
      forceUpdate: import_prop_types13.default.func.isRequired,
      setOptions: import_prop_types13.default.func.isRequired,
      state: import_prop_types13.default.shape({
        attributes: import_prop_types13.default.object.isRequired,
        elements: import_prop_types13.default.object.isRequired,
        modifiersData: import_prop_types13.default.object.isRequired,
        options: import_prop_types13.default.object.isRequired,
        orderedModifiers: import_prop_types13.default.arrayOf(import_prop_types13.default.object).isRequired,
        placement: import_prop_types13.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]).isRequired,
        rects: import_prop_types13.default.object.isRequired,
        reset: import_prop_types13.default.bool.isRequired,
        scrollParents: import_prop_types13.default.object.isRequired,
        strategy: import_prop_types13.default.oneOf(["absolute", "fixed"]).isRequired,
        styles: import_prop_types13.default.object.isRequired
      }).isRequired,
      update: import_prop_types13.default.func.isRequired
    })
  })]),
  /**
   * Determines the tooltip position relatively to the anchor.
   */
  position: import_prop_types13.default.oneOf(["bottom", "left", "right", "top"]),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types13.default.object,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types13.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object, import_prop_types13.default.bool])), import_prop_types13.default.func, import_prop_types13.default.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types13.default.bool,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse;
   * - 'axis': Shows values associated with the hovered x value;
   * - 'none': Does not display tooltip.
   * @default 'axis'
   */
  trigger: import_prop_types13.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
function ChartsTooltip(props) {
  const {
    classes: propClasses,
    trigger = "axis"
  } = props;
  const classes = useUtilityClasses4(propClasses);
  return (0, import_jsx_runtime25.jsx)(ChartsTooltipContainer, _extends({}, props, {
    classes: propClasses,
    children: trigger === "axis" ? (0, import_jsx_runtime25.jsx)(ChartsAxisTooltipContent, {
      classes
    }) : (0, import_jsx_runtime25.jsx)(ChartsItemTooltipContent, {
      classes
    })
  }));
}
true ? ChartsTooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Determine if the tooltip should be placed on the pointer location or on the node.
   * @default 'pointer'
   */
  anchor: import_prop_types14.default.oneOf(["node", "pointer"]),
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: import_prop_types14.default.oneOfType([HTMLElementType, import_prop_types14.default.object, import_prop_types14.default.func]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types14.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types14.default.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: import_prop_types14.default.shape({
    Root: import_prop_types14.default.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: import_prop_types14.default.shape({
    root: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types14.default.oneOfType([(props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  }, import_prop_types14.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types14.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types14.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types14.default.arrayOf(import_prop_types14.default.shape({
    data: import_prop_types14.default.object,
    effect: import_prop_types14.default.func,
    enabled: import_prop_types14.default.bool,
    fn: import_prop_types14.default.func,
    name: import_prop_types14.default.any,
    options: import_prop_types14.default.object,
    phase: import_prop_types14.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types14.default.arrayOf(import_prop_types14.default.string),
    requiresIfExists: import_prop_types14.default.arrayOf(import_prop_types14.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types14.default.bool,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types14.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types14.default.shape({
    modifiers: import_prop_types14.default.array,
    onFirstUpdate: import_prop_types14.default.func,
    placement: import_prop_types14.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types14.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.shape({
    current: import_prop_types14.default.shape({
      destroy: import_prop_types14.default.func.isRequired,
      forceUpdate: import_prop_types14.default.func.isRequired,
      setOptions: import_prop_types14.default.func.isRequired,
      state: import_prop_types14.default.shape({
        attributes: import_prop_types14.default.object.isRequired,
        elements: import_prop_types14.default.object.isRequired,
        modifiersData: import_prop_types14.default.object.isRequired,
        options: import_prop_types14.default.object.isRequired,
        orderedModifiers: import_prop_types14.default.arrayOf(import_prop_types14.default.object).isRequired,
        placement: import_prop_types14.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]).isRequired,
        rects: import_prop_types14.default.object.isRequired,
        reset: import_prop_types14.default.bool.isRequired,
        scrollParents: import_prop_types14.default.object.isRequired,
        strategy: import_prop_types14.default.oneOf(["absolute", "fixed"]).isRequired,
        styles: import_prop_types14.default.object.isRequired
      }).isRequired,
      update: import_prop_types14.default.func.isRequired
    })
  })]),
  /**
   * Determines the tooltip position relatively to the anchor.
   */
  position: import_prop_types14.default.oneOf(["bottom", "left", "right", "top"]),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types14.default.object,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types14.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types14.default.oneOfType([import_prop_types14.default.arrayOf(import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object, import_prop_types14.default.bool])), import_prop_types14.default.func, import_prop_types14.default.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types14.default.bool,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse;
   * - 'axis': Shows values associated with the hovered x value;
   * - 'none': Does not display tooltip.
   * @default 'axis'
   */
  trigger: import_prop_types14.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarChart.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var RadarChart = React28.forwardRef(function RadarChart2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiRadarChart"
  });
  const {
    chartsWrapperProps,
    chartsSurfaceProps,
    radarDataProviderProps,
    radarGrid,
    radarSeriesAreaProps,
    radarSeriesMarksProps,
    overlayProps,
    legendProps,
    highlight,
    children
  } = useRadarChartProps(props);
  const Tooltip = props.slots?.tooltip ?? ChartsTooltip;
  const Toolbar3 = props.slots?.toolbar;
  return (0, import_jsx_runtime26.jsx)(RadarDataProvider, _extends({}, radarDataProviderProps, {
    children: (0, import_jsx_runtime26.jsxs)(ChartsWrapper, _extends({}, chartsWrapperProps, {
      children: [props.showToolbar && Toolbar3 ? (0, import_jsx_runtime26.jsx)(Toolbar3, _extends({}, props.slotProps?.toolbar)) : null, !props.hideLegend && (0, import_jsx_runtime26.jsx)(ChartsLegend, _extends({}, legendProps)), (0, import_jsx_runtime26.jsxs)(ChartsSurface, _extends({}, chartsSurfaceProps, {
        ref,
        children: [(0, import_jsx_runtime26.jsx)(RadarGrid, _extends({}, radarGrid)), (0, import_jsx_runtime26.jsx)(RadarMetricLabels, {}), (0, import_jsx_runtime26.jsx)(RadarSeriesArea, _extends({}, radarSeriesAreaProps)), highlight === "axis" && (0, import_jsx_runtime26.jsx)(RadarAxisHighlight, {}), (0, import_jsx_runtime26.jsx)(RadarSeriesMarks, _extends({}, radarSeriesMarksProps)), (0, import_jsx_runtime26.jsx)(ChartsOverlay, _extends({}, overlayProps)), children]
      })), !props.loading && (0, import_jsx_runtime26.jsx)(Tooltip, _extends({}, props.slotProps?.tooltip))]
    }))
  }));
});
if (true) RadarChart.displayName = "RadarChart";
true ? RadarChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: import_prop_types15.default.shape({
    current: import_prop_types15.default.object
  }),
  className: import_prop_types15.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.string), import_prop_types15.default.func]),
  desc: import_prop_types15.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types15.default.bool,
  /**
   * The number of divisions in the radar grid.
   * @default 5
   */
  divisions: import_prop_types15.default.number,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types15.default.number,
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend: import_prop_types15.default.bool,
  /**
   * Indicates if the chart should highlight items per axis or per series.
   * @default 'axis'
   */
  highlight: import_prop_types15.default.oneOf(["axis", "none", "series"]),
  /**
   * The highlighted item.
   * Used when the highlight is controlled.
   */
  highlightedItem: import_prop_types15.default.shape({
    dataIndex: import_prop_types15.default.number,
    seriesId: import_prop_types15.default.oneOfType([import_prop_types15.default.number, import_prop_types15.default.string]).isRequired
  }),
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types15.default.string,
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types15.default.bool,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types15.default.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: import_prop_types15.default.oneOfType([import_prop_types15.default.number, import_prop_types15.default.shape({
    bottom: import_prop_types15.default.number,
    left: import_prop_types15.default.number,
    right: import_prop_types15.default.number,
    top: import_prop_types15.default.number
  })]),
  /**
   * Callback fired when an area is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onAreaClick: import_prop_types15.default.func,
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | ChartsAxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: import_prop_types15.default.func,
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types15.default.func,
  /**
   * Callback fired when a mark is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {RadarItemIdentifier} radarItemIdentifier The radar item identifier.
   */
  onMarkClick: import_prop_types15.default.func,
  /**
   * The configuration of the radar scales.
   */
  radar: import_prop_types15.default.shape({
    labelFormatter: import_prop_types15.default.func,
    labelGap: import_prop_types15.default.number,
    max: import_prop_types15.default.number,
    metrics: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.string), import_prop_types15.default.arrayOf(import_prop_types15.default.shape({
      max: import_prop_types15.default.number,
      min: import_prop_types15.default.number,
      name: import_prop_types15.default.string.isRequired
    }))]).isRequired,
    startAngle: import_prop_types15.default.number
  }).isRequired,
  /**
   * The series to display in the bar chart.
   * An array of [[RadarSeries]] objects.
   */
  series: import_prop_types15.default.arrayOf(import_prop_types15.default.object).isRequired,
  /**
   * The grid shape.
   * @default 'sharp'
   */
  shape: import_prop_types15.default.oneOf(["circular", "sharp"]),
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar: import_prop_types15.default.bool,
  /**
   * If `true`, animations are skipped.
   * If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
   */
  skipAnimation: import_prop_types15.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types15.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types15.default.object,
  /**
   * Get stripe fill color. Set it to `null` to remove stripes
   * @param {number} index The index of the stripe band.
   * @returns {string} The color to fill the stripe.
   * @default (index) => index % 2 === 1 ? (theme.vars || theme).palette.text.secondary : 'none'
   */
  stripeColor: import_prop_types15.default.func,
  sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object]),
  theme: import_prop_types15.default.oneOf(["dark", "light"]),
  title: import_prop_types15.default.string,
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types15.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxis/RadarAxis.js
var React29 = __toESM(require_react(), 1);
var import_prop_types16 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/degToRad.js
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxis/useRadarAxis.js
function useRadarAxis(params) {
  const {
    metric,
    angle,
    divisions = 1
  } = params;
  const {
    instance,
    store
  } = useChartContext();
  const rotationScale = useRotationScale();
  const {
    radiusAxis
  } = useRadiusAxes();
  const {
    cx,
    cy
  } = useSelector(store, selectorChartPolarCenter);
  if (metric === void 0 || !rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const existingMetrics = rotationScale.domain();
  if (!existingMetrics.includes(metric)) {
    warnOnce([`MUI X Charts: You radar axis try displaying values for the metric "${metric}" which does nto exist.`, `either add this metric to your radar, or pick one from the existing metrics: ${existingMetrics.join(", ")}`]);
  }
  const anglesWithDefault = angle !== void 0 ? degToRad(angle) : rotationScale(metric) ?? 0;
  const radiusRatio = Array.from({
    length: divisions
  }, (_, index) => (index + 1) / divisions);
  const radiusScale = radiusAxis[metric].scale;
  const R = radiusScale.range()[1];
  if (isOrdinalScale(radiusScale)) {
    if (true) {
      console.error("MUI X Charts: Radar chart does not support ordinal axes");
    }
    return null;
  }
  return {
    metric,
    angle: clampAngle(rad2deg(anglesWithDefault)),
    center: {
      x: cx,
      y: cy
    },
    labels: radiusRatio.map((ratio) => {
      const radius = ratio * R;
      const [x, y] = instance.polar2svg(radius, anglesWithDefault);
      const value = radiusScale.invert(radius);
      const defaultTickLabel = value.toString();
      return {
        x,
        y,
        value,
        formattedValue: radiusAxis[metric].valueFormatter?.(radiusScale.invert(radius), {
          location: "tick",
          scale: radiusScale,
          defaultTickLabel,
          tickNumber: divisions
        }) ?? defaultTickLabel
      };
    })
  };
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxis/RadarAxis.utils.js
function getTextAnchor(angle) {
  if (angle < 20) {
    return "start";
  }
  if (angle < 90 - 10) {
    return "end";
  }
  if (angle < 270 - 10) {
    return "start";
  }
  if (angle < 360 - 20) {
    return "end";
  }
  return "start";
}
function getDominantBaseline(angle) {
  if (angle < 160) {
    return "auto";
  }
  if (angle < 360 - 20) {
    return "hanging";
  }
  return "auto";
}
var LABEL_MARGIN = 2;
function getLabelAttributes(params) {
  const {
    x,
    y,
    angle
  } = params;
  if (params.labelOrientation === "horizontal") {
    const textAnchor2 = typeof params.textAnchor === "function" ? params.textAnchor(angle) : params.textAnchor ?? getTextAnchor(angle);
    const dominantBaseline2 = typeof params.dominantBaseline === "function" ? params.dominantBaseline(angle) : params.dominantBaseline ?? getDominantBaseline(angle);
    const marginX = textAnchor2 === "start" ? LABEL_MARGIN : -LABEL_MARGIN;
    const marginY = dominantBaseline2 === "auto" ? -LABEL_MARGIN : LABEL_MARGIN;
    return {
      x: x + marginX,
      y: y + marginY,
      textAnchor: textAnchor2,
      dominantBaseline: dominantBaseline2
    };
  }
  const textAnchor = typeof params.textAnchor === "function" ? params.textAnchor(angle) : params.textAnchor ?? "start";
  const dominantBaseline = typeof params.dominantBaseline === "function" ? params.dominantBaseline(angle) : params.dominantBaseline ?? "auto";
  return {
    x,
    y,
    textAnchor,
    dominantBaseline,
    transform: `rotate(${angle}, ${x}, ${y})`
  };
}

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxis/radarAxisClasses.js
function getRadarAxisUtilityClass(slot) {
  return generateUtilityClass("MuiRadarAxis", slot);
}
var chartsAxisClasses = generateUtilityClasses("MuiRadarAxis", ["root", "line", "label"]);
var useUtilityClasses5 = (classes) => {
  const slots = {
    root: ["root"],
    line: ["line"],
    label: ["label"]
  };
  return composeClasses(slots, getRadarAxisUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/RadarChart/RadarAxis/RadarAxis.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
function RadarAxis(props) {
  const {
    labelOrientation = "horizontal",
    textAnchor,
    dominantBaseline
  } = props;
  const classes = useUtilityClasses5(props.classes);
  const theme = useTheme();
  const data = useRadarAxis(props);
  if (data === null) {
    return null;
  }
  const {
    center,
    angle,
    labels
  } = data;
  return (0, import_jsx_runtime27.jsxs)("g", {
    className: classes.root,
    children: [(0, import_jsx_runtime27.jsx)("path", {
      d: `M ${center.x} ${center.y} L ${labels[labels.length - 1].x} ${labels[labels.length - 1].y}`,
      stroke: (theme.vars ?? theme).palette.text.primary,
      strokeOpacity: 0.3,
      className: classes.line
    }), labels.map(({
      x,
      y,
      formattedValue
    }) => (0, import_jsx_runtime27.jsx)("text", _extends({
      fontSize: 12,
      fill: (theme.vars ?? theme).palette.text.primary,
      stroke: "none",
      className: classes.label
    }, getLabelAttributes({
      labelOrientation,
      x,
      y,
      angle,
      textAnchor,
      dominantBaseline
    }), {
      children: formattedValue
    }), formattedValue))]
  });
}
true ? RadarAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The absolute rotation angle of the metrics (in degree)
   * If not defined the metric angle will be used.
   */
  angle: import_prop_types16.default.number,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types16.default.object,
  /**
   * The number of divisions with label.
   * @default 1
   */
  divisions: import_prop_types16.default.number,
  /**
   * The labels dominant baseline or a function returning the dominant baseline for a given axis angle (in degree).
   */
  dominantBaseline: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["alphabetic", "auto", "central", "hanging", "ideographic", "inherit", "mathematical", "middle", "no-change", "reset-size", "text-after-edge", "text-before-edge", "use-script"]), import_prop_types16.default.func]),
  /**
   * Defines how label align with the axis.
   * - 'horizontal': labels stay horizontal and their placement change with the axis angle.
   * - 'rotated': labels are rotated 90deg relatively to their axis.
   * @default 'horizontal'
   */
  labelOrientation: import_prop_types16.default.oneOf(["horizontal", "rotated"]),
  /**
   * The metric to get.
   * If `undefined`, the hook returns `null`
   */
  metric: import_prop_types16.default.string,
  /**
   * The labels text anchor or a function returning the text anchor for a given axis angle (in degree).
   */
  textAnchor: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["end", "inherit", "middle", "start"]), import_prop_types16.default.func])
} : void 0;

// node_modules/@mui/x-charts/esm/RadarChart/index.js
var Unstable_RadarChart = RadarChart;
var Unstable_RadarDataProvider = RadarDataProvider;
export {
  RADAR_PLUGINS,
  RadarAxis,
  RadarAxisHighlight,
  RadarChart,
  RadarDataProvider,
  RadarGrid,
  RadarMetricLabels,
  RadarSeriesArea,
  RadarSeriesMarks,
  RadarSeriesPlot,
  Unstable_RadarChart,
  Unstable_RadarDataProvider,
  chartsAxisClasses,
  radarSeriesPlotClasses,
  useRadarAxis
};
//# sourceMappingURL=@mui_x-charts_RadarChart.js.map
