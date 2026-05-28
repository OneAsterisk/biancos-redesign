export interface FacilityPhoto {
  id: string;
  label: string;
  placeholder: string;
  src: string;
  width: number;
  height: number;
}

const base = "/assets/facility-photos";

/** Facility tour on /photos — images in public/assets/facility-photos */
export const FACILITY_PHOTOS: FacilityPhoto[] = [
  {
    id: "fac-cardio",
    label: "Cardio deck",
    placeholder: "Cardio row — treadmills, bikes",
    src: `${base}/cardio-1024x768.jpg`,
    width: 1024,
    height: 768,
  },
  {
    id: "fac-floor-1",
    label: "Main floor",
    placeholder: "Wide shot of the gym floor",
    src: `${base}/1-1024x768.jpg`,
    width: 1024,
    height: 768,
  },
  {
    id: "fac-studio-1",
    label: "Studio room",
    placeholder: "Group studio / class space",
    src: `${base}/Studio-Room-1-768x576.jpg`,
    width: 768,
    height: 576,
  },
  {
    id: "fac-studio-2",
    label: "Studio room II",
    placeholder: "Second studio angle",
    src: `${base}/Studio-Room-2-768x576.jpg`,
    width: 768,
    height: 576,
  },
  {
    id: "fac-floor-2",
    label: "Free-weight area",
    placeholder: "Racks and dumbbells",
    src: `${base}/2-768x576.jpg`,
    width: 768,
    height: 576,
  },
  {
    id: "fac-floor-3",
    label: "Machine row",
    placeholder: "Selectorized machines",
    src: `${base}/3-768x576.jpg`,
    width: 768,
    height: 576,
  },
  {
    id: "fac-floor-4",
    label: "Training floor",
    placeholder: "Open floor — platforms and benches",
    src: `${base}/4-768x667.jpg`,
    width: 768,
    height: 667,
  },
  {
    id: "fac-cst",
    label: "CST Logo",
    placeholder: "CST group on the floor",
    src: `${base}/CSTs-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-cst-1",
    label: "CST Entrance",
    placeholder: "CST entrance area",
    src: `${base}/CSTs1-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-cst-2",
    label: "CST Power Area",
    placeholder: "CST members training together",
    src: `${base}/CSTS2-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-cst-3",
    label: "CST Room",
    placeholder: "CST class in progress",
    src: `${base}/CSTS3-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-cst-5",
    label: "CST Room",
    placeholder: "CST class moment",
    src: `${base}/CSTS5-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-cst-6",
    label: "CST Room wide shot",
    placeholder: "CST class from above",
    src: `${base}/CSTS6-768x576.jpg`,
    width: 768,
    height: 576,
  },
  {
    id: "fac-good",
    label: "Mr. Good's",
    placeholder: "Mr. Good's area",
    src: `${base}/Mr.-Good-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
  {
    id: "fac-good-2",
    label: "Mr. Good's II",
    placeholder: "Mr. Good's — second angle",
    src: `${base}/Mr.-Good2-768x1024.jpg`,
    width: 768,
    height: 1024,
  },
];
