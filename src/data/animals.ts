import { Animal } from '../types';

export const animalsData: Animal[] = [
  {
    id: 'an-1',
    slug: 'bonolata',
    name: 'Bonolata',
    species: 'Cat',
    breed: 'Domestic Calico',
    gender: 'Female',
    age: '3 years',
    ageGroup: 'Adult',
    status: 'Sanctuary Resident',
    location: 'Biraal Bari Sanctuary, Dhaka',
    isBiraalBariResident: true,
    yearsInCare: '2 years',
    specialNeeds: ['Pelvic healing therapy', 'Special gastrointestinal diet'],
    personality: ['Affectionate', 'Gentle', 'Quiet Observer', 'Loving'],
    shortDescription: 'Our beloved sanctuary ambassador. Survived severe road trauma with quiet grace and boundless trust in humans.',
    fullStory: `Bonolata was found on a stormy monsoon night near Mirpur 10, unable to move after being struck by a vehicle. A passerby contacted the AniRBan rescue emergency hotline. When our team arrived, her temperature was dangerously low and her pelvis was fractured in two places.

Over six months of intensive veterinary rehabilitation, orthopedic surgical stabilization, and dedicated hydrotherapy at Biraal Bari, Bonolata did something that surprised every veterinarian: she learned to walk and run again.

While she walks with a slight dignified wobble, Bonolata is completely pain-free and has become the honorary matriarch of Biraal Bari. She welcomes every newly rescued kitten with soft chirps and maternal grooming. Due to her past injuries, she has a permanent forever home at our sanctuary.`,
    rescueStorySummary: 'Found with fractured pelvis in Mirpur during monsoon. Restored through 6 months of orthopedic care.',
    images: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2024-06-14',
    monthlySponsorshipNeededBDT: 2500,
    currentSponsorsCount: 4,
    isFeatured: true,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'June 14, 2024',
        title: 'Emergency Night Rescue in Mirpur',
        description: 'Brought to emergency triage in shock with severe hypothermia and pelvic trauma.',
        location: 'Mirpur 10, Dhaka',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'June 15, 2024',
        title: 'Full Diagnostic Radiographs & Bloodwork',
        description: 'X-rays revealed bilateral pelvic fractures. Neurological reflexes remained intact.',
        location: 'Central Vet Hospital & AniRBan Clinic',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'June 20 - August 30, 2024',
        title: 'Surgical Stabilization & Confinement',
        description: 'Internal stabilization followed by cage rest, pain management, and nutritional support.',
        location: 'AniRBan Recovery Ward',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'September - December 2024',
        title: 'Physical Rehabilitation & Mobility Regained',
        description: 'Began assisted weight bearing and transitioned to free roaming at Biraal Bari.',
        location: 'Biraal Bari Sun Deck',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Permanent Sanctuary Resident & Ambassador',
        description: 'Thriving, fully mobile, and receives routine bi-annual orthopedic monitoring.',
        location: 'Biraal Bari Sanctuary',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      specialDiet: 'High-fiber gastrointestinal sensitive wet and dry food',
      dailyMedication: 'Joint supplement (Glucosamine/Chondroitin)',
      catFriendly: true,
      dogFriendly: true,
      kidFriendly: true,
      notes: [
        'Requires soft bedding to cushion healed pelvic joints',
        'Should not be allowed to jump from high cupboards or balconies',
        'Loves chin scratches and sunbathing by screened windows'
      ]
    }
  },
  {
    id: 'an-2',
    slug: 'milo',
    name: 'Milo',
    species: 'Cat',
    breed: 'Ginger Tabby',
    gender: 'Male',
    age: '2 years',
    ageGroup: 'Adult',
    status: 'Available for Adoption',
    location: 'Biraal Bari Adoption Wing, Dhaka',
    isBiraalBariResident: false,
    personality: ['Playful', 'Affectionate', 'Curious', 'Lap Cat', 'Chatty'],
    shortDescription: 'Playful, golden-spirited cuddle bug who greets you at the door with eager purrs.',
    fullStory: `Milo was found abandoned near Dhanmondi Lake as a vulnerable 4-month-old kitten, seeking shelter from aggressive territory cats under a tea stall. Our community volunteer scooped him up after noticing an eye infection and malnutrition.

Now two years old, Milo has grown into a breathtaking, glossy ginger boy with copper eyes. He is neutered, fully vaccinated, and microchipped. Milo loves interactive feather toys, sleeping across your keyboard while you type, and offering melodic trills whenever anyone enters the room.

He is ideally suited for an indoor apartment home with balcony safety netting.`,
    rescueStorySummary: 'Rescued from Dhanmondi lake area with respiratory illness. Now fully healthy and ready for adoption.',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2025-01-10',
    isFeatured: true,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Jan 10, 2025',
        title: 'Rescued from Dhanmondi 8/A',
        description: 'Brought in with bilateral conjunctivitis and dehydration.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Jan 11, 2025',
        title: 'Full Feline Health Panel',
        description: 'FIV/FeLV negative. Corneal ulcers ruled out.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Jan 12 - Feb 5, 2025',
        title: 'Antibiotics & Deworming Protocol',
        description: 'Complete recovery of ocular health and robust weight gain.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Feb 15, 2025',
        title: 'Neutered and Vaccinated',
        description: 'Rabies and Tricat core vaccinations administered.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Ready for Loving Forever Family',
        description: 'High energy, social, and perfectly litter trained.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: true,
      kidFriendly: true,
      notes: [
        'Strictly indoor home required with balcony netting',
        'Loves scratching posts and interactive wand toys',
        'Thrives in households that enjoy chatty, companion cats'
      ]
    }
  },
  {
    id: 'an-3',
    slug: 'shada',
    name: 'Shada',
    species: 'Cat',
    breed: 'Domestic White',
    gender: 'Male',
    age: '1.5 years',
    ageGroup: 'Young',
    status: 'Available for Adoption',
    location: 'Biraal Bari Foster Unit, Dhaka',
    isBiraalBariResident: false,
    specialNeeds: ['Congenital deafness', 'Requires visual hand cues'],
    personality: ['Sweet', 'Extremely Affectionate', 'Deep Sleeper', 'Calm'],
    shortDescription: 'Deaf snow-white prince with mesmerizing amber eyes who communicates with soft headbonks.',
    fullStory: `Shada was rescued from a busy construction site in Gulshan. Because he is congenitally deaf, he could not hear heavy machinery or approaching traffic, making the outdoors extremely hazardous for him.

Despite not having hearing, Shada is remarkably perceptive. He feels floor vibrations when you walk into the room and immediately rolls over for belly rubs. He responds wonderfully to gentle hand gestures and light cues.

He is gentle, loves curling up in sunbeams, and would thrive in a secure, calm home where someone can appreciate his quiet charm.`,
    rescueStorySummary: 'Rescued from hazardous construction site in Gulshan. Deaf and strictly requires safe indoor sanctuary.',
    images: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2025-02-04',
    isFeatured: true,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Feb 4, 2025',
        title: 'Gulshan 2 Site Extraction',
        description: 'Safely caught by rescue coordinator near forklift operations.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Feb 5, 2025',
        title: 'Auditory & Neurological Exam',
        description: 'Confirmed bilateral sensorineural deafness, otherwise 100% robust health.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Feb 10, 2025',
        title: 'Neutered, Microchipped & Vaccinated',
        description: 'Standard preventive medical protocol completed.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'March 1, 2025',
        title: 'Hand Cue Training',
        description: 'Trained to return when light switches or vibration taps are used.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Ready for Adoption',
        description: 'Eager for an indoor-only home with loving human companions.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: true,
      kidFriendly: true,
      notes: [
        'Strictly indoor-only due to deafness; cannot be outdoors unsupervised',
        'Balcony and open windows must be securely netted',
        'Responds to gentle touch to wake up rather than startling'
      ]
    }
  },
  {
    id: 'an-4',
    slug: 'kalo-shona',
    name: 'Kalo Shona',
    species: 'Cat',
    breed: 'Bombay Mix / Domestic Black',
    gender: 'Female',
    age: '3 years',
    ageGroup: 'Adult',
    status: 'Available for Adoption',
    location: 'Biraal Bari, Dhaka',
    isBiraalBariResident: false,
    personality: ['Quiet', 'Mysterious', 'Gentle', 'Loyal', 'Snuggle Expert'],
    shortDescription: 'Sleek black beauty who defies superstition with pure sweetness and loyal devotion.',
    fullStory: `Black cats in South Asia often face harsh superstitions and neglect. Kalo Shona was found trapped inside a concrete storm drain in Dhanmondi after days of heavy rainfall. Her crying alerted a student who reached out to AniRBan.

After a 2-hour technical rescue by our volunteers, Kalo Shona was gently extracted. She was filthy, shaken, but immediately started purring once wrapped in a warm dry towel.

Today, her fur is silk-black with emerald eyes. She is serene, patient, and prefers quiet evenings resting beside someone reading a book.`,
    rescueStorySummary: 'Rescued from storm drain in Dhanmondi. Affectionate survivor looking for a peaceful home.',
    images: [
      'https://images.unsplash.com/photo-1503777119540-ce54b422baff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1503777119540-ce54b422baff?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2024-11-18',
    isFeatured: false,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Nov 18, 2024',
        title: 'Drainage Pipe Extraction',
        description: 'Rescued from flooded drainage system, treated for mild hypothermia.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Nov 19, 2024',
        title: 'Clinical Triage',
        description: 'Clear lungs, no fractures, minor superficial abrasions.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Nov 20 - Dec 10, 2024',
        title: 'Parasite Cleansing & Spay Surgery',
        description: 'Successfully spayed, dewormed, and fully vaccinated.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Jan 2025',
        title: 'Socialization at Biraal Bari',
        description: 'Flourished in social sanctuary environment.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Seeking Forever Home',
        description: 'Ready for adoption by someone who adores black cats.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: false,
      kidFriendly: true,
      notes: [
        'Prefers a tranquil home without high-energy dogs',
        'Loves elevated perch trees and plush cushions'
      ]
    }
  },
  {
    id: 'an-5',
    slug: 'raju',
    name: 'Raju',
    species: 'Dog',
    breed: 'Desi Dog (Native South Asian Canine)',
    gender: 'Male',
    age: '2.5 years',
    ageGroup: 'Adult',
    status: 'Available for Adoption',
    location: 'AniRBan Canine Care Facility, Savar',
    isBiraalBariResident: false,
    personality: ['Eager to Please', 'Loyal', 'Intelligent', 'Playful', 'Protective'],
    shortDescription: 'Incredibly resilient native companion who survived an automobile hit and loves long sunset walks.',
    fullStory: `Raju was a beloved community dog in Sector 11, Uttara until he was hit by a speeding microbus, resulting in a fractured right hind femur. While community members provided biscuits, he needed specialized orthopedic intervention to ever walk without agony.

AniRBan’s rescue ambulance transported him for intramedullary pinning. Native Bangladeshi Desi dogs possess incredible genetic health and resilience: within 8 weeks, Raju was running alongside caretakers.

He is house-trained, walks politely on leash, gets along with other peaceful dogs, and has an unwavering heart of gold.`,
    rescueStorySummary: 'Femur fracture repaired through orthopedic surgery. Fully recovered, vaccinated, and seeking a loving family.',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2024-09-02',
    isFeatured: true,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Sept 2, 2024',
        title: 'Emergency Canine Rescue in Uttara',
        description: 'Immobilized and transported with acute right hindlimb lameness.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Sept 3, 2024',
        title: 'Orthopedic Radiology',
        description: 'Mid-shaft femur transverse fracture confirmed.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Sept 5, 2024',
        title: 'Intramedullary Pinning Surgery',
        description: 'Successful bone alignment and external splinting.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Oct - Nov 2024',
        title: 'Implant Removal & Leash Rehabilitation',
        description: 'Complete radiographic union. 100% full weight-bearing resumed.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Healthy, Neutered & Ready for Adoption',
        description: 'Vaccinated for Rabies and DHLPP with complete behavioral pass.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: false,
      dogFriendly: true,
      catFriendly: false,
      kidFriendly: true,
      notes: [
        'Requires daily brisk walk and safe enclosed yard or leash outings',
        'Desi dogs are exceptionally smart and thrive with basic agility or training games',
        'Extremely loyal to family guardians'
      ]
    }
  },
  {
    id: 'an-6',
    slug: 'neel',
    name: 'Neel',
    species: 'Cat',
    breed: 'Tabby Mix',
    gender: 'Male',
    age: '4 years',
    ageGroup: 'Adult',
    status: 'Sanctuary Resident',
    location: 'Biraal Bari Sanctuary, Dhaka',
    isBiraalBariResident: true,
    yearsInCare: '2.5 years',
    specialNeeds: ['Tripod (Missing front-left leg)', 'Sanctuary resident only'],
    personality: ['Brave', 'Curious', 'Speedy', 'Social Butterfly'],
    shortDescription: 'Our three-legged champion who runs faster than four-legged cats and loves sunbeams.',
    fullStory: `Neel was discovered near Tejgaon railway tracks with a crushed front limb after an encounter with a train carriage. Local youth immediately kept him sheltered in a carton and dialed AniRBan.

Veterinary surgeons determined an emergency amputation was essential to save his life from spreading sepsis. Following surgery, Neel adjusted with astonishing bravery. Within three days, he figured out his new tripod balance and was bounding across the clinic.

At Biraal Bari, Neel is a permanent sanctuary resident. He climbs cat trees with ease and serves as an inspiring reminder to visitors that differently-abled animals live full, joyful lives.`,
    rescueStorySummary: 'Front limb amputated following railway accident. Thriving tripod cat living happily at Biraal Bari.',
    images: [
      'https://images.unsplash.com/photo-1513360309081-38f076278f1c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1513360309081-38f076278f1c?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2023-11-20',
    monthlySponsorshipNeededBDT: 2000,
    currentSponsorsCount: 3,
    isFeatured: true,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Nov 20, 2023',
        title: 'Tejgaon Railway Emergency',
        description: 'Severe crush injury to left thoracic limb.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Nov 20, 2023',
        title: 'Emergency Vascular Evaluation',
        description: 'Irreversible nerve and tissue trauma; emergency amputation indicated.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Nov 21, 2023',
        title: 'High Scapular Amputation Surgery',
        description: 'Clean surgical margins, broad-spectrum antibiotics, pain fentanyl patch.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Dec 2023 - Jan 2024',
        title: 'Sanctuary Transfer & Adaptation',
        description: 'Incision healed cleanly; mastered tripod biomechanics with zero pain.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Permanent Biraal Bari Sanctuary Resident',
        description: 'Requires monthly sponsorship for specialized high-nutrition diet and routine vet care.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: true,
      kidFriendly: true,
      notes: [
        'Sanctuary resident available for monthly sponsorship',
        'Flooring must have non-skid rugs for optimum tripod grip',
        'Cannot be released outdoors'
      ]
    }
  },
  {
    id: 'an-7',
    slug: 'maya',
    name: 'Maya',
    species: 'Cat',
    breed: 'Tortoiseshell',
    gender: 'Female',
    age: '6 years',
    ageGroup: 'Senior',
    status: 'Sanctuary Resident',
    location: 'Biraal Bari Quiet Ward, Dhaka',
    isBiraalBariResident: true,
    yearsInCare: '3 years',
    specialNeeds: ['Complete bilateral blindness', 'Needs consistent furniture layout'],
    personality: ['Serene', 'Gentle Purrer', 'Loves Soft Brushing', 'Cuddly'],
    shortDescription: 'Senior blind matriarch of Biraal Bari who navigates the quiet sanctuary ward using scent and sound.',
    fullStory: `Maya arrived at AniRBan having lost her sight from untreated chronic cataracts and glaucoma while surviving on the streets of Old Dhaka. Confused and vulnerable, she was found curled up outside a bakery.

In our quiet sanctuary rooms at Biraal Bari, Maya blossomed. Blind cats map rooms with their whiskers and memory. Within two weeks, she knew the exact pathway from her favorite plush igloo bed to the water fountain and litter tray.

Maya loves nothing more than gentle head strokes, warm fleece blankets, and being spoken to in soft tones.`,
    rescueStorySummary: 'Blind senior tortoiseshell from Old Dhaka. Lives happily in Biraal Bari’s specially adapted quiet room.',
    images: [
      'https://images.unsplash.com/photo-1568607689150-17e625c1586e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1568607689150-17e625c1586e?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2023-04-12',
    monthlySponsorshipNeededBDT: 2500,
    currentSponsorsCount: 5,
    isFeatured: false,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Apr 12, 2023',
        title: 'Found Disoriented in Lalbagh',
        description: 'Rescued from road traffic; bilateral eye opacity.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Apr 14, 2023',
        title: 'Ophthalmic Examination',
        description: 'Complete irreversible bilateral retinal atrophy and mature cataracts.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'May 2023',
        title: 'Ocular Pressure Stabilization',
        description: 'Daily eye drops to relieve intraocular discomfort; senior blood panel.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'June 2023',
        title: 'Permanent Sanctuary Settling',
        description: 'Assigned to senior quiet suite with padded low perches.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Beloved Senior Resident',
        description: 'Receives regular geriatric monitoring, dental checkups, and gentle grooming.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: false,
      kidFriendly: false,
      notes: [
        'Sanctuary resident needing monthly sponsor',
        'Cannot be startled; call her name gently before touching',
        'Prefers calm environments with gentle human presence'
      ]
    }
  },
  {
    id: 'an-8',
    slug: 'mini',
    name: 'Mini',
    species: 'Cat',
    breed: 'Tricolor Calico',
    gender: 'Female',
    age: '7 months',
    ageGroup: 'Kitten/Puppy',
    status: 'Available for Adoption',
    location: 'Biraal Bari Kitten Nursery, Dhaka',
    isBiraalBariResident: false,
    personality: ['Energetic', 'Playful', 'Bouncy', 'Affectionate', 'Purr Monster'],
    shortDescription: 'Tiny bundle of boundless joy, acrobatics, and non-stop purrs looking for an adoring family.',
    fullStory: `Mini was found as a 4-week-old orphan kitten during an evening thunderstorm, shivering under a parked rickshaw in Mohammadpur. Bottle-fed around the clock by our dedicated sanctuary caretakers, Mini grew into a spirited, healthy dynamo.

She loves chasing ping pong balls, riding on human shoulders, and sleeping tucked right under your chin at bedtime. Mini is fully vaccinated, dewormed, and microchipped.`,
    rescueStorySummary: 'Bottle-fed orphan kitten rescued from Mohammadpur. Now a playful 7-month-old ready for her forever family.',
    images: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2025-08-15',
    isFeatured: false,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Aug 15, 2025',
        title: 'Emergency Rickshaw Extraction',
        description: 'Orphan neonate with severe hypoglycemia and hypothermia.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Aug 16, 2025',
        title: 'Neonatal Health Protocol',
        description: 'Enrolled in 24/7 milk-replacement feeding program.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Sept - Oct 2025',
        title: 'Vaccinations & Weaning',
        description: 'Successfully transitioned to premium kitten nutrition.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Nov 2025',
        title: 'Spay Procedure Completed',
        description: 'Spayed with zero surgical complications.',
        completed: true
      },
      {
        step: 'Current Status',
        date: 'Present Day',
        title: 'Available for Immediate Adoption',
        description: 'In peak health and eagerly awaiting adoption.',
        completed: true
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: true,
      kidFriendly: true,
      notes: [
        'High play drive; best suited with interactive toys or another playful cat',
        'Requires screened windows and secure apartment entry'
      ]
    }
  },
  {
    id: 'an-9',
    slug: 'bhalu',
    name: 'Bhalu',
    species: 'Dog',
    breed: 'Desi Dog Mix',
    gender: 'Male',
    age: '5 years',
    ageGroup: 'Adult',
    status: 'Under Care',
    location: 'AniRBan Recovery Clinic, Dhaka',
    isBiraalBariResident: false,
    specialNeeds: ['Demodectic mange treatment recovery', 'Joint supplements'],
    personality: ['Stoic', 'Gentle Giant', 'Patient', 'Grateful'],
    shortDescription: 'Sweet gentle soul currently undergoing therapeutic medicated baths and nutrition recovery.',
    fullStory: `Bhalu was reported by shopkeepers in Gabtoli. He had lost almost 90% of his coat to severe chronic mange and bacterial dermatitis, leaving him raw, bleeding, and constantly scratching.

When our rescue ambulance arrived, Bhalu wagged his tail weakly despite his intense discomfort. He is now in week six of his therapy, receiving twice-weekly medicated chlorhexidine baths, targeted ivermectin therapy, and high-protein therapeutic meals.

His fur is growing back thick and golden. Once his skin scrapings test negative, he will be available for adoption!`,
    rescueStorySummary: 'Severe skin disease and malnutrition being reversed with medical baths and nutrition.',
    images: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2026-01-14',
    monthlySponsorshipNeededBDT: 3000,
    currentSponsorsCount: 2,
    isFeatured: false,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'Jan 14, 2026',
        title: 'Emergency Rescue from Gabtoli',
        description: 'Admitted with generalized alopecia and secondary pyoderma.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'Jan 15, 2026',
        title: 'Deep Skin Scraping & Cytology',
        description: 'Heavy Demodex infestation identified.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'Jan 16 - Present',
        title: 'Systemic Acaricide & Medicated Dips',
        description: 'Therapeutic baths twice weekly and immune-boosting vitamins.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'In Progress',
        title: 'Hair Regrowth & Skin Barrier Restoration',
        description: '70% hair regrowth achieved; inflammation resolved.',
        completed: false
      },
      {
        step: 'Current Status',
        date: 'Projected May 2026',
        title: 'Under Final Medical Care',
        description: 'Estimated 3 weeks until clearance for adoption.',
        completed: false
      }
    ],
    careRequirements: {
      indoorOnly: false,
      specialDiet: 'Omega-3 fatty acid skin support diet',
      dogFriendly: true,
      catFriendly: true,
      kidFriendly: true,
      notes: [
        'Finishing medical clearance; donations or medical sponsorship support his treatments',
        'Extremely calm and docile temperament'
      ]
    }
  },
  {
    id: 'an-10',
    slug: 'tuli',
    name: 'Tuli',
    species: 'Cat',
    breed: 'Tabby Domestic',
    gender: 'Female',
    age: '1 year',
    ageGroup: 'Young',
    status: 'Recently Rescued',
    location: 'AniRBan Quarantine Ward, Dhaka',
    isBiraalBariResident: false,
    personality: ['Timid', 'Sweet', 'Curious', 'Gentle'],
    shortDescription: 'Rescued just two weeks ago from a market warehouse in Old Dhaka. Currently receiving quarantine care.',
    fullStory: `Tuli was trapped behind wooden crates inside a grain warehouse in Chawkbazar. Warehouse workers noticed she was limping and contacted our rescue dispatch.

Upon arrival, our veterinary team treated a swollen abscess on her paw and severe flea anemia. Tuli is currently in our quarantine unit, building strength with high-protein food and loving socialization before she moves into the adoption room.`,
    rescueStorySummary: 'Recently rescued from Chawkbazar warehouse with paw abscess. In quarantine recovery.',
    images: [
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1200&q=80',
    rescueDate: '2026-03-12',
    isFeatured: false,
    medicalHistory: [
      {
        step: 'Rescued',
        date: 'March 12, 2026',
        title: 'Chawkbazar Warehouse Rescue',
        description: 'Extracted safely and admitted with paw swelling and fever.',
        completed: true
      },
      {
        step: 'Assessment',
        date: 'March 13, 2026',
        title: 'Abscess Drainage & Antibiotic Sensitivity',
        description: 'Foreign splinter extracted; wound flushed and cleaned.',
        completed: true
      },
      {
        step: 'Treatment',
        date: 'March 14 - Present',
        title: 'Quarantine & Antimicrobial Therapy',
        description: 'Course of oral antibiotics and therapeutic nutrition.',
        completed: true
      },
      {
        step: 'Recovery',
        date: 'Pending',
        title: 'Vaccination & Sterilization',
        description: 'Scheduled following full abscess healing.',
        completed: false
      },
      {
        step: 'Current Status',
        date: 'In Progress',
        title: 'Quarantine Recovery',
        description: 'Will transition to Available for Adoption upon clearance.',
        completed: false
      }
    ],
    careRequirements: {
      indoorOnly: true,
      catFriendly: true,
      dogFriendly: false,
      kidFriendly: true,
      notes: [
        'Currently completing 21-day quarantine observation',
        'Soft spoken and responds to gentle handling'
      ]
    }
  }
];
