function foo() {
	var bar = 1;
	quux = 3;
	function zip() {
		bar = true;
		var quux = 2;
	}
	return zip;
}