var subscribes;

subscribes = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

//首頁轉頁
Router.route('/', {
  name: 'index',
  template: 'postsList',
  onRun: function() {
    if (!Session.get('postLimit') && Blog.settings.pageSize) {
      Session.set('postLimit', Blog.settings.pageSize);
    }
    return this.next();
  },
  waitOn: function() {
    if (typeof Session !== 'undefined') {
      return [subscribes.subscribe('posts', Session.get('postLimit')), subscribes.subscribe('authors')];
    }
  },
  fastRender: true,
  data: function() {
    return {
      posts: Post.where(
        {
          published: true
        },
        {
          sort: {
            //照發表日期序由舊到新排序
            publishedAt: 1
          }
        }
      )
    };
  }
});


//tag篩選
Router.route('/tag/:tag', {
  name: 'searchTagged',
  template: 'postsList',
  waitOn: function() {
    return [subscribes.subscribe('taggedPosts', this.params.tag), subscribes.subscribe('authors')];
  },
  fastRender: true,
  data: function() {
    return {
      posts: Post.where(
        {
          tags: this.params.tag,
          published: true
        },
        {
          sort: {
            //照發表日期序由舊到新排序
            publishedAt: 1
          }
        }
      )
    };
  }
});

//顯示文章
Router.route('/article/:slug', {
  name: 'postShow',
  template: 'postShow',
  onRun: function() {
    Session.set('slug', this.params.slug);
    return this.next();
  },
  onBeforeAction: function() {
    var images = Post.first({
      slug: this.params.slug
    }).featuredImage;

    if (images && images.length) {
      Session.set('postHasFeaturedImage', true);
    }
    else {
      Session.set('postHasFeaturedImage', false);
    }
    return this.next();
  },
  action: function() {
    if (this.ready()) {
      return this.render();
    }
  },
  waitOn: function() {
    return [
      subscribes.subscribe('singlePostBySlug', this.params.slug),
      subscribes.subscribe('commentsBySlug', this.params.slug),
      subscribes.subscribe('authors')
    ];
  },
  fastRender: true,
  data: function() {
    return Post.first({
      slug: this.params.slug
    });
  }
});