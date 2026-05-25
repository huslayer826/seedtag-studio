import type { StarterCrop } from "../lib/types";

export const starterCrops: StarterCrop[] = [
  {
    starterId: "tomato-cherry",
    plantName: "Tomato",
    variety: "Cherry mix",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "24-36 in",
    sowTransplantNotes: "Start indoors 6-8 weeks before last frost. Transplant after nights stay above 50 F.",
    priceDonation: "$4 donation",
    careUrl: "/care/tomato-cherry",
    daysToMaturity: "60-75 days",
    summary: "Reliable plant sale favorite with compact, high-yielding fruit.",
    taskOffsets: [
      { id: "tomato-start", label: "Start tomato seeds indoors", daysFromLastFrost: -49, phase: "start" },
      { id: "tomato-harden", label: "Harden off tomato starts", daysFromLastFrost: -7, phase: "care" },
      { id: "tomato-transplant", label: "Transplant tomato starts", daysFromLastFrost: 10, phase: "transplant" }
    ]
  },
  {
    starterId: "pepper-sweet",
    plantName: "Pepper",
    variety: "Sweet bell",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "18-24 in",
    sowTransplantNotes: "Start indoors 8-10 weeks before last frost. Keep warm for germination.",
    priceDonation: "$4 donation",
    careUrl: "/care/sweet-pepper",
    daysToMaturity: "70-85 days",
    summary: "Slow starter that benefits from early indoor sowing.",
    taskOffsets: [
      { id: "pepper-start", label: "Start pepper seeds indoors", daysFromLastFrost: -63, phase: "start" },
      { id: "pepper-potup", label: "Pot up pepper seedlings", daysFromLastFrost: -28, phase: "care" },
      { id: "pepper-transplant", label: "Transplant peppers outdoors", daysFromLastFrost: 14, phase: "transplant" }
    ]
  },
  {
    starterId: "basil-genovese",
    plantName: "Basil",
    variety: "Genovese",
    type: "herb",
    sun: "full sun",
    water: "moderate",
    spacing: "10-12 in",
    sowTransplantNotes: "Start indoors 4-6 weeks before last frost or direct sow after soil warms.",
    priceDonation: "$3 donation",
    careUrl: "/care/basil",
    daysToMaturity: "65 days",
    summary: "Classic culinary herb for summer plant sales.",
    taskOffsets: [
      { id: "basil-start", label: "Start basil indoors", daysFromLastFrost: -35, phase: "start" },
      { id: "basil-transplant", label: "Transplant basil after warm nights", daysFromLastFrost: 14, phase: "transplant" }
    ]
  },
  {
    starterId: "lettuce-butterhead",
    plantName: "Lettuce",
    variety: "Butterhead",
    type: "vegetable",
    sun: "part sun",
    water: "consistent",
    spacing: "8-10 in",
    sowTransplantNotes: "Direct sow or transplant in cool weather. Succession sow every 2 weeks.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/lettuce",
    daysToMaturity: "45-55 days",
    summary: "Quick cool-season crop for swaps and spring sales.",
    taskOffsets: [
      { id: "lettuce-start", label: "Start lettuce indoors or under cover", daysFromLastFrost: -35, phase: "start" },
      { id: "lettuce-direct", label: "Direct sow lettuce", daysFromLastFrost: -21, phase: "direct-sow" }
    ]
  },
  {
    starterId: "kale-lacinato",
    plantName: "Kale",
    variety: "Lacinato",
    type: "vegetable",
    sun: "full sun",
    water: "moderate",
    spacing: "18-24 in",
    sowTransplantNotes: "Start 4-6 weeks before last frost or direct sow in early spring.",
    priceDonation: "$3 donation",
    careUrl: "/care/kale",
    daysToMaturity: "55-65 days",
    summary: "Hardy green that anchors early-season plant starts.",
    taskOffsets: [
      { id: "kale-start", label: "Start kale indoors", daysFromLastFrost: -42, phase: "start" },
      { id: "kale-transplant", label: "Transplant kale", daysFromLastFrost: -14, phase: "transplant" }
    ]
  },
  {
    starterId: "cucumber-marketmore",
    plantName: "Cucumber",
    variety: "Marketmore",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "12 in on trellis",
    sowTransplantNotes: "Direct sow after frost or start 2-3 weeks early. Avoid root disturbance.",
    priceDonation: "$3 donation",
    careUrl: "/care/cucumber",
    daysToMaturity: "58 days",
    summary: "Space-saving trellis crop for summer gardeners.",
    taskOffsets: [
      { id: "cucumber-start", label: "Start cucumbers in pots", daysFromLastFrost: -18, phase: "start" },
      { id: "cucumber-direct", label: "Direct sow cucumbers", daysFromLastFrost: 7, phase: "direct-sow" }
    ]
  },
  {
    starterId: "zucchini-black-beauty",
    plantName: "Zucchini",
    variety: "Black Beauty",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "36-48 in",
    sowTransplantNotes: "Direct sow after frost or start 2 weeks early in deep pots.",
    priceDonation: "$3 donation",
    careUrl: "/care/zucchini",
    daysToMaturity: "50 days",
    summary: "Productive summer squash for warm garden beds.",
    taskOffsets: [
      { id: "zucchini-start", label: "Start zucchini in pots", daysFromLastFrost: -14, phase: "start" },
      { id: "zucchini-direct", label: "Direct sow zucchini", daysFromLastFrost: 7, phase: "direct-sow" }
    ]
  },
  {
    starterId: "bean-bush",
    plantName: "Bean",
    variety: "Bush green",
    type: "vegetable",
    sun: "full sun",
    water: "moderate",
    spacing: "4-6 in",
    sowTransplantNotes: "Direct sow after soil warms. Make repeat sowings for steady harvest.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/bush-bean",
    daysToMaturity: "50-60 days",
    summary: "Easy direct-sow seed packet for beginner gardeners.",
    taskOffsets: [
      { id: "bean-direct", label: "Direct sow bush beans", daysFromLastFrost: 10, phase: "direct-sow" }
    ]
  },
  {
    starterId: "pea-snap",
    plantName: "Pea",
    variety: "Sugar snap",
    type: "vegetable",
    sun: "full sun",
    water: "moderate",
    spacing: "2-3 in",
    sowTransplantNotes: "Direct sow as soon as soil can be worked. Provide a trellis.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/snap-pea",
    daysToMaturity: "60-70 days",
    summary: "Cool-season seed swap staple.",
    taskOffsets: [
      { id: "pea-direct", label: "Direct sow snap peas", daysFromLastFrost: -35, phase: "direct-sow" }
    ]
  },
  {
    starterId: "carrot-nantes",
    plantName: "Carrot",
    variety: "Nantes",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "2-3 in",
    sowTransplantNotes: "Direct sow in loose soil. Keep evenly moist until germination.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/carrot",
    daysToMaturity: "65 days",
    summary: "Classic seed library packet with simple care notes.",
    taskOffsets: [
      { id: "carrot-direct", label: "Direct sow carrots", daysFromLastFrost: -21, phase: "direct-sow" }
    ]
  },
  {
    starterId: "beet-detroit",
    plantName: "Beet",
    variety: "Detroit Dark Red",
    type: "vegetable",
    sun: "full sun",
    water: "moderate",
    spacing: "3-4 in",
    sowTransplantNotes: "Direct sow 2-4 weeks before last frost. Thin seedlings for root size.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/beet",
    daysToMaturity: "55-60 days",
    summary: "Reliable spring and fall seed packet.",
    taskOffsets: [
      { id: "beet-direct", label: "Direct sow beets", daysFromLastFrost: -21, phase: "direct-sow" }
    ]
  },
  {
    starterId: "radish-french-breakfast",
    plantName: "Radish",
    variety: "French Breakfast",
    type: "vegetable",
    sun: "full sun",
    water: "consistent",
    spacing: "1-2 in",
    sowTransplantNotes: "Direct sow in cool weather. Harvest young for best texture.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/radish",
    daysToMaturity: "25 days",
    summary: "Fast germinating packet for workshops and kids tables.",
    taskOffsets: [
      { id: "radish-direct", label: "Direct sow radishes", daysFromLastFrost: -14, phase: "direct-sow" }
    ]
  },
  {
    starterId: "spinach-bloomsdale",
    plantName: "Spinach",
    variety: "Bloomsdale",
    type: "vegetable",
    sun: "part sun",
    water: "consistent",
    spacing: "4-6 in",
    sowTransplantNotes: "Direct sow early spring or fall. Prefers cool soil.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/spinach",
    daysToMaturity: "40-50 days",
    summary: "Cool-weather green for seed libraries.",
    taskOffsets: [
      { id: "spinach-direct", label: "Direct sow spinach", daysFromLastFrost: -28, phase: "direct-sow" }
    ]
  },
  {
    starterId: "cilantro-slow-bolt",
    plantName: "Cilantro",
    variety: "Slow bolt",
    type: "herb",
    sun: "part sun",
    water: "consistent",
    spacing: "6-8 in",
    sowTransplantNotes: "Direct sow in cool weather. Succession sow because plants bolt in heat.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/cilantro",
    daysToMaturity: "45 days",
    summary: "Useful herb with concise succession notes.",
    taskOffsets: [
      { id: "cilantro-direct", label: "Direct sow cilantro", daysFromLastFrost: -21, phase: "direct-sow" }
    ]
  },
  {
    starterId: "parsley-italian",
    plantName: "Parsley",
    variety: "Italian flat leaf",
    type: "herb",
    sun: "part sun",
    water: "moderate",
    spacing: "8-10 in",
    sowTransplantNotes: "Start indoors 8-10 weeks before last frost. Germination can be slow.",
    priceDonation: "$3 donation",
    careUrl: "/care/parsley",
    daysToMaturity: "70-90 days",
    summary: "Long-season herb that benefits from a volunteer timeline.",
    taskOffsets: [
      { id: "parsley-start", label: "Start parsley indoors", daysFromLastFrost: -63, phase: "start" },
      { id: "parsley-transplant", label: "Transplant parsley", daysFromLastFrost: 0, phase: "transplant" }
    ]
  },
  {
    starterId: "dill-bouquet",
    plantName: "Dill",
    variety: "Bouquet",
    type: "herb",
    sun: "full sun",
    water: "moderate",
    spacing: "8-12 in",
    sowTransplantNotes: "Direct sow after frost. Repeat sowings keep fresh leaves coming.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/dill",
    daysToMaturity: "40-60 days",
    summary: "Pollinator-friendly herb for seed packets.",
    taskOffsets: [
      { id: "dill-direct", label: "Direct sow dill", daysFromLastFrost: 0, phase: "direct-sow" }
    ]
  },
  {
    starterId: "marigold-french",
    plantName: "Marigold",
    variety: "French mix",
    type: "flower",
    sun: "full sun",
    water: "moderate",
    spacing: "8-10 in",
    sowTransplantNotes: "Start 4-6 weeks before last frost or direct sow after frost.",
    priceDonation: "$3 donation",
    careUrl: "/care/marigold",
    daysToMaturity: "50 days to bloom",
    summary: "Bright, compact annual for pollinator tables.",
    taskOffsets: [
      { id: "marigold-start", label: "Start marigolds indoors", daysFromLastFrost: -35, phase: "start" },
      { id: "marigold-transplant", label: "Transplant marigolds", daysFromLastFrost: 7, phase: "transplant" }
    ]
  },
  {
    starterId: "zinnia-cut",
    plantName: "Zinnia",
    variety: "Cut flower mix",
    type: "flower",
    sun: "full sun",
    water: "moderate",
    spacing: "9-12 in",
    sowTransplantNotes: "Direct sow after frost or start 4 weeks early. Deadhead for more blooms.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/zinnia",
    daysToMaturity: "75 days to bloom",
    summary: "High-color annual for seed swaps and plant sales.",
    taskOffsets: [
      { id: "zinnia-start", label: "Start zinnias indoors", daysFromLastFrost: -28, phase: "start" },
      { id: "zinnia-direct", label: "Direct sow zinnias", daysFromLastFrost: 7, phase: "direct-sow" }
    ]
  },
  {
    starterId: "calendula-pacific",
    plantName: "Calendula",
    variety: "Pacific Beauty",
    type: "flower",
    sun: "full sun",
    water: "moderate",
    spacing: "10-12 in",
    sowTransplantNotes: "Direct sow in cool weather or start 4 weeks before last frost.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/calendula",
    daysToMaturity: "55-60 days to bloom",
    summary: "Cool-season edible flower for club workshops.",
    taskOffsets: [
      { id: "calendula-direct", label: "Direct sow calendula", daysFromLastFrost: -14, phase: "direct-sow" }
    ]
  },
  {
    starterId: "nasturtium-jewel",
    plantName: "Nasturtium",
    variety: "Jewel mix",
    type: "flower",
    sun: "full sun",
    water: "low",
    spacing: "10-12 in",
    sowTransplantNotes: "Direct sow after frost. Soak seed overnight to speed germination.",
    priceDonation: "$2 seed packet",
    careUrl: "/care/nasturtium",
    daysToMaturity: "55-65 days to bloom",
    summary: "Easy edible flower with low water needs.",
    taskOffsets: [
      { id: "nasturtium-direct", label: "Direct sow nasturtiums", daysFromLastFrost: 7, phase: "direct-sow" }
    ]
  },
  {
    starterId: "coneflower-purple",
    plantName: "Purple coneflower",
    variety: "Open-pollinated",
    type: "native",
    sun: "full sun",
    water: "low",
    spacing: "18-24 in",
    sowTransplantNotes: "Surface sow or cold-stratify when seed source recommends it. Use local ecotype when available.",
    priceDonation: "$4 donation",
    careUrl: "/care/purple-coneflower",
    daysToMaturity: "Perennial",
    summary: "General native-plant table example; choose regionally appropriate seed.",
    taskOffsets: [
      { id: "coneflower-start", label: "Start coneflower flats", daysFromLastFrost: -70, phase: "start" },
      { id: "coneflower-transplant", label: "Transplant coneflower plugs", daysFromLastFrost: 21, phase: "transplant" }
    ]
  },
  {
    starterId: "rudbeckia-black-eyed-susan",
    plantName: "Black-eyed Susan",
    variety: "Open-pollinated",
    type: "native",
    sun: "full sun",
    water: "moderate",
    spacing: "18 in",
    sowTransplantNotes: "Start in flats 6-8 weeks before planting out. Keep seed barely covered.",
    priceDonation: "$4 donation",
    careUrl: "/care/black-eyed-susan",
    daysToMaturity: "Perennial",
    summary: "Adaptable native-plant sale example for sunny beds.",
    taskOffsets: [
      { id: "rudbeckia-start", label: "Start black-eyed Susan flats", daysFromLastFrost: -56, phase: "start" },
      { id: "rudbeckia-transplant", label: "Transplant black-eyed Susan plugs", daysFromLastFrost: 14, phase: "transplant" }
    ]
  },
  {
    starterId: "bee-balm",
    plantName: "Bee balm",
    variety: "Monarda mix",
    type: "native",
    sun: "full sun",
    water: "moderate",
    spacing: "18-24 in",
    sowTransplantNotes: "Use local guidance for seed treatment. Divide mature clumps for sale starts.",
    priceDonation: "$5 donation",
    careUrl: "/care/bee-balm",
    daysToMaturity: "Perennial",
    summary: "Pollinator plant example with notes for local sourcing.",
    taskOffsets: [
      { id: "bee-balm-pot", label: "Pot up bee balm divisions", daysFromLastFrost: -21, phase: "care" },
      { id: "bee-balm-ready", label: "Harden off bee balm starts", daysFromLastFrost: 7, phase: "care" }
    ]
  },
  {
    starterId: "aster-native",
    plantName: "Aster",
    variety: "Native meadow mix",
    type: "native",
    sun: "full sun",
    water: "moderate",
    spacing: "18-24 in",
    sowTransplantNotes: "Follow local seed-source instructions. Label clearly for fall blooms and pollinators.",
    priceDonation: "$4 donation",
    careUrl: "/care/native-aster",
    daysToMaturity: "Perennial",
    summary: "General non-invasive native meadow example.",
    taskOffsets: [
      { id: "aster-start", label: "Start native aster flats", daysFromLastFrost: -56, phase: "start" },
      { id: "aster-transplant", label: "Transplant native aster plugs", daysFromLastFrost: 21, phase: "transplant" }
    ]
  },
  {
    starterId: "thyme-common",
    plantName: "Thyme",
    variety: "Common",
    type: "herb",
    sun: "full sun",
    water: "low",
    spacing: "8-12 in",
    sowTransplantNotes: "Start indoors 8-10 weeks before last frost. Prefers lean, well-drained soil.",
    priceDonation: "$3 donation",
    careUrl: "/care/thyme",
    daysToMaturity: "90 days",
    summary: "Compact herb with drought-tolerant care notes.",
    taskOffsets: [
      { id: "thyme-start", label: "Start thyme indoors", daysFromLastFrost: -63, phase: "start" },
      { id: "thyme-transplant", label: "Transplant thyme", daysFromLastFrost: 14, phase: "transplant" }
    ]
  }
];

