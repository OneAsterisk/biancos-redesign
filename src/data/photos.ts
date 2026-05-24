export interface FacilityPhoto {
  cls: string;
  label: string;
  id: string;
  placeholder: string;
  src?: string;
}

/** Facility tour grid on /photos — add `src` when client assets are ready. */
export const FACILITY_PHOTOS: FacilityPhoto[] = [
  {
    cls: "ph-1",
    label: "Free-weight room",
    id: "photo-weights",
    placeholder: "Free-weight room — racks + dumbbells",
  },
  {
    cls: "ph-2",
    label: "Cardio deck",
    id: "photo-cardio",
    placeholder: "Cardio row — treadmills, bikes",
  },
  {
    cls: "ph-3",
    label: "Chalkboard wall",
    id: "photo-wall",
    placeholder: "Motivational chalkboard wall",
  },
  {
    cls: "ph-4",
    label: "Squat platforms",
    id: "photo-squat",
    placeholder: "Squat platforms + bench area",
  },
  {
    cls: "ph-5",
    label: "Machines",
    id: "photo-machines",
    placeholder: "Selectorized machines row",
  },
  {
    cls: "ph-6",
    label: "Front entrance",
    id: "photo-front",
    placeholder: "Front entrance / exterior at dusk",
  },
];
