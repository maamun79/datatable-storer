window.initDatatableStorer = function(table, identifier) {
    let container = $('#datatable-column-switches');
    if (!container.length) return;

    container.empty();

    // 1. Force Visibility Sync (Fixes the "Refresh" issue)
    // We wait a tiny bit to ensure DataTables has finished initial draw
    table.columns().every(function () {
        let column = this;
        let state = table.state.loaded(); // Get the state that was just loaded
        
        if (state && state.columns) {
            let colState = state.columns[column.index()];
            if (colState && colState.visible !== undefined) {
                // Force the visibility from the state
                column.visible(colState.visible, false); 
            }
        }
    });
    table.draw(false); // Redraw without resetting paging

    // 2. Build Switches
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

    // 3. Handle Switch Changes
    $(document).off('change', '.col-toggle').on('change', '.col-toggle', function() {
        let colIdx = $(this).data('column');
        table.column(colIdx).visible($(this).is(':checked'));
        table.state.save();
    });
};