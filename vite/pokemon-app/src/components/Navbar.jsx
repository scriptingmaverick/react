// const createNavElements = (types, currentType) =>
//   types.map(
//     (type) => [A, {
//       id: type,
//       class: type === currentType ? type : "",
//       style: `color: ${type === currentType ? "white" : ""}`,
//     }, type],
//   );

// export const createNavigation = (types, currentType) =>
//   createFragment([
//     NAV,
//     {

//       class: "sidebar flex flex-col overflow-scroll",
//       id: "navbar",
//     },
//     ...createNavElements(types, currentType),
//   ]);

const NavElement = ({ type, currentType, handler }) => (
  <a
    onClick={handler}
    id={type}
    className={type === currentType ? type : ""}
    style={{ color: type === currentType ? "white" : "" }}
  >
    {type}
  </a>
);

const Navbar = ({ types, currentType, handleClick }) => {
  return (
    <nav className="sidebar flex flex-col overflow-scroll" id="navbar">
      {types.map((type, i) => (
        <NavElement
          key={i}
          type={type}
          currentType={currentType}
          handler={handleClick}
        />
      ))}
    </nav>
  );
};

export default Navbar;
