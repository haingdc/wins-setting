define("OfficeFabric/components/Breadcrumb/Breadcrumb.base",["require","exports","tslib","react","../../Utilities","../../FocusZone","../../Link","../../Icon","../../Button","../../Utilities","../../ResizeGroup","../../Tooltip"],function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=u.classNamesFunction(),v="overflow",y=function(){return null},p=function(n){function t(t){var h=n.call(this,t)||this;return h._focusZone=u.createRef(),h._onReduceData=function(n){var t=n.renderedItems,r=n.renderedOverflowItems,u=n.props.overflowIndex,f=t[u];return t=t.slice(),t.splice(u,1),r=r.concat([f]),f!==undefined?i.__assign({},n,{renderedItems:t,renderedOverflowItems:r}):void 0},h._onRenderBreadcrumb=function(n){var t=n.props,d=t.ariaLabel,c=t.dividerAs,l=c===void 0?o.Icon:c,a=t.onRenderItem,g=a===void 0?h._onRenderItem:a,nt=t.overflowAriaLabel,e=t.overflowIndex,i=n.renderedOverflowItems,p=n.renderedItems,tt=i.map(function(n){return{name:n.text,key:n.key,onClick:n.onClick?h._onBreadcrumbClicked.bind(h,n):null,href:n.href}}),w=p.length-1,b=i&&i.length!==0,k=p.map(function(n,t){return r.createElement("li",{className:h._classNames.listItem,key:n.key||String(t)},g(n,h._onRenderItem),(t!==w||b&&t===e-1)&&r.createElement(l,{className:h._classNames.chevron,iconName:u.getRTL()?"ChevronLeft":"ChevronRight",item:n}))});return b&&k.splice(e,0,r.createElement("li",{className:h._classNames.overflow,key:v},r.createElement(s.IconButton,{className:h._classNames.overflowButton,iconProps:{iconName:"More"},role:"button","aria-haspopup":"true",ariaLabel:nt,onRenderMenuIcon:y,menuProps:{items:tt,directionalHint:4}}),e!==w+1&&r.createElement(l,{className:h._classNames.chevron,iconName:u.getRTL()?"ChevronLeft":"ChevronRight",item:i[i.length-1]}))),r.createElement("div",{className:h._classNames.root,role:"navigation","aria-label":d},r.createElement(f.FocusZone,{componentRef:h._focusZone,direction:f.FocusZoneDirection.horizontal},r.createElement("ol",{className:h._classNames.list},k)))},h._onRenderItem=function(n){return n.onClick||n.href?r.createElement(e.Link,{className:h._classNames.itemLink,href:n.href,"aria-current":n.isCurrentItem?"page":undefined,onClick:h._onBreadcrumbClicked.bind(h,n)},r.createElement(l.TooltipHost,{content:n.text,overflowMode:l.TooltipOverflowMode.Parent},n.text)):r.createElement("span",{className:h._classNames.item},r.createElement(l.TooltipHost,{content:n.text,overflowMode:l.TooltipOverflowMode.Parent},n.text))},h._onBreadcrumbClicked=function(n,t){if(n.onClick)n.onClick(t,n)},h._validateProps(t),h}return i.__extends(t,n),t.prototype.focus=function(){this._focusZone.current&&this._focusZone.current.focus()},t.prototype.render=function(){var n=this.props,i=n.onReduceData,u=i===void 0?this._onReduceData:i,f=n.overflowIndex,e=n.maxDisplayedItems,o=n.items,s=n.className,h=n.theme,l=n.getStyles,t=o.slice(),v=t.splice(f,t.length-e),y={props:this.props,renderedItems:t,renderedOverflowItems:v};return this._classNames=a(l,{className:s,theme:h}),r.createElement(c.ResizeGroup,{onRenderData:this._onRenderBreadcrumb,onReduceData:u,data:y})},t.prototype.componentWillReceiveProps=function(n){this._validateProps(n)},t.prototype._validateProps=function(n){var i=n.maxDisplayedItems,t=n.overflowIndex,r=n.items;if(t<0||i>1&&t>i-1||r.length>0&&t>r.length-1)throw new Error("Breadcrumb: overflowIndex out of range");},t.defaultProps={items:[],maxDisplayedItems:999,overflowIndex:0},i.__decorate([h.customizable("Breadcrumb",["theme"])],t)}(u.BaseComponent);t.BreadcrumbBase=p});

