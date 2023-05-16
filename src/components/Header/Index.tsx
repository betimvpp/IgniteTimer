import { HeaderContainer } from "./styles";
import IgLogo from '../../assets/IgLogo.svg'
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header () {
  return(
    <HeaderContainer>
      <img src={IgLogo} />
      <nav>
        <NavLink to="/"><Timer size={24}/></NavLink>
        <NavLink to="/history"><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContainer>
  )
}