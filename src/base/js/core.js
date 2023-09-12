export const breakpoints = {
	phone: 0,
	tablet: 768,
	desktop: 992
}

export let slideUp = (target, duration = 500, callback) => {
	target.style.transitionProperty = 'height, margin, padding'
	target.style.transitionDuration = `${duration}ms`
	target.style.boxSizing = 'border-box'
	target.style.height = `${target.offsetHeight}px`
	// eslint-disable-next-line no-unused-expressions
	target.offsetHeight
	target.style.overflow = 'hidden'
	target.style.height = 0
	target.style.paddingTop = 0
	target.style.paddingBottom = 0
	target.style.marginTop = 0
	target.style.marginBottom = 0
	window.setTimeout(() => {
		target.style.display = 'none'
		target.style.removeProperty('height')
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('overflow')
		target.style.removeProperty('transition-duration')
		target.style.removeProperty('transition-property')
		if (callback) {
			callback()
		}
	}, duration)
}

export let slideDown = (target, duration = 500, callback) => {
	target.style.removeProperty('display')
	let display = window.getComputedStyle(target).display

	if (display === 'none') {
		display = 'block'
	}
	target.style.display = display
	let height = target.offsetHeight
	target.style.overflow = 'hidden'
	target.style.height = 0
	target.style.paddingTop = 0
	target.style.paddingBottom = 0
	target.style.marginTop = 0
	target.style.marginBottom = 0
	// eslint-disable-next-line no-unused-expressions
	target.offsetHeight
	target.style.boxSizing = 'border-box'
	target.style.transitionProperty = 'height, margin, padding'
	target.style.transitionDuration = `${duration}ms`
	target.style.height = `${height}px`
	target.style.removeProperty('padding-top')
	target.style.removeProperty('padding-bottom')
	target.style.removeProperty('margin-top')
	target.style.removeProperty('margin-bottom')
	window.setTimeout(() => {
		target.style.removeProperty('height')
		target.style.removeProperty('overflow')
		target.style.removeProperty('transition-duration')
		target.style.removeProperty('transition-property')
		if (callback) {
			callback()
		}
	}, duration)
}

export let slideToggle = (target, duration = 500, callback) => {
	let display = window.getComputedStyle(target).display
	if (display === 'none') {
		slideDown(target, duration, callback)
	} else {
		slideUp(target, duration, callback)
	}
}
const getChildren = (n, skipMe) => {
	let r = []
	for (; n; n = n.nextSibling) {
		if (n.nodeType === 1 && n !== skipMe) {
			r.push(n)
		}
	}

	return r
}
export const getSiblings = (n) => {
	return getChildren(n.parentNode.firstChild, n)
}
export const prevAll = (element) => {
	const result = [];
	while (element = element.previousElementSibling) {
		result.push(element);
	}

	return result;
}

export const validate = (selector) => {
	const inputsValidate = document.querySelectorAll(selector)
	inputsValidate.forEach($input => {
		$input.addEventListener('invalid', (e) => {
			e.preventDefault()
			$input.classList.add('is-invalid')
		})
		$input.addEventListener('input', () => {
			$input.classList.remove('is-invalid')
			if ($input.getAttribute('type') === 'radio') {
				const radios = $input.closest('form').querySelectorAll(`input[name="${$input.getAttribute('name')}"]`)
				radios.forEach($radio => {
					$radio.classList.remove('is-invalid')
				})
			}
		})
	})
}
validate('.js-validate [required]')
const tabs = (selector) => {
	const buttons = document.querySelectorAll(selector)
	buttons.forEach($button => {
		const tabID = $button.dataset.tab.substr(1) || $button.getAttribute('href').substr(1)
		const $tab = document.getElementById(tabID)
		const sBtns = getSiblings($button.parentNode)
		const sTabs = getSiblings($tab)
		$button.addEventListener('click', (e) => {
			e.preventDefault()
			$button.classList.add('is-active')
			$tab.classList.add('is-visible')
			sBtns.forEach($sBtn => {
				if ($sBtn.querySelector('[data-tab]')) {
					$sBtn.querySelector('[data-tab]').classList.remove('is-active')
				}
			})
			sTabs.forEach($sTab => {
				$sTab.classList.remove('is-visible')
			})
		})
	})
}
tabs('[data-tab]')
const tabsSlideToggle = (selector) => {
	const buttons = document.querySelectorAll(selector)
	buttons.forEach($button => {
		const $tab = document.getElementById($button.dataset.tabToggle.substr(1))
		$button.addEventListener('click', (e) => {
			e.preventDefault()
			$button.classList.toggle('is-active')
			slideToggle($tab)
		})
	})
}
tabsSlideToggle('[data-tab-toggle]')

import inputmask from 'inputmask'
const $inputPhones = document.querySelectorAll('input[type="tel"]')
$inputPhones.forEach($input => {
	inputmask({
		mask: '+7 ( 999 ) 999 - 99 - 99',
		showMaskOnHover: false
	}).mask($input)
})

const changeColors = () => {
	const arrColors = document.querySelectorAll('.color-list__input')
	arrColors.forEach($color => {
		const $ttl = $color.closest('.color-list').querySelector('.color-list__title span')
		if ($ttl) {
			$color.addEventListener('change', () => {
				if ($color.checked) {
					$ttl.textContent = $color.value
				}
			})
		}
	})
}
changeColors()
const changeSizes = () => {
	const arrSizes = document.querySelectorAll('.size-list__input')
	arrSizes.forEach($size => {
		const $ttl = $size.closest('.size-list').querySelector('.size-list__title span')
		if ($ttl) {
			$size.addEventListener('change', () => {
				if ($size.checked) {
					$ttl.textContent = $size.value
				}
			})
		}
	})
}
changeSizes()

const anchors = document.querySelectorAll('.js-anchore')
anchors.forEach($button => {
	$button.addEventListener('click', (e) => {
		e.preventDefault()
		const $el = document.getElementById($button.getAttribute('href').substring(1))
		if ($el) {
			const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
			const headerH = width < 992 ? document.querySelector('.s-header__top').offsetHeight + 61 : document.querySelector('.s-header__catalog-menu').offsetHeight + 40
			let display = window.getComputedStyle($el).display
			if (display === 'none') {
				$el.style.display = 'block'
			}
			const elPosition = $el.getBoundingClientRect().top - headerH
			if (display === 'none') {
				$el.style.display = 'none'
			}
			window.scrollBy({
				top: elPosition,
				behavior: 'smooth'
			})
		}
	})
})
