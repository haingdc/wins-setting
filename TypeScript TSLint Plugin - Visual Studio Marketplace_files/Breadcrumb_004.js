define("OfficeFabric/components/Breadcrumb/Breadcrumb.styles",["require","exports","../../Styling"],function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var f={whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"},r=i.getScreenSelector(0,i.ScreenWidthMaxSmall),u=i.getScreenSelector(i.ScreenWidthMinMedium,i.ScreenWidthMaxMedium);t.getStyles=function(n){var a=n.className,t=n.theme,c=160,l=8,e,o,s,h;return{root:["ms-Breadcrumb",{margin:"23px 0 1px"},a],list:["ms-Breadcrumb-list",{whiteSpace:"nowrap",padding:0,margin:0,display:"flex",alignItems:"stretch"}],listItem:["ms-Breadcrumb-listItem",{listStyleType:"none",margin:"0",padding:"0",display:"flex",position:"relative",alignItems:"center"}],chevron:["ms-Breadcrumb-chevron",{color:t.palette.neutralSecondary,fontSize:t.fonts.small.fontSize,selectors:(e={},e[i.HighContrastSelector]={color:"WindowText",MsHighContrastAdjust:"none"},e[u]={fontSize:l},e[r]={fontSize:l},e)}],overflow:["ms-Breadcrumb-overflow",{position:"relative",display:"flex",alignItems:"center"}],overflowButton:["ms-Breadcrumb-overflowButton",i.getFocusStyle(t),f,{fontSize:16,height:"100%",cursor:"pointer",selectors:(o={":hover":{backgroundColor:t.palette.neutralLighter},":active":{backgroundColor:t.palette.neutralTertiaryAlt,color:t.semanticColors.bodyText},":hover:active":{backgroundColor:t.palette.neutralQuaternary}},o[r]={padding:"4px 6px"},o[u]={fontSize:t.fonts.mediumPlus.fontSize},o)}],itemLink:["ms-Breadcrumb-itemLink",i.getFocusStyle(t),f,t.fonts.xLarge,{textDecoration:"none",color:t.semanticColors.bodyText,padding:"0 8px",maxWidth:c,selectors:(s={":hover":{backgroundColor:t.semanticColors.menuItemBackgroundHovered,color:"initial",cursor:"pointer",selectors:(h={},h[i.HighContrastSelector]={color:"Highlight"},h)},":focus":{color:t.palette.neutralDark},":active":{backgroundColor:t.palette.neutralTertiaryAlt,color:t.palette.neutralPrimary}},s[u]=t.fonts.large,s[r]=[t.fonts.medium,{maxWidth:116}],s)}],item:["ms-Breadcrumb-item",t.fonts.xLarge,{color:t.semanticColors.bodyText,padding:"0 8px",maxWidth:c,selectors:{":hover":{cursor:"default"}}}]}}});
