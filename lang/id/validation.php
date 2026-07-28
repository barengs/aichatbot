<?php

return [
    'required' => ':attribute wajib diisi.',
    'email' => ':attribute harus berupa alamat email yang valid.',
    'unique' => ':attribute sudah digunakan.',
    'min' => [
        'string' => ':attribute minimal harus :min karakter.',
    ],
    'confirmed' => 'Konfirmasi :attribute tidak cocok.',
    
    'custom' => [
        'email' => [
            'unique' => 'Email ini sudah terdaftar.',
        ],
        'password' => [
            'min' => 'Kata sandi minimal 8 karakter.',
        ],
    ],

    'attributes' => [
        'email' => 'Email',
        'password' => 'Kata sandi',
        'name' => 'Nama',
        'token' => 'Token',
    ],
];
