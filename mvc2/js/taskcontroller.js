var TaskController = function (view) {
    this.model = new TaskModel();
    this.view = view;

    this.model.addTaskEvent = new Event(this.model);
    this.model.removeTaskEvent = new Event(this.model);
    this.model.setTasksAsCompletedEvent = new Event(this.model);
    this.model.deleteTasksEvent = new Event(this.model);

    this.init();
};

TaskController.prototype = {

    init: function () {
        this.setupHandlers()
            .attachEvents()
            .createChildren();
    },

    createChildren: function () {
        // no need to create children inside the controller
        // this is a job for the view
        // you could all as well leave this function out
        return this;
    },

    setupHandlers: function () {

        this.addTaskHandler = this.addTask.bind(this);
        this.selectTaskHandler = this.selectTask.bind(this);
        this.unselectTaskHandler = this.unselectTask.bind(this);
        this.completeTaskHandler = this.completeTask.bind(this);
        this.deleteTaskHandler = this.deleteTask.bind(this);
        return this;
    },

    attachEvents: function () {
    //  set up events for the view to notify the controller of user actions
        this.view.addTaskEvent.attach(this.addTaskHandler);
        this.view.completeTaskEvent.attach(this.completeTaskHandler);
        this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
        this.view.selectTaskEvent.attach(this.selectTaskHandler);
        this.view.unselectTaskEvent.attach(this.unselectTaskHandler);

    //  set up events for the model to notify the view when it needs to update
        this.model.addTaskEvent.attach(this.view.addTaskHandler);
        this.model.addTaskEvent.attach(this.view.clearTaskTextBoxHandler);
        this.model.setTasksAsCompletedEvent.attach(this.view.setTasksAsCompletedHandler);
        this.model.deleteTasksEvent.attach(this.view.deleteTasksHandler);

        return this;
    },

    addTask: function (sender, args) {
        if (args.task) {
            this.model.addTask(args.task);
        }
    },

    selectTask: function (sender, args) {
//        console.log("setting selected task index: " + args.taskIndex);
        this.model.setSelectedTask(args.taskIndex);
    },

    unselectTask: function (sender, args) {
        this.model.unselectTask(args.taskIndex);
    },

    completeTask: function () {
        this.model.setTasksAsCompleted();
    },

    deleteTask: function () {
        this.model.deleteTasks();
    }

};
