var clickTimes = 0;
Template.layout.events({
  "click #admin_secrect_button" : function() {
    var userId;
    var password;
    clickTimes += 1;
    if (clickTimes >= 3) {
      if (Meteor.userId()) {
        Router.go('blogAdmin');
      }
      else {
        userId = prompt('?');
        password = prompt('!');
        Meteor.loginWithPassword(userId, password, function(err) {
          if (! err) {
            Router.go('blogAdmin');
          }
        });
      }
    }
  }
});


var tagData = ['基本概述', '初級實戰', '中級實戰', '高級實戰', '套件應用'];
Template.layout.helpers({
  hasActiveClass: function(tagIndex) {
    var useRouter = Router.current();
    var tag;
    if (useRouter && useRouter.route) {
      if (useRouter.route.getName() === 'searchTagged') {
        tag = tagData[ tagIndex ];
        if (tag === useRouter.params.tag) {
          return 'active';
        }
        else {
          return '';
        }
      }
      else if (useRouter.route.getName() === 'index' && tagIndex === undefined) {
        return 'active';
      }
    }
    else {
      return '';
    }
  },
  getTagData0: function() {
    return {
      tag: tagData[0]
    };
  },
  getTagData1: function() {
    return {
      tag: tagData[1]
    };
  },
  getTagData2: function() {
    return {
      tag: tagData[2]
    };
  },
  getTagData3: function() {
    return {
      tag: tagData[3]
    };
  },
  getTagData4: function() {
    return {
      tag: tagData[4]
    };
  },
  getTagText: function(tagIndex) {
    return tagData[ tagIndex ];
  }
});

Router.configure({
  layoutTemplate: 'layout'
});