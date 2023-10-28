declare module '*.view.html' {
  import { IncompleteComponentInfo, View, StylesheetInfo } from '@uixjs/core';

  type IncompleteComponentInfoWithoutView = Omit<IncompleteComponentInfo, 'view'>;

  const defineComponent: (info: IncompleteComponentInfoWithoutView) => ComponentInfo;
  const stylesheets: StylesheetInfo[];
  const view: View<any>;

  export default defineComponent;
  export {
    defineComponent,
    view,
    stylesheets,
    ComponentInfo,
    View,
    StylesheetInfo,
    IncompleteComponentInfo,
    IncompleteComponentInfoWithoutView
  };
}
