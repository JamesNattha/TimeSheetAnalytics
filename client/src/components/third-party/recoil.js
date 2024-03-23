import { atom } from 'recoil';

const selectTab = atom({
  key: 'active_tab',
  default: 'all'
});

const selectTabOverall = atom({
  key: 'active_tab_overall',
  default: 'task'
});

const timerRunning = atom({
  key: 'timerRunning',
  default: false
});

export { selectTab, timerRunning, selectTabOverall };
