import React from "react";

import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import { Accordion } from "../../../components";
import { LanguageOptions } from "../types";

interface Props {
  languageOptions: LanguageOptions[];
  onRatingLanguage: (langValue: string, rating: number | null) => void;
}
export function RatingLanguagesQuestion({
  languageOptions,
  onRatingLanguage,
}: Props) {
  const selectedLanguages = languageOptions.filter((lang) => lang.selected);
  return (
    <Accordion title="Classifique as linguagens selecionadas">
      {selectedLanguages.map((op) => (
        <div
          key={op.language.value}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Rating
            value={op.rating}
            onChange={(e, value) => onRatingLanguage(op.language.value, value)}
          />
          <Typography>{op.language.name}</Typography>
        </div>
      ))}
    </Accordion>
  );
}
