import { FileText, GraduationCap, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect } from 'react';

const SHADOW = 'shadow-[3px_3px_0_0_#171717] dark:shadow-[3px_3px_0_0_#737373]';


export default memo(function About() {
	const [zoomed, setZoomed] = useState(false);

	useEffect(() => {
		if (!zoomed) return;
		const onKey = (e) => e.key === 'Escape' && setZoomed(false);
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [zoomed]);

	
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			className="w-full flex flex-col items-start justify-start"
		>
			<div className="mx-auto w-full max-w-280 gap-8 px-4 pb-4 pt-8 md:grid md:grid-cols-2 md:items-start">
				<div className="flex flex-col items-center md:justify-start md:self-start">
					<button
						type="button"
						onClick={() => setZoomed(true)}
						aria-label="Enlarge photo"
						className="block w-full cursor-zoom-in"
					>
						<img
							src="/assets/Ruel - Resume.jpg"
							alt="Ruel Sinha"
							className="block w-full object-cover"
						/>
					</button>
				</div>

				<div className="ml-2 flex flex-col gap-8">
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-1 flex-col items-center md:items-start"
					>
						<div className={`mb-4 inline-flex items-center gap-2 border border-neutral-900 bg-neutral-200/50 px-4 py-2 select-none dark:border-neutral-500 dark:bg-neutral-900/80 ${SHADOW}`}>
							<div className="h-2 w-2 animate-pulse rounded-full bg-neutral-900 dark:bg-neutral-100" />
							<span className="text-base font-semibold uppercase tracking-[0.05em] text-neutral-900 dark:text-neutral-100">
								About me
							</span>
						</div>

						<h1 className="mb-3 text-center text-2xl font-bold leading-tight text-neutral-900 md:text-left md:text-[1.75rem] dark:text-neutral-50">
							<span className="bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-[#f2e2ff] dark:via-[#eeeaff] dark:to-[#f2e2ff]">I'm Ruel Sinha</span>
						</h1>

						<div className="mb-2 flex items-center justify-center gap-2 text-[0.9rem] leading-5 text-neutral-500 md:justify-start">
							<GraduationCap className="h-4 w-4" />
							<a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 dark:hover:text-neutral-200">
								University of Waterloo
							</a>
						</div>

						<p className="mb-2 max-w-184 text-center text-base leading-7 text-neutral-500 md:text-left md:text-lg dark:text-neutral-400">
							I’m studying at the University of Waterloo, and my program is
							<span className="font-medium text-neutral-900 dark:text-neutral-50"> Honours Software Engineering, Co-op</span>.
							I'm looking for a Co-op job for spring 2027.
						</p>

					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="relative flex flex-1 flex-col items-center md:items-start"
					>
						<svg
							aria-hidden="true"
							className="pointer-events-none absolute bottom-48 left-0 h-20 w-full translate-y-5 text-neutral-900/20 dark:text-white/20"
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
						>
							<line
								x1="0"
								y1="100"
								x2="100"
								y2="0"
								stroke="currentColor"
								strokeWidth="1"
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
						<div className={`mb-4 inline-flex items-center gap-2 border border-neutral-900 bg-neutral-200/50 px-4 py-2 select-none md:self-end dark:border-neutral-500 dark:bg-neutral-900/80 ${SHADOW}`}>
							<div className="h-2 w-2 animate-pulse rounded-full bg-neutral-900 dark:bg-neutral-100" />
							<span className="text-base font-semibold uppercase tracking-[0.05em] text-neutral-900 dark:text-neutral-100">
								Career Vision
							</span>
						</div>

						<p className="max-w-184 text-center text-base leading-7 text-neutral-500 md:text-left md:text-lg dark:text-neutral-400">
							I want to combine foundations in Programming, Mathematics, and Engineering to innovate software and devices that progress the world around us.
						</p>
						<div className="mt-4">
							<a
								href="/assets/Ruel - Resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-blue-200 px-6 py-2.5 text-base font-bold text-black transition hover:bg-blue-500 dark:bg-blue-950 dark:text-white dark:hover:bg-blue-800"
							>
								<FileText className="h-5 w-5 shrink-0" />
								<span>Resume</span>
								<ArrowUpRight className="h-5 w-5 shrink-0" />
							</a>
						</div>
					</motion.div>
				</div>
			</div>

			{/* add timeline here */}

			<AnimatePresence>
				{zoomed && (
					<motion.div
						key="lightbox"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						onClick={() => setZoomed(false)}
						className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4"
						role="dialog"
						aria-modal="true"
					>
						<motion.img
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							transition={{ duration: 0.15 }}
							src="/assets/Ruel - Resume.jpg"
							alt="Ruel Sinha"
							className="max-h-full max-w-full object-contain"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
});