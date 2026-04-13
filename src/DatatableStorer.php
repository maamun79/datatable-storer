<?php

namespace SmartDev\DatatableStorer;

use SmartDev\DatatableStorer\Models\TableSetting;

class DatatableStorer
{
    /**
     * Fetch the saved state for a specific table from the database.
     * 
     * @param string $identifier The unique name of the table (e.g., 'assets-table')
     * @return array|null
     */
    public static function get($identifier)
    {
        // Look for the setting in the database
        $setting = TableSetting::where('table_identifier', $identifier)->first();
        
        if ($setting && $setting->settings) {
            $data = $setting->settings;
            
            // DataTables state has a "time" property. 
            // If it's too old, DataTables ignores it.
            // We force the time to "now" so the layout never expires.
            $data['time'] = time() * 1000; 
            
            return $data;
        }

        return null;
    }
}