module.exports = function check(str, bracketsConfig) {
	
	let cfg = [].concat.apply([], bracketsConfig);
	let openBr = cfg.filter((item, i) => i % 2 === 0);
	let closeBr = cfg.filter((item, i) => i % 2 === 1);
	let arr = str.split('');
	let cache = []; // if the symbols in subarray are equal
	let stack = []; 

	for(let i = 0; i < arr.length; i++){
	    outer:
		for(let j = 0; j < openBr.length; j++){
		    if (openBr[j] === closeBr[j]){
		        if(arr[i] === cache[cache.length - 1]){
                      stack.pop();
                      cache.pop();
                  } else {
                    stack.push(arr[i]);
                    cache.push(arr[i]);  
                  }	
		        break outer;
		    } else if (arr[i] === openBr[j]) {
			    stack.push(arr[i]);
			    break outer;
			} else if (arr[i] === closeBr[j]) {
			    let index = cfg.indexOf(closeBr[j]);
				let tmp = cfg[index - 1];

				if (tmp !== stack.pop()) return false;
				break outer;
			}   
		}
	}
	
    return (stack.length === 0) ? true : false;
}
