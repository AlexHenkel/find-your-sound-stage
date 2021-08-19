import { useMutation } from '@apollo/client';
import Container from 'components/Container';
import Header from 'components/Header';
import HeaderForm from 'components/HeaderForm';
import Results from 'components/Results';
import { SEARCH_QUERY } from 'graphql/search';
import { ApiResponse } from 'utils/api';

export default function App() {
  const [search, { data, loading }] = useMutation<ApiResponse>(SEARCH_QUERY);

  return (
    <>
      <Header />
      <Container>
        <HeaderForm
          onSubmit={values => {
            search({ variables: { searchQuery: values } });
          }}
          loading={loading}
        />
      </Container>
      <hr />
      <Results response={data?.search} />
    </>
  );
}
