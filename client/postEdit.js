var getPost = function(id) {
  return (Post.first({
    _id: id
  })) || {};
};

Template.blogAdminEdit.rendered = $.noop;
Template.blogAdminEdit.onRendered(function() {
  var _this = this;
  var ranOnce;
  ranOnce = false;
  _this.autorun(function() {
    var post, sub;
    sub = Meteor.subscribe('singlePostById', Session.get('postId'));
    if (sub.ready() && !ranOnce) {
      ranOnce = true;
      post = getPost(Session.get('postId'));
      if (post != null ? post.body : void 0) {
        _this.$('.editable').html(post.body);
        _this.$('.html-editor').html(post.body);
      }
      return BlogEditor.make(_this);
    }
  });
});