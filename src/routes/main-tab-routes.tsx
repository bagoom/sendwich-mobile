import MainTabHomeScreen from '../screens/MainTabHome';
import MainTabSearchScreen from '../screens/MainTabSearch';
import MainTabLikesScreen from '../screens/MainTabLikes';
import MainTabMypageScreen from '../screens/MainTabMypage';
import mainHeaderTab from './main-header-tab';
export const mainTabRoutes = [
  {
    name: 'Home',
    com: mainHeaderTab,
    icon: 'home',
  },
  {
    name: 'Search',
    com: MainTabSearchScreen,
    icon: 'search',
  },
  {
    name: 'Like',
    com: MainTabLikesScreen,
    icon: 'heart',
  },
  {
    name: 'My',
    com: MainTabMypageScreen,
    icon: 'mypage',
  },
];
