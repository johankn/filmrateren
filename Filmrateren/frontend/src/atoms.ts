import { atom } from 'recoil';

// Define atoms for sharing states between components
const selectedSortState = atom({
  key: 'selectedSortState',
  default: '',
});

const scrollPositionState = atom({
  key: 'scrollPositionState',
  default: 0,
});

const isCheckedState = atom({
  key: 'isCheckedState',
  default: false,
});

const selectedGenresState = atom<string[]>({
  key: 'selectedGenresState',
  default: [],
});

const inputValueState = atom({
  key: 'inputValueState',
  default: '',
});

const selectedTitleState = atom({
  key: 'selectedTitleState',
  default: '',
});

const initialCardsToShow = 28;
const cardsToShowState = atom({
  key: 'cardsToShowState',
  default: initialCardsToShow,
});

const selectedProvidersState = atom<string[]>({
  key: 'selectedProvidersState',
  default: [],
});

const showPopupState = atom({
  key: 'showPopupState',
  default: false,
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
