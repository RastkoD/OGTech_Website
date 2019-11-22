import TimelineMax from 'gsap/TimelineMax';

//Wrapper
(function(){

//Variables
    const MobileHeader = document.getElementById('MobileHeader');
    const MobileMenu = document.getElementById('MobileNav');
    const MobileListItems = document.querySelectorAll('.MobileNav_ListItem');
    const MobileMenuIcon = document.getElementById('MobileMenuIcon');
    const MobileMenuClose = document.getElementById('MobileMenuClose');

//Timeline
    const ToggleMobileNavTl = new TimelineMax();

        ToggleMobileNavTl
            .add('wave1')
                .set(MobileMenu, {display: 'block', opacity: 0}, 'wave1')
                .set(MobileHeader, {display: 'flex', opacity: 0}, 'wave1')
            .add('wave2')
                .fromTo(MobileMenu, 1, {opacity: 0}, {opacity: 1}, 'wave2')
                .fromTo(MobileHeader, 1, {opacity: 0}, {opacity: 1, ease: Expo.easeInOut}, 'wave2')
                .staggerFrom(MobileListItems, .3, {opacity: 0 ,x: -400, ease: Expo.easeInOut, delay: .2}, .1, 'wave2')
                ;

    ToggleMobileNavTl.pause();

//Functions
    const ToggleMobileNav = (e) => {
        console.log('Click');
        
        ToggleMobileNavTl.play();
    }
    const CloseMobileNav = (e) => {
        ToggleMobileNavTl.reverse();
    }
        
//Listeners
    MobileMenuIcon.addEventListener('click', ToggleMobileNav);
    MobileMenuClose.addEventListener('click', CloseMobileNav);

}());