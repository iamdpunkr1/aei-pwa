
document.addEventListener('DOMContentLoaded', function() {
  //COLLAP
  var elems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elems);
  
  var elem = document.querySelectorAll('.modal');
  M.Modal.init(elem);

  const ele = document.getElementById('textarea')
  M.CharacterCounter.init(ele)

  // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    const smenus = document.querySelectorAll('.tatd');
    M.Sidenav.init(smenus, {edge: 'left'});
});










  
