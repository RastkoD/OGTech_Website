import { TweenMax, TweenLite, TimelineMax, Expo, Power1 } from 'gsap/all';
import ScrollMagic from 'scrollmagic';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

//Work Animations

(function(){

//GSAP --------------- --------------

    //Variables ----- ---- --- -- -
        const WorkTitle = document.getElementById('Work_Work-Title');
        const Project1 = document.getElementById('Work_Project1');
        const Project2 = document.getElementById('Work_Project2');
        const Project3 = document.getElementById('Work_Project3');
        const Project4 = document.getElementById('Work_Project4');
        const Project5 = document.getElementById('Work_Project5');
        const Project6 = document.getElementById('Work_Project6');
        const Project7 = document.getElementById('Work_Project7');
        const NewClient = document.getElementById('NewClient');
        const Project1Phone = document.getElementById('Project1Phone');
        const Project2Phone = document.getElementById('Project2Phone');
        const Project3Phone = document.getElementById('Project3Phone');
        const Project4Phone = document.getElementById('Project4Phone');
        const Project5Phone = document.getElementById('Project5Phone');
        const Project6Phone = document.getElementById('Project6Phone');
        const Project7Phone = document.getElementById('Project7Phone');

    //Variables ----- ---- --- -- -

    //Intro
        const WorkIntroTl = new TimelineMax();
            WorkIntroTl
                .add('wave1')
                    .set(WorkTitle, {y: 50}, 'wave1')
                    .set(Project1, {y: 50}, 'wave1')
                    .set(Project2, {y: 50}, 'wave1')

                    .to(WorkTitle, .6, {opacity: 1, y: 0, ease: Power1.easeInOut, delay: .3})
                    .to(Project1, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.8')
                    .to(Project2, .6, {opacity: 1, y: 0, ease: Power1.easeInOut }, '-=.6')
            ;

    //Shrink projects
        //Timelines
        //Project1
        const ShrinkProject1 = new TimelineMax();
            ShrinkProject1
                .to(Project1Phone, .2, {opacity: .5})
            ;
        ShrinkProject1.pause();
        //Project2
        const ShrinkProject2 = new TimelineMax();
            ShrinkProject2
                .to(Project2Phone, .2, {opacity: .5})
            ;
        ShrinkProject2.pause();
        //Project3
        const ShrinkProject3 = new TimelineMax();
            ShrinkProject3
                .to(Project3Phone, .2, {opacity: .5})
            ;
        ShrinkProject3.pause();
        //Project4
        const ShrinkProject4 = new TimelineMax();
            ShrinkProject4
                .to(Project4Phone, .2, {opacity: .5})
            ;
        ShrinkProject4.pause();
        //Project5
        const ShrinkProject5 = new TimelineMax();
            ShrinkProject5
                .to(Project5Phone, .2, {opacity: .5})
            ;
        ShrinkProject5.pause();
        //Project6
        const ShrinkProject6 = new TimelineMax();
            ShrinkProject6
                .to(Project6Phone, .2, {opacity: .5})
            ;
        ShrinkProject6.pause();
        //Project7
        const ShrinkProject7 = new TimelineMax();
            ShrinkProject7
                .to(Project7Phone, .2, {opacity: .5})
            ;
        ShrinkProject7.pause();
        



        //functions
        //Project1
        const ToggleShrink1 = (e) => {
            ShrinkProject1.play();
        }
            const NoShrink1 = (e) => {
                ShrinkProject1.reverse();
            }
        //Project2
        const ToggleShrink2 = (e) => {
            ShrinkProject2.play();
        }
            const NoShrink2 = (e) => {
                ShrinkProject2.reverse();
            }
        //Project3
        const ToggleShrink3 = (e) => {
            ShrinkProject3.play();
        }
            const NoShrink3 = (e) => {
                ShrinkProject3.reverse();
            }
        //Project4
        const ToggleShrink4 = (e) => {
            ShrinkProject4.play();
        }
            const NoShrink4 = (e) => {
                ShrinkProject4.reverse();
            }
        //Project5
        const ToggleShrink5 = (e) => {
            ShrinkProject5.play();
        }
            const NoShrink5 = (e) => {
                ShrinkProject5.reverse();
            }
        //Project6
        const ToggleShrink6 = (e) => {
            ShrinkProject6.play();
        }
            const NoShrink6 = (e) => {
                ShrinkProject6.reverse();
            }
        //Project7
        const ToggleShrink7 = (e) => {
            ShrinkProject7.play();
        }
            const NoShrink7 = (e) => {
                ShrinkProject7.reverse();
            }


        //Event Listeners 
        Project1.addEventListener('mouseover', ToggleShrink1);
        Project1.addEventListener('mouseleave', NoShrink1);

        Project2.addEventListener('mouseover', ToggleShrink2);
        Project2.addEventListener('mouseleave', NoShrink2);

        Project3.addEventListener('mouseover', ToggleShrink3);
        Project3.addEventListener('mouseleave', NoShrink3);

        Project4.addEventListener('mouseover', ToggleShrink4);
        Project4.addEventListener('mouseleave', NoShrink4);

        Project5.addEventListener('mouseover', ToggleShrink5);
        Project5.addEventListener('mouseleave', NoShrink5);

        Project6.addEventListener('mouseover', ToggleShrink6);
        Project6.addEventListener('mouseleave', NoShrink6);

        Project7.addEventListener('mouseover', ToggleShrink7);
        Project7.addEventListener('mouseleave', NoShrink7);



    
//ScrollMagic
const controller = new ScrollMagic.Controller();

    const WorkProject3 = new ScrollMagic.Scene({
        triggerElement: '#Work_Project3',
        reverse: false,
        triggerHook: 0.85
    })
    .setClassToggle('#Work_Project3', 'Fade-In_Up')
    .addTo(controller);

    const WorkProject4 = new ScrollMagic.Scene({
        triggerElement: '#Work_Project4',
        reverse: false,
        triggerHook: 0.75
    })
    .setClassToggle('#Work_Project4', 'Fade-In_Up')
    .addTo(controller);

    const WorkProject5 = new ScrollMagic.Scene({
        triggerElement: '#Work_Project5',
        reverse: false,
        triggerHook: 0.85
    })
    .setClassToggle('#Work_Project5', 'Fade-In_Up')
    .addTo(controller);

    const WorkProject6 = new ScrollMagic.Scene({
        triggerElement: '#Work_Project6',
        reverse: false,
        triggerHook: 0.75
    })
    .setClassToggle('#Work_Project6', 'Fade-In_Up')
    .addTo(controller);

    const WorkProject7 = new ScrollMagic.Scene({
        triggerElement: '#Work_Project7',
        reverse: false,
        triggerHook: 0.85
    })
    .setClassToggle('#Work_Project7', 'Fade-In_Up')
    .addTo(controller);

    const NewClientScene = new ScrollMagic.Scene({
        triggerElement: '#NewClient',
        reverse: false,
        triggerHook: 0.75
    })
    .setClassToggle('#NewClient', 'Fade-In_Up')
    .addTo(controller);

}());