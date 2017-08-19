import React from 'legacy/react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './legacy/react/main';

// Render the app.
ReactDOM.render(
	<App />,
	document.getElementById('app')
);