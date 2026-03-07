// @ts-expect-error - Expo vector icons types
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Category {
  id: string;
  nameIt: string;
  nameEn: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  // Essentials
  { id: 'food', nameIt: 'Alimentari', nameEn: 'Food & Groceries', icon: 'cart-outline', color: '#4CAF50' },
  { id: 'restaurant', nameIt: 'Ristoranti', nameEn: 'Restaurants', icon: 'silverware-fork-knife', color: '#FF9800' },
  { id: 'transport', nameIt: 'Trasporti', nameEn: 'Transportation', icon: 'car', color: '#2196F3' },
  { id: 'fuel', nameIt: 'Carburante', nameEn: 'Fuel', icon: 'gas-station', color: '#F44336' },
  { id: 'utilities', nameIt: 'Utenze', nameEn: 'Utilities', icon: 'lightning-bolt-outline', color: '#FFEB3B' },
  
  // Shopping
  { id: 'shopping', nameIt: 'Shopping', nameEn: 'Shopping', icon: 'shopping-bag-outline', color: '#9C27B0' },
  { id: 'clothing', nameIt: 'Abbigliamento', nameEn: 'Clothing', icon: 'tshirt-crew-outline', color: '#E91E63' },
  { id: 'electronics', nameIt: 'Elettronica', nameEn: 'Electronics', icon: 'cellphone', color: '#3F51B5' },
  { id: 'home', nameIt: 'Casa', nameEn: 'Home & Garden', icon: 'home-outline', color: '#795548' },
  
  // Personal
  { id: 'health', nameIt: 'Salute', nameEn: 'Health & Wellness', icon: 'medical-bag', color: '#00BCD4' },
  { id: 'entertainment', nameIt: 'Intrattenimento', nameEn: 'Entertainment', icon: 'movie-outline', color: '#FF5722' },
  { id: 'education', nameIt: 'Istruzione', nameEn: 'Education', icon: 'school-outline', color: '#607D8B' },
  { id: 'personal-care', nameIt: 'Cura Personale', nameEn: 'Personal Care', icon: 'face-outline', color: '#FFC107' },
  
  // Financial
  { id: 'insurance', nameIt: 'Assicurazione', nameEn: 'Insurance', icon: 'shield-outline', color: '#673AB7' },
  { id: 'fees', nameIt: 'Commissioni', nameEn: 'Fees & Charges', icon: 'bank-outline', color: '#9E9E9E' },
  
  // Other
  { id: 'other', nameIt: 'Altro', nameEn: 'Other', icon: 'dots-horizontal-circle-outline', color: '#808080' },
];

export function getCategoryById(id: string): Category | undefined {
  return DEFAULT_CATEGORIES.find(cat => cat.id === id);
}

export function getCategoryName(categoryId: string, language: 'it' | 'en'): string {
  const category = getCategoryById(categoryId);
  if (!category) return language === 'it' ? 'Sconosciuto' : 'Unknown';
  return language === 'it' ? category.nameIt : category.nameEn;
}

export function getCategoriesForLanguage(language: 'it' | 'en'): Array<{id: string; name: string; icon: any; color: string}> {
  return DEFAULT_CATEGORIES.map(cat => ({
    id: cat.id,
    name: language === 'it' ? cat.nameIt : cat.nameEn,
    icon: cat.icon,
    color: cat.color,
  }));
}
