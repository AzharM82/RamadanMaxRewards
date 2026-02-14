import type { DaySection } from '../types';

export const nightSection: DaySection = {
  id: 'night',
  title: 'Night',
  titleAr: 'الليل',
  timeWindow: 'Isha prayer until sleep',
  icon: '✨',
  deeds: [
    {
      id: 'night-isha-congregation',
      title: 'Praying Isha in Congregation',
      titleAr: 'صلاة العشاء في جماعة',
      description:
        'Praying Isha in congregation is equivalent to standing in prayer for half the night. Combined with praying Fajr in congregation, it is as if one has prayed the entire night. In Ramadan, make every effort to pray Isha at the masjid.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever prays Isha in congregation, it is as if he has prayed half the night. And whoever prays Fajr in congregation, it is as if he has prayed the entire night."',
          reference: 'Sahih Muslim 656',
        },
      ],
      reward:
        'The reward of praying half the night in voluntary prayer. Combined with Fajr in congregation, you receive the reward of praying the whole night.',
      tip: 'Head to the masjid for Isha and stay for Taraweeh. Praying in the masjid removes distractions and helps you maintain focus and consistency.',
    },
    {
      id: 'night-taraweeh',
      title: 'Taraweeh Prayer',
      titleAr: 'صلاة التراويح',
      description:
        'Taraweeh is the special night prayer of Ramadan. The Prophet (peace be upon him) prayed it and encouraged it. Whoever stands in prayer during Ramadan out of faith and seeking reward will have all their previous sins forgiven. Pray it in congregation for the full reward.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever stands in prayer during Ramadan out of faith and seeking reward, his previous sins will be forgiven."',
          reference: 'Sahih al-Bukhari 2009',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever stands in prayer with the imam until he finishes, it will be recorded as if he spent the whole night in prayer."',
          reference: 'Sahih Muslim 759',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Allah has made fasting in Ramadan obligatory and I have made standing in prayer (Taraweeh) a Sunnah."',
          reference: "Jami' at-Tirmidhi 806",
        },
      ],
      reward:
        'Forgiveness of all previous sins. If you pray with the imam until he finishes, you receive the reward of praying the entire night.',
      tip: 'Stay with the imam until he completes the Taraweeh prayer. Even if the prayer is long, the reward of being written as having prayed all night is worth it. If the imam prays Witr, you may pray with him or pray your own Witr later at home.',
    },
    {
      id: 'night-witr',
      title: 'Witr Prayer',
      titleAr: 'صلاة الوتر',
      description:
        'The Witr prayer is the seal of the night prayers. The Prophet (peace be upon him) never left it, whether traveling or at home. It can be prayed as one, three, five, seven, or more rak\'ahs. Make it the last prayer you pray before sleeping.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Make Witr the last of your night prayers."',
          reference: 'Sahih Muslim 746',
        },
        {
          text: 'The Prophet (peace be upon him) said: "The Witr is a duty for every Muslim."',
          reference: 'Sunan Abu Dawud 1416',
        },
      ],
      reward:
        'A highly emphasized Sunnah that the Prophet (peace be upon him) never abandoned. It completes and seals the night prayers with an odd number, which Allah loves.',
      tip: 'If you plan to wake for Tahajjud, pray your Witr after Tahajjud as the last prayer of the night. If you are unsure about waking up, pray Witr after Taraweeh to be safe.',
    },
    {
      id: 'night-quran-session',
      title: 'Quran Night Session',
      titleAr: 'تلاوة القرآن - حصة الليل',
      description:
        'The night is a special time for Quran recitation. The stillness and quiet of the night allow for deeper reflection and connection with the words of Allah. Recite your remaining portion of the daily juz during this time.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Whoever recites the Quran at night, for every letter he will have ten good deeds."',
          reference: 'Sahih Muslim 804',
        },
        {
          text: '"Indeed, your Lord knows that you stand [in prayer] almost two-thirds of the night or half of it or a third of it, and [so do] a group of those with you. And Allah determines [the extent of] the night and the day. He has known that you will not be able to do it and has turned to you in forgiveness, so recite what is easy [for you] of the Quran."',
          reference: 'Quran 73:20',
        },
      ],
      reward:
        'Each letter of the Quran recited at night earns ten good deeds. Night recitation is more impactful on the heart and more conducive to understanding and reflection.',
      tip: 'Use the night session to catch up on your daily juz if needed. Read with translation and tafseer to deepen understanding. Even ten minutes of reflective recitation at night is deeply rewarding.',
    },
    {
      id: 'night-dua-before-sleep',
      title: 'Dua Before Sleeping',
      titleAr: 'دعاء النوم',
      description:
        'The Prophet (peace be upon him) taught specific supplications and practices before sleeping: reciting Ayat al-Kursi (for Allah\'s protection until morning), blowing into the hands and reciting the three Quls, and saying the supplication "Bismika Allahumma amootu wa ahya" (In Your name, O Allah, I die and I live).',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "When you go to bed, recite Ayat al-Kursi. There will be a guardian appointed over you from Allah, and no devil will come near you until morning."',
          reference: 'Sahih al-Bukhari 5017',
        },
        {
          text: 'The Prophet (peace be upon him) used to blow into his hands before sleeping, reciting Surah al-Ikhlas, Surah al-Falaq, and Surah an-Nas, and then wipe his hands over his body.',
          reference: 'Sahih al-Bukhari 6311',
        },
        {
          text: 'The Prophet (peace be upon him) used to say before sleeping: "Bismika Allahumma amootu wa ahya" (In Your name, O Allah, I die and I live).',
          reference: 'Sahih al-Bukhari 6320',
        },
      ],
      reward:
        'Allah appoints a guardian angel to protect you throughout the night. No devil can come near you. You sleep under divine protection and wake up refreshed for worship.',
      tip: 'Make these bedtime adhkar a non-negotiable habit. Recite Ayat al-Kursi, the three Quls (blowing into hands and wiping over body three times), and the sleeping dua every single night.',
      transliteration: 'Bismika Allahumma amootu wa ahya.',
      translation: 'In Your name, O Allah, I die and I live.',
    },
    {
      id: 'night-sleep-intention',
      title: 'Sleeping with Intention of Worship',
      titleAr: 'النوم بنية العبادة',
      description:
        'Even sleep can become an act of worship when done with the right intention. Sleep with the intention of gaining strength to wake for Tahajjud and Suhoor. Perform wudu before sleeping as the Prophet (peace be upon him) instructed.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Actions are judged by intentions, and every person will be rewarded according to what he intended."',
          reference: 'Sahih al-Bukhari 1',
        },
        {
          text: 'The Prophet (peace be upon him) said: "When you go to your bed, perform wudu as you would for prayer."',
          reference: 'Sahih Muslim 256',
        },
      ],
      reward:
        'Your sleep itself becomes a rewarded act of worship when done with the right intention. Sleeping in a state of wudu means that if you pass away during the night, you die in a state of purity.',
      tip: 'Before sleeping, make wudu and intend to wake for Tahajjud and Suhoor. Set your alarm. Sleep on your right side as the Prophet (peace be upon him) did. Your entire night of rest becomes worship.',
    },
  ],
};
