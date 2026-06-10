/* ============================================================
   SCALENTY — lightweight EN/TR i18n
   Walks text nodes + placeholders and swaps EN→TR using DICT.
   Persists choice in localStorage; a MutationObserver keeps
   dynamically-rendered content (FAQ, results, pricing) translated.
   Strings not in DICT gracefully stay in English.
   ============================================================ */
(function(){
  const DICT = {
    // ---- nav / footer ----
    "Home":"Ana Sayfa","Amazon":"Amazon","Etsy":"Etsy","Pricing":"Fiyatlar",
    "About":"Hakkımızda","FAQ":"SSS","Book a Call":"Randevu Al",
    "Quick Links":"Hızlı Bağlantılar","Services":"Hizmetler","Contact":"İletişim",
    "Amazon Services":"Amazon Hizmetleri","Etsy Services":"Etsy Hizmetleri",
    "Contact Us":"Bize Ulaşın","Privacy Policy":"Gizlilik Politikası","Terms of Service":"Hizmet Şartları",
    "Honest e-commerce consulting for Amazon & Etsy sellers.":"Amazon ve Etsy satıcıları için dürüst e-ticaret danışmanlığı.",
    "© 2026 Scalenty. All rights reserved.":"© 2026 Scalenty. Tüm hakları saklıdır.",
    "Honest Amazon & Etsy consulting":"Dürüst Amazon & Etsy danışmanlığı",

    // ---- buttons / common ----
    "Book Free Consultation":"Ücretsiz Görüşme Ayarlayın","View Pricing":"Fiyatları Görün",
    "Get Started":"Başlayın","View Full Pricing":"Tüm Fiyatları Görün","Get Bundle Quote":"Paket Teklifi Alın",
    "Read the FAQ":"SSS'yi Okuyun","Contact Us":"Bize Ulaşın","Send Message":"Mesaj Gönder",

    // ---- HOME hero ----
    "Amazon & Etsy Consulting":"Amazon & Etsy Danışmanlığı",
    "Grow what you":"Kurduğunuz işi",
    "built, with":"dürüstlükle",
    "honesty":"büyütün",
    "Results-driven consulting for Amazon & Etsy sellers. Real growth, not empty promises — with pricing you can actually see.":
      "Amazon ve Etsy satıcıları için sonuç odaklı danışmanlık. Boş vaatler değil gerçek büyüme — ve görebileceğiniz şeffaf fiyatlar.",
    "Years experience":"Yıl deneyim","Sellers helped":"Satıcıya destek","Revenue generated":"Oluşturulan gelir",
    "Total sales · 2025":"Toplam satış · 2025","Ad ROAS":"Reklam ROAS","Conversion rate":"Dönüşüm oranı",
    "30 days":"30 gün","to first results":"ilk sonuçlara",

    // ---- marquee ----
    "Account Setup":"Hesap Kurulumu","Listing Optimization":"Liste Optimizasyonu","PPC Advertising":"PPC Reklamcılığı",
    "Etsy SEO":"Etsy SEO","Brand Stores":"Marka Mağazaları","Account Health":"Hesap Sağlığı","Growth Strategy":"Büyüme Stratejisi",

    // ---- services (home) ----
    "What we do":"Ne yapıyoruz",
    "Specialists in the two platforms that matter.":"Önemli olan iki platformun uzmanları.",
    "Hands-on support across both ecosystems — from first setup to advertising, SEO, and sustained growth.":
      "İlk kurulumdan reklamcılığa, SEO'ya ve sürdürülebilir büyümeye kadar her iki ekosistemde uygulamalı destek.",
    "From account setup to advertising and store optimization — built around profit, not just clicks.":
      "Hesap kurulumundan reklamcılığa ve mağaza optimizasyonuna — sadece tıklama değil, kâr odaklı.",
    "SEO, listings, and marketing strategy that help handmade shops get found and grow sustainably.":
      "El yapımı mağazaların bulunmasına ve sürdürülebilir büyümesine yardımcı olan SEO, liste ve pazarlama stratejisi.",
    "Account setup":"Hesap kurulumu","Listing optimization":"Liste optimizasyonu","PPC management":"PPC yönetimi",
    "Performance reports":"Performans raporları","Shop setup":"Mağaza kurulumu","SEO & search":"SEO ve arama",
    "Marketing strategy":"Pazarlama stratejisi",
    "Explore Amazon Services":"Amazon Hizmetlerini Keşfedin","Explore Etsy Services":"Etsy Hizmetlerini Keşfedin",

    // ---- results ----
    "Proof, not promises":"Vaat değil, kanıt","Real results from real clients":"Gerçek müşterilerden gerçek sonuçlar",
    "Amazon · full year":"Amazon · tüm yıl","Etsy · 5 years":"Etsy · 5 yıl","Etsy · full year":"Etsy · tüm yıl","New Etsy shop":"Yeni Etsy mağazası",
    "2025 Annual Results":"2025 Yıllık Sonuçlar","2020–2025 Growth":"2020–2025 Büyüme","May–Dec 2025":"May–Ara 2025",
    "A stalled catalog, scaled to seven figures.":"Durağan bir katalog, yedi haneli rakamlara ölçeklendi.",
    "Listing overhaul, A+ Content, and profit-first PPC turned a plateaued account into a full-year growth story.":
      "Liste yenileme, A+ İçerik ve kâr öncelikli PPC, durağan bir hesabı tüm yıl süren bir büyüme hikâyesine dönüştürdü.",
    "Five years of compounding growth.":"Beş yıllık birikimli büyüme.",
    "Steady SEO, seasonal planning, and listing refreshes compounded into year-over-year gains since 2020.":
      "İstikrarlı SEO, sezonsal planlama ve liste yenilemeleri 2020'den beri yıldan yıla kazanca dönüştü.",
    "A strong year, made stronger.":"Güçlü bir yıl, daha da güçlendi.",
    "Tag research and conversion-focused listings lifted an already-healthy shop to its best year yet.":
      "Etiket araştırması ve dönüşüm odaklı listeler, zaten sağlıklı bir mağazayı en iyi yılına taşıdı.",
    "From zero to traction in eight months.":"Sekiz ayda sıfırdan ivmeye.",
    "A brand-new shop, set up right and marketed deliberately — rapid, sustainable growth since launch.":
      "Doğru kurulan ve özenle pazarlanan yepyeni bir mağaza — lansmandan beri hızlı, sürdürülebilir büyüme.",
    "Revenue":"Gelir","Conv. rate":"Dönüşüm","vs. 2020":"2020'ye göre","Consistent":"İstikrarlı","Avg/yr":"Yıllık ort.",
    "Visibility":"Görünürlük","Rating":"Puan","In 8 mo":"8 ayda","Orders":"Sipariş","Since launch":"Lansmandan beri",

    // ---- process ----
    "How it works":"Nasıl çalışır","Three steps to growth":"Büyümeye üç adım",
    "Book a consultation":"Görüşme ayarlayın",
    "A free discovery call to understand your goals, your catalog, and where you're stuck.":
      "Hedeflerinizi, kataloğunuzu ve nerede takıldığınızı anlamak için ücretsiz bir tanışma görüşmesi.",
    "Get a custom strategy":"Özel strateji alın",
    "A tailored, no-fluff action plan built specifically for your Amazon or Etsy business.":
      "Amazon veya Etsy işiniz için özel olarak hazırlanmış, lafı dolandırmayan bir eylem planı.",
    "Implement & grow":"Uygulayın ve büyüyün",
    "We execute alongside you and report on what's actually moving the numbers.":
      "Sizinle birlikte uygular ve rakamları gerçekten neyin hareket ettirdiğini raporlarız.",

    // ---- pricing ----
    "Transparent pricing":"Şeffaf fiyatlandırma","No hidden costs. No surprises.":"Gizli maliyet yok. Sürpriz yok.",
    "Honest, results-focused pricing. Pick the package that fits — change it anytime.":
      "Dürüst, sonuç odaklı fiyatlandırma. Size uyan paketi seçin — istediğiniz zaman değiştirin.",
    "Bundle & save 15%":"Paket alın, %15 tasarruf","Run both Amazon + Etsy with us and save on your monthly package.":
      "Amazon + Etsy'yi birlikte bizimle yürütün ve aylık paketinizde tasarruf edin.",
    "Starting at · cancel anytime":"Başlangıç · istediğiniz zaman iptal","/mo":"/ay",
    "Simple, transparent pricing.":"Basit, şeffaf fiyatlandırma.",
    "Simple,":"Basit,","transparent":"şeffaf","pricing.":"fiyatlandırma.",
    "No hidden fees. No surprise charges. Choose the package that fits your business needs and budget.":
      "Gizli ücret yok. Sürpriz masraf yok. İşinizin ihtiyaçlarına ve bütçenize uyan paketi seçin.",
    "Starter":"Başlangıç","Growth":"Büyüme","Premium":"Premium","Most Popular":"En Popüler",
    "Perfect for new Amazon sellers getting started":"Yeni başlayan Amazon satıcıları için ideal",
    "Ideal for growing sellers ready to scale":"Ölçeklenmeye hazır, büyüyen satıcılar için ideal",
    "Complete solution for serious sellers":"Ciddi satıcılar için eksiksiz çözüm",
    "Perfect for new Etsy sellers getting started":"Yeni başlayan Etsy satıcıları için ideal",
    "Ideal for growing shops ready to scale":"Ölçeklenmeye hazır, büyüyen mağazalar için ideal",
    "Everything in Starter":"Başlangıç'taki her şey","Everything in Growth":"Büyüme'deki her şey",
    "Good to know":"Bilmekte fayda var","Pricing questions, answered":"Fiyatlandırma sorularının yanıtları",
    "Not sure which fits?":"Hangisinin uygun olduğundan emin değil misiniz?",
    "Book a free consultation and we'll help you find the perfect package for your goals — no pressure, no obligation.":
      "Ücretsiz bir görüşme ayarlayın, hedeflerinize en uygun paketi bulmanıza yardımcı olalım — baskı yok, yükümlülük yok.",

    // ---- CTA blocks ----
    "Let's grow your business.":"İşinizi birlikte büyütelim.",
    "Book a free consultation — no pressure, no obligation. Just an honest conversation about what's possible.":
      "Ücretsiz bir görüşme ayarlayın — baskı yok, yükümlülük yok. Sadece neyin mümkün olduğuna dair dürüst bir sohbet.",
    "Ready to grow on Amazon?":"Amazon'da büyümeye hazır mısınız?",
    "Ready to grow your Etsy shop?":"Etsy mağazanızı büyütmeye hazır mısınız?",
    "Schedule a free consultation to discuss how we can help you achieve your Amazon selling goals.":
      "Amazon satış hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi konuşmak için ücretsiz bir görüşme ayarlayın.",
    "Schedule a free consultation to discuss how we can help you achieve your Etsy selling goals.":
      "Etsy satış hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi konuşmak için ücretsiz bir görüşme ayarlayın.",
    "Still have questions?":"Hâlâ sorularınız mı var?",
    "We're here to help. Reach out and we'll get back to you promptly.":
      "Yardıma hazırız. Bize ulaşın, en kısa sürede size dönüş yapalım.",

    // ---- Amazon page ----
    "Make Amazon your":"Amazon'u","growth engine":"büyüme motorunuz", "yapın":"yapın",
    "Expert consulting and management to help your Amazon business thrive — from account setup to advertising optimization, we've got you covered.":
      "Amazon işinizin gelişmesine yardımcı olan uzman danışmanlık ve yönetim — hesap kurulumundan reklam optimizasyonuna kadar her şey bizden.",
    "View Amazon Pricing":"Amazon Fiyatlarını Görün","View Etsy Pricing":"Etsy Fiyatlarını Görün",
    "Our Amazon services":"Amazon hizmetlerimiz","Our Etsy services":"Etsy hizmetlerimiz",
    "Comprehensive solutions for every stage":"Her aşama için kapsamlı çözümler",
    "Whether you're just starting out or scaling fast, we cover every aspect of your Amazon selling journey.":
      "İster yeni başlıyor olun ister hızla büyüyün, Amazon satış yolculuğunuzun her yönünü ele alıyoruz.",
    "Whether you're launching a new shop or scaling an established one, we cover every aspect of your Etsy selling journey.":
      "İster yeni bir mağaza açın ister mevcut birini büyütün, Etsy satış yolculuğunuzun her yönünü ele alıyoruz.",
    "Account Opening & Setup":"Hesap Açma ve Kurulum",
    "Get your Amazon seller account configured correctly from day one — verification, settings, and tax setup so you can start with confidence.":
      "Amazon satıcı hesabınızı ilk günden doğru yapılandırın — doğrulama, ayarlar ve vergi kurulumu ile güvenle başlayın.",
    "Account verification assistance":"Hesap doğrulama desteği","Initial settings configuration":"Başlangıç ayarları yapılandırması",
    "Tax and business info setup":"Vergi ve işletme bilgisi kurulumu","Brand Registry guidance":"Marka Tescili rehberliği",
    "Product Listing Optimization":"Ürün Listesi Optimizasyonu",
    "Maximize visibility and conversions with expertly crafted listings — titles, bullets, descriptions, and backend keywords tuned for ranking.":
      "Uzmanca hazırlanmış listelerle görünürlüğü ve dönüşümü en üst düzeye çıkarın — sıralama için ayarlanmış başlıklar, maddeler, açıklamalar ve arka uç anahtar kelimeler.",
    "Keyword research and strategy":"Anahtar kelime araştırması ve stratejisi","Title and bullet point optimization":"Başlık ve madde optimizasyonu",
    "A+ Content creation":"A+ İçerik oluşturma","Backend search term optimization":"Arka uç arama terimi optimizasyonu",
    "Amazon Advertising (PPC)":"Amazon Reklamcılığı (PPC)",
    "Drive targeted traffic and increase sales with data-driven campaigns — Sponsored Products, Brands, and Display ads for maximum ROI.":
      "Veri odaklı kampanyalarla hedefli trafik çekin ve satışları artırın — maksimum ROI için Sponsorlu Ürünler, Markalar ve Görüntülü reklamlar.",
    "Campaign strategy and setup":"Kampanya stratejisi ve kurulumu","Sponsored Products management":"Sponsorlu Ürünler yönetimi",
    "Sponsored Brands optimization":"Sponsorlu Markalar optimizasyonu","Performance reporting & optimization":"Performans raporlama ve optimizasyon",
    "Store Optimization":"Mağaza Optimizasyonu",
    "Create a compelling brand presence with a professionally designed Amazon Brand Store that showcases your full product line.":
      "Tüm ürün yelpazenizi sergileyen, profesyonelce tasarlanmış bir Amazon Marka Mağazası ile etkileyici bir marka varlığı oluşturun.",
    "Brand Store design and setup":"Marka Mağazası tasarımı ve kurulumu","Custom page layouts":"Özel sayfa düzenleri",
    "Product showcasing strategy":"Ürün sergileme stratejisi","Traffic and conversion optimization":"Trafik ve dönüşüm optimizasyonu",
    "Troubleshooting & Account Health":"Sorun Giderme ve Hesap Sağlığı",
    "Navigate complex Amazon issues with expert guidance — resolve suspensions, listing suppressions, and maintain healthy performance metrics.":
      "Karmaşık Amazon sorunlarını uzman rehberliğiyle çözün — askıya almaları ve liste engellemelerini giderin, sağlıklı performans metriklerini koruyun.",
    "Account reinstatement support":"Hesap yeniden etkinleştirme desteği","Listing suppression resolution":"Liste engelleme çözümü",
    "Policy violation appeals":"Politika ihlali itirazları","Account health monitoring":"Hesap sağlığı izleme",

    // ---- Etsy page ----
    "Help your Etsy shop":"Etsy mağazanızın","get found":"bulunmasını sağlayın",
    "Expert consulting and management to help your Etsy shop thrive — from shop setup to growth strategies, we've got you covered.":
      "Etsy mağazanızın gelişmesine yardımcı olan uzman danışmanlık ve yönetim — mağaza kurulumundan büyüme stratejilerine kadar her şey bizden.",
    "Shop Setup & Configuration":"Mağaza Kurulumu ve Yapılandırma",
    "Launch your Etsy shop the right way — branding, policies, and listing best practices that set you up for sustainable growth.":
      "Etsy mağazanızı doğru şekilde açın — sürdürülebilir büyüme için marka, politikalar ve liste en iyi uygulamaları.",
    "Shop branding & banner setup":"Mağaza markalama ve afiş kurulumu","Policy & about-section creation":"Politika ve hakkında bölümü oluşturma",
    "Section & category structure":"Bölüm ve kategori yapısı","Listing best-practice guidance":"Liste en iyi uygulama rehberliği",
    "SEO & Search Optimization":"SEO ve Arama Optimizasyonu",
    "Get found by the right buyers. We optimize your shop and listings for Etsy's search algorithm to improve visibility and traffic.":
      "Doğru alıcılar tarafından bulunun. Görünürlüğü ve trafiği artırmak için mağazanızı ve listelerinizi Etsy'nin arama algoritmasına göre optimize ederiz.",
    "Title optimization":"Başlık optimizasyonu","Tag research":"Etiket araştırması","Category selection":"Kategori seçimi","Attribute usage":"Özellik kullanımı",
    "Listing Optimization":"Liste Optimizasyonu",
    "Turn browsers into buyers with listings that convert — compelling copy, strong photography guidance, and pricing strategy.":
      "Dönüşüm sağlayan listelerle ziyaretçileri alıcıya dönüştürün — etkileyici metin, güçlü fotoğraf rehberliği ve fiyatlandırma stratejisi.",
    "Conversion-focused descriptions":"Dönüşüm odaklı açıklamalar","Photography guidance":"Fotoğraf rehberliği",
    "Pricing strategy":"Fiyatlandırma stratejisi","Variation & inventory structure":"Varyasyon ve stok yapısı",
    "Marketing & Growth Strategy":"Pazarlama ve Büyüme Stratejisi",
    "Build momentum beyond search — social strategy, promotions, and repeat-customer tactics tailored to your shop's goals.":
      "Aramanın ötesinde ivme kazanın — mağazanızın hedeflerine göre sosyal strateji, promosyonlar ve sadık müşteri taktikleri.",
    "Marketing strategy development":"Pazarlama stratejisi geliştirme","Social media strategy":"Sosyal medya stratejisi",
    "Promotions & sales planning":"Promosyon ve satış planlaması","Competitor analysis":"Rakip analizi",

    // ---- About ----
    "About Us":"Hakkımızda","Marketplace experts who keep it":"Dürüstlükten ödün vermeyen",
    "honest":"pazaryeri uzmanları",
    "We're dedicated to helping Amazon and Etsy sellers grow their businesses with honest, results-driven strategies.":
      "Amazon ve Etsy satıcılarının işlerini dürüst, sonuç odaklı stratejilerle büyütmelerine yardımcı olmaya kendimizi adadık.",
    "Our Mission":"Misyonumuz",
    "No hype, no empty promises — just real strategies that work.":"Abartı yok, boş vaat yok — yalnızca işe yarayan gerçek stratejiler.",
    "We're dedicated to helping Amazon and Etsy sellers succeed through honest, results-driven consulting. We believe every seller deserves access to expert guidance that delivers measurable results.":
      "Amazon ve Etsy satıcılarının dürüst, sonuç odaklı danışmanlıkla başarıya ulaşmasına kendimizi adadık. Her satıcının ölçülebilir sonuçlar sunan uzman rehberliğe erişmeyi hak ettiğine inanıyoruz.",
    "Revenue generated for clients":"Müşteriler için oluşturulan gelir","Growing":"Büyüyor",
    "Clients":"Müşteri","Years":"Yıl","Platforms":"Platform",
    "Our Approach":"Yaklaşımımız","A different kind of consulting.":"Farklı bir danışmanlık anlayışı.",
    "One built on transparency, data-driven decisions, and genuine partnership with our clients.":
      "Şeffaflık, veriye dayalı kararlar ve müşterilerimizle gerçek bir ortaklık üzerine kurulu.",
    "Honest assessments of your current situation":"Mevcut durumunuzun dürüst değerlendirmesi",
    "Data-driven strategies tailored to your goals":"Hedeflerinize göre uyarlanmış veri odaklı stratejiler",
    "Transparent pricing with no hidden fees":"Gizli ücret içermeyen şeffaf fiyatlandırma",
    "Real results you can measure and track":"Ölçebileceğiniz ve takip edebileceğiniz gerçek sonuçlar",
    "Years Experience":"Yıl Deneyim","Clients Helped":"Desteklenen Müşteri","Revenue Generated":"Oluşturulan Gelir",
    "Meet the founders":"Kurucularla tanışın","The people behind Scalenty":"Scalenty'nin arkasındaki insanlar",
    "Co-Founder":"Kurucu Ortak",
    "With extensive experience helping sellers on Amazon and Etsy, Mehmet has seen what works and what doesn't. His mission is to share that knowledge and help you grow your business.":
      "Amazon ve Etsy'de satıcılara yardım etme konusunda geniş deneyime sahip olan Mehmet, neyin işe yarayıp yaramadığını gördü. Misyonu bu bilgiyi paylaşmak ve işinizi büyütmenize yardımcı olmaktır.",
    "Halil brings deep marketplace expertise to help Amazon and Etsy sellers succeed. He's passionate about delivering results-driven strategies that make a real difference.":
      "Halil, Amazon ve Etsy satıcılarının başarıya ulaşması için derin pazaryeri uzmanlığı sunar. Gerçek fark yaratan sonuç odaklı stratejiler sunmaya tutkuyla bağlıdır.",
    "Team / workspace photo":"Ekip / çalışma alanı fotoğrafı",

    // ---- FAQ ----
    "Frequently asked":"Sıkça sorulan","questions":"sorular",
    "Find answers to common questions about our services, pricing, and how we work with clients.":
      "Hizmetlerimiz, fiyatlandırmamız ve müşterilerle nasıl çalıştığımız hakkında sık sorulan soruların yanıtlarını bulun.",
    "All":"Tümü","General":"Genel",
    "What platforms do you support?":"Hangi platformları destekliyorsunuz?",
    "We specialize in Amazon and Etsy marketplace consulting. Whether you're selling on one platform or both, we can help optimize your presence and grow your sales.":
      "Amazon ve Etsy pazaryeri danışmanlığında uzmanız. İster tek platformda ister her ikisinde satış yapın, varlığınızı optimize etmenize ve satışlarınızı büyütmenize yardımcı olabiliriz.",
    "How does the consultation process work?":"Danışmanlık süreci nasıl işliyor?",
    "We start with a free discovery call to understand your business and goals. From there, we create a custom strategy tailored to your specific needs and provide ongoing support throughout implementation.":
      "İşinizi ve hedeflerinizi anlamak için ücretsiz bir tanışma görüşmesiyle başlarız. Ardından özel ihtiyaçlarınıza göre bir strateji oluşturur ve uygulama boyunca sürekli destek sağlarız.",
    "How long before I see results?":"Sonuçları ne kadar sürede görürüm?",
    "Results vary depending on your starting point and goals, but most clients see measurable improvements within 30–60 days. We focus on sustainable growth, not quick fixes.":
      "Sonuçlar başlangıç noktanıza ve hedeflerinize göre değişir, ancak çoğu müşteri 30–60 gün içinde ölçülebilir iyileşmeler görür. Hızlı çözümlere değil, sürdürülebilir büyümeye odaklanırız.",
    "Can you help with Amazon PPC advertising?":"Amazon PPC reklamcılığında yardımcı olabilir misiniz?",
    "Yes! Our Amazon advertising services include campaign setup, keyword research, bid optimization, and ongoing performance monitoring to maximize your ROI.":
      "Evet! Amazon reklam hizmetlerimiz, ROI'nizi en üst düzeye çıkarmak için kampanya kurulumu, anahtar kelime araştırması, teklif optimizasyonu ve sürekli performans takibini içerir.",
    "Do you help with Amazon account suspensions?":"Amazon hesap askıya almalarında yardımcı oluyor musunuz?",
    "Absolutely. We have experience helping sellers navigate account health issues, including suspension appeals and compliance guidance to prevent future problems.":
      "Kesinlikle. Askıya alma itirazları ve gelecekteki sorunları önlemek için uyumluluk rehberliği dahil, satıcıların hesap sağlığı sorunlarını aşmasına yardımcı olma deneyimimiz var.",
    "How can you improve my Etsy SEO?":"Etsy SEO'mu nasıl iyileştirebilirsiniz?",
    "We optimize your shop and listings for Etsy's search algorithm, including title optimization, tag research, category selection, and attribute usage to improve visibility.":
      "Görünürlüğü artırmak için mağazanızı ve listelerinizi Etsy'nin arama algoritmasına göre optimize ederiz; başlık optimizasyonu, etiket araştırması, kategori seçimi ve özellik kullanımı dahil.",
    "Do you offer Etsy shop setup assistance?":"Etsy mağaza kurulumu desteği sunuyor musunuz?",
    "Yes, we help new sellers set up their Etsy shops properly from the start, including shop branding, policy creation, and listing optimization best practices.":
      "Evet, yeni satıcıların Etsy mağazalarını baştan doğru kurmalarına yardımcı oluyoruz; mağaza markalama, politika oluşturma ve liste optimizasyonu en iyi uygulamaları dahil.",
    "Are there any hidden fees?":"Gizli ücret var mı?",
    "No hidden fees, ever. We believe in transparent pricing. What you see on our pricing page is what you pay. We'll always discuss any costs upfront before starting work.":
      "Asla gizli ücret yok. Şeffaf fiyatlandırmaya inanıyoruz. Fiyat sayfamızda gördüğünüz, ödeyeceğiniz tutardır. Çalışmaya başlamadan önce tüm maliyetleri her zaman önceden konuşuruz.",
    "Do you offer refunds or guarantees?":"İade veya garanti sunuyor musunuz?",
    "We stand behind our work. While marketplace success depends on many factors, we offer a satisfaction guarantee on our consulting services. If you're not happy with our recommendations, we'll work with you to make it right.":
      "İşimizin arkasındayız. Pazaryeri başarısı birçok faktöre bağlı olsa da, danışmanlık hizmetlerimizde memnuniyet garantisi sunuyoruz. Önerilerimizden memnun kalmazsanız, durumu düzeltmek için sizinle çalışırız.",
    "Is there a discount for using both Amazon and Etsy services?":"Hem Amazon hem Etsy hizmetlerini kullanmak için indirim var mı?",
    "Yes! We offer a bundle discount for clients who use our services for both platforms. Check our pricing page for details on our multi-platform packages.":
      "Evet! Her iki platform için de hizmetlerimizi kullanan müşterilere paket indirimi sunuyoruz. Çok platformlu paketlerimizin ayrıntıları için fiyat sayfamıza bakın.",
    "Is there a discount for using both platforms?":"Her iki platformu kullanmak için indirim var mı?",
    "Yes! We offer a 15% bundle discount for clients who use our services for both Amazon and Etsy. Reach out for a custom multi-platform quote.":
      "Evet! Hem Amazon hem Etsy için hizmetlerimizi kullanan müşterilere %15 paket indirimi sunuyoruz. Özel çok platformlu teklif için bize ulaşın.",
    "Can I change or cancel my plan?":"Planımı değiştirebilir veya iptal edebilir miyim?",
    "Absolutely. Plans are month-to-month and you can upgrade, downgrade, or cancel at any time. We'll always be transparent about what changes mean for your account.":
      "Kesinlikle. Planlar aylıktır; istediğiniz zaman yükseltebilir, düşürebilir veya iptal edebilirsiniz. Değişikliklerin hesabınız için ne anlama geldiği konusunda her zaman şeffaf oluruz.",

    // ---- Contact ----
    "Let's talk about your":"Büyümenizi","growth":"konuşalım",
    "Book a free consultation or send us a message — we'll get back to you promptly. No pressure, no obligation.":
      "Ücretsiz bir görüşme ayarlayın ya da bize mesaj gönderin — en kısa sürede dönüş yaparız. Baskı yok, yükümlülük yok.",
    "Send us a message":"Bize mesaj gönderin","Tell us about your business and we'll be in touch.":"İşinizden bahsedin, sizinle iletişime geçelim.",
    "Name":"İsim","Your name":"Adınız","Email":"E-posta","Platform":"Platform","Select a platform":"Bir platform seçin",
    "Both":"Her ikisi","Message":"Mesaj","How can we help you?":"Size nasıl yardımcı olabiliriz?",
    "Prefer to book a call?":"Görüşme ayarlamayı mı tercih edersiniz?",
    "Grab a free 30-minute discovery call at a time that works for you. We'll discuss your goals and how we can help.":
      "Size uygun bir zamanda ücretsiz 30 dakikalık tanışma görüşmesi ayarlayın. Hedeflerinizi ve nasıl yardımcı olabileceğimizi konuşuruz.",
    "Phone":"Telefon","Available on request after your first call":"İlk görüşmenizden sonra talep üzerine",
    "Working remotely":"Uzaktan çalışıyoruz","We work with sellers worldwide, across time zones.":"Dünya genelinde, farklı zaman dilimlerindeki satıcılarla çalışıyoruz.",
    "Response time":"Yanıt süresi","We typically reply within one business day.":"Genellikle bir iş günü içinde yanıt veririz.",

    // ---- Legal (headers + intros) ----
    "Legal":"Yasal","Privacy":"Gizlilik","Policy":"Politikası","Terms of":"Hizmet","Service":"Şartları",
    "How we collect, use, and protect your information when you work with Scalenty.":
      "Scalenty ile çalışırken bilgilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz.",
    "The terms that apply when you use our website and engage our consulting services.":
      "Web sitemizi kullanırken ve danışmanlık hizmetlerimizden yararlanırken geçerli olan şartlar."
  };

  const LS_KEY = "scalenty-lang";
  const originals = new WeakMap();      // textNode -> original EN string
  const phOriginals = new WeakMap();    // input/textarea -> original placeholder
  let lang = "en";

  function shouldSkip(node){
    const p = node.parentNode;
    if(!p) return true;
    const tag = p.nodeName;
    if(tag==="SCRIPT"||tag==="STYLE"||tag==="NOSCRIPT") return true;
    if(p.closest && p.closest("[data-count]")) return true; // leave animated counters alone
    return false;
  }

  function translateTextNode(node){
    const raw = node.nodeValue;
    if(!raw) return;
    const key = raw.trim();
    if(!key) return;
    if(lang==="tr"){
      if(DICT[key]!==undefined){
        if(!originals.has(node)) originals.set(node, raw);
        node.nodeValue = raw.replace(key, DICT[key]);
      }
    } else {
      if(originals.has(node)){
        node.nodeValue = originals.get(node);
      }
    }
  }

  function walk(root){
    if(shouldSkip2(root)) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n){ return shouldSkip(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
    });
    const nodes=[]; let n; while((n=tw.nextNode())) nodes.push(n);
    nodes.forEach(translateTextNode);
    // placeholders
    const inputs = root.querySelectorAll ? root.querySelectorAll("input[placeholder],textarea[placeholder]") : [];
    inputs.forEach(el=>{
      const cur = el.getAttribute("placeholder");
      if(lang==="tr"){
        const k = cur && cur.trim();
        if(k && DICT[k]!==undefined){ if(!phOriginals.has(el)) phOriginals.set(el,cur); el.setAttribute("placeholder",DICT[k]); }
      } else if(phOriginals.has(el)){
        el.setAttribute("placeholder", phOriginals.get(el));
      }
    });
  }
  function shouldSkip2(el){
    return el && el.nodeType===1 && (el.nodeName==="SCRIPT"||el.nodeName==="STYLE");
  }

  function apply(next){
    lang = next;
    document.documentElement.lang = next;
    walk(document.body);
    // pill: globe + current language code (rebuilt each time = always correct)
    const pill = document.querySelector(".lang");
    if(pill){
      pill.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" style="opacity:.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg><b>'+lang.toUpperCase()+'</b>';
    }
    try{ localStorage.setItem(LS_KEY, lang); }catch(e){}
  }

  // observe dynamically-added content (FAQ, results, pricing toggles)
  let observer;
  function startObserver(){
    observer = new MutationObserver(muts=>{
      if(lang!=="tr") return;
      muts.forEach(m=>{
        m.addedNodes && m.addedNodes.forEach(node=>{
          if(node.nodeType===3) translateTextNode(node);
          else if(node.nodeType===1) walk(node);
        });
      });
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  window.SCALENTY_I18N = {
    init(){
      let saved="en";
      try{ saved = localStorage.getItem(LS_KEY) || "en"; }catch(e){}
      const pill = document.querySelector(".lang");
      if(pill){
        pill.style.cursor="pointer";
        pill.title="Switch language";
        pill.addEventListener("click", ()=> apply(lang==="en" ? "tr" : "en"));
      }
      startObserver();
      apply(saved);
    },
    toggle(){ apply(lang==="en"?"tr":"en"); }
  };
})();
