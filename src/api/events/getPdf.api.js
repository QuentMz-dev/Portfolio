import axios from "axios";
import { toggleBooleanView } from "../../reducers/viewSlice";

export const readPdfThunk = () => {
  return async (dispatch) => {
    dispatch(toggleBooleanView({ key: "loading" }));

    try {
      const response = await axios.get(
        "http://localhost:7001/pdf/download-pdf",
        {
          responseType: "blob", // Spécifiez le type de réponse comme étant un blob
        }
      );

      if (response.status === 200) {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", "CV_quentin_dev23.pdf"); // Nom du fichier à télécharger
        document.body.appendChild(link);
        link.click();
      } else {
        console.error(
          "Erreur lors du téléchargement du PDF :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
    }

    dispatch(toggleBooleanView({ key: "loading" }));
  };
};
