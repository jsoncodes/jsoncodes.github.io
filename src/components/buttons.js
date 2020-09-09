import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// https://colors.lol/beauish
const green = '#47C072';
const pink = '#FF0789';
const orange = '#FCB005';

const accent = pink;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: ${accent};
  border: 2px solid ${accent};
  border-radius: 4px;
  padding: 0.25em 0.75em;
  font-size: 0.75em;
`
