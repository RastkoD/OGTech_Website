import { TimelineMax } from 'gsap/TimelineMax';




// //Nav

//---- Landing ----
(function(){




    const Header = document.getElementById('Header');
    const HideHeaderTl = new TimelineMax();
        HideHeaderTl
            .set(Header, {top: 0})
            .to(Header, 1, {top: '-100%', ease: Power2.easeIn});
        HideHeaderTl.pause();

    // const ShowHeaderTl = new TimelineMax();
    //     ShowHeaderTl
    //       .set(Header, {top: 0});
    //     ShowHeaderTl.pause();

   var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if ( prevScrollpos > currentScrollPos) {
        HideHeaderTl.reverse();
  } else if (currentScrollPos > 200) {
    HideHeaderTl.play();
  }
  prevScrollpos = currentScrollPos;
}


//     const Header = document.getElementById('Header');
//     const HideHeaderTl = new TimelineMax();
//         HideHeaderTl
//             .set(Header, {top: 0})
//             .to(Header, 1, {top: '-100%', ease: Power2.easeIn});
//         HideHeaderTl.pause();

//    var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   if ( prevScrollpos > currentScrollPos ) {
//         HideHeaderTl.reverse();
//   } else {
//     HideHeaderTl.play();
//   }
//   prevScrollpos = currentScrollPos;
// }



}());

