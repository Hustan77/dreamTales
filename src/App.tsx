import React, { useState, useCallback } from "react";
import { Sparkles, User, BookOpen, Share2, Download, Heart, Star, Moon } from "lucide-react";

const universes = [
  "custom", "Harry Potter", "Star Wars", "Pokemon", "My Little Pony", "Frozen", "Toy Story",
  "Marvel Universe", "DC Universe", "Dragon Ball", "Naruto", "One Piece", "Moana", "Encanto",
  "The Incredibles", "Lego World", "Winnie the Pooh", "Peppa Pig", "Bluey", "Minecraft", "Roblox",
  "Super Mario", "Zelda", "Sonic the Hedgehog", "Avengers", "Batman", "Spiderman", "Stranger Things",
  "Percy Jackson", "Chronicles of Narnia", "Lord of the Rings", "How to Train Your Dragon",
  "Scooby-Doo", "Barbie", "Transformers", "Shrek", "Inside Out", "Up", "Coco", "Cars",
  "Zootopia", "Trolls", "Raya and the Last Dragon", "Big Hero 6", "Beyblade", "Yu-Gi-Oh!",
  "Lilo & Stitch", "Brave", "The Lion King", "Aladdin", "Beauty and the Beast", "Tangled",
  "Mulan", "The Little Mermaid", "Finding Nemo", "Monsters Inc", "Wonder Woman", "The Flash",
  "Avatar: The Last Airbender", "Teen Titans", "Steven Universe", "Adventure Time", "Gravity Falls",
  "Princess and the Frog", "Sleeping Beauty", "Cinderella", "Snow White", "Rapunzel",
  "Pirates of the Caribbean", "Indiana Jones", "Jurassic Park", "Back to the Future", "E.T.",
  "The Wizard of Oz", "Alice in Wonderland", "Peter Pan", "Jungle Book", "101 Dalmatians",
  "Lady and the Tramp", "Bambi", "Dumbo", "Pinocchio", "Mickey Mouse Clubhouse"
];

const morals = [
  "custom", "Kindness", "Courage", "Honesty", "Perseverance", "Teamwork", "Compassion", "Respect",
  "Patience", "Generosity", "Gratitude", "Forgiveness", "Responsibility", "Self-Control", "Empathy",
  "Friendship", "Inclusivity", "Curiosity", "Imagination", "Confidence", "Humility", "Loyalty",
  "Determination", "Creativity", "Independence", "Cooperation", "Sharing", "Helpfulness",
  "Optimism", "Resilience", "Acceptance", "Tolerance", "Understanding", "Bravery", "Wisdom",
  "Fairness", "Justice", "Integrity", "Reliability", "Thoughtfulness", "Caring", "Gentleness",
  "Politeness", "Good Manners", "Listening", "Following Rules", "Being Truthful", "Hard Work",
  "Dedication", "Focus", "Goal Setting", "Problem Solving", "Adaptability", "Flexibility",
  "Open-mindedness", "Critical Thinking", "Leadership", "Following Directions", "Time Management",
  "Organization", "Cleanliness", "Healthy Habits", "Environmental Care", "Animal Care",
  "Community Service", "Volunteer Spirit", "Gratitude for Family", "Appreciation", "Mindfulness",
  "Self-Awareness", "Emotional Intelligence", "Conflict Resolution", "Peaceful Solutions",
  "Anti-Bullying", "Standing Up for Others", "Celebrating Differences", "Cultural Awareness"
];

const stylePrompts: Record<string, string> = {
  classic: "",
  pirate: `Tell the story like a thrilling pirate’s yarn, using colorful pirate slang, sea monsters, treasure maps, and swashbuckling action. Include iconic pirate tropes and nautical lingo like "Ahoy!", "Arrr!", and "shiver me timbers." Use an old sea captain’s voice.`,
  play: `Format the story like a Broadway musical play. Use a dramatic narrator, character names in bold, short stage directions (e.g., [lights dim]), and lyrical rhyming dialogue that feels like it's sung. Channel the energy of Hamilton or Wicked.`,
  hiphop: `Tell the story entirely as a rhythmic rap, with clever rhymes and a beat-driven flow. Make the story bounce with energy and rhyme schemes. Keep it smart and playful — like if Lin-Manuel Miranda wrote a bedtime story with beats.`,
  shakespeare: `Craft the story as a Shakespearean drama, using iambic pentameter and Elizabethan English. Use dramatic soliloquies, courtly language, and archaic expressions like "thee," "thou," and "hath." Think: bedtime Macbeth (but without the violence).`,
  cowboy: `Spin the story like a Wild West campfire tale told by an old cowboy. Use dusty, twangy narration, saloon metaphors, and frontier slang. Include horses, outlaws, and tumbleweeds, and speak like you’re wearing spurs and chewing straw.`,
  noir: `Tell the story in the gritty, smoky style of 1940s detective noir. Use hardboiled inner monologue, moody city settings, and lines like “It was a night like any other, until she walked in.” Think: bedtime story meets film noir.`,
  fairytale: `Write the story in the whimsical tone of a classic European fairy tale. Use enchanted forests, wise old animals, and mystical rhymes. Add a narrator with a “Once upon a time” voice, and use poetic and magical language throughout.`,
  newsreport: `Write the story like a breaking news special on a magical news network. Use news anchors, reporters on the scene, and dramatic headlines. Mix in humor and seriousness, like a story unfolding live on TV in a fantasy world.`,
  alien: `Tell the story like it’s being broadcast by friendly aliens to Earth kids. Use sci-fi language, alien expressions, galactic metaphors, and space references. Let it feel like an interplanetary adventure being narrated from another world.`,
};


const styleNames: Record<string, string> = {
  classic: "Classic",
  pirate: "Swashbuckler",
  play: "Broadway Musical",
  hiphop: "Hip-Hop Rhymes",
  shakespeare: "Shakespearean Drama",
  cowboy: "Cowboy Campfire",
  noir: "Film Noir",
  fairytale: "Fairy Tale",
  newsreport: "News Broadcast",
  alien: "Alien Signal",
};

const historyPeriods = [
  "custom", "Ancient Egypt", "Ancient Greece", "Roman Empire", "Medieval Times", "Renaissance",
  "Age of Exploration", "Colonial America", "American Revolution", "Wild West", "Civil War Era",
  "Industrial Revolution", "World War I", "Great Depression", "World War II", "Space Race",
  "Civil Rights Movement", "Ancient China", "Ancient Japan", "Viking Age", "Aztec Empire",
  "Inca Empire", "Mayan Civilization", "Stone Age", "Bronze Age", "Iron Age", "Dark Ages",
  "Age of Pirates", "California Gold Rush", "Oregon Trail", "Building of Railroads",
  "Invention of Flight", "Ancient Mesopotamia", "Persian Empire", "Byzantine Empire",
  "Mongol Empire", "Ottoman Empire", "French Revolution", "Napoleonic Wars", "Victorian Era",
  "Roaring Twenties", "1960s", "Ancient India", "Silk Road", "Crusades", "Black Death",
  "Printing Press Era", "Discovery of America", "Lewis and Clark Expedition", "Underground Railroad"
];

// Complete Historical data with figures, locations, and focuses for each period
const historicalData: Record<string, { figures: string[], locations: string[], focuses: string[] }> = {
  "Ancient Egypt": {
    figures: ["custom", "Cleopatra", "King Tutankhamun", "Nefertiti", "Ramses II", "Hatshepsut", "Akhenaten"],
    locations: ["custom", "Great Pyramids of Giza", "Valley of the Kings", "Temple of Karnak", "Great Sphinx", "Alexandria", "Abu Simbel"],
    focuses: ["pyramids and mummies", "pharaohs and queens", "hieroglyphics", "daily life", "art and architecture", "inventions", "religion and gods"]
  },
  "Ancient Greece": {
    figures: ["custom", "Alexander the Great", "Socrates", "Plato", "Aristotle", "Homer", "Pericles", "Archimedes"],
    locations: ["custom", "Parthenon", "Acropolis", "Athens", "Sparta", "Mount Olympus", "Delphi", "Troy"],
    focuses: ["democracy", "philosophy", "Olympic Games", "mythology", "art and architecture", "daily life", "inventions and science"]
  },
  "Roman Empire": {
    figures: ["custom", "Julius Caesar", "Augustus", "Spartacus", "Cicero", "Marcus Aurelius", "Nero", "Constantine"],
    locations: ["custom", "Colosseum", "Roman Forum", "Pompeii", "Pantheon", "Hadrian's Wall", "Roman Roads", "Circus Maximus"],
    focuses: ["gladiators", "government and law", "engineering", "daily life", "military", "art and architecture", "inventions"]
  },
  "Medieval Times": {
    figures: ["custom", "King Arthur", "Joan of Arc", "William the Conqueror", "Charlemagne", "Richard the Lionheart", "Robin Hood"],
    locations: ["custom", "Medieval Castle", "Canterbury Cathedral", "Tower of London", "Mont-Saint-Michel", "Camelot", "Village Market"],
    focuses: ["knights and chivalry", "castles", "daily life", "religion", "feudalism", "art and crafts", "inventions"]
  },
  "Renaissance": {
    figures: ["custom", "Leonardo da Vinci", "Michelangelo", "Shakespeare", "Galileo", "Christopher Columbus", "Magellan"],
    locations: ["custom", "Florence", "Rome", "Venice", "Sistine Chapel", "Globe Theatre", "Printing Workshop"],
    focuses: ["art and artists", "inventions", "exploration", "science", "daily life", "literature", "architecture"]
  },
  "Age of Exploration": {
    figures: ["custom", "Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo", "James Cook", "Amerigo Vespucci"],
    locations: ["custom", "Ships and Ocean", "New World", "Spice Islands", "Cape of Good Hope", "Trading Posts", "Harbors"],
    focuses: ["exploration and discovery", "navigation", "trade", "ships and sailing", "new lands", "cultural exchange", "inventions"]
  },
  "Colonial America": {
    figures: ["custom", "Pocahontas", "John Smith", "William Penn", "Pilgrims", "Benjamin Franklin", "George Washington"],
    locations: ["custom", "Jamestown", "Plymouth Rock", "Boston", "Philadelphia", "Williamsburg", "Log Cabin", "Trading Post"],
    focuses: ["early settlements", "Native Americans", "daily life", "farming", "crafts and trades", "government", "religion"]
  },
  "American Revolution": {
    figures: ["custom", "George Washington", "Benjamin Franklin", "Thomas Jefferson", "King George III", "Paul Revere", "Betsy Ross"],
    locations: ["custom", "Boston Harbor", "Independence Hall", "Valley Forge", "Lexington and Concord", "Yorktown", "Mount Vernon"],
    focuses: ["independence", "government", "war and battles", "daily life", "famous documents", "heroes", "patriotism"]
  },
  "Wild West": {
    figures: ["custom", "Annie Oakley", "Buffalo Bill", "Jesse James", "Sitting Bull", "Wyatt Earp", "Calamity Jane"],
    locations: ["custom", "Frontier Town", "Gold Mine", "Ranch", "Railroad", "Saloon", "Native American Village", "Prairie"],
    focuses: ["cowboys and ranching", "gold rush", "railroads", "Native Americans", "frontier life", "law and order", "inventions"]
  },
  "Civil War Era": {
    figures: ["custom", "Abraham Lincoln", "Frederick Douglass", "Harriet Tubman", "Robert E. Lee", "Ulysses S. Grant", "Clara Barton"],
    locations: ["custom", "White House", "Gettysburg", "Underground Railroad", "Plantation", "Union Camp", "Confederate Camp"],
    focuses: ["slavery and freedom", "war and battles", "Underground Railroad", "government", "daily life", "heroes", "reunification"]
  },
  "Industrial Revolution": {
    figures: ["custom", "Thomas Edison", "Alexander Graham Bell", "Henry Ford", "Andrew Carnegie", "John D. Rockefeller", "Samuel Morse"],
    locations: ["custom", "Factory", "Railroad Station", "Steel Mill", "Laboratory", "City Streets", "Telegraph Office"],
    focuses: ["inventions", "factories", "transportation", "communication", "daily life changes", "workers", "progress"]
  },
  "World War I": {
    figures: ["custom", "Woodrow Wilson", "General Pershing", "Eddie Rickenbacker", "Sergeant York", "Nurse Heroes", "Doughboys"],
    locations: ["custom", "Trenches", "No Man's Land", "Home Front", "Military Camp", "Europe Battlefields", "Hospital"],
    focuses: ["war and peace", "heroes", "technology", "home front", "international cooperation", "sacrifice", "communication"]
  },
  "Great Depression": {
    figures: ["custom", "Franklin D. Roosevelt", "Eleanor Roosevelt", "Dust Bowl Farmers", "CCC Workers", "Migrant Workers"],
    locations: ["custom", "Dust Bowl", "Soup Kitchen", "Hooverville", "New Deal Projects", "Farm", "City Breadline"],
    focuses: ["perseverance", "helping others", "government programs", "daily life struggles", "hope", "community", "hard work"]
  },
  "World War II": {
    figures: ["custom", "Franklin D. Roosevelt", "Winston Churchill", "Rosie the Riveter", "Tuskegee Airmen", "Anne Frank", "General Eisenhower"],
    locations: ["custom", "Home Front", "Victory Garden", "Aircraft Factory", "Pearl Harbor", "D-Day Beaches", "Concentration Camp Memorial"],
    focuses: ["courage and heroism", "home front", "technology", "international cooperation", "freedom", "sacrifice", "peace"]
  },
  "Space Race": {
    figures: ["custom", "Neil Armstrong", "John Glenn", "Katherine Johnson", "Buzz Aldrin", "Sally Ride", "Yuri Gagarin"],
    locations: ["custom", "NASA Mission Control", "Space Shuttle", "Moon Surface", "Space Station", "Launch Pad", "Astronaut Training"],
    focuses: ["exploration", "science and technology", "teamwork", "perseverance", "discovery", "international cooperation", "dreams"]
  },
  "Civil Rights Movement": {
    figures: ["custom", "Martin Luther King Jr.", "Rosa Parks", "Ruby Bridges", "Jackie Robinson", "Thurgood Marshall", "John Lewis"],
    locations: ["custom", "Montgomery Bus", "Lincoln Memorial", "Selma Bridge", "Little Rock School", "Birmingham", "March on Washington"],
    focuses: ["equality and justice", "peaceful protest", "courage", "education", "community", "leadership", "perseverance"]
  },
  "Ancient China": {
    figures: ["custom", "Emperor Qin Shi Huang", "Confucius", "Marco Polo", "Empress Wu Zetian", "Zheng He", "Laozi"],
    locations: ["custom", "Great Wall of China", "Forbidden City", "Silk Road", "Terra Cotta Army", "Temple", "Chinese Garden"],
    focuses: ["inventions", "philosophy", "art and crafts", "daily life", "government", "trade", "culture"]
  },
  "Ancient Japan": {
    figures: ["custom", "Emperor Meiji", "Samurai Warriors", "Lady Murasaki", "Minamoto Yoritomo", "Prince Shotoku"],
    locations: ["custom", "Japanese Castle", "Shinto Shrine", "Buddhist Temple", "Tea House", "Mount Fuji", "Imperial Palace"],
    focuses: ["samurai and honor", "art and culture", "religion", "daily life", "government", "nature", "traditions"]
  },
  "Viking Age": {
    figures: ["custom", "Erik the Red", "Leif Erikson", "Ragnar Lothbrok", "King Canute", "Harald Hardrada"],
    locations: ["custom", "Viking Ship", "Norse Village", "Iceland", "Greenland", "Vinland", "Viking Hall"],
    focuses: ["exploration and adventure", "ships and sailing", "daily life", "mythology", "trade", "crafts", "courage"]
  },
  "Aztec Empire": {
    figures: ["custom", "Montezuma II", "Hernán Cortés", "Quetzalcoatl", "Aztec Warriors", "Aztec Priests"],
    locations: ["custom", "Tenochtitlan", "Great Temple", "Floating Gardens", "Marketplace", "Palace", "Lake Texcoco"],
    focuses: ["daily life", "religion and gods", "art and crafts", "agriculture", "government", "trade", "architecture"]
  },
  "Inca Empire": {
    figures: ["custom", "Pachacuti", "Atahualpa", "Francisco Pizarro", "Inca Engineers", "Chasqui Messengers"],
    locations: ["custom", "Machu Picchu", "Cusco", "Andes Mountains", "Inca Roads", "Temple of the Sun", "Terraced Farms"],
    focuses: ["engineering", "daily life", "religion", "agriculture", "government", "art and crafts", "communication"]
  },
  "Mayan Civilization": {
    figures: ["custom", "Pakal the Great", "Lady Six Sky", "Mayan Astronomers", "Mayan Scribes", "Mayan Priests"],
    locations: ["custom", "Pyramid of Chichen Itza", "Tikal", "Palenque", "Observatory", "Ball Court", "Jungle City"],
    focuses: ["astronomy and calendar", "mathematics", "art and writing", "daily life", "religion", "architecture", "science"]
  },
  "Stone Age": {
    figures: ["custom", "Cave Painters", "Tool Makers", "Hunter-Gatherers", "Tribal Leaders", "Early Farmers"],
    locations: ["custom", "Cave", "Hunting Grounds", "River Valley", "Stone Circle", "Early Village", "Fire Circle"],
    focuses: ["survival", "tools and inventions", "art", "daily life", "cooperation", "discovery", "problem-solving"]
  },
  "Bronze Age": {
    figures: ["custom", "Bronze Smiths", "Early Kings", "Traders", "Farmers", "Craftspeople"],
    locations: ["custom", "Bronze Workshop", "Early City", "Trading Route", "Farm Settlement", "Palace", "Temple"],
    focuses: ["metalworking", "trade", "early cities", "inventions", "daily life", "crafts", "cooperation"]
  },
  "Iron Age": {
    figures: ["custom", "Celtic Warriors", "Iron Smiths", "Tribal Chiefs", "Early Romans", "Hill Fort Builders"],
    locations: ["custom", "Hill Fort", "Iron Workshop", "Celtic Village", "Roman Settlement", "Trade Center", "Ceremonial Site"],
    focuses: ["metalworking", "warfare", "daily life", "trade", "technology", "culture", "settlement"]
  },
  "Dark Ages": {
    figures: ["custom", "Charlemagne", "King Alfred", "Viking Raiders", "Monks", "Medieval Scholars"],
    locations: ["custom", "Monastery", "Viking Settlement", "Medieval Village", "Castle Keep", "Abbey", "Trading Post"],
    focuses: ["learning and books", "religion", "daily life", "survival", "community", "crafts", "preservation of knowledge"]
  },
  "Age of Pirates": {
    figures: ["custom", "Blackbeard", "Anne Bonny", "Captain Kidd", "Henry Morgan", "Grace O'Malley"],
    locations: ["custom", "Pirate Ship", "Caribbean Island", "Port Royal", "Treasure Island", "Pirate Cove", "Spanish Main"],
    focuses: ["adventure and exploration", "ships and sailing", "treasure hunting", "daily life at sea", "navigation", "courage", "teamwork"]
  },
  "California Gold Rush": {
    figures: ["custom", "Forty-Niners", "Levi Strauss", "Chinese Miners", "Native Californians", "John Sutter"],
    locations: ["custom", "Gold Mine", "Mining Camp", "San Francisco", "Sacramento", "Sierra Nevada", "Mining Town"],
    focuses: ["determination", "hard work", "community", "cultural diversity", "entrepreneurship", "environmental impact", "hope and dreams"]
  },
  "Oregon Trail": {
    figures: ["custom", "Pioneer Families", "Trail Guides", "Mountain Men", "Native Americans", "Wagon Train Leaders"],
    locations: ["custom", "Covered Wagon", "Prairie", "River Crossing", "Fort Laramie", "Independence Rock", "Oregon Territory"],
    focuses: ["perseverance", "family", "survival", "cooperation", "decision-making", "courage", "exploration"]
  },
  "Building of Railroads": {
    figures: ["custom", "Chinese Workers", "Irish Workers", "Railroad Engineers", "Surveyors", "Telegraph Operators"],
    locations: ["custom", "Railroad Camp", "Mountain Pass", "Railroad Station", "Transcontinental Railroad", "Rail Yard", "Tunnel"],
    focuses: ["teamwork", "engineering", "cultural diversity", "hard work", "communication", "progress", "problem-solving"]
  },
  "Invention of Flight": {
    figures: ["custom", "Wright Brothers", "Amelia Earhart", "Charles Lindbergh", "Glenn Curtiss", "Alberto Santos-Dumont"],
    locations: ["custom", "Kitty Hawk", "Aircraft Workshop", "Airfield", "Aviation Museum", "Flight School", "Hangar"],
    focuses: ["perseverance", "innovation", "courage", "problem-solving", "dreams", "science", "teamwork"]
  },
  "Ancient Mesopotamia": {
    figures: ["custom", "Hammurabi", "Gilgamesh", "Sargon of Akkad", "Nebuchadnezzar", "Sumerian Priests"],
    locations: ["custom", "Ziggurat", "Babylon", "Ur", "Euphrates River", "Palace", "Cuneiform School"],
    focuses: ["first cities", "writing", "laws", "daily life", "religion", "inventions", "agriculture"]
  },
  "Persian Empire": {
    figures: ["custom", "Cyrus the Great", "Darius I", "Xerxes", "Zoroaster", "Persian Messengers"],
    locations: ["custom", "Persepolis", "Royal Road", "Hanging Gardens", "Persian Palace", "Satrap's Court", "Fire Temple"],
    focuses: ["tolerance", "government", "communication", "trade", "religion", "architecture", "cultural exchange"]
  },
  "Byzantine Empire": {
    figures: ["custom", "Constantine", "Justinian", "Theodora", "Byzantine Scholars", "Icon Painters"],
    locations: ["custom", "Constantinople", "Hagia Sophia", "Imperial Palace", "Hippodrome", "Byzantine Church", "Market Square"],
    focuses: ["art and mosaics", "religion", "government", "trade", "learning", "architecture", "cultural preservation"]
  },
  "Mongol Empire": {
    figures: ["custom", "Genghis Khan", "Kublai Khan", "Marco Polo", "Mongol Warriors", "Mongol Messengers"],
    locations: ["custom", "Mongolian Steppes", "Yurt Camp", "Karakorum", "Silk Road", "Yuan Palace", "Trading Post"],
    focuses: ["horsemanship", "conquest", "trade", "cultural exchange", "communication", "tolerance", "nomadic life"]
  },
  "Ottoman Empire": {
    figures: ["custom", "Suleiman the Magnificent", "Mehmed the Conqueror", "Ottoman Janissaries", "Ottoman Architects"],
    locations: ["custom", "Topkapi Palace", "Blue Mosque", "Grand Bazaar", "Ottoman Court", "Bosphorus", "Ottoman Fortress"],
    focuses: ["architecture", "trade", "government", "military", "cultural diversity", "art", "religious tolerance"]
  },
  "French Revolution": {
    figures: ["custom", "Marie Antoinette", "Napoleon Bonaparte", "Robespierre", "Lafayette", "Revolutionary Citizens"],
    locations: ["custom", "Palace of Versailles", "Bastille", "Paris Streets", "National Assembly", "Guillotine Square", "Revolutionary Cafe"],
    focuses: ["equality and rights", "government", "social change", "courage", "justice", "democracy", "revolution"]
  },
  "Napoleonic Wars": {
    figures: ["custom", "Napoleon Bonaparte", "Duke of Wellington", "Admiral Nelson", "Josephine", "Napoleon's Soldiers"],
    locations: ["custom", "Waterloo", "Trafalgar", "Russian Steppes", "Elba", "French Palace", "European Battlefield"],
    focuses: ["leadership", "strategy", "international relations", "courage", "consequences of war", "diplomacy", "legacy"]
  },
  "Victorian Era": {
    figures: ["custom", "Queen Victoria", "Charles Dickens", "Florence Nightingale", "Lewis Carroll", "Jack the Ripper"],
    locations: ["custom", "Buckingham Palace", "Victorian Factory", "London Streets", "Victorian Home", "Railway Station", "Crystal Palace"],
    focuses: ["innovation", "social reform", "daily life", "industry", "literature", "empire", "progress"]
  },
  "Roaring Twenties": {
    figures: ["custom", "Henry Ford", "Charlie Chaplin", "Babe Ruth", "Amelia Earhart", "Louis Armstrong"],
    locations: ["custom", "Jazz Club", "Movie Theater", "Baseball Stadium", "Ford Factory", "Radio Station", "Speakeasy"],
    focuses: ["innovation", "entertainment", "sports", "music", "technology", "social change", "prosperity"]
  },
  "1960s": {
    figures: ["custom", "John F. Kennedy", "Martin Luther King Jr.", "The Beatles", "Neil Armstrong", "Rosa Parks"],
    locations: ["custom", "White House", "Concert Hall", "Space Center", "Civil Rights March", "Television Studio", "University Campus"],
    focuses: ["civil rights", "space exploration", "music and culture", "social change", "technology", "peace", "youth movement"]
  },
  "Ancient India": {
    figures: ["custom", "Buddha", "Ashoka", "Gandhi", "Chandragupta Maurya", "Kalidasa"],
    locations: ["custom", "Taj Mahal", "Buddhist Temple", "Ganges River", "Indian Palace", "Spice Market", "Himalayan Mountains"],
    focuses: ["philosophy and religion", "mathematics", "trade", "daily life", "art", "non-violence", "wisdom"]
  },
  "Silk Road": {
    figures: ["custom", "Marco Polo", "Silk Merchants", "Camel Drivers", "Buddhist Monks", "Persian Traders"],
    locations: ["custom", "Caravanserai", "Desert Oasis", "Mountain Pass", "Trading City", "Monastery", "Bazaar"],
    focuses: ["trade and commerce", "cultural exchange", "exploration", "perseverance", "cooperation", "diversity", "adventure"]
  },
  "Crusades": {
    figures: ["custom", "Richard the Lionheart", "Saladin", "Crusader Knights", "Pilgrims", "Byzantine Emperor"],
    locations: ["custom", "Jerusalem", "Crusader Castle", "Holy Land", "Medieval Ship", "Monastery", "Battlefield"],
    focuses: ["religious faith", "cultural conflict", "chivalry", "travel", "consequences of war", "tolerance", "peace"]
  },
  "Black Death": {
    figures: ["custom", "Medieval Doctors", "Plague Survivors", "Religious Leaders", "Merchants", "Farmers"],
    locations: ["custom", "Medieval Town", "Monastery Hospital", "Quarantine House", "Village", "Cathedral", "Trading Post"],
    focuses: ["survival", "helping others", "medical knowledge", "community", "resilience", "social change", "hope"]
  },
  "Printing Press Era": {
    figures: ["custom", "Johannes Gutenberg", "Scribes", "Book Printers", "Scholars", "Renaissance Artists"],
    locations: ["custom", "Printing Workshop", "Monastery Scriptorium", "University", "Book Shop", "Library", "Scholar's Study"],
    focuses: ["communication", "learning", "innovation", "literacy", "knowledge sharing", "progress", "invention"]
  },
  "Discovery of America": {
    figures: ["custom", "Christopher Columbus", "Queen Isabella", "Native Americans", "Spanish Explorers", "Ship Crews"],
    locations: ["custom", "Columbus's Ships", "New World Shore", "Spanish Court", "Native Village", "Harbor", "Exploration Camp"],
    focuses: ["exploration", "courage", "cultural meeting", "navigation", "discovery", "consequences", "adventure"]
  },
  "Lewis and Clark Expedition": {
    figures: ["custom", "Lewis and Clark", "Sacagawea", "York", "Native American Guides", "Expedition Members"],
    locations: ["custom", "Missouri River", "Rocky Mountains", "Pacific Ocean", "Native Villages", "Corps Camp", "Western Territory"],
    focuses: ["exploration", "teamwork", "courage", "cultural exchange", "mapping", "natural science", "perseverance"]
  },
  "Underground Railroad": {
    figures: ["custom", "Harriet Tubman", "Frederick Douglass", "Conductors", "Station Masters", "Freedom Seekers"],
    locations: ["custom", "Safe House", "Plantation", "Northern City", "Railroad Station", "Quaker Meeting House", "Canada Border"],
    focuses: ["freedom", "courage", "helping others", "justice", "sacrifice", "hope", "equality"]
  }
};

interface SavedStory {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  storyType: 'fantasy' | 'history';
  universe?: string;
  historyPeriod?: string;
  length: number;
}

interface FormData {
  childName: string;
  age: string;
  moral: string;
  customMoral: string;
  universe: string;
  characters: string;
  interests: string;
  friends: string;
  siblings: string;
  family: string;
  length: number;
  storyStyle: string;
  customUniverse: string;
  notes: string;
  twist: boolean;
  humor: boolean;
  excludeScary: boolean;
  historyMode: boolean;
  historyPeriod: string;
  customHistoryPeriod: string;
  historicalFigure: string;
  customHistoricalFigure: string;
  historicalLocation: string;
  customHistoricalLocation: string;
  educationalFocus: string;
  savedStories?: SavedStory[];
  premium?: boolean; // true if subscribed, false/undefined if free
  parentEmail?: string;
}

const App: React.FC = () => {
  const [step, setStep] = useState<'home' | 'profile' | 'story' | 'storyDisplay' | 'storyLibrary'>('home');
  const [form, setForm] = useState<FormData>({
    childName: "", age: "", moral: "", customMoral: "", universe: "", characters: "", interests: "",
    friends: "", siblings: "", family: "", length: 5, customUniverse: "", notes: "",
    twist: false, humor: false, excludeScary: false,
    historyMode: false, historyPeriod: "", customHistoryPeriod: "", historicalFigure: "", storyStyle: "classic",
    customHistoricalFigure: "", historicalLocation: "", customHistoricalLocation: "", educationalFocus: "",
    savedStories: [], premium: false
  });

  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPremium, setIsPremium] = useState(true); // TEMP for testing styles
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<SavedStory | null>(null);

  // Initialize profiles with proper savedStories arrays
  const [profiles, setProfiles] = useState<Record<string, FormData>>(() => {
    const saved = localStorage.getItem("profiles");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all profiles have savedStories arrays
      Object.keys(parsed).forEach(key => {
        if (!parsed[key].savedStories) parsed[key].savedStories = [];
        if (typeof parsed[key].premium === 'undefined') parsed[key].premium = false; // ⬅️ Add this
      });

      return parsed;
    }
    return {};
  });

  const [selectedProfile, setSelectedProfile] = useState<string>(localStorage.getItem("lastProfile") || "");

  const handleChange = useCallback((key: keyof FormData, value: string | number | boolean) => {
    setForm(prev => {
      const updated = { ...prev, [key]: value };
      if (key === "parentEmail" && typeof value === "string") {
        setTimeout(() => checkPremium(), 100); // Check after typing stops
      }
      return updated;
    });
  }, [profiles]);

  // Helper functions for history mode
  const getAvailableFigures = () => {
    if (!form.historyPeriod || form.historyPeriod === "custom") return ["custom"];
    return historicalData[form.historyPeriod]?.figures || ["custom"];
  };

  const getAvailableLocations = () => {
    if (!form.historyPeriod || form.historyPeriod === "custom") return ["custom"];
    return historicalData[form.historyPeriod]?.locations || ["custom"];
  };

  const getAvailableFocuses = () => {
    if (!form.historyPeriod || form.historyPeriod === "custom") {
      return ["daily life", "inventions", "exploration", "art and architecture", "government", "science"];
    }
    return historicalData[form.historyPeriod]?.focuses || ["daily life", "achievements"];
  };

  const saveStoryToProfile = () => {
    if (!form.premium && (form.savedStories?.length || 0) >= 3) {
      alert("You've reached the limit of 3 saved stories. Upgrade to DreamTales Unlimited to save more!");
      return;
    }
    if (!story || !form.childName) return;

    const newStory: SavedStory = {
      id: Date.now().toString(),
      title: `${form.childName}'s ${form.historyMode ? 'Historical Adventure' : 'Dream Tale'}`,
      content: story,
      dateCreated: new Date().toLocaleDateString(),
      storyType: form.historyMode ? 'history' : 'fantasy',
      universe: form.historyMode ? undefined : (form.universe === 'custom' ? form.customUniverse : form.universe),
      historyPeriod: form.historyMode ? (form.historyPeriod === 'custom' ? form.customHistoryPeriod : form.historyPeriod) : undefined,
      length: form.length
    };

    const updatedForm = {
      ...form,
      savedStories: [...(form.savedStories || []), newStory]
    };

    setForm(updatedForm);

    const updatedProfiles = { ...profiles, [form.childName]: updatedForm };
    setProfiles(updatedProfiles);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    alert("Story saved to library!");
  };

  const deleteStory = (storyId: string) => {
    const updatedForm = {
      ...form,
      savedStories: (form.savedStories || []).filter(story => story.id !== storyId)
    };

    setForm(updatedForm);

    const updatedProfiles = { ...profiles, [form.childName]: updatedForm };
    setProfiles(updatedProfiles);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
  };
  const checkPremium = async () => {
    try {
      const res = await fetch("https://76d8b80e-ce1b-4bcf-b728-c8bb25077088-00-625bmg1jz2gp.picard.replit.dev/check-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.parentEmail })
      });
      const data = await res.json();
      setIsPremium(data.premium);
    } catch (err) {
      console.error("Error checking premium status:", err);
      setIsPremium(false);
    }
  };

  const generateStory = async (): Promise<void> => {
    setLoading(true); setError(""); setStory("");

    // Only destructure the variables you actually use
    const { childName, age, moral, customMoral, universe, customUniverse, characters, length, twist, humor } = form;
    if (!isPremium && (form.savedStories?.length || 0) >= 3) {
      setError("You’ve reached your free story limit. Upgrade to DreamTales Unlimited to save more.");
      setLoading(false);
      return;
    }
    if (form.historyMode) {
      if (!childName || !age || !form.historyPeriod) {
        setError("Please complete child's name, age, and historical period to generate the story.");
        setLoading(false); return;
      }
    } else {
      if (!childName || !age || !moral || !universe) {
        setError("Please complete all required fields to generate the story.");
        setLoading(false); return;
      }
    }

    const finalMoral = moral === "custom" ? customMoral : moral;
    const finalUniverse = universe === "custom" ? customUniverse : universe;
    const finalHistoryPeriod = form.historyPeriod === "custom" ? form.customHistoryPeriod : form.historyPeriod;
    let prompt;
    if (!isPremium && form.storyStyle !== "classic") form.storyStyle = "classic";
    const style = form.storyStyle || "classic";

    if (form.historyMode) {
      // Declare these variables only when they're needed
      const finalHistoricalFigure = form.historicalFigure === "custom" ? form.customHistoricalFigure : form.historicalFigure;
      const finalHistoricalLocation = form.historicalLocation === "custom" ? form.customHistoricalLocation : form.historicalLocation;

      prompt = `Write a captivating educational adventure story for ${childName}, age ${age}, set during the time of ${finalHistoryPeriod}. Begin with an exciting hook that makes history feel alive and urgent. Use real facts, names, and cultural details from that era.

Story elements:
- Include the historical figure ${finalHistoricalFigure}, and portray them accurately and engagingly.
- The setting should feel authentic—set the scene at ${finalHistoricalLocation}, describing the environment, sights, sounds, and challenges of the time.
- Weave in an educational focus on ${form.educationalFocus} and ensure it's naturally taught during the adventure.
- Use immersive dialogue and emotion, letting the child learn through the character’s actions, decisions, and reflections.
- End with a dramatic but accurate resolution that reinforces the core learning point.

Structure:
- Story should be around ${length * 150} words, broken into chapters to make it feel like a real book.
- Feel free to insert subtle narration or "Did You Know?" facts at the end of each chapter for historical trivia.
- Include a short bonus section at the end with 3 fun trivia questions about the real history.

The tone should be adventurous, thoughtful, and emotionally engaging. Do not talk down to the reader—treat the child like a curious explorer.`;
      // Add premium story style if it's not classic
      if (style && style !== "classic") {
        prompt += ` Now retell the entire story using the following unique creative style: "${stylePrompts[style]}"`;
      }

    } else {
      prompt = `${stylePrompts[style]}      
Create an immersive, high-quality bedtime story for a child named ${childName}, age ${age}, set in the ${finalUniverse} universe. The story should include vivid references to well-known characters, settings, and lore from the ${finalUniverse} world.

Theme: Teach the moral of ${finalMoral} in a natural and meaningful way through the character's journey. 

Include:
- A dramatic opening that quickly pulls the child into the action.
- Dialogue and emotional moments that show character development.
- Magical or exciting twists that keep the story exciting.
- A meaningful resolution where the moral is learned or applied.
${characters ? `Incorporate these characters: ${characters}.` : ""}
${twist ? "Add an unexpected twist that makes the child gasp or laugh." : ""}
${humor ? "Include playful humor appropriate for a young audience." : ""}
Do not rush the ending. Make sure the story ends with a satisfying emotional or moral conclusion.

Length: Aim for a ${length * 150}-word story divided into clearly labeled chapters if appropriate. Use rich storytelling language, but keep it clear and age-appropriate.`;
      // Add premium story style if it's not classic
      if (style && style !== "classic") {
        prompt += ` Now retell the entire story using the following unique creative style: "${stylePrompts[style]}"`;
      }

    }
    try {
      const response = await fetch("https://76d8b80e-ce1b-4bcf-b728-c8bb25077088-00-625bmg1jz2gp.picard.replit.dev/generate", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt })
      });
      const text = await response.text();
      const data = JSON.parse(text);
      setStory(data.story || "[No story returned from server.]");
      setStep('storyDisplay');
    } catch (err: any) {
      setError("Failed to reach the story server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const shareStory = () => {
    if (navigator.share) {
      navigator.share({ title: `${form.childName}'s Dream Tale`, text: story });
    } else {
      navigator.clipboard.writeText(story);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const downloadStory = () => {
    const element = document.createElement("a");
    const file = new Blob([story], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${form.childName}_dream_tale.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";
  const buttonClass = "w-full bg-gradient-to-r text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200";

  if (step === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 pt-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">DreamTales</h1>
            <p className="text-xl text-gray-600 mb-8">Create magical, personalized bedtime (or anytime) stories for your little ones</p>
          </div>

          {/* UPGRADE CTA */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-xl p-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Create Unlimited Stories!</h3>
                <p className="text-yellow-100 mb-4">Generate as many magical tales as you want with DreamTales Unlimited</p>
                <a
                  href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-yellow-600 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-yellow-50 transition-all"
                >
                  Upgrade to DreamTales Unlimited
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 max-w-md w-full">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Profile</h2>
                <p className="text-gray-600 mb-6">Set up a new profile for your child with their interests, friends, and preferences.</p>
                <button onClick={() => {
                  setForm({
                    childName: "", age: "", moral: "", customMoral: "", universe: "", characters: "", interests: "",
                    friends: "", siblings: "", family: "", length: 5, customUniverse: "", notes: "",
                    twist: false, humor: false, excludeScary: false, historyMode: false, historyPeriod: "",
                    customHistoryPeriod: "", historicalFigure: "", customHistoricalFigure: "", storyStyle: "classic",
                    historicalLocation: "", customHistoricalLocation: "", educationalFocus: "", savedStories: []
                  });
                  setStep('profile');
                }} className={`${buttonClass} from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600`}>
                  Create Profile
                </button>
              </div>
            </div>
          </div>

          {Object.keys(profiles).length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Saved Profiles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(profiles).map(name => (
                  <div key={name} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all">
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-lg">{name}</h4>
                          <p className="text-sm text-gray-600">Age {profiles[name].age}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {profiles[name].interests ? profiles[name].interests.substring(0, 35) + '...' : 'No interests listed'}
                          </p>
                          <p className="text-xs text-purple-600 font-medium mt-1">
                            📚 {profiles[name].savedStories?.length || 0} saved stories
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete ${name}'s profile? This cannot be undone.`)) {
                              const updated = { ...profiles };
                              delete updated[name];
                              setProfiles(updated);
                              localStorage.setItem("profiles", JSON.stringify(updated));
                              if (selectedProfile === name) {
                                setSelectedProfile("");
                                localStorage.removeItem("lastProfile");
                              }
                            }
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2 flex-shrink-0"
                          title={`Delete ${name}'s profile`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setForm(profiles[name]);
                            setSelectedProfile(name);
                            setStep('story');
                          }}
                          className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors font-medium"
                        >
                          Create Story
                        </button>
                        <button
                          onClick={() => {
                            setForm(profiles[name]);
                            setSelectedProfile(name);
                            setStep('profile');
                          }}
                          className="px-3 py-2 border border-purple-300 text-purple-600 rounded-lg text-sm hover:bg-purple-50 transition-colors font-medium"
                        >
                          Edit
                        </button>
                        {(profiles[name].savedStories?.length || 0) > 0 && (
                          <button
                            onClick={() => {
                              setForm(profiles[name]);
                              setSelectedProfile(name);
                              setStep('storyLibrary');
                            }}
                            className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors font-medium"
                          >
                            Library
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center"><Heart className="w-5 h-5 mr-2" /><span>Personalized Stories</span></div>
              <div className="flex items-center"><Star className="w-5 h-5 mr-2" /><span>AI-Generated</span></div>
              <div className="flex items-center"><Moon className="w-5 h-5 mr-2" /><span>Perfect for Bedtime</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Child's Profile</h1>
            <p className="text-gray-600">Tell us about your little dreamer!</p>
          </div>

          <div className="space-y-6">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Child's Name</label><input className={inputClass} placeholder="Enter your child's name" value={form.childName} onChange={e => handleChange("childName", e.target.value)} /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Email</label>
              <input
                className={inputClass}
                placeholder="Enter your email (to unlock premium)"
                value={form.parentEmail || ""}
                onChange={e => handleChange("parentEmail", e.target.value)}
              />
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Age</label><input className={inputClass} placeholder="How old are they?" value={form.age} onChange={e => handleChange("age", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Interests & Hobbies</label><textarea className={`${inputClass} h-20 resize-none`} placeholder="What does your child love? (sports, animals, music, etc.)" value={form.interests} onChange={e => handleChange("interests", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Friends</label><textarea className={`${inputClass} h-20 resize-none`} placeholder="Tell us about their friends" value={form.friends} onChange={e => handleChange("friends", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Siblings</label><textarea className={`${inputClass} h-20 resize-none`} placeholder="Brothers, sisters, or pets?" value={form.siblings} onChange={e => handleChange("siblings", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Family Members</label><textarea className={`${inputClass} h-20 resize-none`} placeholder="Parents, grandparents, other family" value={form.family} onChange={e => handleChange("family", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Parent Notes</label><textarea className={`${inputClass} h-20 resize-none`} placeholder="Any special instructions or preferences?" value={form.notes} onChange={e => handleChange("notes", e.target.value)} /></div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const updatedProfiles = { ...profiles, [form.childName]: form };
                  setProfiles(updatedProfiles);
                  localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
                  localStorage.setItem("lastProfile", form.childName);
                  setSelectedProfile(form.childName);
                  setStep('story');
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Save Profile & Continue
              </button>
              <button onClick={() => setStep('home')} className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'story') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            {!isPremium && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center shadow">
                <p className="text-yellow-800 font-medium">
                  You're using the free version of DreamTales. Upgrade to unlock unlimited stories, longer adventures, and immersive writing styles!
                </p>
                <a
                  href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  Upgrade to DreamTales Unlimited
                </a>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                DreamTales Story Generator
              </h1>
              <p className="text-gray-600">Creating magical stories for {form.childName}</p>
              {isPremium && (
                <div className="mt-2 inline-flex items-center px-4 py-1 bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm font-semibold rounded-full shadow-sm">
                  🌟 Premium Unlocked
                </div>
              )}
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.historyMode}
                  onChange={e => {
                    handleChange('historyMode', e.target.checked);
                    if (!e.target.checked) {
                      handleChange('historyPeriod', '');
                      handleChange('historicalFigure', '');
                      handleChange('historicalLocation', '');
                      handleChange('educationalFocus', '');
                    }
                  }}
                  className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 mr-3"
                />
                <span className="text-lg font-semibold text-amber-800">📚 Enable History Mode</span>
              </label>

              {form.historyMode && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Historical Period</label>
                    <select
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                      value={form.historyPeriod}
                      onChange={e => {
                        handleChange('historyPeriod', e.target.value);
                        handleChange('historicalFigure', '');
                        handleChange('historicalLocation', '');
                        handleChange('educationalFocus', '');
                      }}
                    >
                      <option value="">Choose a time period</option>
                      {historyPeriods.map(period => <option key={period} value={period}>{period}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Historical Figure</label>
                    <select
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                      value={form.historicalFigure}
                      onChange={e => handleChange('historicalFigure', e.target.value)}
                      disabled={!form.historyPeriod}
                    >
                      <option value="">Choose a historical person</option>
                      {getAvailableFigures().map(figure =>
                        <option key={figure} value={figure}>{figure}</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Historical Location</label>
                    <select
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                      value={form.historicalLocation}
                      onChange={e => handleChange('historicalLocation', e.target.value)}
                      disabled={!form.historyPeriod}
                    >
                      <option value="">Choose a historical place</option>
                      {getAvailableLocations().map(location =>
                        <option key={location} value={location}>{location}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Educational Focus</label>
                    <select
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                      value={form.educationalFocus}
                      onChange={e => handleChange('educationalFocus', e.target.value)}
                      disabled={!form.historyPeriod}
                    >
                      <option value="">What should they learn?</option>
                      {getAvailableFocuses().map(focus =>
                        <option key={focus} value={focus}>{focus.charAt(0).toUpperCase() + focus.slice(1)}</option>
                      )}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {!form.historyMode && (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Moral</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={form.moral}
                      onChange={e => handleChange('moral', e.target.value)}
                    >
                      {morals.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Universe</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={form.universe}
                      onChange={e => handleChange('universe', e.target.value)}
                    >
                      {universes.map((u) => {
                        const isPremiumUniverse = !["custom", "Harry Potter", "Frozen", "Pokemon"].includes(u);
                        const disabled = isPremiumUniverse && !isPremium;

                        return (
                          <option
                            key={u}
                            value={u}
                            disabled={disabled}
                          >
                            {u} {isPremiumUniverse ? (isPremium ? "✨" : "🔒") : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Characters</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Which characters should appear in the story?"
                    value={form.characters}
                    onChange={e => handleChange('characters', e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Length: {form.length} minute{form.length !== 1 ? 's' : ''} ({form.length * 150} words)
              </label>
              <input
                type="range"
                min="1"
                max={isPremium ? 15 : 5}
                value={form.length}
                onChange={e => handleChange('length', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              {!isPremium && form.length > 5 && (
                <p className="text-red-500 text-sm mt-2">
                  🔒 Story length is limited to 5 minutes in the free version. Upgrade to unlock longer adventures!
                </p>
              )}

            </div>
            {/* ✨ Story Style Selector */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="checkbox"
                  checked={form.twist}
                  onChange={e => handleChange('twist', e.target.checked)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Include Surprise Twist</span>
              </label>
              <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="checkbox"
                  checked={form.humor}
                  onChange={e => handleChange('humor', e.target.checked)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Add Humor</span>
              </label>
              <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="checkbox"
                  checked={form.excludeScary}
                  onChange={e => handleChange('excludeScary', e.target.checked)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">No Scary Parts</span>
              </label>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Story Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(stylePrompts).map((styleKey) => {
                  return (
                    <button
                      key={styleKey}
                      disabled={!isPremium && styleKey !== "classic"}
                      onClick={() => {
                        if (!isPremium && styleKey !== "classic") {
                          alert("Upgrade to DreamTales Unlimited to unlock this story style!");
                          return;
                        }
                        handleChange("storyStyle", styleKey);
                      }}
                      className={`px-4 py-3 rounded text-sm font-medium transition-all
      ${form.storyStyle === styleKey
                          ? "bg-purple-600 text-white"
                          : (!isPremium && styleKey !== "classic")
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-purple-100 text-purple-800 hover:bg-purple-200"}
    `}
                    >
                      {styleNames[styleKey] || styleKey}{" "}
                      {!isPremium && styleKey !== "classic" && (
                        <span className="ml-1 text-xs text-yellow-600">(🔒)</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isPremium && (
                <div className="mb-6 mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center shadow">
                  <p className="text-yellow-800 font-medium">
                    Want longer stories, more styles, and unlimited saves?
                  </p>
                  <a
                    href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Upgrade to DreamTales Unlimited
                  </a>
                </div>
              )}

              <button
                onClick={generateStory}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {form.historyMode ? 'Creating Historical Adventure...' : 'Generating Magic...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {form.historyMode ? 'Generate Historical Story' : 'Generate Story'}
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('home')}
                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Back to Home
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (step === 'storyDisplay') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4 font-serif">
              {form.childName}'s {form.historyMode ? 'Historical Adventure' : 'Dream Tale'}
            </h1>
            {!isPremium && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center shadow">
                <p className="text-yellow-800 font-medium">
                  You're using the free version of DreamTales. Upgrade to save unlimited stories and unlock premium features!
                </p>
                <a
                  href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  Upgrade to DreamTales Unlimited
                </a>
              </div>
            )}

          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>

              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{form.childName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Starring {form.childName}</p>
                      <p className="text-sm text-gray-600">Age {form.age} • {form.historyMode ? 'Educational Adventure' : 'Fantasy Tale'}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                      onClick={shareStory}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <button
                      onClick={downloadStory}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-800 leading-relaxed text-lg font-serif whitespace-pre-line"
                    style={{ lineHeight: '1.8' }}
                  >
                    {story}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-6 h-6 fill-current" />
                      <Star className="w-6 h-6 fill-current mx-1" />
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                  </div>

                  <p className="text-center text-gray-600 text-lg font-medium mb-8">
                    {form.historyMode ? `Great learning adventure, ${form.childName}!` : `Sweet dreams, ${form.childName}!`}
                  </p>
                  {!isPremium && (
                    <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <p className="text-gray-700 mb-4">Love this story? Create unlimited tales for {form.childName}!</p>
                      <a
                        href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-yellow-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-yellow-600 transition-all"
                      >
                        Upgrade to DreamTales Unlimited
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={saveStoryToProfile}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Save to Library
                  </button>

                  <button
                    onClick={() => {
                      setStory("");
                      setError("");
                      setStep('story');
                    }}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Another Story
                  </button>

                  <button
                    onClick={() => setStep('home')}
                    className="flex items-center justify-center px-8 py-4 border-2 border-purple-300 text-purple-600 rounded-xl font-semibold text-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showCopied && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Story copied to clipboard!
          </div>
        )}

      </div>

    );
  }

  if (step === 'storyLibrary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{form.childName}'s Story Library</h1>
            {!isPremium && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center shadow">
                <p className="text-yellow-800 font-medium">
                  You're using the free version of DreamTales. Upgrade to save unlimited stories and unlock premium features!
                </p>
                <a
                  href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  Upgrade to DreamTales Unlimited
                </a>
              </div>
            )}

            <p className="text-gray-600">{form.savedStories?.length || 0} saved stories</p>
          </div>
          {/* UPGRADE CTA */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 max-w-md mx-auto mt-4 mb-4">
            <p className="text-white font-medium mb-2">Want to save unlimited stories?</p>
            <a
              href="https://yourstorename.lemon.squeezy.com/checkout/buy/xxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-yellow-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-50 transition-all text-sm"
            >
              Upgrade Now
            </a>
          </div>

        </div>
        {
          selectedStory ? (
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedStory.title}</h2>
                  <p className="text-gray-600">
                    {selectedStory.storyType === 'history' ? `📚 ${selectedStory.historyPeriod}` : `✨ ${selectedStory.universe}`} •
                    {selectedStory.dateCreated} • {selectedStory.length} min read
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedStory.content);
                      setShowCopied(true);
                      setTimeout(() => setShowCopied(false), 2000);
                    }}
                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this story permanently?')) {
                        deleteStory(selectedStory.id);
                        setSelectedStory(null);
                      }
                    }}
                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-gray-800 leading-relaxed whitespace-pre-line font-serif text-lg">
                  {selectedStory.content}
                </div>
              </div>

              <button
                onClick={() => setSelectedStory(null)}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Back to Library
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {(form.savedStories || []).map(story => (
                  <div key={story.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer" onClick={() => setSelectedStory(story)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{story.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          {story.storyType === 'history' ? (
                            <>
                              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium mr-2">📚 History</span>
                              <span>{story.historyPeriod}</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium mr-2">✨ Fantasy</span>
                              <span>{story.universe}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{story.dateCreated} • {story.length} min read</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {story.content.substring(0, 150)}...
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        Read Full Story →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setStep('story')}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5 mr-2 inline" />
                    Create New Story
                  </button>
                  <button
                    onClick={() => setStep('home')}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </>
          )
        }
      </div>
    );
  }

  return null;
};

export default App;
