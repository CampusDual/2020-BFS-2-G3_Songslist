import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'songlist', name: 'MY_SONGLISTS', icon: 'queue_music', route: '/main/songlist' },
  { id: 'perfil', icon: 'face', name: 'EDIT_PROFILE', route: '/main/perfil'},
  { id: 'logout', name: 'LOGOUT', route: '/main/login', icon: 'power_settings_new', confirm: 'yes' }
];
export const MENU_ANONYMOUSE: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'login', name: 'LOGIN', icon: 'face', route: '/main/login' ,confirm: 'no'},
];
