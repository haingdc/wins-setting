define("OfficeFabric/components/Slider/Slider.scss",["require","exports","@microsoft/load-themed-styles"],function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});i.loadStyles([{rawString:".root_239679ee{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.titleLabel_239679ee{padding:0}.line_239679ee{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.line_239679ee .lineContainer_239679ee{border-radius:4px;-webkit-box-sizing:border-box;box-sizing:border-box}.container_239679ee{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.valueLabel_239679ee{-ms-flex-negative:1;flex-shrink:1;width:30px;line-height:1}.slideBox_239679ee{background:transparent;border:none;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;line-height:28px}.slideBox_239679ee::-moz-focus-inner{border:0}.slideBox_239679ee{outline:transparent}.slideBox_239679ee{position:relative}.ms-Fabric--isFocusVisible .slideBox_239679ee:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid "},{theme:"focusBorder",defaultValue:"#000000"},{rawString:"}.slideBox_239679ee .thumb_239679ee{border:2px solid "},{theme:"neutralSecondary",defaultValue:"#666666"},{rawString:";-webkit-box-sizing:border-box;box-sizing:border-box;background:"},{theme:"white",defaultValue:"#ffffff"},{rawString:";display:block;width:16px;height:16px;position:absolute;border-radius:10px}.rootIsHorizontal_239679ee .line_239679ee{width:100%}.rootIsHorizontal_239679ee .line_239679ee .lineContainer_239679ee{height:4px}.rootIsHorizontal_239679ee .slideBox_239679ee{height:28px;padding:0 8px}.rootIsHorizontal_239679ee .slideBox_239679ee .thumb_239679ee{top:-6px}html[dir='ltr'] .rootIsHorizontal_239679ee .slideBox_239679ee .thumb_239679ee{-webkit-transform:translateX(-50%);transform:translateX(-50%)}html[dir='rtl'] .rootIsHorizontal_239679ee .slideBox_239679ee .thumb_239679ee{-webkit-transform:translateX(50%);transform:translateX(50%)}.rootIsHorizontal_239679ee .valueLabel_239679ee{margin:0 8px;white-space:nowrap;width:40px}.rootIsVertical_239679ee{margin-right:8px}.rootIsVertical_239679ee .line_239679ee{height:100%;width:4px;margin:0 auto;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.rootIsVertical_239679ee .line_239679ee .lineContainer_239679ee{width:4px;height:100%}.rootIsVertical_239679ee .slideBox_239679ee{height:100%;width:28px;padding:8px 0}.rootIsVertical_239679ee .slideBox_239679ee .thumb_239679ee{left:-6px;margin:0 auto;-webkit-transform:translateY(8px);transform:translateY(8px)}.rootIsVertical_239679ee .container_239679ee{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;text-align:center;margin:8px 0}.rootIsVertical_239679ee .valueLabel_239679ee{margin:0 auto;white-space:nowrap;width:40px}.activeSection_239679ee{background:"},{theme:"neutralSecondary",defaultValue:"#666666"},{rawString:"}@media screen and (-ms-high-contrast: active){.activeSection_239679ee{background-color:WindowText}}.inactiveSection_239679ee{background:"},{theme:"neutralTertiaryAlt",defaultValue:"#c8c8c8"},{rawString:"}@media screen and (-ms-high-contrast: active){.inactiveSection_239679ee{border:1px solid WindowText}}.showTransitions_239679ee .thumb_239679ee{-webkit-transition:left .367s cubic-bezier(0.1, 0.9, 0.2, 1);transition:left .367s cubic-bezier(0.1, 0.9, 0.2, 1)}.showTransitions_239679ee .activeSection_239679ee,.showTransitions_239679ee .inactiveSection_239679ee{-webkit-transition:width .367s cubic-bezier(0.1, 0.9, 0.2, 1);transition:width .367s cubic-bezier(0.1, 0.9, 0.2, 1)}.rootIsEnabled_239679ee .slideBox_239679ee:hover .thumb_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .thumb_239679ee{border:2px solid "},{theme:"themePrimary",defaultValue:"#0078d4"},{rawString:"}@media screen and (-ms-high-contrast: active){.rootIsEnabled_239679ee .slideBox_239679ee:hover .thumb_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .thumb_239679ee{border-color:Highlight}}.rootIsEnabled_239679ee .slideBox_239679ee:hover .activeSection_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .activeSection_239679ee{background-color:"},{theme:"themePrimary",defaultValue:"#0078d4"},{rawString:"}@media screen and (-ms-high-contrast: active){.rootIsEnabled_239679ee .slideBox_239679ee:hover .activeSection_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .activeSection_239679ee{background-color:Highlight}}.rootIsEnabled_239679ee .slideBox_239679ee:hover .inactiveSection_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .inactiveSection_239679ee{background-color:"},{theme:"themeLight",defaultValue:"#c7e0f4"},{rawString:"}@media screen and (-ms-high-contrast: active){.rootIsEnabled_239679ee .slideBox_239679ee:hover .inactiveSection_239679ee,.rootIsEnabled_239679ee .slideBox_239679ee:active .inactiveSection_239679ee{border-color:Highlight}}.rootIsEnabled_239679ee .slideBox_239679ee:active .thumb_239679ee{border:2px solid "},{theme:"themeDarkAlt",defaultValue:"#106ebe"},{rawString:"}.rootIsEnabled_239679ee .slideBox_239679ee:active .activeSection_239679ee{background-color:"},{theme:"themeDarkAlt",defaultValue:"#106ebe"},{rawString:"}.rootIsDisabled_239679ee .thumb_239679ee{border-color:"},{theme:"neutralTertiaryAlt",defaultValue:"#c8c8c8"},{rawString:"}@media screen and (-ms-high-contrast: active){.rootIsDisabled_239679ee .thumb_239679ee{border-color:GrayText}}@media screen and (-ms-high-contrast: active){.rootIsDisabled_239679ee .activeSection_239679ee,.rootIsDisabled_239679ee .inactiveSection_239679ee{background-color:GrayText;border-color:GrayText}}.rootIsDisabled_239679ee .activeSection_239679ee{background:"},{theme:"neutralTertiaryAlt",defaultValue:"#c8c8c8"},{rawString:"}.rootIsDisabled_239679ee .inactiveSection_239679ee{background:"},{theme:"neutralLight",defaultValue:"#eaeaea"},{rawString:"}\n"}]);t.root="root_239679ee";t.titleLabel="titleLabel_239679ee";t.line="line_239679ee";t.lineContainer="lineContainer_239679ee";t.container="container_239679ee";t.valueLabel="valueLabel_239679ee";t.slideBox="slideBox_239679ee";t.thumb="thumb_239679ee";t.rootIsHorizontal="rootIsHorizontal_239679ee";t.rootIsVertical="rootIsVertical_239679ee";t.activeSection="activeSection_239679ee";t.inactiveSection="inactiveSection_239679ee";t.showTransitions="showTransitions_239679ee";t.rootIsEnabled="rootIsEnabled_239679ee";t.rootIsDisabled="rootIsDisabled_239679ee"});

