import '@polymer/polymer/polymer-legacy.js';

/**
 * @polymerBehavior Polymer.GroupBehaviors
 */
export const GroupBehaviors = {

  properties: {
    group: {
      type: Object,
      notify: true,
      observer: '_groupChanged'
    },

    elevation: {
      type: Number
    },

    groupLogoImagePath: {
      type: String,
      computed: '_groupLogoImagePath(group)'
    },

    groupHeaderImagePath: {
      type: String,
      computed: '_groupHeaderImagePath(group)'
    },

    groupName: {
      type: String,
      computed: '_groupName(group)'
    },

    groupObjectives: {
      type: String,
      computed: '_groupObjectives(group)'
    },

    noImage: {
      type: Boolean,
      value: true
    },

    featured: {
      type: Boolean,
      value: false
    },

    archived: {
      type: Boolean,
      value: false
    },

    wide: {
      type: Boolean
    }
  },

  _groupChanged: function (group) {
    if (group) {
      if (group.GroupLogoImages && group.GroupLogoImages.length>0)
      {
        this.set('noImage', false);
      } else {
        this.set('noImage', true);
      }

      if (group.status=='featured') {
        this.set('featured', true);
      } else if (group.status=='archived') {
        this.set('archived', true);
      } else {
        this.set('featured', false);
        this.set('archived', false);
      }

      this.async(function () {
        var groupName = this.$$("#groupName");
        if (groupName) {
          if (this.wide) {
            if (group.name.length<=18) {
              groupName.style.fontSize = "30px";
            } else if (group.name.length>40) {
              groupName.style.fontSize = "22px";
            } else if (group.name.length>30) {
              groupName.style.fontSize = "24px";
            } else if (group.name.length>18) {
              groupName.style.fontSize = "26px";
            }
          } else {
            if (group.name.length<=18) {
              groupName.style.fontSize = "28px";
            } else if (group.name.length>40) {
              groupName.style.fontSize = "19px";
            } else if (group.name.length>30) {
              groupName.style.fontSize = "22px";
            } else if (group.name.length>18) {
              groupName.style.fontSize = "24px";
            }
          }

          if (group.language && group.language==="ru" && group.objectives && group.objectives.length>140) {
            this.$$("#objectives").style.fontSize = "15px";
          } else {
            this.$$("#objectives").style.fontSize = "16px";
          }

          if (this.archived) {
            var fontSizePixels = groupName.style.fontSize.replace("px", "");
            fontSizePixels = parseInt(fontSizePixels);
            fontSizePixels = fontSizePixels - 3;
            groupName.style.fontSize = fontSizePixels+"px";
          }
        }
      });

    } else {
      this.set('featured', false);
      this.set('archived', false);
    }
  },

  _goToGroup: function (e) {
    if (this.group && this.group.configuration && this.group.configuration.actAsLinkToCommunityId) {
      this.fire('yp-add-back-community-override', {
        backPath: '/community/'+this.group.Community.id,
        backName: this.group.Community.name,
        fromCommunityId: this.group.configuration.actAsLinkToCommunityId
      })
    } else {
      var groupUrl = '/group/' + this.group.id + '/open';
      window.appGlobals.activity('open', 'group', groupUrl, { id: this.group.id });
      if (window.appGlobals.backToCommunityGroupItems===null)
        window.appGlobals.backToCommunityGroupItems = {};
      window.appGlobals.backToCommunityGroupItems[this.group.community_id] = this.group;

      if (!window.appGlobals.groupItemsCache)
        window.appGlobals.groupItemsCache = {};
      window.appGlobals.groupItemsCache[this.group.id] = this.group;

      console.log("Cached saved for group id: "+this.group.id);
      console.log("Saving group item for community "+this.group.community_id);
      this.redirectTo(groupUrl);
    }
  },

  _groupLogoImagePath: function (group) {
    if (group) {
      return this.getImageFormatUrl(group.GroupLogoImages, 0);
    } else {
      return "";
    }
  },

  _groupHeaderImagePath: function (group) {
    if (group) {
      return this.getImageFormatUrl(group.GroupHeaderImages, 0);
    } else {
      return "";
    }
  },

  _groupName: function (group) {
    if (group) {
      if (group.name) {
        return this.truncate(this.trim(group.name), 60);
      } else {
        return group.short_name;
      }
    } else {
      return "";
    }
  },

  _groupObjectives: function (group) {
    if (group && group.objectives) {
      return this.truncate(this.trim(group.objectives), 200, '...');
    } else {
      return "";
    }
  }
};
