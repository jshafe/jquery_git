var TaskView = function () {
//  create events that will be used to inform the controller of interface changes
    this.addTaskEvent = new Event(this);
    this.selectTaskEvent = new Event(this);
    this.unselectTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

    this.init();
};

TaskView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // cache the document object
        this.$container = $('.js-container');
        this.$addTaskButton = this.$container.find('.js-add-task-button');
//        this.$addTaskButton = $('.js-add-task-button'); //  equivalent but relies on their only being one element with this class
        this.$taskTextBox = this.$container.find('.js-task-textbox');
        this.$tasksContainer = this.$container.find('.js-tasks-container');

        return this;
    },

    setupHandlers: function () {
    //  .bind is pure JavaScript that creates a new function that maintains the reference to "this"
        this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
        this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
        this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.addTaskHandler = this.addTask.bind(this);
        this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
        this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
        this.deleteTasksHandler = this.deleteTasks.bind(this);

        return this;
    },

    enable: function () {

        this.$addTaskButton.click(this.addTaskButtonHandler);
        this.$container.on('click', '.js-task', this.selectOrUnselectTaskHandler);
        this.$container.on('click', '.js-complete-task-button', this.completeTaskButtonHandler);
        this.$container.on('click', '.js-delete-task-button', this.deleteTaskButtonHandler);

        return this;
    },

    addTaskButton: function () {
        this.addTaskEvent.notify({
            task: this.$taskTextBox.val()
        });
    },

    completeTaskButton: function () {
        this.completeTaskEvent.notify();
    },

    deleteTaskButton: function () {
        this.deleteTaskEvent.notify();
    },

    selectOrUnselectTask: function (event) {

        var taskIndex = $(event.target).attr("data-index");

        if ($(event.target).attr('data-task-selected') == 'false') {
            $(event.target).attr('data-task-selected', true);
            this.selectTaskEvent.notify({
                taskIndex: taskIndex
            });
        } else {
            $(event.target).attr('data-task-selected', false);
            this.unselectTaskEvent.notify({
                taskIndex: taskIndex
            });
        }

    },

    show: function (tasks) {
        this.buildList(tasks);
    },

    buildList: function (tasks) {
//        var tasks = this.model.getTasks();
        var html = "";
        var $tasksContainer = this.$tasksContainer;

        $tasksContainer.html('');

//        console.log("tasks: " + tasks.length);
    //  NOTE: not a good idea to iterate arrays using for-in
    //  since sequence is not guaranteed and all enumerable properties will be evaluated
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
        for (var i = 0; i < tasks.length; i++) {
//        for (var task in tasks) {
            html = '';
            if (tasks[i].taskStatus == 'completed') {
//                console.log("task index completed: " + i);
                html += '<div style="color:#0000FF;">';
            } else {
                html += '<div>';
            }

            $tasksContainer.append(html + '<label><input type="checkbox" class="js-task" data-index="' + i + '" data-task-selected="false">' + tasks[i].taskName + '</label></div>');

        }

    },



    /* -------------------- Handlers From TaskModel Event Dispatcher ----------------- */

    clearTaskTextBox: function () {
        this.$taskTextBox.val('');
    },

    addTask: function (sender, tasks) {
//        console.log("view attempting to rebuild list");
        this.show(tasks);
    },

    setTasksAsCompleted: function (sender, tasks) {
        this.show(tasks);
    },

    deleteTasks: function (sender, tasks) {
        this.show(tasks);
    }

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};
