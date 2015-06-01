//blog config
if (Meteor.isServer) {
  Blog.config({
    adminRole: 'blogAdmin',
    authorRole: 'blogAuthor',
    rss: {
      title: 'Meteor中文實戰手冊',
      description: '一個介紹meteor framework技術、介紹與實作的Blog'
    }
  });
}
else {
  Blog.config({
    syntaxHighlighting: true,
    pageSize: 30,
    comments: {
      useSideComments: true,
      allowAnonymous: true
    }
  });


  //auto disconnect
  var AutoDisconnect = _.debounce(
    function() {
      Meteor.disconnect();
    }, 
    60000
  );
  Meteor.startup(function() {
    $('body').on('mouseover', function() {
      if (Meteor.status().status === 'connected') {
        AutoDisconnect();
      }
      else if (Meteor.status().status === 'offline') {
        Meteor.reconnect();
      }
    });

    Deps.autorun(function() {
      if (Meteor.status().status === 'connected') {
        AutoDisconnect();
      }
    });
  });
}