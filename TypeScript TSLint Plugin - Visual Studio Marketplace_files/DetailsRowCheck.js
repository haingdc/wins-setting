define("OfficeFabric/components/DetailsList/DetailsRowCheck",["require","exports","tslib","react","../../Utilities","../../Check","./DetailsRowCheck.scss","../Check/Check.scss"],function(n,t,i,r,u,f,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o;t.DetailsRowCheck=function(n){var o=n.canSelect,w=o===void 0?!1:o,h=n.isSelected,b=h===void 0?!1:h,c=n.anySelected,k=c===void 0?!1:c,l=n.selected,d=l===void 0?!1:l,a=n.isHeader,g=a===void 0?!1:a,y=n.className,p=i.__rest(n,["canSelect","isSelected","anySelected","selected","isHeader","className"]),v=n.isSelected||n.selected,t;return r.createElement("div",i.__assign({},p,{role:"checkbox",className:u.css(y,"ms-DetailsRow-check",e.check,s.checkHost,(t={},t["ms-DetailsRow-check--isDisabled "+e.isDisabled]=!n.canSelect,t["ms-DetailsRow-check--isHeader "+e.isHeader]=n.isHeader,t)),"aria-checked":v,"data-selection-toggle":!0,"data-automationid":"DetailsRowCheck"}),r.createElement(f.Check,{checked:v}))}});

