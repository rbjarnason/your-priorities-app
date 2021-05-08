import { YpAccessHelpers } from '../common/YpAccessHelpers.js';
import { YpMediaHelpers } from '../common/YpMediaHelpers.js';

import { YpCollection } from './yp-collection.js';
import { YpCollectionItemsGrid } from './yp-collection-items-grid.js';
import { customElement, html, property, LitElement } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';

import '@material/mwc-tab';
import '@material/mwc-tab-bar';

import '../yp-post/yp-posts-list.js';
import '../yp-post/yp-post-card-add.js';
import { YpPostsList } from '../yp-post/yp-posts-list.js';
import { YpPostEdit } from '../yp-post/yp-post-edit.js';

// TODO: Remove
interface AcActivity extends LitElement {
  scrollToItem(item: YpDatabaseItem): () => void;
  loadNewData(): () => void;
}

export const GroupTabTypes: Record<string, number> = {
  Open: 0,
  InProgress: 1,
  Successful: 2,
  Failed: 3,
  Newsfeed: 4,
  Map: 5,
};

@customElement('yp-group')
export class YpGroup extends YpCollection {
  @property({ type: String })
  searchingFor: string | undefined;

  @property({ type: Boolean })
  hasNonOpenPosts = false;

  @property({ type: Boolean })
  disableNewPosts = false;

  @property({ type: Number })
  selectedGroupTab = GroupTabTypes.Open;

  haveGotTabCountInfoCount = 0;
  tabCounters: Record<string, number> = {};

  constructor() {
    super('group', 'post', 'lightbulb_outline', 'post.create');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addListener('yp-post-count', this._updateTabPostCount);
    this.addListener(
      'yp-refresh-activities-scroll-threshold',
      this._clearScrollThreshold
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListener('yp-post-count', this._updateTabPostCount);
    this.removeListener(
      'yp-refresh-activities-scroll-threshold',
      this._clearScrollThreshold
    );
  }

  _updateTabPostCount(event: CustomEvent) {
    const tabCounterInfo = event.detail;
    this.tabCounters[tabCounterInfo.type] = tabCounterInfo.count;

    this.haveGotTabCountInfoCount += 1;

    this._setupOpenTab();

    setTimeout(() => {
      this.requestUpdate();
    });
  }

  _setupOpenTab() {
    if (this.hasNonOpenPosts) {
      if (this.haveGotTabCountInfoCount == 4) {
        //TODO: Fix this logic of selecting a group with some ideas after we get the new counts from the server
        if (this.selectedGroupTab === GroupTabTypes.Open) {
          if (this.tabCounters['open'] && this.tabCounters['open'] > 0) {
            this.selectedGroupTab = GroupTabTypes.Open;
          } else if (
            this.tabCounters['inProgress'] &&
            this.tabCounters['inProgress'] > 0
          ) {
            this.selectedGroupTab = GroupTabTypes.InProgress;
          } else if (
            this.tabCounters['successful'] &&
            this.tabCounters['successful'] > 0
          ) {
            this.selectedGroupTab = GroupTabTypes.Successful;
          } else if (
            this.tabCounters['failed'] &&
            this.tabCounters['failed'] > 0
          ) {
            this.selectedGroupTab = GroupTabTypes.Failed;
          }
        }
      }
    }
  }

  tabLabelWithCount(type: string): string {
    const labelTranslation = this.t('posts.' + type);
    if (type === 'inProgress') type = 'in_progress';

    return `${labelTranslation} (${
      this.tabCounters[type] != undefined ? this.tabCounters[type] : '...'
    })`;
  }

  getCurrentTabElement(): HTMLElement | undefined {
    let element: HTMLElement | undefined | null;

    switch (this.selectedGroupTab) {
      case GroupTabTypes.Open:
        element = this.$$('#openPostList');
        break;
      case GroupTabTypes.InProgress:
        element = this.$$('#in_progressPostList');
        break;
      case GroupTabTypes.Successful:
        element = this.$$('#successfulPostList');
        break;
      case GroupTabTypes.Failed:
        element = this.$$('#failedPostList');
        break;
      case GroupTabTypes.Newsfeed:
        element = this.$$('#newsfeed');
        break;
      case GroupTabTypes.Map:
        element = this.$$('#postMap');
        break;
    }

    if (element === null) element = undefined;

    return element;
  }

  async _getCollection() {
    window.appGlobals.retryMethodAfter401Login = this._getCollection.bind(this);
    this.hasNonOpenPosts = false;
    this.haveGotTabCountInfoCount = 0;
    this.tabCounters = {};

    if (
      this.collectionId &&
      window.appGlobals.cache.groupItemsCache[this.collectionId]
    ) {
      this.collection =
        window.appGlobals.cache.groupItemsCache[this.collectionId];
      this.refresh();
    } else if (this.collectionId) {
      this.collection = undefined;
      this.collectionItems = undefined;
      const groupResults = (await window.serverApi.getCollection(
        this.collectionType,
        this.collectionId
      )) as YpGroupResults | undefined;
      if (groupResults) {
        this.collection = groupResults.group;
        this.hasNonOpenPosts = groupResults.hasNonOpenPosts;
        this.refresh();
      }
    }
    window.appGlobals.retryMethodAfter401Login = undefined;
  }

  //TODO: Fix moving on to the next group with focus if 0 ideas in Open
  renderGroupTabs() {
    if (this.collection && !this.tabsHidden) {
      return html`
        <div class="layout vertical center-center">
          <mwc-tab-bar @MDCTabBar:activated="${this._selectGroupTab}">
            <mwc-tab
              .label="${this.tabLabelWithCount('open')}"
              icon="lightbulb_outline"></mwc-tab>
            ${ this.hasNonOpenPosts ? html`
              <mwc-tab
                .label="${this.tabLabelWithCount('inProgress')}"
                icon="lightbulb_outline"></mwc-tab>
              <mwc-tab
                .label="${this.tabLabelWithCount('successful')}"
                icon="lightbulb_outline"></mwc-tab>
              <mwc-tab
                .label="${this.tabLabelWithCount('failed')}"
                icon="lightbulb_outline">
              </mwc-tab>
            ` : nothing}
            ${this.renderNewsAndMapTabs()}
          </mwc-tab-bar>
        </div>
      `;
    } else {
      return nothing;
    }
  }

  renderPostList(statusFilter: string): TemplateResult {
    return this.collection
      ? html`<div class="layout vertical center-center">
          <yp-posts-list
            id="${statusFilter}PostList"
            role="main"
            aria-label="${this.t('posts.posts')}"
            .selectedGroupTab="${this.selectedGroupTab}"
            .listRoute="${this.subRoute}"
            .statusFilter="${statusFilter}"
            .searchingFor="${this.searchingFor}"
            .group="${this.collection as YpGroupData}"></yp-posts-list>
        </div> `
      : html``;
  }

  renderCurrentGroupTabPage(): TemplateResult | undefined {
    let page: TemplateResult | undefined;

    switch (this.selectedGroupTab) {
      case GroupTabTypes.Open:
        page = this.renderPostList('open');
        break;
      case GroupTabTypes.InProgress:
        page = this.renderPostList('in_progress');
        break;
      case GroupTabTypes.Successful:
        page = this.renderPostList('successful');
        break;
      case GroupTabTypes.Failed:
        page = this.renderPostList('failed');
        break;
      case GroupTabTypes.Newsfeed:
        page = html` <ac-activities
          id="newsfeed"
          .selectedGroupTab="${this.selectedGroupTab}"
          .collectionType="${this.collectionType}"
          .collectionId="${this.collectionId}"></ac-activities>`;
        break;
      case GroupTabTypes.Map:
        page = html``;
        break;
    }

    return page;
  }

  render() {
    return html`
      ${this.renderHeader()}
      ${this.collection &&
      !(this.collection.configuration as YpGroupConfiguration).hideNewPost
        ? html` <div
            class="layout vertical center-center"
            ?hidden="${(this.collection.configuration as YpGroupConfiguration)
              .hideNewPost}">
            <div>
              <yp-post-card-add
                role="button"
                aria-label="${this.t('post.new')}"
                .group="${this.collection as YpGroupData}"
                ?disableNewPosts="${this.disableNewPosts}"
                @new-post="${this._newPost}"></yp-post-card-add>
            </div>
          </div>`
        : nothing}
      ${this.renderGroupTabs()} ${this.renderCurrentGroupTabPage()}
      ${!this.disableNewPosts &&
      this.collection &&
      !(this.collection.configuration as YpGroupConfiguration).hideNewPost
        ? html` <mwc-fab
            .label="${this.t('post.new')}"
            icon="lightbulb"
            @click="${this._newPost}"></mwc-fab>`
        : nothing}
    `;
  }

  _selectGroupTab(event: CustomEvent) {
    this.selectedGroupTab = event.detail.index;
  }

  _openHelpPageIfNeededOnce() {
    if (
      this.collection &&
      !sessionStorage.getItem('yp-welcome-for-group-' + this.collection.id)
    ) {
      setTimeout(() => {
        if (
          this.collection &&
          this.collection.configuration &&
          this.collection.configuration.welcomePageId
        ) {
          this.fire('yp-open-page', {
            pageId: this.collection.configuration.welcomePageId,
          });
          sessionStorage.setItem(
            'yp-welcome-for-group-' + this.collection.id,
            'true'
          );
        }
      }, 1200);
    }
  }

  //TODO: Check this and rename
  _refreshAjax() {
    setTimeout(() => {
      this._getCollection();
      const newsfeed = this.$$('#newsfeed') as AcActivity;
      if (newsfeed) {
        newsfeed.loadNewData();
      }
    }, 100);
  }

  _newPost() {
    window.appGlobals.activity('open', 'newPost');
    //TODO: Fix ts type
    window.appDialogs.getDialogAsync('postEdit', (dialog: YpPostEdit) => {
      dialog.setup(undefined, true, undefined, this.collection as YpGroupData);
      dialog.open(true, {
        groupId: this.collectionId!,
        group: this.collection as YpGroupData,
      });
    });
  }

  _clearScrollThreshold() {
    (this.$$(
      '#scrollTheshold'
    ) as IronScrollThresholdInterface).clearTriggers();
  }

  _setSelectedTabFromRoute(routeTabName: string): void {
    let tabNumber;

    switch (routeTabName) {
      case 'open':
        tabNumber = GroupTabTypes.Open;
        break;
      case 'inProgress':
        tabNumber = GroupTabTypes.InProgress;
        break;
      case 'successfull':
        tabNumber = GroupTabTypes.Successful;
        break;
      case 'failed':
        tabNumber = GroupTabTypes.Failed;
        break;
      case 'news':
        tabNumber = GroupTabTypes.Newsfeed;
        break;
      case 'map':
        tabNumber = GroupTabTypes.Map;
        break;
      default:
        tabNumber = GroupTabTypes.Open;
        break;
    }

    if (tabNumber) {
      this.selectedGroupTab = tabNumber;
      window.appGlobals.activity(
        'open',
        this.collectionType + '_tab_' + routeTabName
      );
    }
  }

  get _isCurrentPostsTab(): boolean {
    return this.selectedGroupTab==GroupTabTypes.Open ||
    this.selectedGroupTab==GroupTabTypes.InProgress ||
    this.selectedGroupTab==GroupTabTypes.Successful ||
    this.selectedGroupTab==GroupTabTypes.Failed
  }

  _loadMoreData() {
    if (this._isCurrentPostsTab) {
      const tab = this.getCurrentTabElement() as YpPostsList;
      if (tab) {
        tab._loadMoreData();
      } else {
        console.error('Cant find tab to load data on' + this.selectedGroupTab);
      }
    } else {
      console.error('Trying to load more data on non posts tab');
    }
  }

  goToPostOrNewsItem() {
    if (this._isCurrentPostsTab) {
       //TODO: See what if this is needed
    } else if (
      this.selectedGroupTab === GroupTabTypes.Newsfeed &&
      window.appGlobals.cache.cachedActivityItem !== undefined
    ) {
      const list = this.$$('#newsfeed') as IronListInterface;
      if (list) {
        list.scrollToItem(window.appGlobals.cache.cachedActivityItem);
        window.appGlobals.cache.cachedActivityItem = undefined;
      } else {
        console.warn('No group activities for scroll to item');
      }
    }
  }

  //TODO: Make sure to capture the caching from this
  /*_groupIdChanged: function (groupId, oldGroupId) {
      if (groupId && groupId!=this.lastValidGroupId) {
        this.set('lastValidGroupId', groupId);
        this.set('group', null);
        this.$.groupCard.resetGroup();
        this.$.tabCountOpen.innerHTML = "";
        if (this.hasNonOpenPosts) {
          this.$$("#tabCountInProgress").innerHTML = "";
          this.$$("#tabCountSuccessful").innerHTML = "";
          this.$$("#tabCountFailed").innerHTML = "";
        }
        this.set('hasNonOpenPosts', false);
        this.set('haveGotTabCountInfoCount', 0);
        this.set('tabCounters', {});
        var groupIdInt = parseInt(groupId);
        if (window.appGlobals.groupItemsCache && window.appGlobals.groupItemsCache[groupIdInt]) {
          this._groupResponse(null, { response: {
              group: window.appGlobals.groupItemsCache[groupIdInt],
              checkServerForNonOpenPosts: true
            }});
          window.appGlobals.groupItemsCache[groupIdInt] = null;
          console.info("Using cache for group id "+groupId);
        } else {
          this._getGroup();
        }
        this.async(function () {
          if (!this.selectedTab || (oldGroupId && this.selectedTab==='map')) {
            this.set('selectedTab', 'open');
            this._setupOpenTab();
          }
        });
      }
  },*/

  refresh() {
    super.refresh();
    const group = this.collection as YpGroupData;

    if (group) {
      this._openHelpPageIfNeededOnce();
      group.configuration = window.appGlobals.overrideGroupConfigIfNeeded(
        group.id,
        group.configuration
      );

      if (group.configuration.canAddNewPosts != undefined) {
        if (group.configuration.canAddNewPosts === true) {
          this.disableNewPosts = false;
        } else {
          this.disableNewPosts = true;
        }
      } else {
        this.disableNewPosts = false;
      }

      setTimeout(async () => {
        const checkResults = (await window.serverApi.getHasNonOpenPosts(
          group.id
        )) as YpGetNonOpenPostsResponse | void;

        if (checkResults) {
          this.hasNonOpenPosts = checkResults.hasNonOpenPosts;
        }
      });

      window.appGlobals.analytics.setCommunityAnalyticsTracker(
        group.Community?.google_analytics_code
      );

      if (group.Community?.configuration) {
        window.appGlobals.analytics.setCommunityPixelTracker(
          group.Community.configuration.facebookPixelId
        );
      }

      if (
        group.theme_id != null ||
        (group.configuration &&
          group.configuration.themeOverrideColorPrimary != null)
      ) {
        window.appGlobals.theme.setTheme(group.theme_id, group.configuration);
      } else if (
        group.Community &&
        (group.Community.theme_id != null ||
          (group.Community.configuration &&
            group.Community.configuration.themeOverrideColorPrimary))
      ) {
        window.appGlobals.theme.setTheme(
          group.Community.theme_id,
          group.Community.configuration
        );
      } else if (
        group.Community &&
        group.Community.Domain &&
        group.Community.Domain.theme_id != null
      ) {
        window.appGlobals.theme.setTheme(group.Community.Domain.theme_id);
      } else {
        window.appGlobals.theme.setTheme(1);
      }

      if (group.configuration.locationHidden) {
        if (group.configuration.locationHidden == true) {
          this.locationHidden = true;
        } else {
          this.locationHidden = false;
        }
      } else {
        this.locationHidden = false;
      }

      if (
        group.configuration.useCommunityTopBanner &&
        group.Community &&
        group.Community.CommunityHeaderImages &&
        group.Community.CommunityHeaderImages.length > 0
      ) {
        YpMediaHelpers.setupTopHeaderImage(
          this,
          group.Community.CommunityHeaderImages
        );
      } else if (
        group.GroupHeaderImages &&
        group.GroupHeaderImages.length > 0
      ) {
        YpMediaHelpers.setupTopHeaderImage(this, group.GroupHeaderImages);
      } else {
        YpMediaHelpers.setupTopHeaderImage(this, null);
      }

      this.fire('yp-change-header', {
        headerTitle: group.configuration.customBackName
          ? group.configuration.customBackName
          : group.Community?.name,
        headerDescription: group.Community?.description,
        headerIcon: 'social:group',
        documentTitle: group.name,
        enableSearch: true,
        hideHelpIcon: group.configuration.hideHelpIcon ? true : null,
        useHardBack: this._useHardBack(group.configuration),
        backPath: group.configuration.customBackURL
          ? group.configuration.customBackURL
          : '/community/' + group.community_id,
      });

      window.appGlobals.setAnonymousGroupStatus(group);

      if (
        group.configuration &&
        group.configuration.disableFacebookLoginForGroup === true
      ) {
        window.appGlobals.disableFacebookLoginForGroup = true;
      } else {
        window.appGlobals.disableFacebookLoginForGroup = false;
      }

      if (group.configuration && group.configuration.externalGoalTriggerUrl) {
        window.appGlobals.externalGoalTriggerGroupId = group.id;
      } else {
        window.appGlobals.externalGoalTriggerGroupId = undefined;
      }

      if (
        group.Community &&
        group.Community.configuration &&
        group.Community.configuration.signupTermsPageId &&
        group.Community.configuration.signupTermsPageId != -1
      ) {
        window.appGlobals.signupTermsPageId =
          group.Community.configuration.signupTermsPageId;
      } else {
        window.appGlobals.signupTermsPageId = undefined;
      }

      this._setupGroupSaml(group);

      window.appGlobals.currentGroup = group;

      if (
        (group.configuration &&
          group.configuration.forceSecureSamlLogin &&
          !YpAccessHelpers.checkGroupAccess(group)) ||
        (group.Community &&
          group.Community.configuration &&
          group.Community.configuration.forceSecureSamlLogin &&
          !YpAccessHelpers.checkCommunityAccess(group.Community))
      ) {
        window.appGlobals.currentForceSaml = true;
      } else {
        window.appGlobals.currentForceSaml = false;
      }
      if (group.configuration && group.configuration.makeMapViewDefault) {
        this.selectedGroupTab = GroupTabTypes.Map;
      }

      if (this.hasNonOpenPosts && this.tabCounters) {
        this._setupOpenTab();
      }

      if (group.configuration && group.configuration.maxNumberOfGroupVotes) {
        window.appUser.calculateVotesLeftForGroup(group);
      }
    }

    window.appGlobals.postLoadGroupProcessing(group);
  }

  _setupGroupSaml(group: YpGroupData) {
    if (
      group.Community &&
      group.Community.configuration &&
      group.Community.configuration.customSamlDeniedMessage
    ) {
      window.appGlobals.currentSamlDeniedMessage =
        group.Community.configuration.customSamlDeniedMessage;
    } else {
      window.appGlobals.currentSamlDeniedMessage = undefined;
    }

    if (
      group.Community &&
      group.Community.configuration &&
      group.Community.configuration.customSamlLoginMessage
    ) {
      window.appGlobals.currentSamlLoginMessage =
        group.Community.configuration.customSamlLoginMessage;
    } else {
      window.appGlobals.currentSamlLoginMessage = undefined;
    }
  }

  scrollToCollectionItemSubClass() {
    if (
      this.collection &&
      window.appGlobals.cache.backToCommunityGroupItems &&
      window.appGlobals.cache.backToCommunityGroupItems[this.collection.id]
    ) {
      (this.$$('#collectionItems') as YpCollectionItemsGrid).scrollToItem(
        window.appGlobals.cache.backToCommunityGroupItems[this.collection.id]
      );
      window.appGlobals.cache.backToCommunityGroupItems[
        this.collection.id
      ] = undefined;
    }
  }
}