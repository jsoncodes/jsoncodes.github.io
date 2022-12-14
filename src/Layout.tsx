import { StaticImage } from "gatsby-plugin-image"
import React, { ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { defaultTheme } from "./theme"

type Props = { children: ReactNode }

const ProfileImage = () => {
  return (
    <StaticImage
      src="images/profile.jpg"
      alt="Jason Mitchell Profile"
      placeholder="blurred"
      layout="fixed"
      width={64}
      height={64}
      style={{ borderRadius: "50%" }}
    />
  )
}

export const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <main>
        <header>
          <ProfileImage />
          Jason Mitchell
        </header>
        {children}
      </main>
    </ThemeProvider>
  )
}
