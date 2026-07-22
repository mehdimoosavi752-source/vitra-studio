# راهنمای نصب داکری سایت موسسه علامه سخن

این بسته برای اجرای سایت و پنل موسسه علامه سخن روی سرور با Docker آماده شده است.

## پیش‌نیاز

روی سرور باید نصب باشد:

- Docker
- Docker Compose

## فایل‌های مهم

- `Dockerfile`: ساخت ایمیج Node.js سایت
- `docker-compose.yml`: اجرای سایت و دیتابیس PostgreSQL
- `.env.example`: نمونه تنظیمات
- `server.js`: بک‌اند سایت
- `index.html`: سایت و پنل
- `assets`: تصاویر و آیکون‌ها
- `sitemap.xml` و `robots.txt`: فایل‌های سئو

## نصب سریع

1. فایل ZIP را روی سرور آپلود کنید.
2. از حالت فشرده خارج کنید.
3. وارد پوشه شوید.
4. فایل تنظیمات را بسازید:

```bash
cp .env.example .env
```

5. فایل `.env` را باز کنید و این موارد را حتما تغییر دهید:

```env
POSTGRES_PASSWORD=یک_رمز_قوی_برای_دیتابیس
DATABASE_URL=postgres://allameh:همان_رمز_دیتابیس@db:5432/allameh_sokhan
ADMIN_PASSWORD=یک_رمز_قوی_برای_مدیر
```

نکته: رمز داخل `POSTGRES_PASSWORD` و رمز داخل `DATABASE_URL` باید یکی باشند.

6. سایت را اجرا کنید:

```bash
docker compose up -d --build
```

7. سایت را باز کنید:

```text
http://SERVER-IP:8080
```

اگر پورت دیگری می‌خواهید، در `.env` مقدار `APP_PORT` را تغییر دهید.

## ورود مدیر

ایمیل مدیر از این مقدار می‌آید:

```env
ADMIN_EMAIL=admin@asmdi.ir
```

رمز اولیه مدیر:

```env
ADMIN_PASSWORD=رمزی که در .env گذاشته‌اید
```

## تغییر رمز مدیر بعد از نصب

اگر خواستید رمز مدیر را از طریق `.env` ریست کنید:

1. مقدار `ADMIN_PASSWORD` را تغییر دهید.
2. مقدار زیر را موقتاً `true` کنید:

```env
RESET_ADMIN_PASSWORD=true
```

3. سرویس را ریستارت کنید:

```bash
docker compose up -d
```

4. بعد از بالا آمدن سایت، دوباره مقدار را `false` کنید:

```env
RESET_ADMIN_PASSWORD=false
```

5. دوباره اجرا کنید:

```bash
docker compose up -d
```

## دستورات کاربردی

مشاهده وضعیت:

```bash
docker compose ps
```

مشاهده لاگ سایت:

```bash
docker compose logs -f app
```

مشاهده لاگ دیتابیس:

```bash
docker compose logs -f db
```

خاموش کردن:

```bash
docker compose down
```

خاموش کردن همراه حذف دیتابیس:

```bash
docker compose down -v
```

هشدار: دستور بالا تمام دیتابیس سایت را پاک می‌کند.

## بکاپ دیتابیس

برای بکاپ:

```bash
docker compose exec db pg_dump -U allameh allameh_sokhan > backup-allameh.sql
```

برای بازگردانی بکاپ:

```bash
cat backup-allameh.sql | docker compose exec -T db psql -U allameh allameh_sokhan
```

اگر نام دیتابیس یا یوزر را در `.env` تغییر داده‌اید، در دستورات بالا هم همان را بگذارید.

## اتصال دامنه و SSL

برای سایت واقعی بهتر است پشت Nginx، Caddy یا پنل هاستینگ با SSL اجرا شود.

اگر دامنه با HTTPS به سایت وصل است، مقدار زیر را نگه دارید:

```env
COOKIE_SECURE=auto
```

اگر فقط برای تست با IP و HTTP اجرا می‌کنید و ورود مشکل داشت:

```env
COOKIE_SECURE=false
```

## بررسی سلامت سایت

بعد از اجرا این آدرس را باز کنید:

```text
http://SERVER-IP:8080/api/health
```

اگر همه چیز درست باشد، خروجی شبیه این می‌بینید:

```json
{"ok":true,"database":"postgresql"}
```

## نکات مهم امنیتی

- رمز دیتابیس و رمز مدیر را ساده نگذارید.
- فایل `.env` را در GitHub آپلود نکنید.
- برای سایت واقعی حتما HTTPS فعال کنید.
- بکاپ دیتابیس را منظم بگیرید.
- بعد از اولین ورود، رمز مدیر را از پنل تغییر دهید.
