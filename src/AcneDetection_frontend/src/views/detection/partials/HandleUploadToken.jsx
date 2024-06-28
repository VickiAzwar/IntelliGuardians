import formatUserData from "../../../helpers/formatUserData";
import { message } from "antd";
import detect from "../../../utils/detect";

const HandleUploadToken = async (actor, dataUser, setDataUser, imageRef, model, canvasRef) => {
    if (dataUser.token > 0 || dataUser.status === 1) {
        if (dataUser.status !== 1) {
          const updatedUserArray = await actor.deduct_token(dataUser.id);
          if (updatedUserArray.length > 0) {
            const updatedUser = updatedUserArray[0]; // Mengakses elemen pertama dari array
            const formatData = formatUserData(updatedUser);
            setDataUser(formatData);
          } else {
            message.warning("Failed to deduct token.");
            return;
          }
        }
        detect(imageRef.current, model, canvasRef.current);
      } else {
        message.error("Unsufficient tokens.");
      };
};

export default HandleUploadToken;
