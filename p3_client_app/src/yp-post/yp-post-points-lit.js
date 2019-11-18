import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import 'lite-signal/lite-signal.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-toast/paper-toast.js';
import '../yp-app-globals/yp-app-icons.js';
import '../yp-behaviors/yp-iron-list-behavior.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import '../yp-behaviors/emoji-selector.js';
import '../yp-point/yp-point.js';
import { ypTruncateBehavior } from '../yp-behaviors/yp-truncate-behavior.js';
import '../yp-file-upload/yp-file-upload.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { ypLoggedInUserBehavior } from '../yp-behaviors/yp-logged-in-user-behavior.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

class YpPostPointsLit extends YpBaseElement { 
  static get properties() {
    return {
      host: String,

      downPoints: {
        type: Array,
        value: []
      },

      upPoints: {
        type: Array,
        value: []
      },

      textValueUp: {
        type: String,
        notify: true,
        value: ""
      },

      textValueDown: {
        type: String,
        notify: true,
        value: ""
      },

      newPointTextCombined: {
        type: String
      },

      post: {
        type: Object,
        observer: "_postChanged"
      },

      points: {
        type: Array,
        value: null,
        observer: '_pointsChanged'
      },

      largeMode: {
        type: Boolean,
        value: false,
        observer: '_updateEmojiBindings'
      },

      textValueMobileUpOrDown: String,

      labelMobileUpOrDown: String,

      labelUp: String,

      labelDown: String,

      pointUpOrDownSelected: {
        type: String,
        observer: '_pointUpOrDownSelectedChanged',
        value: 'pointFor'
      },

      latestPointCreatedAt: {
        type: Date,
        value: null
      },

      scrollToId: {
        type: String,
        value: null
      },

      ironListResizeScrollThreshold: {
        type: Number,
        computed: '_ironListResizeScrollThreshold(largeMode)'
      },

      ironListPaddingTop: {
        type: Number,
        computed: '_ironListPaddingTop(wide)'
      },

      ifLengthUpIsRight: {
        type: Boolean,
        value: false,
        computed: 'ifLengthIsRight("up",textValueUp, uploadedVideoUpId, uploadedAudioUpId)'
      },

      ifLengthDownIsRight: {
        type: Boolean,
        value: false,
        computed: 'ifLengthIsRight("down", textValueDown, uploadedVideoDownId, uploadedAudioDownId)'
      },

      ifLengthMobileRight: {
        type: Boolean,
        value: false,
        computed: 'ifLengthIsRight("mobile", textValueMobileUpOrDown, uploadedVideoMobileId, uploadedAudioMobileId)'
      },

      addPointDisabled: {
        type: Boolean,
        value: false
      },

      mobileScrollOffset: {
        type: Number,
        computed: '_mobileScrollOffset(largeMode,post)'
      },

      ajaxActive: {
        type: Boolean,
        value: false
      },

      uploadedVideoUpId: {
        type: String,
        value: null
      },

      uploadedVideoDownId: {
        type: String,
        value: null
      },

      uploadedVideoMobileId: {
        type: String,
        value: null
      },

      currentVideoId:{
        type: String,
        value: null
      },

      hideUpVideo: {
        type: Boolean,
        value: false
      },

      hideDownVideo: {
        type: Boolean,
        value: false
      },

      hideMobileVideo: {
        type: Boolean,
        value: false
      },

      uploadedAudioUpId: {
        type: String,
        value: null
      },

      uploadedAudioDownId: {
        type: String,
        value: null
      },

      uploadedAudioMobileId: {
        type: String,
        value: null
      },

      currentAudioId:{
        type: String,
        value: null
      },

      hideUpAudio: {
        type: Boolean,
        value: false
      },

      hideDownAudio: {
        type: Boolean,
        value: false
      },

      hideMobileAudio: {
        type: Boolean,
        value: false
      },

      hideUpText: {
        type: Boolean,
        value: false
      },

      hideDownText: {
        type: Boolean,
        value: false
      },

      hideMobileText: {
        type: Boolean,
        value: false
      },


      selectedPointForMobile: {
        type: Boolean,
        value: true
      },

      isAndroid: {
        type: Boolean,
        value: false
      },

      hasCurrentUpVideo: {
        type: String,
        observer: '_hasCurrentUpVideo'
      },

      hasCurrentDownVideo: {
        type: String,
        observer: '_hasCurrentDownVideo'
      },

      hasCurrentMobileVideo: {
        type: String,
        observer: '_hasCurrentMobileVideo'
      },

      hasCurrentUpAudio: {
        type: String,
        observer: '_hasCurrentUpAudio'
      },

      hasCurrentDownAudio: {
        type: String,
        observer: '_hasCurrentDownAudio'
      },

      hasCurrentMobileAudio: {
        type: String,
        observer: '_hasCurrentMobileAudio'
      },

      storedPoints: {
        type: Array,
        value: null
      }
    }
  }

  static get styles() {
    return [
      css`

      .item {
        
      }

      .main-container {
        background-color: var(--primary-background-color);
      }

      .point {
        padding-top: 32px;
        padding-bottom: 32px;
        padding-left: 24px;
        padding-right: 24px;
        width: 398px;
      }

      .pointInputMaterial {
        padding-top: 24px;
        padding-left: 16px;
        padding-right: 16px;
        margin-bottom: 16px;
        background-color: #FFF;
      }

      paper-toast {
        z-index: 9999;
      }

      paper-material {
        background-color: #fff;
      }

      yp-point {
        padding-top: 8px;
      }

      .pointMaterial {
        padding-top: 8px;
        background-color: #FFF;
        padding-left: 0;
        padding-right: 0;
        width: 430px;
        margin-bottom: 12px;
      }

      .thumbIcon {
        height: 64px;
        width: 64px;
        padding-bottom: 16px;
        color: var(--primary-color);
      }

      .editIcon {
        height: 28px;
        width: 28px;
        padding-bottom: 16px;
        color: var(--primary-color);
      }

      .addPointFab {
        width: 100%;
        color: #FFF;
        margin-bottom: 18px;
      }

      paper-textarea {
        --paper-input-container-label: {
          font-size: 22px;
          height: 30px;
          overflow: visible;
          color: #AAAAAA;
        }
      }

      .howToWriteInfoText {
        padding-top: 4px;
        color: var(--primary-color);
      }

      .point .main-container .topContainer {
        background-color: var(--primary-background-color) !important;
      }

      .penContainer {
        margin-top: 42px;
      }

      .upOrDown {
        margin-top: 72px;
      }

      paper-radio-button {
        --paper-radio-button-checked-color: var(--accent-color) !important;
        font-size: 16px;
      }

      #pointUpOrDownMaterial {
        margin-top: 16px;
        width: 100%;
      }

      .mobileFab {
        margin-top: 8px;
      }

      paper-button {
        color: #FFF;
        background-color: var(--accent-color);
      }

      @media (max-width: 985px) {
        .pointInputMaterial {
          width: 100%;
          max-width: 568px;
          font-size: 14px;
          padding-top: 4px;
          margin-top: 0;
        }

        .pointMaterial {
          width: 100%;
          max-width: 600px;
          padding-left: 0;
          padding-right: 0;
        }

        #pointUpOrDownMaterial {
          margin-top: 0;
        }

        .main-container {
          width: 100%;
        }

        iron-list {
          width: 100vw;
        }

        .pointMaterial {
        }
      }

      @media (max-width: 420px) {
        .pointInputMaterial {
          width: 90%;
          max-width: 90%;
        }
      }

      .mobilePaperTextArea {
        --paper-input-container-label: {
          font-size: 19px;
        };
      }

      .pointMainHeader {
        font-size: 26px;
        margin-bottom: 16px;
        color: #555;
      }

      #pointUpMaterialNotUsed {
        border-top: solid 2px;
        border-top-color:  var(--master-point-up-color);
      }

      #pointDownMaterialNotUsed {
        border-top: solid 2px;
        border-top-color: var(--master-point-down-color);
      }

      .pointElement {
        margin-bottom: 18px;
      }

      [hidden] {
        display: none !important;
      }

      iron-list {
        height: 80vh;
      }

      iron-list {
        --iron-list-items-container: {
        };
      }

      :focus {
        outline: none;
      }

      #ironListMobile[debate-disabled] {
        margin-top: 16px;
      }

      .mainSpinner {
        margin: 32px;
      }

      paper-button[disabled] {
        background-color: #333;
        color: #FFF;
      }

      .uploadNotLoggedIn {
        min-width: 100px;
        background-color: #FFF;
        color: #000;
        margin-bottom: 24px;
      }

      .uploadNotLoggedIn > .icon {
        padding-right: 8px;
      }

      .pointButtons {
        margin-bottom: 4px;
      }

      .bottomDiv {
        margin-bottom: 64px;
      }

      .uploadSection {
        justify-content: space-evenly;
        width: 50%;
        margin-left: 8px;
        margin-right: 8px;
        vertical-align: top;
      }
    `, YpFlexLayout]
  }

  render() {
    return html`
    ${this.post ? html`
    <iron-media-query query="(min-width: 985px)" query-matches="${this.largeMode}"></iron-media-query>

    <div class="layout horizontal center-center" ?hidden="${this.ajaxActive}">
      <yp-ajax id="ajax" large-spinner="" active="${this.ajaxActive}" on-response="_response"></yp-ajax>
    </div>

    <template is="dom-if" if="${this.largeMode}" restamp="">
      <div class="layout vertical topContainer">
        <div class="main-container layout-horizontal">
          <div class="point">
            <template is="dom-if" if="${!this.post.Group.configuration.alternativePointForHeader}">
              <div class="pointMainHeader layout horizontal center-center">
                ${this.t('pointsFor')}
              </div>
            </template>

            <template is="dom-if" if="${this.post.Group.configuration.alternativePointForHeader}">
              <div class="pointMainHeader layout horizontal center-center">
                ${this.post.Group.configuration.alternativePointForHeader}
              </div>
            </template>

            <paper-material id="pointUpMaterial" elevation="1" class="pointInputMaterial layout vertical" animated="" ?hidden="${this.post.Group.configuration.disableDebate}">

              <paper-textarea id="up_point" on-tap="focusUpPoint" on-focus="focusTextArea" on-blur="blurTextArea" value="${this.textValueUp}" label="${this.labelUp}" always-float-label="${this._floatIfValueOrIE()}" char-counter="" rows="2" ?hidden="${this.hideUpText}" max-rows="3" maxlength="500">
              </paper-textarea>

              <div class="horizontal end-justified layout" ?hidden="${this.post.Group.configuration.hideEmoji}">
                <emoji-selector id="pointUpEmojiSelector" ?hidden="${this.hideUpText}"></emoji-selector>
              </div>

              <div class="layout horizontal center-justified">
                <template is="dom-if" if="${this.post.Group.configuration.allowPointVideoUploads}">
                  <div ?hidden="${this.hideUpVideo}" class="uploadSection">
                    <div class="layout vertical center-center self-start" ?hidden="${!this.loggedInUser}">
                      <yp-file-upload id="videoFileUploadUp" upload-limit-seconds="${this.post.Group.configuration.videoPointUploadLimitSec}" current-file="${this.hasCurrentUpVideo}" container-type="points" group="${this.post.Group}" raised="true" multi="false" video-upload="" method="POST" on-success="_videoUpUploaded">
                        <iron-icon class="icon" icon="videocam"></iron-icon>
                        <span>${this.t('uploadVideoPointFor')}</span>
                      </yp-file-upload>
                    </div>
                    <div class="layout horizontal center-center">
                      <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                        <iron-icon class="icon" icon="videocam"></iron-icon>
                        ${this.t('uploadVideoPointFor')}
                      </paper-button>
                    </div>
                  </div>
                </template>

                <template is="dom-if" if="${this.post.Group.configuration.allowPointAudioUploads}">
                  <div ?hidden="${this.hideUpAudio}" class="uploadSection">
                    <div class="layout vertical center-center" ?hidden="${!this.loggedInUser}">
                      <yp-file-upload id="audioFileUploadUp" current-file="${this.hasCurrentUpAudio}" container-type="points" upload-limit-seconds="${this.post.Group.configuration.audioPointUploadLimitSec}" group="${this.post.Group}" raised="true" multi="false" audio-upload="" method="POST" on-success="_audioUpUploaded">
                        <iron-icon class="icon" icon="keyboard-voice"></iron-icon>
                        <span>${this.t('uploadAudioPointFor')}</span>
                      </yp-file-upload>
                    </div>
                    <div class="layout horizontal center-center">
                      <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                        <iron-icon class="icon" icon="keyboard-voice"></iron-icon>
                        ${this.t('uploadAudioPointFor')}
                      </paper-button>
                    </div>
                  </div>
                </template>
              </div>

              <div ?hidden="${!this.ifLengthUpIsRight}">
                <div class="addPointFab layout horizontal center-center">
                  <paper-button raised="" class="submitButton" disabled="${this.addPointDisabled}" icon="add" mini="" elevation="3" on-tap="addPointUp" title="${this.t('point.add_up')}">${this.t('postPoint')}</paper-button>
                </div>
              </div>
            </paper-material>

            <div id="allUpPoints">
              <iron-list id="ironListUp" items="${this.upPoints}" as="point" scroll-target="document" scroll-offset="550">
                <template>
                  <div class="item layout-horizontal" tabindex="${this.tabIndex}">
                    <paper-material id="point${this.point.id}" elevation="1" animated="" class="pointMaterial">
                      <yp-point point="${this.point}"></yp-point>
                    </paper-material>
                  </div>
                </template>
              </iron-list>
            </div>
          </div>

          <div class="point layout-vertical">
            <template is="dom-if" if="${!this.post.Group.configuration.alternativePointAgainstHeader}">
              <div class="pointMainHeader layout horizontal center-center">
                ${this.t('pointsAgainst')}
              </div>
            </template>

            <template is="dom-if" if="${this.post.Group.configuration.alternativePointAgainstHeader}">
              <div class="pointMainHeader layout horizontal center-center">
                ${this.post.Group.configuration.alternativePointAgainstHeader}
              </div>
            </template>


            <paper-material id="pointDownMaterial" elevation="1" class="pointInputMaterial layout vertical" animated="" ?hidden="${this.post.Group.configuration.disableDebate}">

              <paper-textarea id="down_point" on-tap="focusDownPoint" on-focus="focusTextArea" on-blur="blurTextArea" value="${this.textValueDown}" label="${this.labelDown}" char-counter="" rows="2" ?hidden="${this.hideDownText}" always-float-label="${this._floatIfValueOrIE()}" max-rows="5" maxlength="500">
              </paper-textarea>

              <div class="horizontal end-justified layout" ?hidden="${this.post.Group.configuration.hideEmoji}">
                <emoji-selector id="pointDownEmojiSelector" ?hidden="${this.hideDownText}"></emoji-selector>
              </div>

              <div class="layout horizontal center-justified">
                <template is="dom-if" if="${this.post.Group.configuration.allowPointVideoUploads}">
                  <div ?hidden="${this.hideDownVideo}" class="uploadSection">
                    <div class="layout vertical center-center self-start" ?hidden=${!this.loggedInUser}">
                      <yp-file-upload id="videoFileUploadDown" current-file="${this.hasCurrentDownVideo}" container-type="points" upload-limit-seconds="${this.post.Group.configuration.videoPointUploadLimitSec}" group="${this.post.Group}" raised="true" multi="false" video-upload="" method="POST" on-success="_videoDownUploaded">
                        <iron-icon class="icon" icon="videocam"></iron-icon>
                        <span>${this.t('uploadVideoPointAgainst')}</span>
                      </yp-file-upload>
                    </div>
                    <div class="layout horizontal center-center">
                      <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                        <iron-icon class="icon" icon="videocam"></iron-icon>
                        ${this.t('uploadVideoPointAgainst')}
                      </paper-button>
                    </div>
                  </div>
                </template>

                <template is="dom-if" if="${this.post.Group.configuration.allowPointAudioUploads}">
                  <div ?hidden="${this.hideDownAudio}" class="uploadSection">
                    <div class="layout vertical center-center" ?hidden="${!this.loggedInUser}">
                      <yp-file-upload id="audioFileUploadDown" current-file="${this.hasCurrentDownAudio}" container-type="points" upload-limit-seconds="${this.post.Group.configuration.audioPointUploadLimitSec}" group="${this.post.Group}" raised="true" multi="false" audio-upload="" method="POST" on-success="_audioDownUploaded">
                        <iron-icon class="icon" icon="keyboard-voice"></iron-icon>
                        <span>${this.t('uploadAudioPointAgainst')}</span>
                      </yp-file-upload>
                    </div>
                    <div class="layout horizontal center-center">
                      <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                        <iron-icon class="icon" icon="keyboard-voice"></iron-icon>
                        ${this.t('uploadAudioPointAgainst')}
                      </paper-button>
                    </div>
                  </div>
                </template>
              </div>

              <div ?hidden="${!this.ifLengthDownIsRight}">
                <div class="addPointFab layout horizontal center-center">
                  <paper-button raised="" disabled="${this.addPointDisabled}" icon="add" elevation="3" on-tap="addPointDown" title="${this.t('point.add_down')}">${this.t('postPoint')}</paper-button>
                </div>
              </div>
            </paper-material>

            <div id="allDownPoints">
              <iron-list id="ironListDown" items="${this.downPoints}" as="point" scroll-target="document" scroll-offset="550">
                <template>
                  <div class="item" tabindex="${this.tabIndex}">
                    <paper-material id="point${this.point.id}" elevation="1" animated="" class="pointMaterial">
                      <yp-point point="${this.point}"></yp-point>
                    </paper-material>
                  </div>
                </template>
              </iron-list>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template is="dom-if" if="${!this.largeMode}" restamp="">
      <div class="layout vertical center-center">
        <paper-material id="pointUpOrDownMaterial" elevation="1" class="pointInputMaterial layout vertical" animated="" ?hidden="${this.post.Group.configuration.disableDebate}">
          <paper-textarea id="mobileUpOrDownPoint" class="mobilePaperTextArea" on-tap="focusDownPoint" on-focus="focusTextArea" on-blur="blurTextArea" value="${this.textValueMobileUpOrDown}" label="${this.labelMobileUpOrDown}" char-counter="" rows="2" ?hidden="${this.hideMobileText}" max-rows="3" maxlength="500"></paper-textarea>
          <div class="layout vertical end-justified">
            <div class="layout horizontal center-center pointButtons">
              <paper-radio-group id="upOrDown" attribute-for-selected="name" class="layout horizontal" selected="${this.pointUpOrDownSelected}">
                <paper-radio-button name="pointFor">${this.t('pointForShort')}</paper-radio-button>
                <paper-radio-button name="pointAgainst">${this.t('pointAgainstShort')}</paper-radio-button>
              </paper-radio-group>
              <div class="flex"></div>
              <div ?hidden="${this.hideMobileText}">
                <emoji-selector id="pointUpDownEmojiSelector" ?hidden="${this.post.Group.configuration.hideEmoji}"></emoji-selector>
              </div>
            </div>

            <div class="layout horizontal center-justified">
              <template is="dom-if" if="${this.post.Group.configuration.allowPointVideoUploads}">
                <div ?hidden="${this.hideMobileVideo}" class="uploadSection">
                  <div class="layout vertical center-center self-start" ?hidden="${!this.loggedInUser}">
                    <yp-file-upload id="videoFileUploadMobile" current-file="${this.hasCurrentMobileVideo}" container-type="points" upload-limit-seconds="${this.post.Group.configuration.videoPointUploadLimitSec}" group="${this.post.Group}" raised="true" multi="false" video-upload="" method="POST" on-success="_videoMobileUploaded">
                      <iron-icon class="icon" icon="videocam"></iron-icon>

                      <span ?hidden="${!this.selectedPointForMobile}">${this.t('uploadVideoPointFor')}</span>
                      <span ?hidden="${this.selectedPointForMobile}">${this.t('uploadVideoPointAgainst')}</span>
                    </yp-file-upload>
                  </div>
                  <div class="layout horizontal center-center">
                    <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                      <iron-icon class="icon" icon="videocam"></iron-icon>
                      <span ?hidden="${!this.selectedPointForMobile}">${this.t('uploadVideoPointFor')}</span>
                      <span ?hidden="${this.selectedPointForMobile}">${this.t('uploadVideoPointAgainst')}</span>
                    </paper-button>
                  </div>
                </div>
              </template>
              <template is="dom-if" if="${this.post.Group.configuration.allowPointAudioUploads}">
                <div ?hidden="${this.hideMobileAudio}" class="uploadSection">
                  <div class="layout vertical center-center  self-start" ?hidden="${!this.loggedInUser}">
                    <yp-file-upload id="audioFileUploadMobile" current-file="${this.hasCurrentMobileAudio}" container-type="points" upload-limit-seconds="${this.post.Group.configuration.audioPointUploadLimitSec}" group="${this.post.Group}" raised="true" multi="false" audio-upload="" method="POST" on-success="_audioMobileUploaded">
                      <iron-icon class="icon" icon="keyboard-voice"></iron-icon>

                      <span ?hidden="${!this.selectedPointForMobile}">${this.t('uploadAudioPointFor')}</span>
                      <span ?hidden="${this.selectedPointForMobile}">${this.t('uploadAudioPointAgainst')}</span>
                    </yp-file-upload>
                  </div>
                  <div class="layout horizontal center-center">
                    <paper-button class="uploadNotLoggedIn" raised="" ?hidden="${this.loggedInUser}" on-tap="_openLogin">
                      <iron-icon class="icon" icon="keyboard-voice"></iron-icon>
                      <span ?hidden="${!this.selectedPointForMobile}">${this.t('uploadAudioPointFor')}</span>
                      <span ?hidden="${this.selectedPointForMobile}">${this.t('uploadAudioPointAgainst')}</span>
                    </paper-button>
                  </div>
                </div>
              </template>
            </div>

          </div>
          <div ?hidden="${!this.ifLengthMobileRight}">
            <div class="addPointFab layout horizontal center-center mobileFab">
              <paper-button raised="" disabled="${this.addPointDisabled}" icon="add" elevation="3" on-tap="addMobilePointUpOrDown" title="${this.t('postPoint')}">
                <span ?hidden="${!this.selectedPointForMobile}">${this.t('postPointFor')}</span>
                <span ?hidden="${this.selectedPointForMobile}">${this.t('postPointAgainst')}</span>
              </paper-button>
            </div>
          </div>
        </paper-material>
      </div>
      <div class="layout vertical center-center">
        <iron-list id="ironListMobile" debate-disabled="${this.post.Group.configuration.disableDebate}" items="${this.points}" as="point" scroll-target="document" scroll-offset="${this.mobileScrollOffset}">
          <template>
            <div class="item layout vertical center-center" tabindex="${this.tabIndex}">
              <paper-material id="point${this.point.id}" elevation="1" animated="" class="pointMaterial">
                <yp-point point="${this.point}"></yp-point>
              </paper-material>
            </div>
          </template>
        </iron-list>
      </div>
    </template>

    <div class="layout vertical center-center">
      <yp-ajax id="newPointsAjax" on-response="_newPointsResponse"></yp-ajax>
      <yp-ajax id="newPointAjax" on-error="_newPointError" method="POST" url="/api/points" on-response="_newPointResponse"></yp-ajax>
    </div>

    <paper-toast id="newPointToast" text="${this.newPointTextCombined}"></paper-toast>
` : html``}
`
  }

/*
  behaviors: [
    ypLanguageBehavior,
    ypTruncateBehavior,
    ypLoggedInUserBehavior
  ],
*/

  _openLogin() {
    this.fire('yp-open-login');
  }

  _videoUpUploaded(event, detail) {
    this.set('uploadedVideoUpId', detail.videoId);
  }

  _videoDownUploaded(event, detail) {
    this.set('uploadedVideoDownId', detail.videoId);
  }

  _videoMobileUploaded(event, detail) {
    this.set('uploadedVideoMobileId', detail.videoId);
  }

  _audioUpUploaded(event, detail) {
    this.set('uploadedAudioUpId', detail.audioId);
  }

  _audioDownUploaded(event, detail) {
    this.set('uploadedAudioDownId', detail.audioId);
  }

  _audioMobileUploaded(event, detail) {
    this.set('uploadedAudioMobileId', detail.audioId);
  }

  _mobileScrollOffset(large, post) {
    if (!large && post) {
      var element = this.$$("#ironListMobile");
      if (element) {
        var top = element.getBoundingClientRect().top;
        if (top<=0) {
          top = 800;
        }
        return top;
      } else {
        console.warn("Can't find mobile list element, returning 800");
        return 800;
      }
    }
  }

  _newPointError() {
    this.set('addPointDisabled', false);
  }

  _ironListResizeScrollThreshold(largeMode) {
    if (largeMode) {
      return 300;
    } else {
      return 300;
    }
  }

  _ironListPaddingTop(largeMode) {
    if (largeMode) {
      return 600;
    } else {
      return 500;
    }
  }

  ready() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
      this.set('isAndroid', true);
    }
    window.addEventListener("resize", this._processStoredPoints.bind(this));
  }

  detached() {
    window.removeEventListener("resize", this._processStoredPoints);
  }
/*
  listeners: {
    'yp-point-deleted': '_pointDeleted',
    'yp-update-point-in-list': '_updatePointInLists'
  },

  observers: [
    '_setupPointTextStartState(pointUpOrDownSelected, post)'
  ],

  _setupPointTextStartState(pointUpOrDownSelected, post) {
    if (post) {
      this._pointUpOrDownSelectedChanged(pointUpOrDownSelected)
    }
  }
*/
  _loadNewPointsIfNeeded(event, detail) {
    if (this.post && this.post.id == detail.postId) {
      if (this.latestPointCreatedAt) {
        this.$.newPointsAjax.url = '/api/posts/' + this.post.id + '/newPoints';
        this.$.newPointsAjax.params = { latestPointCreatedAt: this.latestPointCreatedAt };
        this.$.newPointsAjax.generateRequest();
      } else {
        console.error("Trying to send point without latestPointCreatedAt");
      }
    }
  }

  _newPointsResponse(event, detail) {
    var points = this._preProcessPoints(detail.response);
    points.forEach(function (point) {
      this._insertNewPoint(point);
    }.bind(this));

    this._updateCounterInfo();
  }

  _pointDeleted() {
    this.$.ajax.generateRequest();
  }

  _pointsChanged(points) {
    if (points) {
      this._updateEmojiBindings();
    }
  }

  _updateEmojiBindings() {
    this.async(function () {
      if (this.largeMode) {
        var upPoint = this.$$("#up_point");
        var downPoint = this.$$("#down_point");
        var upEmoji = this.$$("#pointUpEmojiSelector");
        var downEmoji = this.$$("#pointDownEmojiSelector");
        if (upPoint && downPoint && upEmoji && downEmoji) {
          upEmoji.inputTarget = upPoint;
          downEmoji.inputTarget = downPoint;
        } else {
          console.warn("Wide: Can't bind emojis :(");
        }
      } else {
        var upDownPoint = this.$$("#mobileUpOrDownPoint");
        var upDownEmoji = this.$$("#pointUpDownEmojiSelector");
        if (upDownPoint && upDownEmoji) {
          upDownEmoji.inputTarget = upDownPoint;
        } else {
          console.warn("Small: Can't bind emojis :(");
        }
      }
    }.bind(this), 500);
  }

  _pointUpOrDownSelectedChanged(newValue) {
    if (newValue=='pointFor') {
      if (this.post && this.post.Group && this.post.Group.configuration && this.post.Group.configuration.alternativePointForLabel) {
        this.set('labelMobileUpOrDown', this.post.Group.configuration.alternativePointForLabel);
      } else {
        this.set('labelMobileUpOrDown', this.t('point.for'));
      }
      this.set('selectedPointForMobile', true);
    } else if (newValue=='pointAgainst') {
      if (this.post && this.post.Group && this.post.Group.configuration && this.post.Group.configuration.alternativePointAgainstLabel) {
        this.set('labelMobileUpOrDown', this.post.Group.configuration.alternativePointAgainstLabel);
      } else {
        this.set('labelMobileUpOrDown', this.t('point.against'));
      }
      this.set('selectedPointForMobile', false);
    }
  }

  _clearVideo() {
    this.set('uploadedVideoUpId', null);
    this.set('uploadedVideoDownId', null);
    this.set('uploadedVideoMobileId', null);
    this.set('currentVideoId', null);
    this.set('hideUpVideo', false);
    this.set('hideDownVideo', false);
    this.set('hideMobileVideo', false);
    if (this.$$("#videoFileUploadUp"))
      this.$$("#videoFileUploadUp").clear();
    if (this.$$("#videoFileUploadDown"))
      this.$$("#videoFileUploadDown").clear();
    if (this.$$("#videoFileUploadMobile"))
      this.$$("#videoFileUploadMobile").clear();
  }

  _clearAudio() {
    this.set('uploadedAudioUpId', null);
    this.set('uploadedAudioDownId', null);
    this.set('uploadedAudioMobileId', null);
    this.set('currentAudioId', null);
    this.set('hideUpAudio', false);
    this.set('hideDownAudio', false);
    this.set('hideMobileAudio', false);
    if (this.$$("#audioFileUploadUp"))
      this.$$("#audioFileUploadUp").clear();
    if (this.$$("#audioFileUploadDown"))
      this.$$("#audioFileUploadDown").clear();
    if (this.$$("#audioFileUploadMobile"))
      this.$$("#audioFileUploadMobile").clear();
  }

  _postChanged(newPost) {
    // Remove any manually inserted points when the list is updated
    this.set('points', null);
    this.set('upPoints', null);
    this.set('downPoints', null);
    this.set('latestPointCreatedAt', null);
    this.set('storedPoints', null);
    this._clearVideo();
    this._clearAudio();

    if (newPost) {
      if (this.host) {
        this.$.ajax.url = this.host+'/api/posts/' + newPost.id + '/points';
      } else {
        this.$.ajax.url = '/api/posts/' + newPost.id + '/points';
      }
      this.$.ajax.generateRequest();
      if (this.post && this.post.Group && this.post.Group.configuration && this.post.Group.configuration.alternativePointForLabel) {
        this.set('labelUp', this.post.Group.configuration.alternativePointForLabel);
      } else {
        this.set('labelUp', this.t('point.for'));
      }
      if (this.post && this.post.Group && this.post.Group.configuration && this.post.Group.configuration.alternativePointAgainstLabel) {
        this.set('labelDown', this.post.Group.configuration.alternativePointAgainstLabel);
      } else {
        this.set('labelDown', this.t('point.against'));
      }
    }
  }

  removeElementsByClass(rootElement, className) {
    var elements = rootElement.getElementsByClassName(className);
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  _processStoredPoints() {
    console.info("_processStoredPoints");
    if (this.upPoints===null) {
      if (this.storedPoints && this.storedPoints.length > 0) {
        var upPoints = [];
        var downPoints = [];

        for (var i = 0; i < this.storedPoints.length; i++) {
          if (this.storedPoints[i].value>0) {
            upPoints.push(this.storedPoints[i]);
          } else if (this.storedPoints[i].value<0) {
            downPoints.push(this.storedPoints[i]);
          }
        }
        this.set('upPoints', upPoints);
        this.set('downPoints', downPoints);
      } else {
        this.set('upPoints', []);
        this.set('downPoints', []);
        this.set('points', []);
      }
    } else {
      console.log("Landscape points already setup");
    }

    if (!this.largeMode && !this.points) {
      this.set('points', this.interleaveArrays(this.upPoints, this.downPoints));
    }
  }

  _response(event, detail) {
    this.set('storedPoints', this._preProcessPoints(detail.response));
    this._processStoredPoints();
    this.removeElementsByClass(this, 'inserted-outside-list');
    this._updateCounterInfo();
    this._scrollPointIntoView();
    this._checkForMultipleLanguages();
  }

  _updatePointInLists(event, changedPoint) {
    this.upPoints.forEach(function (point, index) {
      if (point.id===changedPoint.id) {
        this.upPoints[index] = changedPoint;
      }
    }.bind(this));

    this.downPoints.forEach(function (point, index) {
      if (point.id===changedPoint.id) {
        this.downPoints[index] = changedPoint;
      }
    }.bind(this));

    if (this.points && this.points.length>0) {
      this.points.forEach(function (point, index) {
        if (point.id===changedPoint.id) {
          this.points[index] = changedPoint;
        }
      }.bind(this));
    }
  }

  _checkForMultipleLanguages() {
    if (!localStorage.getItem("dontPromptForAutoTranslation") &&
        !sessionStorage.getItem("dontPromptForAutoTranslation")) {
      var firstLanguage;
      var multipleLanguages = false;
      this.upPoints.forEach(function (point) {
        if (point.language && !multipleLanguages) {
          if (!firstLanguage && point.language!=='??') {
            firstLanguage = point.language;
          } else if (firstLanguage && firstLanguage!==point.language && point.language!=='??') {
            multipleLanguages = true;
            console.info("Multiple point languages: "+firstLanguage+" and "+point.language);
          }
        }
      });

      if (!multipleLanguages) {
        this.downPoints.forEach(function (point) {
          if (point.language && !multipleLanguages) {
            if (!firstLanguage && point.language!=='??') {
              firstLanguage = point.language;
            } else if (firstLanguage && firstLanguage!=point.language && point.language!=='??') {
              multipleLanguages = true;
              console.info("Multiple point languages: "+firstLanguage+" and "+point.language);
            }
          }
        });
      }

      if (multipleLanguages) {
        dom(document).querySelector('yp-app').getDialogAsync("autoTranslateDialog", function (dialog) {
          dialog.openLaterIfAutoTranslationEnabled();
        }.bind(this));
      }
    }
  }

  interleaveArrays(arrayA, arrayB) {
    var arrs = [arrayA, arrayB];
    var maxLength = Math.max.apply(Math, arrs.map(function (arr) {
      return arr.length
    }));

    var result = [];

    for (var i = 0; i < maxLength; ++i) {
      arrs.forEach(function (arr) {
        if (arr.length > i) {
          result.push(arr[i])
        }
      })
    }

    return result
  }

  _scrollPointIntoView() {
    if (this.scrollToId) {
      this.async(function () {
        var hasFoundIt=false;
        if (!this.largeMode) {
          this.points.forEach(function (point) {
            if (!hasFoundIt && point.id == this.scrollToId) {
              this.$$("#ironListMobile").scrollToItem(point);
              hasFoundIt = true;
            }
          }.bind(this));
        } else {
          this.upPoints.forEach(function (point) {
            if (!hasFoundIt && point.id == this.scrollToId) {
              this.$$("#ironListUp").scrollToItem(point);
              hasFoundIt = true;
            }
          }.bind(this));
          if (!hasFoundIt) {
            this.downPoints.forEach(function (point) {
              if (!hasFoundIt && point.id == this.scrollToId) {
                this.$$("#ironListDown").scrollToItem(point);
                hasFoundIt = true;
              }
            }.bind(this));
          }
        }

        if (hasFoundIt) {
          this.async(function () {
            // Change elevation
            var point = this.$$("#point"+this.scrollToId);
            if (point) {
              point.elevation = 5;
              point.elevation = 1;
              point.elevation = 5;
              this.async(function () {
                point.elevation = 1;
              }.bind(this), 7000);
            } else {
              console.warn("Can't find point to elevate");
            }
            this.set('scrollToId', null);
          }, 50);
        }
      }, 20);
    }
  }

  _floatIfValueOrIE(value) {
    var ie11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    return ie11 || value;
  }

  _preProcessPoints(points) {
    for (var i = 0; i < points.length; i++) {
      if (!this.latestPointCreatedAt || (!this.latestPointCreatedAt || points[i].created_at > this.latestPointCreatedAt)) {
        this.set('latestPointCreatedAt', points[i].created_at);
      }
      if (points[i].PointRevisions[points[i].PointRevisions.length-1] && points[i].PointRevisions[points[i].PointRevisions.length-1].content) {
        points[i].latestContent = points[i].PointRevisions[points[i].PointRevisions.length-1].content;
      } else {
        console.warn("No content for point in _preProcessPoints");
      }
    }
    return points;
  }

  _updateCounterInfo() {
    if (this.largeMode) {
      this.fire('yp-debate-info', {
        count: this.upPoints.length + this.downPoints.length,
        firstPoint: this.upPoints[0]
      });
    } else {
      this.fire('yp-debate-info', {
        count: this.points.length,
        firstPoint: this.points[0]
      });
    }
  }

  _insertNewPoint(point) {
    if (this.largeMode) {
      if (point.value > 0) {
        this.unshift('upPoints', point);
        this.async(function () {
          this.$$("#ironListUp").fire("iron-resize");
        }, 700);
      } else if (point.value < 0) {
        this.unshift('downPoints', point);
        this.async(function () {
          this.$$("#ironListDown").fire("iron-resize");
        }, 700);
      }
    } else {
      this.unshift('points', point);
      this.async(function () {
        this.$$("#ironListMobile").fire("iron-resize");
      }, 700);
    }
  }

  _newPointResponse(inEvent, inDetail) {
    if (this.currentVideoId) {
      var point = this._preProcessPoints([inDetail.response])[0];
      var ajax = document.createElement('iron-ajax');
      ajax.handleAs = 'json';
      ajax.contentType = 'application/json';
      ajax.url = '/api/videos/'+point.id+'/completeAndAddToPoint';
      ajax.method = 'PUT';
      ajax.body = {
        videoId: this.currentVideoId,
        appLanguage: this.language
      };
      ajax.addEventListener('response', function (event, detail) {
        this._completeNewPointResponse(event, event.detail);
        window.appGlobals.showSpeechToTextInfoIfNeeded();
      }.bind(this));
      ajax.generateRequest();
    } else if (this.currentAudioId) {
      var point = this._preProcessPoints([inDetail.response])[0];
      var ajax = document.createElement('iron-ajax');
      ajax.handleAs = 'json';
      ajax.contentType = 'application/json';
      ajax.url = '/api/audios/'+point.id+'/completeAndAddToPoint';
      ajax.method = 'PUT';
      ajax.body = {
        audioId: this.currentAudioId,
        appLanguage: this.language
      };
      ajax.addEventListener('response', function (event, detail) {
        this._completeNewPointResponse(event, event.detail);
        window.appGlobals.showSpeechToTextInfoIfNeeded();
      }.bind(this));
      ajax.generateRequest();
    } else {
      this._completeNewPointResponse(inEvent, inDetail);
    }
  }

  _completeNewPointResponse(event, detail) {
    this.set('addPointDisabled', false);
    var point = this._preProcessPoints([detail.response])[0];
    if (this.currentVideoId) {
      point.checkTranscriptFor = "video";
    } else if (this.currentAudioId) {
      point.checkTranscriptFor = "audio";
    }
    if (point.value > 0) {
      this.newPointTextCombined = this.t("point.forAdded") + " " + this.truncate(point.content, 21);
      this.set("textValueUp", "");
    } else {
      this.newPointTextCombined = this.t("point.againstAdded") + " " + this.truncate(point.content, 21);
      this.set("textValueDown", "");
    }
    this.set("textValueMobileUpOrDown", "");
    this._insertNewPoint(point);
    this.set('post.counter_points', this.post.counter_points + 1);
    this.$.newPointToast.show();
    this._updateCounterInfo();
    if (point.value > 0) {
      window.appGlobals.activity('completed', 'newPointFor');
    } else {
      window.appGlobals.activity('completed', 'newPointAgainst');
    }
    this._clearVideo();
    this._clearAudio();
  }

  addPointUp() {
    this.addPoint(this.textValueUp, 1, this.uploadedVideoUpId, this.uploadedAudioUpId);
    window.appGlobals.activity('add', 'pointUp');
  }

  addPointDown() {
    this.addPoint(this.textValueDown, -1, this.uploadedVideoDownId, this.uploadedAudioDownId);
    window.appGlobals.activity('add', 'pointDown');
  }

  addMobilePointUpOrDown() {
    if (this.pointUpOrDownSelected=='pointFor') {
      this.addPoint(this.textValueMobileUpOrDown, 1, this.uploadedVideoMobileId, this.uploadedAudioMobileId);
      window.appGlobals.activity('add', 'pointUp');
    } else if (this.pointUpOrDownSelected=='pointAgainst') {
      this.addPoint(this.textValueMobileUpOrDown, -1, this.uploadedVideoMobileId, this.uploadedAudioMobileId);
      window.appGlobals.activity('add', 'pointDown');
    }
  }

  addPoint(content, value, videoId, audioId) {
    if (window.appUser.loggedIn() === true) {
      this.$.newPointAjax.url = "/api/points/" + this.post.group_id;
      this.$.newPointAjax.body = {
        postId: this.post.id,
        content: content,
        value: value
      };
      this.$.newPointAjax.generateRequest();
      this.set('addPointDisabled', true);
      if (videoId)
        this.set('currentVideoId', videoId);
      else if (audioId)
        this.set('currentAudioId', audioId);
    } else {
      window.appUser.loginForNewPoint(this, {content: content, value: value});
    }
  }

  focusUpPoint() {
    window.appGlobals.activity('focus', 'pointUp');
  }

  focusDownPoint() {
    window.appGlobals.activity('focus', 'pointDown');
  }

  focusTextArea(event) {
    event.currentTarget.parentElement.elevation = 3;
  }

  blurTextArea(event) {
    event.currentTarget.parentElement.elevation = 1;
  }

  _hasCurrentUpVideo(value) {
    if (value) {
      this.set('hideUpAudio', true);
      this.set('hideUpText', true);
    } else {
      this.set('hideUpAudio', false);
      this.set('hideUpText', false);
    }
  }

  _hasCurrentDownVideo(value) {
    if (value) {
      this.set('hideDownAudio', true);
      this.set('hideDownText', true);
    } else {
      this.set('hideDownAudio', false);
      this.set('hideDownText', false);
    }
  }

  _hasCurrentUpAudio(value) {
    if (value) {
      this.set('hideUpVideo', true);
      this.set('hideUpText', true);
    } else {
      this.set('hideUpVideo', false);
      this.set('hideUpText', false);
    }
  }

  _hasCurrentDownAudio(value) {
    if (value) {
      this.set('hideDownVideo', true);
      this.set('hideDownText', true);
    } else {
      this.set('hideDownVideo', false);
      this.set('hideDownText', false);
    }
  }

  _hasCurrentMobileVideo(value) {
    if (value) {
      this.set('hideMobileAudio', true);
      this.set('hideMobileText', true);
    } else {
      this.set('hideMobileAudio', false);
      this.set('hideMobileText', false);
    }
  }

  _hasCurrentMobileAudio(value) {
    if (value) {
      this.set('hideMobileVideo', true);
      this.set('hideMobileText', true);
    } else {
      this.set('hideMobileVideo', false);
      this.set('hideMobileText', false);
    }
  }

  ifLengthIsRight(type, textValue, hasVideoId, hasAudioId) {
    if (hasVideoId != null) {
      if (type==="up") {
        this.set("hideUpVideo", false);
        this.set('hideUpAudio', true);
        this.set('hideUpText', true);
      }
      if (type==="down") {
        this.set("hideDownVideo", false);
        this.set("hideDownAudio", true);
        this.set("hideDownText", true);
      }
      if (type==="mobile") {
        this.set("hideMobileVideo", false);
        this.set("hideMobileAudio", true);
        this.set("hideMobileText", true);
      }
      return true;
    } else  if (hasAudioId != null) {
      if (type==="up") {
        this.set("hideUpAudio", false);
        this.set('hideUpVideo', true);
        this.set('hideUpText', true);
      }
      if (type==="down") {
        this.set("hideDownAudio", false);
        this.set("hideDownVideo", true);
        this.set("hideDownText", true);
      }
      if (type==="mobile") {
        this.set("hideMobileAudio", false);
        this.set("hideMobileVideo", true);
        this.set("hideMobileText", true);
      }
      return true;
    } else if (textValue!=null && textValue.length === 0) {
      if (type==="up") {
        this.set("hideUpVideo", false);
        this.set('hideUpAudio', false);
        this.set('hideUpText', false);
      }
      if (type==="down") {
        this.set("hideDownVideo", false);
        this.set("hideDownAudio", false);
        this.set("hideDownText", false);
      }
      if (type==="mobile") {
        this.set("hideMobileVideo", false);
        this.set("hideMobileAudio", false);
        this.set("hideMobileText", false);
      }
      return false;
    } else if (textValue!=null && textValue.length > 0) {
      if (type==="up") {
        this.set("hideUpVideo", true);
        this.set('hideUpAudio', true);
        this.set('hideUpText', false);
      }
      if (type==="down") {
        this.set("hideDownVideo", true);
        this.set("hideDownAudio", true);
        this.set("hideDownText", false);
      }
      if (type==="mobile") {
        this.set("hideMobileVideo", true);
        this.set("hideMobileAudio", true);
        this.set("hideMobileText", false);
      }
      return true;
    } else if (textValue!=null && textValue.length > 1) {
      return true;
    } else {
      return false;
    }
  }
}

window.customElements.define('yp-post-points-lit', YpPostPointsLit)