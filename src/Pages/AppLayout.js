import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import RightColumn from "../Components/RightColumn";

function AppLayout() {
  return (
    <Main>
      <Sidebar />
      <RightColumn />
    </Main>
  );
}

export default AppLayout;
