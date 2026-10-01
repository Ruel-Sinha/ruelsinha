import { useState, memo } from 'react';
import { GraduationCap, Award, X, ArrowUpRight, PencilLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHADOW = 'shadow-[6px_6px_0_0_#878787] dark:shadow-[6px_6px_0_0_#737373]';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const InfoCard = memo(function InfoCard({ info, certificates}) {
	const { logo, alt, title, link, program, year, scorelabel0, score0, scorelabel1, score1 } = info;

	return (
		<motion.div
			variants={itemVariants}
			whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
			className={`bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 p-6 mb-6 ${SHADOW}`}
		>
			<div className="flex items-start gap-6">
				<div className="w-16 h-16 shrink-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow rounded-xl p-1 overflow-hidden">
					<img
						src={logo}
						alt={alt}
						className="w-full h-full object-contain rounded-lg"
						loading="lazy"
						decoding="async"
						width={64}
						height={64}
					/>
				</div>

				<div className="flex flex-col text-left gap-1 flex-1">
					<h3 className="text-lg sm:text-xl font-semibold text-foreground">{program}</h3>
					{title && (
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-primary hover:underline hover:text-foreground dark:hover:text-primary-foreground/70 font-medium transition-colors duration-200"
						>
							{title}
						</a>
					)}

					<div className="text-sm text-muted-foreground space-y-1">
						{year && <p>{year}</p>}

						{Array.isArray(score0) ? (
							<div>
								{scorelabel0 && (
									<div className="font-medium text-foreground/80 mb-1">{scorelabel0}:</div>
								)}
								<ul className="list-disc pl-5 space-y-1">
									{score0.map((item) => {
										const colonIndex = item.indexOf(':');
										return (
											<li key={item}>
												{colonIndex > 0 ? (
													<>
														<strong>{item.substring(0, colonIndex)}</strong>
														{item.substring(colonIndex)}
													</>
												) : (
													item
												)}
											</li>
										);
									})}
								</ul>
							</div>
						) : (
							scorelabel0 && (
								<p>
									<span className="font-medium text-foreground/80">{scorelabel0}:</span> {score0}
								</p>
							)
						)}

						{score1 && scorelabel1 && (
							<p>
								<span className="font-medium text-foreground/80">{scorelabel1}:</span> {score1}
							</p>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
});

const Section = ({ icon: Icon, title, iconClass = 'w-8 h-8 sm:w-11 sm:h-11', last = false, children }) => (
	<>
		<motion.div variants={itemVariants} className="flex flex-col items-center">
			<h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 flex items-center gap-4 text-foreground">
				<Icon className={`${iconClass} text-primary drop-shadow-sm`} />
				{title}
			</h1>
		</motion.div>

		<div className={`w-full max-w-3xl flex flex-col gap-4${last ? '' : ' mb-12'}`}>
			{children}
			{!last && (
				<motion.div variants={itemVariants} className="w-full my-6">
					<div className="h-px bg-neutral-900/20 dark:bg-white/20" />
				</motion.div>
			)}
		</div>
	</>
);

const VEXU_DATA = {
	logo: '/assets/logos/UWAT_VEXU.png',
	alt: 'UWaterloo VEXU Robotics logo',
	title: 'UWAT VEXU Competitive Robotics Design Team',
	link: 'https://uwvexu.ca/',
	program: 'Software Engineering Subteam',
	year: 'September 2026 – onwards',
	scorelabel0: 'VEX U Competition',
	score0: 'Representing the University of Waterloo, we engineer both controlled and autonomous robots to compete in the international VEX U robotics competition.',
};

const UW_DATA = {
	logo: '/assets/logos/University_of_Waterloo_Seal.jpg',
	alt: 'University of Waterloo Seal',
	title: 'University of Waterloo',
	link: 'https://uwaterloo.ca/',
	program: 'Honours Software Engineering, Co-op',
	year: 'September 2026 – onwards',
	scorelabel0: 'Admission Average',
	score0: '99.67%',
};

const VANTECH_DATA = {
	logo: '/assets/logos/VanTech.jpg',
	alt: 'VanTech Logo',
	title: 'Vancouver Technical Secondary School',
	link: 'https://www.vsb.bc.ca/vancouver-technical',
	program: 'Summit Mini School Accelerated Program',
	year: 'Sept 2021 – June 2026',
	scorelabel0: '100% in all of',
	score0: 'AP Calculus, AP Statistics, Pre-Calculus 12, Chemistry 12, Physics 12',
};

const SAT_DATA = {
	logo: '/assets/logos/college_board.png',
	alt: 'College Board Logo',
	title: 'College Board',
	program: 'SAT',
	year: 'August 2025',
	scorelabel0: 'Total Score',
	score0: '1570',
	scorelabel1: 'Section Scores',
	score1: 'Math: 790; Reading & Writing: 780',
};

const AP_DATA = {
	logo: '/assets/logos/college_board.png',
	alt: 'College Board Logo',
	title: 'College Board',
	link: 'https://www.collegeboard.org/',
	program: 'AP Exams',
	year: '2025-2026',
	scorelabel0: '5/5',
	score0: 'AP Physics C: Mechanics, AP Physics C: Electricity & Magnetism, AP Calculus BC, AP Statistics, AP Computer Science A',
};

const MATH_DATA = {
	logo: '/assets/logos/CEMC.png',
	alt: 'UWaterloo CEMC Logo',
	title: 'CEMC, University of Waterloo',
	link: 'https://cemc.uwaterloo.ca/',
	program: 'Mathematics Competitions',
	score0: [
		'Fryer Contest 2023: 2nd Place',
		'Cayley Contest 2024: Top 150',
		'Fermat Contest 2025: Top 300',
		'Euclid, Hypatia, Pascal, Galois contests: 1st in school & consistent top percentile performance.',
	],
};

export default memo(function Academics() {

	return (
		<div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 mt-2">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="flex flex-col items-center w-full"
			>
				<Section icon={PencilLine} title="Design Team">
					<InfoCard info={VEXU_DATA} />
				</Section>

				<Section icon={GraduationCap} title="Education">
					<InfoCard info={UW_DATA} />
					<InfoCard info={VANTECH_DATA} />
				</Section>

				<Section icon={Award} title="Exams & Contests" iconClass="w-6 h-6 sm:w-9 sm:h-9" last>
					<InfoCard info={SAT_DATA} />
					<InfoCard info={AP_DATA} />
					<InfoCard info={MATH_DATA} />
				</Section>
			</motion.div>
		</div>
	);
});