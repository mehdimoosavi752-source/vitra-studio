# راه‌اندازی ساده روی Render

این بسته مخصوص Render است و از Node.js و PostgreSQL استفاده می‌کند. برای تست و پیش‌نمایش، ساده‌ترین روش همان Blueprint است.

## روش پیشنهادی: Blueprint

1. فایل ZIP را Extract کنید.
2. همه فایل‌ها و پوشه‌های داخل پوشه Extract شده را در ریشه مخزن GitHub آپلود کنید.
3. در Render گزینه `New` و سپس `Blueprint` را بزنید.
4. مخزن GitHub سایت را انتخاب کنید.
5. Render فایل `render.yaml` را می‌خواند و خودش Web Service و PostgreSQL Database را می‌سازد.
6. هنگام ساخت، برای `ADMIN_PASSWORD` رمز مدیر را وارد کنید. برای ریست رمز فعلاً می‌توانید `Admin1234` بگذارید.
7. بعد از Live شدن سایت، وارد پنل شوید.

## ورود مدیر

```text
ایمیل: admin@asmdi.ir
رمز: مقداری که در ADMIN_PASSWORD گذاشتید
```

در این بسته مقدار `RESET_ADMIN_PASSWORD=true` است تا رمز مدیر روی مقدار جدید اعمال شود. بعد از ورود موفق، در Render مقدار آن را `false` کنید و سرویس را Restart کنید.

## مسیر تست سلامت

بعد از Live شدن:

```text
/api/health
```

خروجی درست:

```json
{"ok":true,"database":"postgresql"}
```

## پیامک ملی‌پیامک

اگر خواستید پیامک فعال شود، در Render داخل Environment Variables مقدارها را وارد کنید:

```env
SMS_ENABLED=true
SMS_PROVIDER=melipayamak
SMS_USERNAME=نام کاربری ملی پیامک
SMS_API_KEY=رمز یا API Key
SMS_SENDER=شماره فرستنده
SMS_ADMIN_NUMBERS=شماره‌های مدیر
SMS_MELIPAYAMAK_URL=https://rest.payamak-panel.com/api/SendSMS/SendSMS
```

کلید پیامک را داخل GitHub قرار ندهید.
