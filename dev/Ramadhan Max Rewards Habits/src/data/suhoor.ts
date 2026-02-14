import type { DaySection } from '../types';

export const suhoorSection: DaySection = {
  id: 'suhoor',
  title: 'Suhoor (Pre-Dawn)',
  titleAr: 'السحور',
  timeWindow: 'Last third of the night until Fajr Adhan',
  icon: '🌙',
  deeds: [
    {
      id: 'suhoor-meal',
      title: 'Eating Suhoor',
      titleAr: 'السحور',
      description:
        'The Prophet (peace be upon him) strongly encouraged eating the pre-dawn meal (Suhoor) before fasting. He described it as a blessed meal and distinguished the fast of Muslims from the fast of the People of the Book by partaking in Suhoor. Even if one can only manage a sip of water, the Sunnah is not to skip it.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Eat Suhoor, for in Suhoor there is blessing."',
          reference: 'Sahih al-Bukhari 1923',
        },
        {
          text: 'The Prophet (peace be upon him) said: "The difference between our fasting and the fasting of the People of the Book is the meal of Suhoor."',
          reference: 'Sahih Muslim 1095',
        },
      ],
      reward:
        'Barakah (divine blessing) in one\'s day and fasting. Following the Sunnah of the Prophet (peace be upon him) and receiving the prayers of the angels.',
      tip: 'Delay your Suhoor as close to Fajr as possible. The Prophet (peace be upon him) used to have Suhoor so late that between finishing it and the Iqamah of Fajr was only the time it takes to recite fifty verses of the Quran.',
    },
    {
      id: 'suhoor-tahajjud',
      title: 'Tahajjud / Qiyam al-Layl',
      titleAr: 'قيام الليل',
      description:
        'The voluntary night prayer (Tahajjud) is one of the greatest acts of worship. The last third of the night is when Allah descends to the lowest heaven and answers supplications. Since you are already awake for Suhoor, take advantage and pray even two rak\'ahs of Tahajjud before Fajr.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Our Lord descends every night to the lowest heaven when the last third of the night remains, and He says: Who is calling upon Me that I may answer him? Who is asking of Me that I may give him? Who is seeking My forgiveness that I may forgive him?"',
          reference: 'Sahih al-Bukhari 1145',
        },
        {
          text: '"And from [part of] the night, pray with it [i.e., Tahajjud] as additional [worship] for you; it is expected that your Lord will resurrect you to a praised station."',
          reference: 'Quran 17:79',
        },
      ],
      reward:
        'The best prayer after the obligatory prayers is the night prayer. It is a means of being raised to the praised station (Maqam Mahmud) and having one\'s sins forgiven.',
      tip: 'Even if you only have time for two short rak\'ahs before Suhoor, pray them. Quality and consistency matter more than length. Use this time to make heartfelt dua in sujood.',
    },
    {
      id: 'suhoor-dua',
      title: 'Dua at Suhoor Time',
      titleAr: 'الدعاء وقت السحر',
      description:
        'The pre-dawn time (Sahar) is one of the most blessed times for making dua. Allah specifically praises those who seek forgiveness at this time. Use these precious moments to ask Allah for your needs in this life and the Hereafter.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) used to supplicate and seek forgiveness before dawn.',
          reference: 'Sahih al-Bukhari 6321',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Our Lord descends every night to the lowest heaven... Who is calling upon Me that I may answer him?"',
          reference: 'Sahih Muslim 758',
        },
      ],
      reward:
        'Duas made at the last third of the night are answered by Allah. This is a time of divine closeness and acceptance.',
      tip: 'Keep a personal dua list for Ramadan. Include duas for yourself, your family, the Ummah, and the oppressed. Recite them every night at Suhoor time with full conviction.',
    },
    {
      id: 'suhoor-istighfar',
      title: 'Istighfar at Pre-Dawn',
      titleAr: 'الاستغفار بالأسحار',
      description:
        'Allah praises those who seek forgiveness in the hours before dawn. The pre-dawn period is uniquely suited for repentance and asking Allah\'s forgiveness. Make istighfar a consistent part of your Suhoor routine.',
      sources: [
        {
          text: '"...those who are patient, those who are true (in faith), those who are obedient, those who spend (in the way of Allah), and those who seek forgiveness before dawn (bil-ashar)."',
          reference: 'Quran 3:17',
        },
      ],
      reward:
        'Being counted among those whom Allah praises in the Quran — the sincere believers who seek forgiveness in the pre-dawn hours.',
      tip: 'Say "Astaghfirullah" (I seek Allah\'s forgiveness) abundantly during Suhoor. Combine it with the master supplication for forgiveness (Sayyid al-Istighfar) taught by the Prophet (peace be upon him).',
    },
    {
      id: 'suhoor-niyyah',
      title: 'Making Niyyah (Intention) to Fast',
      titleAr: 'النية للصيام',
      description:
        'The intention to fast must be made before Fajr for obligatory fasts. The niyyah is in the heart — it does not need to be spoken aloud. Simply knowing and resolving that you will fast tomorrow for the sake of Allah is sufficient.',
      sources: [
        {
          text: 'The Prophet (peace be upon him) said: "Actions are judged by intentions, and every person will be rewarded according to what he intended."',
          reference: 'Sahih al-Bukhari 1, Sahih Muslim 1907',
        },
        {
          text: 'The Prophet (peace be upon him) said: "Whoever does not have the intention of fasting before Fajr, there is no fast for him."',
          reference: "Sunan an-Nasa'i 2334",
        },
      ],
      reward:
        'A sincere intention multiplies the reward of every act of worship. Fasting with a conscious, renewed intention each day ensures your fast is valid and maximally rewarded.',
      tip: 'Renew your intention each night. Remind yourself that you are fasting for Allah alone, seeking His pleasure and forgiveness. A sincere niyyah transforms a difficult day into an act of worship.',
    },
  ],
};
