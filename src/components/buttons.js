import styled from 'styled-components'
import { Link } from 'gatsby'
import { accent } from 'utils/palette'

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: ${accent};
  border: 2px solid ${accent};
  border-radius: 4px;
  padding: 0.25em 0.75em;
  font-size: 0.75em;
  white-space: nowrap;
`
