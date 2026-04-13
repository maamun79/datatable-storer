// packages/smart-dev/datatable-storer/src/resources/js/datatable-storer.js
window.initDatatableStorer = function(table, identifier, saveUrl, csrfToken) {
    
    // 1. Build the switches inside the modal
    let container = $('#datatable-column-switches');
    container.empty();

    table.columns().every(function () {
        let column = this;
        let title = $(column.header()).text().trim();
        let index = column.index();
        
        if (title.toLowerCase() === 'action' || title === '') return;

        let isChecked = column.visible() ? 'checked' : '';
        
        container.append(`
            <div class="form-check form-switch mb-2">
                <input class="form-check-input col-toggle" type="checkbox" data-column="${index}" id="col_${identifier}_${index}" ${isChecked}>
                <label class="form-check-label" for="col_${identifier}_${index}">${title}</label>
            </div>
        `);
    });

    // 2. Handle Toggle
    $(document).off('change', '.col-toggle').on('change', '.col-toggle', function() {
        let colIdx = $(this).data('column');
        table.column(colIdx).visible($(this).is(':checked'));
        table.state.save(); // Triggers the package's stateSaveCallback
    });

    // 3. Handle Reorder
    table.on('column-reorder', function() {
        table.state.save();
    });
};