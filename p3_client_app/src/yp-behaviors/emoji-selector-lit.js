/*
`emoji-selector` is a `paper-input-addon` component (see Polymer.PaperInput)
that lets you select an emoji from a list and insert it into a text field.

Since you probably don't remember where each emoji is, it ships with a
search-for-emoji-keywords feature!

Example:

    <paper-input label="needs moar emoji">
      <emoji-selector suffix></emoji-selector>
    </paper-input>

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--emoji-selector-background-color` | Background color of the popup | `white`
`--emoji-selector-icon-color` | Color of the category icons | `black`
`--emoji-selector` | Mixin applied to the popup | `{}`
`--emoji-selector-icon` | Mixin applied to the emoji icons | `{}`
`--emoji-selector-icon-hover` | Mixin applied to the emoji icons when hovered | `{}`

You can also use any of the Polymer.PaperInputContainer styles to style the
search input, or the Polymer.PaperTabs and Polymer.PaperTab styles to style
the category tabs.

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/apaper-input.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '../yp-app-globals/yp-app-icons.js';
import { ypLanguageBehavior } from './yp-language-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
 
class EmojiSelectorLit extends YpBaseElement {
  static get properties() {
    return {
 /**
     * The input element the emojis should be inserted to. If not specified,
     * and the emoji-selector is used as a ``<paper-input>`` suffix element, then
     * `inputTarget` will be this parent `paper-input` element.
     */
    inputTarget: {
      type: Object
    },

    /**
     * The selected category.
     */
    selected: {
      type: Number,
      value: 0
    },

    /**
     * A list of all emojis, split by category.
     */
    emojis: {
      type: Array,
      value: []
    },

    /**
     * A sorted list of all recently used emoji.
     */
    recentlyUsedEmojis: {
      type: Array,
      value: []
    },

    /**
     * A list of the emojis matching the search.
     */
    searchResults: {
      type: Array,
      value: []
    },

    smallScreen: {
      type: Boolean,
      value: false
    }
    }
  }
    
  static get styles() {
    return [
      css`

      paper-tabs {
        height: 30px;
        color: var(--emoji-selector-icon-color, black);
        background-color: var(--emoji-selector-background-color, #FFF);
      }

      paper-tab iron-icon {
        --iron-icon-width: 18px;
        --iron-icon-height: 18px;
      }

      #searchInput {
        --paper-input-container-input: {
          text-align: center;
        };
      };

      iron-pages {
        height: 155px;
      }

      #menu {
        padding: 0;
      }

      .box {
        background-color: var(--emoji-selector-background-color, #FFF);
        border-radius: 2px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);

        width: 270px;
        height: 240px;
        font-size: 15px;
      }

      .section-title {
        padding: 0;
        margin: 0;
        font-size: 11px;
        text-transform: uppercase;
        color: var(--emoji-selector-icon-color, black);
      }

      .emoji-section {
        height: 100%;
        overflow-y: auto;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: 8px;
        padding-top: 5px;
      }

      .emoji-icon {
        cursor: pointer;
        text-align: center;
        display: inline-block;
        font-size: 18px;
        line-height: 24px;
        width: 24px;
        height: 24px;

        /* >.< */
        -webkit-transition: all .14s linear;
        -moz-transition: all .14s linear;
        -o-transition: all .14s linear;
        -ms-transition: all .14s linear;
        transition: all .14s linear;
      }

      .emoji-icon:hover {
        transform: scale(1.3, 1.3);
        -webkit-transform: scale(1.3, 1.3);
      }

      paper-icon-button.clear-button {
        color: var(--paper-input-container-color);
        --iron-icon-width: 15px;
        --iron-icon-height: 15px;
        padding: 0px 4px;
        margin-left: 4px;
      }

      paper-listbox {
        background-color: #FFF;
      }

      .dropdown-trigger {
        color: #444;
      }
      
    `, YpFlexLayout];
  }

  render() {
    return html`
    <iron-media-query query="(max-width: 375px)" query-matches="${this.smallScreen}"></iron-media-query>
    <lite-signal @lite-signal-yp-language="${this._languageEvent}"></lite-signal>

    <paper-menu-button id="menu" .verticalAlign="top" vertical-offset="20" dynamic-align ignore-select="">
      <paper-icon-button title="${this.t('addEmoji')}" .icon="insert-emoticon" slot="dropdown-trigger"></paper-icon-button>
      <paper-listbox slot="dropdown-content">
        <div class="box">
          <paper-input autofocus="" no-label-float="" id="searchInput" placeholder="${this.t('findAnEmoji')}" @input="${this._onSearchInput}">
            <paper-icon-button .ariaLabel="${this.t('clearSearchInput')}" suffix=""@tap="${this._onClearSearchInput}" id="clearSearch" class="clear-button hide" .icon="clear" alt="clear" .title="clear" tabindex="0" hidden>
            </paper-icon-button>
          </paper-input>

          <paper-tabs selected="${this.selected}" id="tabs" tabindex="0">
            <paper-tab><iron-icon .icon="history"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="mood"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="local-florist"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="local-pizza"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="cake"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="directions-walk"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="account-balance"></iron-icon></paper-tab>
            <paper-tab><iron-icon .icon="perm-phone-msg"></iron-icon></paper-tab>
          </paper-tabs>

          <iron-pages .selected="${this.selected}">
            <div class="emoji-section" .role="list">
              <p class="section-title">${this.t('recentlyUsedEmoji')}</p>
              ${ this.recentlyUsedEmojis.map(item => html`
                <div class="emoji-icon" .role="button" tabindex="${this._tabIndex(index)}" @keydown="${this._keyDown}" @tap="${this._onEmojiClick}">${this.item}</div>
              `)}
            </div>
              ${ this.emoji.map(category => html`
                <div class="emoji-section" .role="list">
                  <p class="section-title">${this.category.title}</p>
                  ${ this.category.items.map(item => html`
                    <div class="emoji-icon" .role="button" tabindex="${this._tabIndex(index)}" @keydown="${this._keyDown}" @tap="${_onEmojiClick}" .title="${this.item.keywords}">${this.item.char}</div> 
                  `)}  
                </div>
              `)}
            <div class="emoji-section" .role="list">
              <p class="section-title">${this.t('emojiSearchResults')}</p>
              ${ this.searchResults.map(item => html`
                <div class="emoji-icon" .role="button" tabindex="${this._tabIndex(index)}" @keydown="${this._keyDown}" @tap="${this._onEmojiClick}" .title="${this.item.keywords}">${this.item.char}</div>
              `)}
            </div>
          </iron-pages>
        </div>
      </paper-listbox>
    </paper-menu-button>
  `
  }

  
/*
  behaviors: [
    ypLanguageBehavior
  ],
*/


  _tabIndex(index) {
    return index+1;
  }

  _keyDown(event) {
    if (event.keyCode===13) {
      this._onEmojiClick(event);
    }
  }

  ready() {
    this.inputTarget = dom(this).parentNode;
    this._selectedTabBeforeSearch = 1;
  }

  attached() {
    this._hasLocalStorage = this._checkLocalStorage();
    // Restore recently used emoji.
    if (this._hasLocalStorage) {
      this._localStorageKey = '__emoji-selector-recently-used__';
      this.recentlyUsedEmojis = JSON.parse(localStorage.getItem(this._localStorageKey));
    }

    if (this.recentlyUsedEmojis === null) {
      this.recentlyUsedEmojis = [];
    }

    this._loadEmojiLib();
  }

  /**
   * Load and parse the emojis into something we can use.
   */
  _loadEmojiLib() {
    const request = new XMLHttpRequest();
    const url = this.resolveUrl('https://s3.amazonaws.com/yrpri-direct-asset/yrpri6/emojis.json');
    request.open('GET', url, true);
    const self = this;

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        self._parseEmojiLib(JSON.parse(request.response));
      }
    };
    request.send();
  }

  _parseEmojiLib(emojis) {
    this.emojis = [{ 'name': 'people',  'items' : [ ], title : 'people' },
      { 'name': 'nature',  'items' : [ ], title : 'nature' },
      { 'name': 'foodanddrink',  'items' : [ ], title : 'food and drink' },
      { 'name': 'celebration',  'items' : [ ], title : 'celebration' },
      { 'name': 'activity',  'items' : [ ], title : 'activity' },
      { 'name': 'travelandplaces', 'items' : [ ], title : 'travel and places' },
      { 'name': 'objectsandsymbols', 'items' : [ ], title : 'objects and symbols' },
      { 'name': 'flags', 'items' : [ ], title : 'flags' }];
    const indexes = { 'people' : 0,
      'nature' : 1,
      'foodanddrink' : 2,
      'celebration': 3,
      'activity' : 4,
      'travelandplaces': 5,
      'objectsandsymbols': 6,
      'flags': 7,
    };
    this._searchPageIndex = 9;  // the page after the last legit emoji page.

    for (const name in emojis) {
      const category = emojis[name]['category'];
      const index = indexes[category];
      if (index !== undefined) {
        const keywords = emojis[name]['keywords'];
        if (keywords.indexOf(name) == -1)
          keywords.push(name);

        this.emojis[index]['items'].push(
          {'char': emojis[name]['char'],
            'keywords': keywords.join(' ').toLowerCase()});
      }
    }

    this.selected = this.recentlyUsedEmojis.length == 0 ? 1 : 0;
  }

  _onEmojiClick(event) {
    if (!this.inputTarget)
      return;
    const emoji = event.target.textContent;

    // If this emoji already exists, remove it. In all cases, add it to the
    // front of the queue since it's the newest one.
    const index = this.recentlyUsedEmojis.indexOf(emoji);
    if (index != -1)
      this.splice('recentlyUsedEmojis', index, 1);
    this.unshift('recentlyUsedEmojis', emoji);

    if (this._hasLocalStorage)
      localStorage.setItem(this._localStorageKey, JSON.stringify(this.recentlyUsedEmojis));

    const value = '';
    if (this.inputTarget.value)
      value = this.inputTarget.value;

    // Carets are witchcraft.
    const newValue = this._updateValueAndPreserveCaret(value, emoji);

    // This is a bit of a hack, but an iron-input or iron-autogrow-textarea
    // need to get notified to update their `bind-value`. And `onInput`
    // is a listener method, so fake the bit of the event it cares about.
    // Gross.
    if (this.inputTarget._onInput)
      this.inputTarget._onInput({target: {value: newValue}});

    this.inputTarget.focus();

    // Close the box.
    this._closeMenu();
  }

  _onSearchInput(event) {
    const search = this.$$("#searchInput").value.toLowerCase();
    if (search.trim() == '' && this.selected == this._searchPageIndex) {
      this.$$("#clearSearch").hidden = true;
      this.selected = this._selectedTabBeforeSearch;
      return;
    }

    // Remember what we were looking at before the search started.
    if (this.selected != this._searchPageIndex)
      this._selectedTabBeforeSearch = this.selected;
    this.$$("#clearSearch").hidden = false;

    if (!this.emojis)
      return;

    this.selected = this._searchPageIndex;
    this.searchResults = [];

    // UGH
    for (let i = 0; i < this.emojis.length; i++) {
      const category = this.emojis[i];
      for (let j = 0; j < category.items.length; j++) {
        if (category.items[j]['keywords'].indexOf(search) != -1) {
          this.push('searchResults',
            {'char': category.items[j]['char'],
              'keywords': category.items[j]['keywords']});
        }
      }
    }
  }

  _onClearSearchInput() {
    this.$$("#clearSearch").hidden = true;
    this.$$("searchInput").value = '';
    this.selected = this._selectedTabBeforeSearch;
  }

  _closeMenu() {
    this.$$("#searchInput").focus();
    if (this.selected != this._searchPageIndex) {
      this.$$("#searchInput").value = '';
    }
    this.$$("#searchInput").selectionStart = 0;

    this.$$("#menu").close();
    this.$$("#tabs")
    .notifyResize();
  }

  _updateValueAndPreserveCaret(value, emoji) {
    // Preserve the cursor position. If this is a paper-input, we really
    // care about the cursor position of the underlying iron-input.
    const underlyingIronInput = this.inputTarget.inputElement;

    const start, end;

    if (underlyingIronInput) {
      start = underlyingIronInput.selectionStart || value.length;
      end = underlyingIronInput.selectionEnd || value.length + 1;
    } else {
      start = this.inputTarget.selectionStart || value.length;
      end = this.inputTarget.selectionEnd || value.length + 1;
    }

    const front = value.substring(0, start);
    const back = value.substring(end, value.length);
    const newValue = front + emoji + back;

    this.inputTarget.value = newValue;

    // Restore the cursor position. See the same note about paper-input above.
    if (underlyingIronInput) {
      underlyingIronInput.selectionStart = start + emoji.length;
      underlyingIronInput.selectionEnd = start + emoji.length;
    } else {
      this.inputTarget.selectionStart = start + emoji.length;
      this.inputTarget.selectionEnd = start + emoji.length;
    }

    return newValue;
  }

  _computeHorizontalAlign(smallScreen) {
    return smallScreen ? 'right': 'left';
  }

  _checkLocalStorage() {
    const mod = '__emoji_test_local_storage__';
    try {
      localStorage.setItem(mod, 'a');
      localStorage.removeItem(mod);
      return true;
    } catch (exception) {
      return false;
    };
  }
}

window.customElements.define('emoji-selector-lit', EmojiSelectorLit);