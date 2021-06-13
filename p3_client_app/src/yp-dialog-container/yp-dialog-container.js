import '@polymer/polymer/polymer-legacy.js';
import 'lite-signal/lite-signal.js';
import 'iron-lazy-pages/iron-lazy-pages.js';
import '../yp-ajax/yp-ajax-error-dialog.js';
import '../yp-user/yp-login.js';
import '../yp-user/yp-missing-email.js';
import '../yp-user/yp-forgot-password.js';
import '../yp-user/yp-reset-password.js';
import '../yp-page/yp-page-dialog.js';
import '../yp-user/yp-accept-invite.js';
import './yp-autotranslate-dialog.js';
import { ypGotAdminRightsBehavior } from '../yp-behaviors/yp-got-admin-rights-behavior.js';
import { ypLoggedInUserBehavior } from '../yp-behaviors/yp-logged-in-user-behavior.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment">
      :host {
        background-color: var(--primary-background-color);
      }

      #dialogs {
        background-color: var(--primary-background-color) !important;
      }

      #dialogs[hide] {
        display: none;
      }

      paper-dialog {
        background-color: #FFF;
      }

      .trackingInfo, #pixelTrackingCookieConfirm {
        color: #FFF;
        background-color: #222;
      }

      .trackingInfo {
        margin-bottom: 16px;
        font-size: 16px;
      }

      paper-button {
        background-color: #555;
        margin-right: 12px;
        text-align: center;
      }
    </style>

    <lite-signal on-lite-signal-got-admin-rights="_gotAdminRights"></lite-signal>
    <lite-signal on-lite-signal-logged-in="_loggedInUser"></lite-signal>
    <lite-signal on-lite-signal-open-bulk-status-updates="_openBulkStatusUpdates"></lite-signal>

    <template is="dom-if" if="[[loggedInUser]]" restamp="">
      <ac-notification-toast id="notificationToast"></ac-notification-toast>
    </template>

    <template is="dom-if" if="[[needsPixelCookieConfirm]]" restamp="">
      <paper-toast id="pixelTrackingCookieConfirm" duration="0">
        <div class="layout vertical">
          <div class="trackingInfo">[[t('facebookTrackingToastInfo')]]</div>
          <div class="layout horizontal">
            <div class="flex"></div>
            <paper-button raised="" on-tap="_disableFaceookPixelTracking">[[t('disableFacebookTracking')]]</paper-button>
            <paper-button raised="" on-tap="_agreeToFacebookPixelTracking">[[t('iAgree')]]</paper-button>
          </div>
        </div>
      </paper-toast>
    </template>

    <div id="dialogs" hide\$="[[hideDialogs]]">
      <paper-toast id="masterToast"></paper-toast>
      <yp-ajax-error-dialog id="errorDialog"></yp-ajax-error-dialog>

      <template is="dom-if" if="[[pageDialogOpen]]" restamp="">
        <yp-page-dialog id="pageDialog"></yp-page-dialog>
      </template>

      <template is="dom-if" if="[[confirmationDialogOpen]]" restamp="">
        <yp-confirmation-dialog id="confirmationDialog"></yp-confirmation-dialog>
      </template>

      <iron-lazy-pages selected="{{selectedDialog}}" attr-for-selected="name">
        <template is="dom-if" name="userLogin" restamp="">
          <yp-login id="userLogin" on-yp-forgot-password="_forgotPassword"></yp-login>
        </template>

        <template is="dom-if" name="forgotPassword" restamp="">
          <yp-forgot-password id="forgotPassword"></yp-forgot-password>
        </template>

        <template is="dom-if" name="resetPassword" restamp="">
          <yp-reset-password id="resetPassword"></yp-reset-password>
        </template>

        <template is="dom-if" name="acceptInvite" restamp="">
          <yp-accept-invite id="acceptInvite"></yp-accept-invite>
        </template>

        <template is="dom-if" name="missingEmail" restamp="">
          <yp-missing-email id="missingEmail"></yp-missing-email>
        </template>

        <template is="dom-if" name="communityEdit" restamp="">
          <yp-community-edit id="communityEdit"></yp-community-edit>
        </template>

        <template is="dom-if" name="groupEdit" restamp="">
          <yp-group-edit new="" id="groupEdit"></yp-group-edit>
        </template>

        <template is="dom-if" name="postEdit" restamp="">
          <yp-post-edit id="postEdit"></yp-post-edit>
        </template>

        <template is="dom-if" name="userImageEdit" restamp="">
          <yp-post-user-image-edit id="userImageEdit"></yp-post-user-image-edit>
        </template>

        <template is="dom-if" name="magicTextDialog" restamp="">
          <yp-magic-text-dialog id="magicTextDialog"></yp-magic-text-dialog>
        </template>

        <template is="dom-if" name="apiActionDialog" restamp="">
          <yp-api-action-dialog id="apiActionDialog"></yp-api-action-dialog>
        </template>

        <template is="dom-if" name="autoTranslateDialog" restamp="">
          <yp-autotranslate-dialog id="autoTranslateDialog"></yp-autotranslate-dialog>
        </template>

        <template is="dom-if" name="userEdit" restamp="">
          <yp-user-edit id="userEdit" method="PUT"></yp-user-edit>
        </template>

        <template is="dom-if" name="userDeleteOrAnonymize" restamp="">
          <yp-user-delete-or-anonymize id="userDeleteOrAnonymize"></yp-user-delete-or-anonymize>
        </template>

        <template is="dom-if" name="categoryEdit" restamp="">
          <yp-category-edit new="" id="categoryEdit"></yp-category-edit>
        </template>

        <template is="dom-if" name="pagesGrid" restamp="">
          <yp-pages-grid id="pagesGrid"></yp-pages-grid>
        </template>

        <template is="dom-if" name="organizationsGrid" restamp="">
          <yp-organizations-grid id="organizationsGrid"></yp-organizations-grid>
        </template>

        <template is="dom-if" name="organizationEdit" restamp="">
          <yp-organization-edit id="organizationEdit"></yp-organization-edit>
        </template>

        <template is="dom-if" name="domainEdit" restamp="">
          <yp-domain-edit id="domainEdit"></yp-domain-edit>
        </template>

        <template is="dom-if" name="postStatusChangeEdit" restamp="">
          <yp-post-status-change-edit id="postStatusChangeEdit"></yp-post-status-change-edit>
        </template>

        <template is="dom-if" name="postMove" restamp="">
          <yp-post-move id="postMove"></yp-post-move>
        </template>

        <template is="dom-if" name="none" restamp="">
        </template>

        <template is="dom-if" name="usersGrid" restamp="">
          <yp-users-grid id="usersGrid"></yp-users-grid>
        </template>

        <template is="dom-if" name="contentModeration" restamp="">
          <yp-content-moderation id="contentModeration"></yp-content-moderation>
        </template>
      </iron-lazy-pages>

      <template is="dom-if" if="[[bulkStatusUpdates]]" restamp="">
        <yp-bulk-status-update-config id="bulkStatusUpdateConfig"></yp-bulk-status-update-config>
        <yp-bulk-status-update-grid id="bulkStatusUpdateGrid"></yp-bulk-status-update-grid>
        <yp-bulk-status-update-edit id="bulkStatusUpdateEdit"></yp-bulk-status-update-edit>
        <yp-bulk-status-update-templates id="bulkStatusUpdateEditTemplates"></yp-bulk-status-update-templates>
      </template>

      <template is="dom-if" if="[[gotMediaRecorder]]" restamp="">
        <yp-media-recorder id="mediaRecorder"></yp-media-recorder>
      </template>
    </div>

    <paper-dialog id="loadingDialog">
      <paper-spinner active=""></paper-spinner>
    </paper-dialog>
`,

  is: 'yp-dialog-container',

  behaviors: [
    ypLoggedInUserBehavior,
    ypGotAdminRightsBehavior,
    ypLanguageBehavior
  ],

  properties: {
    waitForUpgradeCounter: {
      type: Number,
      value: 0
    },

    bulkStatusUpdates: {
      type: Boolean,
      value: false
    },

    hideDialogs: {
      type: Boolean,
      value: true
    },

    haveLoadedDelayed: {
      type: Boolean,
      value: false
    },

    loadingStartedLoggedIn: {
      type: Boolean,
      value: false
    },

    loadingStartedAdmin: {
      type: Boolean,
      value: false
    },

    selectedDialog: {
      type: String,
      value: null
    },

    confirmationDialogOpen: {
      type: String,
      value: false
    },

    pageDialogOpen: {
      type: Boolean,
      value: false
    },

    gotUsersGrid: {
      type: Boolean,
      value: false
    },

    gotContentModeration: {
      type: Boolean,
      value: false
    },

    gotMediaRecorder: {
      type: Boolean,
      value: false
    },

    needsPixelCookieConfirm: {
      type: Boolean,
      value: false
    },

    facebookPixelTrackingId: String
  },

  ready: function () {
    this.async(function () {
      import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-delayed.js")).then(() => {
        this.set('haveLoadedDelayed', true)
      });
    }, 3000);
  },

  openPixelCookieConfirm: function (facebookPixelTrackingId) {
    this.set('facebookPixelTrackingId', facebookPixelTrackingId);
    this.async(function () {
      this.set('needsPixelCookieConfirm', true);
      this.async(function () {
        this.$$("#pixelTrackingCookieConfirm").open();
      });
    }, 2000);
  },

  _disableFaceookPixelTracking: function () {
    localStorage.setItem("disableFacebookPixelTracking", true);
    this.$$("#pixelTrackingCookieConfirm").close();
  },

  _agreeToFacebookPixelTracking: function () {
    localStorage.setItem("consentGivenForFacebookPixelTracking", true);
    window.appGlobals.setCommunityPixelTracker(this.facebookPixelTrackingId);
    this.$$("#pixelTrackingCookieConfirm").close();
  },

  _loggedInUser: function (event, user) {
    console.info("_loggedInUser");
    if (user) {
      this.set('loggedInUser', user);
      if (!this.loadingStartedLoggedIn) {
        this.loadingStartedLoggedIn = true;
        import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-logged-in.js")).then(() => {
          console.info("Have loaded logged-in container");
        });
      } else {
        console.warn("Trying to load logged in twice, see appUser potentially removing that second event");
      }
    }
  },

  _gotAdminRights: function (event, detail) {
    console.info("_gotAdminRights");
    if (detail && detail>0) {
      this.set('gotAdminRights', true);
      if (!this.loadingStartedAdmin) {
        this.loadingStartedAdmin = true;
        import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-admin.js")).then(() => {
          console.info("Have loaded admin container");
        });
      } else {
        console.warn("Trying to load admin in twice, see appUser potentially removing that second event");
      }
    }
  },

  _openBulkStatusUpdates: function () {
    this.$.loadingDialog.open();

    import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-bulk-status-updates.js")).then(() => {
      this.$.loadingDialog.close();
      console.info("Have loaded bulk status container");
      this.set('bulkStatusUpdates', true);
    });
  },

  closeDialog: function (idName) {
    var element = this.$$("#"+idName);
    if (element) {
      console.info("Closing dialog: "+idName);
      element.close();
    } else {
      console.error("Did not find dialog to close: "+idName);
    }
  },

  dialogClosed: function  (detail) {
    if (detail.name===this.selectedDialog) {
      this.set('selectedDialog', 'none');
      console.log("Setting selectedDialog to none");
    }
  },

  getUsersGridAsync: function (callback) {
    if (this.gotUsersGrid) {
      this.getDialogAsync("usersGrid", callback);
    } else {
      this.$.loadingDialog.open();
      import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-vaadin-grid-shared.js")).then(() => {
        import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-users-grid.js")).then(() => {
          this.$.loadingDialog.close();
          console.info("Have loaded users grid container");
          this.set('gotUsersGrid', true);
          this.getDialogAsync("usersGrid", callback);
        });
      });
    }
  },

  getContentModerationAsync: function (callback) {
    if (this.gotContentModeration) {
      this.getDialogAsync("contentModeration", callback);
    } else {
      this.$.loadingDialog.open();
      import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-vaadin-grid-shared.js")).then(() => {
        import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-moderation.js")).then(() => {
          this.$.loadingDialog.close();
          console.info("Have loaded contentModeration");
          this.set('gotContentModeration', true);
          this.getDialogAsync("contentModeration", callback);
        });
      });
    }
  },

  getMediaRecorderAsync: function (callback) {
    if (this.gotMediaRecorder) {
      this.getDialogAsync("mediaRecorder", callback);
    } else {
      this.$.loadingDialog.open();
      import(this.resolveUrl("/src/yp-dialog-container/yp-dialog-container-media-recorder.js")).then(() => {
        this.$.loadingDialog.close();
        console.info("Have loaded media recorder container");
        this.set('gotMediaRecorder', true);
        this.getDialogAsync("mediaRecorder", callback);
      });
    }
  },

  getDialogAsync: function (idName, callback) {
    this.set('hideDialogs', false);

    if (idName==="pageDialog") {
      this.set('pageDialogOpen', true);
    } else if (idName==="confirmationDialog") {
      this.set('confirmationDialogOpen', true);
    } else if (idName!=='notificationToast') {
      this.set('pageDialogOpen', false);
      this.set('confirmationDialogOpen', false);
      this.set('selectedDialog', idName);
    }

    this.async(function () {
      var element = this.$$("#"+idName);
      if (element && (typeof element.ready === "function")) {
        this.set('waitForUpgradeCounter', 0);
        console.info("Found dialog: "+idName);
        callback(element);
      } else {
        console.warn("Element not upgraded: "+idName);
        this.waitForUpgradeCounter += 1;
        if (this.waitForUpgradeCounter>100) {
          console.error("Element not upgraded after wait: "+idName);
        }
        this.async(function () {
          this.getDialogAsync(idName, callback);
        }.bind(this), this.waitForUpgradeCounter>100 ? 1000 : 250);
      }
    });
  },

  _forgotPassword: function () {
    this.getDialogAsync("forgotPassword", function (dialog) {
      dialog.open()
    });
  }
});
