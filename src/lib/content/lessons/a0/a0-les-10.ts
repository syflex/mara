import type { Lesson } from '@/lib/types';

export const A0_LES_10: Lesson = {
  id: 'a0-les-10',
  track: 'beginner',
  level: 'A0',
  order: 10,
  titleNl: 'Review 1 — alles uit Les 1–9',
  titleEn: 'Review 1 — recap of Lessons 1–9',
  estimatedMinutes: 15,
  coverage: ['§1', '§2.1', '§2.2', '§2.3', '§3.1', '§3.2', '§4'],
  prerequisites: ['a0-les-09'],
  sections: [
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Twintig items door elkaar — cijfers (audio), vormen van zijn, voorzetsels en begroetingen. Even doorademen tussen elke groep.',
        items: [
          // Numbers — audio dictation (typed)
          {
            kind: 'typed',
            audioId: 'review-num-zeven',
            audioText: 'zeven',
            promptNl: 'Welk getal hoor je?',
            expected: '7',
          },
          {
            kind: 'typed',
            audioId: 'review-num-dertien',
            audioText: 'dertien',
            promptNl: 'Welk getal hoor je?',
            expected: '13',
          },
          {
            kind: 'typed',
            audioId: 'review-num-vijftig',
            audioText: 'vijftig',
            promptNl: 'Welk getal hoor je?',
            expected: '50',
          },
          {
            kind: 'typed',
            audioId: 'review-num-zevenenveertig',
            audioText: 'zevenenveertig',
            promptNl: 'Welk getal hoor je?',
            expected: '47',
          },
          // Zijn forms — text MC
          {
            kind: 'mc',
            promptNl: 'Ik ___ Anna.',
            choices: [
              { text: 'ben', correct: true },
              { text: 'bent', correct: false },
              { text: 'is', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Jij ___ moe.',
            choices: [
              { text: 'bent', correct: true },
              { text: 'ben', correct: false },
              { text: 'is', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij ___ Peter.',
            choices: [
              { text: 'is', correct: true },
              { text: 'ben', correct: false },
              { text: 'zijn', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij ___ uit Nederland.',
            choices: [
              { text: 'zijn', correct: true },
              { text: 'is', correct: false },
              { text: 'ben', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Jullie ___ studenten.',
            choices: [
              { text: 'zijn', correct: true },
              { text: 'bent', correct: false },
              { text: 'is', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'U ___ welkom.',
            choices: [
              { text: 'bent', correct: true },
              { text: 'ben', correct: false },
              { text: 'is', correct: false },
            ],
          },
          // Prepositions — text MC
          {
            kind: 'mc',
            promptNl: 'Ik kom ___ België.',
            choices: [
              { text: 'uit', correct: true },
              { text: 'in', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij woont ___ Amsterdam.',
            choices: [
              { text: 'in', correct: true },
              { text: 'uit', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij komen ___ Spanje.',
            choices: [
              { text: 'uit', correct: true },
              { text: 'in', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Zij wonen ___ de stad.',
            choices: [
              { text: 'in', correct: true },
              { text: 'uit', correct: false },
            ],
          },
          // Greeting / register — text MC
          {
            kind: 'mc',
            promptNl: 'Tegen een vriend zeg je:',
            choices: [
              { text: 'Hoi', correct: true },
              { text: 'Goedemiddag', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Tegen een ambtenaar zeg je:',
            choices: [
              { text: 'Goedemiddag', correct: true },
              { text: 'Hoi', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Bij vertrek, informeel:',
            choices: [
              { text: 'Doei', correct: true },
              { text: 'Tot ziens', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Bij vertrek, formeel:',
            choices: [
              { text: 'Tot ziens', correct: true },
              { text: 'Doei', correct: false },
            ],
          },
          // Mixed
          {
            kind: 'mc',
            promptNl: '"Hoe heet je?" — dit is welk register?',
            choices: [
              { text: 'informeel', correct: true },
              { text: 'formeel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hoe oud ___ u?',
            choices: [
              { text: 'bent', correct: true },
              { text: 'ben', correct: false },
              { text: 'is', correct: false },
            ],
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Luister naar Maria die zich voorstelt. Beantwoord daarna drie vragen. Beluister meerdere keren als je wilt; het transcript is verstopt totdat je het vraagt.',
        audioId: 'luisteren-intro-maria',
        transcriptNl:
          'Hallo, ik ben Maria. Ik ben tweeëndertig jaar oud. Ik kom uit België en ik woon in Amsterdam. Mijn telefoonnummer is nul-zes-één-twee-drie-vier-vijf-zes-zeven-acht.',
        transcriptEn:
          "Hello, I am Maria. I am thirty-two years old. I come from Belgium and I live in Amsterdam. My phone number is 06-12345678.",
        questions: [
          {
            questionNl: 'Hoe heet zij?',
            choices: ['Anna', 'Lisa', 'Maria'],
            correctIndex: 2,
          },
          {
            questionNl: 'Waar komt zij vandaan?',
            choices: ['Nederland', 'België', 'Duitsland'],
            correctIndex: 1,
          },
          {
            questionNl: 'Hoe oud is zij?',
            choices: ['22', '32', '42'],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Een volledige zelfintroductie in dertig seconden. Beluister Tom als model, neem dan jezelf op met je eigen naam, leeftijd, stad en land. Probeer dezelfde volgorde aan te houden — dat is wat een ambtenaar of werkgever verwacht.',
        lines: [
          {
            id: 'l1',
            nl: 'Hallo, mijn naam is Tom. Ik ben drieënveertig jaar oud. Ik woon in Den Haag en ik kom uit Nederland.',
            en: "Hi, my name is Tom. I am 43 years old. I live in The Hague and I come from the Netherlands.",
            audioId: 'spreken-intro-tom-vol',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Schrijf in vijf zinnen wie je bent. Eén regel per onderdeel: groet, naam, leeftijd, woonplaats, herkomst. Na elke zin verschijnt een modelantwoord ter vergelijking.',
        items: [
          {
            promptEn: 'Write a greeting (formal or informal — your choice).',
            expected: 'Hallo. / Hoi. / Goedemorgen.',
            hint: 'kies één begroeting uit Les 01',
          },
          {
            promptEn: 'Write your name in Dutch.',
            expected: 'Ik heet Tom. / Mijn naam is Tom.',
            hint: 'gebruik "Ik heet …" of "Mijn naam is …"',
          },
          {
            promptEn: 'Write your age.',
            expected: 'Ik ben drieëndertig jaar.',
            hint: 'gebruik "Ik ben [getal] jaar"',
          },
          {
            promptEn: 'Write where you live.',
            expected: 'Ik woon in Amsterdam.',
            hint: 'gebruik "Ik woon in [stad]"',
          },
          {
            promptEn: 'Write where you come from.',
            expected: 'Ik kom uit Nederland.',
            hint: 'gebruik "Ik kom uit [land]"',
          },
        ],
      },
    },
  ],
};
