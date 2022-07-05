import MainTabHomeScreen from '../screens/MainTabHome';
import MainTabSearchScreen from '../screens/MainTabSearch';
import MainTabLikesScreen from '../screens/MainTabLikes';
import MainTabMypageScreen from '../screens/MainTabMypage';
import mainHeaderTab from './main-header-tab';
export const mainTabRoutes = [
  {
    label: 'Home',
    name: 'Home',
    com: mainHeaderTab,
    icon: 'home',
    header: false,
  },
  {
    label: 'Search',
    name: '검색',
    com: MainTabSearchScreen,
    icon: 'search',
    header: true,
  },
  {
    label: 'Like',
    name: '즐겨찾기',
    com: MainTabLikesScreen,
    icon: 'heart',
    header: true,
  },
  {
    label: 'My',
    name: '마이페이지',
    com: MainTabMypageScreen,
    icon: 'mypage',
    header: true,
  },
];
