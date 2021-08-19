import { H2, H3 } from '@blueprintjs/core';
import Container from 'components/Container';
import Result from 'components/Result';
import { StudioResult } from 'utils/api';
import styles from './styles.module.css';

interface Props {
  response?: StudioResult[];
}

export default function Results({ response }: Props) {
  return (
    <Container>
      {response ? (
        response.length ? (
          <>
            <H2>Results</H2>
            <div className={styles.results}>
              {response.map(result => (
                <Result
                  key={`${result.id}-${result.availableStage.stageId}`}
                  {...result}
                ></Result>
              ))}
            </div>
          </>
        ) : (
          <H3>No results 😔 Please try again with different filters</H3>
        )
      ) : (
        <H3>Fill above filters and start your search 👆</H3>
      )}
    </Container>
  );
}
