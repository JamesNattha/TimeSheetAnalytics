import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// recoil save state
const { persistAtom } = recoilPersist({
  key: 'recoil-default', // this key is using to store data in local storage
  storage: localStorage // configurate which stroage will be used to store the data
});

const isRememberState = atom({
  key: 'isRememberState',
  default: {
    isRemember: false,
    username: '',
    password: ''
  },
  effects_UNSTABLE: [persistAtom]
});

const isInfoState = atom({
  key: 'username',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const isInfoEdit = atom({
  key: 'edit',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const isInfoButton = atom({
  key: 'button',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const isBackButton = atom({
  key: 'back',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const isRole = atom({
  key: 'urole',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const valueRole = atom({
  key: 'valuerole',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const valueUser = atom({
  key: 'userid',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const fetchoneAtom = atom({
  key: 'fetchone',
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

const roleState = atom({
  key: 'roleState',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

const filteredPosition = atom({
  key: 'filteredPosition',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export {
  isRememberState,
  isInfoState,
  isInfoEdit,
  isInfoButton,
  isBackButton,
  isRole,
  valueRole,
  valueUser,
  fetchoneAtom,
  roleState,
  filteredPosition
};
