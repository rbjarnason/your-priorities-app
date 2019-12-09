function _templateObject3_cada4cc04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .card-container {\n        @apply --layout-horizontal;\n        @apply --layout-wrap;\n      }\n\n      .card {\n        padding: 16px;\n      }\n\n      yp-ajax {\n        background-color: var(--primary-background-color) !important;\n      }\n\n      .archivedText {\n        font-size: 26px;\n        color: #333;\n      }\n\n      .minHeightSection {\n        min-height: 450px;\n      }\n\n      #paper_tabs[apple] {\n        margin-top: 42px;\n        margin-bottom: 8px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <yp-page id=\"page\" create-fab-icon=\"[[createFabIcon]]\" create-fab-title=\"[[t('group.add')]]\" on-yp-create-fab-tap=\"_newGroup\" hide-all-tabs=\"[[community.configuration.hideAllTabs]]\">\n\n      <template is=\"dom-if\" if=\"[[useAlternativeHeader]]\">\n        <yp-community-header id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[community]]\" on-update-community=\"_refreshAjax\"></yp-community-header>\n      </template>\n\n      <template is=\"dom-if\" if=\"[[useNormalHeader]]\">\n        <yp-community-large-card id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[community]]\" on-update-community=\"_refreshAjax\"></yp-community-large-card>\n      </template>\n\n      <paper-tabs id=\"paper_tabs\" apple$=\"[[isOldiOs]]\" slot=\"tabs\" class=\"tabs\" selected=\"{{selectedTab}}\" attr-for-selected=\"name\" focused=\"\" hidden$=\"[[community.configuration.hideAllTabs]]\">\n        <paper-tab name=\"groups\" class=\"tab\"><span>[[t('groups')]]</span> &nbsp; (<span>[[groupsLength]]</span>)</paper-tab>\n        <paper-tab name=\"news\" class=\"tab\">[[t('news')]]</paper-tab>\n        <paper-tab name=\"map\" class=\"tab\" hidden$=\"[[locationHidden]]\">[[t('posts.map')]]</paper-tab>\n      </paper-tabs>\n\n      <iron-pages class=\"tabPages\" slot=\"tabPages\" selected=\"{{selectedTab}}\" attr-for-selected=\"name\" entry-animation=\"fade-in-animation\" exit-animation=\"fade-out-animation\">\n        <section name=\"groups\">\n          <div class=\"layout horizontal center-center\">\n            <yp-group-grid id=\"groupGrid\" featured-groups=\"[[featuredGroups]]\" active-groups=\"[[activeGroups]]\" archived-groups=\"[[archivedGroups]]\" hide-add$=\"[[!createFabIcon]]\" on-add-new-group=\"_newGroup\">\n            </yp-group-grid>\n          </div>\n        </section>\n        <section class=\"minHeightSection\" name=\"news\">\n          <template is=\"dom-if\" if=\"[[newsTabSelected]]\">\n            <ac-activities id=\"communityNews\" selected-tab=\"[[selectedTab]]\" community-id=\"[[community.id]]\"></ac-activities>\n          </template>\n        </section>\n        <section class=\"minHeightSection\" name=\"map\" hidden$=\"[[locationHidden]]\">\n          <template is=\"dom-if\" if=\"[[mapActive]]\" restamp=\"\">\n            <yp-post-map community-id=\"[[community.id]]\"></yp-post-map>\n          </template>\n        </section>\n      </iron-pages>\n    </yp-page>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <lite-signal on-lite-signal-logged-in=\"_userLoggedIn\"></lite-signal>\n    <lite-signal on-lite-signal-got-admin-rights=\"_gotAdminRights\"></lite-signal>\n\n    <app-route route=\"{{idRoute}}\" pattern=\"/:id\" data=\"{{idRouteData}}\" tail=\"{{tabRoute}}\">\n    </app-route>\n\n    <app-route route=\"{{tabRoute}}\" pattern=\"/:tabName\" data=\"{{tabRouteData}}\">\n    </app-route>\n\n    <yp-ajax id=\"ajax\" url=\"/api/communities\" on-response=\"_response\"></yp-ajax>\n    <yp-ajax id=\"pagesAjax\" on-response=\"_pagesResponse\"></yp-ajax>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .card-container {\n        @apply --layout-horizontal;\n        @apply --layout-wrap;\n      }\n\n      .card {\n        padding: 16px;\n      }\n\n      yp-ajax {\n        background-color: var(--primary-background-color) !important;\n      }\n\n      .archivedText {\n        font-size: 26px;\n        color: #333;\n      }\n\n      .minHeightSection {\n        min-height: 450px;\n      }\n\n      #paper_tabs[apple] {\n        margin-top: 42px;\n        margin-bottom: 8px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <yp-page id=\"page\" create-fab-icon=\"[[createFabIcon]]\" create-fab-title=\"[[t('group.add')]]\" on-yp-create-fab-tap=\"_newGroup\" hide-all-tabs=\"[[community.configuration.hideAllTabs]]\">\n\n      <template is=\"dom-if\" if=\"[[useAlternativeHeader]]\">\n        <yp-community-header id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[community]]\" on-update-community=\"_refreshAjax\"></yp-community-header>\n      </template>\n\n      <template is=\"dom-if\" if=\"[[useNormalHeader]]\">\n        <yp-community-large-card id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[community]]\" on-update-community=\"_refreshAjax\"></yp-community-large-card>\n      </template>\n\n      <paper-tabs id=\"paper_tabs\" apple\\$=\"[[isOldiOs]]\" slot=\"tabs\" class=\"tabs\" selected=\"{{selectedTab}}\" attr-for-selected=\"name\" focused=\"\" hidden\\$=\"[[community.configuration.hideAllTabs]]\">\n        <paper-tab name=\"groups\" class=\"tab\"><span>[[t('groups')]]</span> &nbsp; (<span>[[groupsLength]]</span>)</paper-tab>\n        <paper-tab name=\"news\" class=\"tab\">[[t('news')]]</paper-tab>\n        <paper-tab name=\"map\" class=\"tab\" hidden\\$=\"[[locationHidden]]\">[[t('posts.map')]]</paper-tab>\n      </paper-tabs>\n\n      <iron-pages class=\"tabPages\" slot=\"tabPages\" selected=\"{{selectedTab}}\" attr-for-selected=\"name\" entry-animation=\"fade-in-animation\" exit-animation=\"fade-out-animation\">\n        <section name=\"groups\">\n          <div class=\"layout horizontal center-center\">\n            <yp-group-grid id=\"groupGrid\" featured-groups=\"[[featuredGroups]]\" active-groups=\"[[activeGroups]]\" archived-groups=\"[[archivedGroups]]\" hide-add\\$=\"[[!createFabIcon]]\" on-add-new-group=\"_newGroup\">\n            </yp-group-grid>\n          </div>\n        </section>\n        <section class=\"minHeightSection\" name=\"news\">\n          <template is=\"dom-if\" if=\"[[newsTabSelected]]\">\n            <ac-activities id=\"communityNews\" selected-tab=\"[[selectedTab]]\" community-id=\"[[community.id]]\"></ac-activities>\n          </template>\n        </section>\n        <section class=\"minHeightSection\" name=\"map\" hidden\\$=\"[[locationHidden]]\">\n          <template is=\"dom-if\" if=\"[[mapActive]]\" restamp=\"\">\n            <yp-post-map community-id=\"[[community.id]]\"></yp-post-map>\n          </template>\n        </section>\n      </iron-pages>\n    </yp-page>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <lite-signal on-lite-signal-logged-in=\"_userLoggedIn\"></lite-signal>\n    <lite-signal on-lite-signal-got-admin-rights=\"_gotAdminRights\"></lite-signal>\n\n    <app-route route=\"{{idRoute}}\" pattern=\"/:id\" data=\"{{idRouteData}}\" tail=\"{{tabRoute}}\">\n    </app-route>\n\n    <app-route route=\"{{tabRoute}}\" pattern=\"/:tabName\" data=\"{{tabRouteData}}\">\n    </app-route>\n\n    <yp-ajax id=\"ajax\" url=\"/api/communities\" on-response=\"_response\"></yp-ajax>\n    <yp-ajax id=\"pagesAjax\" on-response=\"_pagesResponse\"></yp-ajax>\n"]);_templateObject3_cada4cc04fe511e9ab8b8d361f77d375=function _templateObject3_cada4cc04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject2_cada4cc04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n\n      .groupCard {\n        padding: 0;\n        padding-top: 16px;\n      }\n\n      .groupCard[wide-padding] {\n        padding: 16px !important;\n      }\n\n      iron-list {\n        height: 100vh;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      :focus {\n        outline: none;\n      }\n\n      @media (max-width: 1199px) {\n        .groupCard {\n        }\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <iron-media-query query=\"(min-width: 1024px)\" query-matches=\"{{wide}}\"></iron-media-query>\n\n    <div class=\"layout horizontal center-center\">\n      <iron-list id=\"ironList\" scroll-offset=\"[[scrollOffset]]\" items=\"[[activeGroups]]\" as=\"group\" scroll-target=\"document\" grid$=\"[[wide]]\">\n        <template>\n          <div class=\"groupCard layout vertical center-center\" tabindex$=\"[[tabIndex]]\" wide-padding$=\"[[wide]]\">\n            <yp-group-card wide-padding$=\"[[wide]]\" group=\"[[group]]\" on-mouseover=\"cardMouseOver\" on-mouseout=\"cardMouseOut\"></yp-group-card>\n          </div>\n        </template>\n      </iron-list>\n    </div>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n\n      .groupCard {\n        padding: 0;\n        padding-top: 16px;\n      }\n\n      .groupCard[wide-padding] {\n        padding: 16px !important;\n      }\n\n      iron-list {\n        height: 100vh;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      :focus {\n        outline: none;\n      }\n\n      @media (max-width: 1199px) {\n        .groupCard {\n        }\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <iron-media-query query=\"(min-width: 1024px)\" query-matches=\"{{wide}}\"></iron-media-query>\n\n    <div class=\"layout horizontal center-center\">\n      <iron-list id=\"ironList\" scroll-offset=\"[[scrollOffset]]\" items=\"[[activeGroups]]\" as=\"group\" scroll-target=\"document\" grid\\$=\"[[wide]]\">\n        <template>\n          <div class=\"groupCard layout vertical center-center\" tabindex\\$=\"[[tabIndex]]\" wide-padding\\$=\"[[wide]]\">\n            <yp-group-card wide-padding\\$=\"[[wide]]\" group=\"[[group]]\" on-mouseover=\"cardMouseOver\" on-mouseout=\"cardMouseOut\"></yp-group-card>\n          </div>\n        </template>\n      </iron-list>\n    </div>\n"]);_templateObject2_cada4cc04fe511e9ab8b8d361f77d375=function _templateObject2_cada4cc04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject_cada4cc04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      :host {\n        display: block;\n        @apply --layout-vertical;\n        width: 416px;\n      }\n\n      .description {\n        color: var(--primary-color-more-darker, #424242);\n        line-height: var(--description-line-height, 1.3);\n      }\n\n      .groupCard {\n        height: 445px;\n        background-color: #fff;\n      }\n\n      .objectives {\n        @apply --layout-vertical;\n        color: var(--primary-color-more-darker, #424242);\n        line-height: var(--objectives-line-height, 1.3);\n        padding: 16px;\n      }\n\n      .stats {\n        position: absolute;\n        bottom: 0px;\n        right: 8px;\n      }\n\n      .group-name[archived] {\n        background-color: #aaa;\n      }\n\n      iron-image[archived] {\n        opacity: 0.85;\n        filter: alpha(opacity=85);  }\n\n\n      .post-image {\n      }\n\n      iron-image {\n        width: 416px;\n        height: 234px;\n        display: block;\n      }\n\n      yp-group-stats {\n        color: var(--primary-color-more-darker, #424242);\n      }\n\n      paper-card {\n        background-color: #f00;\n        vertical-align: text-top;\n      }\n\n      .informationText {\n        vertical-align: text-top;\n      }\n\n      .group-name {\n        margin: 0;\n        font-size: var(--large-heading-size, 26px);\n        padding: 8px;\n        padding-top: 16px;\n        padding-bottom: 16px;\n        background-color: var(--primary-color-800);\n        color: #FFF;\n        font-weight: bold;\n        cursor: pointer;\n        vertical-align: middle;\n        width: auto;\n      }\n\n      .group-name[featured] {\n        font-size: 25px;\n        background-color: var(--accent-color);\n      }\n\n      yp-membership-button[archived] {\n        display: none;\n      }\n\n      yp-membership-button {\n        position: absolute;\n        right: 16px;\n        top: 214px;\n        width: 32px;\n        height: 32px;\n        color: var(--icon-general-color, #FFF);\n      }\n\n      .objectives {\n        padding: 8px;\n      }\n\n      @media (max-width: 960px) {\n        :host {\n          max-width: 423px;\n          width: 100%;\n          padding-top: 0 !important;\n        }\n\n        .groupCard {\n          margin-left: 0;\n          margin-right: 0;\n          padding-left: 0;\n          padding-right: 0;\n          width: 100%;\n          height: 100%;\n          padding-bottom: 38px;\n        }\n\n        yp-membership-button {\n          top: 205px;\n        }\n\n        iron-image {\n          width: 100%;\n          height: 230px;\n        }\n\n        .group-name {\n          width: auto;\n        }\n      }\n\n      @media (max-width: 420px) {\n        iron-image {\n          height: 225px;\n        }\n\n        yp-membership-button {\n          top: 205px;\n        }\n      }\n\n      @media (max-width: 375px) {\n        iron-image {\n          height: 207px;\n        }\n\n        yp-membership-button {\n          top: 185px;\n        }\n      }\n\n      @media (max-width: 360px) {\n        iron-image {\n          height: 200px;\n        }\n      }\n\n      @media (max-width: 320px) {\n        iron-image {\n          height: 180px;\n        }\n\n        yp-membership-button {\n          top: 155px;\n        }\n\n      }\n\n      .withPointer {\n        cursor: pointer;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <iron-media-query query=\"(min-width: 600px)\" query-matches=\"{{wide}}\"></iron-media-query>\n\n    <paper-card class=\"groupCard\" animated=\"\" elevation=\"[[elevation]]\">\n      <iron-image hidden$=\"[[!noImage]]\" header-mode$=\"[[headerMode]]\" archived$=\"[[archived]]\" sizing=\"cover\" class=\"main-image withPointer\" src=\"https://i.imgur.com/sdsFAoT.png\" on-tap=\"_goToGroup\"></iron-image>\n      <iron-image hidden$=\"[[noImage]]\" archived$=\"[[archived]]\" class=\"logo withPointer\" sizing=\"cover\" on-tap=\"_goToGroup\" preload=\"\" src=\"[[groupLogoImagePath]]\"></iron-image>\n      <div id=\"groupName\" class=\"group-name\" archived$=\"[[archived]]\" featured$=\"[[featured]]\" on-tap=\"_goToGroup\">\n        <yp-magic-text text-type=\"groupName\" content-language=\"[[group.language]]\" disable-translation=\"[[group.configuration.disableNameAutoTranslation]]\" text-only=\"\" content=\"[[groupName]]\" content-id=\"[[group.id]]\">\n        </yp-magic-text>\n        <span hidden$=\"[[!archived]]\">- [[t('archived')]]</span>\n      </div>\n      <yp-magic-text id=\"objectives\" class=\"objectives withPointer\" on-tap=\"_goToGroup\" text-type=\"groupContent\" content-language=\"[[group.language]]\" text-only=\"\" content=\"[[groupObjectives]]\" content-id=\"[[group.id]]\" truncate=\"200\">\n      </yp-magic-text>\n      <yp-group-stats class=\"stats\" group=\"[[group]]\"></yp-group-stats>\n      <yp-membership-button archived$=\"[[archived]]\" group=\"[[group]]\"></yp-membership-button>\n    </paper-card>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      :host {\n        display: block;\n        @apply --layout-vertical;\n        width: 416px;\n      }\n\n      .description {\n        color: var(--primary-color-more-darker, #424242);\n        line-height: var(--description-line-height, 1.3);\n      }\n\n      .groupCard {\n        height: 445px;\n        background-color: #fff;\n      }\n\n      .objectives {\n        @apply --layout-vertical;\n        color: var(--primary-color-more-darker, #424242);\n        line-height: var(--objectives-line-height, 1.3);\n        padding: 16px;\n      }\n\n      .stats {\n        position: absolute;\n        bottom: 0px;\n        right: 8px;\n      }\n\n      .group-name[archived] {\n        background-color: #aaa;\n      }\n\n      iron-image[archived] {\n        opacity: 0.85;\n        filter: alpha(opacity=85);  }\n\n\n      .post-image {\n      }\n\n      iron-image {\n        width: 416px;\n        height: 234px;\n        display: block;\n      }\n\n      yp-group-stats {\n        color: var(--primary-color-more-darker, #424242);\n      }\n\n      paper-card {\n        background-color: #f00;\n        vertical-align: text-top;\n      }\n\n      .informationText {\n        vertical-align: text-top;\n      }\n\n      .group-name {\n        margin: 0;\n        font-size: var(--large-heading-size, 26px);\n        padding: 8px;\n        padding-top: 16px;\n        padding-bottom: 16px;\n        background-color: var(--primary-color-800);\n        color: #FFF;\n        font-weight: bold;\n        cursor: pointer;\n        vertical-align: middle;\n        width: auto;\n      }\n\n      .group-name[featured] {\n        font-size: 25px;\n        background-color: var(--accent-color);\n      }\n\n      yp-membership-button[archived] {\n        display: none;\n      }\n\n      yp-membership-button {\n        position: absolute;\n        right: 16px;\n        top: 214px;\n        width: 32px;\n        height: 32px;\n        color: var(--icon-general-color, #FFF);\n      }\n\n      .objectives {\n        padding: 8px;\n      }\n\n      @media (max-width: 960px) {\n        :host {\n          max-width: 423px;\n          width: 100%;\n          padding-top: 0 !important;\n        }\n\n        .groupCard {\n          margin-left: 0;\n          margin-right: 0;\n          padding-left: 0;\n          padding-right: 0;\n          width: 100%;\n          height: 100%;\n          padding-bottom: 38px;\n        }\n\n        yp-membership-button {\n          top: 205px;\n        }\n\n        iron-image {\n          width: 100%;\n          height: 230px;\n        }\n\n        .group-name {\n          width: auto;\n        }\n      }\n\n      @media (max-width: 420px) {\n        iron-image {\n          height: 225px;\n        }\n\n        yp-membership-button {\n          top: 205px;\n        }\n      }\n\n      @media (max-width: 375px) {\n        iron-image {\n          height: 207px;\n        }\n\n        yp-membership-button {\n          top: 185px;\n        }\n      }\n\n      @media (max-width: 360px) {\n        iron-image {\n          height: 200px;\n        }\n      }\n\n      @media (max-width: 320px) {\n        iron-image {\n          height: 180px;\n        }\n\n        yp-membership-button {\n          top: 155px;\n        }\n\n      }\n\n      .withPointer {\n        cursor: pointer;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <iron-media-query query=\"(min-width: 600px)\" query-matches=\"{{wide}}\"></iron-media-query>\n\n    <paper-card class=\"groupCard\" animated=\"\" elevation=\"[[elevation]]\">\n      <iron-image hidden\\$=\"[[!noImage]]\" header-mode\\$=\"[[headerMode]]\" archived\\$=\"[[archived]]\" sizing=\"cover\" class=\"main-image withPointer\" src=\"https://i.imgur.com/sdsFAoT.png\" on-tap=\"_goToGroup\"></iron-image>\n      <iron-image hidden\\$=\"[[noImage]]\" archived\\$=\"[[archived]]\" class=\"logo withPointer\" sizing=\"cover\" on-tap=\"_goToGroup\" preload=\"\" src=\"[[groupLogoImagePath]]\"></iron-image>\n      <div id=\"groupName\" class=\"group-name\" archived\\$=\"[[archived]]\" featured\\$=\"[[featured]]\" on-tap=\"_goToGroup\">\n        <yp-magic-text text-type=\"groupName\" content-language=\"[[group.language]]\" disable-translation=\"[[group.configuration.disableNameAutoTranslation]]\" text-only=\"\" content=\"[[groupName]]\" content-id=\"[[group.id]]\">\n        </yp-magic-text>\n        <span hidden\\$=\"[[!archived]]\">- [[t('archived')]]</span>\n      </div>\n      <yp-magic-text id=\"objectives\" class=\"objectives withPointer\" on-tap=\"_goToGroup\" text-type=\"groupContent\" content-language=\"[[group.language]]\" text-only=\"\" content=\"[[groupObjectives]]\" content-id=\"[[group.id]]\" truncate=\"200\">\n      </yp-magic-text>\n      <yp-group-stats class=\"stats\" group=\"[[group]]\"></yp-group-stats>\n      <yp-membership-button archived\\$=\"[[archived]]\" group=\"[[group]]\"></yp-membership-button>\n    </paper-card>\n"]);_templateObject_cada4cc04fe511e9ab8b8d361f77d375=function _templateObject_cada4cc04fe511e9ab8b8d361f77d375(){return data};return data}import{ypLanguageBehavior,CollectionHelpers,YpNewsTabSelected,ypLoggedInUserBehavior,ypDetectOldiOs,ypGotoBehavior,ypMediaFormatsBehavior,ypThemeBehavior,GroupCollectionBehaviors,ypIronListBehavior,ypCardMouseBehavior,GroupBehaviors,ypTruncateBehavior,Polymer,html,AccessHelpers,dom}from"../yp-app/yp-app.js";Polymer({_template:html(_templateObject_cada4cc04fe511e9ab8b8d361f77d375()),is:"yp-group-card",behaviors:[ypLanguageBehavior,GroupBehaviors,ypTruncateBehavior,ypMediaFormatsBehavior,ypGotoBehavior]});Polymer({_template:html(_templateObject2_cada4cc04fe511e9ab8b8d361f77d375()),is:"yp-group-grid",behaviors:[ypLanguageBehavior,ypIronListBehavior,ypCardMouseBehavior],properties:{featuredGroups:Array,archivedGroups:Array,activeGroups:Array,hideAdd:{type:Boolean,value:!1},wide:{type:Boolean,value:!1},scrollOffset:{type:Number,computed:"_scrollOffset(wide, featuredGroups, activeGroups)"}},_scrollOffset:function _scrollOffset(wide,featuredGroups){var list=this.$.ironList;if(list){var offset=list.offsetTop;offset-=75;if(0<list.offsetTop&&0<offset){console.info("Group list scroll offset: "+offset);return offset}else{if(wide)offset=390;else offset=450;console.info("Group list (manual) scroll offset: "+offset);return offset}}else{console.warn("No group list for scroll offset");return null}},scrollToItem:function scrollToItem(item){console.log("Group grid scrolling to item");this.$.ironList.scrollToItem(item);document.dispatchEvent(new CustomEvent("lite-signal",{bubbles:!0,compose:!0,detail:{name:"yp-refresh-activities-scroll-threshold",data:{}}}))},_newGroup:function _newGroup(){this.fire("add-new-group")}});Polymer({_template:html(_templateObject3_cada4cc04fe511e9ab8b8d361f77d375()),is:"yp-community",behaviors:[ypLanguageBehavior,GroupCollectionBehaviors,ypThemeBehavior,CollectionHelpers,AccessHelpers,YpNewsTabSelected,ypLoggedInUserBehavior,ypDetectOldiOs,ypGotoBehavior,ypMediaFormatsBehavior],properties:{idRoute:Object,tabRoute:Object,idRouteData:Object,tabRouteData:Object,createFabIcon:{type:String,value:null,notify:!0},communityId:{type:Number,value:null,observer:"_communityIdChanged"},community:{type:Object},selectedTab:{type:String,value:"groups",observer:"_selectedTabChanged"},mapActive:{type:Boolean,value:!1},locationHidden:{type:Boolean,value:!1},useAlternativeHeader:{type:Boolean,value:!1},isOldiOs:{type:Boolean,computed:"_isOldiOs(communityId)"},useNormalHeader:{type:Boolean,value:!0}},observers:["_routeIdChanged(idRouteData.id)","_routeTabChanged(tabRouteData.tabName)"],listeners:{"yp-new-group":"_newGroup"},_userLoggedIn:function _userLoggedIn(user){if(user){if(this.community&&-1<window.location.href.indexOf("/community/")){this.$$("#ajax").generateRequest()}}},_newPostForGroup:function _newPostForGroup(group){window.appGlobals.activity("open","newPost");dom(document).querySelector("yp-app").getDialogAsync("postEdit",function(dialog){dialog.setup(null,!0,null);dialog.open("new",{groupId:group.id,group:group})}.bind(this))},_refreshTabsAndPages:function _refreshTabsAndPages(){this.async(function(){var pages=this.$$("#tabPages");if(pages){pages.forceSynchronousItemUpdate()}var paperTabs=this.$$("#paper_tabs");if(paperTabs){paperTabs.forceSynchronousItemUpdate();paperTabs.notifyResize()}},10)},scrollToGroupItem:function scrollToGroupItem(){if("news"===this.selectedTab&&null!==window.appGlobals.cachedActivityItem){var list=this.$$("#communityNews");if(list){list.scrollToItem(window.appGlobals.cachedActivityItem);window.appGlobals.cachedActivityItem=null}else{console.warn("No community activities for scroll to item")}}else if("groups"===this.selectedTab){if(window.appGlobals.backToCommunityGroupItems&&window.appGlobals.backToCommunityGroupItems[this.community.id]){this.$.groupGrid.scrollToItem(window.appGlobals.backToCommunityGroupItems[this.community.id]);window.appGlobals.backToCommunityGroupItems[this.community.id]=null}}},_routeIdChanged:function _routeIdChanged(newId){if(newId){this.set("communityId",newId)}},_routeTabChanged:function _routeTabChanged(newTabName){if(newTabName){this.set("selectedTab",newTabName)}},_selectedTabChanged:function _selectedTabChanged(tabName){if(this.community){this.redirectTo("/community/"+this.community.id+"/"+tabName)}if("map"==tabName){this.set("mapActive",!0)}else{this.set("mapActive",!1)}if(tabName&&window.appGlobals){window.appGlobals.activity("open","community_tab_"+tabName,"",{id:this.communityId})}this.async(function(){var news=this.$$("#communityNews");if(news){news.fireResize()}},300)},_hideEdit:function _hideEdit(){if(!this.community)return!0;if(!window.appUser.loggedIn())return!0;return window.appUser.user.id!=this.community.user_id},_communityHeaderUrl:function _communityHeaderUrl(community){return this.getImageFormatUrl(community.CommunityHeaderImages,2)},_communityIdChanged:function _communityIdChanged(newValue,oldValue){if(newValue){this.set("community",null);this.set("featuredGroups",null);this.set("activeGroups",null);this.set("archivedGroups",null);this.set("selectedTab","groups");this._getCommunity()}},_getCommunity:function _getCommunity(){this.$$("#ajax").url="/api/communities/"+this.communityId;this.$$("#ajax").retryMethodAfter401Login=this._getCommunity.bind(this);this.$$("#ajax").generateRequest()},_newGroup:function _newGroup(){window.appGlobals.activity("open","newGroup");dom(document).querySelector("yp-app").getDialogAsync("groupEdit",function(dialog){dialog.setup(null,!0,this._refreshAjax.bind(this));dialog.open("new",{communityId:this.communityId,community:this.community})}.bind(this))},_pagesResponse:function _pagesResponse(event,detail){this.fire("yp-set-pages",detail.response)},_response:function _response(event,detail,sender){this.set("community",detail.response);if(this.community.is_community_folder){this.redirectTo("/community_folder/"+this.community.id)}else{this.refresh();if(!this.community.is_community_folder&&(!this.community.only_admins_can_create_groups||this.checkCommunityAccess(this.community))){this.set("createFabIcon","add")}var url=this._communityHeaderUrl(this.community);this.setupGroups(this.community.Groups);this._setLocationHidden(this.community.Groups);this.async(function(){var communityCard=this.$$("#communityCard");if(communityCard){communityCard.setElevation(5);communityCard.lowerCardLater()}},20)}},_gotAdminRights:function _gotAdminRights(event,detail){if(detail&&0<detail){if(this.checkCommunityAccess(this.community)){this.set("createFabIcon","add")}}},_setLocationHidden:function _setLocationHidden(groups){var locationHidden=!0;groups.forEach(function(group){if(group.configuration&&group.configuration.locationHidden){if(!0!=group.configuration.locationHidden){locationHidden=!1}}else{locationHidden=!1}}.bind(this));this.set("locationHidden",locationHidden);this._refreshTabsAndPages()},refresh:function refresh(){if(this.community){this.fire("yp-set-home-link",{type:"community",id:this.community.id,name:this.community.name});window.appGlobals.setCommunityAnalyticsTracker(this.community.google_analytics_code);if(this.community.configuration){window.appGlobals.setCommunityPixelTracker(this.community.configuration.facebookPixelId)}if(null!=this.community.theme_id||this.community.configuration&&null!=this.community.configuration.themeOverrideColorPrimary){this.setTheme(this.community.theme_id,this.community.configuration)}else if(null!=this.community.Domain.theme_id){this.setTheme(this.community.Domain.theme_id)}if(null!=this.community.default_locale){window.appGlobals.changeLocaleIfNeeded(this.community.default_locale)}if(this.community.configuration&&this.community.configuration.alternativeHeader&&""!=this.community.configuration.alternativeHeader){this.set("useAlternativeHeader",!0);this.set("useNormalHeader",!1)}else{this.set("useAlternativeHeader",!1);this.set("useNormalHeader",!0)}if(this.community.CommunityHeaderImages&&0<this.community.CommunityHeaderImages.length){this.$.page.setupTopHeaderImage(this.community.CommunityHeaderImages)}else{this.$.page.setupTopHeaderImage(null)}if(-1<window.location.href.indexOf("/community")){var backPath,headerTitle,headerDescription;if(this.community.CommunityFolder){backPath="/community_folder/"+this.community.CommunityFolder.id;headerTitle=this.community.CommunityFolder.name;headerDescription=this.community.CommunityFolder.description}else{backPath="/domain/"+this.community.domain_id;headerTitle=this.community.Domain.name;headerDescription=this.community.Domain.description}this.fire("change-header",{headerTitle:this.community.configuration.customBackName?this.community.configuration.customBackName:headerTitle,headerDescription:headerDescription,headerIcon:"group-work",useHardBack:this.community.configuration.customBackURL?!0:!1,disableDomainUpLink:this.community.configuration&&!0===this.community.configuration.disableDomainUpLink,documentTitle:this.community.name,backPath:this.community.configuration.customBackURL?this.community.configuration.customBackURL:backPath})}this.$.pagesAjax.url="/api/communities/"+this.community.id+"/pages";this.$.pagesAjax.generateRequest();window.appGlobals.setAnonymousGroupStatus(null);window.appGlobals.disableFacebookLoginForGroup=!1;window.appGlobals.externalGoalTriggerUrl=null;window.appGlobals.currentGroupForceSaml=!1;window.appGlobals.currentGroup=null;if(this.community.configuration&&this.community.configuration.signupTermsPageId&&-1!=this.community.configuration.signupTermsPageId){window.appGlobals.signupTermsPageId=this.community.configuration.signupTermsPageId}else{window.appGlobals.signupTermsPageId=null}}},defaultGroupFirst:function defaultGroupFirst(items){for(var filtered=[],defaultGroup=null,i=0,item;i<items.length;i++){item=items[i];if("default"!=item.short_name){filtered.push(item)}else{defaultGroup=item}}filtered.unshift(defaultGroup);return filtered},noTestGroup:function noTestGroup(items){for(var filtered=[],i=0,item;i<items.length;i++){item=items[i];if("test"!=item.short_name&&"ac-posts"!=item.short_name&&"development"!=item.short_name&&-1==item.short_name.indexOf("2012")&&-1==item.short_name.indexOf("2013")){filtered.push(item)}}return filtered},_refreshAjax:function _refreshAjax(){this.async(function(){this.$$("#ajax").generateRequest()},100)},ready:function ready(){}});