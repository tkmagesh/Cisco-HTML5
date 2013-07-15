function isPrime(n){
	if (n <= 3) return true;
	for(var i=2;i<n/2;i++)
		if (n % i == 0) return false;
	return true;
}
self.addEventListener("message", function(msgEvt){
	var reqData = msgEvt.data,
		result = 0,
		primeCount = 0,
		totalCount = reqData.end - reqData.start
		reportDelta = (totalCount) / 10;
	if (reqData.type == "start"){
		for(var i=reqData.start;i<reqData.end+1;i++){
			if (isPrime(i))
				primeCount++;
			if (i % reportDelta === 0)
				self.postMessage({type : "progress", percentCompleted : ((i-reqData.start) / totalCount) * 100, test : i});
		}
		self.postMessage({type : "completed", primeCount : primeCount, start : reqData.start, end : reqData.end});
	}
});