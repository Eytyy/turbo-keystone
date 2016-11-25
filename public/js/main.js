const APP = (() => {
  const domMap = {};

  const setupDomMap = () => {
    domMap.sliders = $('.slider');
    domMap.slidesCount = $('.slidesCount');
    domMap.currentSlide = $('.currentSlide');
    domMap.menuBtn = $('.nav-toggle');
    domMap.playVid = $('.playVid');
  };

  const closeMenu = () => {
    document.body.classList.remove('js-menuIsActive');
  };

  const openMenu = () => {
    document.body.classList.add('js-menuIsActive');
  };

  const onMenuBtnClick = () => {
    if (document.body.classList.contains('js-menuIsActive')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const initSliders = () => {
    const count = domMap.sliders.find('.slide').length;
    const config = [
      {
        slider: $('.slider--post'),
        name: 'post-slider',
        config: {
          dots: false,
          infinite: true,
          speed: 500,
          nextArrow: $('.slider__nav__item--next'),
          prevArrow: $('.slider__nav__item--back'),
          swipe: true,
          accessibility: true,
          adaptiveHeight: true,
        },
      },
      {
        slider: $('.slider--landing'),
        name: 'landing-slider',
        config: {
          fade: true,
          arrows: false,
          dots: false,
          infinite: true,
          speed: 1000,
          swipe: true,
          accessibility: true,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: false,
        },
      },
    ];

    if (count < 10) {
      domMap.slidesCount.text(`0${count}`);
    } else {
      domMap.slidesCount.text(count);
    }

    if (count <= 1) {
      return;
    }
    config.forEach((component) => {
      let slider;
      if (component.slider.length > 0) {
        slider = component.slider.slick(component.config);
        if (component.name === 'post-slider') {
          slider.on('afterChange', (event, slick, currentSlide) => {
            const curr = currentSlide + 1;
            if (curr > 0 && curr < 10) {
              domMap.currentSlide.text(`0${currentSlide + 1}`);
            } else {
              domMap.currentSlide.text(`${currentSlide + 1}`);
            }
          });
          domMap.currentSlide.text(`0${domMap.sliders.slick('slickCurrentSlide') + 1}`);
        }
      }
    });
  };

  const onPlayVid = (evt) => {
    const classes = evt.currentTarget.classList;
    const vid = $('.video')[0];
    console.log(vid);
    if (!classes.contains('playing')) {
      vid.play();
      classes.add('playing');
    } else {
      vid.pause();
      classes.remove('playing');
    }
    vid.onended = () => {
      classes.remove('playing');
    };
  };

  const initModule = () => {
    setupDomMap();
    initSliders();

    if (document.body.classList.contains('front')) {
      const loop = document.querySelector('.intro-loop');
      // loop.src = loop.dataset.src;
      if (window.innerWidth < 1020) {
        return true;
      }
      // const playPromise = loop.play();

      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      // if (playPromise !== undefined) {
      //   playPromise.then(() => {
      //     // Automatic playback started!
      //     console.log('yes');
      //   }).catch((error) => {
      //     console.log('nope');
      //     console.log(error);
      //     // Automatic playback failed.
      //     // Show a UI element to let the user manually start playback.
      //   });
      // }
    }

    domMap.menuBtn.on('click', onMenuBtnClick);
    domMap.playVid.on('click', onPlayVid);
  };

  return {
    initModule,
  };
})();

APP.initModule();
