import { Config } from 'ontimize-web-ngx';

import { SERVICE_CONFIG } from './shared/app.services.config';
import { MENU_CONFIG , MENU_ANONYMOUSE } from './shared/app.menu.config';

// export const myUser = ( ): boolean => {
//   return JSON.parse(localStorage.getItem('com.ontimize.web.ngx.jee.seed')).session.id ;
// } 

function User (): boolean {
  return JSON.parse(localStorage.getItem('com.ontimize.web.ngx.jee.seed')).session.id ;
}

export const CONFIG: Config = {
  // The base path of the URL used by app services.
  apiEndpoint: 'http://localhost:33334',
  bundle: {
    path: 'bundle'
  },
  // Application identifier. Is the unique package identifier of the app.
  // It is used when storing or managing temporal data related with the app.
  // By default is set as 'ontimize-web-uuid'.
  uuid: 'com.ontimize.web.ngx.jee.seed',

  // Title of the app
  title: 'JEE seed',

  //  Language of the application.
  locale: 'en',

  // The service type used (Ontimize REST standart, Ontimize REST JEE
  // or custom implementation) in the whole application.
  serviceType: 'OntimizeEE',

  // Configuration parameters of application services.
  servicesConfiguration: SERVICE_CONFIG,

  appMenuConfiguration: User ? MENU_CONFIG : MENU_ANONYMOUSE,

  applicationLocales: ['es', 'en']
};
