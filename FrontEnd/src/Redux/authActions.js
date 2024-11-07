import {
  loginStart,
  loginSuccess,
  infoUser,
  loginFailure,
} from "../Redux/authSlice";

export const checkAuthOnPageLoad = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(loginSuccess({ token }));
    dispatch(fetchUserProfile(token));
  }
};

export const login = (credential) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    const data = await response.json();
    console.log("Données API après login:", data); // Vérifie la réponse API complète

    if (response.ok) {
      if (data.body && data.body.token) {
        const token = data.body.token;
        console.log("Token reçu:", token); // Vérifie la valeur du token

        // Stocke le token dans le state et dans le localStorage
        localStorage.setItem("token", token); // Sauvegarde du token dans le localStorage

        // Déclenche l'action pour stocker le token dans le state
        dispatch(loginSuccess({ token })); // On ne connaît pas encore le profil

        // Récupère le profil utilisateur après le login
        dispatch(fetchUserProfile(token)); // Appelle l'action pour récupérer le profil
      } else {
        console.error("Le token n'est pas disponible dans la réponse API");
        dispatch(loginFailure("Le token est manquant"));
      }
    } else {
      dispatch(loginFailure(data.message || "Erreur lors de la connexion"));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
// **NOUVELLE ACTION** pour récupérer le profil utilisateur

export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token pour l'authentification
      },
    });

    const data = await response.json();
    console.log("Response Status:", response.status); // Log du statut de réponse
    console.log("Response Data:", data); // Log des données reçues

    if (response.ok) {
      if (data.body) {
        dispatch(infoUser({ profile: data.body })); // Ajoute les données du profil au store
      }
    } else {
      dispatch(
        loginFailure(data.message || "Erreur los de la récupération du profile")
      );
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const updateUserName = (newName) => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newName }),
    });

    const data = await response.json();
    console.log("Réponse du serveur:", data); // Affiche la réponse pour vérifier les données reçues
    if (response.ok && data.body) {
      dispatch(infoUser({ profile: { ...data.body } }));
      console.log("Profil mis à jour dans Redux:", data.body);
    } else {
      console.error(
        "Erreur dans la mise à jour:",
        data.message || "Erreur lors de la mise à jour du profil"
      );
      dispatch(
        loginFailure(data.message || "Erreur lors de la mise à jour du profile")
      );
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
