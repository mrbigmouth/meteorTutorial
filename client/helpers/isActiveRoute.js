Template.registerHelper('isActiveRoute', function(arg) {
  var useRouter = Router.current();
  var isActive = false;
  var hash = arg.hash;
  //當router啟動後
  if (useRouter && useRouter.route) {
    isActive = true;
    //檢測route參數
    if (hash.route && useRouter.route.getName() !== hash.route) {
      isActive = false;
    }
    //檢測data參數
    if (hash.data) {
      isActive = _.every(hash.data, function(value, key) {
        return (useRouter.params[key] === value);
      });
    }
  }
  return isActive ? (hash.activeClass || 'active') : '';
});