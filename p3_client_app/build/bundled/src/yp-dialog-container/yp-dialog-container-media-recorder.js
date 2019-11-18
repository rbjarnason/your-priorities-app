function _templateObject_cb150bd04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      video {\n      }\n\n      paper-dialog {\n        background-color: #FFF;\n      }\n\n      #dialog[audio-recording] {\n        width: 430px;\n      }\n\n      .mainbuttons {\n        width: 100%;\n        margin-top: 8px;\n        margin-bottom: 8px;\n      }\n\n      .horizontal {\n        @apply --layout-horizontal;\n      }\n\n      .center-center {\n        @apply --layout-center-center;\n      }\n\n      .flex {\n        @apply --layout-flex;\n      }\n\n      .recording {\n        color: #f00;\n        animation-name: pulse;\n        animation-duration: 1.3s;\n        animation-iteration-count: infinite;\n        animation-timing-function: linear;\n      }\n\n      .recordingTime {\n        color: #f00;\n        animation-name: pulse;\n        animation-duration: 1s;\n        animation-iteration-count: infinite;\n        animation-timing-function: linear;\n      }\n\n      @keyframes pulse {\n        from { opacity: 1; }\n        to { opacity: 0.5; }\n      }\n\n      .buttonText {\n        margin-left: 6px;\n      }\n\n      .actionButton {\n        color: var(--accent-color);\n      }\n\n      .iconButtons {\n        margin-top: 2px;\n      }\n\n      #secondsLeft {\n        margin-top: 12px;\n        margin-left: 4px;\n        margin-right: 4px;\n      }\n\n      .mainContainer {\n        padding: 0 24px;\n      }\n\n      @media (max-width: 640px) {\n        #dialog {\n          padding: 0;\n          margin: 0;\n          @apply --layout-self-start;\n        }\n        .mainContainer {\n          padding: 0 0;\n        }\n\n        .mainbuttons {\n          position: absolute;\n          bottom: 0;\n          left: 0;\n          width: 100%;\n          background-color: rgba(240,240,240,0.5);\n        }\n\n        #dialog {\n          min-height: 242px;\n          min-width: 320px;\n          width: 100%;\n        }\n      }\n\n      @media (max-width: 360px) {\n        .uploadFileText {\n          display: none;\n        }\n      }\n\n      .rememberBox {\n        margin-top: 8px;\n      }\n\n      #checkBox {\n        margin-left: 6px;\n      }\n\n      .header {\n        font-weight: bold;\n        font-size: 18px;\n        margin-bottom: 10px;\n      }\n\n      .uploadFileButton {\n        color: #888;\n      }\n\n      #waveform {\n        height: 128px;\n      }\n    </style>\n\n    <paper-dialog id=\"selectDevices\" modal=\"\">\n      <h2>[[selectDeviceTitle]]</h2>\n      <paper-dialog-scrollable>\n        <paper-listbox id=\"deviceListBox\">\n          <template is=\"dom-repeat\" items=\"[[allDevices]]\">\n            <paper-item on-tap=\"selectDeviceFunction\" id=\"[[item.deviceId]]\">[[item.label]]</paper-item>\n          </template>\n        </paper-listbox>\n        <div class=\"layout horizontal rememberBox\">\n          <div>\n            [[t('rememberDevice')]]\n          </div>\n          <input id=\"checkBox\" type=\"checkbox\">\n        </div>\n      </paper-dialog-scrollable>\n    </paper-dialog>\n\n    <paper-dialog id=\"noDevices\">\n      <h2>[[t('noDevicesFound')]]</h2>\n      <div class=\"button layout horizontal center-center\">\n        <paper-button dialog-dismiss=\"\" raised=\"\">[[t('ok')]]</paper-button>\n      </div>\n    </paper-dialog>\n\n    <paper-dialog id=\"dialog\" modal=\"\" audio-recording$=\"[[audioRecording]]\">\n      <div class=\"layout vertical no-padding mainContainer\">\n        <template is=\"dom-if\" if=\"[[videoRecording]]\">\n          <video id=\"videoRecorder\" class=\"videoRecorder\" hidden$=\"[[previewActive]]\"></video>\n          <video id=\"videoPreviewer\" preload=\"auto\" class=\"videoRecorder\" hidden$=\"[[!previewActive]]\"></video>\n        </template>\n        <template is=\"dom-if\" if=\"[[audioRecording]]\">\n          <div class=\"layout vertical center-center\">\n            <div class=\"layout horizontal center-center header\">[[t('voiceRecorder')]]</div>\n            <div id=\"waveform\" hidden$=\"[[recordedData]]\"></div>\n            <audio id=\"audioRecorder\" class=\"audioRecorder\" hidden=\"\"></audio>\n            <audio id=\"audioPreviewer\" controls=\"\" preload=\"auto\" class=\"audioRecorder\" hidden$=\"[[!previewActive]]\"></audio>\n          </div>\n        </template>\n        <div class=\"layout horizontal mainbuttons\" hidden$=\"[[!recorder]]\">\n          <paper-icon-button aria-label$=\"[[t('closeRecordingWindow')]]\" icon=\"clear\" class=\"iconButtons\" on-tap=\"_close\"></paper-icon-button>\n          <paper-icon-button aria-label$=\"[[t('deleteRecordedMedia')]]\" icon=\"delete\" class=\"iconButtons\" on-tap=\"_deleteRecording\" hidden$=\"[[!recordedData]]\"></paper-icon-button>\n          <paper-button on-tap=\"_startRecording\" hidden$=\"[[recordedData]]\">\n            <iron-icon id=\"recordingIcon\" icon=\"fiber-manual-record\"></iron-icon>\n            <div class=\"buttonText\">[[t('record')]]</div>\n          </paper-button>\n          <div id=\"secondsLeft\" hidden$=\"[[recordedData]]\">[[recordSecondsLeft]] [[t('seconds')]]</div>\n          <paper-button on-tap=\"_stopRecording\" hidden$=\"[[!isRecording]]\">\n            <iron-icon icon=\"stop\"></iron-icon>\n            <div class=\"buttonText\">[[t('stop')]]</div>\n          </paper-button>\n          <span hidden$=\"[[isRecording]]\">\n            <paper-button id=\"uploadFileButton\" class=\"uploadFileButton\" on-tap=\"_uploadFile\" hidden$=\"[[recordedData]]\">\n              <iron-icon icon=\"file-upload\"></iron-icon>\n              <div class=\"buttonText uploadFileText\">[[t('uploadFile')]]</div>\n            </paper-button>\n          </span>\n          <paper-button on-tap=\"_sendBack\" class=\"actionButton\" hidden$=\"[[!recordedData]]\">\n            <iron-icon icon=\"send\"></iron-icon>\n            <div class=\"buttonText\">[[t('send')]]</div>\n          </paper-button>\n        </div>\n      </div>\n      <div hidden$=\"[[!error]]\">\n        [[error]]\n      </div>\n    </paper-dialog>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <iron-ajax id=\"getTranslationAjax\" on-response=\"_getTranslationResponse\"></iron-ajax>\n"],["\n    <style>\n      video {\n      }\n\n      paper-dialog {\n        background-color: #FFF;\n      }\n\n      #dialog[audio-recording] {\n        width: 430px;\n      }\n\n      .mainbuttons {\n        width: 100%;\n        margin-top: 8px;\n        margin-bottom: 8px;\n      }\n\n      .horizontal {\n        @apply --layout-horizontal;\n      }\n\n      .center-center {\n        @apply --layout-center-center;\n      }\n\n      .flex {\n        @apply --layout-flex;\n      }\n\n      .recording {\n        color: #f00;\n        animation-name: pulse;\n        animation-duration: 1.3s;\n        animation-iteration-count: infinite;\n        animation-timing-function: linear;\n      }\n\n      .recordingTime {\n        color: #f00;\n        animation-name: pulse;\n        animation-duration: 1s;\n        animation-iteration-count: infinite;\n        animation-timing-function: linear;\n      }\n\n      @keyframes pulse {\n        from { opacity: 1; }\n        to { opacity: 0.5; }\n      }\n\n      .buttonText {\n        margin-left: 6px;\n      }\n\n      .actionButton {\n        color: var(--accent-color);\n      }\n\n      .iconButtons {\n        margin-top: 2px;\n      }\n\n      #secondsLeft {\n        margin-top: 12px;\n        margin-left: 4px;\n        margin-right: 4px;\n      }\n\n      .mainContainer {\n        padding: 0 24px;\n      }\n\n      @media (max-width: 640px) {\n        #dialog {\n          padding: 0;\n          margin: 0;\n          @apply --layout-self-start;\n        }\n        .mainContainer {\n          padding: 0 0;\n        }\n\n        .mainbuttons {\n          position: absolute;\n          bottom: 0;\n          left: 0;\n          width: 100%;\n          background-color: rgba(240,240,240,0.5);\n        }\n\n        #dialog {\n          min-height: 242px;\n          min-width: 320px;\n          width: 100%;\n        }\n      }\n\n      @media (max-width: 360px) {\n        .uploadFileText {\n          display: none;\n        }\n      }\n\n      .rememberBox {\n        margin-top: 8px;\n      }\n\n      #checkBox {\n        margin-left: 6px;\n      }\n\n      .header {\n        font-weight: bold;\n        font-size: 18px;\n        margin-bottom: 10px;\n      }\n\n      .uploadFileButton {\n        color: #888;\n      }\n\n      #waveform {\n        height: 128px;\n      }\n    </style>\n\n    <paper-dialog id=\"selectDevices\" modal=\"\">\n      <h2>[[selectDeviceTitle]]</h2>\n      <paper-dialog-scrollable>\n        <paper-listbox id=\"deviceListBox\">\n          <template is=\"dom-repeat\" items=\"[[allDevices]]\">\n            <paper-item on-tap=\"selectDeviceFunction\" id=\"[[item.deviceId]]\">[[item.label]]</paper-item>\n          </template>\n        </paper-listbox>\n        <div class=\"layout horizontal rememberBox\">\n          <div>\n            [[t('rememberDevice')]]\n          </div>\n          <input id=\"checkBox\" type=\"checkbox\">\n        </div>\n      </paper-dialog-scrollable>\n    </paper-dialog>\n\n    <paper-dialog id=\"noDevices\">\n      <h2>[[t('noDevicesFound')]]</h2>\n      <div class=\"button layout horizontal center-center\">\n        <paper-button dialog-dismiss=\"\" raised=\"\">[[t('ok')]]</paper-button>\n      </div>\n    </paper-dialog>\n\n    <paper-dialog id=\"dialog\" modal=\"\" audio-recording\\$=\"[[audioRecording]]\">\n      <div class=\"layout vertical no-padding mainContainer\">\n        <template is=\"dom-if\" if=\"[[videoRecording]]\">\n          <video id=\"videoRecorder\" class=\"videoRecorder\" hidden\\$=\"[[previewActive]]\"></video>\n          <video id=\"videoPreviewer\" preload=\"auto\" class=\"videoRecorder\" hidden\\$=\"[[!previewActive]]\"></video>\n        </template>\n        <template is=\"dom-if\" if=\"[[audioRecording]]\">\n          <div class=\"layout vertical center-center\">\n            <div class=\"layout horizontal center-center header\">[[t('voiceRecorder')]]</div>\n            <div id=\"waveform\" hidden\\$=\"[[recordedData]]\"></div>\n            <audio id=\"audioRecorder\" class=\"audioRecorder\" hidden=\"\"></audio>\n            <audio id=\"audioPreviewer\" controls=\"\" preload=\"auto\" class=\"audioRecorder\" hidden\\$=\"[[!previewActive]]\"></audio>\n          </div>\n        </template>\n        <div class=\"layout horizontal mainbuttons\" hidden\\$=\"[[!recorder]]\">\n          <paper-icon-button aria-label\\$=\"[[t('closeRecordingWindow')]]\" icon=\"clear\" class=\"iconButtons\" on-tap=\"_close\"></paper-icon-button>\n          <paper-icon-button aria-label\\$=\"[[t('deleteRecordedMedia')]]\" icon=\"delete\" class=\"iconButtons\" on-tap=\"_deleteRecording\" hidden\\$=\"[[!recordedData]]\"></paper-icon-button>\n          <paper-button on-tap=\"_startRecording\" hidden\\$=\"[[recordedData]]\">\n            <iron-icon id=\"recordingIcon\" icon=\"fiber-manual-record\"></iron-icon>\n            <div class=\"buttonText\">[[t('record')]]</div>\n          </paper-button>\n          <div id=\"secondsLeft\" hidden\\$=\"[[recordedData]]\">[[recordSecondsLeft]] [[t('seconds')]]</div>\n          <paper-button on-tap=\"_stopRecording\" hidden\\$=\"[[!isRecording]]\">\n            <iron-icon icon=\"stop\"></iron-icon>\n            <div class=\"buttonText\">[[t('stop')]]</div>\n          </paper-button>\n          <span hidden\\$=\"[[isRecording]]\">\n            <paper-button id=\"uploadFileButton\" class=\"uploadFileButton\" on-tap=\"_uploadFile\" hidden\\$=\"[[recordedData]]\">\n              <iron-icon icon=\"file-upload\"></iron-icon>\n              <div class=\"buttonText uploadFileText\">[[t('uploadFile')]]</div>\n            </paper-button>\n          </span>\n          <paper-button on-tap=\"_sendBack\" class=\"actionButton\" hidden\\$=\"[[!recordedData]]\">\n            <iron-icon icon=\"send\"></iron-icon>\n            <div class=\"buttonText\">[[t('send')]]</div>\n          </paper-button>\n        </div>\n      </div>\n      <div hidden\\$=\"[[!error]]\">\n        [[error]]\n      </div>\n    </paper-dialog>\n\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n    <iron-ajax id=\"getTranslationAjax\" on-response=\"_getTranslationResponse\"></iron-ajax>\n"]);_templateObject_cb150bd04fe511e9ab8b8d361f77d375=function _templateObject_cb150bd04fe511e9ab8b8d361f77d375(){return data};return data}import{PolymerElement,ypLanguageBehavior,html,mixinBehaviors}from"../yp-app/yp-app.js";var YpMediaRecorder=function(_mixinBehaviors){babelHelpers.inherits(YpMediaRecorder,_mixinBehaviors);function YpMediaRecorder(){babelHelpers.classCallCheck(this,YpMediaRecorder);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(YpMediaRecorder).apply(this,arguments))}babelHelpers.createClass(YpMediaRecorder,[{key:"_selectAudioDevice",value:function _selectAudioDevice(event,detail){if(event.target.id){this.set("selectedAudioDeviceId",event.target.id)}if(this.$$("#checkBox").checked){localStorage.setItem("selectedAudioDeviceId",this.selectedAudioDeviceId)}this.$.selectDevices.close();this._openMediaSession(this.captureCallback)}},{key:"_selectVideoDevice",value:function _selectVideoDevice(event){if(event.target.id){this.set("selectedVideoDeviceId",event.target.id)}if(this.$$("#checkBox").checked){localStorage.setItem("selectedVideoDeviceId",this.selectedVideoDeviceId)}this.$.selectDevices.close();this._checkAudioDevices()}},{key:"_checkAudioDevices",value:function _checkAudioDevices(){if(this.audioDevices&&1<this.audioDevices.length){if(localStorage.getItem("selectedAudioDeviceId")){this.set("selectedAudioDeviceId",localStorage.getItem("selectedAudioDeviceId"));this._openMediaSession(this.captureCallback)}else{this.set("selectDeviceTitle",this.t("selectAudioDevice"));this.$$("#checkBox").checked=!1;this.selectDeviceFunction=this._selectAudioDevice.bind(this);this.set("allDevices",this.audioDevices);this.$$("#deviceListBox").selected=null;this.$.selectDevices.open()}}else{this._openMediaSession(this.captureCallback)}}},{key:"_checkVideoDevices",value:function _checkVideoDevices(){if(this.videoRecording&&this.videoDevices&&1<this.videoDevices.length){if(localStorage.getItem("selectedVideoDeviceId")){this.set("selectedVideoDeviceId",localStorage.getItem("selectedVideoDeviceId"));this._checkAudioDevices()}else{this.set("selectDeviceTitle",this.t("selectVideoDevice"));this.$$("#checkBox").checked=!1;this.set("rememberDevice",!1);this.selectDeviceFunction=this._selectVideoDevice.bind(this);this.set("allDevices",this.videoDevices);this.$$("#deviceListBox").selected=null;this.$.selectDevices.open()}}else{this._checkAudioDevices()}}},{key:"_close",value:function _close(){if(this.mediaStream){this.mediaStream.getTracks().forEach(function(track){track.stop()})}if(this.surfer){this.surfer.microphone.stop();this.surfer.destroy()}this.set("previewActive",!1);this.$.dialog.close()}},{key:"_uploadFile",value:function _uploadFile(){this._close();this.uploadFileFunction()}},{key:"_sendBack",value:function _sendBack(){if(this.callbackFunction&&this.recorder){this.callbackFunction(this.recordedData);this.recordedData=null;this.recorder.clearRecordedData();this.recorder.reset();this.recorder=null;this._close()}else{console.error("No callback function for media player")}}},{key:"checkDevices",value:function checkDevices(callback){navigator.mediaDevices.enumerateDevices().then(function(devicesIn){this.audioDevices=devicesIn.filter(function(d){return"audioinput"===d.kind});this.videoDevices=devicesIn.filter(function(d){return"videoinput"===d.kind});var hasLabels=!1;this.videoDevices.forEach(function(device){if(device.label&&""!=device.label){hasLabels=!0}});if(!hasLabels){this.videoDevices=null;this.audioDevices=null}this._checkVideoDevices()}.bind(this))}},{key:"captureUserMedia",value:function captureUserMedia(callback){this.captureCallback=callback;this.checkDevices()}},{key:"_openMediaSession",value:function _openMediaSession(callback){if(this.selectedVideoDeviceId){this.videoSettings.deviceId=this.selectedVideoDeviceId}var constraints={audio:this.selectedAudioDeviceId?{deviceId:this.selectedAudioDeviceId}:!0,video:this.videoRecording?this.videoSettings:null},isFirefox=/firefox/.test(navigator.userAgent.toLowerCase())&&!window.MSStream;if(isFirefox){navigator.getUserMedia(constraints,function(stream){callback(stream)},function(error){console.error(error);callback(null)})}else{navigator.mediaDevices.getUserMedia(constraints).then(function(stream){stream.getTracks().forEach(function(track){console.info(track.getCapabilities())});callback(stream)}).catch(function(error){console.error(error);callback(null)})}}},{key:"$$",value:function $$(id){return this.shadowRoot.querySelector(id)}},{key:"open",value:function open(options){this.callbackFunction=options.callbackFunction;this.set("recordingFinished",!1);this.set("error",null);this.set("audioRecording",!1);this.set("videoRecording",!1);if(options.videoRecording){this.set("videoRecording",!0)}else if(options.audioRecording){this.set("audioRecording",!0)}this.set("maxLength",options.maxLength);this.set("uploadFileFunction",options.uploadFileFunction);this.$$("#secondsLeft").className="";setTimeout(function(){var _Mathmin=Math.min,_Mathabs=Math.abs;if(this.videoRecording){var videoElement=this.shadowRoot.querySelector("#videoRecorder"),videoPreviewElement=this.shadowRoot.querySelector("#videoPreviewer"),width,height;if(window.innerHeight>window.innerWidth){this.set("videoSettings",{width:720,height:1280});height=_Mathmin(1280,_Mathabs(window.innerHeight)).toFixed();width=_Mathmin(720,_Mathabs(.5625*height)).toFixed();console.info("Portrait - width: "+width+" height: "+height+" video width: "+720+" height: 1280")}else{this.set("videoSettings",{width:1280,height:720});var scaleFactor=.8;if(700>window.innerHeight)scaleFactor=.7;if(500>window.innerHeight)scaleFactor=.6;height=_Mathmin(720,_Mathabs(window.innerHeight*scaleFactor)).toFixed();width=_Mathmin(1280,_Mathabs(1.77777777778*height)).toFixed();console.info("Landscape - width: "+width+" height: "+height)}videoElement.style.height=height+"px";videoElement.style.width=width+"px";videoPreviewElement.style.height=(.8*height).toFixed()+"px";videoPreviewElement.style.width=(.8*width).toFixed()+"px";setTimeout(function(){this.$.dialog.open()}.bind(this))}else if(this.audioRecording){setTimeout(function(){this.$.dialog.open()}.bind(this))}}.bind(this));setTimeout(function(){this.setupRecorders()}.bind(this),20)}},{key:"_generateRandomString",value:function _generateRandomString(){if(window.crypto){for(var a=window.crypto.getRandomValues(new Uint32Array(3)),token="",i=0,l=a.length;i<l;i++){token+=a[i].toString(36)}return token}else{return(Math.random()*new Date().getTime()).toString(36).replace(/\./g,"")}}},{key:"_startRecording",value:function _startRecording(){if(!this.isRecording){this.recorder.startRecording();this.recordSecondsLeft=this.maxLength;this.set("isRecording",!0);this.$$("#recordingIcon").className="recording";this._recordingTimer()}else{this._stopRecording()}}},{key:"_stopRecording",value:function _stopRecording(){this.$$("#recordingIcon").className="";this.set("isRecording",!1);this.recorder.stopRecording(this._storeRecordedData.bind(this));this.$$("#secondsLeft").className=""}},{key:"_deleteRecording",value:function _deleteRecording(){this.recorder.reset();this.set("previewActive",!1);this.set("recordedData",null);this.recordSecondsLeft=this.maxLength;this.$$("#secondsLeft").className="";this.$$("#recordingIcon").className=""}},{key:"_storeRecordedData",value:function _storeRecordedData(){var blob=this.recorder.getBlob(),fileName;if(this.videoRecording){var videoElement=this.shadowRoot.querySelector("#videoRecorder"),videoPreviewer=this.shadowRoot.querySelector("#videoPreviewer");fileName=this._generateRandomString()+".webm";this.recordedData=new File([blob],fileName,{type:"video/webm"});videoElement.controls=!0;this.recorder.reset();videoPreviewer.src=window.URL.createObjectURL(this.recordedData);videoPreviewer.controls=!0;this.set("previewActive",!0)}else if(this.audioRecording){var audioElement=this.shadowRoot.querySelector("#audioRecorder"),audioPreviewer=this.shadowRoot.querySelector("#audioPreviewer");fileName=this._generateRandomString()+".mp3";this.recordedData=new File([blob],fileName,{type:"audio/mp3"});audioElement.controls=!0;audioElement.pause();audioPreviewer.src=window.URL.createObjectURL(this.recordedData);audioPreviewer.controls=!0;this.set("previewActive",!0)}}},{key:"_recordingTimer",value:function _recordingTimer(){if(this.isRecording){setTimeout(function(){if(this.isRecording){if(0<this.recordSecondsLeft){this._recordingTimer()}else{this._stopRecording()}if(0<this.recordSecondsLeft)this.recordSecondsLeft-=1;if(5>=this.recordSecondsLeft){this.$$("#secondsLeft").className="recordingTime"}}}.bind(this),1e3)}else{console.error("_recordingTimer called without in recording mode")}}},{key:"setupRecorders",value:function setupRecorders(){this.recordSecondsLeft=this.maxLength;if(this.videoRecording){var videoElement=this.shadowRoot.querySelector("#videoRecorder");this.captureUserMedia(function(stream){if(stream){this.mediaStream=stream;try{videoElement.srcObject=stream}catch(error){console.error(error);videoElement.src=window.URL.createObjectURL(stream)}videoElement.play();videoElement.muted=!0;videoElement.controls=!1;this.recorder=RecordRTC(stream,{type:"video"})}else{console.error("Can't find stream");this.$.noDevices.open();this.$$("#uploadFileButton").style.color="#F00"}}.bind(this))}else if(this.audioRecording){var audioElement=this.shadowRoot.querySelector("#audioRecorder");this.captureUserMedia(function(stream){if(stream){this.mediaStream=stream;try{audioElement.srcObject=stream}catch(error){console.error(error);audioElement.src=window.URL.createObjectURL(stream)}audioElement.play();audioElement.muted=!0;audioElement.controls=!1;this.surfer=WaveSurfer.create({container:this.$$("#waveform"),waveColor:"#ff3d00",progressColor:"#ff3d00",cursorWidth:0,plugins:[WaveSurfer.microphone.create({stream:this.mediaStream})]});this.surfer.microphone.play();this.recorder=RecordRTC(stream,{type:"audio"})}else{console.error("Can't find stream");this.$.noDevices.open();this.$$("#uploadFileButton").style.color="#F00"}}.bind(this))}setTimeout(function(){this.$.dialog.center()}.bind(this))}},{key:"ready",value:function ready(){if(window.i18nTranslation){this.set("language",window.locale)}babelHelpers.get(babelHelpers.getPrototypeOf(YpMediaRecorder.prototype),"ready",this).call(this)}},{key:"_languageEvent",value:function _languageEvent(event,detail){if("language-loaded"===detail.type){this.set("language",detail.language)}}}],[{key:"template",get:function get(){return html(_templateObject_cb150bd04fe511e9ab8b8d361f77d375())}},{key:"is",get:function get(){return"yp-media-recorder"}},{key:"properties",get:function get(){return{recorder:{type:Object,value:null},mediaStream:Object,audioRecording:{type:Boolean,value:!1},videoRecording:{type:Boolean,value:!1},maxLength:{type:Number,value:5},recordedData:{type:Object,value:null},recordingFinished:{type:Boolean,value:!1},callbackFunction:{type:Function,value:null},error:{type:String,value:null},recordSecondsLeft:Number,isRecording:{type:Boolean,value:!1},rememberDevice:{type:Boolean,value:!1},audioDevices:Array,videoDevices:Array,allDevices:Array,captureCallback:Function,uploadFileFunction:Function,captureStream:Object,previewActive:{type:Boolean,value:!1},videoOptions:Object,selectDeviceTitle:String,selectDeviceFunction:{type:Function,value:null},surfer:{type:Object,value:null}}}}]);return YpMediaRecorder}(mixinBehaviors([ypLanguageBehavior],PolymerElement));customElements.define(YpMediaRecorder.is,YpMediaRecorder);