import Node from "@metacell/geppetto-meta-ui/flex-layout/src/model/Node";

/*
 * status can be one of:
 *  - ACTIVE: the user can see the tab content.
 *  - MINIMIZED: the tab is minimized.
 *  - HIDDEN:  other tab in the node is currently selected
 *  - MAXIMIZED:  the tab is maximized (only one tab can be maximized simultaneously)
 */
export enum WidgetStatus {
  HIDDEN = "HIDDEN",
  ACTIVE = "ACTIVE",
  MAXIMIZED = "MAXIMIZED",
  MINIMIZED = "MINIMIZED",
}

export enum TabsetPosition {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM"
}

/**
 * Extended Node interface
 */
export interface ExtendedNode extends Node {
  config: Widget;
}

/**
 * Widget interface
 */
export interface Widget {
  id: string;
  status: WidgetStatus;
  panelName: string;
  defaultPanel?: any;
  defaultPosition?: any;
  defaultWeight?: any;
  hideOnClose?: boolean;
  name: string;
  enableClose?: boolean;
  component: string;
  enableDrag?: boolean;
  enableRename?: boolean;
  pos?: number;
  session: any;
  config: any;
  props: any;
}

/**
 * Widget Component interface.
 */
export interface WidgetComponent extends React.ReactElement {
  exportSession: () => any;
  importSession: (any) => void;
}

export interface WidgetMap {
  [id: string]: Widget
}

export interface ComponentMap { [name: string]: React.ReactElement<any, any> }