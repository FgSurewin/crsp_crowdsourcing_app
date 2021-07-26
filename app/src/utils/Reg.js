// eslint-disable-next-line
const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export function testEmail(email) {
	if (reg.test(email)) return true;
	return false;
}
