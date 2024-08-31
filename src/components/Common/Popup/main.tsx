import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import { cn } from '../../../utils/constants/cn';

type Props = {
	children: any;
	height?: string;
	width?: string;
	ref?: any;
	onClose: () => void;
	onCancel?: () => void;
	closeButton?: boolean;
	className?: string;
	loading?: boolean;
};

export const Popup = ({
	ref,
	height,
	width,
	children,
	onClose,
	onCancel,
	closeButton = false,
	className = '',
	loading = false,
}: Props): React.ReactPortal | null => {
	return ReactDOM.createPortal(
		<div
			ref={loading === false ? ref : null}
			className="fixed inset-0 flex items-center justify-center  p-0 md:p-3 scrollbar overflow-y-auto z-100"
			style={{
				background: 'rgba(0, 0, 0, 0.62)',
				zIndex: 1002,
			}}
			onClick={() => {
				if (!loading) onClose();
			}}
		>
			<motion.div
				className={cn(
					'relative rounded-xl bg-white',
					'w-full max-w-sm md:max-w-xl   lg:max-w-2xl md:top-0 top-36', 
					'min-h-100px md:min-h-200px', 
					className
				)}
				style={{
					height,
					width,
				}}
				onClick={(e) => e.stopPropagation()}
				variants={{
					initial: { y: 50, opacity: 0.8 },
					visible: { y: 0, opacity: 1 },
				}}
				initial={'initial'}
				animate={'visible'}
				exit={'exit'}
			>
				{closeButton ? (
					<button
						className={cn(
							'absolute z-50 top-3 right-3 p-2 rounded-full hover:bg-hoverLight',
							loading ? 'hidden' : 'visible'
						)}
						onClick={() => {
							onClose();
							onCancel && onCancel();
						}}
					>
						<MdClose className="text-primary h-6 w-6" />
					</button>
				) : null}

				<div>{children}</div>
			</motion.div>
		</div>,
		document.getElementById('popup') as HTMLElement
	);
};
