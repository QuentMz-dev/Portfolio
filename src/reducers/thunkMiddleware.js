const thunkMiddleware = (store) => (next) => (action) => {
  // Si l'action est une fonction alors...
  if (typeof action === "function") {
    // ... on execute cette fonction en lui fournissant le dispatch et le getState comme argument
    return action(store.dispatch, store.getState);
  }

  // Sinon on execute le processus classique
  return next(action);
};
