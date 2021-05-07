import SpaceXList from './components/spaceX/SpaceXList';
import SpaceXSearchBar from './components/spaceX/SpaceXSearchBar';
import SpaceXFilterBar from './components/spaceX/SpaceXFilterBar';

function App() {
  return (
    <div className="p-2 p-md-5">
      <SpaceXSearchBar />
      <SpaceXFilterBar />
      <SpaceXList />
    </div>
  );
}

export default App;
