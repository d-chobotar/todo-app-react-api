import React from 'react';

import { ThemeProvider } from "./ThemeProvider";
import { ContainerComponent } from './ContainerComponent';


//create your first component
const Home = () => {
	return (
		<ThemeProvider>
			<ContainerComponent />
		</ThemeProvider>
	);
};

export default Home;
