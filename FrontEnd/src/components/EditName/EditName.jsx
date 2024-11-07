import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../Redux/authActions";

const EditName = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  // Gestion de l'affichage du formulaire ou du bouton
  const [isEditing, setIsEditing] = useState(false);

  // États pour les champs de nom
  const [newName, setNewName] = useState(profile?.userName || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  useEffect(() => {
    // Met à jour le nom d'utilisateur lorsqu'il change dans le profil
    if (profile?.userName) {
      setNewName(profile.userName);
    }
  }, [profile?.userName]);

  // Fonction de gestion de soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMessage("Le champ de l'UserName ne peut pas être vide.");
      return;
    }
    setErrorMessage("");

    console.log("Nom à mettre à jour:", newName);

    // Appelle l'action de mise à jour
    await dispatch(updateUserName(newName));

    // Affiche le message de succès
    setSuccessMessage("Nom mis à jour avec succès !");

    // Attendre un peu avant de fermer le formulaire
    setTimeout(() => {
      setIsEditing(false);
      setSuccessMessage("");
      setNewName(""); // Garder le nom actuel dans le champ
    }, 2000);
  };

  return (
    <div className="edit-name-container">
      {/* Si on est en mode édition, afficher le formulaire */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-name-form">
          <div>
            <label htmlFor="newName">UserName:</label>
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="firstName">FirstName:</label>
            <input
              type="text"
              id="firstName"
              value={profile?.firstName || ""}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lastName">LastName:</label>
            <input
              type="text"
              id="lastName"
              value={profile?.lastName || ""}
              readOnly
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      ) : (
        // si on n'est pas en mode édition, afficher le bouton "EditName"
        <button onClick={() => setIsEditing(true)}>Edit Name</button>
      )}
    </div>
  );
};

export default EditName;
