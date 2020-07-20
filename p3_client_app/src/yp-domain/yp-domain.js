import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import 'lite-signal/lite-signal.js';
import '@polymer/paper-tabs/paper-tab.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { CollectionHelpers } from '../yp-behaviors/collection-helpers.js';
import { AccessHelpers } from '../yp-behaviors/access-helpers.js';
import { ypLoggedInUserBehavior } from '../yp-behaviors/yp-logged-in-user-behavior.js';
import { YpNewsTabSelected } from '../yp-behaviors/yp-news-tab-selected.js';
import { ypDetectOldiOs } from '../yp-behaviors/yp-detect-old-ios.js';
import { ypGotoBehavior } from '../yp-behaviors/yp-goto-behavior.js';
import { ypThemeBehavior } from '../yp-theme/yp-theme-behavior.js';
import { CommunityCollectionBehaviors } from '../yp-community/yp-community-collection-behaviors.js';
import '../ac-activities/ac-activities.js';
import '../yp-ajax/yp-ajax.js';
import '../yp-page/yp-page.js';
import '../yp-community/yp-community-grid.js';
import './yp-domain-large-card.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment">
      ac-activities {
        @apply --layout-vertical;
        @apply --layout-flex;
      }

      .card-container {
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      .card {
        padding: 16px;
      }

      @media (max-width: 330px) {
        .card {
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 8px;
          padding-top: 8px;
        }

        .card-container {
          padding: 0;
          margin: 0;
        }
      }

      yp-ajax {
        background-color: var(--primary-background-color);
      }

      .twitterFeed {
        margin-top: 24px;
      }

      .archivedText {
        font-size: 26px;
        color: #333;
      }

      .ypBottomContainer {
        @apply --layout-horizontal;
        @apply --layout-center-center;
      }

      :host {
        display: block;
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

    <yp-page id="page"  role="main" aria-label="[[t('communities')]]" create-fab-icon="[[createFabIcon]]" create-fab-title="[[t('community.add')]]" on-yp-create-fab-tap="_newCommunity">

      <yp-domain-large-card id="domainCard" slot="largeCard" class="largeCard card" domain="[[domain]]" on-update-domain="_refreshAjax"></yp-domain-large-card>

      <paper-tabs id="paper_tabs" apple\$="[[isOldiOs]]" slot="tabs" class="tabs" selected="{{selectedTab}}" attr-for-selected="name" focused="">
        <paper-tab name="communities" class="tab"><span>[[t('communities')]]</span> &nbsp; (<span>[[communitiesLength]]</span>)</paper-tab>
        <paper-tab name="news" class="tab" hidden\$="[[domain.configuration.hideDomainNews]]">[[t('news')]]</paper-tab>
      </paper-tabs>

      <iron-pages class="tabPages" fullbleed="" slot="tabPages" selected="{{selectedTab}}" attr-for-selected="name" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
        <section name="communities" class="layout vertical">
          <div class="card-container layout center-center wrap">
            <yp-community-grid id="communityGrid" featured-communities="[[featuredCommunities]]" active-communities="[[activeCommunities]]" archived-communities="[[archivedCommunities]]" hide-add\$="[[!createFabIcon]]" on-add-new-community="_newCommunity">
            </yp-community-grid>
          </div>
        </section>
        <section name="news" class="minHeightSection">
          <template is="dom-if" if="[[newsTabSelected]]">
            <ac-activities id="domainNews" selected-tab="[[selectedTab]]" domain-id="[[domain.id]]"></ac-activities>
          </template>
        </section>
      </iron-pages>
    </yp-page>

    <lite-signal on-lite-signal-yp-language="_languageEvent"></lite-signal>
    <lite-signal on-lite-signal-logged-in="_userLoggedIn"></lite-signal>

    <app-route route="{{idRoute}}" pattern="/:id" data="{{idRouteData}}" tail="{{tabRoute}}">
    </app-route>

    <app-route route="{{tabRoute}}" pattern="/:tabName" data="{{tabRouteData}}">
    </app-route>

    <div class="ypBottomContainer">
      <yp-ajax id="ajax" url="[[url]]" on-response="_response"></yp-ajax>
      <yp-ajax id="pagesAjax" on-response="_pagesResponse"></yp-ajax>
    </div>
`,

  is: 'yp-domain',

  behaviors: [
    ypLanguageBehavior,
    ypThemeBehavior,
    CommunityCollectionBehaviors,
    CollectionHelpers,
    AccessHelpers,
    YpNewsTabSelected,
    ypLoggedInUserBehavior,
    ypDetectOldiOs,
    ypGotoBehavior
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

    domainId: {
      type: Number,
      value: null,
      observer: "_domainIdChanged"
    },

    url: {
      type: String
    },

    domainEmpty: {
      type: Boolean,
      value: false
    },

    domain: {
      type: Object
    },

    selectedTab: {
      type: String,
      value: 'communities',
      observer: '_selectedTabChanged'
    },

    otherSocialMediaActive: {
      type: Boolean,
      value: false
    },

    isOldiOs: {
      type: Boolean,
      computed: '_isOldiOs(domainId)'
    },

    disableRefreshOnce: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_routeIdChanged(idRouteData.id)',
    '_routeTabChanged(tabRouteData.tabName)'
  ],

  listeners: {
    'yp-new-community': '_newCommunity',
    'yp-new-community-folder': '_newCommunityFolder'
  },

  scrollToCommunityItem: function () {
    if (this.selectedTab==="news" && window.appGlobals.cachedActivityItem!==null) {
      var list = this.$$("#domainNews");
      if (list) {
        list.scrollToItem(window.appGlobals.cachedActivityItem);
        window.appGlobals.cachedActivityItem = null;
      } else {
        console.warn("No domain activities for scroll to item");
      }
    } else if (this.selectedTab==="communities") {
      if (window.appGlobals.backToDomainCommunityItems &&
        window.appGlobals.backToDomainCommunityItems[this.domain.id]) {
        this.$.communityGrid.scrollToItem(window.appGlobals.backToDomainCommunityItems[this.domain.id]);
        window.appGlobals.backToDomainCommunityItems[this.domain.id] = null;
      }
    }
  },

  _userLoggedIn: function (user) {
    if (user) {
      if (this.domain && window.location.href.indexOf("/domain/") > -1) {
        this.$.ajax.generateRequest();
      }
    }
  },

  _routeIdChanged: function (newId) {
    if (newId) {
      this.set('domainId', newId);
    }
  },

  _routeTabChanged: function (newTabName) {
    if (newTabName) {
      this.set('selectedTab', newTabName);
    }
  },

  _selectedTabChanged: function (tabName) {
    if (tabName=='other_social_media') {
      this.set('otherSocialMediaActive', true);
    } else {
      this.set('otherSocialMediaActive', false);
    }

    if (this.domain) {
      this.redirectTo("/domain/" + this.domain.id + '/' + tabName);
    }

    if (tabName && window.appGlobals) {
      window.appGlobals.activity('open', 'domain_tab_'+tabName);
    }

    this.async(function () {
      var news = this.$$("#domainNews");
      if (news) {
        news.fireResize();
      }
    }, 300);
  },

  _domainIdChanged: function (newValue, oldValue) {
    if (newValue) {
      this.set("featuredCommunities",null);
      this.set("activeCommunities",null);
      this.set("archivedCommunities",null);
      this.$.ajax.url = '/api/domains/' + this.domainId;
      this.$.ajax.generateRequest();
    }
  },

  _refreshAjax: function () {
    this.async(function () {
      this.$.ajax.generateRequest();
    }, 100);
  },

  _refreshAjaxLimited: function () {
    this.set('disableRefreshOnce', true);
    this._refreshAjax();
  },

  _newCommunity: function () {
    window.appGlobals.activity('open', 'newCommunity');
    dom(document).querySelector('yp-app').getDialogAsync("communityEdit", function (dialog) {
      dialog.setup(null, true, this._refreshAjaxLimited.bind(this));
      dialog.open('new', {domainId: this.domainId} );
    }.bind(this));
  },

  _newCommunityFolder: function () {
    window.appGlobals.activity('open', 'newCommunityFolder');
    dom(document).querySelector('yp-app').getDialogAsync("communityEdit", function (dialog) {
      dialog.setup(null, true, this._refreshAjaxLimited.bind(this), true);
      dialog.open('new', {domainId: this.domainId} );
    }.bind(this));
  },

  _pagesResponse: function (event, detail) {
    this.fire('yp-set-pages', detail.response);
  },

  _response: function (event, detail, sender) {
    console.log("Got domain response: "+detail.response.id);

    this.set('domain', detail.response);

    window.appGlobals.domain = this.domain;

    if (this.disableRefreshOnce) {
      this.set('disableRefreshOnce', false);
    } else {
      this.refresh();
    }

    if (!this.domain.only_admins_can_create_communities || this.checkDomainAccess(this.domain)) {
      this.set('createFabIcon', 'group-work');
    }

    window.appGlobals.setupGoogleAnalytics(this.domain);

    if (this.domain.Communities) {
      this.setupCommunities(__.dropRight(this.domain.Communities, this.domain.Communities.length-500));
    }

    this.$.domainCard.setElevation(5);
    this.$.domainCard.lowerCardLater();
  },

  refresh: function () {
    if (this.domain) {
      if (this.domain.default_locale!=null) {
        window.appGlobals.changeLocaleIfNeeded(this.domain.default_locale);
      }

      if (this.domain.theme_id!=null) {
        this.setTheme(this.domain.theme_id);
      }
      this.fire('yp-set-home-link', { type: 'domain', id: this.domain.id, name: this.domain.name });
      this.fire("change-header", { headerTitle: null, documentTitle: this.domain.name,
                                   headerDescription: this.domain.description});
      if (this.domain.DomainHeaderImages && this.domain.DomainHeaderImages.length>0) {
        this.$.page.setupTopHeaderImage(this.domain.DomainHeaderImages);
      } else {
        this.$.page.setupTopHeaderImage(null);
      }

      this.$.pagesAjax.url = "/api/domains/"+this.domain.id+"/pages";
      this.$.pagesAjax.generateRequest();
    }
    window.appGlobals.setAnonymousGroupStatus(null);
    window.appGlobals.disableFacebookLoginForGroup = false;
    window.appGlobals.externalGoalTriggerUrl = null;
    window.appGlobals.currentGroupForceSaml = false;
    window.appGlobals.currentGroup = null;
  }
});
