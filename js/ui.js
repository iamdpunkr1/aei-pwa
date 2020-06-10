
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

///clock
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');

setInterval(()=>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform= `rotateZ(${mm}deg)`;
    sc.style.transform= `rotateZ(${ss}deg)`;
});









  
