import { Button, Box, Typography } from "@mui/material";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/utils/surge-global-logo-in-white.svg";

const UnAuthenticatedLandingView = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, #0f072c, #2e1b5b)`,
        backgroundSize: "cover",
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Box sx={{ paddingTop: "30px" }}>
        <Image src={logo} alt="APP logo" />
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          textAlign: "center",
          paddingTop: "200px",
          marginTop: "100px",
        }}
      >
        Login / Register to continue
      </Typography>
      <Box sx={{ paddingBottom: "300px" }}>
        <Button
          style={{ textTransform: "none" }}
          variant="contained"
          sx={{
            borderRadius: 0,
            backgroundColor: "#FF3841",
            color: "white",
            "&:hover": {
              backgroundColor: "#FF5364",
            },
          }}
          onClick={() => signIn("keycloak", { callbackUrl: "/dashboard" })}
        >
          Login
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="contained"
          sx={{
            borderRadius: 0,
            backgroundColor: "#FF3841",
            color: "white",
            "&:hover": {
              backgroundColor: "#FF5364",
            },
            marginLeft: "20px",
          }}
          href="/register"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default UnAuthenticatedLandingView;
