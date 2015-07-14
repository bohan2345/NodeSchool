function print() {
	console.log(x);
}

(function() {
	var x = 1;
	print();
})();

(function() {
	var x = 10;
	print();
})();