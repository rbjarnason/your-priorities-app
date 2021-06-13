import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../../yp-app-globals/yp-app-icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { ypLanguageBehavior } from '../../yp-behaviors/yp-language-behavior.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      .grid {
        @apply --layout-vertical;
      }

      .grid-container {
        @apply --layout-horizontal;
      }

      yp-point {
        padding: 8px;
      }

      .top-border {
      }

    </style>

    <div class="grid-container">
      <div class="grid">
        <yp-point id="point4"></yp-point>
        <yp-point id="point1"></yp-point>
        <yp-point id="point5"></yp-point>
      </div>
      <div class="grid">
        <yp-point id="point2"></yp-point>
        <yp-point id="point3"></yp-point>
      </div>
    </div>
`,

  is: 'test-points',

  behaviors: [
    ypLanguageBehavior
  ],

  ready: function (e) {
    this.$.point1.point = {id: 328,
      value: 1,
      name:'My point',
      content:'Today if an inventor wanted to develop a new software product for patients in hospitals, it is all but impossible for them to make their product available, because so many NHS facilities are in mobile black-spots and the most vulnerable patients may have smartphones but not credit or a data-plan. Free WiFi could help keep bored patients (and their children!) entertained, develop translation services that wouldnt burden the NHS, and perhaps relieve some of the social isolation of being a patient',
      PointRevisions: [{User: {login: "Róbert Viðar Bjarnason", facebook_uid: "732242047"}}],
      PointQualities: [{value: 1},{value: -1},{value: 1},{value: -1},
        {value: -1},{value: -1},{value: 1},{value: 1}]
    };

    this.$.point3.point = {id: 105,
      value: -1,
      name:'NHS Citizen',
      top_banner_file_name: 'NHScitizen_logo_final2c.png',
      content:'This is a test version of the NHS Citizen Gather space; it helps people identify and discuss the issues that the NHS should be talking about. Posts that generate the most discussion and support or whith the right people.',
      PointRevisions: [{User: {login: "Róbert Viðar Bjarnason", facebook_uid: "1660988492"}}],
      PointQualities: [{value: -1},{value: -1},{value: 1},{value: -1},
        {value: -1},{value: -1},{value: 1},{value: 1}]
    };

    this.$.point2.point = {id: 101,
      value: -1,
      name:'Tackle the waiting, not create distractions',
      content:'Where ever there is free wifi offered, there will be those who want to abuse it. As in coffee shops where "writers" sit for hours on end using the free wifi, drinking 1 coffee, there is a risk that if hospitals offer free wifi, you will find "patients" in ED using the free wifi. A possible upside is that having longer waiting times will not be as critisied with everyone checking their FB status or snapchating pics of the queues.',
      PointRevisions: [{User: {login: "Róbert Viðar Bjarnason", facebook_uid: "1664651348"}}],
      PointQualities: [{value: 1},{value: -1},{value: 1},{value: -1},
        {value: -1},{value: 1},{value: 1},{value: 1}]
    };

    this.$.point4.point = {id: 361,
      name:'Improving abilities for patients to communicate is vital',
      value: 1,
      content:'One of the basic rights of all patients should be an ability to enagage with family and friends when in hospital. Often this can only be done remotely and therefore it is vital that free wifi is given automatically and without charge to patients.',
      PointRevisions: [{User: {login: "Róbert Viðar Bjarnason", facebook_uid: "285900266"}}],
      PointQualities: [{value: 1},{value: -1},{value: 1},{value: -1},
        {value: -1},{value: 1},{value: 1},{value: 1}]
    };

    this.$.point5.point = {id: 361,
      value: 1,
      name:'Could also reduce the amount of paper information leaflets',
      content:'Your points and participation will help provide a series of recommendations to the European Commission on the best strategies, policies and funding instruments.',
      PointRevisions: [ {User: {login: "Róbert Viðar Bjarnason", facebook_uid: "100002293870020"}} ],
      PointQualities: [{value: 1},{value: -1},{value: 1},{value: -1},
        {value: -1},{value: 1},{value: 1},{value: 1}]
    };
  }
});
