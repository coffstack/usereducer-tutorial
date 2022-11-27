import { LanguageOptions } from "./types";

interface DeveloperFormState {
  name: string;
  languageOptions: LanguageOptions[];
  formIsCompleted: boolean;
}

export enum ActionTypes {
  UPDATE_NAME,
  SELECT_LANGUAGE,
  RATE_LANGUAGE,
}

type ActionUpdateName = {
  type: ActionTypes.UPDATE_NAME;
  payload: string;
};

type ActionSelectLanguage = {
  type: ActionTypes.SELECT_LANGUAGE;
  payload: string;
};

type ActionRateLanguage = {
  type: ActionTypes.RATE_LANGUAGE;
  payload: {
    langValue: string;
    rating: number | null;
  };
};

export function developerFormReducer(
  state: DeveloperFormState,
  action: ActionUpdateName | ActionSelectLanguage | ActionRateLanguage
): DeveloperFormState {
  switch (action.type) {
    case ActionTypes.UPDATE_NAME: {
      const newState = {
        ...state,
        name: action.payload,
      };
      return { ...newState, formIsCompleted: formIsCompleted(newState) };
    }
    case ActionTypes.SELECT_LANGUAGE: {
      const newState = {
        ...state,
        languageOptions: selectLanguage(state.languageOptions, action.payload),
      };

      return { ...newState, formIsCompleted: formIsCompleted(newState) };
    }
    case ActionTypes.RATE_LANGUAGE: {
      const newState = {
        ...state,
        languageOptions: rateLanguage(state.languageOptions, action.payload),
        formIsCompleted: formIsCompleted(state),
      };

      return { ...newState, formIsCompleted: formIsCompleted(newState) };
    }

    default: {
      return state;
    }
  }
}

function formIsCompleted(state: DeveloperFormState): boolean {
  const { languageOptions, name } = state;
  const selectedLanguages = languageOptions.filter((lang) => lang.selected);
  const allLanguagesAreRated = selectedLanguages.every(
    (lang) => lang.rating > 0
  );

  const isCompleted =
    name.length > 0 && selectedLanguages.length > 0 && allLanguagesAreRated;

  return isCompleted;
}

function selectLanguage(languageOptions: LanguageOptions[], langValue: string) {
  const newSelectedLanguages = languageOptions.map((langOp) => {
    if (langOp.language.value === langValue) {
      return { ...langOp, selected: !langOp.selected, rating: 0 };
    }
    return langOp;
  });
  return newSelectedLanguages;
}

function rateLanguage(
  languageOptions: LanguageOptions[],
  payload: {
    langValue: string;
    rating: number | null;
  }
) {
  const { langValue, rating } = payload;
  const newSelectedLanguages = languageOptions.map((langOp) => {
    if (langOp.language.value === langValue) {
      return { ...langOp, rating: rating || 0 };
    }
    return langOp;
  });
  return newSelectedLanguages;
}
