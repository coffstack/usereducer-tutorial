import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { Accordion } from "../../../components";
import { LanguageOptions } from "../types";

interface Props {
  languageOptions: LanguageOptions[];
  onSelectedLanguage: (langValue: string) => void;
}
export function LanguageQuestion({
  languageOptions,
  onSelectedLanguage,
}: Props) {
  return (
    <Accordion title="Em quais dessas linguagens você programa?">
      {languageOptions.map((langOp) => (
        <div
          key={langOp.language.value}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={langOp.selected}
            onClick={() => onSelectedLanguage(langOp.language.value)}
          />
          <Typography>{langOp.language.name}</Typography>
        </div>
      ))}
    </Accordion>
  );
}
