# اجرای داکری سایت علامه سخن

این نسخه شامل خود سایت، پنل کاربری و سرویس Node است و اطلاعات آن در Volume دائمی Docker روی سرور شما باقی می‌ماند. اطلاعات فعلی فایل `data/store.json` نیز در اولین راه‌اندازی وارد Volume می‌شود.

## راه‌اندازی

1. کل پوشه `outputs` را روی سرور قرار دهید.
2. فایل `.env.example` را با نام `.env` کپی کنید.
3. داخل فایل `.env` یک رمز قوی برای `ADMIN_PASSWORD` تعیین کنید.
4. در همان پوشه اجرا کنید:

```bash
docker compose up -d --build
```

سایت با تنظیم پیش‌فرض از آدرس زیر باز می‌شود:

```text
http://SERVER-IP:8080
```

## دستورات کاربردی

مشاهده وضعیت:

```bash
docker compose ps
```

مشاهده گزارش اجرا:

```bash
docker compose logs -f
```

به‌روزرسانی سایت پس از جایگزینی فایل‌ها:

```bash
docker compose up -d --build
```

خاموش‌کردن سرویس:

```bash
docker compose down
```

دستور `down` اطلاعات کاربران را حذف نمی‌کند، چون داده‌ها در Volume دائمی `allameh_data` ذخیره می‌شوند. از دستور `docker compose down -v` استفاده نکنید، چون گزینه `-v` داده‌های دائمی را حذف می‌کند.

## دامنه و HTTPS

برای اتصال دامنه و فعال‌سازی HTTPS، این کانتینر را پشت reverse proxy فعلی سرور مانند Nginx، Traefik یا Nginx Proxy Manager قرار دهید و مقصد را روی پورت `8080` تنظیم کنید.

## پشتیبان‌گیری

برای گرفتن نسخه پشتیبان از اطلاعات:

```bash
docker compose cp allameh-sokhan:/app/data/store.json ./store-backup.json
```

برای بازگردانی نسخه پشتیبان:

```bash
docker compose cp ./store-backup.json allameh-sokhan:/app/data/store.json
docker compose restart
```
