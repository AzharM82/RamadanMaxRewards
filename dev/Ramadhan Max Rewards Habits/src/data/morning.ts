import type { DaySection } from '../types';

export const morningSection: DaySection = {
  id: 'morning',
  title: 'Morning (Fajr to Dhuhr)',
  titleAr: 'الصباح',
  timeWindow: 'After Fajr prayer until Dhuhr',
  icon: '☀️',
  deeds: [
    {
      id: 'morning-fajr-congregation',
      title: 'Praying Fajr in Congregation',
      titleAr: 'صلاة الفجر في جماعة',
      description:
        'Praying Fajr in congregation is one of the most virtuous acts a Muslim can perform. The Prophet (peace be upon him) emphasized that it is the heaviest prayer on the hypocrites. Whoever prays Fajr in congregation is under the protection of Allah for the entire day.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever prays the Fajr prayer in congregation, he is under the protection of Allah."',
          reference: 'Sahih Muslim 656',
        },
        {
          text: 'The Prophet (peace be upon him) said: "If they knew what was in the Fajr and Isha prayers, they would come to them even if they had to crawl."',
          reference: 'Sahih al-Bukhari 574',
        },
      ],
      reward:
        'Being under the protection of Allah for the entire day. The reward of praying Fajr in congregation is equivalent to praying half the night in voluntary prayer.',
      tip: 'Set multiple alarms if needed. Sleep early after Taraweeh/Witr. If you prayed Tahajjud, transition directly into Fajr at the masjid. In Ramadan, many masajid have active Fajr congregations — join them.',
    },
    {
      id: 'morning-adhkar',
      title: 'Morning Adhkar',
      titleAr: 'أذكار الصباح',
      description:
        'The morning remembrances (adhkar) are a fortress that protect the believer throughout the day. They include Ayat al-Kursi, the last two verses of Surah al-Baqarah, the three Quls (al-Ikhlas, al-Falaq, an-Nas), saying "La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer" 100 times, and saying "SubhanAllah wa bihamdihi" 100 times.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing will prevent him from entering Paradise except death."',
          reference: 'Sahih Muslim 2137',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever says SubhanAllah wa bihamdihi 100 times a day, his sins will be forgiven even if they are like the foam of the sea."',
          reference: 'Sahih al-Bukhari 6306',
        },
      ],
      reward:
        'Protection from evil, forgiveness of sins even if like the foam of the sea, planting palm trees in Paradise, and being under divine protection until evening.',
      tip: 'Use a dhikr app or a printed card to follow along with the morning adhkar consistently. Recite them right after Fajr prayer while sitting in your prayer spot. In Ramadan, the rewards are multiplied immensely.',
      transliteration:
        'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa huwa \'ala kulli shay\'in qadeer (100x). SubhanAllahi wa bihamdihi (100x).',
      translation:
        'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things competent (100x). Glory be to Allah and all praise is due to Him (100x).',
    },
    {
      id: 'morning-ishraq-duha',
      title: 'Ishraq / Duha Prayer',
      titleAr: 'صلاة الإشراق / الضحى',
      description:
        'After praying Fajr, remain seated doing dhikr until sunrise, then pray two rak\'ahs (Ishraq). The Duha prayer can also be prayed later in the mid-morning. This prayer is a charity on behalf of every joint in your body.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "In the morning, charity is due from every joint of any of you. Every SubhanAllah is charity, every Alhamdulillah is charity... and two rak\'ahs of Duha is sufficient for all of that."',
          reference: 'Sahih Muslim 720',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever prays Fajr in congregation, then sits remembering Allah until the sun rises, then prays two rak\'ahs, will have a reward like that of Hajj and Umrah — complete, complete, complete."',
          reference: 'Jami\' at-Tirmidhi 586',
        },
      ],
      reward:
        'The reward of a complete Hajj and Umrah for praying Ishraq after remaining seated from Fajr. The Duha prayer serves as charity for every joint in the body (360 joints).',
      tip: 'Stay in your prayer place after Fajr, recite Quran or do dhikr, and wait about 15-20 minutes after sunrise. Then pray 2-4 rak\'ahs of Ishraq/Duha. This is one of the easiest ways to earn the reward of Hajj and Umrah.',
    },
    {
      id: 'morning-quran',
      title: 'Quran Recitation — Morning Session',
      titleAr: 'تلاوة القرآن - حصة الصباح',
      description:
        'Dedicate a portion of your morning to reciting the Quran. The morning recitation is specifically mentioned in the Quran and is witnessed by the angels. Aim to complete the entire Quran at least once during Ramadan by reading approximately one juz per day.',
      sources: [
        {
          text: '"Establish prayer at the decline of the sun until the darkness of the night and [also] the Quran at dawn. Indeed, the recitation of dawn is ever witnessed."',
          reference: 'Quran 17:78',
        },
        {
          text: 'The Prophet (peace be upon him) said: "The best among you are those who learn the Quran and teach it."',
          reference: 'Sahih al-Bukhari 5027',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever recites a letter from the Book of Allah, he will receive one good deed, and one good deed is multiplied tenfold."',
          reference: "Jami' at-Tirmidhi 2910",
        },
      ],
      reward:
        'Every letter of the Quran earns at least 10 hasanaat (good deeds), and in Ramadan this is multiplied many times over. The angels witness the morning recitation. Completing the Quran in Ramadan is a tremendous achievement.',
      tip: 'Set a daily target (e.g., 1 juz/day = 20 pages). Split it into chunks: read 5 pages after Fajr, 5 after Dhuhr, 5 after Asr, and 5 at night. Consistency is key.',
    },
    {
      id: 'morning-guard-tongue',
      title: 'Guarding the Tongue and Limbs',
      titleAr: 'حفظ اللسان والجوارح',
      description:
        'Fasting is not merely abstaining from food and drink. The Prophet (peace be upon him) warned that whoever does not give up false speech, acting upon it, and ignorance, Allah has no need of his giving up food and drink. Guard your tongue from backbiting, lying, and foul language throughout the day.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever does not give up false speech and acting upon it and ignorance, Allah has no need of his giving up his food and drink."',
          reference: 'Sahih al-Bukhari 1903',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent."',
          reference: 'Sahih al-Bukhari 6018',
        },
      ],
      reward:
        'A complete and accepted fast. True fasting purifies the soul and earns the full reward that Allah has reserved for those who fast sincerely.',
      tip: 'If someone provokes you while fasting, say "I am fasting" as the Prophet (peace be upon him) taught. Avoid social media arguments and gossip sessions. Replace idle talk with dhikr and Quran.',
    },
    {
      id: 'morning-salawat',
      title: 'Salawat upon the Prophet (peace be upon him)',
      titleAr: 'الصلاة على النبي ﷺ',
      description:
        'Sending blessings (salawat) upon the Prophet Muhammad (peace be upon him) is one of the most beloved deeds to Allah. It is a means of having your own sins forgiven and your rank raised. Aim to send salawat abundantly throughout the day, especially in Ramadan.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever sends blessings upon me once, Allah will send blessings upon him tenfold."',
          reference: 'Sahih Muslim 408',
        },
      ],
      reward:
        'For every salawat you send, Allah sends ten blessings upon you, ten sins are erased, and you are raised ten degrees. On the Day of Judgment, the closest people to the Prophet (peace be upon him) will be those who sent the most salawat upon him.',
      tip: 'Set a daily target of at least 100 salawat. Use a counter or tasbeeh beads. Say "Allahumma salli \'ala Muhammad wa \'ala aali Muhammad" while walking, driving, cooking, or during any idle moment.',
      transliteration: "Allahumma salli 'ala Muhammad wa 'ala aali Muhammad, kama sallayta 'ala Ibrahim wa 'ala aali Ibrahim, innaka Hameedun Majeed.",
      translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Glorious.',
    },
  ],
};
