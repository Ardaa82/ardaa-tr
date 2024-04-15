import React from "react";
import { Link } from "react-router-dom";
import User from '../images/user.jpg'

function ToInform() {
    var sürüm = "1.7";
  return (
    <div id="white">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <p>
              <img src={User} alt="user" className="rounded-circle" width="50px" height="50px" />{" "}
              <b>ArdaAstra</b>
            </p>
            
            <p>
              <b>6 Ocak, 2024</b>
            </p>
            <h2>ArdaAstra Bilgilendirme </h2>
            <p>
              Müşterilerimiz ve takipçilerimiz için her zaman en iyisini sunmaya
              odaklanıyoruz. ArdaAstra'nın {sürüm} sürümüyle birlikte
              güncellemelerimizde sağladığımız değerlere ve yeniliklere bir göz
              atalım.
            </p>
            <p>
              Her hafta düzenli olarak güncellenen ArdaAstra, sizlere en son
              teknoloji ve özellikleri sunmayı amaçlıyor. Yapılan her güncelleme,
              kullanıcı deneyimini geliştirmek ve size daha iyi bir platform sunmak
              için gerçekleştiriliyor.
            </p>
            <h2>ArdaAstra'nın {sürüm} sürümünde neler var?</h2>
            <p><b>Performans İyileştirmeleri:</b> Hızlı ve akıcı bir kullanım deneyimi için alt yapı iyileştirmeleri yapıldı.</p>
            <p><b>Güvenlik Güncellemeleri:</b>  Kullanıcı verilerinin güvenliği için önlemler alındı. Her şey sizin güvenliğini için.</p>
            <p>
             <b>  Yeni Özellikler:</b> Siteye gelen çoklu dil desteği özelliği biraz daha geliştirildi. Sitemizde artık herkeze özel profiller
             mevcut. Şu anda Kullıcı adı, telefon numarası, facebook, instagram, hakkımda ve profil değiştirme ve güncelleme özellikleri eklendi.
              Yalnız bu profil sayfalarını sadece kendiniz görebiliyorsunuz ve başka kişiler profilinizi göremiyor.
            </p>
            <p>
              Ayrıca, ArdaAstra'nın sürekli güncel kalması sadece teknik iyileştirmelerle sınırlı değil. Sizden gelen geri bildirimleri de 
              dikkate alıyor ve kullanıcıların isteklerini karşılamak için çaba gösteriyoruz. Bu sayede ArdaAstra, sizin ihtiyaçlarınıza
               daha uygun hale geliyor.
            </p>
            <p>
              Eğer siz de ArdaAstra'nın gelişimine katkıda bulunmak veya önerilerde bulunmak isterseniz, lütfen bizimle paylaşın! Sizlerden 
              gelen geri bildirimler, platformumuzu daha da ileri taşımamıza yardımcı oluyor.
            </p>
            <p>
            ArdaAstra'nın geleceği için heyecanlıyız ve sizlere sunacağımız yeni özelliklerle ilgili olarak sizi bilgilendirmek için
             sabırsızlanıyoruz!
            </p>
            <p>
              <b>TAGS: </b>
              <Link to="#">Ardablog bilgilendirme</Link>,{" "}
              <Link to="#">Yenilikler</Link>
            </p>
            <hr />
            <Link to="/">Geri</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToInform;
