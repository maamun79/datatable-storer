<?php

namespace SmartDev\DatatableStorer\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use SmartDev\DatatableStorer\Models\TableSetting;

class StateController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'table_identifier' => 'required|string',
            'settings'         => 'required|array',
            'is_global'        => 'boolean'
        ]);

        // Logic: Admin can save global, others save per-user
        // Or logic based on your Project Summary (Admin-led layout)
        $userId = $request->input('is_global') ? null : auth()->id();

        TableSetting::updateOrCreate(
            [
                'table_identifier' => $request->table_identifier,
                'user_id'          => $userId,
            ],
            [
                'settings' => $request->settings,
            ]
        );

        return response()->json(['status' => 'success']);
    }
}