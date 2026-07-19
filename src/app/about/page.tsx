'use client'

import { useLanguage } from '@/lib/language-context'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">{t('পরিচিতি', 'About')}</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'আমি আহম্মদ শুভো — একজন চিন্তক, নির্মাতা এবং লেখক। আমি বিশ্বাস করি প্রযুক্তি এবং সাহিত্যের মাধ্যমে মানুষের জীবনে ইতিবাচক পরিবর্তন আনা যায়।',
            "I am Ahammad Shuvo — a thinker, builder, and writer. I believe technology and literature can bring positive change to people's lives."
          )}
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          {t(
            'আমার কাজের মধ্যে রয়েছে ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট, বই লেখা, এবং একাডেমিক গবেষণা। আমি সিলেটের একজন সন্তান, এবং আমার শহর এবং সংস্কৃতির প্রতি গভীর ভালোবাসা রয়েছে।',
            'My work includes web application development, book writing, and academic research. I am a son of Sylhet, with deep love for my city and its culture.'
          )}
        </p>

        <p className="text-gray-600 leading-relaxed">
          {t(
            'এই ওয়েবসাইটটি আমার ব্যক্তিগত ব্র্যান্ড, কাজ, এবং চিন্তাধারার একটি প্রতিফলন। আপনার আগ্রহের জন্য ধন্যবাদ।',
            'This website is a reflection of my personal brand, work, and philosophy. Thank you for your interest.'
          )}
        </p>
      </div>
    </div>
  )
}
