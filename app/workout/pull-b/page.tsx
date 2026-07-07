import WorkoutPage from "../../components/WorkoutPage";

import {
  pullBWorkout,
} from "../../lib/workoutPlans";


export default function PullBPage() {
  return (
    <WorkoutPage
      defaultWorkout={pullBWorkout}
      storageKey="forgefit-workout-pull-b"
    />
  );
}