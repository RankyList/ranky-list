import './src/theme.scss';

const isIframe = window.self !== window.top;

// Set the data-theme when in an iframe, see https://github.com/histoire-dev/histoire/issues/339#issuecomment-1522329599
if (isIframe) {
  const body = document.querySelector('body');

  if (body) {
    body.setAttribute('data-theme', 'ranky-list');
  }
}
