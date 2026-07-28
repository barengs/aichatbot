<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Atur Ulang Kata Sandi - TaniCerdas AI</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .header {
            background-color: #0F3B2C;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #4a5568;
        }
        .btn-container {
            text-align: center;
            margin: 30px 0;
        }
        .btn {
            display: inline-block;
            background-color: #0F3B2C;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #154E3A;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
        }
        .link-text {
            word-break: break-all;
            color: #0F3B2C;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TaniCerdas AI Chatbot</h1>
        </div>
        <div class="content">
            <p>Halo,</p>
            <p>Anda menerima email ini karena kami menerima permintaan pengaturan ulang kata sandi untuk akun Anda.</p>
            
            <div class="btn-container">
                <a href="{{ $url }}" class="btn" style="color: #ffffff;">Atur Ulang Kata Sandi</a>
            </div>
            
            <p>Tautan atur ulang kata sandi ini akan kedaluwarsa dalam 60 menit.</p>
            <p>Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.</p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="font-size: 14px;">Jika Anda mengalami kesulitan menekan tombol "Atur Ulang Kata Sandi", salin dan tempel URL di bawah ini ke peramban web Anda:</p>
            <p class="link-text"><a href="{{ $url }}" style="color: #0F3B2C;">{{ $url }}</a></p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} TaniCerdas AI Chatbot. Hak Cipta Dilindungi.
        </div>
    </div>
</body>
</html>
