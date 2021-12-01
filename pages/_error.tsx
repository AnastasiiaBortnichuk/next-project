import { NextPage } from 'next';

const Error: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  return (
    <p>{`An error ${statusCode || ''} occurred on  ${
      statusCode ? 'server' : 'client'
    }`}</p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
