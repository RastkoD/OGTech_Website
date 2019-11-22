import { TweenMax, TweenLite, TimelineMax, Expo, Power1 } from 'gsap/all';
import ScrollMagic from 'scrollmagic';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


(function(){



//GSAP --------------- --------------


//Variables ----- ---- --- -- -
    const PhilHeader = document.getElementById('Phil_Intro-Header');
    const PhilRight = document.getElementById('Phil_Intro-Right');
    const PhilImage1 = document.getElementById('Phil_Image1');
    const PhilImage2 = document.getElementById('Phil_Image2');
    const PhilImage3 = document.getElementById('Phil_Image3');
    


    const PhilIntroTl = new TimelineMax();
        PhilIntroTl
            .add('wave1')
                .set(PhilHeader, {y: 50}, 'wave1')
                .set(PhilRight, {y: 50}, 'wave1')
                .set(PhilImage1, {y: 50}, 'wave1')
                .set(PhilImage2, {y: 50}, 'wave1')
                .set(PhilImage3, {y: 50}, 'wave1')
                

                .to(PhilHeader, .6, {opacity: 1, y: 0, ease: Power1.easeInOut, delay: .5 })
                .to(PhilRight, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.4')

                .to(PhilImage1, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '+=.3')
                .to(PhilImage2, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.4')
                .to(PhilImage3, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, )
        ;







//ScrollMagic -------- ----------------------

    const controller = new ScrollMagic.Controller();

    const PinNumbersScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Cores-Number-Wrap',
        triggerHook: .25,
        duration: '185%'
    })
    .setPin('#Phil_Cores-Number-Wrap')
    .addTo(controller);

    const PhilNumber1OutScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Core-Title2',
        triggerHook: .32,
    })
    .setClassToggle('#Phil-Number1', 'Fade-Out')
    .addTo(controller);

    const PhilNumber2InScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Core-Title2',
        triggerHook: .32,
    })
    .setClassToggle('#Phil-Number2', 'Fade-In')
    .addTo(controller);

    const PhilNumber2OutScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Core-Title3',
        triggerHook: .32,
    })
    .setClassToggle('#Phil-Number2', 'Fade-Out')
    .addTo(controller);

    const PhilNumber3InScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Core-Title3',
        triggerHook: .32,
    })
    .setClassToggle('#Phil-Number3', 'Fade-In')
    .addTo(controller);

    const PhilNumber3OutScene = new ScrollMagic.Scene({
        triggerElement: '#Phil_Core-Title3',
        triggerHook: -.2,
    })
    .setClassToggle('#Phil-Number3', 'Fade-Out')
    .addTo(controller);
}());