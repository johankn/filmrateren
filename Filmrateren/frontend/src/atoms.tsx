import { atom } from 'recoil';

const selectedSortState = atom({
  key: 'selectedSortState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const scrollPositionState = atom({
  key: 'scrollPositionState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

const isCheckedState = atom({
  key: 'isCheckedState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const selectedGenresState = atom<string[]>({
  key: 'selectedGenresState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const inputValueState = atom({
  key: 'inputValueState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const selectedTitleState = atom({
  key: 'selectedTitleState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const initialCardsToShow = 28; // Number of cards to display initially
const cardsToShowState = atom({
  key: 'cardsToShowState', // unique ID (with respect to other atoms/selectors)
  default: initialCardsToShow, // default value (aka initial value)
});

const selectedProvidersState = atom<string[]>({
  key: 'selectedProvidersState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const showPopupState = atom({
  key: 'showPopupState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export {
  selectedSortState,
  scrollPositionState,
  selectedGenresState,
  inputValueState,
  selectedTitleState,
  cardsToShowState,
  isCheckedState,
  selectedProvidersState,
  showPopupState,
};
