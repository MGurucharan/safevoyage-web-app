// Mock data for hotels
// This data will be replaced with dynamic API calls in future development

export const mockHotelsData = [
  {
    id: 1,
    name: "The Leela Goa",
    region: "Goa",
    country: "India",
    district: "South Goa",
    category: "local",
    mainImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 9.2,
    rating: 4.8,
    reviewCount: 1247,
    sampleReview: "Luxurious beachfront resort with exceptional service and stunning ocean views. Perfect for a romantic getaway!",
    priceRange: { min: 8000, max: 25000 },
    tags: ["Beach Resort", "Luxury", "Spa", "Pool", "Ocean View"],
    description: "A premium beachfront resort offering world-class amenities and unparalleled luxury in the heart of Goa.",
    starRating: 5,
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Gym", "Beach Access"],
    roomTypes: ["Deluxe Room", "Ocean View Suite", "Presidential Suite"],
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    reviews: [
      {
        id: 1,
        author: "Priya Mehta",
        rating: 5,
        date: "2024-08-20",
        comment: "Absolutely amazing experience! The staff was incredibly helpful and the rooms were pristine. The beach access is a huge plus.",
        helpful: 28
      },
      {
        id: 2,
        author: "John Williams",
        rating: 5,
        date: "2024-08-10",
        comment: "Perfect for honeymoon! Beautiful property with excellent dining options. The spa treatments were heavenly.",
        helpful: 22
      },
      {
        id: 3,
        author: "Rajesh Kumar",
        rating: 4,
        date: "2024-07-28",
        comment: "Great location and facilities. The pool area is beautiful and the breakfast spread is impressive.",
        helpful: 19
      }
    ]
  },
  {
    id: 2,
    name: "Hotel Taj Palace",
    region: "Delhi",
    country: "India",
    district: "New Delhi",
    category: "local",
    mainImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 8.9,
    rating: 4.7,
    reviewCount: 2156,
    sampleReview: "Iconic luxury hotel in the heart of Delhi with impeccable service and world-class amenities.",
    priceRange: { min: 12000, max: 35000 },
    tags: ["Luxury", "Business Hotel", "Historic", "Fine Dining", "City Center"],
    description: "An iconic luxury hotel offering the finest in hospitality with a blend of traditional Indian charm and modern amenities.",
    starRating: 5,
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Multiple Restaurants", "Business Center", "Gym", "Concierge"],
    roomTypes: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    reviews: [
      {
        id: 1,
        author: "Anita Singh",
        rating: 5,
        date: "2024-08-25",
        comment: "Exceptional hospitality and beautiful architecture. The restaurant food is outstanding. Perfect for business trips.",
        helpful: 31
      },
      {
        id: 2,
        author: "Michael Brown",
        rating: 4,
        date: "2024-08-15",
        comment: "Great location in the city center. Easy access to major attractions. The rooms are spacious and well-appointed.",
        helpful: 24
      }
    ]
  },
  {
    id: 3,
    name: "Backwater Retreat Resort",
    region: "Kerala",
    country: "India",
    district: "Alleppey",
    category: "local",
    mainImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 8.5,
    rating: 4.6,
    reviewCount: 892,
    sampleReview: "Peaceful resort surrounded by lush backwaters. Perfect escape from city life with authentic Kerala experience.",
    priceRange: { min: 6000, max: 18000 },
    tags: ["Backwater View", "Nature", "Ayurveda", "Houseboat", "Peaceful"],
    description: "Experience the tranquil beauty of Kerala's backwaters at this serene resort offering traditional houseboats and authentic cuisine.",
    starRating: 4,
    amenities: ["Free WiFi", "Houseboat Tours", "Ayurvedic Spa", "Restaurant", "Fishing", "Cultural Programs"],
    roomTypes: ["Cottage", "Houseboat", "Deluxe Room"],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    reviews: [
      {
        id: 1,
        author: "Sanjay Reddy",
        rating: 5,
        date: "2024-08-18",
        comment: "Absolutely magical experience! The houseboat stay was unforgettable. Great food and peaceful environment.",
        helpful: 26
      },
      {
        id: 2,
        author: "Emma Davis",
        rating: 4,
        date: "2024-08-05",
        comment: "Beautiful location and very authentic Kerala experience. The Ayurvedic treatments were amazing.",
        helpful: 18
      }
    ]
  },
  {
    id: 4,
    name: "The Ritz-Carlton Tokyo",
    region: "Tokyo",
    country: "Japan",
    district: "Roppongi",
    category: "international",
    mainImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 9.5,
    rating: 4.9,
    reviewCount: 1876,
    sampleReview: "Incredible luxury hotel with breathtaking city views and exceptional Japanese hospitality. A truly memorable experience!",
    priceRange: { min: 45000, max: 120000 },
    tags: ["Luxury", "City View", "Fine Dining", "Spa", "Business Center"],
    description: "Experience the pinnacle of luxury in the heart of Tokyo with stunning city views and world-renowned Japanese hospitality.",
    starRating: 5,
    amenities: ["Free WiFi", "Spa", "Multiple Restaurants", "Fitness Center", "Business Center", "Concierge", "City Views"],
    roomTypes: ["Deluxe Room", "Club Level Room", "Suite"],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    reviews: [
      {
        id: 1,
        author: "Yuki Tanaka",
        rating: 5,
        date: "2024-08-22",
        comment: "Perfect service and amazing views of Tokyo skyline. The sushi restaurant is world-class. Highly recommended!",
        helpful: 42
      },
      {
        id: 2,
        author: "David Chen",
        rating: 5,
        date: "2024-08-12",
        comment: "Exceptional hotel with impeccable attention to detail. The spa treatments were incredibly relaxing.",
        helpful: 35
      }
    ]
  },
  {
    id: 5,
    name: "Grand Hotel Europe",
    region: "Paris",
    country: "France",
    district: "1st Arrondissement",
    category: "international",
    mainImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 9.0,
    rating: 4.8,
    reviewCount: 2341,
    sampleReview: "Classic Parisian elegance with modern luxury. Perfect location near the Louvre and excellent dining options.",
    priceRange: { min: 35000, max: 85000 },
    tags: ["Historic", "Luxury", "City Center", "Fine Dining", "Art Galleries"],
    description: "A historic luxury hotel in the heart of Paris, offering classic French elegance with modern amenities and prime location.",
    starRating: 5,
    amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Room Service", "Business Center", "Fitness Center"],
    roomTypes: ["Classic Room", "Superior Room", "Deluxe Suite"],
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    reviews: [
      {
        id: 1,
        author: "Marie Dubois",
        rating: 5,
        date: "2024-08-20",
        comment: "Magnifique! The hotel captures the essence of Parisian luxury. The breakfast is exceptional and staff is very attentive.",
        helpful: 38
      },
      {
        id: 2,
        author: "James Wilson",
        rating: 4,
        date: "2024-08-08",
        comment: "Beautiful historic building with modern comforts. Great location for exploring the city. The restaurant is outstanding.",
        helpful: 29
      }
    ]
  },
  {
    id: 6,
    name: "Marina Bay Luxury Hotel",
    region: "Singapore",
    country: "Singapore",
    district: "Marina Bay",
    category: "international",
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 9.3,
    rating: 4.7,
    reviewCount: 1654,
    sampleReview: "Stunning modern hotel with incredible infinity pool and panoramic city views. Perfect for luxury travelers!",
    priceRange: { min: 25000, max: 65000 },
    tags: ["Modern", "Infinity Pool", "City View", "Shopping", "Business"],
    description: "Contemporary luxury hotel featuring an iconic infinity pool and spectacular views of Singapore's skyline and Marina Bay.",
    starRating: 5,
    amenities: ["Free WiFi", "Infinity Pool", "Spa", "Multiple Restaurants", "Shopping Mall Access", "Business Center", "Gym"],
    roomTypes: ["Deluxe Room", "Premier Room", "Club Suite"],
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    reviews: [
      {
        id: 1,
        author: "Li Wei",
        rating: 5,
        date: "2024-08-25",
        comment: "Amazing infinity pool and incredible views! The hotel is modern and stylish. Great shopping nearby.",
        helpful: 33
      },
      {
        id: 2,
        author: "Rachel Green",
        rating: 4,
        date: "2024-08-14",
        comment: "Beautiful hotel with excellent facilities. The rooftop pool is a must-visit. Great for business trips.",
        helpful: 27
      }
    ]
  },
  {
    id: 7,
    name: "Mountain View Resort",
    region: "Himachal Pradesh",
    country: "India",
    district: "Manali",
    category: "local",
    mainImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 8.3,
    rating: 4.5,
    reviewCount: 967,
    sampleReview: "Breathtaking mountain views and cozy atmosphere. Perfect for adventure enthusiasts and nature lovers!",
    priceRange: { min: 4000, max: 12000 },
    tags: ["Mountain View", "Adventure", "Trekking", "Nature", "Cozy"],
    description: "A charming mountain resort offering spectacular Himalayan views and easy access to adventure activities in Manali.",
    starRating: 4,
    amenities: ["Free WiFi", "Restaurant", "Bonfire", "Trekking Guide", "Room Service", "Garden"],
    roomTypes: ["Standard Room", "Deluxe Room", "Cottage"],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    reviews: [
      {
        id: 1,
        author: "Vikram Gupta",
        rating: 5,
        date: "2024-08-21",
        comment: "Perfect location for mountain lovers! The views are spectacular and the staff is very helpful for organizing treks.",
        helpful: 24
      },
      {
        id: 2,
        author: "Sarah Miller",
        rating: 4,
        date: "2024-08-09",
        comment: "Cozy and comfortable with amazing mountain views. Great base for exploring Manali. The bonfire evenings were lovely.",
        helpful: 19
      }
    ]
  },
  {
    id: 8,
    name: "Desert Palace Hotel",
    region: "Rajasthan",
    country: "India",
    district: "Jaisalmer",
    category: "local",
    mainImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
    ],
    aiSafetyScore: 8.1,
    rating: 4.4,
    reviewCount: 734,
    sampleReview: "Authentic Rajasthani palace experience with traditional architecture and warm hospitality in the golden city.",
    priceRange: { min: 5000, max: 15000 },
    tags: ["Heritage", "Desert", "Palace", "Cultural", "Traditional"],
    description: "Experience royal Rajasthani hospitality in this heritage palace hotel offering authentic desert culture and traditional cuisine.",
    starRating: 4,
    amenities: ["Free WiFi", "Traditional Restaurant", "Cultural Shows", "Camel Safari", "Rooftop Dining", "Heritage Tours"],
    roomTypes: ["Heritage Room", "Royal Suite", "Palace Suite"],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    reviews: [
      {
        id: 1,
        author: "Arjun Sharma",
        rating: 5,
        date: "2024-08-19",
        comment: "Authentic palace experience! The architecture is stunning and the cultural programs are fantastic. Loved the camel safari.",
        helpful: 22
      },
      {
        id: 2,
        author: "Jennifer Adams",
        rating: 4,
        date: "2024-08-06",
        comment: "Beautiful heritage property with great atmosphere. The traditional Rajasthani food is delicious. Very unique experience.",
        helpful: 17
      }
    ]
  }
];
