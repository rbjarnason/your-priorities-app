import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import '../../page-trends/page-trends.js';
import '../../page-stats/page-stats.js';
import '../../page-connections/page-connections.js'
import '../../page-topics/page-topics.js'

import '@material/mwc-button';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-icon';
import { FlexLayout } from './flex-layout.js';
import { ShadowStyles } from './shadow-styles.js';

export class AnalyticsApp extends LitElement {
  static get properties() {
    return {
      collectionType: { type: String },
      collectionId: { type: String },
    };
  }

  static get styles() {
    return [css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
      }

      header {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #ccc;
      }

      header ul {
        display: flex;
        justify-content: space-around;
        min-width: 400px;
        margin: 0 auto;
        padding: 0;
      }

      header ul li {
        display: flex;
      }

      header ul li a {
        color: #5a5c5e;
        text-decoration: none;
        font-size: 16px;
      }

      header ul li a:hover,
      header ul li a.active {
        color: blue;
      }

      main {
        flex-grow: 1;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      [hidden] {
        display: none !important;
      }

      mwc-tab {
        color: #000;
      }

      .paceImage {
        margin-right: auto;
        margin-top: 4px;
        margin-left: 48px;
        margin-bottom: 2px;
      }

      .analyticsText {
        margin-top: 8px;
        margin-left: 8px;
        font-size: 18px;
        color: #333;
      }
    `, FlexLayout, ShadowStyles];
  }

  constructor() {
    super();
    this.page = '0';
  }

  connectedCallback() {
    super.connectedCallback();
    this.collectionType = "communities";
    this.collectionId = "667";
    this.collectionId = "973";
    this.collectionId = "1068";
  }

  render() {
    return html`
        <div class="paceImage layout horizontal">
          <div><img height="32" src="https://yrpri-eu-direct-assets.s3-eu-west-1.amazonaws.com/YpLogos/YourPriorites-Trans-Wide.png"/></div>
          <div class="flex"></div>
          <div class="analyticsText">Community Wellbeing</div>
        </div>
      <header ?hidden="${this.currentGrievance}">
        <mwc-tab-bar @MDCTabBar:activated="${this._tabSelected}">
          <mwc-tab label="Trends" icon="bar_chart" stacked></mwc-tab>
          <mwc-tab label="Topics" icon="blur_on" stacked></mwc-tab>
          <mwc-tab label="Connections" icon="3d_rotation" stacked></mwc-tab>
        </mwc-tab-bar>
      </header>

      <main>
        ${this._renderPage()}
      </main>

      <p class="app-footer">

      </p>
    `;
  }

  _tabSelected(event) {
    this.page = event.detail.index.toString();
    this.requestUpdate();
  }

  _renderPage() {
    switch (this.page) {
      case '0':
        return html`
          <page-trends .collectionType="${this.collectionType}" .collectionId="${this.collectionId}"></page-trends>
      `;
      case '1':
        return html`
          <page-topics .collectionType="${this.collectionType}" .collectionId="${this.collectionId}"></page-topics>
        `;
      case '2':
        return html`
          <page-connections .collectionType="${this.collectionType}" .collectionId="${this.collectionId}"></page-connections>
        `;
      default:
      return html`
        <p>Page not found try going to <a href="#main">Main</a></p>
      `;
    }
  }

  __onNavClicked(ev) {
    ev.preventDefault();
    this.page = ev.target.hash.substring(1);
  }

  __navClass(page) {
    return classMap({ active: this.page === page });
  }
}