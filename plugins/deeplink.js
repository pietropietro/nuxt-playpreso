import { App } from '@capacitor/app';

//in order to open the /recover/id in app at the exact nuxt path
export default ({app}) => {
  App.addListener('appUrlOpen', (data) => {
    //something like https://playpreso.com/recover/safasfasas
    const url = new URL(data.url);
    //smth like recover/safasfasas
    const path = url.pathname; 
    app.router.push(path);
  });
};