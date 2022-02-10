import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkStyled = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
