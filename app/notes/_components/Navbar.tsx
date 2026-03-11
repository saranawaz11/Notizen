import React from 'react'

type Props =  {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export default function Navbar(
    {isCollapsed, onResetWidth} : Props
) {
  return (
    <div>Navbar</div>
  )
}
