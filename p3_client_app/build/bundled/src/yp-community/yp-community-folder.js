function _templateObject_cad0afd04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .card-container {\n        @apply --layout-horizontal;\n        @apply --layout-wrap;\n      }\n\n      .card {\n        padding: 16px;\n      }\n\n      yp-ajax {\n        background-color: var(--primary-background-color) !important;\n      }\n\n      .archivedText {\n        font-size: 26px;\n        color: #333;\n      }\n\n      .minHeightSection {\n        min-height: 450px;\n      }\n\n      #paper_tabs[apple] {\n        margin-top: 42px;\n        margin-bottom: 8px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <yp-page id=\"page\" create-fab-icon=\"[[createFabIcon]]\" hide-all-tabs=\"\" create-fab-title=\"[[t('group.add')]]\" on-yp-create-fab-tap=\"_newGroup\">\n\n      <yp-community-large-card id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[communityFolder]]\" on-update-community=\"_refreshAjax\"></yp-community-large-card>\n\n      <div class=\"layout horizontal center-center wrap\" slot=\"tabPages\">\n        <yp-community-grid featured-communities=\"[[featuredCommunities]]\" active-communities=\"[[activeCommunities]]\" archived-communities=\"[[archivedCommunities]]\" hide-add$=\"[[!createFabIcon]]\" on-add-new-community=\"_newCommunity\">\n        </yp-community-grid>\n      </div>\n    </yp-page>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <lite-signal on-lite-signal-logged-in=\"_userLoggedIn\"></lite-signal>\n    <lite-signal on-lite-signal-got-admin-rights=\"_gotAdminRights\"></lite-signal>\n\n    <app-route route=\"{{idRoute}}\" pattern=\"/:id\" data=\"{{idRouteData}}\" tail=\"{{tabRoute}}\">\n    </app-route>\n\n    <app-route route=\"{{tabRoute}}\" pattern=\"/:tabName\" data=\"{{tabRouteData}}\">\n    </app-route>\n\n    <yp-ajax id=\"ajax\" url=\"/api/domains\" on-response=\"_response\"></yp-ajax>\n    <yp-ajax id=\"pagesAjax\" on-response=\"_pagesResponse\"></yp-ajax>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .card-container {\n        @apply --layout-horizontal;\n        @apply --layout-wrap;\n      }\n\n      .card {\n        padding: 16px;\n      }\n\n      yp-ajax {\n        background-color: var(--primary-background-color) !important;\n      }\n\n      .archivedText {\n        font-size: 26px;\n        color: #333;\n      }\n\n      .minHeightSection {\n        min-height: 450px;\n      }\n\n      #paper_tabs[apple] {\n        margin-top: 42px;\n        margin-bottom: 8px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <yp-page id=\"page\" create-fab-icon=\"[[createFabIcon]]\" hide-all-tabs=\"\" create-fab-title=\"[[t('group.add')]]\" on-yp-create-fab-tap=\"_newGroup\">\n\n      <yp-community-large-card id=\"communityCard\" slot=\"largeCard\" class=\"largeCard card\" community=\"[[communityFolder]]\" on-update-community=\"_refreshAjax\"></yp-community-large-card>\n\n      <div class=\"layout horizontal center-center wrap\" slot=\"tabPages\">\n        <yp-community-grid featured-communities=\"[[featuredCommunities]]\" active-communities=\"[[activeCommunities]]\" archived-communities=\"[[archivedCommunities]]\" hide-add\\$=\"[[!createFabIcon]]\" on-add-new-community=\"_newCommunity\">\n        </yp-community-grid>\n      </div>\n    </yp-page>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <lite-signal on-lite-signal-logged-in=\"_userLoggedIn\"></lite-signal>\n    <lite-signal on-lite-signal-got-admin-rights=\"_gotAdminRights\"></lite-signal>\n\n    <app-route route=\"{{idRoute}}\" pattern=\"/:id\" data=\"{{idRouteData}}\" tail=\"{{tabRoute}}\">\n    </app-route>\n\n    <app-route route=\"{{tabRoute}}\" pattern=\"/:tabName\" data=\"{{tabRouteData}}\">\n    </app-route>\n\n    <yp-ajax id=\"ajax\" url=\"/api/domains\" on-response=\"_response\"></yp-ajax>\n    <yp-ajax id=\"pagesAjax\" on-response=\"_pagesResponse\"></yp-ajax>\n"]);_templateObject_cad0afd04fe511e9ab8b8d361f77d375=function _templateObject_cad0afd04fe511e9ab8b8d361f77d375(){return data};return data}import{ypLanguageBehavior,CollectionHelpers,ypLoggedInUserBehavior,ypDetectOldiOs,ypGotoBehavior,ypMediaFormatsBehavior,ypThemeBehavior,CommunityCollectionBehaviors,Polymer,html,AccessHelpers,dom}from"../yp-app/yp-app.js";Polymer({_template:html(_templateObject_cad0afd04fe511e9ab8b8d361f77d375()),is:"yp-community-folder",behaviors:[ypLanguageBehavior,CommunityCollectionBehaviors,ypThemeBehavior,CollectionHelpers,AccessHelpers,ypLoggedInUserBehavior,ypDetectOldiOs,ypGotoBehavior,ypMediaFormatsBehavior],properties:{idRoute:Object,tabRoute:Object,idRouteData:Object,tabRouteData:Object,createFabIcon:{type:String,value:null,notify:!0},communityFolderId:{type:Number,value:null,observer:"_communityFolderIdChanged"},communityFolder:{type:Object},mapActive:{type:Boolean,value:!1},locationHidden:{type:Boolean,value:!1},useAlternativeHeader:{type:Boolean,value:!1},isOldiOs:{type:Boolean,computed:"_isOldiOs(communityFolderId)"},useNormalHeader:{type:Boolean,value:!0}},observers:["_routeIdChanged(idRouteData.id)"],listeners:{"yp-new-group":"_newGroup"},_userLoggedIn:function _userLoggedIn(user){if(user){if(this.communityFolder&&-1<window.location.href.indexOf("/community_folder/")){this.$$("#ajax").generateRequest()}}},_routeIdChanged:function _routeIdChanged(newId){if(newId){this.set("communityFolderId",newId)}},_hideEdit:function _hideEdit(){if(!this.communityFolder)return!0;if(!window.appUser.loggedIn())return!0;return window.appUser.user.id!=this.communityFolder.user_id},_communityHeaderUrl:function _communityHeaderUrl(communityFolder){return this.getImageFormatUrl(communityFolder.CommunityHeaderImages,2)},_communityFolderIdChanged:function _communityFolderIdChanged(newValue,oldValue){if(newValue){this.set("communityFolder",null);this.set("featuredCommunities",null);this.set("activeCommuntities",null);this.set("archivedCommunities",null);this._getCommunityFolder()}},_getCommunityFolder:function _getCommunityFolder(){this.$$("#ajax").url="/api/communities/"+this.communityFolderId+"/communityFolders";this.$$("#ajax").retryMethodAfter401Login=this._getCommunityFolder.bind(this);this.$$("#ajax").generateRequest()},_refreshAjax:function _refreshAjax(){this.async(function(){this.$$("#ajax").generateRequest()},100)},_newCommunity:function _newCommunity(){window.appGlobals.activity("open","newCommunity");dom(document).querySelector("yp-app").getDialogAsync("communityEdit",function(dialog){dialog.setup(null,!0,this._refreshAjax.bind(this));dialog.open("new",{domainId:this.domainId,communityFolderId:this.communityFolderId})}.bind(this))},_pagesResponse:function _pagesResponse(event,detail){this.fire("yp-set-pages",detail.response)},_response:function _response(event,detail,sender){this.set("communityFolder",detail.response);if(!this.communityFolder.is_community_folder){this.redirectTo("/community/"+this.community.id)}else{this.refresh();this.set("createFabIcon",null);var url=this._communityHeaderUrl(this.communityFolder);this.setupCommunities(this.communityFolder.Communities)}},_gotAdminRights:function _gotAdminRights(event,detail){if(detail&&0<detail){if(this.checkCommunityAccess(this.communityFolder)){this.set("createFabIcon","add")}}},refresh:function refresh(){if(this.communityFolder){this.fire("yp-set-home-link",{type:"communityFolder",id:this.communityFolder.id,name:this.communityFolder.name});if(null!=this.communityFolder.theme_id){this.setTheme(this.communityFolder.theme_id)}else if(null!=this.communityFolder.Domain.theme_id){this.setTheme(this.communityFolder.Domain.theme_id)}if(null!=this.communityFolder.default_locale){window.appGlobals.changeLocaleIfNeeded(this.communityFolder.default_locale)}if(this.communityFolder.CommunityHeaderImages&&0<this.communityFolder.CommunityHeaderImages.length){this.$.page.setupTopHeaderImage(this.communityFolder.CommunityHeaderImages)}else{this.$.page.setupTopHeaderImage(null)}if(-1<window.location.href.indexOf("/community_folder")){var backPath,headerTitle,headerDescription;if(this.communityFolder.CommunityFolder){backPath="/community_folder/"+this.communityFolder.CommunityFolder.id;headerTitle=this.communityFolder.CommunityFolder.name;headerDescription=this.communityFolder.CommunityFolder.description}else{backPath="/domain/"+this.communityFolder.domain_id;headerTitle=this.communityFolder.Domain.name;headerDescription=this.communityFolder.Domain.description}this.fire("change-header",{headerTitle:headerTitle,headerDescription:headerDescription,headerIcon:"group-work",disableDomainUpLink:!1,documentTitle:this.communityFolder.name,backPath:backPath})}this.$.pagesAjax.url="/api/domains/"+this.communityFolder.Domain.id+"/pages";this.$.pagesAjax.generateRequest();window.appGlobals.setAnonymousGroupStatus(null);window.appGlobals.disableFacebookLoginForGroup=!1;window.appGlobals.externalGoalTriggerUrl=null;window.appGlobals.currentGroupForceSaml=!1;window.appGlobals.currentGroup=null;if(this.communityFolder.configuration&&this.communityFolder.configuration.signupTermsPageId&&-1!=this.communityFolder.configuration.signupTermsPageId){window.appGlobals.signupTermsPageId=this.communityFolder.configuration.signupTermsPageId}else{window.appGlobals.signupTermsPageId=null}}}});