"use client";

import { Box, Typography, AppBar, Toolbar, Link, Button } from "@mui/material/";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import image from "@/utils/surge-global-logo-in-white.svg";

const Header = () => {
  const { status } = useSession();
  return (
    <AppBar position="static">
      <Toolbar className={styles.bg}>
        <Typography>
          <Link
            href={"/"}
            style={{
              textDecoration: "none",
              color: "white",
              marginRight: "10px",
            }}
          >
            <Image src={image} style={{ width: "80px" }} alt="Surge" />
          </Link>
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex-right",
            float: "right",
            alignContent: "right",
            textAlign: "right",
          }}
        >
          {status === "authenticated" ? (
            <Typography
              style={{
                textDecoration: "none",
                color: "white",
                display: "inline-block",
              }}
            >
              <Button
                href={"/dashboard"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={async () => await signOut({ callbackUrl: "/" })}
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Logout
              </Button>
            </Typography>
          ) : (
            <>
              <Typography
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                }}
              >
                <Button
                  href={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Home
                </Button>
                <Button
                  onClick={async () => await signIn("keycloak")}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Login
                </Button>
              </Typography>

              <Typography
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                }}
              >
                <Link
                  href={"/register"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
