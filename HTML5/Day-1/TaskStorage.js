function getTaskStorage(){
	var storage = window.localStorage;
	function getTasks(){
			var tasks = [];
			for(var i=0;i<storage.length;i++ ){
				var taskId = storage.key(i);
				var taskName = storage.getItem(taskId);
				var task = { taskId : taskId, taskName : taskName};
				tasks.push(task);
			}
			return tasks;
	}
	function saveTask (taskName){
		var newTaskId = new Date().getTime().toString();
		storage.setItem(newTaskId,taskName);
		return {taskId : newTaskId, taskName : taskName};
	}
	function removeTask(taskId){
		storage.removeItem(taskId);
	}
	function  length(){
		return storage.length;
	}
	return {
		getTasks : getTasks,
		saveTask : saveTask,
		removeTask : removeTask,
		length : length
	};
}
	/*taskStorage = {
			storage : window.localStorage,
			getTasks: function(){
				var tasks = [];
				for(var i=0;i<this.storage.length;i++ ){
					var taskId = this.storage.key(i);
					var taskName = this.storage.getItem(taskId);
					var task = { taskId : taskId, taskName : taskName};
					tasks.push(task);
				}
				return tasks;
			},
			saveTask : function (taskName){
				var newTaskId = new Date().getTime().toString();
				this.storage.setItem(newTaskId,taskName);
				return {taskId : newTaskId, taskName : taskName};
			},
			removeTask : function (taskId){
				this.storage.removeItem(taskId);
			},
		
		};
*/