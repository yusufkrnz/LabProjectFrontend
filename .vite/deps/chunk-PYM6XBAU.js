import {
  useSlotProps_default
} from "./chunk-TR7ZCQBX.js";
import {
  useChartGradientIdObjectBoundBuilder,
  useLegend,
  useXAxes,
  useYAxes,
  useZAxes
} from "./chunk-JL4PRXGQ.js";
import {
  _objectWithoutPropertiesLoose,
  useTheme,
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
  resolveProps,
  styled_default,
  useRtl
} from "./chunk-3RQXYIJS.js";
import {
  require_react
} from "./chunk-GH6UE3LJ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
var React5 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelMark.js
var React2 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelMarkClasses.js
function getLabelMarkUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabelMark", slot);
}
var labelMarkClasses = generateUtilityClasses("MuiChartsLabelMark", ["root", "line", "square", "circle", "mask", "fill"]);
var useUtilityClasses = (props) => {
  const {
    type
  } = props;
  const slots = {
    root: typeof type === "function" ? ["root"] : ["root", type],
    mask: ["mask"],
    fill: ["fill"]
  };
  return composeClasses(slots, getLabelMarkUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/internals/consumeThemeProps.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var consumeThemeProps = (name, options, InComponent) => React.forwardRef(function ConsumeThemeInternal(props, ref) {
  const themedProps = useThemeProps({
    props,
    // eslint-disable-next-line material-ui/mui-name-matches-component-name
    name
  });
  const defaultProps = typeof options.defaultProps === "function" ? options.defaultProps(themedProps) : options.defaultProps ?? {};
  const outProps = resolveProps(defaultProps, themedProps);
  const theme = useTheme();
  const classes = options.classesResolver?.(outProps, theme);
  const OutComponent = React.forwardRef(InComponent);
  if (true) OutComponent.displayName = "OutComponent";
  if (true) {
    OutComponent.displayName = `consumeThemeProps(${name})`;
  }
  return (0, import_jsx_runtime.jsx)(OutComponent, _extends({}, outProps, {
    classes,
    ref
  }));
});
if (true) consumeThemeProps.displayName = "consumeThemeProps";

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelMark.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var _excluded = ["type", "color", "className", "classes"];
var Root = styled_default("div", {
  name: "MuiChartsLabelMark",
  slot: "Root"
})(() => {
  return {
    display: "flex",
    width: 14,
    height: 14,
    [`&.${labelMarkClasses.line}`]: {
      width: 16,
      height: "unset",
      alignItems: "center",
      [`.${labelMarkClasses.mask}`]: {
        height: 4,
        width: "100%",
        borderRadius: 1,
        overflow: "hidden"
      }
    },
    [`&.${labelMarkClasses.square}`]: {
      height: 13,
      width: 13,
      borderRadius: 2,
      overflow: "hidden"
    },
    [`&.${labelMarkClasses.circle}`]: {
      height: 15,
      width: 15
    },
    svg: {
      display: "block"
    },
    [`& .${labelMarkClasses.mask} > *`]: {
      height: "100%",
      width: "100%"
    },
    [`& .${labelMarkClasses.mask}`]: {
      height: "100%",
      width: "100%"
    }
  };
});
var ChartsLabelMark = consumeThemeProps("MuiChartsLabelMark", {
  defaultProps: {
    type: "square"
  },
  classesResolver: useUtilityClasses
}, function ChartsLabelMark2(props, ref) {
  const {
    type,
    color,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const Component = type;
  return (0, import_jsx_runtime2.jsx)(Root, _extends({
    className: clsx_default(classes?.root, className),
    ownerState: props,
    "aria-hidden": "true",
    ref
  }, other, {
    children: (0, import_jsx_runtime2.jsx)("div", {
      className: classes?.mask,
      children: typeof Component === "function" ? (0, import_jsx_runtime2.jsx)(Component, {
        className: classes?.fill,
        color
      }) : (0, import_jsx_runtime2.jsx)("svg", {
        viewBox: "0 0 24 24",
        preserveAspectRatio: type === "line" ? "none" : void 0,
        children: type === "circle" ? (0, import_jsx_runtime2.jsx)("circle", {
          className: classes?.fill,
          r: "12",
          cx: "12",
          cy: "12",
          fill: color
        }) : (0, import_jsx_runtime2.jsx)("rect", {
          className: classes?.fill,
          width: "24",
          height: "24",
          fill: color
        })
      })
    })
  }));
});
true ? ChartsLabelMark.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The color of the mark.
   */
  color: import_prop_types.default.string,
  /**
   * The type of the mark.
   * @default 'square'
   */
  type: import_prop_types.default.oneOf(["circle", "line", "square"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/onClickContextBuilder.js
var seriesContextBuilder = (context) => ({
  type: "series",
  color: context.color,
  label: context.label,
  seriesId: context.seriesId,
  itemId: context.itemId
});

// node_modules/@mui/x-charts/esm/ChartsLegend/chartsLegendClasses.js
function getLegendUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLegend", slot);
}
var useUtilityClasses2 = (props) => {
  const {
    classes,
    direction
  } = props;
  const slots = {
    root: ["root", direction],
    item: ["item"],
    mark: ["mark"],
    label: ["label"],
    series: ["series"]
  };
  return composeClasses(slots, getLegendUtilityClass, classes);
};
var legendClasses = generateUtilityClasses("MuiChartsLegend", ["root", "item", "series", "mark", "label", "vertical", "horizontal"]);

// node_modules/@mui/x-charts/esm/internals/consumeSlots.js
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var _excluded2 = ["slots", "slotProps"];
var _excluded22 = ["ownerState"];
var consumeSlots = (name, slotPropName, options, InComponent) => {
  function ConsumeSlotsInternal(props, ref) {
    const themedProps = useThemeProps({
      props,
      // eslint-disable-next-line material-ui/mui-name-matches-component-name
      name
    });
    const defaultProps = typeof options.defaultProps === "function" ? options.defaultProps(themedProps) : options.defaultProps ?? {};
    const defaultizedProps = resolveProps(defaultProps, themedProps);
    const _ref = defaultizedProps, {
      slots,
      slotProps
    } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded2);
    const theme = useTheme();
    const classes = options.classesResolver?.(defaultizedProps, theme);
    const Component = slots?.[slotPropName] ?? InComponent;
    const propagateSlots = options.propagateSlots && !slots?.[slotPropName];
    const _useSlotProps = useSlotProps_default({
      elementType: Component,
      externalSlotProps: slotProps?.[slotPropName],
      additionalProps: _extends({}, other, {
        classes
      }, propagateSlots && {
        slots,
        slotProps
      }),
      ownerState: {}
    }), originalOutProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded22);
    const outProps = _extends({}, originalOutProps);
    for (const prop of options.omitProps ?? []) {
      delete outProps[prop];
    }
    if (true) {
      Component.displayName = `${name}.slots.${slotPropName}`;
    }
    return (0, import_jsx_runtime3.jsx)(Component, _extends({}, outProps, {
      ref
    }));
  }
  return React3.forwardRef(ConsumeSlotsInternal);
};
if (true) consumeSlots.displayName = "consumeSlots";

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabel.js
var React4 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelClasses.js
function getLabelUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabel", slot);
}
var labelClasses = generateUtilityClasses("MuiChartsLabel", ["root"]);
var useUtilityClasses3 = (props) => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getLabelUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabel.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var _excluded3 = ["children", "className", "classes"];
var ChartsLabel = consumeThemeProps("MuiChartsLabel", {
  classesResolver: useUtilityClasses3
}, function ChartsLabel2(props, ref) {
  const {
    children,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  return (0, import_jsx_runtime4.jsx)("span", _extends({
    className: clsx_default(classes?.root, className),
    ref
  }, other, {
    children
  }));
});
true ? ChartsLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types2.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded4 = ["direction", "onItemClick", "className", "classes"];
var RootElement = styled_default("ul", {
  name: "MuiChartsLegend",
  slot: "Root"
})(({
  ownerState,
  theme
}) => _extends({}, theme.typography.caption, {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "100%",
  display: "flex",
  flexDirection: ownerState.direction === "vertical" ? "column" : "row",
  alignItems: ownerState.direction === "vertical" ? void 0 : "center",
  flexShrink: 0,
  gap: theme.spacing(2),
  listStyleType: "none",
  paddingInlineStart: 0,
  marginBlock: theme.spacing(1),
  marginInline: theme.spacing(1),
  flexWrap: "wrap",
  li: {
    display: ownerState.direction === "horizontal" ? "inline-flex" : void 0
  },
  [`button.${legendClasses.series}`]: {
    // Reset button styles
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    fontWeight: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: "inherit"
  },
  [`& .${legendClasses.series}`]: {
    display: ownerState.direction === "vertical" ? "flex" : "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1)
  },
  gridArea: "legend"
}));
var ChartsLegend = consumeSlots("MuiChartsLegend", "legend", {
  defaultProps: {
    direction: "horizontal"
  },
  // @ts-expect-error position is used only in the slots, but it is passed to the SVG wrapper.
  // We omit it here to avoid passing to slots.
  omitProps: ["position"],
  classesResolver: useUtilityClasses2
}, React5.forwardRef(function ChartsLegend2(props, ref) {
  const data = useLegend();
  const {
    onItemClick,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  if (data.items.length === 0) {
    return null;
  }
  const Element = onItemClick ? "button" : "div";
  return (0, import_jsx_runtime5.jsx)(RootElement, _extends({
    className: clsx_default(classes?.root, className),
    ref
  }, other, {
    ownerState: props,
    children: data.items.map((item, i) => {
      return (0, import_jsx_runtime5.jsx)("li", {
        className: classes?.item,
        "data-series": item.id,
        children: (0, import_jsx_runtime5.jsxs)(Element, {
          className: classes?.series,
          role: onItemClick ? "button" : void 0,
          type: onItemClick ? "button" : void 0,
          onClick: onItemClick ? (
            // @ts-ignore onClick is only attached to a button
            (event) => onItemClick(event, seriesContextBuilder(item), i)
          ) : void 0,
          children: [(0, import_jsx_runtime5.jsx)(ChartsLabelMark, {
            className: classes?.mark,
            color: item.color,
            type: item.markType
          }), (0, import_jsx_runtime5.jsx)(ChartsLabel, {
            className: classes?.label,
            children: item.label
          })]
        })
      }, item.id);
    })
  }));
}));
if (true) ChartsLegend.displayName = "ChartsLegend";
true ? ChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types3.default.object,
  className: import_prop_types3.default.string,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types3.default.oneOf(["horizontal", "vertical"]),
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
   * @param {SeriesLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types3.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types3.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types3.default.object,
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ContinuousColorLegend.js
var React7 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLegend/useAxis.js
function useAxis({
  axisDirection,
  axisId
}) {
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
  switch (axisDirection) {
    case "x": {
      const id = typeof axisId === "string" ? axisId : xAxisIds[axisId ?? 0];
      return xAxis[id];
    }
    case "y": {
      const id = typeof axisId === "string" ? axisId : yAxisIds[axisId ?? 0];
      return yAxis[id];
    }
    case "z":
    default: {
      const id = typeof axisId === "string" ? axisId : zAxisIds[axisId ?? 0];
      return zAxis[id];
    }
  }
}

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelGradient.js
var React6 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelGradientClasses.js
function getLabelGradientUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabelGradient", slot);
}
var labelGradientClasses = generateUtilityClasses("MuiChartsLabelGradient", ["root", "vertical", "horizontal", "mask", "fill"]);
var useUtilityClasses4 = (props) => {
  const {
    direction
  } = props;
  const slots = {
    root: ["root", direction],
    mask: ["mask"],
    fill: ["fill"]
  };
  return composeClasses(slots, getLabelGradientUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelGradient.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var _excluded5 = ["gradientId", "direction", "classes", "className", "rotate", "reverse", "thickness"];
var getRotation = (direction, reverse, rotate, isRtl) => {
  const angle = (direction === "vertical" ? -90 : 0) + (rotate ? 90 : 0) + (reverse ? 180 : 0);
  if (isRtl && direction !== "vertical") {
    return angle + 180;
  }
  return angle;
};
var Root2 = styled_default("div", {
  name: "MuiChartsLabelGradient",
  slot: "Root"
})(({
  ownerState
}) => {
  const rotation = getRotation(ownerState.direction, ownerState.reverse, ownerState.rotate, ownerState.isRtl);
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [`.${labelGradientClasses.mask}`]: {
      borderRadius: 2,
      overflow: "hidden"
    },
    [`&.${labelGradientClasses.horizontal}`]: {
      width: "100%",
      [`.${labelGradientClasses.mask}`]: {
        height: ownerState.thickness,
        width: "100%"
      }
    },
    [`&.${labelGradientClasses.vertical}`]: {
      height: "100%",
      [`.${labelGradientClasses.mask}`]: {
        width: ownerState.thickness,
        height: "100%",
        "> svg": {
          height: "100%"
        }
      }
    },
    svg: {
      transform: `rotate(${rotation}deg)`,
      display: "block"
    }
  };
});
var ChartsLabelGradient = consumeThemeProps("MuiChartsLabelGradient", {
  defaultProps: {
    direction: "horizontal",
    thickness: 12
  },
  classesResolver: useUtilityClasses4
}, function ChartsLabelGradient2(props, ref) {
  const {
    gradientId,
    classes,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const isRtl = useRtl();
  return (0, import_jsx_runtime6.jsx)(Root2, _extends({
    className: clsx_default(classes?.root, className),
    ownerState: _extends({}, props, {
      isRtl
    }),
    "aria-hidden": "true",
    ref
  }, other, {
    children: (0, import_jsx_runtime6.jsx)("div", {
      className: classes?.mask,
      children: (0, import_jsx_runtime6.jsx)("svg", {
        viewBox: "0 0 24 24",
        children: (0, import_jsx_runtime6.jsx)("rect", {
          className: classes?.fill,
          width: "24",
          height: "24",
          fill: `url(#${gradientId})`
        })
      })
    })
  }));
});
true ? ChartsLabelGradient.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * The direction of the gradient.
   * @default 'horizontal'
   */
  direction: import_prop_types4.default.oneOf(["vertical", "horizontal"]),
  /**
   * A unique identifier for the gradient.
   * The `gradientId` will be used as `fill="url(#gradientId)"`.
   */
  gradientId: import_prop_types4.default.string.isRequired,
  /**
   * If `true`, the gradient will be reversed.
   */
  reverse: import_prop_types4.default.bool,
  /**
   * If provided, the gradient will be rotated by 90deg.
   * Useful for linear gradients that are not in the correct orientation.
   */
  rotate: import_prop_types4.default.bool,
  /**
   * The thickness of the gradient
   * @default 12
   */
  thickness: import_prop_types4.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/continuousColorLegendClasses.js
function getLegendUtilityClass2(slot) {
  return generateUtilityClass("MuiContinuousColorLegend", slot);
}
var useUtilityClasses5 = (props) => {
  const {
    classes,
    direction,
    labelPosition
  } = props;
  const slots = {
    root: ["root", direction, labelPosition],
    minLabel: ["minLabel"],
    maxLabel: ["maxLabel"],
    gradient: ["gradient"],
    mark: ["mark"],
    label: ["label"]
  };
  return composeClasses(slots, getLegendUtilityClass2, classes);
};
var continuousColorLegendClasses = generateUtilityClasses("MuiContinuousColorLegend", ["root", "minLabel", "maxLabel", "gradient", "vertical", "horizontal", "start", "end", "extremes", "label"]);

// node_modules/@mui/x-charts/esm/ChartsLegend/ContinuousColorLegend.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var _excluded6 = ["minLabel", "maxLabel", "direction", "axisDirection", "axisId", "rotateGradient", "reverse", "classes", "className", "gradientId", "labelPosition", "thickness"];
var templateAreas = (reverse) => {
  const startLabel = reverse ? "max-label" : "min-label";
  const endLabel = reverse ? "min-label" : "max-label";
  return {
    row: {
      start: `
    '${startLabel} . ${endLabel}'
    'gradient gradient gradient'
  `,
      end: `
      'gradient gradient gradient'
      '${startLabel} . ${endLabel}'
    `,
      extremes: `
      '${startLabel} gradient ${endLabel}'
    `
    },
    column: {
      start: `
      '${endLabel} gradient'
      '. gradient'
      '${startLabel} gradient'
    `,
      end: `
      'gradient ${endLabel}'
      'gradient .'
      'gradient ${startLabel}'
    `,
      extremes: `
      '${endLabel}'
      'gradient'
      '${startLabel}'
    `
    }
  };
};
var RootElement2 = styled_default("ul", {
  name: "MuiContinuousColorLegend",
  slot: "Root"
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.caption, {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "100%",
  display: "grid",
  flexShrink: 0,
  gap: theme.spacing(0.5),
  listStyleType: "none",
  paddingInlineStart: 0,
  marginBlock: theme.spacing(1),
  marginInline: theme.spacing(1),
  gridArea: "legend",
  [`&.${continuousColorLegendClasses.horizontal}`]: {
    gridTemplateRows: "min-content min-content",
    gridTemplateColumns: "min-content auto min-content",
    [`&.${continuousColorLegendClasses.start}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.start
    },
    [`&.${continuousColorLegendClasses.end}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.end
    },
    [`&.${continuousColorLegendClasses.extremes}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.extremes,
      gridTemplateRows: "min-content",
      alignItems: "center"
    }
  },
  [`&.${continuousColorLegendClasses.vertical}`]: {
    gridTemplateRows: "min-content auto min-content",
    gridTemplateColumns: "min-content min-content",
    [`&.${continuousColorLegendClasses.start}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.start,
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "end"
      }
    },
    [`&.${continuousColorLegendClasses.end}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.end,
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "start"
      }
    },
    [`&.${continuousColorLegendClasses.extremes}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.extremes,
      gridTemplateColumns: "min-content",
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "center"
      }
    }
  },
  [`.${continuousColorLegendClasses.gradient}`]: {
    gridArea: "gradient"
  },
  [`.${continuousColorLegendClasses.maxLabel}`]: {
    gridArea: "max-label"
  },
  [`.${continuousColorLegendClasses.minLabel}`]: {
    gridArea: "min-label"
  }
}));
var getText = (label, value, formattedValue) => {
  if (typeof label === "string") {
    return label;
  }
  return label?.({
    value,
    formattedValue
  }) ?? formattedValue;
};
var isZAxis = (axis) => axis.scale === void 0;
var ContinuousColorLegend = consumeThemeProps("MuiContinuousColorLegend", {
  defaultProps: {
    direction: "horizontal",
    labelPosition: "end",
    axisDirection: "z"
  },
  classesResolver: useUtilityClasses5
}, function ContinuousColorLegend2(props, ref) {
  const {
    minLabel,
    maxLabel,
    direction,
    axisDirection,
    axisId,
    rotateGradient,
    reverse,
    classes,
    className,
    gradientId,
    thickness
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const generateGradientId = useChartGradientIdObjectBoundBuilder();
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const colorMap = axisItem?.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "continuous") {
    return null;
  }
  const minValue = colorMap.min ?? 0;
  const maxValue = colorMap.max ?? 100;
  const valueFormatter = isZAxis(axisItem) ? void 0 : axisItem.valueFormatter;
  const formattedMin = valueFormatter ? valueFormatter(minValue, {
    location: "legend"
  }) : minValue.toLocaleString();
  const formattedMax = valueFormatter ? valueFormatter(maxValue, {
    location: "legend"
  }) : maxValue.toLocaleString();
  const minText = getText(minLabel, minValue, formattedMin);
  const maxText = getText(maxLabel, maxValue, formattedMax);
  const minComponent = (0, import_jsx_runtime7.jsx)("li", {
    className: classes?.minLabel,
    children: (0, import_jsx_runtime7.jsx)(ChartsLabel, {
      className: classes?.label,
      children: minText
    })
  });
  const maxComponent = (0, import_jsx_runtime7.jsx)("li", {
    className: classes?.maxLabel,
    children: (0, import_jsx_runtime7.jsx)(ChartsLabel, {
      className: classes?.label,
      children: maxText
    })
  });
  return (0, import_jsx_runtime7.jsxs)(RootElement2, _extends({
    className: clsx_default(classes?.root, className),
    ref
  }, other, {
    ownerState: props,
    children: [reverse ? maxComponent : minComponent, (0, import_jsx_runtime7.jsx)("li", {
      className: classes?.gradient,
      children: (0, import_jsx_runtime7.jsx)(ChartsLabelGradient, {
        direction,
        rotate: rotateGradient,
        reverse,
        thickness,
        gradientId: gradientId ?? generateGradientId(axisItem.id)
      })
    }), reverse ? minComponent : maxComponent]
  }));
});
true ? ContinuousColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types5.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types5.default.object,
  className: import_prop_types5.default.string,
  /**
   * The direction of the legend layout.
   * @default 'horizontal'
   */
  direction: import_prop_types5.default.oneOf(["horizontal", "vertical"]),
  /**
   * The id for the gradient to use.
   * If not provided, it will use the generated gradient from the axis configuration.
   * The `gradientId` will be used as `fill="url(#gradientId)"`.
   * @default auto-generated id
   */
  gradientId: import_prop_types5.default.string,
  /**
   * Where to position the labels relative to the gradient.
   * @default 'end'
   */
  labelPosition: import_prop_types5.default.oneOf(["start", "end", "extremes"]),
  /**
   * The label to display at the maximum side of the gradient.
   * Can either be a string, or a function.
   * If not defined, the formatted maximal value is display.
   * @default formattedValue
   */
  maxLabel: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.string]),
  /**
   * The label to display at the minimum side of the gradient.
   * Can either be a string, or a function.
   * @default formattedValue
   */
  minLabel: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.string]),
  /**
   * If `true`, the gradient and labels will be reversed.
   * @default false
   */
  reverse: import_prop_types5.default.bool,
  /**
   * If provided, the gradient will be rotated by 90deg.
   * Useful for linear gradients that are not in the correct orientation.
   */
  rotateGradient: import_prop_types5.default.bool,
  /**
   * The thickness of the gradient
   * @default 12
   */
  thickness: import_prop_types5.default.number,
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/PiecewiseColorLegend.js
var React8 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLegend/piecewiseColorLegendClasses.js
function getLegendUtilityClass3(slot) {
  return generateUtilityClass("MuiPiecewiseColorLegendClasses", slot);
}
var useUtilityClasses6 = (props) => {
  const {
    classes,
    direction,
    labelPosition
  } = props;
  const slots = {
    root: ["root", direction, labelPosition?.replaceAll(/-(\w)/g, (match) => match[1].toUpperCase())],
    minLabel: ["minLabel"],
    maxLabel: ["maxLabel"],
    item: ["item"],
    mark: ["mark"],
    label: ["label"]
  };
  return composeClasses(slots, getLegendUtilityClass3, classes);
};
var piecewiseColorLegendClasses = generateUtilityClasses("MuiPiecewiseColorLegendClasses", ["root", "minLabel", "maxLabel", "item", "vertical", "horizontal", "start", "end", "extremes", "inlineStart", "inlineEnd", "mark", "label"]);

// node_modules/@mui/x-charts/esm/ChartsLegend/piecewiseColorDefaultLabelFormatter.js
function piecewiseColorDefaultLabelFormatter(params) {
  if (params.min === null) {
    return `<${params.formattedMax}`;
  }
  if (params.max === null) {
    return `>${params.formattedMin}`;
  }
  return `${params.formattedMin}-${params.formattedMax}`;
}

// node_modules/@mui/x-charts/esm/ChartsLegend/PiecewiseColorLegend.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var _excluded7 = ["direction", "classes", "className", "markType", "labelPosition", "axisDirection", "axisId", "labelFormatter", "onItemClick"];
var RootElement3 = styled_default("ul", {
  name: "MuiPiecewiseColorLegend",
  slot: "Root"
})(({
  theme,
  ownerState
}) => {
  const classes = piecewiseColorLegendClasses;
  return _extends({}, theme.typography.caption, {
    color: (theme.vars || theme).palette.text.primary,
    lineHeight: "100%",
    display: "flex",
    flexDirection: ownerState.direction === "vertical" ? "column" : "row",
    flexShrink: 0,
    gap: theme.spacing(0.5),
    listStyleType: "none",
    paddingInlineStart: 0,
    marginBlock: theme.spacing(1),
    marginInline: theme.spacing(1),
    width: "fit-content",
    gridArea: "legend",
    [`button.${classes.item}`]: {
      // Reset button styles
      background: "none",
      border: "none",
      padding: 0,
      cursor: ownerState.onItemClick ? "pointer" : "unset",
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      color: "inherit"
    },
    [`.${classes.item}`]: {
      display: "flex",
      gap: theme.spacing(0.5)
    },
    [`li :not(.${classes.minLabel}, .${classes.maxLabel}) .${classes?.mark}`]: {
      alignSelf: "center"
    },
    [`&.${classes.start}`]: {
      alignItems: "end"
    },
    [`&.${classes.end}`]: {
      alignItems: "start"
    },
    [`&.${classes.horizontal}`]: {
      alignItems: "center",
      [`.${classes.item}`]: {
        flexDirection: "column"
      },
      [`&.${classes.inlineStart}, &.${classes.inlineEnd}`]: {
        gap: theme.spacing(1.5),
        flexWrap: "wrap",
        [`.${classes.item}`]: {
          flexDirection: "row"
        }
      },
      [`&.${classes.start}`]: {
        alignItems: "end"
      },
      [`&.${classes.end}`]: {
        alignItems: "start"
      },
      [`.${classes.minLabel}`]: {
        alignItems: "end"
      },
      [`&.${classes.extremes}`]: {
        [`.${classes.minLabel}, .${classes.maxLabel}`]: {
          alignItems: "center",
          display: "flex",
          flexDirection: "row"
        }
      }
    },
    [`&.${classes.vertical}`]: {
      [`.${classes.item}`]: {
        flexDirection: "row",
        alignItems: "center"
      },
      [`&.${classes.start}, &.${classes.inlineStart}`]: {
        alignItems: "end"
      },
      [`&.${classes.end}, &.${classes.inlineEnd}`]: {
        alignItems: "start"
      },
      [`&.${classes.extremes}`]: {
        alignItems: "center",
        [`.${classes.minLabel}, .${classes.maxLabel}`]: {
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }
      }
    }
  });
});
var PiecewiseColorLegend = consumeThemeProps("MuiPiecewiseColorLegend", {
  defaultProps: {
    direction: "horizontal",
    labelPosition: "extremes",
    labelFormatter: piecewiseColorDefaultLabelFormatter
  },
  classesResolver: useUtilityClasses6
}, function PiecewiseColorLegend2(props, ref) {
  const {
    direction,
    classes,
    className,
    markType,
    labelPosition,
    axisDirection,
    axisId,
    labelFormatter,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const isVertical = direction === "vertical";
  const isReverse = isVertical;
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const colorMap = axisItem?.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "piecewise") {
    return null;
  }
  const valueFormatter = (v) => axisItem.valueFormatter?.(v, {
    location: "legend"
  }) ?? v.toLocaleString();
  const formattedLabels = colorMap.thresholds.map(valueFormatter);
  const startClass = isReverse ? classes?.maxLabel : classes?.minLabel;
  const endClass = isReverse ? classes?.minLabel : classes?.maxLabel;
  const colors = colorMap.colors.map((color, colorIndex) => ({
    color,
    colorIndex
  }));
  const orderedColors = isReverse ? colors.reverse() : colors;
  const isStart = labelPosition === "start";
  const isEnd = labelPosition === "end";
  const isExtremes = labelPosition === "extremes";
  const isInlineStart = labelPosition === "inline-start";
  const isInlineEnd = labelPosition === "inline-end";
  return (0, import_jsx_runtime8.jsx)(RootElement3, _extends({
    className: clsx_default(classes?.root, className),
    ref
  }, other, {
    ownerState: props,
    children: orderedColors.map(({
      color,
      colorIndex
    }, index) => {
      const isFirst = index === 0;
      const isLast = index === colorMap.colors.length - 1;
      const isFirstColor = colorIndex === 0;
      const isLastColor = colorIndex === colorMap.colors.length - 1;
      const data = _extends({
        index: colorIndex,
        length: formattedLabels.length
      }, isFirstColor ? {
        min: null,
        formattedMin: null
      } : {
        min: colorMap.thresholds[colorIndex - 1],
        formattedMin: formattedLabels[colorIndex - 1]
      }, isLastColor ? {
        max: null,
        formattedMax: null
      } : {
        max: colorMap.thresholds[colorIndex],
        formattedMax: formattedLabels[colorIndex]
      });
      const label = labelFormatter?.(data);
      if (label === null || label === void 0) {
        return null;
      }
      const isTextBefore = isStart || isExtremes && isFirst || isInlineStart;
      const isTextAfter = isEnd || isExtremes && isLast || isInlineEnd;
      const clickObject = {
        type: "piecewiseColor",
        color,
        label,
        minValue: data.min,
        maxValue: data.max
      };
      const Element = onItemClick ? "button" : "div";
      return (0, import_jsx_runtime8.jsx)("li", {
        children: (0, import_jsx_runtime8.jsxs)(Element, {
          role: onItemClick ? "button" : void 0,
          type: onItemClick ? "button" : void 0,
          onClick: (
            // @ts-ignore onClick is only attached to a button
            onItemClick ? (event) => onItemClick(event, clickObject, index) : void 0
          ),
          className: clsx_default(classes?.item, index === 0 && `${startClass}`, index === orderedColors.length - 1 && `${endClass}`),
          children: [isTextBefore && (0, import_jsx_runtime8.jsx)(ChartsLabel, {
            className: classes?.label,
            children: label
          }), (0, import_jsx_runtime8.jsx)(ChartsLabelMark, {
            className: classes?.mark,
            type: markType,
            color
          }), isTextAfter && (0, import_jsx_runtime8.jsx)(ChartsLabel, {
            className: classes?.label,
            children: label
          })]
        })
      }, colorIndex);
    })
  }));
});
true ? PiecewiseColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types6.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  className: import_prop_types6.default.string,
  /**
   * The direction of the legend layout.
   * @default 'horizontal'
   */
  direction: import_prop_types6.default.oneOf(["horizontal", "vertical"]),
  /**
   * Format the legend labels.
   * @param {PiecewiseLabelFormatterParams} params The bound of the piece to format.
   * @returns {string|null} The displayed label, `''` to skip the label but show the color mark, or `null` to skip it entirely.
   */
  labelFormatter: import_prop_types6.default.func,
  /**
   * Where to position the labels relative to the gradient.
   * @default 'extremes'
   */
  labelPosition: import_prop_types6.default.oneOf(["start", "end", "extremes", "inline-start", "inline-end"]),
  /**
   * The type of the mark.
   * @default 'square'
   */
  markType: import_prop_types6.default.oneOf(["square", "circle", "line"]),
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
   * @param {PiecewiseColorLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types6.default.func,
  sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object])
} : void 0;

export {
  ChartsLabelMark,
  legendClasses,
  ChartsLegend,
  continuousColorLegendClasses,
  ContinuousColorLegend,
  piecewiseColorLegendClasses,
  piecewiseColorDefaultLabelFormatter,
  PiecewiseColorLegend
};
//# sourceMappingURL=chunk-PYM6XBAU.js.map
