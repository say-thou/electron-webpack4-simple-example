import moment from 'moment';  // <= ES6っぽくしました
import './style.css';         // <= 追加
// 以下は変わってません。
const btn = document.getElementById('btn');
const text = document.getElementById('text');
btn.addEventListener('click', function () {
	text.innerHTML = moment().format('YYYY-MM-DD HH:mm:ss');
});
