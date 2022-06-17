import * as React from 'react';

import MainTabHomeScreen from '../screens/MainTabHome';
import MainTabSearchScreen from '../screens/MainTabSearch';
import MainTabLikesScreen from '../screens/MainTabLikes';
import MainTabMypageScreen from '../screens/MainTabMypage';

export const mainTabRoutes = [
  {
    name: '메뉴1',
    com: MainTabHomeScreen,
    icon: 'home',
  },
  {
    name: '메뉴2',
    com: MainTabSearchScreen,
    icon: 'search',
  },
  {
    name: '메뉴3',
    com: MainTabLikesScreen,
    icon: 'like',
  },
  {
    name: '메뉴4',
    com: MainTabMypageScreen,
    icon: 'mypage',
  },
];
