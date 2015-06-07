Template.postShow.helpers({
  session: function(key) {
    return Session.get(key);
  }
});

Template.insertDisqus.onRendered(function() {
  var post = this.data;
  var dsq;
  var disqus_shortname;
  var disqus_identifier;
  var disqus_url;
  var disqus_developer;
  if (window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifier = post.id;
        this.page.title = post.title;
        this.page.url = window.location.href;
      }
    });
  }
  else {
    disqus_shortname = 'zhmeteortutorial';
    disqus_identifier = post;
    disqus_title = post;
    disqus_url = window.location.href;
    disqus_developer = 1;
    dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = "//zhmeteortutorial.disqus.com/embed.js";
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
  }
});