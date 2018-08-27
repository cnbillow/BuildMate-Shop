// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCDUZO5-m_RNqJhJSNeVNsmbeftC8BPRGs",
    authDomain: "buildmateshop.firebaseapp.com",
    databaseURL: "https://buildmateshop.firebaseio.com",
    projectId: "buildmateshop",
    storageBucket: "buildmateshop.appspot.com",
    messagingSenderId: "154731635501"
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
