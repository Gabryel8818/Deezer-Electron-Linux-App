const btn = document.getElementById('btn_dark_mode');

btn.addEventListener('change', (e) => {
	document.body.classList.toggle('dark', e.target.checked);
});