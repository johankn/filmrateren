export function getHomePageStyles(windowSize: { width: number }, scrollPosition: number) {
  const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80));
  const opacityScreenImg = Math.max(0, Math.min(1, 1 - (scrollPosition - 15) / 30));

  const opacitySeats = Math.max(0, Math.min(1, 1 - (scrollPosition - 20) / 60));
  const opacitySearch = Math.min(1, Math.max(0, (scrollPosition - 45) / 80));
  const opacityFilterSort = Math.min(1, Math.max(0, (scrollPosition - 60) / 40));
  const boxShadowOpacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80)) * 0.6;
  const boxShadowOpacityScreen = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80)) * 0.9;

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

  if (windowSize.width >= 1110) {
    targetHeight = 125 + (382 - 125) * opacity;
    targetWidth = 1040 + (910 - 1040) * opacity;
    targetMarginTop = 174 + (96 - 174) * opacity;
    targetMarginTopSearch = 35 + (250 - 35) * opacity;
    targetWidthSearch = 380 + (380 - 380) * opacity;
    targetLeftSearch = 30 + (265 - 30) * opacity;
    targetMarginTopBtn = 36 + (251 - 36) * opacity;
    targetRightBtn = 36 + (500 - 36) * opacity;
    targetMarginTopSeats = 200 + (0 - 200) * opacity;
    targetTopSearch = 350 + (525 - 350) * opacity;
    targetRightFilter = 375 + (500 - 375) * opacity;
    targetRightSort = 125 + (500 - 125) * opacity;
    targetTopFilterSort = 27 + (245 - 27) * opacity;
    targetHeightImg = 300 + (570 - 300) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
  } else if (windowSize.width >= 740) {
    targetHeight = 150 + (382 - 150) * opacity;
    targetWidth = 720 + (700 - 720) * opacity;
    targetMarginTop = 176 + (96 - 176) * opacity;
    targetMarginTopSearch = 15 + (250 - 15) * opacity;
    targetWidthSearch = 565 + (380 - 565) * opacity;
    targetLeftSearch = 30 + (165 - 30) * opacity;
    targetMarginTopBtn = 18 + (250 - 18) * opacity;
    targetRightBtn = 36 + (300 - 36) * opacity;
    targetMarginTopSeats = 200 + (0 - 200) * opacity;
    targetTopSearch = 350 + (525 - 350) * opacity;
    targetRightFilter = 343 + (343 - 343) * opacity;
    targetRightSort = 117 + (117 - 117) * opacity;
    targetTopFilterSort = 70 + (245 - 70) * opacity;
    targetHeightImg = 300 + (570 - 300) * opacity;
    targetTopScreenContent = 0 + (0 - 0) * opacity;
  } else {
    targetHeight = 200 + (250 - 200) * opacity;
    targetWidth = 350 + (350 - 350) * opacity;
    targetMarginTop = 176 + (96 - 176) * opacity;
    targetMarginTopSearch = 15 + (165 - 15) * opacity;
    targetWidthSearch = 300 + (300 - 300) * opacity;
    targetLeftSearch = 25 + (25 - 25) * opacity;
    targetMarginTopBtn = 141 + (76 - 141) * opacity;
    targetRightBtn = 139 + (139 - 139) * opacity;
    targetMarginTopSeats = 50 + (0 - 50) * opacity;
    targetTopSearch = 420 + (480 - 420) * opacity;
    targetRightFilter = 172 + (172 - 172) * opacity;
    targetRightSort = 18 + (18 - 18) * opacity;
    targetTopFilterSort = 70 + (110 - 70) * opacity;
    targetHeightImg = 160 + (160 - 160) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
  }

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
  };
  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${targetHeight}px`,
    width: `${targetWidth}px`,
    marginTop: `${targetMarginTop}px`,
  };
  const searchBarWrapperStyle = {
    marginTop: `${targetMarginTopSearch}px`,
    width: `${targetWidthSearch}px`,
    left: `${targetLeftSearch}px`,
  };

  const filterStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightFilter}px`,
    marginTop: `${targetTopFilterSort}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  const sortStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightSort}px`,
    marginTop: `${targetTopFilterSort}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  const btnStyle = {
    marginTop: `${targetMarginTopBtn}px`,
    right: `${targetRightBtn}px`,
    opacity: opacityFilterSort,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${targetMarginTopSeats}px`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${targetTopSearch}px`,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
  };

  const screenContentStyle = {
    opacity: opacityScreenImg,
    height: `${targetHeightImg}px`,
    marginTop: `${targetTopScreenContent}px`,
  };

  const logoStyle = {
    opacity: windowSize.width < 740 ? 0 : opacitySearch,
    pointerEvents: opacityFilterSort == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
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
  };
}
