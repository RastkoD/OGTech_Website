import { TweenMax, TweenLite, TimelineMax, Expo, Power1 } from 'gsap/all';
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"; 
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


(function(){


//Landing Animations

//Variables ------

    //Landing Intro
    const LandingLoading = document.getElementById('Landing_Loading-In');
    const LandingCover = document.getElementById('Landing_Cover');
    const LandingLoadingPercent = document.getElementById('Landing_Loading-In-Percent');

    const LandingHeader = document.getElementById('Landing_Header');
    const LandingConstantAddress = document.getElementById('Landing-Constants_LeftFixed-Address');
    const LandingConstantSocials = document.getElementById('Landing-Constants_LeftFixed-Socials');
    const LandingConstantConnectIcon = document.getElementById('Landing-Constants-ConnectIcon');
    const LandingIntroHeader = document.getElementById('Landing_Intro-Header');
    const LandingIntroRight = document.getElementById('LandingIntro_Right');
    const LandingClients = document.getElementById('Landing_Clients');
    
    

//Variables ------



//Pure GSAP -------- ------- ----- ---- --- -- -

    //Intro Scene
    const LandingIntroTl = new TimelineMax();
    LandingIntroTl
        //Hide All
        .add('Init')
            .set(LandingHeader, {opacity: 0, y: 50}, 'Init')
            .set(LandingConstantAddress, {opacity: 0, x: -50}, 'Init')
            .set(LandingConstantSocials, {opacity: 0, y: 50}, 'Init')
            .set(LandingConstantConnectIcon, {opacity: 0, y: 50}, 'Init')
            .set(LandingIntroHeader, {opacity: 0, y: 50}, 'Init')
            .set(LandingIntroRight, {opacity: 0, y: 50}, 'Init')
            .set(LandingClients, {opacity: 0})
        //Loading
            .to(LandingLoading, 1.5, {left: 0, ease: Power1.easeInOut, delay: .4})
            .set(LandingCover, {display: 'none'})
            .to(LandingLoadingPercent, .5, {opacity: 0, delay: .3})
            .to(LandingLoading, .8, {top: '-100%', delay: .3, ease: Expo.easeInOut})
            .set(LandingLoading, {display: 'none'})
        //In
        .add('wave1')
            .to(LandingHeader, .6, {opacity: 1, y: 0, delay: .5, ease: Power1.easeInOut}, 'wave1')
            .to(LandingIntroHeader, 1, {opacity: 1, y: 0, ease: Power1.easeInOut}, '-=.7')
            .to(LandingIntroRight, 1, {opacity: 1, y: 0, ease: Power1.easeInOut}, '-=.9')
            .to(LandingConstantAddress, 1, {opacity: 1, x: 0, ease: Power1.easeInOut}, '-=.8')
            .to(LandingConstantSocials, 1, {opacity: 1, y: 0, ease: Power1.easeInOut}, '-=.8')
            .to(LandingConstantConnectIcon, 1, {opacity: 1, y: 0, ease: Power1.easeInOut}, '-=.9')
            .to(LandingClients, 1, {opacity: 1}, '-=1.3')
            ;













// ScrollMagic -------- ------- ----- ---- --- -- -

const controller = new ScrollMagic.Controller();

//Scenes --------------

//Projects ------ 
    //Project1 -------
        const LandingProject1Scene = new ScrollMagic.Scene({
            triggerElement: '#LandingProject1',
            reverse: false,
            triggerHook: .75,
        })
        .setClassToggle('#Landing_CaseStudy-Project-Cover1', 'Slide-Right')
        // .addIndicators({
        //     name: 'Project1',
        //     colorTrigger: 'black',
        //     indent: 0,
        //     colorStart: 'green',
        //     colorEnd: 'pink'
        // })
        .addTo(controller);

    //Project2 -------
        const LandingProject2Scene = new ScrollMagic.Scene({
            triggerElement: '#LandingProject2',
            reverse: false,
            triggerHook: .75,
        })
        .setClassToggle('#Landing_CaseStudy-Project-Cover2', 'Slide-Right')
        // .addIndicators({
        //     name: 'Project2',
        //     colorTrigger: 'black',
        //     indent: 0,
        //     colorStart: 'green',
        //     colorEnd: 'pink'
        // })
        .addTo(controller);

    //Project3 -------
        const LandingProject3Scene = new ScrollMagic.Scene({
            triggerElement: '#LandingProject3',
            reverse: false,
            triggerHook: .75,
        })
        .setClassToggle('#Landing_CaseStudy-Project-Cover3', 'Slide-Right')
        // .addIndicators({
        //     name: 'Project3',
        //     colorTrigger: 'black',
        //     indent: 0,
        //     colorStart: 'green',
        //     colorEnd: 'pink'
        // })
        .addTo(controller);

    //Project4 -------
        const LandingProject4Scene = new ScrollMagic.Scene({
            triggerElement: '#LandingProject4',
            reverse: false,
            triggerHook: .75,
        })
        .setClassToggle('#Landing_CaseStudy-Project-Cover4', 'Slide-Right')
        // .addIndicators({
        //     name: 'Project4',
        //     colorTrigger: 'black',
        //     indent: 0,
        //     colorStart: 'green',
        //     colorEnd: 'pink'
        // })
        .addTo(controller);

    //Project5 -------
        const LandingProject5Scene = new ScrollMagic.Scene({
            triggerElement: '#LandingProject5',
            reverse: false,
            triggerHook: .75,
        })
        .setClassToggle('#Landing_CaseStudy-Project-Cover5', 'Slide-Right')
        // .addIndicators({
        //     name: 'Project5',
        //     colorTrigger: 'black',
        //     indent: 0,
        //     colorStart: 'green',
        //     colorEnd: 'pink'
        // })
        .addTo(controller);


//Services --------

    //Header
        const LandingServicesIntroScene = new ScrollMagic.Scene({
            triggerElement: '#Landing_Services-IntroHeader',
            reverse: false,
            triggerHook: .85
        })
        .setClassToggle('#Landing_Services-IntroHeader', 'Fade-In')
        // .addIndicators({
        //         name: 'ServicesHeader',
        //         colorTrigger: 'black',
        //         indent: 0,
        //         colorStart: 'green',
        //         colorEnd: 'pink'
        //     })
        .addTo(controller);

    //Description
        const LandingServicesDescriptionScene = new ScrollMagic.Scene({
            triggerElement: '#Landing_Services-IntroHeader',
            reverse: false,
            triggerHook: .65
        })
        .setClassToggle('#Landing_Services-IntroRight', 'Fade-In')
        // .addIndicators({
        //         name: 'ServicesHeader',
        //         colorTrigger: 'black',
        //         indent: 0,
        //         colorStart: 'green',
        //         colorEnd: 'pink'
        //     })
        .addTo(controller);

    //Breakdown
        const LandingServicesBreakdownScene = new ScrollMagic.Scene({
            triggerElement: '#Landing_Services-BreakDown',
            reverse: false,
            triggerHook: .8
        })
        .setClassToggle('#Landing_Services-BreakDown', 'Fade-In')
        // .addIndicators({
        //         name: 'ServicesHeader',
        //         colorTrigger: 'black',
        //         indent: 0,
        //         colorStart: 'green',
        //         colorEnd: 'pink'
        //     })
        .addTo(controller);

}());