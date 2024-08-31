import { Toaster } from 'react-hot-toast';

export const Toast: React.FC = () => {
	return (
		<Toaster
			position="bottom-right"
			toastOptions={{
				success: {
					style: { color: '#ffffff', backgroundColor: '#047857' },
					duration: 5000,
					iconTheme: {
						primary: 'white',
						secondary: 'black',
					},
				},
				loading: {
					duration: undefined,
					style: { color: '#ffffff', backgroundColor: '#1D4ED8' },
					iconTheme: {
						primary: 'blue',
						secondary: 'white',
					},
				},
				error: {
					duration: 2000,
					style: { color: '#ffffff', backgroundColor: '#B91C1C' },
					iconTheme: {
						primary: 'white',
						secondary: 'black',
					},
				},
			}}
		/>
	);
};
