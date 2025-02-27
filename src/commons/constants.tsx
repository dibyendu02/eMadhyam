// export enum ProductType {
//   Plant = "Plant",
//   Flower = "Flower",
//   Fruit = "Fruit",
// }

export enum ProductSeason {
  Spring = "Spring",
  Summer = "Summer",
  Autumn = "Autumn",
  Winter = "Winter",
}

// export enum ProductColor {
//   DarkGreen = "Dark Green",
//   Gray = "Gray",
//   LightGreen = "Light Green",
//   Yellow = "Yellow",
// }

// export enum ProductPlantType {
//   AirPurifyingPlants = "Air Purifying Plants",
//   AromaticPlants = "Aromatic Plants",
//   CactiAndSucculents = "Cacti And Succulents",
//   FloweringPlants = "Flowering Plants",
//   HangingPlants = "Hanging Plants",
//   LowLightPlants = "Low Light Plants",
//   DroughtResistant = "Drought Resistant",
// }

// export enum ProductCategory {
//   IndoorPlants = "indoor-plants",
//   PotsAndPlanters = "pots-planters",
//   OutdoorPlants = "outdoor-plants",
// }

export enum PriceRange {
  zero = 0,
  oneHundred = 100,
  fiveHundred = 500,
  oneThousand = 1000,
  oneThousandFiveHundred = 1500,
  twoThousand = 2000,
  twoThousandFiveHundred = 2500,
  threeThousand = 3000,
  threeThousandFiveHundred = 3500,
  fourThousand = 4000,
  fourThousandFiveHundred = 4500,
  fiveThousand = 5000,
  fiveThousandFiveHundred = 5500,
  sixThousand = 6000,
  sixThousandFiveHundred = 6500,
  sevenThousand = 7000,
  sevenThousandFiveHundred = 7500,
  eightThousand = 8000,
  eightThousandFiveHundred = 8500,
  nineThousand = 9000,
  nineThousandFiveHundred = 9500,
}

export const PriceRanges = [
  { min: PriceRange.zero, max: PriceRange.fiveHundred },
  { min: PriceRange.fiveHundred, max: PriceRange.oneThousand },
  { min: PriceRange.oneThousand, max: PriceRange.oneThousandFiveHundred },
  { min: PriceRange.twoThousand, max: PriceRange.twoThousandFiveHundred },
  { min: PriceRange.threeThousand, max: PriceRange.threeThousandFiveHundred },
  { min: PriceRange.fourThousand, max: PriceRange.fourThousandFiveHundred },
  { min: PriceRange.fiveThousand, max: PriceRange.fiveThousandFiveHundred },
  { min: PriceRange.sixThousand, max: PriceRange.sixThousandFiveHundred },
  { min: PriceRange.sevenThousand, max: PriceRange.sevenThousandFiveHundred },
  { min: PriceRange.eightThousand, max: PriceRange.eightThousandFiveHundred },
  { min: PriceRange.nineThousand, max: PriceRange.nineThousandFiveHundred },
];
