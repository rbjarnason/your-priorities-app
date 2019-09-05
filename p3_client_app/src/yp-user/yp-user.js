import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import 'lite-signal/lite-signal.js';
import '@polymer/paper-tabs/paper-tab.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { CollectionHelpers } from '../yp-behaviors/collection-helpers.js';
import { ypThemeBehavior } from '../yp-theme/yp-theme-behavior.js';
import { ypGotoBehavior } from '../yp-behaviors/yp-goto-behavior.js';
import '../ac-activities/ac-activities.js';
import '../yp-ajax/yp-ajax.js';
import { GroupCollectionBehaviors } from '../yp-group/yp-group-collection-behaviors.js';
import { CommunityCollectionBehaviors } from '../yp-community/yp-community-collection-behaviors.js';
import './yp-user-large-card.js';
import '../yp-bulk-status-update/yp-bulk-status-display.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
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

      [hidden] {
        display: none !important;
      }
    </style>
    <lite-signal on-lite-signal-yp-language="_languageEvent"></lite-signal>

    <app-route route="{{idRoute}}" pattern="/:id" data="{{idRouteData}}" tail="{{tabRoute}}">
    </app-route>

    <app-route route="{{tabRoute}}" pattern="/:tabName" data="{{tabRouteData}}" tail="{{statusUpdateRoute}}">
    </app-route>

    <app-route route="{{statusUpdateRoute}}" pattern="/:statusUpdateId" data="{{statusUpdateRouteData}}">
    </app-route>

    <yp-user-large-card hidden="" id="userCard" class="largeCard card" user="[[user]]" on-update-domain="_refresh"></yp-user-large-card>

    <paper-tabs hidden="" id="paper_tabs" class="tabs" selected="{{selected}}" focused="">
      <paper-tab class="tab">[[t('news')]]</paper-tab>
      <paper-tab class="tab"><span>[[t('communities')]]</span> &nbsp; (<span>[[communitiesLength]]</span>)</paper-tab>
      <paper-tab class="tab"><span>[[t('groups')]]</span> &nbsp; (<span>[[groupsLength]]</span>)</paper-tab>
      <paper-tab class="tab">
        <div class="layout vertical center-center tabCounterContainer">
          <span>[[t('posts.posts')]]</span><div class="counterInfo" id="tabCount"></div>
        </div>
      </paper-tab>
    </paper-tabs>

    <iron-pages class="tabPages" selected="{{selectedTab}}" attr-for-selected="name" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
      <section name="status_updates">
        <yp-bulk-status-display user-id\$="[[userId]]" status-update-id\$="[[statusUpdateId]]"></yp-bulk-status-display>
      </section>
      <section name="status_updates_templates">
        <yp-bulk-status-display by-template="" user-id\$="[[userId]]" status-update-id\$="[[statusUpdateId]]"></yp-bulk-status-display>
      </section>
      <section>
        <ac-activities selected-tab="[[selectedTab]]" user-id="[[user.id]]"></ac-activities>
      </section>
      <section>
        <template>
          <div class="layout horizontal center-center">
            <yp-post-list id="postList" selected-tab="[[selected]]" status-filter="open" tab-counter-id="tabCount" searching-for="[[searchingFor]]" group="[[group]]" group-id="[[groupId]]"></yp-post-list>
          </div>

        </template>
      </section>
    </iron-pages>

    <yp-ajax id="ajax" url="[[url]]" on-response="_response"></yp-ajax>
    <yp-ajax id="pagesAjax" on-response="_pagesResponse"></yp-ajax>
`,

  is: 'yp-user',

  behaviors: [
    ypLanguageBehavior,
    ypThemeBehavior,
    CollectionHelpers,
    CommunityCollectionBehaviors,
    GroupCollectionBehaviors,
    ypGotoBehavior
  ],

  properties: {

    idRoute: {
      type: Object
    },

    tabRoute: Object,
    statusUpdateRoute: Object,
    idRouteData: Object,
    tabRouteData: Object,
    statusUpdateRouteData: Object,

    userId: {
      type: Number,
      value: null,
      observer: "_userIdChanged"
    },

    url: {
      type: String
    },

    domainEmpty: {
      type: Boolean,
      value: false
    },

    selectedTab: {
      type: String,
      value: null
    },

    user: {
      type: Object
    },

    statusUpdateId: String,

    selected: {
      type: Number,
      value: 0,
      observer: '_selectedChanged'
    },

    userTabName: {
      type: String,
      value: null,
      observer: '_tabNameChanged'
    }
  },

  observers: [
    '_routeIdChanged(idRouteData.id)',
    '_routeTabChanged(tabRouteData.tabName)',
    '_routeStatusUpdateChanged(statusUpdateRouteData.statusUpdateId)'
  ],

  _routeIdChanged: function (newId) {
    if (newId) {
      this.set('userId', newId);
    }
  },

  _routeTabChanged: function (newTabName) {
    if (newTabName) {
      this.set('selectedTab', newTabName);
    } else if (newTabName && this._isNumber(newTabName)) {
      this.set('scrollToPointId', newTabName);
      this.set('selectedTab', 'debate');
    }
  },

  _routeStatusUpdateChanged: function (statusUpdateId) {
    if (statusUpdateId) {
      this.set('statusUpdateId', statusUpdateId);
    }
  },

  _tabNameChanged: function (newValue) {
    if (newValue) {
      if (newValue=='communities') {
        this.set('selected', 0);
      } else if (newValue=='news') {
        this.set('selected', 1);
      } else if (newValue=='other_social_media') {
        this.set('selected', 2);
      }
    }
  },

  _selectedChanged: function (newValue) {
    if (this.user) {
      if (newValue == 0) {
        this.redirectTo("/user/" + this.user.id + '/news');
      } else if (newValue == 1) {
        this.redirectTo("/user/" + this.user.id + '/communities');
      } else if (newValue == 2) {
        this.redirectTo("/user/" + this.user.id + '/groups');
      } else if (newValue == 3) {
        this.redirectTo("/user/" + this.user.id + '/posts');
      }
    }
  },

  _userIdChanged: function (newValue, oldValue) {
    if (newValue) {
      this.set("featuredCommunities",null);
      this.set("activeCommunities",null);
      this.set("archivedCommunities",null);
      this.set("featuredGroups",null);
      this.set("activeGroups",null);
      this.set("archivedGroups",null);
      this.$.ajax.url = '/api/users/' + this.userId;
      this.$.ajax.generateRequest();
    }
  },

  _refresh: function () {
    this.$.ajax.generateRequest();
  },

  _response: function (event, detail, sender) {
    this.set('user', detail.response);
    if (this.user) {
      if (this.user.theme_id!=null) {
        this.setTheme(this.user.theme_id);
      }

      if (this.user.UserHeaderImages && this.user.UserHeaderImages.length>0) {
        this.$.page.setupTopHeaderImage(this.user.UserHeaderImages);
      }
      this.setupCommunities(this.user.CommunityUsers);
      this.setupGroups(this.user.GroupUsers);

      //   this.$.userCard.setElevation(5);
      //   this.$.userCard.lowerCardLater();

      this.fire("change-header", { historyBack: true });
      window.appGlobals.setAnonymousGroupStatus(null);
      window.appGlobals.disableFacebookLoginForGroup = false;
    }
  }
});