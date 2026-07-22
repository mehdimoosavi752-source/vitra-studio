# راهنمای نصب نسخه Docker + MySQL سایت موسسه علامه سخن

این بسته بر پایه نسخه پایدار Docker/MySQL آماده شده و آخرین تغییرات سایت و پنل روی آن اعمال شده است.

## اجرای سریع

داخل همین پوشه اجرا کنید:

```bash
docker compose up -d --build
```

بعد از اجرا:

```text
http://SERVER-IP:3000
```

برای تست روی سیستم خودتان:

```text
http://localhost:3000
```

## ورود مدیر

ایمیل:

```text
admin@asmdi.ir
```

رمز پیش‌فرض:

```text
Admin1234
```

بعد از اولین ورود، رمز را از پنل تغییر دهید.

## تنظیمات مهم قبل از نصب واقعی

در فایل `docker-compose.yml` این مقادیر را تغییر دهید:

- `MYSQL_PASSWORD`
- `MYSQL_ROOT_PASSWORD`
- `DB_PASSWORD`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`

اگر خواستید رمز مدیر دوباره از روی `ADMIN_PASSWORD` تنظیم شود، موقتا این مقدار را `true` کنید:

```yaml
RESET_ADMIN_PASSWORD: "true"
```

بعد از ورود موفق، دوباره آن را `false` کنید.

## دیتابیس

دیتا داخل volume زیر ذخیره می‌شود:

```text
allameh_mysql_data
```

برای سایت واقعی، از این volume به صورت منظم بکاپ بگیرید.

## تغییرات این نسخه

- حفظ ساختار پایدار نسخه `ALLAMEH-BC7EE68-DOCKER-MYSQL-INSTALL-READY`
- اعمال آخرین نسخه صفحه و پنل
- سازگاری کامل بک‌اند با MySQL
- اصلاح نمایش تاریخ میلادی و شمسی در موبایل
- مرتب‌سازی تاریخ‌ها بر اساس تاریخ و سپس ساعت
- حفظ فایل‌های نصب Docker و راهنمای فارسی

## دستورات مفید

مشاهده وضعیت:

```bash
docker compose ps
```

مشاهده لاگ:

```bash
docker compose logs -f web
```

توقف:

```bash
docker compose down
```

حذف کامل همراه با دیتابیس، فقط در صورت اطمینان:

```bash
docker compose down -v
```
