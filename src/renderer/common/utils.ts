export function negativeModulo(x: number) {
    let result;
	if (x % 16 == 0) result = 0;
	else if (x >= 0) result = x % 16;
	else result = 16 + (x % 16);

    return result;
}
