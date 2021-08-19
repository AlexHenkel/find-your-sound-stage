import { Card, H3 } from '@blueprintjs/core';
import { StudioResult } from 'utils/api';
import styles from './styles.module.css';

export default function Result({
  state,
  city,
  country,
  studioName,
  availableStage: { stageNumber },
}: StudioResult) {
  return (
    <Card elevation={2}>
      <H3>
        {studioName} - {stageNumber}
      </H3>
      <p className={styles.location}>
        {city}, {state}, {country}
      </p>
    </Card>
  );
}
