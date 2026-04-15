window.initDatatableStorer = function(table, identifier) {
    let container = $('#datatable-column-switches');
    if (!container.length) return;

    container.empty();

    // Build Switches based on current visibility
    table.columns().every(function () {
        let column = this;
        let title = $(column.header()).text().trim();
        let index = column.index();
        
        if (title.toLowerCase() === 'action' || title === '') return;

        let isChecked = column.visible() ? 'checked' : '';
        
        container.append(`
            <div class="form-check form-switch mb-2">
                <input class="form-check-input col-toggle" type="checkbox" 
                       data-column="${index}" id="col_${identifier}_${index}" ${isChecked}>
                <label class="form-check-label" for="col_${identifier}_${index}">${title}</label>
            </div>
        `);
    });

    // Handle Toggle Switch
    $(document).off('change', '.col-toggle').on('change', '.col-toggle', function() {
        let colIdx = $(this).data('column');
        table.column(colIdx).visible($(this).is(':checked'));
        table.state.save(); // This triggers stateSaveCallback in your Blade
    });

    // Handle Column Reorder event
    table.on('column-reorder', function() {
        table.state.save();
        // Optional: Re-sync switches if indices change
    });
};