import getRandom from '../helper/getRandom';

const investorList = [
  {
    MbeId: "mbe-1538-v-98",
    name: "Raj Kumar",
    arr: [2, 3, 7, 9, 10, 16],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "DVPR1438",
      aadhar: "7864 8726 0369",
      email: "raj@inclusivegrowthchain.com",
      mobile: "9876543210",
      address: "Near sri vaaru gas agency, Manthaveliyamman street, Perambakkam, Thiruvallur, 631 402.",
      fatherName: "Gurusamy",
      dob: "28/01/1999",
    },
  },
  {
    MbeId: "mbe-5800-v-07",
    name: "Shreyansh Nema",
    arr: [1, 4, 7, 9, 15, 18],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "BWMLK1234G",
      aadhar: "9876 1234 4567",
      email: "shreyansh@inclusivegrowthchain.com",
      mobile: "9998887770",
      address: "66, Dr. Lohia Marg, Shujalpur, Shajapur district, Madhya Pradesh.",
      fatherName: "Mohanlal Nema",
      dob: "19/01/1996",
    },
  },
  {
    MbeId: "mbe-5768-v-76",
    name: "Prudhvi Krishna",
    arr: [6, 16, 18, 19, 20],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "CHAAJ83736",
      aadhar: "8276 2926 2716",
      email: "prudhvi@inclusivegrowthchain.com",
      mobile: "8855432509",
      address: "Blockchain district lab, ISB, Hyderabad.",
      fatherName: "Srinivas",
      dob: "02/02/95",
    },
  },
  {
    MbeId: "mbe-1158-v-67",
    name: "Mohammed Muhsin",
    arr: [9, 10, 18, 12, 13],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "ETMPM179N",
      aadhar: "4627 0805 1808",
      email: "muhsin@inclusivegrowthchain.com",
      mobile: "8592039115",
      address: "Kuyyama parambil house, Malappuram, Kerala, 676309.",
      fatherName: "Musthafa",
      dob: "22/12/96",
    },
  },
  {
    MbeId: "mbe-6679-v-87",
    name: "Kesavan",
    arr: [1, 6, 7, 14, 13, 20],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "KSV87654",
      aadhar: "8978 8876 5678",
      email: "kesavan@inclusivegrowthchain.com",
      mobile: "8795543210",
      address: "No.968, Thiruvalluvar nagar, 5th street nellankari, chennai, 600 041.",
      fatherName: "Sekar Raja",
      dob: "12/05/97",
    },
  },
  {
    MbeId: "mbe-1238-v-46",
    name: "Vasanth",
    arr: [2, 3, 7, 9, 10, 16],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "DVVK1438",
      aadhar: "7864 6543 2349",
      email: "vasanth@inclusivegrowthchain.com",
      mobile: "9876543210",
      address: "Near sri vaaru gas agency, Manthaveliyamman street, Perambakkam, Thiruvallur, 631 402.",
      fatherName: "Gurusamy",
      dob: "27/03/2001",
    },
  },
  {
    MbeId: "mbe-3450-v-06",
    name: "Mohanlal Nema",
    arr: [1, 4, 7, 9, 15, 18],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "BWFRG1664G",
      aadhar: "2345 9876 4567",
      email: "nema@inclusivegrowthchain.com",
      mobile: "9998887770",
      address: "66, Dr. Lohia Marg, Shujalpur, Shajapur district, Madhya Pradesh.",
      fatherName: "-",
      dob: "19/01/1966",
    },
  },
  {
    MbeId: "mbe-1885-v-99",
    name: "Srinivas",
    arr: [6, 16, 18, 19, 20],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "CHREF83767",
      aadhar: "8006 3967 2716",
      email: "srinivas@inclusivegrowthchain.com",
      mobile: "8855432509",
      address: "Blockchain district lab, ISB, Hyderabad.",
      fatherName: "-",
      dob: "02/02/65",
    },
  },
  {
    MbeId: "mbe-42114-v-87",
    name: "Musthafa",
    arr: [9, 10, 18, 12, 13],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "ETMPM179N",
      aadhar: "7659 6543 6088",
      email: "musthafa@inclusivegrowthchain.com",
      mobile: "8592039115",
      address: "Kuyyama parambil house, Malappuram, Kerala, 676309.",
      fatherName: "-",
      dob: "22/12/66",
    },
  },
  {
    MbeId: "mbe-4570-v-61",
    name: "Sekar",
    arr: [1, 6, 7, 14, 13, 20],
    noOfToken: getRandom(5, 20) * 1000,
    currentValue: getRandom(5, 16) * 800,
    personal: {
      pan: "KS399H654",
      aadhar: "8978 8876 5678",
      email: "sekar@inclusivegrowthchain.com",
      mobile: "8795543210",
      address: "No.968, Thiruvalluvar nagar, 5th street nellankari, chennai, 600 041.",
      fatherName: "-",
      dob: "12/05/67",
    },
  },
]

export default investorList