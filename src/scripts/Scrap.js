


const controller = new ScrollMagic.Controller();



// const testScene = new ScrollMagic.Scene({
// //triggerElement - when the animation starts, we can also add a specific element within the element to start the animation
//     // triggerElement: '#Landing_Clients img',
//     triggerElement: '#Landing_Clients',

// //duration - set when the animation is taken off
//     // duration: 300-px OR '100%'-100vh

// //reverse - if an animation is taken off on scroll up
//     reverse: false,

// //triggerHook - determine when the animation starts
//     triggerHook: 0.8,
// })
// .setClassToggle('#Landing_Clients', 'fade-in')
// .addIndicators({
//     name: 'Clients',
//     colorTrigger: 'black',
//     indent: 0,
//     colorStart: 'green',
//     colorEnd: 'pink'
// })
// .addTo(controller);


//Projects Test

const Project1Scene = new ScrollMagic.Scene({
    triggerElement: '#Project1Wrap',
    reverse: false,
    triggerHook: 0.4
})
.setClassToggle('#Project1Wrap', 'Expand')
.addIndicators({
    name: 'Project',
    colorTrigger: 'black',
    indent: 0,
    colorStart: 'green',
    colorEnd: 'pink'
})
.addTo(controller);



//same animation for different elements
    // we can do it manual and create a scene for eahc one or loop through with .forEach

// const controller = new ScrollMagic.Controller();
//     document.querySelectorAll('.Section').forEach(function(){
//         const testScene = new ScrollMagic.Scene({
//             triggerElement: this.children[0],
//             duration: '90%',
//             reverse: true, //Default
//             triggerHook: 0.8,
//         })
//         .setClassToggle(this, 'fade-in')
//         .addIndicators({
//             name: 'Clients',
//             colorTrigger: 'black',
//             indent: 0,
//             colorStart: 'green',
//             colorEnd: 'pink'
//         })
//         .addTo(controller);
//     });



// //For GSAP Animations
// const Project1 = document.getElementById('Project1wrap');
// console.log(Project1Wrap);

// const tl = new TimelineMax();
//     tl
//         .fromTo(Project1, 1, {width: '0%'}, {width: '100%'})

// const gsapTest = new ScrollMagic.Scene({
//     triggerElement: '#Project1Wrap',
//     reverse: false,
//     triggerHook: 0.8
// })
// .setTween(tl)
// .addIndicators()
// .addTo(controller);




