(function(){
	var taskStorage = getTaskStorage(); 
	window.addEventListener("DOMContentLoaded",function(){
		var taskList = document.getElementById("ulTaskList");
		document.getElementById("btnAddTask").addEventListener("click",onBtnAddTaskClick);
		document.getElementById("btnRemoveCompletedTasks").addEventListener("click",onBtnRemoveCompletedTasksClick);
		var tasks = taskStorage.getTasks();
		for(var index in tasks){
			var task = tasks[index];
			addTaskToUI(task);
		}
		
	});

	function onBtnAddTaskClick(){
		var taskName = document.getElementById("txtTask").value;
		//For storage
		var newTask = taskStorage.saveTask(taskName);
		addTaskToUI(newTask);
		
	}

	
	function addTaskToUI(task){
		var newTaskItem = document.createElement("li");
		newTaskItem.innerHTML = task.taskName;
		newTaskItem.setAttribute("data-taskId",task.taskId);
		if (task.isCompleted)
			newTaskItem.classList.add("completed");
		newTaskItem.addEventListener("click",onTaskItemClick);
		document.getElementById("ulTaskList").appendChild(newTaskItem);
	}

	function onTaskItemClick(){
		if (this.classList.contains("completed")){
			this.classList.remove("completed"); 
		} else {
			this.classList.add("completed");
		}
		var taskId = this.getAttribute("data-taskId");
		taskStorage.toggleCompletion(taskId);
	}

	function onBtnRemoveCompletedTasksClick(){
		var taskList = document.getElementById("ulTaskList");
		for(var i=taskList.children.length-1;i>=0;i--){
			var taskItem = taskList.children[i];
			if (taskItem.classList.contains("completed") ){
				var taskIdToRemove = taskItem.getAttribute("data-taskId");
				taskStorage.removeTask(taskIdToRemove );
				taskList.removeChild(taskItem);
			}
		}
	}

	
})()