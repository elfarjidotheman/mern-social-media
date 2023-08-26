import { Box } from "@mui/material";
import { env } from "config";

const UserImage = ({ image, size = "60px", mr=0 }) => {
  return (
    <Box width={size} height={size} mr={mr}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%"}}
        width={size}
        height={size}
        alt="user"
        src={`${env.serverEndpoint()}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
