export type ExerciseMedia = {
  animationUrl: string;
  instructions: string[];
};

export const exerciseMedia: Record<
  string,
  ExerciseMedia
> = {
  "machine-bench-press": {
    animationUrl: "/api/exercise-gif?id=0577",
    instructions: [
      "Plaats je rug stevig tegen de rugleuning.",
      "Houd je schouderbladen naar achteren en omlaag.",
      "Duw gecontroleerd uit zonder je ellebogen hard te overstrekken.",
      "Laat het gewicht rustig terugkomen.",
    ],
  },

  "incline-dumbbell-press": {
  animationUrl: "/api/exercise-gif?id=0314",
    instructions: [
      "Zet de bank in een lichte incline.",
      "Houd de dumbbells boven de bovenkant van de borst.",
      "Laat gecontroleerd zakken.",
      "Duw omhoog zonder de schouders naar voren te laten rollen.",
    ],
  },

  "shoulder-press": {
  animationUrl: "/api/exercise-gif?id=0405",
    instructions: [
      "Houd je romp stabiel.",
      "Start met de handen rond schouderhoogte.",
      "Druk gecontroleerd omhoog.",
      "Voorkom overmatig hol trekken van de onderrug.",
    ],
  },

  "lateral-raise": {
  animationUrl: "/api/exercise-gif?id=0334",
    instructions: [
      "Houd een lichte buiging in de ellebogen.",
      "Til vanuit de schouders.",
      "Beweeg gecontroleerd tot ongeveer schouderhoogte.",
      "Laat langzaam terugzakken.",
    ],
  },

      "triceps-pushdown": {
    animationUrl: "/api/exercise-gif?id=0241",
    instructions: [
      "Houd de ellebogen dicht langs het lichaam.",
      "Houd je bovenarmen stil tijdens de beweging.",
      "Duw de V-bar gecontroleerd helemaal naar beneden.",
      "Span de triceps onderaan kort aan en laat rustig terugkomen.",
    ],
  },

  "lat-pulldown": {
    animationUrl: "/api/exercise-gif?id=0150",
    instructions: [
      "Ga stevig zitten en klem je bovenbenen onder de steunrollen.",
      "Pak de stang iets breder dan schouderbreedte vast.",
      "Trek de stang gecontroleerd richting de bovenkant van je borst.",
      "Trek je ellebogen naar beneden en span je rugspieren aan.",
      "Laat de stang gecontroleerd terugkeren zonder het gewicht te laten vallen.",
    ],
  },
    "seated-cable-row": {
    animationUrl: "/api/exercise-gif?id=0861",
    instructions: [
      "Zet je voeten stevig op de voetsteunen en houd je knieën licht gebogen.",
      "Houd je borst omhoog en je rug neutraal.",
      "Trek de handgreep gecontroleerd richting je buik.",
      "Breng je schouderbladen naar elkaar toe zonder achterover te zwaaien.",
      "Laat het gewicht gecontroleerd terugkomen en houd spanning op de rug.",
    ],
  },
    "chest-supported-row": {
    animationUrl: "/api/exercise-gif?id=1320",
    instructions: [
      "Plaats je borst stevig tegen de steun.",
      "Houd je voeten stabiel en je romp stil.",
      "Trek de handgrepen gecontroleerd naar achteren.",
      "Breng je schouderbladen naar elkaar toe zonder je schouders op te trekken.",
      "Laat het gewicht langzaam terugkomen en behoud spanning op de rug.",
    ],
  },
    "reverse-pec-deck": {
    animationUrl: "/api/exercise-gif?id=0377",
    instructions: [
      "Ga met je borst stevig tegen de steun zitten.",
      "Houd je armen licht gebogen en je schouders laag.",
      "Beweeg de armen gecontroleerd naar achteren.",
      "Span de achterste schouders kort aan in de eindpositie.",
      "Laat gecontroleerd terugkomen zonder het gewicht te laten vallen.",
    ],
  },
      "biceps-curl": {
    animationUrl: "/api/exercise-gif?id=0031",
    instructions: [
      "Houd je romp stabiel en je borst omhoog.",
      "Houd je bovenarmen zo stil mogelijk langs het lichaam.",
      "Buig de ellebogen en breng het gewicht gecontroleerd omhoog.",
      "Span de biceps bovenaan kort aan.",
      "Laat het gewicht langzaam zakken zonder te zwaaien.",
    ],
  },

  "leg-press": {
    animationUrl: "/api/exercise-gif?id=0739",
    instructions: [
      "Plaats je voeten ongeveer op schouderbreedte op het platform.",
      "Houd je onderrug en billen tegen de rugleuning.",
      "Laat het gewicht gecontroleerd zakken tot een comfortabele diepte.",
      "Duw het platform krachtig weg via je hele voet.",
      "Strek je knieën bovenaan niet hard op slot.",
    ],
  },
    "leg-extension": {
    animationUrl: "/api/exercise-gif?id=0585",
    instructions: [
      "Stel de rugleuning en beenrol goed af.",
      "Plaats de rol net boven je enkels.",
      "Houd je rug en billen stevig tegen de zitting.",
      "Strek je knieën gecontroleerd en span de quadriceps bovenaan kort aan.",
      "Laat het gewicht langzaam terugzakken zonder de gewichten te laten vallen.",
    ],
  },
    "seated-leg-curl": {
    animationUrl: "/api/exercise-gif?id=0599",
    instructions: [
      "Stel de rugleuning en beenrollen goed af.",
      "Houd je rug en billen stevig tegen de zitting.",
      "Buig je knieën en trek de rol gecontroleerd naar beneden en achteren.",
      "Span je hamstrings kort aan in de eindpositie.",
      "Laat het gewicht langzaam terugkomen zonder de spanning te verliezen.",
    ],
  },
    "romanian-deadlift": {
    animationUrl: "/api/exercise-gif?id=0085",
    instructions: [
      "Houd de stang dicht langs je bovenbenen.",
      "Houd je knieën licht gebogen en je rug neutraal.",
      "Duw je heupen gecontroleerd naar achteren.",
      "Zak tot je duidelijke spanning op de hamstrings voelt zonder je rug te ronden.",
      "Breng je heupen krachtig naar voren en kom gecontroleerd rechtop.",
    ],
  },
    "standing-calf-raise": {
    animationUrl: "/api/exercise-gif?id=1373",
    instructions: [
      "Plaats de bal van je voeten stevig op de verhoging.",
      "Houd je knieën licht gebogen maar stabiel.",
      "Laat je hielen gecontroleerd zakken voor een goede rek op de kuiten.",
      "Duw jezelf zo hoog mogelijk op je tenen.",
      "Span de kuiten bovenaan kort aan en laat daarna langzaam terugzakken.",
    ],
  },
    "incline-machine-press": {
    animationUrl: "/api/exercise-gif?id=0047",
    instructions: [
      "Stel de zitting zo af dat de handgrepen ter hoogte van je bovenborst staan.",
      "Houd je rug en billen stevig tegen de rugleuning.",
      "Duw de handgrepen gecontroleerd naar voren en omhoog.",
      "Houd je schouders laag en voorkom dat ze naar voren rollen.",
      "Laat het gewicht langzaam terugkomen en behoud spanning op de borst.",
    ],
  },
    "dumbbell-bench-press": {
    animationUrl: "/api/exercise-gif?id=0289",
    instructions: [
      "Zet je voeten stevig op de vloer en houd je bovenrug stabiel op de bank.",
      "Start met de dumbbells naast je borst en houd je polsen recht.",
      "Duw de dumbbells gecontroleerd omhoog.",
      "Breng de dumbbells bovenaan niet hard tegen elkaar.",
      "Laat ze langzaam zakken tot een comfortabele diepte en behoud spanning op de borst.",
    ],
  },
    "machine-shoulder-press": {
    animationUrl: "/api/exercise-gif?id=1456",
    instructions: [
      "Stel de zitting zo af dat de handgrepen ongeveer op schouderhoogte staan.",
      "Houd je rug en billen stevig tegen de rugleuning.",
      "Duw de handgrepen gecontroleerd omhoog.",
      "Houd je ellebogen in een natuurlijke positie en trek je schouders niet op.",
      "Laat het gewicht langzaam terugkomen tot een comfortabele diepte.",
    ],
  },
    "cable-lateral-raise": {
    animationUrl: "/api/exercise-gif?id=0178",
    instructions: [
      "Ga zijwaarts naast het kabelstation staan.",
      "Pak de handgreep met de hand die het verst van de kabel staat.",
      "Houd je romp stabiel en je elleboog licht gebogen.",
      "Breng je arm gecontroleerd zijwaarts omhoog tot ongeveer schouderhoogte.",
      "Laat de kabel langzaam terugkomen en houd spanning op de zijkant van je schouder.",
    ],
  },
    "overhead-triceps-extension": {
    animationUrl: "/api/exercise-gif?id=0194",
    instructions: [
      "Houd je romp stabiel en span je buik licht aan.",
      "Breng de kabel of handgreep achter je hoofd.",
      "Houd je bovenarmen zoveel mogelijk op hun plaats.",
      "Strek je ellebogen gecontroleerd tot je armen bijna volledig gestrekt zijn.",
      "Laat het gewicht langzaam terugkomen en voel de rek op de triceps.",
    ],
  },  
    "neutral-grip-lat-pulldown": {
  animationUrl: "/api/exercise-gif?id=0198",
    instructions: [
      "Pak de handgrepen vast met een neutrale greep.",
      "Houd je borst omhoog en je romp licht achterover.",
      "Trek je ellebogen gecontroleerd naar beneden langs je lichaam.",
      "Trek de handgrepen richting je bovenborst.",
      "Laat het gewicht langzaam terugkomen en behoud spanning op je rug.",
    ],
  },
    "chest-supported-tbar-row": {
    animationUrl: "/api/exercise-gif?id=0606",
    instructions: [
      "Plaats je borst stevig tegen het steunvlak.",
      "Houd je rug neutraal en je schouders laag.",
      "Trek de handgrepen gecontroleerd richting je romp.",
      "Trek je schouderbladen naar elkaar toe aan het einde van de beweging.",
      "Laat het gewicht langzaam zakken zonder je borst van het steunvlak te halen.",
    ],
  },
    "single-arm-cable-row": {
    animationUrl: "/api/exercise-gif?id=0214",
    instructions: [
      "Ga stabiel zitten en houd je romp recht.",
      "Pak de handgreep met één hand vast.",
      "Trek je elleboog gecontroleerd naar achteren langs je lichaam.",
      "Draai niet mee vanuit je romp; laat je rug het werk doen.",
      "Laat de kabel langzaam terugkomen en voel de rek in je rug.",
    ],
  },
    "lever-seated-reverse-fly": {
  animationUrl: "/api/exercise-gif?id=0601",
  instructions: [
    "Stel de zitting zo af dat de handgrepen ongeveer op schouderhoogte staan.",
    "Houd je borst stevig tegen het steunvlak.",
    "Pak de handgrepen vast en houd je ellebogen licht gebogen.",
    "Beweeg je armen gecontroleerd naar achteren en naar buiten.",
    "Knijp je schouderbladen kort samen en laat het gewicht langzaam terugkomen.",
  ],
},
    "hammer-curl": {
    animationUrl: "/api/exercise-gif?id=0312",
    instructions: [
      "Houd de dumbbells vast met je handpalmen naar elkaar toe.",
      "Houd je bovenarmen stil langs je lichaam.",
      "Buig je ellebogen en breng de dumbbells gecontroleerd omhoog.",
      "Houd je polsen neutraal en voorkom dat je met je romp zwaait.",
      "Laat de dumbbells langzaam zakken tot je armen bijna volledig gestrekt zijn.",
    ],
  },
   }; 