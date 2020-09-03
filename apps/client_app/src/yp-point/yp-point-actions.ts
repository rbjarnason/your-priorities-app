/* eslint-disable @typescript-eslint/camelcase */
import { property, html, css, customElement } from 'lit-element';
import { nothing } from 'lit-html';

import 'share-menu';
import { ShareMenu } from 'share-menu';

import '@material/mwc-icon-button';

import { removeClass } from '../@yrpri/RemoveClass.js';

import { YpBaseElement } from '../@yrpri/yp-base-element.js';

@customElement('yp-point-actions')
export class YpPointActions extends YpBaseElement {
  @property({ type: Object })
  point: YpPointData | undefined;

  @property({ type: Boolean })
  hideNotHelpful = false;

  @property({ type: Boolean })
  isUpVoted = false;

  @property({ type: Boolean })
  allDisabled = false;

  @property({ type: Boolean })
  hideSharing = false;

  @property({ type: Boolean })
  allowWhatsAppSharing = false;

  @property({ type: Number })
  pointQualityValue: number | undefined;

  @property({ type: String })
  pointUrl: string | undefined;

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          min-width: 125px;
        }

        .action-text {
          font-size: 12px;
          padding-top: 12px;
        }

        .action-up {
        }

        .action-down {
        }

        .up-selected {
          color: #444;
        }

        .down-selected {
          color: #444;
        }

        .middle {
        }

        .all-actions {
          color: #aaa;
          padding-right: 8px;
        }

        yp-ajax {
          min-width: 32px;
        }

        .myButton {
          --mwc-icon-button {
            width: 10px;
            height: 10px;
          }
        }

        .shareIcon {
          --paper-share-button-icon-color: #ddd;
          text-align: right;
        }

        .shareIcon[up-voted] {
          --paper-share-button-icon-color: var(--accent-color-400);
        }

        [hidden] {
          display: none !important;
        }
      `,
    ];
  }

  render() {
    return this.point
      ? html`
          <div
            class="all-actions layout horizontal flex start-justified"
            ?hidden="${this.hideNotHelpful}">
            <div id="actionUp" class="actionUp layout horizontal">
              <mwc-icon-button
                .label="${this.t('point.helpful')}"
                ?disabled="${this.allDisabled}"
                icon="arrow_upward"
                class="point-up-vote-icon myButton"
                @click="${this.pointHelpful}"></mwc-icon-button>
              <div class="action-text action-up layouthorizontal ">
                ${this.point.counter_quality_up}
              </div>
            </div>
            <div id="actionDown" class="actionDown layout horizontal">
              <mwc-icon-button
                .label="${this.t('point.not_helpful')}"
                ?disabled="${this.allDisabled}"
                icon="arrow_downward"
                class="point-down-vote-icon myButton"
                @click="${this.pointNotHelpful}"></mwc-icon-button>
              <div class="action-text">${this.point.counter_quality_down}</div>
            </div>
          </div>
          <mwc-icon-button
            icon="share"
            ?hidden="${this.hideSharing}"
            class="shareIcon"
            .label="${this.t('sharePoint')}"
            up-voted="${this.isUpVoted}"
            @click="${this._shareTap}"></mwc-icon-button>
          <share-menu
            @share="${this._sharedContent}"
            class="shareIcon"
            id="shareButton"
            .title="${this.t('post.shareInfo')}"
            .url="${this.pointUrl || ''}"></share-menu>

        `
      : nothing
  }

  connectedCallback() {
    super.connectedCallback();
    this.addGlobalListener('yp-got-endorsements-and-qualities', this._updateQualitiesFromSignal.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeGlobalListener('yp-got-endorsements-and-qualities', this._updateQualitiesFromSignal.bind(this))
  }


  _sharedContent(event: CustomEvent) {
    const shareData = event.detail;
    window.appGlobals.activity(
      'pointShared',
      shareData.social,
      this.point ? this.point.id : -1
    );
  }

  _shareTap(event: CustomEvent) {
    const detail = event.detail;
    window.appGlobals.activity(
      'pointShareHeaderOpen',
      detail.brand,
      this.point ? this.point.id : -1
    );
    (this.$$('#shareButton') as ShareMenu).share();
  }

  _onPointChanged() {
    if (this.point) {
      this._updateQualities();
    } else {
      this.isUpVoted = false;
    }
  }

  _updateQualitiesFromSignal() {
    this._updateQualities();
  }

  _updateQualities() {
    if (
      this.point &&
      window.appUser &&
      window.appUser.loggedIn() &&
      window.appUser.user &&
      window.appUser.user.PointQualities
    ) {
      const thisPointQuality =
        window.appUser.pointQualitiesIndex[this.point.id];
      if (thisPointQuality) {
        this._setPointQuality(thisPointQuality.value);
        if (thisPointQuality.value > 0) {
          this.isUpVoted = true;
        }
      } else {
        this.isUpVoted = false;
        this._setPointQuality(undefined);
      }
    } else {
      this.isUpVoted = false;
      this._setPointQuality(undefined);
    }
  }

  _qualityChanged() {
    // TODO: Fix where you can't vote up a newstory just after posting
    //this._resetClasses();
    //this.isUpVoted = false;
  }

  _resetClasses() {
    if (this.pointQualityValue && this.pointQualityValue > 0) {
      (this.$$('#actionUp')as HTMLElement).className += ' ' + 'up-selected';
      removeClass(this.$$('#actionDown') as HTMLElement, 'down-selected');
    } else if (this.pointQualityValue && this.pointQualityValue < 0) {
      (this.$$('#actionDown') as HTMLElement).className += ' ' + 'down-selected';
      removeClass(this.$$('#actionUp') as HTMLElement, 'up-selected');
    } else {
      removeClass(this.$$('#actionUp') as HTMLElement, 'up-selected');
      removeClass(this.$$('#actionDown') as HTMLElement, 'down-selected');
    }
  }

  _setPointQuality(value: number | undefined) {
    this.pointQualityValue = value;
    this._resetClasses();
  }

  async generatePointQuality(value: number) {
    if (this.point && window.appUser.loggedIn() === true) {
      let method
      if (this.pointQualityValue === value) {
        method = 'DELETE'
      } else {
        method = 'POST'
      }
      const pointQuality = await window.serverApi.setPointQuality(this.point.id, method, {
        point_id: this.point.id,
        value: value,
      }) as YpPointQualityResponse
      this._pointQualityResponse(pointQuality)

    } else {
      this.allDisabled = false;
      window.appUser.loginForPointQuality(this, { value: value });
    }
  }

  _pointQualityResponse(pointQualityResponse: YpPointQualityResponse) {
    this.allDisabled = false;
    const pointQuality = pointQualityResponse.pointQuality;
    const oldPointQualityValue = pointQualityResponse.oldPointQualityValue;
    this._setPointQuality(pointQuality.value);
    window.appUser.updatePointQualityForPost(this.point!.id, pointQuality);
    if (oldPointQualityValue) {
      if (oldPointQualityValue > 0)
        this.point!.counter_quality_up = this.point!.counter_quality_up - 1;
      else if (oldPointQualityValue < 0)
        this.point!.counter_quality_down = this.point!.counter_quality_down - 1;
    }
    if (pointQuality.value > 0)
      this.point!.counter_quality_up = this.point!.counter_quality_up + 1;
    else if (pointQuality.value < 0)
      this.point!.counter_quality_down = this.point!.counter_quality_down + 1;

    this.requestUpdate()
  }

  generatePointQualityFromLogin(value: number) {
    if (this.point && !window.appUser.pointQualitiesIndex[this.point.id]) {
      this.generatePointQuality(value);
    }
  }



  pointHelpful() {
    this.allDisabled = true;
    this.generatePointQuality(1);
    this.isUpVoted = true;
    this.requestUpdate;
    window.appGlobals.activity('clicked', 'pointHelpful', this.point!.id);
  }

  pointNotHelpful() {
    this.allDisabled = true;
    window.appGlobals.activity('clicked', 'pointNotHelpful', this.point!.id);
    this.generatePointQuality(-1);
    this.requestUpdate;
  }
}