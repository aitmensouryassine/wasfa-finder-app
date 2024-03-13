import { useRouteError } from 'react-router-dom';

function Error() {
  console.error(useRouteError());
  return <div>Error Page</div>;
}

export default Error;
