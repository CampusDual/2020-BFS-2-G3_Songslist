import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'songlist', name: 'MY_SONGLISTS', icon: 'list', route: '/main/songlist'},
  { id: 'perfil-edit', name: 'EDIT_PROFILE', icon:'user', route: '/main/perfil'},
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];
