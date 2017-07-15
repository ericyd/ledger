import App from './components/App';

// clear spinner
document.getElementById('app').innerHTML = '';

const app = new App({
  target: document.getElementById('app'),
  data: {},
  components: {}
});
