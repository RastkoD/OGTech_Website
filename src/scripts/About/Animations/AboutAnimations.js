import { TweenMax, TweenLite, TimelineMax, Expo, Power1 } from 'gsap/all';


(function(){



//GSAP --------------- --------------


//Variables ----- ---- --- -- -
    const AboutHeader = document.getElementById('About_Intro-Header');
    const AboutIntroText = document.getElementById('AboutIntro_Text');
    const AboutIntroCTA = document.getElementById('AboutIntro_CTA');
    const AboutGif = document.getElementById('AboutGif');


    const AboutIntroTl = new TimelineMax();
        AboutIntroTl
            .add('wave1')
                .set(AboutHeader, {y: 50}, 'wave1')
                .set(AboutIntroText, {y: 50}, 'wave1')
                .set(AboutIntroCTA, {y: 50}, 'wave1')
                .set(AboutGif, {y: 50}, 'wave1')

                .to(AboutHeader, .6, {opacity: 1, y: 0, ease: Power1.easeInOut, delay: .5 })
                .to(AboutIntroText, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.4')
                .to(AboutIntroCTA, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.5')
                .to(AboutGif, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.5')
                ;

}());