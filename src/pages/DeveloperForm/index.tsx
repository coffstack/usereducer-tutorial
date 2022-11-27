import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { LanguageQuestion } from "./components/LanguageQuestion";
import { NameQuestion } from "./components/NameQuestion";
import { RatingLanguagesQuestion } from "./components/RatingLanguagesQuestion";
import { Language, LanguageOptions } from "./types";

const languages: Language[] = [
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "C#", value: "csharp" },
];

const initialValues: LanguageOptions[] = languages.map((language) => ({
  language,
  selected: false,
  rating: 0,
}));

export function DeveloperForm() {
  const [name, setName] = useState("");
  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [languageOptions, setSelectedLanguages] =
    useState<LanguageOptions[]>(initialValues);

  function handleSelectedLanguage(langValue: string) {
    const newSelectedLanguages = languageOptions.map((langOp) => {
      if (langOp.language.value === langValue) {
        return { ...langOp, selected: !langOp.selected, rating: 0 };
      }
      return langOp;
    });
    setSelectedLanguages(newSelectedLanguages);
  }

  function handleRatingLanguage(langValue: string, rating: number | null) {
    const newSelectedLanguages = languageOptions.map((langOp) => {
      if (langOp.language.value === langValue) {
        return { ...langOp, rating: rating || 0 };
      }
      return langOp;
    });
    setSelectedLanguages(newSelectedLanguages);
  }

  useEffect(() => {
    const selectedLanguages = languageOptions.filter((lang) => lang.selected);
    const allLanguagesAreRated = selectedLanguages.every(
      (lang) => lang.rating > 0
    );
    setFormIsCompleted(
      name.length > 0 && selectedLanguages.length > 0 && allLanguagesAreRated
    );
  }, [name, languageOptions]);

  return (
    <div>
      <NameQuestion value={name} onChangeValue={setName} />
      <LanguageQuestion
        languageOptions={languageOptions}
        onSelectedLanguage={handleSelectedLanguage}
      />
      <RatingLanguagesQuestion
        languageOptions={languageOptions}
        onRatingLanguage={handleRatingLanguage}
      />
      <Button
        color="success"
        size="large"
        variant="contained"
        disabled={!formIsCompleted}
      >
        Enviar
      </Button>
    </div>
  );
}
