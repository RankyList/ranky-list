import './theme.postcss';
import '@skeletonlabs/skeleton/styles/skeleton.css';

const isIframe = window.self !== window.top;

// Remove skeleton.css from the main head (not in an iframe), see https://github.com/histoire-dev/histoire/issues/339#issuecomment-1522329599
document.head.querySelectorAll("style[type='text/css'][data-vite-dev-id$='skeleton.css']").forEach((style) => isIframe || style.remove());
