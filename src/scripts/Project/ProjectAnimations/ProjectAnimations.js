import { TimelineMax, Power1 } from 'gsap/all';



// Project

(function(){

//GSAP --------- ----------- -------------

    //Variables ------ -----

        const ProjectHeader = document.getElementById('Project_Intro-Header');
        const ProjectRight = document.getElementById('Project_Intro-Right');

    //Variables ------ -----

    //Project Intro
        const ProjectIntroTl = new TimelineMax();
            ProjectIntroTl
                .add('wave1')
                    .set(ProjectHeader, {y: 50}, 'wave1')
                    .set(ProjectRight, {y: 50}, 'wave1')

                .add('wave2')
                    .to(ProjectHeader, .6, {opacity: 1, y: 0, ease: Power1.easeInOut, delay: .5}, 'wave2')
                    .to(ProjectRight, .6, {opacity: 1, y: 0, ease: Power1.easeInOut,}, '-=.5')
            ;




}());