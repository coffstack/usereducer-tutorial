import React from "react";

import TextField from "@mui/material/TextField";
import { Accordion } from "../../../components";

interface Props {
  value: string;
  onChangeValue: (value: string) => void;
}
export function NameQuestion({ value, onChangeValue }: Props) {
  return (
    <Accordion title="Qual o seu Nome">
      <TextField
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        id="outlined-basic"
        label="Nome"
        variant="outlined"
      />
    </Accordion>
  );
}
