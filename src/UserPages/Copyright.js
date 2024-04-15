import React from 'react';

function CopyrightPage() {
    const currentDate = new Date().getFullYear();
  return (
    <div id="white">
      <div className="container p-5">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <p><strong>23 Kasım 2023</strong></p>
            <h3>
              Telif Hakkı &copy; {currentDate} Arda. Tüm hakları saklıdır.
            </h3>
            <p>
              Bu sitedeki tüm içeriklerin telif hakkı Arda'ya aittir. Bu içeriklerin tüm hakları saklıdır. İçeriklerin yazılı izni olmaksızın kopyalanması, yeniden üretilmesi, kullanılması, değiştirilmesi veya dağıtılması kesinlikle yasaktır.
            </p>
            <p>
              Bu sitedeki içeriklerin amacı genel bilgi sağlamaktır. Bu içeriklerin ticari veya kişisel kullanım için izinsiz kullanılması yasaktır. İçeriklerin paylaşılması veya alıntı yapılması durumunda, kaynak belirtilmelidir.
            </p>
            <p>
              Bu sitedeki içerikler, yalnızca bilgi amaçlı olup kesinlikle profesyonel veya yasal tavsiye niteliği taşımaz.
            </p>
            <p>
              İlgili telif hakkı ihlali durumunda yasal işlemler başlatılabilir.
            </p>
            <p>
              Bu telif hakkı bildirisi, blogdaki tüm içerikleri kapsamaktadır ve izinsiz kullanım veya paylaşım durumunda yasal haklar saklı tutulmaktadır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyrightPage;
