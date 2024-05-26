import { useNavigate, useRouteError } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  // Custom hook to get the error
  const { data, message } = useRouteError();

  const errorMessage = data || message;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <button onClick={handleGoBack}>&larr; Go back</button>
    </div>
  );
};

export default Error;
