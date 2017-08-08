var TaskModel = function () {
     this.tasks = [];
     this.selectedTasks = [];
     this.addTaskEvent = new Event(this);
     this.removeTaskEvent = new Event(this);
     this.setTasksAsCompletedEvent = new Event(this);
     this.deleteTasksEvent = new Event(this);

 };

 TaskModel.prototype = {

     addTask: function (task) {
         this.tasks.push({
             taskName: task,
             taskStatus: 'uncompleted'
         });
         this.addTaskEvent.notify();
     },

     getTasks: function () {
         return this.tasks;
     },

     setSelectedTask: function (taskIndex) {
         this.selectedTasks.push(taskIndex);
     },

     unselectTask: function (taskIndex) {
         this.selectedTasks.splice(taskIndex, 1);
     },

     setTasksAsCompleted: function () {
         var selectedTasks = this.selectedTasks;
//         console.log("Selected tasks: " + selectedTasks.length);
    //  NOTE: not a good idea to iterate arrays using for-in
    //  since sequence is not guaranteed and all enumerable properties will be evaluated
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
//         for (var index in selectedTasks) {
////             console.log("setting to complete index: " + index);
//             this.tasks[selectedTasks[index]].taskStatus = 'completed';
//         }
         for (var i = 0; i < selectedTasks.length; i++) {
//             console.log("setting to complete index: " + index);
             this.tasks[selectedTasks[i]].taskStatus = 'completed';
         }

         this.setTasksAsCompletedEvent.notify();

         this.selectedTasks = [];

     },


     deleteTasks: function () {
         var selectedTasks = this.selectedTasks.sort();

         for (var i = selectedTasks.length - 1; i >= 0; i--) {
             this.tasks.splice(this.selectedTasks[i], 1);
         }

         // clear the selected tasks
         this.selectedTasks = [];

         this.deleteTasksEvent.notify();

     }


 };
