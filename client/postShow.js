Template.postShow.helpers({
  session: function(key) {
    return Session.get(key);
  }
});

// Template.disqus.onRendered(function() {
//   var post = this.data;
//   var dsq;
//   if (window.DISQUS) {
//     window.DISQUS.reset({
//       reload: true,
//       config: function() {
//         this.page.identifier = post.id;
//         this.page.title = post.title;
//         this.page.url = window.location.href;
//       }
//     });
//   }
//   else {
//     dsq = document.createElement("script");
//     dsq.type = "text/javascript";
//     dsq.async = true;
//     dsq.src = "//.disqus.com/embed.js";
//     (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
//   }
// });