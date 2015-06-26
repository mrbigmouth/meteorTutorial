Template.author.onRendered(function() {
  if (window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifier = 'author';
        this.page.title = '作者介紹';
        this.page.url = window.location.href;
      }
    });
  }
  else {
    disqus_shortname = 'zhmeteortutorial';
    disqus_identifier = 'author';
    disqus_title = '作者介紹';
    disqus_url = window.location.href;
    disqus_developer = 1;
    dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = "//zhmeteortutorial.disqus.com/embed.js";
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
  }
});