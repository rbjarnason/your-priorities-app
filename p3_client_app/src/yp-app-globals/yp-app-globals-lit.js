import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dialog/paper-dialog.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { ypGotoBehavior } from '../yp-behaviors/yp-goto-behavior.js';
import { ypAppRecommendationsBehavior } from './yp-app-recommendations-behavior.js';
import { ypAppCacheBehavior } from './yp-app-cache-behavior.js';
import { ypAppAnalyticsBehavior } from './yp-app-analytics-behavior.js';
import '../yp-session/yp-session.js';
import '../yp-ajax/yp-ajax.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import i18next from 'i18next';

class YpAppGlobalsLit extends YpBaseElement {
  static get properties() {
    return {
      dialogHeading: {
        type: String,
        value: ''
      },
  
      seenWelcome: {
        type: Boolean,
        value: false,
        notify: true
      },
  
      activityHost: {
        type: String,
        value: ""
      },
  
      resetSeenWelcome: {
        type: Boolean,
        value: false
      },
  
      disableWelcome: {
        type: Boolean,
        value: true
      },
  
      setupDefaults: {
        type: Boolean,
        value: false
      },
  
      domain: {
        type: Object,
        value: null,
        observer: '_domainChanged'
      },
  
      minSplashMs: {
        type: Number,
        value: 1500
      },
  
      requestInProgress: {
       type: Boolean,
       value: false
      },
  
      groupConfigOverrides: {
        type: Object,
        value: {}
      },
  
      currentAnonymousUser: {
        type: Object,
        value: null
      },
  
      currentAnonymousGroup: {
        type: Object,
        value: null
      },
  
      currentGroupForceSaml: {
        type: Boolean,
        value: false
      },
  
      disableFacebookLoginForGroup: {
        type: Boolean,
        value: false
      },
  
      originalQueryParameters: Object,
  
      externalGoalTriggerUrl: String,
  
      externalGoalCounter: {
        type: Number,
        value: 0
      },
  
      goalEvents: {
        type: Array,
        value: ['newPost','endorse_up','endorse_down','newPointFor','newPointAgainst']
      },
  
      notifyDialogText: String
      
    }
  }

  static get styles() {
    return [
      css`
  
      paper-dialog {
        background-color: #FFF;
        max-width: 400px;
      }

      .dialogText {
        margin-bottom: 0;
      }
    `, YpFLexLayout]
  }  
  
  render() {
    return html`
    <paper-dialog id="dialog">
      <div class="dialogText">${this.notifyDialogText}</div>
      <div class="buttons">
        <paper-button dialog-confirm autofocus @tap="${this._resetNotifyDialogText}">OK</paper-button>
      </div>
    </paper-dialog>

    <yp-session id="session"></yp-session>

    <yp-ajax id="boot" url="/api/domains" @response="${this._bootResponse}"></yp-ajax>
    <yp-ajax ?hidden="" auto url="/api/videos/hasVideoUploadSupport" @response="${this._hasVideoUploadSupport}"></yp-ajax>
    <yp-ajax ?hidden="" auto url="/api/audios/hasAudioUploadSupport" @response="${this._hasAudioUploadSupport}"></yp-ajax>
    <yp-ajax id="videoViewsAjax" ?hidden="" .method="PUT" url="/api/videos/videoView"></yp-ajax>
    <yp-ajax id="audioListenAjax" ?hidden="" .method="PUT" url="/api/audios/audioListen"></yp-ajax>
    <yp-ajax id="recommendationsForGroupAjax" .dispatchError="" ?hidden="" .method="PUT" @response="${this._recommendationsForGroupResponse}"></yp-ajax>
    <lite-signal @lite-signal-logged-in="${this._userLoggedIn}"></lite-signal>
`
  }
/* 
  behaviors: [
    ypLanguageBehavior,
    ypGotoBehavior,
    ypAppRecommendationsBehavior,
    ypAppCacheBehavior,
    ypAppAnalyticsBehavior
  ],
*/

  _resetNotifyDialogText() {
    this.set('notifyDialogText', null);
  }

  showRecommendationInfoIfNeeded() {
    if (!localStorage.getItem('ypHaveShownRecommendationInfo')) {
      localStorage.setItem("ypHaveShownRecommendationInfo", true);
      this.set('notifyDialogText', this.t('recommendationToastInfo'));
      this.$.dialog.open();
    }
  }

  showSpeechToTextInfoIfNeeded() {
    if (window.appGlobals.hasTranscriptSupport && !localStorage.getItem("haveShownTranscriptInfo")) {
      localStorage.setItem("haveShownTranscriptInfo", true);
      this.set('notifyDialogText', this.t('speechToTextInfo'));
      this.$.dialog.open();
    }
  }

  _hasVideoUploadSupport(event, detail) {
    if (detail && detail.response && detail.response.hasVideoUploadSupport===true) {
      window.appGlobals.hasVideoUpload = true;
    }

    if (detail && detail.response && detail.response.hasTranscriptSupport===true) {
      window.appGlobals.hasTranscriptSupport = true;
    }
  }

  sendVideoView(videoId) {
    this.$.videoViewsAjax.body = { videoId: videoId };
    this.$.videoViewsAjax.generateRequest();
    this.activity('view', 'video', videoId);
  }

  sendLongVideoView(videoId) {
    this.$.videoViewsAjax.body = { videoId: videoId, longPlaytime: true };
    this.$.videoViewsAjax.generateRequest();
  }

  _hasAudioUploadSupport(event, detail) {
    if (detail && detail.response && detail.response.hasAudioUploadSupport===true) {
      window.appGlobals.hasAudioUpload = true;
    }
  }

  sendAudioListen(audioId) {
    this.$.audioListenAjax.body = { audioId: audioId };
    this.$.audioListenAjax.generateRequest();
    this.activity('view', 'audio', audioId);
  }

  sendLongAudioListen(audioId) {
    this.$.audioListenAjax.body = { audioId: audioId, longPlaytime: true };
    this.$.audioListenAjax.generateRequest();
  }

  changeLocaleIfNeededAfterWait(locale, force) {
    console.log("changeLocaleIfNeeded "+locale);
    if (window.haveLoadedLanguages===true && locale && this.language!=locale) {
      if (force || !localStorage.getItem('yp-user-locale')) {
        i18next.changeLanguage(locale, function(loaded) {
          console.log("i18n init loaded "+loaded);
          console.log("Changed language to "+locale);
          document.dispatchEvent(
            new CustomEvent("lite-signal", {
              bubbles: true,
              compose: true,
              detail: { name: 'yp-language', data: { type: 'language-loaded', language: locale}  }
            })
          );
        });
      }
    }
  }

  changeLocaleIfNeeded(locale, force) {
    if (window.haveLoadedLanguages) {
      this.changeLocaleIfNeededAfterWait(locale, force)
    } else {
      this.async(function () {
        console.warn("Locales not loaded while trying to load languages, trying again in 500 ms");
        this.changeLocaleIfNeeded(locale, force)
      }, 500);
    }
  }

  parseQueryString() {
    var query = (window.location.search || '?').substr(1),
      map   = {};
    query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function(match, key, value) {
      map[key] = value;
    });
    this.originalQueryParameters = map;
  }

  setAnonymousUser(user) {
    this.set('currentAnonymousUser', user);
    console.debug("Set anon user "+user);
  }

  setAnonymousGroupStatus(group) {
    if (group && group.configuration && group.configuration.allowAnonymousUsers) {
      this.set('currentAnonymousGroup', group);
      console.debug("Have set anonymous group id: "+group.id);
      if (!window.appUser.user && this.currentAnonymousUser) {
        console.debug("Setting anon user from cache");
        window.appUser.setLoggedInUser(this.currentAnonymousUser);
      } else if (window.appUser && !window.appUser.user && group.configuration.allowAnonymousAutoLogin &&
                 this.originalQueryParameters && this.originalQueryParameters.autoLogin) {
        window.appUser.autoAnonymousLogin();
      }
    } else {
      if (window.appUser && window.appUser.user && window.appUser.user.profile_data && window.appUser.user.profile_data.isAnonymousUser) {
        window.appUser.removeAnonymousUser();
        console.debug("Logout anon user");
      }
      console.debug("Set anon group to null");
      this.set('currentAnonymousGroup', null);
    }
  }

  _domainChanged(domain) {
    if (domain) {
      document.dispatchEvent(
        new CustomEvent("lite-signal", {
          bubbles: true,
          compose: true,
          detail: { name: 'yp-domain-changed', data: { domain: domain } }
        })
      );
    }
  }

  notifyUserViaToast(text) {
    dom(document).querySelector('yp-app').getDialogAsync("masterToast", function (toast) {
      toast.text = text;
      toast.show();
    }.bind(this));
  }

  reBoot() {
    if (!this.requestInProgress) {
      this.$.boot.generateRequest();
    }
  }

  _removeSplashNode(splash) {
    console.log("Found splash");
    splash.parentNode.removeChild(splash);
    document.body.classList.remove('loading');
  }

  _removeSplash() {
    var splash = document.getElementById('splashCore');
    console.log("_removeSplashNode");
    if (splash) {
      this._removeSplashNode(splash);
    } else {
      this.async(function () {
        console.log("_removeSplashNode 2");
        splash = document.getElementById('splashCore');
        if (splash) {
          this._removeSplashNode(splash);
        } else {
          this.async(function () {
            console.log("_removeSplashNode 3");
            splash = document.getElementById('splashCore');
            if (splash) {
              this._removeSplashNode(splash);
            } else {

            }
          }, 1500);
        }
      }, 100);
    }
    console.log("Removing splash");
  }

  _userLoggedIn(event, user) {
    if (user) {
      this.async(function () {
        if (typeof ga == 'function') {
          ga('set', '&uid', user.id);
        }
      }, 250); // Wait a bit to make sure google analytics tracking id has been set up dynamically
      this._recommendationsForUser(user);
    } else {
      this._recommendationsForUser();
    }
  }

  _bootResponse(event, detail) {
    this._removeSplash();
    this.set('requestInProgress', false);
    this.set('domain', detail.response.domain);

    this.setupGoogleAnalytics(this.domain);
    if (window.location.pathname=="/") {
      if (detail.response.community && detail.response.community.configuration && detail.response.community.configuration.redirectToGroupId) {
        this.redirectTo("/group/"+detail.response.community.configuration.redirectToGroupId);
      } else if (detail.response.community && !detail.response.community.is_community_folder) {
        this.redirectTo("/community/"+detail.response.community.id);
      } else if (detail.response.community && detail.response.community.is_community_folder) {
        this.redirectTo("/community_folder/"+detail.response.community.id);
      } else {
        this.redirectTo("/domain/" + this.domain.id);
        this.fire("change-header", { headerTitle: this.domain.domain_name,
          headerDescription: this.domain.description});
      }
    }
  }

  setupGroupConfigOverride(groupId, configOverride) {
    var configOverrideHash = {};
    configOverride.split(";").forEach(function (configItem) {
      var splitItem = configItem.split("=");
      configOverrideHash[splitItem[0]] = splitItem[1];
    });
    this.groupConfigOverrides[groupId]=configOverrideHash;
    if (configOverrideHash["ln"]) {
      this.changeLocaleIfNeeded(configOverrideHash["ln"], true);
    }
  }

  // Example use http://localhost:4242/group/47/config/hg=1;rn=Your Priorities;ru=https://yrpri.org/
  overrideGroupConfigIfNeeded(groupId, configuration) {
    if (!configuration) {
      configuration = {};
    }
    var override = this.groupConfigOverrides[groupId];
    if (!override) {
      return configuration;
    } else {
      if (override["hg"]) {
        configuration["hideGroupHeader"]=Boolean(override["hg"]);
      }
      if (override["ht"]) {
        configuration["hideAllTabs"]=Boolean(override["ht"]);
      }
      if (override["hh"]) {
        configuration["hideHelpIcon"]=Boolean(override["hh"]);
      }
      if (override["rn"]) {
        configuration["customBackName"] = override["rn"];
      }
      if (override["ru"]) {
        configuration["customBackURL"] = override["ru"];
      }
      return configuration;
    }
  }

  activity(type, object, context, target) {
    var actor;

    if (window.appUser && window.appUser.user) {
      actor = window.appUser.user.id;
    } else {
      actor = "-1";
    }

    var logString = 'activity stream: ' + actor + ' ' + type + ' ' + object;

    console.log(logString);

    if (context)
      logString += ' ' + context;

    if (type=='open') {
      // Wait by sending open so pageview event can be completed before
      this.async(function ()  {
        this.sendToAnalyticsTrackers('send', 'event', object, type);
      }, 25);
    } else {
      this.sendToAnalyticsTrackers('send', 'event', object, type);
    }

    //TODO: Use fetch here
    var activityAjax = document.createElement('iron-ajax');
    var date = new Date();
    activityAjax.handleAs = 'json';
    activityAjax.contentType = 'application/x-www-form-urlencoded';
    activityAjax.url = '/api/users/createActivityFromApp';
    activityAjax.method = 'POST';
    activityAjax.body = {
      actor: actor,
      type: type,
      object: object,
      target: JSON.stringify(target),
      context: context ? context : "",
      path_name: location.pathname,
      event_time: date.toISOString(),
      session_id: this.getSessionFromCookie(),
      user_agent: navigator.userAgent
    };
    activityAjax.generateRequest();

    if (type==='completed' || type==='clicked') {
      this.checkExternalGoalTrigger(object);
    }
  }

  checkExternalGoalTrigger(object) {
    if (this.externalGoalTriggerUrl &&
        this.originalQueryParameters &&
        this.originalQueryParameters.goalThreshold &&
        this.goalEvents.indexOf(object) > -1) {
      this.externalGoalCounter += 1;
      if (this.externalGoalCounter==this.originalQueryParameters.goalThreshold) {
        //TODO: Use fetch
        var goalTriggerAjax = document.createElement('iron-ajax');
        goalTriggerAjax.handleAs = 'json';
        goalTriggerAjax.url = this.externalGoalTriggerUrl;
        goalTriggerAjax.params = this.originalQueryParameters;
        goalTriggerAjax.method = 'GET';
        goalTriggerAjax.generateRequest();
      }
    }
  }

  ready() {
    window.appStartTime = new Date();
    window.appGlobals = this;

    this.fire('app-ready');
    this.$.boot.generateRequest();
    this.requestInProgress = true;

    window.googleMapsApiKey = null; //'AIzaSyDkF_kak8BVZA5zfp5R4xRnrX8HP3hjiL0';
    window.instagramAccessToken = '3066250812.cf0499d.4d1d4db0bb8b43b59c057346511161c8';
    window.instagramClientID = 'd2f248ec764d4b208ab668b7561a89cc';

    this.parseQueryString();
  }

  setSeenWelcome() {
    this.seenWelcome = true;
    localStorage.setItem('yrpri-welcome-status', true);
  }

  getSessionFromCookie() {
    var strCookies = document.cookie;
    var cookiearray = strCookies.split(';');
    var sid = '';
    for (var i = 0; i < cookiearray.length; i++) {
      var name = cookiearray[i].split('=')[0];
      var value = cookiearray[i].split('=')[1];
      if (name == ' connect.sid')
        sid = value;
    }
    return sid;
  }

  computeHeading() {
    return this.t('');
  }
}