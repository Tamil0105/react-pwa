import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
	import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
		default: d.ReactQueryDevtools,
	})),
);

function App() {
	const [showDevtools, setShowDevtools] = React.useState(false);

	React.useEffect(() => {
		// @ts-expect-error
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}  />
			{/* <ReactQueryDevtools initialIsOpen /> */}
			{showDevtools && (
				<React.Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</React.Suspense>
			)}
		</QueryClientProvider>
	);
}

export default App;
