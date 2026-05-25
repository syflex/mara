import type { Lesson } from '@/lib/types';

export const A0_LES_30: Lesson = {
  id: 'a0-les-30',
  track: 'beginner',
  level: 'A0',
  order: 30,
  titleNl: 'Eindreview A0 — wat je nu kunt',
  titleEn: 'A0 Final Review — what you can now do',
  estimatedMinutes: 18,
  coverage: ['§1', '§2', '§3', '§4'],
  prerequisites: ['a0-les-29'],
  sections: [
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Dertig items door alle A0-stof heen: lidwoorden, vervoegingen, meervouden, werkwoordherkenning, vraagwoorden, ontkenningen, voorzetsels. Geen druk — dit is meten, niet rennen.',
        items: [
          // A. Articles (5)
          {
            kind: 'mc',
            promptNl: '___ huis',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ tafel',
            choices: [
              { text: 'de', correct: true },
              { text: 'het', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ baby',
            choices: [
              { text: 'de', correct: true },
              { text: 'het', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ adres',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ kind',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          // B. Zijn conjugation (5)
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
            promptNl: 'Jij ___ blij.',
            choices: [
              { text: 'bent', correct: true },
              { text: 'ben', correct: false },
              { text: 'is', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij ___ moe.',
            choices: [
              { text: 'is', correct: true },
              { text: 'ben', correct: false },
              { text: 'zijn', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij ___ thuis.',
            choices: [
              { text: 'zijn', correct: true },
              { text: 'is', correct: false },
              { text: 'bent', correct: false },
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
          // C. Hebben (3)
          {
            kind: 'mc',
            promptNl: 'Ik ___ honger.',
            choices: [
              { text: 'heb', correct: true },
              { text: 'hebt', correct: false },
              { text: 'heeft', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Zij ___ tijd.',
            choices: [
              { text: 'heeft', correct: true },
              { text: 'heb', correct: false },
              { text: 'hebben', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij ___ koffie.',
            choices: [
              { text: 'hebben', correct: true },
              { text: 'hebt', correct: false },
              { text: 'heeft', correct: false },
            ],
          },
          // D. Plurals (4 typed)
          {
            kind: 'typed',
            promptNl: 'boek',
            promptEn: '(book) → meervoud?',
            expected: 'boeken',
          },
          {
            kind: 'typed',
            promptNl: 'kind',
            promptEn: '(child) → meervoud?',
            expected: 'kinderen',
          },
          {
            kind: 'typed',
            promptNl: 'foto',
            promptEn: '(photo) → meervoud?',
            expected: "foto's",
          },
          {
            kind: 'typed',
            promptNl: 'hand',
            promptEn: '(hand) → meervoud?',
            expected: 'handen',
          },
          // E. Verb infinitive from audio (4)
          {
            kind: 'mc',
            audioId: 'rev30-ik-ga',
            audioText: 'ik ga',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'gaan', correct: true },
              { text: 'komen', correct: false },
              { text: 'doen', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev30-ik-weet',
            audioText: 'ik weet',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'weten', correct: true },
              { text: 'zien', correct: false },
              { text: 'zeggen', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev30-ik-werk',
            audioText: 'ik werk',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'werken', correct: true },
              { text: 'maken', correct: false },
              { text: 'praten', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev30-ik-lees',
            audioText: 'ik lees',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'lezen', correct: true },
              { text: 'kijken', correct: false },
              { text: 'schrijven', correct: false },
            ],
          },
          // F. Question words (4)
          {
            kind: 'mc',
            promptNl: '___ heet je?',
            choices: [
              { text: 'Hoe', correct: true },
              { text: 'Wat', correct: false },
              { text: 'Wanneer', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ kom je vandaan?',
            choices: [
              { text: 'Waar', correct: true },
              { text: 'Wie', correct: false },
              { text: 'Hoeveel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ ben je moe?',
            choices: [
              { text: 'Waarom', correct: true },
              { text: 'Wanneer', correct: false },
              { text: 'Wat', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ kinderen heeft hij?',
            choices: [
              { text: 'Hoeveel', correct: true },
              { text: 'Wie', correct: false },
              { text: 'Welke', correct: false },
            ],
          },
          // G. Niet/geen (3)
          {
            kind: 'mc',
            promptNl: 'Ik heb ___ tijd.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij is ___ ziek.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij hebben ___ honger.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          // H. Prepositions (2)
          {
            kind: 'mc',
            promptNl: 'Ik ga ___ de winkel.',
            choices: [
              { text: 'naar', correct: true },
              { text: 'op', correct: false },
              { text: 'van', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Het boek ligt ___ de tafel.',
            choices: [
              { text: 'op', correct: true },
              { text: 'aan', correct: false },
              { text: 'in', correct: false },
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
          'Sara stelt zichzelf voor en vertelt over haar dag. Vijf vragen testen verschillende vaardigheden: naam, getallen, gezin, werkwoord en eten.',
        audioId: 'luisteren-eindreview-sara',
        transcriptNl: 'Hallo, mijn naam is Sara. Ik ben tweeëndertig jaar oud. Ik woon in Amsterdam met mijn man en twee kinderen. Vandaag werk ik niet — ik ga met mijn familie naar het café. We drinken koffie en eten brood. Ik ben blij.',
        transcriptEn: "Hi, my name is Sara. I am thirty-two years old. I live in Amsterdam with my husband and two children. Today I am not working — I am going with my family to the café. We drink coffee and eat bread. I am happy.",
        questions: [
          {
            questionNl: 'Hoe heet zij?',
            choices: ['Anna', 'Lisa', 'Sara'],
            correctIndex: 2,
          },
          {
            questionNl: 'Hoe oud is zij?',
            choices: ['22', '32', '42'],
            correctIndex: 1,
          },
          {
            questionNl: 'Hoeveel kinderen heeft zij?',
            choices: ['één', 'twee', 'drie'],
            correctIndex: 1,
          },
          {
            questionNl: 'Werkt zij vandaag?',
            choices: ['ja', 'nee'],
            correctIndex: 1,
          },
          {
            questionNl: 'Wat eet zij?',
            choices: ['kaas', 'brood', 'soep'],
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
          'Een volledige zelfintroductie in zes regels — circa een minuut. Beluister Anna als model, neem dan jezelf op met je eigen gegevens. Doel: kunnen vertellen wie je bent, waar je woont, met wie, hoe je je voelt, en iets vragen.',
        lines: [
          {
            id: 'l1',
            nl: 'Hallo, mijn naam is Anna en ik ben dertig jaar oud.',
            en: 'Hello, my name is Anna and I am thirty years old.',
            audioId: 'spreken-eindreview-l1',
          },
          {
            id: 'l2',
            nl: 'Ik kom uit Nederland en woon in Den Haag.',
            en: 'I come from the Netherlands and live in The Hague.',
            audioId: 'spreken-eindreview-l2',
          },
          {
            id: 'l3',
            nl: 'Ik heb twee broers en één zus.',
            en: 'I have two brothers and one sister.',
            audioId: 'spreken-eindreview-l3',
          },
          {
            id: 'l4',
            nl: 'Mijn huis heeft een woonkamer, twee slaapkamers en een mooie tuin.',
            en: 'My house has a living room, two bedrooms and a beautiful garden.',
            audioId: 'spreken-eindreview-l4',
          },
          {
            id: 'l5',
            nl: 'Vandaag ben ik blij en het gaat goed.',
            en: "Today I am happy and I'm doing well.",
            audioId: 'spreken-eindreview-l5',
          },
          {
            id: 'l6',
            nl: 'Mag ik nu een koffie, alstublieft?',
            en: 'May I have a coffee now, please?',
            audioId: 'spreken-eindreview-l6',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Tien zinnen die samen jouw persoonlijke profiel zijn. Een echte A0-tekst: alles wat je kunt zeggen over jezelf op een eerste ontmoeting. Eén regel per onderdeel — geen druk om perfect te zijn, model staat erna klaar.',
        items: [
          {
            promptEn: 'Greet (informal or formal — your choice).',
            expected: 'Goedemorgen!',
            hint: 'Hallo / Hoi / Goedemorgen',
          },
          {
            promptEn: 'Say your name.',
            expected: 'Mijn naam is Anna.',
            hint: '"Ik heet …" of "Mijn naam is …"',
          },
          {
            promptEn: 'Say your age.',
            expected: 'Ik ben dertig jaar oud.',
            hint: '"Ik ben [getal] jaar oud"',
          },
          {
            promptEn: 'Say where you come from.',
            expected: 'Ik kom uit Nederland.',
            hint: '"Ik kom uit [land]"',
          },
          {
            promptEn: 'Say where you live.',
            expected: 'Ik woon in Amsterdam.',
            hint: '"Ik woon in [stad]"',
          },
          {
            promptEn: 'Give your phone number (digit by digit).',
            expected: 'Mijn telefoonnummer is nul-zes-één-twee-drie-vier-vijf-zes-zeven-acht.',
            hint: '"Mijn telefoonnummer is …" + cijfers',
          },
          {
            promptEn: 'Mention one family member.',
            expected: 'Mijn moeder heet Lisa.',
            hint: '"Mijn [familielid] heet/is/woont …"',
          },
          {
            promptEn: 'Describe your home (one fact).',
            expected: 'Mijn huis heeft drie kamers en een tuin.',
            hint: '"Mijn huis heeft …" of "Ik woon in een …"',
          },
          {
            promptEn: 'Say how you feel today.',
            expected: 'Ik ben blij vandaag.',
            hint: '"Ik ben [gevoel]" — blij / moe / goed …',
          },
          {
            promptEn: 'Say one activity you do today OR one thing you want to learn.',
            expected: 'Vandaag leer ik Nederlands.',
            hint: '"Vandaag [werkwoord] ik …" of "Ik wil … leren"',
          },
        ],
      },
    },
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Wat je in A0 hebt geleerd' },
          {
            kind: 'paragraph',
            text: 'Dertig lessen, ruim 200 woorden, en alle bouwstenen voor een eerste echt gesprek in het Nederlands. Niet niks. Tijd om kort terug te kijken — en daarna vooruit.',
          },
          {
            kind: 'list',
            items: [
              'Uitspraak — alfabet, korte/lange klinkers, vijf digrafen (ij, ui, eu, oe, ou).',
              'Begroeten en jezelf voorstellen — informeel én formeel, met "je" en "u".',
              'Getallen 0–100, telefoonnummers, leeftijd, datum, tijd.',
              'Twee kernwerkwoorden volledig: zijn en hebben.',
              'Lidwoorden de/het + aanwijswoorden dit/dat/deze/die.',
              'Meervoud — vier patronen (-en, -s, -\'s, onregelmatig).',
              'Familie, lichaam, gevoelens, huis, eten, kleuren, adjectieven.',
              'Top 25 hoogfrequente werkwoorden (ik-vorm).',
              'Vijftien voorzetsels — ruimtelijk, richting, vast.',
              'Acht vraagwoorden en de inversie-regel.',
              'Ontkennen met niet en geen — beide regels.',
            ],
          },
          { kind: 'heading', text: 'Wat je nu kunt' },
          {
            kind: 'paragraph',
            text: 'Concreet: jezelf voorstellen aan een Nederlander, een koffie bestellen, je adres en telefoonnummer doorgeven aan de gemeente, vertellen wie er in jouw gezin zit, zeggen hoe je je voelt, vragen stellen met alle acht vraagwoorden, en ontkennen met de juiste vorm. Dit is precies het A0-niveau dat het Inburgeringsexamen veronderstelt als startpunt.',
          },
          { kind: 'heading', text: 'Wat komt er in A1' },
          {
            kind: 'paragraph',
            text: 'A1 bouwt voort op deze fundering. De grootste veranderingen:',
          },
          {
            kind: 'list',
            items: [
              'Volledige werkwoordvervoeging — niet alleen ik-vorm, ook jij/hij/wij/jullie/zij.',
              'V2-regel — werkwoord altijd op plek 2, met alle inversies die daarbij horen.',
              'Adjectief-verbuiging — "de grote man" met -e, "een groot huis" zonder -e.',
              'Verleden tijd (perfectum) — "Ik heb gegeten", "Ik ben gegaan".',
              'Modale werkwoorden als hoofdwerkwoord — "Ik wil koffie" → "Ik wil koffie drinken".',
              'Uitbreiding van vocabulaire naar dagelijkse situaties: werk, school, gezondheid, reizen.',
            ],
          },
          { kind: 'heading', text: 'Goed gedaan' },
          {
            kind: 'paragraph',
            text: 'Een nieuwe taal beginnen is moeilijk; doorzetten tot en met les 30 nog moeilijker. De basis staat. Veel succes met A1 — en met de eerste echte gesprekken in het Nederlands.',
          },
        ],
      },
    },
  ],
};
