function _templateObject6_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n\n      :host {\n      }\n\n      paper-dialog {\n        padding-left: 8px;\n        padding-right: 8px;\n        background-color: #fff;\n        max-width: 450px;\n      }\n\n      .buttons {\n        margin-top: 16px;\n        margin-bottom: 4px;\n        text-align: center;\n      }\n\n      .boldButton {\n        font-weight: bold;\n      }\n\n      .header {\n        font-size: 22px;\n        color: #F00;\n        font-weight: bold;\n      }\n\n      @media (max-width: 480px) {\n      }\n\n      @media (max-width: 320px) {\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <paper-dialog id=\"dialog\" modal=\"\">\n      <div class=\"header layout horizontal center-center\">\n        <div>{{t('deleteOrAnonymizeUser')}}</div>\n      </div>\n\n      <div class=\"helpInfo\">{{t('anonymizeUserInfo')}}</div>\n\n      <div class=\"helpInfo\">{{t('deleteUserInfo')}}</div>\n\n      <div class=\"buttons layout vertical center-center\">\n        <div class=\"layout horizontal ajaxElements\">\n          <yp-ajax id=\"deleteUserAjax\" use-spinner=\"\" on-response=\"_completed\" method=\"DELETE\" url=\"/api/users/delete_current_user\"></yp-ajax>\n          <yp-ajax id=\"anonymizeAjax\" use-spinner=\"\" on-response=\"_completed\" method=\"DELETE\" url=\"/api/users/anonymize_current_user\"></yp-ajax>\n        </div>\n        <div class=\"layout horizontal center-center\">\n          <paper-button dialog-dismiss=\"\">[[t('cancel')]]</paper-button>\n          <paper-button raised=\"\" class=\"boldButton\" on-tap=\"_deleteUser\">[[t('deleteAccount')]]</paper-button>\n          <paper-button raised=\"\" class=\"boldButton\" on-tap=\"_anonymizeUser\">[[t('anonymizeAccount')]]</paper-button>\n        </div>\n      </div>\n    </paper-dialog>\n"]);_templateObject6_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject6_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject5_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .container {\n        height: 100%;\n        min-height: 350px;\n      }\n\n      .additionalSettings {\n        margin-top: 16px;\n      }\n\n      .icon {\n        padding-right: 8px;\n      }\n\n      h2 {\n        padding-top: 16px;\n      }\n\n      #deleteUser {\n        max-width: 250px;\n        margin-top: 16px;\n        color: #F00;\n      }\n\n      .disconnectButtons {\n        margin-top: 8px;\n        max-width: 250px;\n      }\n\n      yp-language-selector {\n        margin-bottom: 8px;\n      }\n\n      paper-button {\n        text-align: center;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <yp-edit-dialog name=\"userEdit\" id=\"editDialog\" title=\"[[editHeaderText]]\" double-width=\"\" icon=\"face\" action=\"[[action]]\" on-iron-form-response=\"_editResponse\" method=\"[[method]]\" params=\"[[params]]\" save-text=\"[[saveText]]\" toast-text=\"[[toastText]]\">\n      <div class=\"container\">\n        <div class=\"layout vertical wrap container\">\n          <paper-input id=\"name\" name=\"name\" type=\"text\" label=\"[[t('Name')]]\" value=\"{{user.name}}\" maxlength=\"50\" char-counter=\"\">\n          </paper-input>\n\n          <paper-input id=\"email\" name=\"email\" type=\"text\" label=\"[[t('Email')]]\" value=\"{{user.email}}\">\n          </paper-input>\n\n          <div class=\"layout horizontal wrap\">\n            <div class=\"layout vertical additionalSettings\">\n              <yp-file-upload id=\"profileImageUpload\" raised=\"true\" multi=\"false\" target=\"/api/images?itemType=user-profile\" method=\"POST\" on-success=\"_profileImageUploaded\">\n                <iron-icon class=\"icon\" icon=\"photo-camera\"></iron-icon>\n                <span>[[t('image.profile.upload')]]</span>\n              </yp-file-upload>\n            </div>\n\n            <div class=\"layout vertical additionalSettings\" hidden=\"\">\n              <yp-file-upload id=\"headerImageUpload\" raised=\"true\" multi=\"false\" target=\"/api/images?itemType=user-header\" method=\"POST\" on-success=\"_headerImageUploaded\">\n                <iron-icon class=\"icon\" icon=\"photo-camera\"></iron-icon>\n                <span>[[t('image.header.upload')]]</span>\n              </yp-file-upload>\n            </div>\n          </div>\n\n          <yp-language-selector name=\"defaultLocale\" auto-translate-option-disabled=\"\" selected-locale=\"{{user.default_locale}}\"></yp-language-selector>\n\n          <paper-button hidden$=\"[[!user.facebook_id]]\" class=\"disconnectButtons\" raised=\"\" on-tap=\"_disconnectFromFacebookLogin\">[[t('disconnectFromFacebookLogin')]]</paper-button>\n\n          <paper-button hidden$=\"[[!user.ssn]]\" raised=\"\" class=\"disconnectButtons\" on-tap=\"_disconnectFromSamlLogin\">[[t('disconnectFromSamlLogin')]]</paper-button>\n\n          <paper-button id=\"deleteUser\" raised=\"\" on-tap=\"_deleteOrAnonymizeUser\">[[t('deleteOrAnonymizeUser')]]</paper-button>\n\n          <input type=\"hidden\" name=\"uploadedProfileImageId\" value=\"[[uploadedProfileImageId]]\">\n          <input type=\"hidden\" name=\"uploadedHeaderImageId\" value=\"[[uploadedHeaderImageId]]\">\n\n          <h2>[[t('user.notifications')]]</h2>\n\n          <ac-notification-settings notifications-settings=\"{{notificationSettings}}\"></ac-notification-settings>\n          <input type=\"hidden\" name=\"notifications_settings\" value=\"[[encodedUserNotificationSettings]]\">\n\n          <yp-ajax id=\"disconnectFacebookLoginAjax\" method=\"DELETE\" url=\"/api/users/disconnectFacebookLogin\" on-response=\"_disconnectFacebookLoginResponse\"></yp-ajax>\n          <yp-ajax id=\"disconnectSamlLoginAjax\" method=\"DELETE\" url=\"/api/users/disconnectSamlLogin\" on-response=\"_disconnectSamlLoginResponse\"></yp-ajax>\n        </div>\n      </div>\n    </yp-edit-dialog>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .container {\n        height: 100%;\n        min-height: 350px;\n      }\n\n      .additionalSettings {\n        margin-top: 16px;\n      }\n\n      .icon {\n        padding-right: 8px;\n      }\n\n      h2 {\n        padding-top: 16px;\n      }\n\n      #deleteUser {\n        max-width: 250px;\n        margin-top: 16px;\n        color: #F00;\n      }\n\n      .disconnectButtons {\n        margin-top: 8px;\n        max-width: 250px;\n      }\n\n      yp-language-selector {\n        margin-bottom: 8px;\n      }\n\n      paper-button {\n        text-align: center;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <yp-edit-dialog name=\"userEdit\" id=\"editDialog\" title=\"[[editHeaderText]]\" double-width=\"\" icon=\"face\" action=\"[[action]]\" on-iron-form-response=\"_editResponse\" method=\"[[method]]\" params=\"[[params]]\" save-text=\"[[saveText]]\" toast-text=\"[[toastText]]\">\n      <div class=\"container\">\n        <div class=\"layout vertical wrap container\">\n          <paper-input id=\"name\" name=\"name\" type=\"text\" label=\"[[t('Name')]]\" value=\"{{user.name}}\" maxlength=\"50\" char-counter=\"\">\n          </paper-input>\n\n          <paper-input id=\"email\" name=\"email\" type=\"text\" label=\"[[t('Email')]]\" value=\"{{user.email}}\">\n          </paper-input>\n\n          <div class=\"layout horizontal wrap\">\n            <div class=\"layout vertical additionalSettings\">\n              <yp-file-upload id=\"profileImageUpload\" raised=\"true\" multi=\"false\" target=\"/api/images?itemType=user-profile\" method=\"POST\" on-success=\"_profileImageUploaded\">\n                <iron-icon class=\"icon\" icon=\"photo-camera\"></iron-icon>\n                <span>[[t('image.profile.upload')]]</span>\n              </yp-file-upload>\n            </div>\n\n            <div class=\"layout vertical additionalSettings\" hidden=\"\">\n              <yp-file-upload id=\"headerImageUpload\" raised=\"true\" multi=\"false\" target=\"/api/images?itemType=user-header\" method=\"POST\" on-success=\"_headerImageUploaded\">\n                <iron-icon class=\"icon\" icon=\"photo-camera\"></iron-icon>\n                <span>[[t('image.header.upload')]]</span>\n              </yp-file-upload>\n            </div>\n          </div>\n\n          <yp-language-selector name=\"defaultLocale\" auto-translate-option-disabled=\"\" selected-locale=\"{{user.default_locale}}\"></yp-language-selector>\n\n          <paper-button hidden\\$=\"[[!user.facebook_id]]\" class=\"disconnectButtons\" raised=\"\" on-tap=\"_disconnectFromFacebookLogin\">[[t('disconnectFromFacebookLogin')]]</paper-button>\n\n          <paper-button hidden\\$=\"[[!user.ssn]]\" raised=\"\" class=\"disconnectButtons\" on-tap=\"_disconnectFromSamlLogin\">[[t('disconnectFromSamlLogin')]]</paper-button>\n\n          <paper-button id=\"deleteUser\" raised=\"\" on-tap=\"_deleteOrAnonymizeUser\">[[t('deleteOrAnonymizeUser')]]</paper-button>\n\n          <input type=\"hidden\" name=\"uploadedProfileImageId\" value=\"[[uploadedProfileImageId]]\">\n          <input type=\"hidden\" name=\"uploadedHeaderImageId\" value=\"[[uploadedHeaderImageId]]\">\n\n          <h2>[[t('user.notifications')]]</h2>\n\n          <ac-notification-settings notifications-settings=\"{{notificationSettings}}\"></ac-notification-settings>\n          <input type=\"hidden\" name=\"notifications_settings\" value=\"[[encodedUserNotificationSettings]]\">\n\n          <yp-ajax id=\"disconnectFacebookLoginAjax\" method=\"DELETE\" url=\"/api/users/disconnectFacebookLogin\" on-response=\"_disconnectFacebookLoginResponse\"></yp-ajax>\n          <yp-ajax id=\"disconnectSamlLoginAjax\" method=\"DELETE\" url=\"/api/users/disconnectSamlLogin\" on-response=\"_disconnectSamlLoginResponse\"></yp-ajax>\n        </div>\n      </div>\n    </yp-edit-dialog>\n"]);_templateObject5_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject5_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject4_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      paper-dialog {\n        background-color: #FFF;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <paper-dialog id=\"confirmationDialog\">\n      <div>[[confirmationText]]</div>\n      <div class=\"buttons\">\n        <paper-button hidden$=\"[[hideCancel]]\" on-tap=\"_reset\" dialog-dismiss=\"\">[[t('cancel')]]</paper-button>\n        <paper-button dialog-confirm=\"\" on-tap=\"_confirm\">[[t('confirm')]]</paper-button>\n      </div>\n    </paper-dialog>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      paper-dialog {\n        background-color: #FFF;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <paper-dialog id=\"confirmationDialog\">\n      <div>[[confirmationText]]</div>\n      <div class=\"buttons\">\n        <paper-button hidden\\$=\"[[hideCancel]]\" on-tap=\"_reset\" dialog-dismiss=\"\">[[t('cancel')]]</paper-button>\n        <paper-button dialog-confirm=\"\" on-tap=\"_confirm\">[[t('confirm')]]</paper-button>\n      </div>\n    </paper-dialog>\n"]);_templateObject4_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject4_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject3_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .text {\n        margin: 16px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <paper-toast id=\"toast\" duration=\"5000\">\n      <div class=\"layout vertical\">\n        <yp-user-with-organization class=\"layout horizontal self-end\" user=\"[[user]]\" hidden$=\"[[!user]]\"></yp-user-with-organization>\n        <div class=\"text\">[[notificationText]]</div>\n      </div>\n    </paper-toast>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .text {\n        margin: 16px;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n    </style>\n\n    <paper-toast id=\"toast\" duration=\"5000\">\n      <div class=\"layout vertical\">\n        <yp-user-with-organization class=\"layout horizontal self-end\" user=\"[[user]]\" hidden\\$=\"[[!user]]\"></yp-user-with-organization>\n        <div class=\"text\">[[notificationText]]</div>\n      </div>\n    </paper-toast>\n"]);_templateObject3_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject3_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject2_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <ac-notification-selection name=\"[[t('notification.myPosts')]]\" setting=\"{{notificationsSettings.my_posts}}\">\n    </ac-notification-selection>\n\n    <ac-notification-selection name=\"[[t('notification.myPostsEndorsements')]]\" setting=\"{{notificationsSettings.my_posts_endorsements}}\">\n    </ac-notification-selection>\n\n\n    <ac-notification-selection name=\"[[t('notification.myPoints')]]\" setting=\"{{notificationsSettings.my_points}}\">\n    </ac-notification-selection>\n\n    <ac-notification-selection name=\"[[t('notification.myPointEndorsements')]]\" setting=\"{{notificationsSettings.my_points_endorsements}}\">\n    </ac-notification-selection>\n\n    <ac-notification-selection name=\"[[t('notification.allCommunity')]]\" setting=\"{{notificationsSettings.all_community}}\">\n    </ac-notification-selection>\n\n    <ac-notification-selection name=\"[[t('notification.allGroup')]]\" setting=\"{{notificationsSettings.all_group}}\">\n    </ac-notification-selection>\n"]);_templateObject2_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject2_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}function _templateObject_cb0ad2a04fe511e9ab8b8d361f77d375(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .half {\n        width: 50%;\n      }\n\n      .notificationName {\n        padding-top: 16px;\n        font-size: 16px;\n        font-weight: bold;\n        margin-bottom: 8px;\n        padding-bottom: 4px;\n        color: #333;\n        border-bottom: solid 1px #ddd;\n      }\n\n      .notificationSub {\n        color: #888;\n      }\n\n      paper-radio-button {\n        padding-top: 8px;\n        padding-bottom: 8px;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <div class=\"layout vertical\">\n      <div class=\"notificationName\">[[name]]</div>\n      <div class=\"layout horizontal wrap\">\n        <div class=\"layout vertical half\">\n          <div class=\"notificationSub\">[[t('notification.method')]]</div>\n          <div class=\"layout horizontal\">\n            <paper-radio-group id=\"notificationMethodGroup\" name=\"method\" class=\"method\" attr-for-selected=\"enum-value\" selected=\"{{method}}\">\n              <template is=\"\" items=\"[[availableMethods]]\">\n                <paper-radio-button enum-value$=\"[[item.enumValue]]\">[[item.name]]</paper-radio-button>\n              </template>\n            </paper-radio-group>\n          </div>\n        </div>\n        <div class=\"layout vertical half\">\n          <div class=\"notificationSub\">[[t('notification.frequency')]]</div>\n          <div class=\"layout horizontal\">\n            <paper-radio-group id=\"notificationFrequencyGroup\" name=\"frequency\" attr-for-selected=\"enum-value\" class=\"frequency\" selected=\"{{frequency}}\">\n              <template is=\"\" items=\"[[availableFrequencies]]\">\n                <paper-radio-button disabled$=\"[[_isDelayed(item)]]\" enum-value$=\"[[item.enumValue]]\">[[item.name]]</paper-radio-button>\n              </template>\n            </paper-radio-group>\n          </div>\n        </div>\n      </div>\n    </div>\n"],["\n    <style include=\"iron-flex iron-flex-alignment\">\n      .half {\n        width: 50%;\n      }\n\n      .notificationName {\n        padding-top: 16px;\n        font-size: 16px;\n        font-weight: bold;\n        margin-bottom: 8px;\n        padding-bottom: 4px;\n        color: #333;\n        border-bottom: solid 1px #ddd;\n      }\n\n      .notificationSub {\n        color: #888;\n      }\n\n      paper-radio-button {\n        padding-top: 8px;\n        padding-bottom: 8px;\n      }\n    </style>\n    <lite-signal on-lite-signal-yp-language=\"_languageEvent\"></lite-signal>\n\n    <div class=\"layout vertical\">\n      <div class=\"notificationName\">[[name]]</div>\n      <div class=\"layout horizontal wrap\">\n        <div class=\"layout vertical half\">\n          <div class=\"notificationSub\">[[t('notification.method')]]</div>\n          <div class=\"layout horizontal\">\n            <paper-radio-group id=\"notificationMethodGroup\" name=\"method\" class=\"method\" attr-for-selected=\"enum-value\" selected=\"{{method}}\">\n              <template is=\"\" items=\"[[availableMethods]]\">\n                <paper-radio-button enum-value\\$=\"[[item.enumValue]]\">[[item.name]]</paper-radio-button>\n              </template>\n            </paper-radio-group>\n          </div>\n        </div>\n        <div class=\"layout vertical half\">\n          <div class=\"notificationSub\">[[t('notification.frequency')]]</div>\n          <div class=\"layout horizontal\">\n            <paper-radio-group id=\"notificationFrequencyGroup\" name=\"frequency\" attr-for-selected=\"enum-value\" class=\"frequency\" selected=\"{{frequency}}\">\n              <template is=\"\" items=\"[[availableFrequencies]]\">\n                <paper-radio-button disabled\\$=\"[[_isDelayed(item)]]\" enum-value\\$=\"[[item.enumValue]]\">[[item.name]]</paper-radio-button>\n              </template>\n            </paper-radio-group>\n          </div>\n        </div>\n      </div>\n    </div>\n"]);_templateObject_cb0ad2a04fe511e9ab8b8d361f77d375=function _templateObject_cb0ad2a04fe511e9ab8b8d361f77d375(){return data};return data}import{ypLanguageBehavior,Polymer,html,ypEditDialogBehavior,dom}from"../yp-app/yp-app.js";Polymer({_template:html(_templateObject_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"ac-notification-selection",behaviors:[ypLanguageBehavior],properties:{name:String,setting:{type:Object,notify:!0,observer:"_settingChanged"},frequency:{type:Number,notify:!0,observer:"_frequencyChanged"},method:{type:Number,notify:!0,observer:"_methodChanged"},availableFrequencies:{type:Array,computed:"_getAvailableFrequencies(language, method)"},availableMethods:{type:Object,computed:"_availableMethods(language)"}},_availableMethods:function _availableMethods(language){if(language){return[{name:this.t("notification.muted"),enumValue:0},{name:this.t("notification.browser"),enumValue:1},{name:this.t("notification.email"),enumValue:2}]}else{return[]}},_methodChanged:function _methodChanged(value){value=parseInt(value);if(this.setting.method!=value){this.set("setting.method",value)}},_frequencyChanged:function _frequencyChanged(value){value=parseInt(value);if(this.setting.frequency!=value){this.set("setting.frequency",value)}},_settingChanged:function _settingChanged(value){if(value){this.set("method",value.method);this.set("frequency",value.frequency)}},_isDelayed:function _isDelayed(item){return 0<item.enumValue},_getAvailableFrequencies:function _getAvailableFrequencies(language,method){var frequencyArray=[];if(language){if(!method||0==method){}else if(1==method){this.set("frequency",0);frequencyArray=[{name:this.t("notification.asItHappens"),enumValue:0}]}else if(2==method){frequencyArray=[{name:this.t("notification.asItHappens"),enumValue:0},{name:this.t("notification.hourly"),enumValue:1},{name:this.t("notification.daily"),enumValue:2},{name:this.t("notification.weekly"),enumValue:3},{name:this.t("notification.monthly"),enumValue:5}]}}return frequencyArray}});Polymer({_template:html(_templateObject2_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"ac-notification-settings",behaviors:[ypLanguageBehavior],properties:{notificationsSettings:{type:Object,notify:!0,observer:"_notificationsSettingsChanged"}},observers:["settingsStarChanged(notificationsSettings.*)"],_notificationsSettingsChanged:function _notificationsSettingsChanged(value){},settingsStarChanged:function settingsStarChanged(object){this.fire("yp-notifications-changed",this.notificationsSettings)}});Polymer({_template:html(_templateObject3_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"ac-notification-toast",properties:{user:{type:Object,value:null},notificationText:{type:String,value:null}},open:function open(user,notificationText,systemNotification){this.set("notificationText",notificationText);if(!systemNotification){this.set("user",user)}this.$.toast.close();this.async(function(){this.$.toast.open()})}});Polymer({_template:html(_templateObject4_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"yp-confirmation-dialog",behaviors:[ypLanguageBehavior],properties:{confirmationText:{type:String},onConfirmedFunction:{type:Function,value:null},useFinalWarning:Boolean,haveIssuedFinalWarning:Boolean,hideCancel:{type:Boolean,value:!1}},_reset:function _reset(){this.set("confirmationText",null);this.set("onConfirmedFunction",null);this.haveIssuedFinalWarning=!1;this.useFinalWarning=!1;this.set("hideCancel",!1)},open:function open(confirmationText,onConfirmedFunction,useModal,useFinalWarning,hideCancel){this.set("confirmationText",confirmationText);this.set("onConfirmedFunction",onConfirmedFunction);if(useModal){this.$$("#confirmationDialog").modal=!0}else{this.$$("#confirmationDialog").modal=!1}this.$$("#confirmationDialog").open();if(useFinalWarning){this.useFinalWarning=!0}else{this.useFinalWarning=!1}this.haveIssuedFinalWarning=!1;if(hideCancel){this.set("hideCancel",!0)}else{this.set("hideCancel",!1)}},_confirm:function _confirm(){if(this.useFinalWarning&&!this.haveIssuedFinalWarning){this.haveIssuedFinalWarning=!0;this.$.confirmationDialog.close();this.set("confirmationText",this.t("finalDeleteWarning"));this.async(function(){this.$.confirmationDialog.open()})}else{if(this.onConfirmedFunction){this.onConfirmedFunction();this._reset()}}}});Polymer({_template:html(_templateObject5_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"yp-user-edit",behaviors:[ypLanguageBehavior,ypEditDialogBehavior],properties:{action:{type:String,value:"/api/users"},user:{type:Object,observer:"_userChanged"},params:{type:String},method:{type:String},selected:{type:Number,value:0},encodedUserNotificationSettings:{type:String,observer:"_encodedUserNotificationSettingsChanged"},uploadedProfileImageId:{type:String},uploadedHeaderImageId:{type:String},notificationSettings:{type:Object,notify:!0,observer:"_notificationSettingsChanged"}},listeners:{"yp-notifications-changed":"_setNotificationSettings"},_editResponse:function _editResponse(event,detail){if(detail.response.duplicateEmail){dom(document).querySelector("yp-app").getDialogAsync("errorDialog",function(dialog){dialog.showErrorDialog(this.t("emailAlreadyRegisterred"))}.bind(this))}},_checkIfValidEmail:function _checkIfValidEmail(){return this.user&&this.user.email&&!(-1<this.user.email.indexOf("@citizens.is")&&-1<this.user.email.indexOf("anonymous"))},_disconnectFromFacebookLogin:function _disconnectFromFacebookLogin(){if(this._checkIfValidEmail()){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouSureYouWantToDisconnectFacebookLogin"),this._reallyDisconnectFromFacebookLogin.bind(this),!0)}.bind(this))}else{dom(document).querySelector("yp-app").getDialogAsync("errorDialog",function(dialog){dialog.showErrorDialog(this.t("cantDisconnectFromFacebookWithoutValidEmail"))}.bind(this))}},_reallyDisconnectFromFacebookLogin:function _reallyDisconnectFromFacebookLogin(){this.$.disconnectFacebookLoginAjax.body={};this.$.disconnectFacebookLoginAjax.generateRequest()},_disconnectFromSamlLogin:function _disconnectFromSamlLogin(){if(this._checkIfValidEmail()){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouSureYouWantToDisconnectSamlLogin"),this._reallyDisconnectFromSamlLogin.bind(this),!0)}.bind(this))}else{dom(document).querySelector("yp-app").getDialogAsync("errorDialog",function(dialog){dialog.showErrorDialog(this.t("cantDisconnectFromSamlWithoutValidEmail"))}.bind(this))}},_reallyDisconnectFromSamlLogin:function _reallyDisconnectFromSamlLogin(){this.$.disconnectSamlLoginAjax.body={};this.$.disconnectSamlLoginAjax.generateRequest()},_disconnectFacebookLoginResponse:function _disconnectFacebookLoginResponse(){this.set("user.facebook_id",null);window.appGlobals.notifyUserViaToast(this.t("disconnectedFacebookLoginFor")+" "+this.user.email)},_disconnectSamlLoginResponse:function _disconnectSamlLoginResponse(){this.set("user.ssn",null);window.appGlobals.notifyUserViaToast(this.t("disconnectedSamlLoginFor")+" "+this.user.email)},_setNotificationSettings:function _setNotificationSettings(event,detail){this.set("notificationSettings",detail);this.set("encodedUserNotificationSettings",this._encodeNotificationsSettings(this.notificationSettings))},_notificationSettingsChanged:function _notificationSettingsChanged(value){this.set("encodedUserNotificationSettings",this._encodeNotificationsSettings(this.notificationSettings))},_encodedUserNotificationSettingsChanged:function _encodedUserNotificationSettingsChanged(value){},_encodeNotificationsSettings:function _encodeNotificationsSettings(settings){return JSON.stringify(settings)},_userChanged:function _userChanged(newValue){this.set("notificationSettings",newValue.notifications_settings)},_profileImageUploaded:function _profileImageUploaded(event,detail){var image=JSON.parse(detail.xhr.response);this.set("uploadedProfileImageId",image.id)},_headerImageUploaded:function _headerImageUploaded(event,detail){var image=JSON.parse(detail.xhr.response);this.set("uploadedHeaderImageId",image.id)},_customRedirect:function _customRedirect(userId){window.appUser.checkLogin()},_clear:function _clear(){this.set("user",{name:"",email:"",access:2});this.set("uploadedProfileImageId",null);this.set("uploadedHeaderImageId",null);this.$.headerImageUpload.clear();this.$.profileImageUpload.clear()},setup:function setup(user,newNotEdit,refreshFunction,openNotificationTab){this.set("user",user);this.set("new",newNotEdit);this.set("refreshFunction",refreshFunction);if(openNotificationTab){this.set("selected",1)}this._setupTranslation()},_setupTranslation:function _setupTranslation(){if(this.new){this.editHeaderText=this.t("user.new");this.toastText=this.t("userToastCreated");this.set("saveText",this.t("create"))}else{this.set("saveText",this.t("save"));this.editHeaderText=this.t("user.edit");this.toastText=this.t("userToastUpdated")}},_deleteOrAnonymizeUser:function _deleteOrAnonymizeUser(){dom(document).querySelector("yp-app").getDialogAsync("userDeleteOrAnonymize",function(dialog){dialog.open()}.bind(this))}});Polymer({_template:html(_templateObject6_cb0ad2a04fe511e9ab8b8d361f77d375()),is:"yp-user-delete-or-anonymize",behaviors:[ypLanguageBehavior],_deleteUser:function _deleteUser(){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouSureYouWantToDeleteUser"),this._deleteUserFinalWarning.bind(this),!0)}.bind(this))},_deleteUserFinalWarning:function _deleteUserFinalWarning(){this.async(function(){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouReallySureYouWantToDeleteUser"),this._deleteUserForReal.bind(this),!0)}.bind(this))})},_anonymizeUser:function _anonymizeUser(){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouSureYouWantToAnonymizeUser"),this._anonymizeUserFinalWarning.bind(this),!0)}.bind(this))},_anonymizeUserFinalWarning:function _anonymizeUserFinalWarning(){this.async(function(){dom(document).querySelector("yp-app").getDialogAsync("confirmationDialog",function(dialog){dialog.open(this.t("areYouReallySureYouWantToAnonymizeUser"),this._anonymizeUserForReal.bind(this),!0)}.bind(this))})},_deleteUserForReal:function _deleteUserForReal(){this.$.deleteUserAjax.body={};this.$.deleteUserAjax.generateRequest()},_anonymizeUserForReal:function _anonymizeUserForReal(){this.$.anonymizeAjax.body={};this.$.anonymizeAjax.generateRequest()},open:function open(){this.$.dialog.open()},_completed:function _completed(){this.$.dialog.close();window.location="/"}});