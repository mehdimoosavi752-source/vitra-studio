# راهنمای نصب نسخه داکری سایت موسسه علامه سخن

این بسته شامل سایت، پنل کاربری، بک‌اند Node.js و دیتابیس PostgreSQL داخل Docker Compose است.

## فایل‌های مهم

- `index.html`
- `server.js`
- `package.json`
- `Dockerfile`
- `docker-compose.yml`
- `.env`
- `.env.example`

## نصب سریع روی سرور

1. فایل zip را روی سرور آپلود و Extract کنید.
2. وارد پوشه Extract شده شوید.
3. اگر لازم بود مقادیر فایل `.env` را تغییر دهید، مخصوصاً:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `POSTGRES_PASSWORD`
   - `APP_PORT`
4. دستور زیر را اجرا کنید:

```bash
docker compose up -d --build
```

5. سایت روی این آدرس بالا می‌آید:

```text
http://YOUR_SERVER_IP:8080
```

اگر `APP_PORT` را در `.env` تغییر دهید، همان پورت جدید را در مرورگر وارد کنید.

## ورود اولیه مدیر

تا وقتی در `.env` تغییر نداده باشید:

```text
ایمیل: admin@asmdi.ir
رمز: Admin1234
```

بعد از ورود، رمز را از پنل تغییر دهید.

## تغییر رمز مدیر از طریق فایل env

اگر خواستید رمز مدیر را از طریق سرور ریست کنید:

1. در فایل `.env` مقدار `ADMIN_PASSWORD` را عوض کنید.
2. مقدار `RESET_ADMIN_PASSWORD=true` بگذارید.
3. سرویس را ری‌استارت کنید:

```bash
docker compose up -d --build
```

4. بعد از ورود موفق، دوباره مقدار را به این حالت برگردانید:

```text
RESET_ADMIN_PASSWORD=false
```

## دستورهای مفید

مشاهده وضعیت:

```bash
docker compose ps
```

دیدن لاگ‌ها:

```bash
docker compose logs -f app
```

ری‌استارت:

```bash
docker compose restart
```

خاموش کردن:

```bash
docker compose down
```

خاموش کردن همراه با حذف دیتابیس:

```bash
docker compose down -v
```

دستور آخر دیتابیس را حذف می‌کند؛ فقط وقتی استفاده کنید که مطمئن هستید.

## نکته مهم

دیتابیس روی volume داکر ذخیره می‌شود:

```text
allameh_postgres_data
```

برای نسخه واقعی سایت، حتماً از دیتابیس و فایل `.env` بک‌آپ بگیرید.
