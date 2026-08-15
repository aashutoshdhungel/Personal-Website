export type NoteItem = {
  id: string
  subject: string
  title: string
  file: string
  desc: string
}

export type Region = {
  key: string
  label: string
  notes: NoteItem[]
}

export const REGIONS: Region[] = [
  {
    key: "kanto",
    label: "Kanto Route (Grade 11)",
    notes: [
      { id: "g11-phys-ch1", subject: "Physics", title: "Chapter 1: Kinematics", file: "/notes/grade_11/physics/chapter-1-kinematics.pdf", desc: "Displacement, velocity, acceleration and equations of motion" },
      { id: "g11-chem-ch1", subject: "Chemistry", title: "Chapter 1: Atomic Structure", file: "/notes/grade_11/chemistry/chapter-1-atomic-structure.pdf", desc: "Bohr model, quantum numbers and electron configuration" },
      { id: "g11-math-ch1", subject: "Mathematics", title: "Chapter 1: Sets and Functions", file: "/notes/grade_11/mathematics/chapter-1-sets-functions.pdf", desc: "Set theory, relations and types of functions" },
      { id: "g11-eng-ch1", subject: "English", title: "Unit 1: Language and Communication", file: "/notes/grade_11/english/unit-1-communication.pdf", desc: "Reading comprehension, critical thinking, and functional grammar." },
      { id: "g11-nep-ch1", subject: "Nepali", title: "एकाइ १: व्याकरण र रचना", file: "/notes/grade_11/nepali/unit-1-grammar.pdf", desc: "शब्दवर्ग, रुपायन, र सिर्जनात्मक लेखन शैली।" },
      { id: "g11-bot-cell_biology", subject: "Botany", title: "Cell Biology", file: "/notes/grade_11/botany/cell_biology.pdf", desc: "Detailed notes on cell structure and function." },
      { id: "g11-bot-ecological_adaptation", subject: "Botany", title: "Ecological Adaptation", file: "/notes/grade_11/botany/ecological_adaptation.pdf", desc: "" },
      { id: "g11-bot-ecological_imbalances", subject: "Botany", title: "Ecological Imbalances", file: "/notes/grade_11/botany/ecological_imbalances.pdf", desc: "" },
      { id: "g11-bot-ecosystem", subject: "Botany", title: "Ecosystem", file: "/notes/grade_11/botany/ecosystem.pdf", desc: "" },
      { id: "g11-bot-enzymes", subject: "Botany", title: "Enzymes", file: "/notes/grade_11/botany/enzymes.pdf", desc: "" },
      { id: "g11-bot-brassicaceae", subject: "Botany", title: "Brassicaceae", file: "/notes/grade_11/botany/brassicaceae.pdf", desc: "Detailed notes on the mustard family \"Brassicaceae\"." },
      { id: "g11-bot-fabaceae", subject: "Botany", title: "Fabaceae", file: "/notes/grade_11/botany/fabaceae.pdf", desc: "" },
      { id: "g11-bot-familyliliaceae", subject: "Botany", title: "Liliaceae", file: "/notes/grade_11/botany/familyliliaceae.pdf", desc: "" },
      { id: "g11-bot-familysolanaceae", subject: "Botany", title: "Solanaceae", file: "/notes/grade_11/botany/familysolanaceae.pdf", desc: "" },
      { id: "g11-bot-fruits", subject: "Botany", title: "Fruits", file: "/notes/grade_11/botany/fruits.pdf", desc: "" },
      { id: "g11-bot-inflorescence", subject: "Botany", title: "Inflorescence", file: "/notes/grade_11/botany/inflorescence.pdf", desc: "" },
      { id: "g11-bot-meiosis", subject: "Botany", title: "Meiosis", file: "/notes/grade_11/botany/meiosis.pdf", desc: "" },
      { id: "g11-bot-nucleic_acid", subject: "Botany", title: "Nucleic Acid", file: "/notes/grade_11/botany/nucleic_acid.pdf", desc: "" },
      { id: "g11-bot-nucleus", subject: "Botany", title: "Nucleus", file: "/notes/grade_11/botany/nucleus.pdf", desc: "" },
      { id: "g11-bot-plant_anatomy", subject: "Botany", title: "Plant Anatomy", file: "/notes/grade_11/botany/plant_anatomy.pdf", desc: "" },
      { id: "g11-bot-taxonomy", subject: "Botany", title: "Taxonomy", file: "/notes/grade_11/botany/taxonomy.pdf", desc: "" },
      { id: "g11-bot-water", subject: "Botany", title: "Water", file: "/notes/grade_11/botany/water.pdf", desc: "" },
      { id: "g11-zoo-ch1", subject: "Zoology", title: "Chapter 1: Animal Tissues", file: "/notes/grade_11/zoology/chapter-1-animal-tissues.pdf", desc: "Epithelial, connective, muscular, and nervous tissue types." },
    ]
  },
  {
    key: "johto",
    label: "Johto Route (Grade 12)",
    notes: [
      { id: "g12-phys-ch1", subject: "Physics", title: "Chapter 1: Electrostatics", file: "/notes/grade_12/physics/chapter-1-electrostatics.pdf", desc: "Coulomb's law, electric field and potential" },
      { id: "g12-chem-ch1", subject: "Chemistry", title: "Chapter 1: Electrochemistry", file: "/notes/grade_12/chemistry/chapter-1-electrochemistry.pdf", desc: "Galvanic cells, electrolysis and Nernst equation" },
      { id: "g12-math-ch1", subject: "Mathematics", title: "Chapter 1: Sets and Functions", file: "/notes/grade_12/mathematics/chapter-1-sets-functions.pdf", desc: "Set theory, relations and types of functions" },
      { id: "g12-eng-ch1", subject: "English", title: "Unit 1: Literature Section", file: "/notes/grade_12/english/unit-1-literature.pdf", desc: "Analysis of prescribed short stories, poems, and essays." },
      { id: "g12-nep-ch1", subject: "Nepali", title: "एकाइ १: नेपाली साहित्य", file: "/notes/grade_12/nepali/unit-1-literature.pdf", desc: "निर्धारित कविता, कथा र निबन्धहरूको मूलभाव विश्लेषण।" },
      { id: "g12-bot-ch1", subject: "Botany", title: "Chapter 1: Plant Physiology", file: "/notes/grade_12/botany/chapter-1-plant-physiology.pdf", desc: "Photosynthesis, respiration, transpiration, and plant hormones." },
      { id: "g12-zoo-ch1", subject: "Zoology", title: "Chapter 1: Human Systems", file: "/notes/grade_12/zoology/chapter-1-human-systems.pdf", desc: "Detailed study of digestive, respiratory, and circulatory systems." },
    ]
  },
  {
    key: "indigo",
    label: "Indigo League (MBBS)",
    notes: [
      { id: "grays-anatomy-5th-edition", subject: "Anatomy", title: "Gray's Anatomy-5th Edition-2024", file: "/notes/mbbs/anatomy/grays-anatomy-for-students-5th-edition.pdf", desc: "Comprehensive anatomy textbook covering all body systems with detailed illustrations." },
    ]
  },
]

export function groupBySubject(notesList: NoteItem[]) {
  const grouped: Record<string, NoteItem[]> = {}
  for (const note of notesList) {
    if (!grouped[note.subject]) grouped[note.subject] = []
    grouped[note.subject].push(note)
  }
  return grouped
}
