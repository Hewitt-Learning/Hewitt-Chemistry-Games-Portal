import type { PortalGame } from "./types";

// Main catalog that feeds the portal cards
// If you add a new game, this is the only place you need to update data (besides from also uploading the folder to the repo)
// TODO: try to separate the games from the portal repo-wise
export const GAMES: PortalGame[] = [
	{
    // ideally I would prefer if all of this data was filled in through an API call to a different server
    // taken from a database or something, but hardcoding is fine for now
		id: "element-decoder",
		name: "Element Decoder",
		description:
			"Build familiarity with the periodic table through a word-discovery challenge that reveals hidden answers as you progress.",
		subject: "CHEMISTRY",
		age: "12+",
		href: "/element-decoder/",
		imageUrl: "/images/element-decoder-new.png",
	},
	{
		id: "compound-decoder",
		name: "Compound Decoder",
		description:
			"Practice compounds and chemistry naming patterns with clue-driven rounds designed for repetition and mastery.",
		subject: "CHEMISTRY",
		age: "12+",
		href: "/compound-decoder/",
		imageUrl: "/images/compound-decoder.png",
	},
	{
		id: "ionic-tetris",
		name: "Ionic Tetris",
		description:
			"Guide ions into valid compounds in a fast-paced strategy challenge that reinforces ionic bonding logic.",
		subject: "CHEMISTRY",
		age: "5-7",
		href: "/ionic-tetris/",
		imageUrl: "/images/ionic-tetris.png",
	},
  // Here I put a couple of dummy games just to test out the components in a scroll state
	{
		id: "word-quest",
		name: "Word Quest",
		description:
			"Develop language and literacy with vocabulary clues, context practice, and progression-based challenges.",
		subject: "LANGUAGE",
		age: "0-5",
		href: "#",
	},
	{
		id: "rhythm-lab",
		name: "Rhythm Lab",
		description:
			"Blend chemistry with creative rhythm activities that build pattern recognition and musical expression.",
		subject: "ARTS & MUSIC",
		age: "9-12",
		href: "#",
	},
	{
		id: "timeline-trek",
		name: "Timeline Trek",
		description:
			"Explore social studies and history through timeline clues, sequencing, and logic-driven mini games.",
		subject: "HISTORY",
		age: "7-9",
		href: "#",
	},
];
