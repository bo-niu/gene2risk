import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

const routes = [
  { path: '/', component: Home },
  { path: '/GetStarted', component: GetStarted },
  { path: '/AboutUs', component: AboutUs },
  { path: '/FAQ', component: FAQ },
];

export default routes;
