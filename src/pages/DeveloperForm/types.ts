export interface Language {
  name: string;
  value: string;
}

export interface LanguageOptions {
  language: Language;
  rating: number;
  selected: boolean;
}
