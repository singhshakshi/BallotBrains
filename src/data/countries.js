export const SYSTEM_TYPES = {
  FPTP: { label: 'First Past the Post', color: '#1C3557', abbr: 'FPTP' },
  PR: { label: 'Proportional Representation', color: '#3A5C3E', abbr: 'PR' },
  MMP: { label: 'Mixed Member Proportional', color: '#5C3D6E', abbr: 'MMP' },
  TWO_ROUND: { label: 'Two-Round System', color: '#B33A3A', abbr: 'Two-Round' },
  AV: { label: 'Alternative Vote', color: '#C8A84B', abbr: 'AV' },
  STV: { label: 'Single Transferable Vote', color: '#0F6E56', abbr: 'STV' },
  BLOCK: { label: 'Block Voting', color: '#A04060', abbr: 'Block' },
  OTHER: { label: 'Other / Hybrid', color: '#8B6F47', abbr: 'Other' },
};

export const countries = [
  { name: 'India', flag: '🇮🇳', system: 'FPTP', continent: 'Asia', population: '1.4B', legislatures: 'Lok Sabha, Rajya Sabha' },
  { name: 'United States', flag: '🇺🇸', system: 'FPTP', continent: 'Americas', population: '330M', legislatures: 'House, Senate' },
  { name: 'United Kingdom', flag: '🇬🇧', system: 'FPTP', continent: 'Europe', population: '67M', legislatures: 'House of Commons, House of Lords' },
  { name: 'Canada', flag: '🇨🇦', system: 'FPTP', continent: 'Americas', population: '38M', legislatures: 'House of Commons, Senate' },
  { name: 'Nigeria', flag: '🇳🇬', system: 'FPTP', continent: 'Africa', population: '220M', legislatures: 'House of Representatives, Senate' },
  { name: 'Ghana', flag: '🇬🇭', system: 'FPTP', continent: 'Africa', population: '32M', legislatures: 'Parliament' },
  { name: 'Kenya', flag: '🇰🇪', system: 'FPTP', continent: 'Africa', population: '54M', legislatures: 'National Assembly, Senate' },
  { name: 'Malaysia', flag: '🇲🇾', system: 'FPTP', continent: 'Asia', population: '33M', legislatures: 'Dewan Rakyat, Dewan Negara' },

  { name: 'Germany', flag: '🇩🇪', system: 'MMP', continent: 'Europe', population: '83M', legislatures: 'Bundestag, Bundesrat' },
  { name: 'New Zealand', flag: '🇳🇿', system: 'MMP', continent: 'Oceania', population: '5M', legislatures: 'House of Representatives' },
  { name: 'South Korea', flag: '🇰🇷', system: 'MMP', continent: 'Asia', population: '52M', legislatures: 'National Assembly' },
  { name: 'Japan', flag: '🇯🇵', system: 'MMP', continent: 'Asia', population: '125M', legislatures: 'House of Representatives, House of Councillors' },
  { name: 'Mexico', flag: '🇲🇽', system: 'MMP', continent: 'Americas', population: '129M', legislatures: 'Chamber of Deputies, Senate' },

  { name: 'Sweden', flag: '🇸🇪', system: 'PR', continent: 'Europe', population: '10M', legislatures: 'Riksdag' },
  { name: 'Netherlands', flag: '🇳🇱', system: 'PR', continent: 'Europe', population: '17M', legislatures: 'House of Representatives, Senate' },
  { name: 'Norway', flag: '🇳🇴', system: 'PR', continent: 'Europe', population: '5.4M', legislatures: 'Storting' },
  { name: 'Denmark', flag: '🇩🇰', system: 'PR', continent: 'Europe', population: '5.8M', legislatures: 'Folketing' },
  { name: 'Finland', flag: '🇫🇮', system: 'PR', continent: 'Europe', population: '5.5M', legislatures: 'Eduskunta' },
  { name: 'Belgium', flag: '🇧🇪', system: 'PR', continent: 'Europe', population: '11.5M', legislatures: 'Chamber of Representatives, Senate' },
  { name: 'Spain', flag: '🇪🇸', system: 'PR', continent: 'Europe', population: '47M', legislatures: 'Congress of Deputies, Senate' },
  { name: 'Brazil', flag: '🇧🇷', system: 'PR', continent: 'Americas', population: '214M', legislatures: 'Chamber of Deputies, Federal Senate' },
  { name: 'South Africa', flag: '🇿🇦', system: 'PR', continent: 'Africa', population: '60M', legislatures: 'National Assembly, National Council of Provinces' },
  { name: 'Israel', flag: '🇮🇱', system: 'PR', continent: 'Middle East', population: '9.5M', legislatures: 'Knesset' },
  { name: 'Turkey', flag: '🇹🇷', system: 'PR', continent: 'Europe', population: '85M', legislatures: 'Grand National Assembly' },
  { name: 'Argentina', flag: '🇦🇷', system: 'PR', continent: 'Americas', population: '46M', legislatures: 'Chamber of Deputies, Senate' },

  { name: 'France', flag: '🇫🇷', system: 'TWO_ROUND', continent: 'Europe', population: '67M', legislatures: 'National Assembly, Senate' },
  { name: 'Egypt', flag: '🇪🇬', system: 'TWO_ROUND', continent: 'Africa', population: '104M', legislatures: 'House of Representatives' },
  { name: 'Iran', flag: '🇮🇷', system: 'TWO_ROUND', continent: 'Middle East', population: '87M', legislatures: 'Islamic Consultative Assembly' },
  { name: 'Vietnam', flag: '🇻🇳', system: 'TWO_ROUND', continent: 'Asia', population: '99M', legislatures: 'National Assembly' },
  { name: 'Chile', flag: '🇨🇱', system: 'TWO_ROUND', continent: 'Americas', population: '19M', legislatures: 'Chamber of Deputies, Senate' },

  { name: 'Australia', flag: '🇦🇺', system: 'AV', continent: 'Oceania', population: '26M', legislatures: 'House of Representatives, Senate' },
  { name: 'Papua New Guinea', flag: '🇵🇬', system: 'AV', continent: 'Oceania', population: '9M', legislatures: 'National Parliament' },
  { name: 'Fiji', flag: '🇫🇯', system: 'AV', continent: 'Oceania', population: '0.9M', legislatures: 'Parliament' },

  { name: 'Ireland', flag: '🇮🇪', system: 'STV', continent: 'Europe', population: '5M', legislatures: 'Dáil Éireann, Seanad Éireann' },
  { name: 'Malta', flag: '🇲🇹', system: 'STV', continent: 'Europe', population: '0.5M', legislatures: 'House of Representatives' },

  { name: 'Singapore', flag: '🇸🇬', system: 'BLOCK', continent: 'Asia', population: '5.5M', legislatures: 'Parliament' },
  { name: 'Thailand', flag: '🇹🇭', system: 'BLOCK', continent: 'Asia', population: '72M', legislatures: 'House of Representatives, Senate' },
  { name: 'Kuwait', flag: '🇰🇼', system: 'BLOCK', continent: 'Middle East', population: '4.3M', legislatures: 'National Assembly' },
  { name: 'Lebanon', flag: '🇱🇧', system: 'BLOCK', continent: 'Middle East', population: '5.5M', legislatures: 'Parliament' },

  { name: 'Russia', flag: '🇷🇺', system: 'OTHER', continent: 'Europe', population: '144M', legislatures: 'State Duma, Federation Council' },
  { name: 'China', flag: '🇨🇳', system: 'OTHER', continent: 'Asia', population: '1.4B', legislatures: 'National People\'s Congress' },
  { name: 'Italy', flag: '🇮🇹', system: 'OTHER', continent: 'Europe', population: '59M', legislatures: 'Chamber of Deputies, Senate' },
  { name: 'Indonesia', flag: '🇮🇩', system: 'PR', continent: 'Asia', population: '275M', legislatures: 'People\'s Representative Council' },
  { name: 'Pakistan', flag: '🇵🇰', system: 'FPTP', continent: 'Asia', population: '230M', legislatures: 'National Assembly, Senate' },
  { name: 'Bangladesh', flag: '🇧🇩', system: 'FPTP', continent: 'Asia', population: '170M', legislatures: 'Jatiya Sangsad' },
];

export const ELECTION_ROADMAPS = {
  'India': [
    { id: 'ward', label: 'Ward', level: 1, description: 'Smallest urban division' },
    { id: 'block', label: 'Block Panchayat', level: 2, description: 'Rural block-level governance' },
    { id: 'district', label: 'District Panchayat', level: 3, description: 'District-level rural governance' },
    { id: 'municipal', label: 'Municipal Corporation', level: 3, description: 'Urban local governance' },
    { id: 'state', label: 'Vidhan Sabha', level: 4, description: 'State Legislative Assembly' },
    { id: 'rajya', label: 'Rajya Sabha', level: 5, description: 'Council of States (Upper House)' },
    { id: 'lok', label: 'Lok Sabha', level: 6, description: 'House of the People (Lower House)' },
  ],
  'United States': [
    { id: 'local', label: 'Local/County', level: 1, description: 'City councils, county boards' },
    { id: 'state_leg', label: 'State Legislature', level: 2, description: 'State House & Senate' },
    { id: 'governor', label: 'Governor', level: 3, description: 'State executive' },
    { id: 'us_house', label: 'House of Representatives', level: 4, description: '435 members, 2-year terms' },
    { id: 'us_senate', label: 'Senate', level: 4, description: '100 members, 6-year terms' },
    { id: 'president', label: 'Presidential Electoral College', level: 5, description: '538 electors decide' },
  ],
  'United Kingdom': [
    { id: 'parish', label: 'Parish Council', level: 1, description: 'Local community level' },
    { id: 'local', label: 'Local Council', level: 2, description: 'Borough/district councils' },
    { id: 'devolved', label: 'Devolved Assembly', level: 3, description: 'Scotland, Wales, N. Ireland' },
    { id: 'commons', label: 'House of Commons', level: 4, description: '650 MPs, elected by FPTP' },
    { id: 'lords', label: 'House of Lords', level: 5, description: 'Appointed/hereditary members' },
  ],
  'Germany': [
    { id: 'municipal', label: 'Municipal Council', level: 1, description: 'Local government' },
    { id: 'landtag', label: 'State (Landtag)', level: 2, description: '16 state parliaments' },
    { id: 'bundesrat', label: 'Bundesrat', level: 3, description: 'Federal Council (states\' representation)' },
    { id: 'bundestag', label: 'Bundestag', level: 4, description: 'Federal Parliament (MMP system)' },
  ],
  'France': [
    { id: 'municipal', label: 'Municipal Council', level: 1, description: 'Commune-level governance' },
    { id: 'departmental', label: 'Departmental Council', level: 2, description: '101 departments' },
    { id: 'regional', label: 'Regional Council', level: 3, description: '18 regions' },
    { id: 'assembly', label: 'National Assembly', level: 4, description: '577 deputies, two-round system' },
    { id: 'senate', label: 'Senate', level: 5, description: '348 senators, indirect election' },
    { id: 'president', label: 'Presidential Election', level: 6, description: 'Direct two-round vote' },
  ],
  'Australia': [
    { id: 'local', label: 'Local Council', level: 1, description: 'Municipal/shire governance' },
    { id: 'state_lower', label: 'State Assembly', level: 2, description: 'State lower house' },
    { id: 'state_upper', label: 'State Senate', level: 2, description: 'State upper house' },
    { id: 'house', label: 'House of Representatives', level: 3, description: '151 seats, AV system' },
    { id: 'senate', label: 'Senate', level: 4, description: '76 senators, STV system' },
  ],
};

export function getCountryByName(name) {
  return countries.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export function getCountriesBySystem(systemType) {
  if (systemType === 'All') return countries;
  return countries.filter(c => c.system === systemType);
}
