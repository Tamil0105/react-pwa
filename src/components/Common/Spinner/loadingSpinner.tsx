// import { CgSpinner } from 'react-icons/cg';
import './loader.css';
type Props = {
	text?: string;
	opacity?: string;
	background?: string;
	display?: string;
	className?: string;
	list?: string;
};

export const LoadingSpinner: React.FC<Props> = ({
	text,
	opacity = 'opacity-100',
	background = '',
	display = 'flex',
	className,
	list,
}) => {
	return (
		<div
			className={`rounded-2xl z-[100] ${display} items-center justify-center ${
				list === 'list' ? 'h-24' : list === 'grid' ? 'h-42' : 'h-full'
			} w-full  fade-in  ${background} ${opacity} ${className}`}
		>
			<div className="flex items-center">
				{/* <CgSpinner className="w-8 h-8 animate-spin text-primary" /> */}
				{/* <div className="spinner"></div> */}
				<p className="text-sm font-medium m-2">{text ?? 'Loading...'}</p>
			</div>
		</div>
	);
};
