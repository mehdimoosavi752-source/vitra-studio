# راه‌اندازی روی Render با MySQL خارجی

این بسته نسخه Node.js سایت و پنل موسسه علامه سخن است و برای دیتابیس از MySQL استفاده می‌کند. Render به صورت پیش‌فرض دیتابیس MySQL داخلی نمی‌سازد، پس باید یک MySQL خارجی داشته باشید؛ مثل MySQL هاست خودتان، Aiven، Railway یا هر سرویس MySQL دیگر.

## آپلود روی GitHub

1. فایل ZIP را Extract کنید.
2. همه فایل‌ها و پوشه‌های داخل پوشه Extract شده را در ریشه مخزن GitHub آپلود کنید.
3. فایل‌های `index.html`، `server.js`، `package.json` و `render.yaml` باید مستقیم در صفحه اصلی مخزن دیده شوند.
4. فایل `.env` واقعی را در GitHub آپلود نکنید.

## ساخت سرویس در Render

1. در Render گزینه `New` و سپس `Web Service` را بزنید.
2. مخزن GitHub سایت را انتخاب کنید.
3. Runtime را روی `Node` بگذارید.
4. Build Command:

```bash
npm install
```

5. Start Command:

```bash
npm start
```

6. در بخش Environment Variables این مقادیر را وارد کنید:

```env
NODE_ENV=production
PORT=10000
DB_HOST=آدرس هاست MySQL
DB_PORT=3306
DB_NAME=نام دیتابیس
DB_USER=نام کاربری دیتابیس
DB_PASSWORD=رمز دیتابیس
ADMIN_EMAIL=admin@asmdi.ir
ADMIN_PASSWORD=رمز مدیر
ADMIN_NAME=مدیر سایت
RESET_ADMIN_PASSWORD=false
COOKIE_SECURE=true
SESSION_SECRET=یک_رشته_طولانی_تصادفی
```

اگر سرویس MySQL به جای مقادیر جداگانه، Connection String می‌دهد، می‌توانید `DATABASE_URL` را هم وارد کنید؛ ولی برای این نسخه، مقادیر `DB_HOST`، `DB_PORT`، `DB_NAME`، `DB_USER` و `DB_PASSWORD` واضح‌تر و کم‌خطاتر است.

## پیامک ملی‌پیامک

کلید پیامک را داخل GitHub نگذارید. در Environment Variables وارد کنید:

```env
SMS_ENABLED=true
SMS_PROVIDER=melipayamak
SMS_USERNAME=نام کاربری ملی پیامک
SMS_API_KEY=رمز یا API Key
SMS_SENDER=شماره فرستنده
SMS_ADMIN_NUMBERS=شماره‌های مدیر، با کاما یا خط جدید
SMS_MELIPAYAMAK_URL=https://rest.payamak-panel.com/api/SendSMS/SendSMS
```

بعد از ذخیره Environment Variables، سرویس را Redeploy کنید.

## تست سلامت

بعد از Live شدن، این مسیر را باز کنید:

```text
/api/health
```

خروجی درست باید شامل این مقدار باشد:

```json
{"ok":true,"database":"mysql"}
```
