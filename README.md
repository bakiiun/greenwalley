# Green Walley
Daire ve ofislerin kira durumlarını takip amacı ile oluşturulmuş web sitesi.

### Nasıl Kullanılır 
> Sistemde Docker yazılımının yüklü olduğu varsayılmıştır.
* `API` dosyasının içerisindeki `example.env` dosyasının ismini `.env` olarak değiştirilmeli.
* `docker-compose.yaml`'ın bulunduğu klasörde bir terminal açarak `docker-compose up` komutunu çalıştırmak yeterlidir.

> Yapılan değişikliklerin kaydolması amacı ile MySQL için volume oluşturulmuştur.

* `.env` dosyasında bulunan değişkenlere `docker-compose.yaml` dosyasını düzenleyerek dışardan müdehale edilebilir.
```yaml
api:
    container_name: API
    build: 
     context: ./API
    restart: always
    environment:
      BCRYPT_HASH = 11
      # ...
    ports:
      - 3000:3000
    depends_on:
      - db
```

* Konteynırlar çalışır durumdayken servislere portlar üzerinden erişim sağlanabilir.
