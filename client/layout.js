Blaze._allowJavascriptUrls();

var clickTimes = 0;
Template.layout.events({
  'click [data-action]': function(e) {
    var actionValue = parseInt($(e.currentTarget).attr('data-action'), 10);
    Session.set('order', actionValue);
  }
});


var allTagList = ['基本概述', '初級實戰', '中級實戰', '高級實戰', 'Blaze範例', '套件應用', '簡單聊天室', '臺北大富翁'];
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