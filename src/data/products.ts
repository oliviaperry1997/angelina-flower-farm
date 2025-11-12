// Product catalog data for the flower shop
export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  gradientColors: string;
}

export const products: Product[] = [
  {
    id: 'seasonal-bouquet',
    nameKey: 'seasonalBouquet',
    descriptionKey: 'seasonalBouquetDesc',
    price: 35,
    gradientColors: 'from-pink-200 to-purple-200'
  },
  {
    id: 'sunflower-bundle',
    nameKey: 'sunflowerBundle',
    descriptionKey: 'sunflowerBundleDesc',
    price: 28,
    gradientColors: 'from-yellow-200 to-orange-200'
  },
  {
    id: 'rose-collection',
    nameKey: 'roseCollection',
    descriptionKey: 'roseCollectionDesc',
    price: 45,
    gradientColors: 'from-red-200 to-pink-200'
  },
  {
    id: 'wildflower-mix',
    nameKey: 'wildflowerMix',
    descriptionKey: 'wildflowerMixDesc',
    price: 32,
    gradientColors: 'from-blue-200 to-indigo-200'
  },
  {
    id: 'dahlia-delight',
    nameKey: 'dahliaDelight',
    descriptionKey: 'dahliaDelightDesc',
    price: 40,
    gradientColors: 'from-purple-200 to-pink-200'
  },
  {
    id: 'garden-greens',
    nameKey: 'gardenGreens',
    descriptionKey: 'gardenGreensDesc',
    price: 25,
    gradientColors: 'from-green-200 to-teal-200'
  }
];