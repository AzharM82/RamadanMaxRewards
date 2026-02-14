import type { DaySection } from '../types';

export const afternoonSection: DaySection = {
  id: 'afternoon',
  title: 'Afternoon (Dhuhr to Maghrib)',
  titleAr: 'بعد الظهر',
  timeWindow: 'Dhuhr through Asr until Maghrib',
  icon: '🕌',
  deeds: [
    {
      id: 'afternoon-dhuhr-sunnah',
      title: 'Praying Dhuhr + Sunnah Rawatib',
      titleAr: 'صلاة الظهر والسنن الرواتب',
      description:
        'Pray the four obligatory rak\'ahs of Dhuhr along with the Sunnah Rawatib: four rak\'ahs before Dhuhr and two after. The Prophet (peace be upon him) was consistent in praying these Sunnah prayers and highlighted their virtue.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever is regular with twelve rak\'ahs of Sunnah prayer, Allah will build for him a house in Paradise: four before Dhuhr, two after Dhuhr, two after Maghrib, two after Isha, and two before Fajr."',
          reference: 'Sahih Muslim 728',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever prays four rak\'ahs before Dhuhr and four after it, Allah will make him forbidden for the Fire."',
          reference: "Jami' at-Tirmidhi 428",
        },
      ],
      reward:
        'A house built in Paradise for praying the twelve daily Sunnah Rawatib. Protection from the Hellfire for whoever prays four before and four after Dhuhr.',
      tip: 'Set a reminder on your phone for Dhuhr time. Pray the four Sunnah before the obligatory prayer and two (or four) after. In Ramadan, each Sunnah prayer carries amplified reward.',
    },
    {
      id: 'afternoon-asr',
      title: 'Praying Asr on Time',
      titleAr: 'صلاة العصر في وقتها',
      description:
        'The Asr prayer holds special significance. The Prophet (peace be upon him) singled it out as the "middle prayer" that must be guarded carefully. Missing it is described as a devastating loss, as if one has lost their family and wealth.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever misses the Asr prayer, it is as if he has lost his family and his wealth."',
          reference: 'Sahih al-Bukhari 553',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise."',
          reference: 'Sahih al-Bukhari 555',
        },
      ],
      reward:
        'Entry into Paradise for consistently praying Fajr and Asr. Guarding the Asr prayer saves one from immense loss in this life and the next.',
      tip: 'Never delay Asr until the sun starts to turn yellow. Pray it as soon as the time enters if possible. If at work, plan your break around Asr time.',
    },
    {
      id: 'afternoon-quran-session',
      title: 'Quran Afternoon Session',
      titleAr: 'تلاوة القرآن - حصة بعد الظهر',
      description:
        'Continue your daily Quran recitation in the afternoon. Splitting your reading into multiple sessions throughout the day makes it easier to complete a full juz. Reflect on the meanings and let the Quran transform your heart.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Recite the Quran, for it will come as an intercessor for its companions on the Day of Resurrection."',
          reference: 'Sahih Muslim 789',
        },
      ],
      reward:
        'The Quran will intercede for its reciter on the Day of Judgment. Every letter earns at least ten good deeds, multiplied in Ramadan.',
      tip: 'Read 5 pages after Dhuhr and 5 pages after Asr. This, combined with your morning and evening sessions, easily adds up to one full juz per day.',
    },
    {
      id: 'afternoon-dhikr-tasbeeh',
      title: 'Dhikr and Tasbeeh',
      titleAr: 'الذكر والتسبيح',
      description:
        'Fill the afternoon hours with the remembrance of Allah. Tasbeeh (SubhanAllah), Tahmeed (Alhamdulillah), Tahleel (La ilaha illallah), and Takbeer (Allahu Akbar) are light on the tongue but heavy on the scales. The Prophet (peace be upon him) loved these words dearly.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "The most beloved words to Allah are four: SubhanAllah, Alhamdulillah, La ilaha illallah, and Allahu Akbar."',
          reference: 'Sahih al-Bukhari 6407',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Two words are light on the tongue, heavy on the scales, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem."',
          reference: "Jami' at-Tirmidhi 3377",
        },
      ],
      reward:
        'These words of dhikr are heavy on the scales of good deeds on the Day of Judgment and are the most beloved words to Allah. They fill the balance between the heavens and the earth.',
      tip: 'Use a tasbeeh counter or your fingers. Say each of SubhanAllah, Alhamdulillah, La ilaha illallah, and Allahu Akbar 33 times after each prayer. Throughout the afternoon, keep your tongue moist with the remembrance of Allah.',
      transliteration: 'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem.',
      translation: 'Glory be to Allah and all praise is due to Him. Glory be to Allah, the Most Great.',
    },
    {
      id: 'afternoon-dua-before-iftar',
      title: 'Dua Before Iftar',
      titleAr: 'الدعاء قبل الإفطار',
      description:
        'The supplication of a fasting person is not rejected, especially at the time just before breaking the fast. As the sun sets and Maghrib approaches, raise your hands and pour your heart out to Allah. This is one of the three categories of people whose dua is never rejected.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Three supplications are not rejected: the supplication of a fasting person, the supplication of a just ruler, and the supplication of the oppressed."',
          reference: "Jami' at-Tirmidhi 3598",
        },
        {
          text: 'The Prophet (peace be upon him) said: "The fasting person has a supplication at the time of breaking fast that is not rejected."',
          reference: 'Sunan Ibn Majah 1753',
        },
      ],
      reward:
        'A guaranteed accepted supplication. This is a golden opportunity that comes every single day of Ramadan — do not waste it.',
      tip: 'Prepare your dua list before Iftar time. In the last 15-30 minutes before Maghrib, put aside all distractions and focus entirely on making heartfelt dua. Ask for this world and the Hereafter.',
    },
    {
      id: 'afternoon-sadaqah',
      title: 'Daily Sadaqah / Charity',
      titleAr: 'الصدقة اليومية',
      description:
        'Give something in charity every single day of Ramadan, even if it is small. The Prophet (peace be upon him) was the most generous of people, and he was even more generous in Ramadan. Charity does not decrease wealth; it purifies and increases it.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "There is no day in which the servants wake up except that two angels descend. One of them says: O Allah, give to the one who spends a replacement. The other says: O Allah, give to the one who withholds destruction."',
          reference: 'Sahih al-Bukhari 1442',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Protect yourselves from the Fire, even if with half a date."',
          reference: 'Sahih al-Bukhari 1410',
        },
        {
          text: 'The Prophet (peace be upon him) was the most generous of people, and he was most generous in Ramadan when Jibreel met him. Jibreel used to meet him every night in Ramadan and review the Quran with him. The Prophet (peace be upon him) was more generous than the blowing wind.',
          reference: 'Sahih al-Bukhari 3220',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Charity extinguishes sins just as water extinguishes fire."',
          reference: "Jami' at-Tirmidhi 2616",
        },
      ],
      reward:
        'Charity extinguishes sins as water extinguishes fire. It serves as a shade on the Day of Judgment and protects from the Hellfire. In Ramadan, the rewards are multiplied enormously.',
      tip: 'Set up a daily automated donation, even if it is just $1. Alternatively, give food, a kind word, or help someone in need. Feed a fasting person for the reward of their fast without diminishing their own reward.',
    },
  ],
};
