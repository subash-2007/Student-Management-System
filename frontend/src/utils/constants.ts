export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Data Science',
];

export const COURSES_BY_DEPARTMENT: Record<string, string[]> = {
  'Computer Science': [
    'B.Tech Computer Science & Engineering',
    'B.Tech Artificial Intelligence',
    'B.Tech Cyber Security',
    'M.Tech Computer Science',
  ],
  'Information Technology': [
    'B.Tech Information Technology',
    'B.Tech Cloud Computing',
    'M.Tech Information Technology',
  ],
  'Electronics & Communication': [
    'B.Tech Electronics & Communication',
    'B.Tech VLSI & Embedded Systems',
  ],
  'Mechanical Engineering': [
    'B.Tech Mechanical Engineering',
    'B.Tech Robotics & Automation',
  ],
  'Civil Engineering': [
    'B.Tech Civil Engineering',
    'B.Tech Structural Engineering',
  ],
  'Business Administration': [
    'Bachelor of Business Administration (BBA)',
    'Master of Business Administration (MBA)',
  ],
  'Data Science': [
    'B.Sc Data Science & Analytics',
    'M.Sc Big Data Technologies',
  ],
};

export const YEARS = [1, 2, 3, 4];
export const SECTIONS = ['A', 'B', 'C', 'D'];
export const GENDERS = ['Male', 'Female', 'Other'];
export const STATUSES = ['Active', 'Inactive'];
