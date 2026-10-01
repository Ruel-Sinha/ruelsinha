import React, { memo } from 'react';
import {
	Brain,
	Cpu,
	FlaskConical,
	FileText,
	ArrowUpRight,
	ArrowDown,
	Code,
	Bot,
	Box,
	ChartColumn,
} from 'lucide-react';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { createLucideIcon } from 'lucide-react';

export const Integral = createLucideIcon('Integral', [
	[
		'path',
		{
			d: 'M14 2c-2 0-3 1-3 3v14c0 2-1 3-3 3',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		},
	],
]);

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

const TechTag = memo(({ tag }) => (
	<span className="px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
		{tag}
	</span>
));
TechTag.displayName = 'TechTag';

const ProjectCard = memo(({ project }) => {
	const { title, date, summary, link, icon, file } = project;

	return (
		<motion.div
			variants={itemVariants}
			className={`bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 shadow p-6 mb-6 ${SHADOW}`}
			whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
		>
			<div className="flex items-start gap-6">
				<div className="w-16 h-16 shrink-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow rounded-xl p-1 overflow-hidden text-neutral-700 dark:text-neutral-200">
					{icon}
				</div>

				<div className="flex flex-col text-left gap-1 flex-1">
					<h3 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h3>

					{date && <p className="text-sm font-medium text-primary">{date}</p>}

					<div className="text-sm text-muted-foreground mb-3 leading-relaxed whitespace-pre-line">{summary}</div>

					{link && (
						<div className="mt-2 text-left">
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-[#d1d3e8] px-6 py-1.5 text-base font-bold text-black transition hover:bg-[#a8afff] dark:bg-[#41425c] dark:text-white dark:hover:bg-[#30314d]"
							>
								{link.label || 'View Project'}
								<ArrowUpRight className="h-5 w-5 shrink-0" />
							</a>
						</div>
					)}

					{file && (
						<div className="mt-2 text-left">
							<a
								href={file}
								download
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-[#d1d3e8] px-6 py-1.5 text-base font-bold text-black transition hover:bg-[#a8afff] dark:bg-[#41425c] dark:text-white dark:hover:bg-[#30314d]"
							>
								Download File
								<ArrowDown className="h-5 w-5 shrink-0" />
							</a>
						</div>
					)}

				</div>
			</div>
		</motion.div>
	);
});
ProjectCard.displayName = 'ProjectCard';

const ACADEMIC_PROJECTS = [
	{
		title: 'Ball Trajectory Analysis (partner project)',
		date: 'Jan 2026',
		icon: <Integral className="w-8 h-8" />,
		summary: 'Tracked and modeled the trajectory of a spinning ping pong ball as a function\nUsed multivariable calculus and 2nd order non-homogeneous differential equations\nMatched trajectory while accounting for air resistance and spin',
		link: {
			label: 'View Paper',
			url: '/assets/projects/table-tennis-trajectory.pdf',
		},
	},
	{
		title: 'Statistics Project (partner project)',
		date: 'Jan 2026',
		icon: <ChartColumn className="w-8 h-8" />,
		summary: 'Statistical inference on reaction times\nConducted surveying with random sampling',
		link: {
			label: 'View Poster',
			url: '/assets/projects/ruel-stats-project.pdf',
		},
	},
];

const SOFTWARE_ENGINEERING = [
	{
		title: 'Multiplayer Snake Game',
		date: '2023',
		icon: <Box className="w-8 h-8" />,
		summary: 'Programmed unique features using python\nEngineered optimzed code and runtime',
		file: '/assets/projects/multisnake.py',
	},
	{
		title: 'Thumbnet (partner project)',
		date: 'WIP',
		icon: <Code className="w-8 h-8" />,
		summary: 'Full-stack commercial website being developed using React.',
	},
	{
		title: 'LED Cube',
		date: '2024',
		icon: <Box className="w-8 h-8" />,
		summary: "Soldered and and pressed circuit board\nProgrammed unique light pattern using Arduino IDE",
	},
	{
		title: 'Remote Controlled Sumo Robot',
		date: '2024',
		icon: <Bot className="w-8 h-8" />,
		summary: 'Mechanically engineered and built a shell for a gearbox\nUsed the torque of the gearbox\'s wheels to lift ramps on the robot\'s shell',
	},
];

const ProjectsComponent = memo(function Projects() {
	return (
		<div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 mt-2">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="flex flex-col items-center w-full"
			>
				<motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 flex items-center gap-4 text-foreground">
						<Brain className="w-8 h-8 sm:w-11 sm:h-11 text-primary drop-shadow-sm" />
						Projects
					</h1>
				</motion.div>

				<motion.div variants={itemVariants} className="flex flex-col items-center text-center w-full max-w-3xl">
					<div className="mb-6 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3">
						<div className="ml-8 flex items-center gap-2">
							<Cpu className="w-6 h-6 text-primary" />
							<h2 className="text-3xl font-bold text-foreground">Software & Engineering</h2>
						</div>
						<a
							href="https://drive.google.com/drive/folders/1XbML3RBa6BdaWXGFaCqieOFf1JNRcihN?usp=sharing"
							target="_blank"
							rel="noopener noreferrer"
							className="mr-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-blue-300 px-6 py-2.5 text-base font-bold text-black transition hover:bg-blue-500 dark:bg-blue-950 dark:text-white dark:hover:bg-blue-800"
						>
							See images & videos
						</a>
					</div>
					<div className="w-full flex flex-col gap-2">
						{SOFTWARE_ENGINEERING.map((proj, i) => (
							<ProjectCard key={i} project={proj} />
						))}
					</div>
					<div className="w-full mb-10 mt-5 h-px bg-neutral-900/20 dark:bg-white/20" />
				</motion.div>

				<motion.div variants={itemVariants} className="flex flex-col items-center text-center w-full max-w-3xl">
					<div className="flex items-center gap-2 mb-6 ml-8 self-start">
						<FlaskConical className="w-6 h-6 text-primary" />
						<h2 className="text-3xl font-bold text-foreground">Applied Academics</h2>
					</div>
					<div className="w-full flex flex-col gap-2">
						{ACADEMIC_PROJECTS.map((proj, i) => (
							<ProjectCard key={i} project={proj} />
						))}
					</div>
					<div className="w-full mt-5 h-px bg-neutral-900/20 dark:bg-white/20" />
				</motion.div>

				<motion.div variants={itemVariants} className="mt-12 mb-8">
					<a
						href="/assets/Ruel - Resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-blue-300 px-6 py-2.5 text-base font-bold text-black transition hover:bg-blue-500 dark:bg-blue-950 dark:text-white dark:hover:bg-blue-800"
					>
						<FileText className="h-5 w-5 shrink-0" />
						View Resume
						<ArrowUpRight className="h-5 w-5 shrink-0" />
					</a>
				</motion.div>
			</motion.div>
		</div>
	);
});

export default ProjectsComponent;