
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Registro } from '../pages/Registro';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/registro" element={<Registro />} />
				
			</Routes>
		</BrowserRouter>
	);
};
