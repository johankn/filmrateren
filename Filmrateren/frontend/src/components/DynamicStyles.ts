export function getHomePageStyles(
  windowSize: { width: number },
  scrollPosition: number,
  certainSort: boolean,
  isEmpty: boolean,
) {
  const transitionDuration = '0.2s';

  const mobile = windowSize.width >= 740;

  // Easing functions for smoother transitions
  const easeOutQuart = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  const calcOpacity = (max: number, startMob: number, endMob: number, start: number, end: number) => {
    return mobile
      ? Math.max(0, Math.min(max, 1 - (scrollPosition - startMob) / endMob))
      : Math.max(0, Math.min(max, 1 - (scrollPosition - start) / end));
  };

  const calcOppositeOpacity = (startMob: number, endMob: number, start: number, end: number) => {
    return mobile
      ? Math.min(1, Math.max(0, (scrollPosition - startMob) / endMob))
      : Math.min(1, Math.max(0, (scrollPosition - start) / end));
  };

  const opacity = calcOpacity(1, 95, 60, 195, 60);
  const opacityScreenImg = calcOpacity(1, 85, 30, 185, 30);
  const opacitySeats = calcOpacity(1, 90, 60, 190, 30);
  const opacitySearch = calcOppositeOpacity(115, 80, 215, 80);
  const opacityFilterSort = calcOppositeOpacity(95, 60, 195, 60);
  const boxShadowOpacity = calcOpacity(1, 100, 80, 200, 80) * 0.6;
  const boxShadowOpacityScreen = calcOpacity(1, 100, 80, 200, 80) * 0.9;
  const checkBoxOpacity = calcOpacity(1, 155, 10, 195, 60);
  const opacityNewSearch = mobile
    ? Math.max(0, Math.min(1, (scrollPosition - 95) / 10))
    : Math.max(0, Math.min(1, (scrollPosition - 195) / 10));

  let screenHeight = certainSort ? 242 + (236 - 242) * opacity : 200 + (236 - 200) * opacity;
  let screenWidth = 350;
  let screenTop = 526 + (146 - 526) * opacity;
  let searchTop = 15 + (165 - 15) * opacity;
  let screenBorder = 14;
  let searchWidth = 326;
  let searchLeft = 12;
  let btnTop = certainSort ? 175 + (160 - 175) * opacity : 138 + (160 - 138) * opacity;
  let btnRight = 12;
  let seatsTop = 0 + (10 - 0) * opacity;
  let searchResultTop = certainSort ? 753 + (840 - 753) * opacity : 760 + (840 - 760) * opacity;
  let genresRight = 224;
  let providersRight = 114;
  let sortRight = 5;
  let filtersTop = 71 + (150 - 70) * opacity;
  let imgHeight = 160;
  let screenContentTop = 1 + (10 - 1) * opacity;
  let buttonHeight = 3.3;
  let buttonWidth = isEmpty ? 326 : 216;
  let checkTop = 130;
  let checkRight = 67 + (0 - 0) * checkBoxOpacity;
  let resetTop = certainSort ? 175 + (160 - 175) * opacity : 138 + (160 - 138) * opacity;
  let resetWidth = 103;
  let resetRight = 233;
  let resetHeight = 53;

  if (windowSize.width >= 1110) {
    screenHeight = isEmpty ? 125 + (382 - 125) * opacity : 132 + (382 - 132) * opacity;
    screenWidth = 1040 + (910 - 1040) * opacity;
    screenTop = 374 + (96 - 374) * opacity;
    screenBorder = 14 + (10 - 14) * opacity;
    searchTop = 35 + (250 - 35) * opacity;
    searchWidth = 420 + (380 - 420) * opacity;
    searchLeft = 30 + (265 - 30) * opacity;
    btnTop = 36 + (251 - 36) * opacity;
    btnRight = 36 + (500 - 36) * opacity;
    seatsTop = 0 + (60 - 0) * opacity;
    searchResultTop = 548 + (565 - 548) * opacity;
    genresRight = 420 + (500 - 420) * opacity;
    providersRight = 260 + (500 - 260) * opacity;
    sortRight = 100 + (500 - 100) * opacity;
    filtersTop = 27 + (245 - 27) * opacity;
    imgHeight = 300 + (570 - 300) * opacity;
    screenContentTop = 1 + (10 - 1) * opacity;
    buttonWidth = 64;
    checkTop = 88 + (60 - 88) * checkBoxOpacity;
    checkRight = 103;
    resetTop = 95 + (70 - 95) * checkBoxOpacity;
    resetWidth = 64 + (44 - 64) * opacity;
    resetRight = 36;
    resetHeight = 30;
  } else if (windowSize.width >= 740) {
    screenHeight = certainSort ? 180 + (382 - 180) * opacity : 160 + (382 - 160) * opacity;
    screenWidth = 720 + (700 - 720) * opacity;
    screenTop = 376 + (96 - 376) * opacity;
    screenBorder = 14 + (10 - 14) * opacity;
    searchTop = 22 + (250 - 22) * opacity;
    searchWidth = 565 + (380 - 565) * opacity;
    searchLeft = 30 + (165 - 30) * opacity;
    btnTop = 23 + (250 - 23) * opacity;
    btnRight = 31 + (300 - 31) * opacity;
    seatsTop = 0 + (60 - 0) * opacity;
    searchResultTop = 570 + (645 - 570) * opacity;
    genresRight = 496 + (255 - 496) * opacity;
    providersRight = 306.7 + (255 - 306.7) * opacity;
    sortRight = 117 + (145 - 117) * opacity;
    filtersTop = 77 + (245 - 77) * opacity;
    imgHeight = 0 + (380 - 0) * opacity;
    screenContentTop = 0;
    buttonHeight = isEmpty ? 7.1 + (0 - 7.1) * opacity : 3.4 + (0 - 3.4) * opacity;
    buttonWidth = 80 + (64 - 80) * opacity;
    checkTop = 136 + (100 - 136) * checkBoxOpacity;
    checkRight = 115;
    resetTop = 85 + (50 - 85) * checkBoxOpacity;
    resetWidth = 80 + (64 - 80) * opacity;
    resetRight = 31 + (100 - 31) * opacity;
    resetHeight = 54;
  }

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
    transition: `box-shadow ${transitionDuration} ${easeOutQuart}`,
  };

  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${screenHeight}px`,
    width: `${screenWidth}px`,
    marginTop: `${screenTop}px`,
    borderRadius: `${screenBorder}px`,
    transition: `height ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const searchBarWrapperStyle = {
    opacity: opacity,
    marginTop: `${searchTop}px`,
    width: `${searchWidth}px`,
    left: `${searchLeft}px`,
    pointerEvents: opacity == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}, left ${transitionDuration} ${easeOutQuart}`,
  };

  const genresStyle = {
    opacity: opacityFilterSort,
    right: `${genresRight}px`,
    marginTop: `${filtersTop}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const providersStyle = {
    opacity: opacityFilterSort,
    right: `${providersRight}px`,
    marginTop: `${filtersTop}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const sortStyle = {
    opacity: opacityFilterSort,
    right: `${sortRight}px`,
    marginTop: `${filtersTop}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const btnStyle = {
    marginTop: `${btnTop}px`,
    right: `${btnRight}px`,
    opacity: opacityFilterSort,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}`,
  };

  const buttonStyle = {
    minHeight: `${buttonHeight}rem`,
    width: `${buttonWidth}px`,
    transition: `min-height ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}`,
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${seatsTop}px`,
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${searchResultTop}px`,
    pointerEvents: opacitySearch == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, top ${transitionDuration} ${easeOutQuart}`,
  };

  const screenContentStyle = {
    opacity: opacityScreenImg,
    height: `${imgHeight}px`,
    marginTop: `${screenContentTop}px`,
    transition: `opacity ${transitionDuration} ${easeOutQuart}, height ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const logoStyle = {
    opacity: windowSize.width < 740 ? 0 : opacitySearch,
    pointerEvents: opacitySearch == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}`,
  };

  const newSearchBarStyle = {
    opacity: opacityNewSearch,
    marginTop: `${searchTop}px`,
    left: `${searchLeft}px`,
    pointerEvents: opacity == 0 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, left ${transitionDuration} ${easeOutQuart}`,
  };

  const checkBoxStyle = {
    opacity: certainSort ? 1 - checkBoxOpacity : '0',
    marginTop: `${checkTop}px`,
    right: `${checkRight}px`,
    pointerEvents:
      isEmpty || !certainSort
        ? ('none' as React.CSSProperties['pointerEvents'])
        : opacityFilterSort == 1
        ? 'auto'
        : ('none' as React.CSSProperties['pointerEvents']),
  };

  const resetStyle = {
    opacity: isEmpty ? '0' : 1 - checkBoxOpacity,
    marginTop: `${resetTop}px`,
    right: `${resetRight}px`,
    height: `${resetHeight}px`,
    width: `${resetWidth}px`,
    pointerEvents: isEmpty
      ? ('none' as React.CSSProperties['pointerEvents'])
      : opacityFilterSort == 1
      ? 'auto'
      : ('none' as React.CSSProperties['pointerEvents']),
  };

  return {
    opacitySearch,
    opacityFilterSort,
    opacityScreenImg,
    homePageStyle,
    screenStyle,
    searchBarWrapperStyle,
    genresStyle,
    providersStyle,
    sortStyle,
    btnStyle,
    seatsStyle,
    searchStyle,
    screenContentStyle,
    logoStyle,
    buttonStyle,
    newSearchBarStyle,
    searchWidth,
    checkBoxStyle,
    resetStyle,
    checkBoxOpacity,
  };
}
