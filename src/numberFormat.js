
function numberFormat(number, dec, dsep, tsep){
	if (isNaN(number) || number == null) return '';
	
	number = number.toFixed(~~dec);
	tsep = typeof tsep == 'string' ? tsep : ',';
	
	const parts = number.split('.'), fnums = parts[0],
		decimals = parts[1] ? (dsep || '.') + parts[1] : '';
	
	return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;	
}

export default numberFormat;