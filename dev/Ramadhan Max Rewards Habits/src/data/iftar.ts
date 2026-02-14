import type { DaySection } from '../types';

export const iftarSection: DaySection = {
  id: 'iftar',
  title: 'Iftar & Maghrib',
  titleAr: 'الإفطار',
  timeWindow: 'Maghrib Adhan to Isha',
  icon: '🌅',
  deeds: [
    {
      id: 'iftar-break-fast',
      title: 'Breaking Fast Immediately',
      titleAr: 'تعجيل الإفطار',
      description:
        'The Sunnah is to hasten to break the fast as soon as the time of Maghrib enters. The Prophet (peace be upon him) said the people will continue to be upon good as long as they hasten to break the fast. Break your fast with fresh dates; if unavailable, then with water.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "The people will continue to be upon good as long as they hasten to break the fast."',
          reference: 'Sahih al-Bukhari 1957',
        },
        {
          text: 'The Prophet (peace be upon him) used to break his fast with fresh dates before praying. If there were no fresh dates, then with dried dates; and if there were no dried dates, he would take a few sips of water.',
          reference: 'Sunan Abu Dawud 2356',
        },
      ],
      reward:
        'Following the Sunnah of the Prophet (peace be upon him) and being among those whom Allah loves — those who hasten to do good.',
      tip: 'Have dates and water ready at your place before Maghrib Adhan. Break your fast immediately upon hearing the Adhan. Do not delay unnecessarily.',
    },
    {
      id: 'iftar-dua',
      title: 'Dua at Breaking Fast',
      titleAr: 'دعاء الإفطار',
      description:
        'Recite the Sunnah dua when breaking your fast. The Prophet (peace be upon him) would say this supplication upon breaking his fast, acknowledging that the thirst has gone, the veins have been moistened, and the reward is assured by the will of Allah.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) used to say when breaking his fast: "Dhahaba al-dhama\'u, wabtallatil-\'urooqu, wa thabatal-ajru in sha\' Allah" (The thirst has gone, the veins have been moistened, and the reward is assured, if Allah wills).',
          reference: 'Sunan Abu Dawud 2357',
        },
      ],
      reward:
        'A confirmed Sunnah dua that acknowledges Allah\'s blessings and affirms trust in His reward. The moment of breaking fast is a time of accepted supplication.',
      tip: 'Memorize this short dua and say it every day at Iftar. Teach it to your family and children so the entire household practices this beautiful Sunnah.',
      transliteration: "Dhahaba al-dhama'u, wabtallatil-'urooqu, wa thabatal-ajru in sha' Allah.",
      translation: 'The thirst has gone, the veins have been moistened, and the reward is assured, if Allah wills.',
    },
    {
      id: 'iftar-feed-others',
      title: 'Feeding Others Iftar',
      titleAr: 'إطعام الصائمين',
      description:
        'Providing Iftar for a fasting person earns you the same reward as their fast, without diminishing their reward in the slightest. This is one of the most virtuous deeds in Ramadan. It can be as simple as sharing dates and water or as elaborate as a full meal.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever provides Iftar for a fasting person will have a reward like his, without anything being diminished from the fasting person\'s reward."',
          reference: "Jami' at-Tirmidhi 807",
        },
      ],
      reward:
        'The full reward of the fasting person\'s fast, without any reduction in their own reward. Imagine earning the reward of hundreds of fasts by feeding others throughout Ramadan.',
      tip: 'Invite neighbors, friends, or community members to share Iftar. Donate to local masjids or charities that provide Iftar meals. Even giving someone a single date and water counts.',
    },
    {
      id: 'iftar-maghrib-sunnah',
      title: 'Praying Maghrib + Sunnah',
      titleAr: 'صلاة المغرب والسنة',
      description:
        'Pray the three obligatory rak\'ahs of Maghrib promptly, followed by two rak\'ahs of Sunnah Rawatib. Do not delay Maghrib prayer for an extended Iftar meal. Eat lightly, pray, and then continue your meal if needed.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever is regular with twelve rak\'ahs of Sunnah prayer, Allah will build for him a house in Paradise... two after Maghrib..."',
          reference: 'Sahih Muslim 728',
        },
      ],
      reward:
        'A house in Paradise for consistently praying the Sunnah Rawatib, including the two after Maghrib. Praying Maghrib promptly is an act of obedience and love for Allah.',
      tip: 'Break your fast with dates and water, pray Maghrib right away, then sit down for your full Iftar meal. This way you pray on time and with focus, and you can enjoy your meal afterward.',
    },
    {
      id: 'iftar-evening-adhkar',
      title: 'Evening Adhkar',
      titleAr: 'أذكار المساء',
      description:
        'Just as the morning has its adhkar, the evening also has prescribed remembrances that serve as protection and a source of immense reward. Recite Ayat al-Kursi, the three Quls, and the other evening supplications after Maghrib or Asr.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever recites the last two verses of Surah al-Baqarah at night, they will suffice him."',
          reference: 'Sahih al-Bukhari 5010',
        },
        {
          text: 'The Prophet (peace be upon him) used to say in the evening: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor" (O Allah, by You we enter the evening, and by You we enter the morning, and by You we live, and by You we die, and to You is the resurrection).',
          reference: 'Sunan Abu Dawud 5082',
        },
      ],
      reward:
        'Protection from all harm until morning. The evening adhkar serve as a shield against evil, anxiety, and the whispers of Shaytan.',
      tip: 'Recite your evening adhkar between Asr and Maghrib, or after Maghrib prayer. Keep a dhikr booklet or app handy. Pair it with your Iftar routine so it becomes a consistent habit.',
    },
  ],
};
