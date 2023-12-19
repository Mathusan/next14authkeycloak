import { getAccessToken } from "@/utils/sessionTokenAccess";
import { Typography } from "@mui/material";
import axios from "axios";

async function getProtected() {
  try {
    const accessToken = await getAccessToken();
    const res = await axios.get(
      `${process.env.BACKEND_URL}/auth/protected` as string,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const Dashboard = async () => {
  const protectedData = await getProtected();
  return <Typography variant="h4">{protectedData}</Typography>;
};

export default Dashboard;
