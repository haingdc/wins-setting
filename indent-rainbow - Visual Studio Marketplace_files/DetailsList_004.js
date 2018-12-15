define("OfficeFabric/components/DetailsList/DetailsList",["require","exports","tslib","react","./DetailsList.scss","../../Utilities","../DetailsList/DetailsList.types","../DetailsList/DetailsHeader","../DetailsList/DetailsRow","../../FocusZone","../../utilities/selection/index","../../utilities/dragdrop/DragDropHelper","../../GroupedList","../../List","../../utilities/decorators/withViewport","../../utilities/groupedList/GroupedListUtility"],function(n,t,i,r,u,f,e,o,s,h,c,l,a,v,y,p){"use strict";function g(n,t,i,r,u,f,o){var h=[],c,s;if(n&&n.length){c=n[0];for(s in c)c.hasOwnProperty(s)&&h.push({key:s,name:s,fieldName:s,minWidth:w,maxWidth:300,isCollapsable:!!h.length,isMultiline:o===undefined?!1:o,isSorted:r===s,isSortedDescending:!!u,isRowHeader:!1,columnActionsMode:e.ColumnActionsMode.clickable,isResizable:t,onColumnClick:i,isGrouped:f===s})}return h}function ot(n){return n.which===f.getRTLSafeKeyCode(39)}function k(n,t){return n.calculatedWidth+(t?0:d)+(n.isPadded?it:0)}Object.defineProperty(t,"__esModule",{value:!0});var b=u,w=100,nt=40,tt=36,d=16,it=24,rt=2,ut=2,ft=new Array(10),et=function(n){function t(t){var u=n.call(this,t)||this;return u._root=f.createRef(),u._header=f.createRef(),u._groupedList=f.createRef(),u._list=f.createRef(),u._focusZone=f.createRef(),u._selectionZone=f.createRef(),u._onRenderRow=function(n){return r.createElement(s.DetailsRow,i.__assign({},n))},u._onRenderDetailsHeader=function(n){return r.createElement(o.DetailsHeader,i.__assign({},n))},u._onRenderListCell=function(n){return function(t,i){return u._onRenderCell(n,t,i)}},u._activeRows={},u._columnOverrides={},u._onColumnIsSizingChanged=u._onColumnIsSizingChanged.bind(u),u._onColumnResized=u._onColumnResized.bind(u),u._onColumnAutoResized=u._onColumnAutoResized.bind(u),u._onRowDidMount=u._onRowDidMount.bind(u),u._onRowWillUnmount=u._onRowWillUnmount.bind(u),u._onToggleCollapse=u._onToggleCollapse.bind(u),u._onActiveRowChanged=u._onActiveRowChanged.bind(u),u._onBlur=u._onBlur.bind(u),u._onHeaderKeyDown=u._onHeaderKeyDown.bind(u),u._onContentKeyDown=u._onContentKeyDown.bind(u),u._onRenderCell=u._onRenderCell.bind(u),u._onGroupExpandStateChanged=u._onGroupExpandStateChanged.bind(u),u.state={focusedItemIndex:-1,lastWidth:0,adjustedColumns:u._getAdjustedColumns(t),isSizing:!1,isDropping:!1,isCollapsed:t.groupProps&&t.groupProps.isAllGroupsCollapsed,isSomeGroupExpanded:t.groupProps&&!t.groupProps.isAllGroupsCollapsed},u._selection=t.selection||new c.Selection({onSelectionChanged:undefined,getKey:t.getKey}),u._selection.setItems(t.items,!1),u._dragDropHelper=t.dragDropEvents?new l.DragDropHelper({selection:u._selection,minimumPixelsForDrag:t.minimumPixelsForDrag}):null,u._initialFocusedIndex=t.initialFocusedIndex,u}return i.__extends(t,n),t.prototype.scrollToIndex=function(n,t,i){this._list.current&&this._list.current.scrollToIndex(n,t,i);this._groupedList.current&&this._groupedList.current.scrollToIndex(n,t,i)},t.prototype.focusIndex=function(n,t,i,r){var u,e,f;t===void 0&&(t=!1);u=this.props.items[n];u&&(this.scrollToIndex(n,i,r),e=this._getItemKey(u,n),f=this._activeRows[e],f&&this._setFocusToRow(f,t))},t.prototype.componentWillUnmount=function(){this._dragDropHelper&&this._dragDropHelper.dispose()},t.prototype.componentDidUpdate=function(n){var i,r,t;if(this._initialFocusedIndex!==undefined&&(i=this.props.items[this._initialFocusedIndex],i&&(r=this._getItemKey(i,this._initialFocusedIndex),t=this._activeRows[r],t&&this._setFocusToRowIfPending(t))),this.props.items!==n.items&&this.props.items.length>0&&this.state.focusedItemIndex!==-1&&!f.elementContains(this._root.current,document.activeElement,!1)){var u=this.state.focusedItemIndex<this.props.items.length?this.state.focusedItemIndex:this.props.items.length-1,i=this.props.items[u],r=this._getItemKey(i,this.state.focusedItemIndex),t=this._activeRows[r];t?this._setFocusToRow(t):this._initialFocusedIndex=u}if(this.props.onDidUpdate)this.props.onDidUpdate(this)},t.prototype.componentWillReceiveProps=function(n){var t=this.props,u=t.checkboxVisibility,f=t.items,e=t.setKey,o=t.selectionMode,s=t.columns,h=t.viewport,r=n.setKey!==e||n.setKey===undefined,i=!1;n.layoutMode!==this.props.layoutMode&&(i=!0);r&&(this._initialFocusedIndex=n.initialFocusedIndex,this.setState({focusedItemIndex:this._initialFocusedIndex!==undefined?this._initialFocusedIndex:-1}));n.items!==f&&this._selection.setItems(n.items,r);(n.checkboxVisibility!==u||n.columns!==s||n.viewport.width!==h.width)&&(i=!0);this._adjustColumns(n,!0);n.selectionMode!==o&&(i=!0);i&&(this._pendingForceUpdate=!0)},t.prototype.componentWillUpdate=function(){this._pendingForceUpdate&&this._forceListUpdates()},t.prototype.render=function(){var n=this.props,yt=n.ariaLabelForListHeader,pt=n.ariaLabelForSelectAllCheckbox,wt=n.ariaLabelForSelectionColumn,bt=n.className,kt=n.checkboxVisibility,dt=n.compact,gt=n.constrainMode,ni=n.dragDropEvents,y=n.groups,t=n.groupProps,u=n.items,nt=n.isHeaderVisible,tt=n.layoutMode,ti=n.onItemInvoked,ii=n.onItemContextMenu,ri=n.onColumnHeaderClick,ui=n.onColumnHeaderContextMenu,s=n.selectionMode,fi=n.selectionPreservedOnEmptyClick,ei=n.selectionZoneProps,oi=n.ariaLabel,si=n.ariaLabelForGrid,hi=n.rowElementEventMap,it=n.shouldApplyApplicationRole,ci=it===void 0?!1:it,li=n.getKey,ai=n.listProps,et=n.usePageCache,st=n.onShouldVirtualize,vi=n.enableShimmer,yi=n.getGroupHeight,w=this.state,d=w.adjustedColumns,pi=w.isCollapsed,ht=w.isSizing,wi=w.isSomeGroupExpanded,ct=this,g=ct._selection,bi=ct._dragDropHelper,ki=this._getGroupNestingDepth(),lt=i.__assign({renderedWindowsAhead:ht?0:rt,renderedWindowsBehind:ht?0:ut,getKey:li},ai),l=o.SelectAllVisibility.none,k,at;s===c.SelectionMode.single&&(l=o.SelectAllVisibility.hidden);s===c.SelectionMode.multiple&&(k=t&&t.headerProps&&t.headerProps.isCollapsedGroupSelectVisible,k===undefined&&(k=!0),at=k||!y||wi,l=at?o.SelectAllVisibility.visible:o.SelectAllVisibility.hidden);kt===e.CheckboxVisibility.hidden&&(l=o.SelectAllVisibility.none);var vt=this.props.onRenderDetailsHeader,di=vt===void 0?this._onRenderDetailsHeader:vt,gi=(nt?1:0)+p.GetGroupCount(y)+(u?u.length:0);return r.createElement("div",i.__assign({ref:this._root,className:f.css("ms-DetailsList",b.root,bt,tt===e.DetailsListLayoutMode.fixedColumns&&"is-fixed",gt===e.ConstrainMode.horizontalConstrained&&"is-horizontalConstrained "+b.rootIsHorizontalConstrained,!!dt&&"ms-DetailsList--Compact "+b.rootCompact),"data-automationid":"DetailsList","data-is-scrollable":"false","aria-label":oi},ci?{role:"application"}:{}),r.createElement("div",{role:"grid","aria-label":si,"aria-rowcount":gi,"aria-colcount":(l!==o.SelectAllVisibility.none?1:0)+(d?d.length:0),"aria-readonly":"true"},r.createElement("div",{onKeyDown:this._onHeaderKeyDown,role:"presentation"},nt&&di({componentRef:this._header,selectionMode:s,layoutMode:tt,selection:g,columns:d,onColumnClick:ri,onColumnContextMenu:ui,onColumnResized:this._onColumnResized,onColumnIsSizingChanged:this._onColumnIsSizingChanged,onColumnAutoResized:this._onColumnAutoResized,groupNestingDepth:ki,isAllCollapsed:pi,onToggleCollapseAll:this._onToggleCollapse,ariaLabel:yt,ariaLabelForSelectAllCheckbox:pt,ariaLabelForSelectionColumn:wt,selectAllVisibility:l,collapseAllVisibility:t&&t.collapseAllVisibility},this._onRenderDetailsHeader)),r.createElement("div",{onKeyDown:this._onContentKeyDown,role:"presentation"},r.createElement(h.FocusZone,{componentRef:this._focusZone,className:b.focusZone,direction:h.FocusZoneDirection.vertical,isInnerZoneKeystroke:ot,onActiveElementChanged:this._onActiveRowChanged,onBlur:this._onBlur},r.createElement(c.SelectionZone,i.__assign({ref:this._selectionZone,selection:g,selectionPreservedOnEmptyClick:fi,selectionMode:s,onItemInvoked:ti,onItemContextMenu:ii,enterModalOnTouch:this.props.enterModalSelectionOnTouch},ei||{}),y?r.createElement(a.GroupedList,{ref:this._groupedList,groups:y,groupProps:t,items:u,onRenderCell:this._onRenderCell,selection:g,selectionMode:s,dragDropEvents:ni,dragDropHelper:bi,eventsToRegister:hi,listProps:lt,onGroupExpandStateChanged:this._onGroupExpandStateChanged,usePageCache:et,onShouldVirtualize:st,getGroupHeight:yi}):r.createElement(v.List,i.__assign({ref:this._list,role:"presentation",items:vi&&!u.length?ft:u,onRenderCell:this._onRenderListCell(0),usePageCache:et,onShouldVirtualize:st},lt)))))))},t.prototype.forceUpdate=function(){n.prototype.forceUpdate.call(this);this._forceListUpdates()},t.prototype._onRenderCell=function(n,t,i){var r=this.props,s=r.compact,h=r.dragDropEvents,c=r.rowElementEventMap,u=r.onRenderMissingItem,l=r.onRenderItemColumn,f=r.onRenderRow,a=f===void 0?this._onRenderRow:f,v=r.selectionMode,y=r.viewport,p=r.checkboxVisibility,w=r.getRowAriaLabel,b=r.getRowAriaDescribedBy,k=r.checkButtonAriaLabel,d=r.checkboxCellClassName,e=r.groupProps,g=e&&e.collapseAllVisibility,nt=this._selection,tt=this._dragDropHelper,it=this.state.adjustedColumns,o={item:t,itemIndex:i,compact:s,columns:it,groupNestingDepth:n,selectionMode:v,selection:nt,onDidMount:this._onRowDidMount,onWillUnmount:this._onRowWillUnmount,onRenderItemColumn:l,eventsToRegister:c,dragDropEvents:h,dragDropHelper:tt,viewport:y,checkboxVisibility:p,collapseAllVisibility:g,getRowAriaLabel:w,getRowAriaDescribedBy:b,checkButtonAriaLabel:k,checkboxCellClassName:d};return t?a(o,this._onRenderRow):u?u(i,o):null},t.prototype._onGroupExpandStateChanged=function(n){this.setState({isSomeGroupExpanded:n})},t.prototype._onColumnIsSizingChanged=function(n,t){this.setState({isSizing:t})},t.prototype._onHeaderKeyDown=function(n){n.which===40&&this._focusZone.current&&this._focusZone.current.focus()&&(n.preventDefault(),n.stopPropagation())},t.prototype._onContentKeyDown=function(n){n.which!==38||n.altKey||this._header.current&&this._header.current.focus()&&(n.preventDefault(),n.stopPropagation())},t.prototype._getGroupNestingDepth=function(){for(var i=this.props.groups,t=0,n=i;n&&n.length>0;)t++,n=n[0].children;return t},t.prototype._onRowDidMount=function(n){var i=n.props,r=i.item,u=i.itemIndex,f=this._getItemKey(r,u),t;this._activeRows[f]=n;this._setFocusToRowIfPending(n);t=this.props.onRowDidMount;t&&t(r,u)},t.prototype._setFocusToRowIfPending=function(n){var t=n.props.itemIndex;this._initialFocusedIndex!==undefined&&t===this._initialFocusedIndex&&(this._setFocusToRow(n),delete this._initialFocusedIndex)},t.prototype._setFocusToRow=function(n,t){t===void 0&&(t=!1);this._selectionZone.current&&this._selectionZone.current.ignoreNextFocus();this._async.setTimeout(function(){n.focus(t)},0)},t.prototype._onRowWillUnmount=function(n){var t=this.props.onRowWillUnmount,i=n.props,r=i.item,u=i.itemIndex,f=this._getItemKey(r,u);delete this._activeRows[f];t&&t(r,u)},t.prototype._onToggleCollapse=function(n){this.setState({isCollapsed:n});this._groupedList.current&&this._groupedList.current.toggleCollapseAll(n)},t.prototype._forceListUpdates=function(){this._pendingForceUpdate=!1;this._groupedList.current&&this._groupedList.current.forceUpdate();this._list.current&&this._list.current.forceUpdate()},t.prototype._adjustColumns=function(n,t,i){var r=this._getAdjustedColumns(n,t,i),u=this.props.viewport.width;r&&this.setState({adjustedColumns:r,lastWidth:u})},t.prototype._getAdjustedColumns=function(n,t,i){var o=this,h=n.items,c=n.layoutMode,l=n.selectionMode,r=n.columns,u=n.viewport.width,s=this.props?this.props.columns:[],a=this.state?this.state.lastWidth:-1,v=this.state?this.state.lastSelectionMode:undefined,f;if(u!==undefined){if(!t&&a===u&&v===l&&(!s||r===s))return undefined}else u=this.props.viewport.width;return r=r||g(h,!0),c===e.DetailsListLayoutMode.fixedColumns?(f=this._getFixedColumns(r),f.forEach(function(n){o._rememberCalculatedWidth(n,n.calculatedWidth)})):(f=i!==undefined?this._getJustifiedColumnsAfterResize(r,u,n,i):this._getJustifiedColumns(r,u,n,0),f.forEach(function(n){o._getColumnOverride(n.key).currentWidth=n.calculatedWidth})),f},t.prototype._getFixedColumns=function(n){var t=this;return n.map(function(n){var i=f.assign({},n,t._columnOverrides[n.key]);return i.calculatedWidth||(i.calculatedWidth=i.maxWidth||i.minWidth||w),i})},t.prototype._getJustifiedColumnsAfterResize=function(n,t,i,r){var f=this,u=n.slice(0,r);u.forEach(function(n){return n.calculatedWidth=f._getColumnOverride(n.key).currentWidth});var e=u.reduce(function(n,t,i){return n+k(t,i===0)},0),o=n.slice(r),s=t-e;return u.concat(this._getJustifiedColumns(o,s,i,r))},t.prototype._getJustifiedColumns=function(n,t,i,r){for(var ut=this,ft=i.selectionMode,et=i.checkboxVisibility,ot=i.groups,st=d,ht=ft!==c.SelectionMode.none&&et!==e.CheckboxVisibility.hidden?nt:0,ct=ot?tt:0,o=0,h=t-(st+ht+ct),s=n.map(function(n,t){var i=f.assign({},n,{calculatedWidth:n.minWidth||w},ut._columnOverrides[n.key]),u=t+r===0;return o+=k(i,u),i}),v=s.length-1,l,p,a,b,y;v>0&&o>h;){var u=s[v],y=u.minWidth||w,g=o-h;u.calculatedWidth-y>=g||!u.isCollapsable?(u.calculatedWidth=Math.max(u.calculatedWidth-g,y),o=h):(o-=k(u,!1),s.splice(v,1));v--}for(l=0;l<s.length&&o<h;l++){var u=s[l],it=l===s.length-1,rt=this._columnOverrides[u.key];rt&&rt.calculatedWidth&&!it||(p=h-o,a=void 0,it?a=p:(b=u.maxWidth,y=u.minWidth||b||w,a=b?Math.min(p,b-y):p),u.calculatedWidth=u.calculatedWidth+a,o+=a)}return s},t.prototype._onColumnResized=function(n,t,i){var r=Math.max(n.minWidth||w,t);if(this.props.onColumnResize)this.props.onColumnResize(n,r,i);this._rememberCalculatedWidth(n,r);this._adjustColumns(this.props,!0,i);this._forceListUpdates()},t.prototype._rememberCalculatedWidth=function(n,t){var i=this._getColumnOverride(n.key);i.calculatedWidth=t;i.currentWidth=t},t.prototype._getColumnOverride=function(n){return this._columnOverrides[n]=this._columnOverrides[n]||{}},t.prototype._onColumnAutoResized=function(n,t){var e=this,i=0,u=0,o=Object.keys(this._activeRows).length,r,f;for(r in this._activeRows)this._activeRows.hasOwnProperty(r)&&(f=this._activeRows[r],f.measureCell(t,function(r){i=Math.max(i,r);u++;u===o&&e._onColumnResized(n,i,t)}))},t.prototype._onActiveRowChanged=function(n,t){var r=this.props,f=r.items,u=r.onActiveItemChanged,i;n&&n.getAttribute("data-item-index")&&(i=Number(n.getAttribute("data-item-index")),i>=0&&(u&&u(f[i],i,t),this.setState({focusedItemIndex:i})))},t.prototype._onBlur=function(){this.setState({focusedItemIndex:-1})},t.prototype._getItemKey=function(n,t){var r=this.props.getKey,i=undefined;return n&&(i=n.key),r&&(i=r(n,t)),i||(i=t),i},t.defaultProps={layoutMode:e.DetailsListLayoutMode.justified,selectionMode:c.SelectionMode.multiple,constrainMode:e.ConstrainMode.horizontalConstrained,checkboxVisibility:e.CheckboxVisibility.onHover,isHeaderVisible:!0,enableShimmer:!1},i.__decorate([y.withViewport],t)}(f.BaseComponent);t.DetailsList=et;t.buildColumns=g});

