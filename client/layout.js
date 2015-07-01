Blaze._allowJavascriptUrls();

var clickTimes = 0;
Template.layout.events({
  //隱藏的admin按鈕
  'click #admin_secrect_button': function() {
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
  },
  'click [data-action]': function(e) {
    var actionValue = parseInt($(e.currentTarget).attr('data-action'), 10);
    Session.set('order', actionValue);
  }
});


var allTagList = ['基本概述', '初級實戰', '中級實戰', '高級實戰', '套件應用'];
Template.layout.helpers({
  hasActiveClass: function(cond) {
    var result = false;
    switch (cond) {
    case 'orderAsc':
      result = (Session.get('order') === 1);
      break;
    case 'orderDesc':
      result = (Session.get('order') === -1);
      break;
    }
    return result ? 'active' : '';
  },
  activeTagText: function() {
    var useRouter = Router.current();
    var result = '全部文章';
    if (useRouter && useRouter.route) {
      if (useRouter.route.getName() === 'searchTagged') {
        result = useRouter.params.tag;
      }
    }
    return result;
  },
  allTagList: function() {
    return _.map(allTagList, function(tag) {
      return {tag: tag};
    });
  }
});

Router.configure({
  layoutTemplate: 'layout'
});