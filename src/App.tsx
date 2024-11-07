import Main from "./desktop/Main";
import useResponsive from "./hooks/useResponsive"
import Mobile from "./mobile/Mobile";

function App() {
  const breakpoint = useResponsive([640, 2160]);
  return (
    <>
      { breakpoint === 0 && <Mobile />}
      { breakpoint === 1 && <Main />}
    </>
  )
}

export default App;