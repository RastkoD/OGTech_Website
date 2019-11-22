import $ from 'jquery';
import { TweenMax, TweenLite, TimelineMax, Expo, Power1 } from 'gsap/all';
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"; 
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";




//Global Animations
(function(){



//Variables ------

    const ConnectIcon = document.getElementById('Landing-Constants-ConnectIcon');
    const ConnectIconWhite = document.getElementById('ConnectIconWhite');
    const ConnectIconBlue = document.getElementById('ConnectIconBlue');

//Variables ------



//Pure GSAP -------- ------- ----- ---- --- -- -

//ConnectIcon ------
    const ConnectIconTl = new TimelineMax();
    ConnectIconTl
        .add('IconChange')
        .set(ConnectIcon, {className: '+=ConnectIconBG'}, 'IconChange')
        .set(ConnectIconWhite, {display: 'none',}, 'IconChange')
        .set(ConnectIconBlue, {display: 'block',}, 'IconChange')
        ;

    ConnectIconTl.pause();

        //ActivateConnectIconChange
        const ConnectIconActive = (e) => {
            ConnectIconTl.play();
        }
        //DeactivateConnectIconChange
        const ConnectIconInactive = (e) => {
            ConnectIconTl.reverse();
        }

        //Event Listeners
        ConnectIcon.addEventListener('mouseover', ConnectIconActive);
        ConnectIcon.addEventListener('mouseout', ConnectIconInactive);





//ScrollMagic -------- ------- ----- ---- --- -- -

const controller = new ScrollMagic.Controller();

//Scenes --------------

//Footer -------

(function(){


    //Background
        const FooterBackgroundScene = new ScrollMagic.Scene({
            triggerElement: '#Footer',
            // reverse: false,
            triggerHook: .68,
        })
        .setClassToggle('#Footer_Background', 'Slide-Up')
        .addTo(controller);

    //White Text
        const FooterWhiteTextScene = new ScrollMagic.Scene({
            triggerElement: '#Footer',
            // reverse: false,
            triggerHook: .65,
        })
        .setClassToggle('#Footer_Content-White', 'Fade-In')
        .addTo(controller);

}());

}());