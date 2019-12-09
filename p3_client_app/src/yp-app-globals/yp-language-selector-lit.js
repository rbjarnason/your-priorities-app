import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import 'lite-signal/lite-signal.js';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '../yp-ajax/yp-ajax.js';
import { ypLanguageBehavior } from '../yp-behaviors/yp-language-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

class YpLanguageSelectorLit extends YpBaseElement {
  static get properties() {
    return {
      supportedLanguages: {
        type: Object,
        value: {
          en: 'English (US)',
          en_GB: 'English (GB)',
          fr: 'Français',
          is: 'Íslenska',
          es: 'Spanish',
          it: 'Italian',
          ca: 'Catalan',
          de: 'German',
          da: 'Danish',
          en_CA: 'English (CA)',
          nl: 'Dutch',
          no: 'Norwegian',
          tr: 'Turkish',
          fa: 'Persian',
          pl: 'Polish',
          pt: 'Portuguese',
          pt_BR: 'Portuguese (Brazil)',
          ru: 'Russian',
          hu: 'Hungarian',
          zh_TW: 'Chinese (TW)',
          sr: 'Serbian',
          sr_latin: 'Serbian (latin)',
          hr: 'Croatian',
          kl: 'Greenlandic',
          sl: 'Slovenian'
        }
      },
  
      noGoogleTranslateLanguages: {
        type: Array,
        value: ['kl','sr_latin']
      },
  
      languages: {
        type: Array,
        computed: '_languages(supportedLanguages)'
      },
  
      selectedLocale: {
        type: String,
        observer: '_selectedLocaleChanged'
      },
  
      noUserEvents: {
        type: Boolean,
        value: false
      },
  
      value: {
        type: String,
        value: ""
      },
  
      canUseAutoTranslate: {
        type: Boolean,
        computed: '_canUseAutoTranslate(language, hasServerAutoTranslation, autoTranslateOptionDisabled)'
      },
  
      autoTranslateOptionDisabled: {
        type: Boolean,
        value: false
      },
  
      autoTranslate: {
        type: Boolean,
        value: false
      },
  
      hasServerAutoTranslation: {
        type: Boolean,
        value: false
      },
  
      isOutsideChangeEvent: {
        type: Boolean,
        value: false
      }
    }
  }

  static get styles() {
    return [
      css`

      paper-dropdown-menu {
        max-width: 250px;
      }

      .translateButton {
        padding: 8px;
        color: var(--accent-color);
        margin-top: 8px;
      }

      .stopTranslateButton {
        padding: 8px;
        color: white;
        background: var(--accent-color);
        margin-top: 8px;
      }

      .translateText {
        margin-left: 8px;
      }

      .stopIcon {
        margin-left: 8px;
      }
    `, YpFlexLayout]
  }

  render() {
    return html`
    ${this.language ? html`
    <div class="layout vertical">
      <paper-dropdown-menu .label="Select language" .selected="${this.selectedLocale}}" .attrForSelected="name">
        <paper-listbox slot="dropdown-content" .selected="${this.selectedLocale}" .attrForSelected="name">
          <template is="dom-repeat" .items="${this.languages}">
            <paper-item .name="${this.item.language}">${this.item.name}</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>
      <div ?hidden="${!this.canUseAutoTranslate}">
        <paper-button ?hidden="${this.autoTranslate}" raised class="layout horizontal translateButton" @tap="${this._startTranslation}" .title="${this.t('autoTranslate')}">
          <iron-icon icon="translate"></iron-icon>
          <div class="translateText">${this.t('autoTranslate')}</div>
        </paper-button>
        <paper-button ?hidden="${!this.autoTranslate}" raised class="layout horizontal stopTranslateButton" @tap="${this._stopTranslation}" .title="${this.t('stopAutoTranslate')}">
          <iron-icon .icon="translate"></iron-icon>
          <iron-icon class="stopIcon" .icon="do-not-disturb"></iron-icon>
        </paper-button>
      </div>
    </div>

    <yp-ajax id="hasAutoTranslationAjax" url="/api/users/has/AutoTranslation" @response="${this._hasAutoTranslationResponse}"></yp-ajax>
` : html``}
`
  }

/*
  behaviors: [
    ypLanguageBehavior,
    IronFormElementBehavior
  ],
*/

  ready() {
    if (!this.noUserEvents) {
      this.$.hasAutoTranslationAjax.generateRequest();
      // Update dropdown language after it has been loaded from defaults
      this.async(function () {
        this.set('selectedLocale', this.language);
      }, 1500);
    }
  }

  _autoTranslateEvent(event, detail) {
    this.set('autoTranslate', detail);
  }

  _stopTranslation() {
    document.dispatchEvent(
      new CustomEvent("lite-signal", {
        bubbles: true,
        compose: true,
        detail: { name: 'yp-auto-translate', data: false }
      })
    );
    window.autoTranslate = false;
    this.fire('yp-language-name', this.supportedLanguages[this.language]);
    dom(document).querySelector('yp-app').getDialogAsync("masterToast", function (toast) {
      toast.text = this.t('autoTranslationStopped');
      toast.show();
    }.bind(this));
    window.appGlobals.activity('click', 'stopTranslation', this.language);
    sessionStorage.setItem("dontPromptForAutoTranslation", true);
  }

  _startTranslation() {
    if (this._canUseAutoTranslate(this.language, this.hasServerAutoTranslation)) {
      document.dispatchEvent(
        new CustomEvent("lite-signal", {
          bubbles: true,
          compose: true,
          detail: { name: 'yp-auto-translate', data: true }
        })
      );
      window.autoTranslate = true;
      this.fire('yp-language-name', this.supportedLanguages[this.language]);
      dom(document).querySelector('yp-app').getDialogAsync("masterToast", function (toast) {
        toast.text = this.t('autoTranslationStarted');
        toast.show();
      }.bind(this));
    }
    window.appGlobals.activity('click', 'startTranslation', this.language);
  }

  _canUseAutoTranslate(language, hasServerAutoTranslation, autoTranslateOptionDisabled) {
    if (!autoTranslateOptionDisabled && language && hasServerAutoTranslation && !this.noUserEvents) {
      var found = this.noGoogleTranslateLanguages.indexOf(language) > -1;
      return !found;
    } else {
      return false;
    }
  }

  _hasAutoTranslationResponse(event, detail) {
    if (detail.response && detail.response.hasAutoTranslation===true) {
      this.set('hasServerAutoTranslation', true);
    } else {
      this.set('hasServerAutoTranslation', false);
    }
  }

  _languages(supportedLanguages) {
    if (supportedLanguages) {
      var arr = [];
      for (var key in supportedLanguages) {
        if (supportedLanguages.hasOwnProperty(key)) {
          arr.push({ language: key, name: supportedLanguages[key] });
        }
      }
      return arr;
    } else {
      return [];
    }
  }

  _selectedLocaleChanged(locale, oldLocale) {
    if (locale) {
      this.set('value', locale);
      if (!this.noUserEvents && oldLocale) {
        if (!this._canUseAutoTranslate(locale, this.hasServerAutoTranslation) && this.autoTranslate) {
          this._stopTranslation();
        }
        this.fire('yp-language-name', this.supportedLanguages[locale]);
        window.appGlobals.changeLocaleIfNeeded(locale, true);
        localStorage.setItem('yp-user-locale', locale);
        console.info("Saving locale");
        if (window.appUser && window.appUser.user) {
          window.appUser.setLocale(locale);
        }
        window.appGlobals.activity('click', 'changeLanguage', locale);
      }
    }
    this.isOutsideChangeEvent = false;
  }
}