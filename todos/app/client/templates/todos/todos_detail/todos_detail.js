Template.TodosDetail.events({
  'submit form#edit-todo': function (e, tmpl) {
    e.preventDefault();

    var subject = tmpl.find('input[name=subject]').value;
    var description = tmpl.find('textarea[name=description]').value;
    var colour = tmpl.find('select[name=colour]').value;
    var id = this._id;

    Todos.update({_id: id}, {
      $set: {
        subject: subject,
        description: description,
        updatedAt: new Date,
        colour: colour
      }
    });

    Router.go('todos.detail', {_id: id});
  }
});

Template.TodosDetail.helpers({
  isMyTodo: function () {
    return this.userId === Meteor.userId();
  },

  user: function () {
    var todo = this;
    return Meteor.users.findOne({_id: todo.userId});
  },

  colourOptions: function () {
    return [
      { label: '- None -', value: ''        },
      { label: 'Grey',     value: 'gray'    },
      { label: 'Red',      value: 'red'     },
      { label: 'Yellow',   value: 'gold'    },
      { label: 'Green',    value: 'green'   },
      { label: 'FF Pink',  value: '#eb008b' }
    ];
  },

  colourIsSelected: function (todo) {
    return todo.colour === this.value ? 'selected' : '';
  }
});
