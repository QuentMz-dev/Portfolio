const ERRORS = {
  empty: "",
  field: "Certains champs sont incorrects",
  already: "Ce cour existe déjà",
  full: "Ce cours est complet ..!",
  unauthorized:
    "Vous n'êtes pas autorisé à poursuivre cette action. Veuillez vous reconnecter",
  suscribe: "Connectez vous pour rejoindres ce cour.",
  loginFail: "Identifiants incorrects",
  emailExist: "L'adresse mail existe déjà",
  confirmPassword: "Les mots de passe ne sont pas identiques",
  cguInvalid: "Veuillez accepter les CGU",
  a: "a",
};

export const translateError = (message, mc) => {
  switch (message) {
    case "incorrect_data":
      return <p className={mc.error}>{ERRORS.field}</p>;

    case "lesson_already_exist":
      return <p className={mc.error}>{ERRORS.already}</p>;

    case "unauthorized":
      return <p className={mc.error}>{ERRORS.unauthorized}</p>;

    case "lesson_full":
      return <p className={mc.error}>{ERRORS.full}</p>;
    case "login_failed":
      return <p className={mc.error}>{ERRORS.loginFail}</p>;
    case "email_already_exist":
      return <p className={mc.error}>{ERRORS.emailExist}</p>;
    case "incorrect_confirm_password":
      return <p className={mc.error}>{ERRORS.confirmPassword}</p>;
    case "cgu_invalid":
      return <p className={mc.error}>{ERRORS.cguInvalid}</p>;

    default:
      return ERRORS.empty;
  }
};

// SetError a définir ..... initial => UseState("")
