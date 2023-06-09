import React, { useEffect } from 'react';
import Profile from './Profile/Profile';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import SignList from './Lists/SignList';
import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';


const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  return (
    <div>
      <Profile />
      <Container>
        <Box padding={3}>
          <Heading size="md">{`Menandatangani Dokumen`}</Heading>
        </Box>
        <Box padding={3}>
          <SignList />
        </Box>
        <Box padding={3}>
          <Heading size="md">{`Siapkan Dokumen`}</Heading>
        </Box>
        <Box padding={2}>
          <Button
            onClick={event => {
              navigate(`/kirim`);
            }}
            text="Siapkan Dokumen"
            color="blue"
            inline
          />
        </Box>
        <Box padding={3}>
          <Heading size="md">{`Tinjau Dokumen yang Ditandatangani`}</Heading>
        </Box>
        <Box padding={3}>
          <SignedList />
        </Box>
      </Container>
    </div>
  );
};
export default ProfilePage;
