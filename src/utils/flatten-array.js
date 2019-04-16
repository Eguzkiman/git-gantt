export default function flattenArray (arr) {
	let flat = [];
	arr.forEach((innerArr) => {
		innerArr.forEach((item) => {
			flat.push(item);
		});
	});
	return flat;
}
