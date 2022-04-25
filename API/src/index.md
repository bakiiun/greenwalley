---
title: Typescript ve ExpressJS
tags: API, Javascript, Typescript
date: 2022-04-19
description: Uygulamayı ayağa kaldırmak ve standart ayarlar

---

Hafif, basit ve kolay bir API tasarlayabilmek için kullanılabilecek en güzel kütüphane ExpressJS'dir. Tabiki bunun yanında bazı yardımcı kütüphaneler kullanılabilir.

#### Yardımcı Kütüphaneler
* morgan: Çalışan uygulamaya atılan istekleri otomatik olarak konsola loglar.
* cors: Cross-Origin Resource Sharing, alan adının dışından gelen isteklere izin verir.
* moment: Tarih ve saat doğrulama, parçalama, değiştirme vb. işlemleri yapabilmeyi basitleştiren popüler kütüphane.
* joi: İstemci tarafından gönderilen verinin uygunluğunu kontrol eder.
* jsonwebtoken: Kimlik kontrolü ve yetkilendirme için kullanılır.
* mysql: MySQL server bağlantısı oluşturmak, verileri okumak, kayıt etmek, düzenlemek, silmek, yeni tablo, sütun veya database oluşturmak ve bu veriler ile ilgili bir kaç matematiksel işlemler yapabilmek için kullanılır.

Javascriptin dinamik bir dil olması geliştiricilere aşırı kolaylık sağlamaktadır. Örneğin Javascript'te bir değişken oluşturduğumuzda bu değişken türüne bakılmaksızın başka bir değer de atayabiliyoruz.

```javascript
  var a= "Merhaba Dünya!";
  console.log(a) // Merhaba Dünya!;
  
  a= 5;
  console.log(a) // 5;
```

 Ancak proje büyüdükçe karmaşıklığın da büyümesi ve bu karmaşıklık ile daha kolay başa çıkabilmek adına Typescript dili kullanılır. Typescript yazılan kodu bizim için Javascript diline derler.
 Yukardaki aynı örneği Typescript dili ile derlediğimizde "ts2322, type" hatası alırız.
 
 ### index.ts
 API ana dosyası. Middleware, router, hata yakalama vb. işlemler genel olarak burda tanımlanır. Ancak code review için bunlar parçalanabilir ve başka bir dosyadan çağırılabilir.
