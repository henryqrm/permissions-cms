function setResourcePermission() {
  // set Permission resource group
  $http.get('/api/resources')
    .then(response => {
      var resources = response.data;
      for (var i = 0; i < resources.length; i++) {
        var resource = response.data[i];
        if (resource.group === user.group) {
          for (var j = 0; j < resource.contexts.length; j++) {
            var resourceContext = resource.contexts[j];
            if (resourceContext.name === context) {
              // set Permission custom
              if (contextId === item.id) {
                roles = {
                  c: item.roles.c === undefined ? resourceContext.roles.c : item.roles.c,
                  r: item.roles.r === undefined ? resourceContext.roles.r : item.roles.r,
                  u: item.roles.u === undefined ? resourceContext.roles.u : item.roles.u,
                  d: item.roles.d === undefined ? resourceContext.roles.d : item.roles.d,
                  p: item.roles.p === undefined ? resourceContext.roles.p : item.roles.p
                };
              }
              // Verify moderator
              if (!roles.p) {
                roles.p = isModerator(moderators, user.id);
              }
              defer.resolve(roles);
            }
          }
        }
      }
    });
}
