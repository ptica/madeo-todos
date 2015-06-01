// List with handle
Sortable.create(listWithHandle, {
    handle: '.glyphicon-move',
    animation: 150,
    // dragging ended
    onEnd: function (/**Event*/ e) {
        var data = $('#listWithHandle [data-item-id]').map(function (i,v) {
            return {
                    'id': $(v).data('item-id'),
                    'ord': i
            };
        }).toArray();
        var url = App.base + '/items/reorder';
        $.post(url, {data:data});
    }
});

$('.list-group')
.on('click', '.js-remove', function (e) {
    var id = $(e.target).parent().data('item-id');
    var url = App.base + '/items/delete/' + id;
    $.post(url, {id: id}).done(function () {
        $('[data-item-id='+id+']').remove();
    });
})
.on('click', 'input', function (e) {
    var id = $(e.target).parent().data('item-id');
    var url = App.base + '/items/done/' + id;
    $.post(url, {id: id, done: 1}).done(function () {
    });
});
