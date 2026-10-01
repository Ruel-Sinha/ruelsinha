import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHADOW = 'shadow-[6px_6px_0_0_#878787] dark:shadow-[6px_6px_0_0_#737373]';

const factoryCache = new Map();

function loadFactory(src) {
	if (factoryCache.has(src)) return factoryCache.get(src);

	const promise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = () => {
			const factory = window.createModule;
			window.createModule = undefined;
			if (typeof factory === 'function') resolve(factory);
			else reject(new Error(`createModule not found in ${src}`));
		};
		script.onerror = () => reject(new Error(`Could not load ${src}`));
		document.body.appendChild(script);
	});

	promise.catch(() => factoryCache.delete(src));
	factoryCache.set(src, promise);
	return promise;
}

function FileModalContent({ src, width, height, onClose }) {
	const canvasRef = useRef(null);
	const [status, setStatus] = useState('loading');
	const title = src.split('/').pop();

	useEffect(() => {
		let cancelled = false;
		let instance = null;

		loadFactory(src)
			.then((createModule) =>
				cancelled
					? null
					: createModule({
							canvas: canvasRef.current,
							locateFile: (file) => src.slice(0, src.lastIndexOf('/') + 1) + file,
						}),
			)
			.then((mod) => {
				if (!mod) return;
				if (cancelled) {
					mod._stop?.();
					return;
				}
				instance = mod;
				setStatus('ready');
			})
			.catch(() => !cancelled && setStatus('error'));

		return () => {
			cancelled = true;
			instance?._stop?.();
		};
	}, [src]);

	useEffect(() => {
		const onKey = (e) => e.key === 'Escape' && onClose();
		const prevOverflow = document.body.style.overflow;
		window.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [onClose]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			onClick={onClose}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
			role="dialog"
			aria-modal="true"
			aria-label={title}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.2 }}
				onClick={(e) => e.stopPropagation()}
				className={`flex max-h-[90vh] w-full max-w-5xl flex-col border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${SHADOW}`}
			>
				<div className="flex items-center justify-between border-b border-neutral-300 px-4 py-3 dark:border-neutral-700">
					<span className="font-mono text-sm font-semibold text-foreground">{title}</span>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close"
						className="cursor-pointer bg-transparent p-1 text-foreground transition hover:opacity-70"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				<div className="flex-1 overflow-auto p-4">
					<div className="relative mx-auto w-full" style={{ maxWidth: width }}>
						<canvas
							id="canvas"
							ref={canvasRef}
							width={width}
							height={height}
							tabIndex={0}
							onContextMenu={(e) => e.preventDefault()}
							className="block h-auto w-full bg-black"
						/>
						{status !== 'ready' && (
							<div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
								{status === 'error' ? "Couldn't load the program." : 'Loading…'}
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
export default function Multisnake({ src, width = 800, height = 600, onClose }) {
	return (
		<AnimatePresence>
			{src && <FileModalContent key={src} src={src} width={width} height={height} onClose={onClose} />}
		</AnimatePresence>
	);
}