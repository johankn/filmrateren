export function getHomePageStyles(
  windowSize: { width: number },
  scrollPosition: number,
  certainSort: boolean,
  isEmpty: boolean,
) {
  const transitionDuration = '0.2s';

  const opacity =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 95) / 60))
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 195) / 60));

  // Easing functions for smoother transitions
  const easeOutQuart = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

  const opacityScreenImg =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 85) / 30))
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 185) / 30));
  const opacityNewSearch =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, (scrollPosition - 95) / 10))
      : Math.max(0, Math.min(1, (scrollPosition - 195) / 10));
  const opacitySeats =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 90) / 60))
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 190) / 30));
  const opacitySearch =
    windowSize.width >= 740
      ? Math.min(1, Math.max(0, (scrollPosition - 115) / 80))
      : Math.min(1, Math.max(0, (scrollPosition - 215) / 80));
  const opacityFilterSort =
    windowSize.width >= 740
      ? Math.min(1, Math.max(0, (scrollPosition - 95) / 60))
      : Math.min(1, Math.max(0, (scrollPosition - 195) / 60));
  const boxShadowOpacity =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 100) / 80)) * 0.6
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 200) / 80)) * 0.6;
  const boxShadowOpacityScreen =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 100) / 80)) * 0.9
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 200) / 80)) * 0.9;
  const checkBoxOpacity =
    windowSize.width >= 740
      ? Math.max(0, Math.min(1, 1 - (scrollPosition - 155) / 10))
      : Math.max(0, Math.min(1, 1 - (scrollPosition - 195) / 60));

  let targetHeight;
  let targetWidth;
  let targetMarginTop;
  let targetMarginTopSearch;
  let targetWidthSearch;
  let targetLeftSearch;
  let targetMarginTopBtn;
  let targetRightBtn;
  let targetMarginTopSeats;
  let targetTopSearch;
  let targetRightFilter;
  let targetRightSort;
  let targetTopFilterSort;
  let targetHeightImg;
  let targetTopScreenContent;
  let targetButtonHeight;
  let targetButtonWidth;
  let targetMarginTopCheck;
  let targetRightCheck;
  let targetMarginTopReset;
  let targetRightReset;
  let targetResetHeight;

  if (windowSize.width >= 1110) {
    targetHeight = isEmpty ? 125 + (382 - 125) * opacity : 140 + (382 - 125) * opacity;
    targetWidth = 1040 + (910 - 1040) * opacity;
    targetMarginTop = 374 + (96 - 374) * opacity;
    targetMarginTopSearch = 35 + (250 - 35) * opacity;
    targetWidthSearch = 480 + (380 - 480) * opacity;
    targetLeftSearch = 30 + (265 - 30) * opacity;
    targetMarginTopBtn = 36 + (251 - 36) * opacity;
    targetRightBtn = 36 + (500 - 36) * opacity;
    targetMarginTopSeats = 0 + (60 - 0) * opacity;
    targetTopSearch = 500 + (525 - 500) * opacity;
    targetRightFilter = 310 + (500 - 310) * opacity;
    targetRightSort = 100 + (500 - 100) * opacity;
    targetTopFilterSort = 27 + (245 - 27) * opacity;
    targetHeightImg = 300 + (570 - 300) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
    targetButtonHeight = 3.3;
    targetButtonWidth = 4;
    targetMarginTopCheck = 93 + (60 - 93) * checkBoxOpacity;
    targetRightCheck = 103 + (103 - 103) * checkBoxOpacity;
    targetMarginTopReset = 100 + (70 - 100) * checkBoxOpacity;
    targetRightReset = 489;
    targetResetHeight = 30;
  } else if (windowSize.width >= 740) {
    targetHeight = 172 + (382 - 172) * opacity;
    targetWidth = 720 + (700 - 720) * opacity;
    targetMarginTop = 376 + (96 - 376) * opacity;
    targetMarginTopSearch = 32 + (250 - 32) * opacity;
    targetWidthSearch = 565 + (380 - 565) * opacity;
    targetLeftSearch = 30 + (165 - 30) * opacity;
    targetMarginTopBtn = 33 + (250 - 33) * opacity;
    targetRightBtn = 31 + (300 - 31) * opacity;
    targetMarginTopSeats = 0 + (60 - 0) * opacity;
    targetTopSearch = 550 + (625 - 550) * opacity;
    targetRightFilter = 403 + (255 - 403) * opacity;
    targetRightSort = 117 + (145 - 117) * opacity;
    targetTopFilterSort = 87 + (245 - 87) * opacity;
    targetHeightImg = 0 + (380 - 0) * opacity;
    targetTopScreenContent = 0;
    targetButtonHeight = isEmpty ? 6.6 + (0 - 6.6) * opacity : 3.4 + (0 - 3.4) * opacity;
    targetButtonWidth = 5 + (4 - 5) * opacity;
    targetMarginTopCheck = 133 + (100 - 133) * checkBoxOpacity;
    targetRightCheck = 155;
    targetMarginTopReset = 95 + (50 - 95) * checkBoxOpacity;
    targetRightReset = 31 + (100 - 31) * opacity;
    targetResetHeight = 45;
  } else {
    targetHeight = certainSort ? 250 : 200 + (250 - 200) * opacity;
    targetWidth = 350 + (350 - 350) * opacity;
    targetMarginTop = 526 + (146 - 526) * opacity;
    targetMarginTopSearch = 15 + (165 - 15) * opacity;
    targetWidthSearch = 300;
    targetLeftSearch = 25;
    targetMarginTopBtn = certainSort ? 180 + (160 - 180) * opacity : 141 + (160 - 141) * opacity;
    targetRightBtn = isEmpty ? 144 : 104;
    targetMarginTopSeats = 0 + (10 - 0) * opacity;
    targetTopSearch = certainSort ? 750 + (840 - 750) * opacity : 710 + (800 - 710) * opacity;
    targetRightFilter = 172;
    targetRightSort = 18;
    targetTopFilterSort = 70 + (150 - 70) * opacity;
    targetHeightImg = 160 + (160 - 160) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
    targetButtonHeight = 3.3;
    targetButtonWidth = 4;
    targetMarginTopCheck = 135 + (0 - 0) * checkBoxOpacity;
    targetRightCheck = 67 + (0 - 0) * checkBoxOpacity;
    targetMarginTopReset = certainSort ? 180 + (160 - 180) * opacity : 141 + (160 - 141) * opacity;
    targetRightReset = 180;
    targetResetHeight = 53;
  }

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
    transition: `box-shadow ${transitionDuration} ${easeOutQuart}`,
  };

  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${targetHeight}px`,
    width: `${targetWidth}px`,
    marginTop: `${targetMarginTop}px`,
    transition: `height ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const searchBarWrapperStyle = {
    opacity: opacity,
    marginTop: `${targetMarginTopSearch}px`,
    width: `${targetWidthSearch}px`,
    left: `${targetLeftSearch}px`,
    pointerEvents: opacity == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}, left ${transitionDuration} ${easeOutQuart}`,
  };

  const filterStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightFilter}px`,
    marginTop: `${targetTopFilterSort}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const sortStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightSort}px`,
    marginTop: `${targetTopFilterSort}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const btnStyle = {
    marginTop: `${targetMarginTopBtn}px`,
    right: `${targetRightBtn}px`,
    opacity: opacityFilterSort,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, right ${transitionDuration} ${easeOutQuart}`,
  };

  const buttonStyle = {
    minHeight: `${targetButtonHeight}rem`,
    width: `${targetButtonWidth}rem`,
    transition: `min-height ${transitionDuration} ${easeOutQuart}, width ${transitionDuration} ${easeOutQuart}`,
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${targetMarginTopSeats}px`,
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${targetTopSearch}px`,
    pointerEvents: opacitySearch == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, top ${transitionDuration} ${easeOutQuart}`,
  };

  const screenContentStyle = {
    opacity: opacityScreenImg,
    height: `${targetHeightImg}px`,
    marginTop: `${targetTopScreenContent}px`,
    transition: `opacity ${transitionDuration} ${easeOutQuart}, height ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}`,
  };

  const logoStyle = {
    opacity: windowSize.width < 740 ? 0 : opacitySearch,
    pointerEvents: opacitySearch == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}`,
  };

  const newSearchBarStyle = {
    opacity: opacityNewSearch,
    marginTop: `${targetMarginTopSearch}px`,
    left: `${targetLeftSearch}px`,
    pointerEvents: opacity == 0 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
    transition: `opacity ${transitionDuration} ${easeOutQuart}, margin-top ${transitionDuration} ${easeOutQuart}, left ${transitionDuration} ${easeOutQuart}`,
  };

  const checkBoxStyle = {
    opacity: certainSort ? 1 - checkBoxOpacity : '0',
    marginTop: `${targetMarginTopCheck}px`,
    right: `${targetRightCheck}px`,
    pointerEvents: checkBoxOpacity == 0 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  const resetStyle = {
    opacity: isEmpty ? '0' : 1 - checkBoxOpacity,
    marginTop: `${targetMarginTopReset}px`,
    right: `${targetRightReset}px`,
    height: `${targetResetHeight}px`,
    width: `${targetButtonWidth}rem`,
    pointerEvents: checkBoxOpacity == 0 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  return {
    opacitySearch,
    opacityFilterSort,
    opacityScreenImg,
    homePageStyle,
    screenStyle,
    searchBarWrapperStyle,
    filterStyle,
    sortStyle,
    btnStyle,
    seatsStyle,
    searchStyle,
    screenContentStyle,
    logoStyle,
    buttonStyle,
    newSearchBarStyle,
    targetWidthSearch,
    checkBoxStyle,
    resetStyle,
    checkBoxOpacity,
  };
}
