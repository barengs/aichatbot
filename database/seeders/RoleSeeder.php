<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = ['users', 'roles', 'settings', 'analytics'];
        $actions = ['create', 'read', 'update', 'delete'];
        $permissions = [];

        foreach ($menus as $menu) {
            foreach ($actions as $action) {
                $permissions[] = $action . '_' . $menu;
            }
        }

        // Clean up old permissions if needed, or just create new ones
        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'api']);
        }

        $admin = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $admin->syncPermissions($permissions);

    }
}
