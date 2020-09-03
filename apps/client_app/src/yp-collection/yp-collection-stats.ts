import { property, html, css, customElement } from 'lit-element';
import { nothing } from 'lit-html';

import { YpBaseElement } from '../@yrpri/yp-base-element.js';
import { YpFormattingHelpers } from '../@yrpri/YpFormattingHelpers.js';

import '@material/mwc-icon';

@customElement('yp-collection-stats')
export class YpCollectionStats extends YpBaseElement {
  @property({ type: Object })
  collection: YpCollectionData | undefined;

  @property({ type: String })
  collectionType: string | undefined;

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
        }

        .stats {
          padding-top: 8px;
          padding-bottom: 0;
          color: var(--mdc-theme-on-surface-lighter);
        }

        .stats-text {
          font-size: 18px;
          text-align: right;
          vertical-align: bottom;
          margin-right: 8px;
          color: var(--mdc-theme-on-surface-lighter);
        }

        .stats-icon {
          margin-left: 8px;
          margin-bottom: 8px;
          margin-right: 8px;
        }
      `,
    ];
  }

  render() {
    return this.collection
      ? html`
          <div class="stats layout horizontal end-justified">
            <div class="layout horizontal">
              <mwc-icon title="${this.t('stats.posts')}" class="stats-icon bulb"
                >lightbulb_outline</mwc-icon
              >
              <div title="${this.t('stats.posts')}" class="stats-text">
                ${YpFormattingHelpers.number(this.collection.counter_posts)}
              </div>

              ${this.collectionType === 'community1'
                ? html`
                    <mwc-icon
                      .title="${this.t('stats.groups')}"
                      class="stats-icon"
                      >groups</mwc-icon
                    >
                    <div title="${this.t('stats.groups')}" class="stats-text">
                      ${YpFormattingHelpers.number(
                        this.collection.counter_groups
                      )}
                    </div>
                  `
                : nothing}
              ${this.collectionType === 'domain1'
                ? html`
                    <mwc-icon
                      .title="${this.t('stats.communities')}"
                      class="stats-icon"
                      >groups</mwc-icon
                    >
                    <div
                      title="${this.t('stats.communities')}"
                      class="stats-text">
                      ${YpFormattingHelpers.number(
                        this.collection.counter_communities
                      )}
                    </div>
                  `
                : nothing}
              <mwc-icon
                .title="${this.t('stats.points')}"
                icon="people"
                class="stats-icon"
                >comment</mwc-icon
              >
              <div title="${this.t('stats.points')}" class="stats-text">
                ${YpFormattingHelpers.number(this.collection.counter_points)}
              </div>

              <mwc-icon
                .title="${this.t('stats.users')}"
                icon="face"
                class="stats-icon"
                >person</mwc-icon
              >
              <div title="${this.t('stats.users')}" class="stats-text">
                ${YpFormattingHelpers.number(this.collection.counter_users)}
              </div>
            </div>
          </div>
        `
      : nothing;
  }
}