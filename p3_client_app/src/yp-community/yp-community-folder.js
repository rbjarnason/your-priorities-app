import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import 'lite-signal/lite-signal.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/app-route/app-route.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { CollectionHelpers } from '../yp-behaviors/collection-helpers.js';
import { ypLoggedInUserBehavior } from '../yp-behaviors/yp-logged-in-user-behavior.js';
import { ypDetectOldiOs } from '../yp-behaviors/yp-detect-old-ios.js';
import { ypGotoBehavior } from '../yp-behaviors/yp-goto-behavior.js';
import { ypMediaFormatsBehavior } from '../yp-behaviors/yp-media-formats-behavior.js';
import '../ac-activities/ac-activities.js';
import { ypThemeBehavior } from '../yp-theme/yp-theme-behavior.js';
import '../yp-ajax/yp-ajax.js';
import '../yp-page/yp-page.js';
import { CommunityCollectionBehaviors } from './yp-community-collection-behaviors.js';
import './yp-community-grid.js';
import './yp-community-header.js';
import './yp-community-large-card.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { AccessHelpers } from '../yp-behaviors/access-helpers.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment">
      .card-container {
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      .card {
        padding: 16px;
      }

      yp-ajax {
        background-color: var(--primary-background-color) !important;
      }

      .archivedText {
        font-size: 26px;
        color: #333;
      }

      .minHeightSection {
        min-height: 450px;
      }

      #paper_tabs[apple] {
        margin-top: 42px;
        margin-bottom: 8px;
      }

      [hidden] {
        display: none !important;
      }
    </style>

    <yp-page id="page" create-fab-icon="[[createFabIcon]]" hide-all-tabs="" create-fab-title="[[t('group.add')]]" on-yp-create-fab-tap="_newGroup">

      <yp-community-large-card id="communityCard" slot="largeCard" class="largeCard card" community="[[communityFolder]]" on-update-community="_refreshAjax"></yp-community-large-card>

      <div class="layout horizontal center-center wrap" slot="tabPages">
        <yp-community-grid featured-communities="[[featuredCommunities]]" active-communities="[[activeCommunities]]" archived-communities="[[archivedCommunities]]" hide-add\$="[[!createFabIcon]]" on-add-new-community="_newCommunity">
        </yp-community-grid>
      </div>
    </yp-page>

    <lite-signal on-lite-signal-yp-language="_languageEvent"></lite-signal>
    <lite-signal on-lite-signal-logged-in="_userLoggedIn"></lite-signal>
    <lite-signal on-lite-signal-got-admin-rights="_gotAdminRights"></lite-signal>

    <app-route route="{{idRoute}}" pattern="/:id" data="{{idRouteData}}" tail="{{tabRoute}}">
    </app-route>

    <app-route route="{{tabRoute}}" pattern="/:tabName" data="{{tabRouteData}}">
    </app-route>

    <yp-ajax id="ajax" url="/api/domains" on-response="_response"></yp-ajax>
    <yp-ajax id="pagesAjax" on-response="_pagesResponse"></yp-ajax>
`,

  is: 'yp-community-folder',

  behaviors: [
    ypLanguageBehavior,
    CommunityCollectionBehaviors,
    ypThemeBehavior,
    CollectionHelpers,
    AccessHelpers,
    ypLoggedInUserBehavior,
    ypDetectOldiOs,
    ypGotoBehavior,
    ypMediaFormatsBehavior
  ],

  properties: {

    idRoute: Object,
    tabRoute: Object,
    idRouteData: Object,
    tabRouteData: Object,

    createFabIcon: {
      type: String,
      value: null,
      notify: true
    },

    communityFolderId: {
      type: Number,
      value: null,
      observer: "_communityFolderIdChanged"
    },

    communityFolder: {
      type: Object
    },

    mapActive: {
      type: Boolean,
      value: false
    },

    locationHidden: {
      type: Boolean,
      value: false
    },

    useAlternativeHeader: {
      type: Boolean,
      value: false
    },

    isOldiOs: {
      type: Boolean,
      computed: '_isOldiOs(communityFolderId)'
    },

    useNormalHeader: {
      type: Boolean,
      value: true
    }
  },

  observers: [
    '_routeIdChanged(idRouteData.id)'
  ],

  listeners: {
    'yp-new-group': '_newGroup'
  },

  _userLoggedIn: function (user) {
    if (user) {
      if (this.communityFolder && window.location.href.indexOf("/community_folder/") > -1) {
        this.$$('#ajax').generateRequest();
      }
    }
  },

  _routeIdChanged: function (newId) {
    if (newId) {
      this.set('communityFolderId', newId);
    }
  },

  _hideEdit: function () {
    if (!this.communityFolder)
      return true;

    if (!window.appUser.loggedIn())
      return true;

    return (window.appUser.user.id!=this.communityFolder.user_id);
  },

  _communityHeaderUrl: function (communityFolder) {
    return this.getImageFormatUrl(communityFolder.CommunityHeaderImages, 2);
  },

  _communityFolderIdChanged: function (newValue, oldValue) {
    if (newValue) {
      this.set("communityFolder", null);
      this.set("featuredCommunities",null);
      this.set("activeCommuntities",null);
      this.set("archivedCommunities",null);
      this._getCommunityFolder();
    }
  },

  _getCommunityFolder: function () {
    this.$$('#ajax').url = '/api/communities/' + this.communityFolderId + '/communityFolders';
    this.$$('#ajax').retryMethodAfter401Login = this._getCommunityFolder.bind(this);
    this.$$('#ajax').generateRequest();
  },

  _refreshAjax: function () {
    this.async(function () {
      this.$$('#ajax').generateRequest();
    }, 100);
  },

  _newCommunity: function () {
    window.appGlobals.activity('open', 'newCommunity');
    dom(document).querySelector('yp-app').getDialogAsync("communityEdit", function (dialog) {
      dialog.setup(null, true, this._refreshAjax.bind(this));
      dialog.open('new', {domainId: this.domainId, communityFolderId: this.communityFolderId } );
    }.bind(this));
  },

  _pagesResponse: function (event, detail) {
    this.fire('yp-set-pages', detail.response);
  },

  _response: function (event, detail, sender) {
    this.set('communityFolder', detail.response);

    if (!this.communityFolder.is_community_folder) {
      this.redirectTo("/community/"+this.community.id);
    } else {
      this.refresh();

      this.set('createFabIcon', null);

      /*if (false && !this.communityFolder.Domain.only_admins_can_create_communities || this.checkDomainAccess(this.communityFolder.Domain)) {
        this.set('createFabIcon', 'group-work');
      } else {
      }*/

      var url = this._communityHeaderUrl(this.communityFolder);

      this.setupCommunities(this.communityFolder.Communities);
    }
  },

  _gotAdminRights: function (event, detail) {
    if (detail && detail>0) {
      if (this.checkCommunityAccess(this.communityFolder)) {
        this.set('createFabIcon', 'add');
      }
    }
  },

  refresh: function () {
    if (this.communityFolder) {
      this.fire('yp-set-home-link', { type: 'communityFolder', id: this.communityFolder.id, name: this.communityFolder.name });

      if (this.communityFolder.theme_id!=null) {
        this.setTheme(this.communityFolder.theme_id);
      } else if (this.communityFolder.Domain.theme_id!=null) {
        this.setTheme(this.communityFolder.Domain.theme_id);
      }

      if (this.communityFolder.default_locale!=null) {
        window.appGlobals.changeLocaleIfNeeded(this.communityFolder.default_locale);
      }

      if (this.communityFolder.CommunityHeaderImages && this.communityFolder.CommunityHeaderImages.length>0) {
        this.$.page.setupTopHeaderImage(this.communityFolder.CommunityHeaderImages);
      } else {
        this.$.page.setupTopHeaderImage(null);
      }

      if (window.location.href.indexOf("/community_folder") > -1) {
        var backPath, headerTitle, headerDescription;
        if (this.communityFolder.CommunityFolder) {
          backPath = "/community_folder/" + this.communityFolder.CommunityFolder.id;
          headerTitle = this.communityFolder.CommunityFolder.name;
          headerDescription = this.communityFolder.CommunityFolder.description;
        } else {
          backPath = "/domain/" + this.communityFolder.domain_id;
          headerTitle = this.communityFolder.Domain.name;
          headerDescription = this.communityFolder.Domain.description;
        }
        this.fire("change-header", {
          headerTitle: headerTitle,
          headerDescription: headerDescription,
          headerIcon: "group-work",
          disableDomainUpLink: false,
          documentTitle: this.communityFolder.name,
          backPath: backPath
        });
      }
      this.$.pagesAjax.url = "/api/domains/"+this.communityFolder.Domain.id+"/pages";
      this.$.pagesAjax.generateRequest();
      window.appGlobals.setAnonymousGroupStatus(null);
      window.appGlobals.disableFacebookLoginForGroup = false;
      window.appGlobals.externalGoalTriggerUrl = null;
      window.appGlobals.currentGroupForceSaml = false;
      window.appGlobals.currentGroup = null;

      if (this.communityFolder.configuration && this.communityFolder.configuration.signupTermsPageId &&
        this.communityFolder.configuration.signupTermsPageId!=-1) {
        window.appGlobals.signupTermsPageId = this.communityFolder.configuration.signupTermsPageId;
      } else {
        window.appGlobals.signupTermsPageId = null;
      }
    }
  }
});
