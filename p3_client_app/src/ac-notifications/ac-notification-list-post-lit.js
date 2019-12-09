import '@polymer/polymer/polymer-legacy.js';
import 'lite-signal/lite-signal.js';
import '../yp-app-globals/yp-app-icons.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { ypGotoBehavior } from '../yp-behaviors/yp-goto-behavior.js';
import { YpPostBehavior } from '../yp-post/yp-post-behaviors.js';
import { YpTruncatedNameList } from './ac-notification-truncated-name-list.js';
import { ypTruncateBehavior } from '../yp-behaviors/yp-truncate-behavior.js';
import { ypMediaFormatsBehavior } from '../yp-behaviors/yp-media-formats-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { YpBaseElement } from '../yp-base-element.js';

class AcNotificationListPostLit extends YpBaseElement {
  static get properties() {
    return {
      notification: {
        type: Object,
        observer: '_notificationChanged'
      },
  
      endorsementsText: {
        type: String,
        value: null
      },
  
      oppositionsText: {
        type: String,
        value: null
      },
  
      newPostMode: Boolean,
      endorseMode: Boolean,
      userName: {
        type: String,
        value: null
      },
      user: {
        type: Object,
        value: null
      }
    }
  }
  
  static get styles() {
    return [
      css`

      .pointerCursor {
        cursor: pointer;
      }

      .endorsers {

      }

      .opposers {

      }

      .bulb-icon {
        min-width: 26px;
        min-height: 26px;
        max-width: 26px;
        max-height: 26px;
        margin: 6px;
      }

      .bulb-icon[new-post] {
        color: var(--accent-color);
        min-width: 30px;
        min-height: 30px;
        max-width: 30px;
        max-height: 30px;
      }

      .smallIcons {
        max-width: 16px;
        max-height: 16px;
        min-width: 16px;
        min-height: 16px;
        padding-top: 2px;
        padding-right: 4px;
        color: var(--primary-love-color-up, rgba(168,0,0,0.65));
      }

      .postName {
        padding-top: 4px;
      }

      .postName {
        padding-top: 4px;
        padding-bottom: 0;
        color: #111;
      }

      .userName {
        font-style: bold;
      }

      .leftContainer {
        margin-right: 8px;
      }

      [hidden] {
        display: none !important;
      }
    `, YpFlexLayout]
  }

  render() {
    return html` 
    <div class="layout vertical pointerCursor" @tap="${this.goToPost}" ?hidden="${!this.post}">
      <div class="layout horizontal">
        <div class="layout vertical center-center self-start leftContainer">
          <yp-user-image .small="" .user="${this.user}"></yp-user-image>
          <iron-icon .icon="lightbulb-outline" .newPost="${this.newPostMode}" class="bulb-icon"></iron-icon>
        </div>
        <div class="layout vertical">
          <div ?hidden="${!this.endorsementsText}">
            <div class="layout horizontal">
              <iron-icon .icon="favorite" class="smallIcons endorsers"></iron-icon>
              <div class="endorsers">${this.endorsementsText}</div>
            </div>
          </div>
          <div ?hidden="${!this.oppositionsText}">
            <div class="layout horizontal">
              <iron-icon .icon="do-not-disturb" class="smallIcons opposers"></iron-icon>
              <div class="opposers">${this.oppositionsText}</div>
            </div>
          </div>
          <div class="postName">${this.postName}</div>
          <div ?hidden="${!this.newPostMode}" class="userName">${this.userName}</div>
        </div>
      </div>
    </div>

    <lite-signal @lite-signal-yp-language="${this._languageEvent}"></lite-signal>
`
  }


/*
  behaviors: [
    ypLanguageBehavior,
    YpPostBehavior,
    YpTruncatedNameList,
    ypGotoBehavior,
    ypTruncateBehavior,
    ypMediaFormatsBehavior
  ],
*/

  goToPost() {
    if (this.post) {
      var postUrl = '/post/' + this.post.id;
      window.appGlobals.activity('open', 'post', postUrl);
      this.async(function () {
        this.redirectTo(postUrl);
        this.fire('yp-close-right-drawer');
      });
    }
  }

  _notificationChanged(notification) {
    if (notification) {
      this.set('post', notification.AcActivities[0].Post);
      this.set('userName', notification.AcActivities[0].User.name);
      this.set('user', notification.AcActivities[0].User);
      if (notification.type=='notification.post.new') {
        this.set('newPostMode', true);
      } else if (notification.type=='notification.post.endorsement') {
        this.set('endorseMode', true);
        this.set('newPostMode', false);
        this._createEndorsementStrings();
      }
    } else {
      this.set('endorsementsText', null);
      this.set('oppositionsText', null);
      this.set('newPostMode', null);
      this.set('endorseMode', null);
      this.set('userName', null);
      this.set('user', null);
    }
  }

  _createEndorsementStrings() {
    var endorsements;
    var oppositions;

    this.notification.AcActivities.forEach(function (activity) {
      if (activity.type=='activity.post.endorsement.new') {
        if (!endorsements) {
          endorsements = "";
        }
        endorsements = this._addWithComma(endorsements, activity.User.name);
      } else if (activity.type=='activity.post.opposition.new') {
        if (!oppositions) {
          oppositions = "";
        }
        oppositions = this._addWithComma(oppositions, activity.User.name);
      }
    }.bind(this));

    if (endorsements && endorsements!="") {
      this.set('endorsementsText', this.truncateNameList(endorsements));
    }

    if (oppositions && oppositions!="") {
      this.set('oppositionsText', this.truncateNameList(oppositions));
    }

  }

  _addWithComma(text, toAdd) {
    var returnText = "";
    if (text!='') {
      returnText += text+",";
    }
    return returnText+toAdd;

  }
}

window.customElements.define('ac-notification-list-post-lit', AcNotificationListPostLit)