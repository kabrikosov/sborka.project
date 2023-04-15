/* eslint-disable prettier/prettier */
// import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

const removeFromCart = () => {};

const updateTotal = (val, amount) => {
	const subtotal = document.querySelector('.subtotal__item>span.money');
	const total = document.querySelector('.subtotal__item--total>span.money');
	const amountInCart = document.querySelector('.cart svg text');

	total.innerText = +total.innerText.replace(' ', '') + val;
	subtotal.innerText = +subtotal.innerText.replace(' ', '') + val;
	amountInCart.innerHTML = +amountInCart.innerHTML + amount;
};

document.querySelectorAll('.control__minus').forEach(el =>
	el.addEventListener('click', () => {
		const parent = el.parentElement;
		const amount = parent.querySelector('.control__amount');
		if (+amount.innerText > 1) {
			const sum = parent.querySelector('.control__sum');
			amount.innerText = +amount.innerText - 1;
			updateTotal(-1 * Number(sum.innerText), -1);
		}
	})
);

document.querySelectorAll('.control__plus').forEach(el =>
	el.addEventListener('click', () => {
		const parent = el.parentElement;
		const amount = parent.querySelector('.control__amount');
		const sum = parent.querySelector('.control__sum');

		amount.innerText = +amount.innerText + 1;

		updateTotal(+sum.innerText, 1);
	})
);

document.querySelectorAll('.remove_item').forEach(el =>
	el.addEventListener('click', () => {
		const parent = el.parentElement;
		const amount = +parent.querySelector('.control__amount').innerText;
		const sum = +parent.querySelector('.control__sum').innerText;
		const remove = amount * sum;

		parent.remove();

		updateTotal(-remove, -1 * amount);
	})
);

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
