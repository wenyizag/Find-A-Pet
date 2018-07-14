export function isValidZip(zip){
	return /^\d{5}(-\d{4})?$/.test(zip);
}

export function showAlert(message, className){
	const div = document.createElement('div');

	div.className = `alert  alert-${className}`;
	div.appendChild(document.createTextNode(message));

	const wrap = document.querySelector('.wrap-contact100');
	const form = document.querySelector('#pet-form');

	wrap.insertBefore(div, form);

	setTimeout(()=> document.querySelector('.alert').remove(), 3000);
}