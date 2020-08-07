import { property, html, css, LitElement, customElement } from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
//import { ifDefined } from 'lit-html/directives/if-defined';
import { YpBaseElement } from '../@yrpri/yp-base-element.js';
import { YpAccessHelpers } from '../@yrpri/YpAccessHelpers.js';
import { YpMediaHelpers } from '../@yrpri/YpMediaHelpers.js';

import '@material/mwc-tab-bar';
import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-button';

import '../cs-story/cs-story.js';

import 'app-datepicker';

export const CreationStages: Record<string, number> = {
  IntroStory: 0,
  IntroSurvey: 1,
  ElectSecretary: 2,
  AddAndRateIssues: 3,
  FinalIssues: 4,
  NextMeeting: 5,
};

@customElement('cs-create-issues')
export class CsCreateIssues extends YpBaseElement {
  @property({ type: Boolean })
  storyOpen = true;

  @property({ type: Number })
  stage = CreationStages.IntroStory;

  render() {
    return html`
      ${this.storyOpen
        ? html`
            <div class="layout horizontal center-center">
              <div class="storyContainer">
                <cs-story number="2"></cs-story>
              </div>
            </div>
          `
        : html`
            <div class="layout vertical center-center">
              <div><h1>${this.t('chooseTimesYouAreFree')}</h1></div>

              <app-datepicker></app-datepicker>

              <mwc-button
                raised
                .label="${this.t('sendYourDates')}"
              ></mwc-button>
            </div>
          `}
    `;
  }

  _lastStoryCard() {
    this.storyOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addListener('cs-last-story-card', this._lastStoryCard.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListener('cs-last-story-card', this._lastStoryCard.bind(this));
  }

  static get styles() {
    return [
      super.styles,
      css`
        mwc-button {
          margin-top: 16px;
        }
        .storyContsainer {
          width: 300px;
          max-width: 300px;
        }
      `,
    ];
  }
}
