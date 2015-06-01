UI.registerHelper("formatDate", function(date) {
  return moment(new Date(date)).format("YYYY/MM/DD HH:ii:ss");
});

UI.registerHelper("formatTags", function(tags) {
  var i, len, path, str, tag;
  if (tags == null) {
    return;
  }
  for (i = 0, len = tags.length; i < len; i++) {
    tag = tags[i];
    path = Router.path('searchTagged', {
      tag: tag
    });
    if (typeof str !== "undefined" && str !== null) {
      str += "、<a href=\"" + path + "\">" + tag + "</a>";
    } else {
      str = "<a href=\"" + path + "\">" + tag + "</a>";
    }
  }
  return new Spacebars.SafeString(str);
});

Template.postsList.rendered = function() {
  document.title = Blog.settings.title;
};