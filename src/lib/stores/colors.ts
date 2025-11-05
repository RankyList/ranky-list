import { readable } from 'svelte/store';

export const defaultRanksColors = readable([
	'bg-red',
	'bg-peach',
	'bg-yellow',
	'bg-green',
	'bg-sky',
	'bg-blue',
	'bg-mauve',
	'bg-pink'
]);

export const defaultRanksColorsHex = readable({
	dark: ['#f38ca9', '#fab285', '#f9e1ae', '#a6e3a1', '#89dceb', '#89b5fa', '#caa6f7', '#f5c2e7'],
	light: ['#e78384', '#ef9e76', '#e5c88f', '#a6d189', '#99d1db', '#8ca9ee', '#ca9ee6', '#f4b8e4']
});
