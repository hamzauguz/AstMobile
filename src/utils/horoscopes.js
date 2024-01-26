const horoscopes = [
  {
    id: 1,
    horoscope: 'Koç',
    date: '21 Mart - 19 Nisan',
    image: 'https://www.iconsdb.com/icons/preview/white/aries-2-xxl.png',
    status: {
      daily:
        'Koç burcu insanları genellikle günlerine enerjik bir başlangıç yaparlar. Günlük enerji seviyeleri yüksektir ve bu enerjiyi doğrudan eyleme dönüştürmeye istekli olabilirler. Koçlar, liderlik özellikleri ile tanınan bir burç olduğu için günlük aktivitelerde belirgin bir kararlılık gösterirler. Cesaretleri ve özgüvenleri yüksek olduğu için, yeni projelere, girişimlere veya zorluklara atılmaktan kaçınmazlar.',
      weekly:
        'Haftalık olarak, Koç burcu genellikle hedeflere odaklanır ve bu hedeflere ulaşmak için enerjisini yönlendirir. Hareketli bir hafta geçirmeyi tercih edebilirler, sosyal ilişkilerde aktif olabilir ve yeni insanlarla tanışmaktan keyif alabilirler. Hafta boyunca kararlılıkla ilerleyerek, planlarını gerçekleştirmek için gereken motivasyona sahip olabilirler.',
      monthly:
        'Aylık olarak, Koç burcu genellikle büyük hedeflere odaklanır ve bu hedeflere ulaşmak için çaba gösterir. İş ve kariyerle ilgili projelerde liderlik yapma eğiliminde olabilirler. İlişkilerde duygusal bir denge sağlama ihtiyacı duyabilirler ve sevdikleriyle daha derin bağlar kurma isteğiyle hareket edebilirler. Aylık planlarını yaparken, genellikle kendilerine meydan okuyan ve kişisel gelişimlerine katkıda bulunan hedeflere odaklanabilirler.',
    },
  },
  {
    id: 2,
    horoscope: 'Boğa',
    date: '20 Nisan - 20 Mayıs',
    image: 'https://www.iconsdb.com/icons/preview/white/taurus-2-xxl.png',
    status: {
      daily:
        'Boğa burcu insanları genellikle günlerine sabırlı ve istikrarlı bir şekilde başlarlar. Günlük yaşantılarında pratik ve gerçekçi bir yaklaşım sergilerler. Fiziksel konfora önem veren Boğalar, günlük rutinlerini düzenli bir şekilde sürdürmeye çalışabilirler. Güvenilirlikleri ve sadakatleri, sosyal ilişkilerinde güçlü bağlar kurmalarına yardımcı olabilir.',
      weekly:
        'Haftalık olarak, Boğa burcu genellikle işlerini düzenleme ve maddi konulara odaklanma eğilimindedir. Bu dönemde finansal hedeflerine yönelik planlar yapabilirler. Sabırlı doğaları, büyük projeleri adım adım ilerletmelerine yardımcı olabilir. Hafta içinde rahatlamak ve keyif almak için zaman ayırmaya da özen gösterebilirler.',
      monthly:
        'Aylık olarak, Boğa burcu genellikle iş ve kariyer hedefleri üzerinde odaklanır. Finansal konuları yönetme ve maddi güvenliklerini artırma çabası içinde olabilirler. İlişkilerinde duygusal bir denge kurma isteğiyle hareket edebilirler. Boğalar genellikle çevrelerine huzur ve güzellik katmaktan keyif alır, bu nedenle estetik ve sanatsal aktivitelerle ilgilenebilirler.',
    },
  },
  {
    id: 3,
    horoscope: 'İkizler',
    date: '21 Mayıs - 20 Haziran',
    image: 'https://www.iconsdb.com/icons/preview/white/gemini-2-xxl.png',
    status: {
      daily:
        'İkizler burcu insanları genellikle hızlı düşünen, esnek ve iletişim becerileri yüksek bireylerdir. Günlük olarak, zihinsel olarak uyarılmaya ihtiyaç duyarlar. Yeni fikirlere ve bilgiye açık olabilirler. İletişimleri canlıdır, bu nedenle günlük aktivitelerde çeşitli insanlarla etkileşime girmekten keyif alabilirler. Ancak, odaklarını korumak konusunda zorlanabilirler.',
      weekly:
        'Haftalık olarak, İkizler burcu genellikle çeşitli konularda ilgi duyar ve bu dönemde farklı aktivitelere yönelebilir. İş veya eğitimle ilgili projelerde esneklik gösterebilirler. Hafta içinde sosyal etkileşimleri artırarak fikir alışverişinde bulunabilirler. Ancak, bazen kararsızlık yaşayabilirler.',
      monthly:
        'Aylık olarak, İkizler burcu genellikle yeni projelere odaklanabilir ve çeşitli konularda derinlemesine düşünebilir. Zihinsel uyarılmaya ihtiyaç duydukları için yeni şeyler keşfetmeye yönelebilirler. İlişkilerinde çeşitlilik arayabilirler. Aylık planlarını yaparken, çeşitli ilgi alanları arasında denge sağlama çabası içinde olabilirler.',
    },
  },
  {
    id: 4,
    horoscope: 'Yengeç',
    date: '21 Haziran - 22 Temmuz',
    image: 'https://www.iconsdb.com/icons/preview/white/cancer-2-xxl.png',
    status: {
      daily:
        'Yengeç burcu insanları genellikle duygusal, duyarlı ve koruyucu özelliklere sahiptir. Günlük olarak, çoğunlukla duygusal ihtiyaçlarını ve çevrelerindeki insanların hislerini düşünmeye eğilimlidirler. Evleri ve aileleri onlar için önemlidir, bu nedenle günlük aktivitelerini bu bağlamda düzenlemeye çalışabilirler. İhtiyaçlarına ve diğer insanların ihtiyaçlarına duyarlılık gösterirler.',
      weekly:
        'Haftalık olarak, Yengeç burcu genellikle ev ve aile ile ilgili konulara odaklanabilir. Hafta içinde, duygusal olarak destekleyici olmaya çalışabilir ve sevdikleriyle zaman geçirmeye özen gösterebilirler. Yengeçler genellikle güvenli ve sıcak bir ortam yaratmaktan keyif alır, bu nedenle ev düzenlemelerine veya aile etkinliklerine odaklanabilirler.',
      monthly:
        'Aylık olarak, Yengeç burcu genellikle duygusal dengelerini gözden geçirir ve kişisel ilişkilerine odaklanabilir. İş ve aile hayatları arasında denge sağlamak için çaba sarf edebilirler. Yengeçler genellikle geçmişe duygusal bağlarını önemser, bu nedenle aylık olarak anıları hatırlama ve geçmişteki deneyimleri değerlendirme eğiliminde olabilirler.',
    },
  },
  {
    id: 5,
    horoscope: 'Aslan',
    date: '23 Temmuz - 22 Ağustos',
    image: 'https://www.iconsdb.com/icons/preview/white/leo-2-xxl.png',
    status: {
      daily:
        'Aslan burcu insanları genellikle gururlu, cömert ve liderlik özelliklerine sahiptir. Günlük olarak, genellikle dikkat çekmeyi ve olumlu bir şekilde fark edilmeyi arzularlar. Enerjileri yüksek olduğu için günlük aktivitelerde başkalarına ilham vermekten ve projelerde liderlik yapmaktan keyif alabilirler. Onlar için önemli olan konuları vurgulamak ve kendi potansiyellerini göstermek, günlük hedeflerini oluştururken önemli olabilir.',
      weekly:
        'Haftalık olarak, Aslan burcu genellikle kendine odaklanabilir ve kişisel hedeflerine odaklanabilir. Yaratıcılıklarını ortaya koymak, sanatsal projelere yönelmek veya sosyal etkileşimleri artırmak isteyebilirler. İş ve kariyerle ilgili olarak, liderlik rollerinde kendilerini daha fazla gösterebilirler. Hafta içinde başkalarını motive etmek ve bir takım içinde liderlik yapmak Aslanlar için tipik olabilir.',
      monthly:
        'Aylık olarak, Aslan burcu genellikle büyük projelere odaklanabilir ve kendi potansiyellerini maksimize etmek için çeşitli alanlarda çaba sarf edebilirler. Sosyal ilişkilerde parlamak ve ilgi odağı olmak, aynı zamanda sevdikleriyle keyifli zamanlar geçirmek isteyebilirler. Kariyer hedeflerini gözden geçirme ve belki de yeni girişimlere yönelme eğiliminde olabilirler.',
    },
  },
  {
    id: 6,
    horoscope: 'Başak',
    date: '23 Ağustos - 22 Eylül',
    image: 'https://www.iconsdb.com/icons/preview/white/virgo-2-xxl.png',
    status: {
      daily:
        'Başak burcu insanları genellikle analitik düşünce yapısına sahiptir, düzenli ve detay odaklıdırlar. Günlük olarak, genellikle işleri ve görevleri organize etmeye odaklanırlar. Pratik yaklaşımları ve çalışkanlıkları ile bilinirler. Günlük aktivitelerde mükemmeliyetçi bir tutum sergileyebilir ve detaylara dikkat edebilirler. Sağlıklı yaşam alışkanlıkları ve düzenli programlar onlar için önemlidir.',
      weekly:
        'Haftalık olarak, Başak burcu genellikle iş ve görevlerini düzenlemeye yönelik bir strateji geliştirebilir. Çeşitli görevleri yerine getirmek için planlar yapabilirler. Hafta içinde detaylara odaklanarak, analitik becerilerini kullanma eğiliminde olabilirler. Aynı zamanda, sağlıklarına dikkat etmek ve iyi beslenme alışkanlıklarına önem vermek isteyebilirler.',
      monthly:
        'Aylık olarak, Başak burcu genellikle iş ve kariyer hedeflerine odaklanabilir. Projelerini organize etmek, planlarını gözden geçirmek ve verimliliklerini artırmak isteyebilirler. Aynı zamanda, sağlık ve yaşam tarzı konularına da odaklanabilir, sağlıklı alışkanlıkları güçlendirmeye çalışabilirler. Aylık planlarını yaparken, genellikle mükemmeliyetçi bir yaklaşım sergileyebilirler.',
    },
  },
  {
    id: 7,
    horoscope: 'Terazi',
    date: '23 Eylül - 22 Ekim',
    image: 'https://www.iconsdb.com/icons/preview/white/libra-2-xxl.png',
    status: {
      daily:
        'Terazi burcu insanları genellikle uyumlu, adalet duygusu güçlü ve diplomatik özelliklere sahiptir. Günlük olarak, genellikle ilişkilerde uyum ve denge ararlar. Güzellik ve estetik konularına duyarlıdırlar, bu nedenle günlük aktivitelerinde estetik değerlere önem verebilirler. Problemleri çözme konusunda adil bir yaklaşım sergileyebilir ve insanlar arasında uyum sağlamaya çalışabilirler.',
      weekly:
        'Haftalık olarak, Terazi burcu genellikle sosyal ilişkilere ve iletişime odaklanır. Hafta içinde, ortaklık ilişkilerini güçlendirmek ve sosyal etkinliklere katılmak isteyebilirler. İlişkilerde denge kurma çabası içinde olabilir ve karar verirken genellikle duygusal olarak dengeli bir tutum sergilerler.',
      monthly:
        'Aylık olarak, Terazi burcu genellikle ilişki ve sosyal bağlantıları gözden geçirir. İlişkilerinde derinleşmek ve daha derin bağlar kurmak isteyebilirler. Kariyer hedeflerine odaklanabilir ve projelerini daha büyük bir ölçekte düşünme eğiliminde olabilirler. Aylık planlarını yaparken, denge, uyum ve adalet kavramlarına özel bir vurgu yapabilirler.',
    },
  },
  {
    id: 8,
    horoscope: 'Akrep',
    date: '23 Ekim - 21 Kasım',
    image: 'https://www.iconsdb.com/icons/preview/white/scorpio-2-xxl.png',
    status: {
      daily:
        'Akrep burcu insanları genellikle güçlü, kararlı ve gizemli özelliklere sahiptir. Günlük olarak, genellikle derin düşünce ve duygulara sahiptirler. Güçlü bir içsel motivasyonları vardır, bu nedenle günlük aktivitelerde hedeflerine odaklanabilirler. Analitik düşünce yapısı sayesinde çözüm odaklı bir tutum sergileyebilirler. Gizemli ve derin bir yaklaşım ile etraflarındaki olayları anlamaya çalışabilirler.',
      weekly:
        'Haftalık olarak, Akrep burcu genellikle hedeflerine doğru ilerlemek ve planlarını hayata geçirmek ister. Güçlü bir içgüdüye sahip oldukları için, hafta içinde derinlemesine düşünme ve araştırma eğiliminde olabilirler. İlişkilerde derinleşmek ve bağlantıları güçlendirmek önemlidir. Hafta içinde, kişisel dönüşüm ve büyüme konularına odaklanabilirler.',
      monthly:
        'Aylık olarak, Akrep burcu genellikle kariyer hedefleri ve kişisel dönüşüm konularına odaklanabilir. Aylık planlarını yaparken, derinlemesine analiz ve araştırma yapma eğilimindedirler. İlişkilerde duygusal bağlarını güçlendirmek ve derinleştirmek isteyebilirler. Aynı zamanda, yaratıcılık ve kişisel ifade yoluyla kendilerini ifade etmeye yönelik çabalar içinde olabilirler.',
    },
  },
  {
    id: 9,
    horoscope: 'Yay',
    date: '22 Kasım - 21 Aralık',
    image: 'https://www.iconsdb.com/icons/preview/white/sagittarius-2-xxl.png',
    status: {
      daily:
        'Yay burcu insanları genellikle maceraperest, özgürlük sever ve iyimser özelliklere sahiptir. Günlük olarak, genellikle enerjik bir yaklaşıma sahiptirler. Yeni şeyler keşfetmeye, öğrenmeye ve geniş düşünceye olan ilgileri ile bilinirler. Günlük aktivitelerde, spontane ve pozitif bir tutum sergileyebilirler. Sosyal etkileşimlere katılmaktan, yeni insanlarla tanışmaktan ve çeşitli deneyimlere açık olmaktan keyif alabilirler.',
      weekly:
        'Haftalık olarak, Yay burcu genellikle geniş perspektiflerle düşünmeye eğilimlidir. Hafta içinde, seyahat etmek, farklı kültürleri keşfetmek veya yeni konulara odaklanmak isteyebilirler. İyi bir öğrenme haftası olabilir ve bu dönemde genellikle hayatlarında yeni şeyler öğrenmekten keyif alabilirler. Sosyal etkileşimlere ağırlık verme ve arkadaşlarıyla zaman geçirme eğiliminde olabilirler.',
      monthly:
        'Aylık olarak, Yay burcu genellikle geniş düşünce ve yüksek enerjilerini daha büyük hedeflere yönlendirmek isteyebilir. Aylık planlarını yaparken, seyahat planları yapabilir, eğitim konularına odaklanabilir veya felsefi konuları inceleyebilirler. İlişkilerde samimiyet arayışında olabilirler ve bağımsızlıklarını korurken sevdikleriyle paylaşımda bulunmaktan keyif alabilirler.',
    },
  },
  {
    id: 9,
    horoscope: 'Oğlak',
    date: '22 Aralık - 19 Ocak',
    image: 'https://www.iconsdb.com/icons/preview/white/capricorn-2-xxl.png',
    status: {
      daily:
        'Oğlak burcu insanları genellikle disiplinli, kararlı ve sorumluluk sahibi özelliklere sahiptir. Günlük olarak, genellikle hedeflerine odaklanır ve işlerini düzenlerler. Planlı ve organize bir yaklaşımları vardır, bu nedenle günlük aktivitelerini verimli bir şekilde yönetme eğilimindedirler. Sorumluluklarını yerine getirmek, başarılarını artırmak ve kariyer hedeflerine ulaşmak önemlidir.',
      weekly:
        'Haftalık olarak, Oğlak burcu genellikle iş ve kariyer konularına odaklanır. Hafta içinde, projelerini yönetmek ve hedeflerine doğru adımlar atmaktan keyif alabilirler. İş hayatında başarı elde etmek, disiplinlerini korumak ve kariyerlerini geliştirmek için çaba sarf edebilirler. Hafta içinde ilişkilerde de dengeli ve adil bir tutum sergileyebilirler.',
      monthly:
        'Aylık olarak, Oğlak burcu genellikle uzun vadeli hedeflerine odaklanır ve bu hedeflere ulaşmak için stratejiler geliştirir. İş hayatında ve kariyerlerinde ilerlemek için yeni projelere yönelebilirler. Aynı zamanda, sağlıklarına dikkat etmek ve dengeyi korumak için çaba sarf edebilirler. Aylık planlarını yaparken, kişisel ve profesyonel hedeflerini birleştirmeye çalışabilirler.',
    },
  },
  {
    id: 10,
    horoscope: 'Kova',
    date: '20 Ocak - 18 Şubat',
    image: 'https://www.iconsdb.com/icons/preview/white/aquarius-2-xxl.png',
    status: {
      daily:
        'Kova burcu insanları genellikle yenilikçi, bağımsız ve toplumsal konulara duyarlı özelliklere sahiptir. Günlük olarak, genellikle ilginç ve sıra dışı konulara odaklanabilirler. Zihinsel uyarılmaya ihtiyaç duyarlar, bu nedenle günlük aktivitelerde yaratıcı projelere veya sosyal etkinliklere katılmaktan keyif alabilirler. İnsan hakları, toplumsal adalet ve benzeri konularla ilgili olabilirler.',
      weekly:
        'Haftalık olarak, Kova burcu genellikle sosyal çevresiyle etkileşimde bulunmaya ve yeni fikirlerle tanışmaya istekli olabilir. İnsanlar arası bağlantılarını güçlendirmek, topluluk projelerine katılmak veya grup etkinliklerine dahil olmak isteyebilirler. Aynı zamanda, kendi bağımsızlıklarını koruma ihtiyacı hissedebilirler.',
      monthly:
        'Aylık olarak, Kova burcu genellikle büyük hedeflere odaklanabilir ve kariyerlerinde veya kişisel projelerinde ilerleme sağlamak için çeşitli stratejiler geliştirebilir. Aylık planlarını yaparken, yenilikçi ve sıra dışı fikirleri hayata geçirmeye çalışabilirler. İlişkilerinde bağımsızlık ve özgürlüklerini koruma arzusu güçlüdür. Aynı zamanda, toplum için faydalı olabilecek projelere yönelebilirler.',
    },
  },
  {
    id: 11,
    horoscope: 'Balık',
    date: '19 Ocak - 20 Mart',
    image: 'https://www.iconsdb.com/icons/preview/white/pisces-2-xxl.png',
    status: {
      daily:
        'Balık burcu insanları genellikle duyarlı, hayalperest ve içsel bir dünyaya sahiptir. Günlük olarak, genellikle içsel duygularıyla derin bir şekilde bağlantı kurarlar. Başkalarının hislerini anlama ve empati gösterme yetenekleri güçlüdür. Günlük aktivitelerde sanatsal ifadelere, meditasyona ve içsel keşfe zaman ayırabilirler. Duvarları olmayan ve açık kalpli bir tutum sergileyebilirler.',
      weekly:
        'Haftalık olarak, Balık burcu genellikle yaratıcılıklarını ifade etmeye ve hayallerini gerçekleştirmeye odaklanabilirler. Bu dönemde, içsel huzur bulmaya ve ruhsal olarak beslenmeye önem verebilirler. Hafta içinde duygusal anlamda bağlantılar kurmak ve sevdikleriyle zaman geçirmek isteyebilirler.',
      monthly:
        'Aylık olarak, Balık burcu genellikle içsel bir denge sağlamak ve ruhsal olarak büyümek isteyebilirler. Kariyer hedefleri ve kişisel projeleri üzerinde düşünmek, ancak aynı zamanda duygusal ve ilişkisel bağlantılara önem vermek önemlidir. Aylık planlarını yaparken, hayallerini gerçekleştirmek ve çevrelerindeki insanlarla daha derin bağlar kurmak isteyebilirler.',
    },
  },
];

export {horoscopes};
