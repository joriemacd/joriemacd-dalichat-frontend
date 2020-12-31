import React from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../generic/Button';
import HeaderImage from '../../layout/HeaderImage';

import { generateMetaTitleFromPage } from '../../../constants';
import './Fallback.scss';

const Fallback = ({
  user, history, location, match,
}) => (
  <div id="fallback-container">
    <Helmet>
      <title>{generateMetaTitleFromPage('Page Not Found')}</title>
    </Helmet>

    <HeaderImage
      backgroundUrl={user?.backgroundUrl}
      className="fallback-header-image"
    />

    <main id="fallback-content-container">
      <h1>404</h1>
      <h2>This isn&apos;t a page :\</h2>
      <Button
        label="Go Home"
        onClick={() => history.push('/')}
      />
    </main>
    {/* <div>Uh oh... URL Not Found! Please contact the system administrator.</div> */}
  </div>
);

export default Fallback;
