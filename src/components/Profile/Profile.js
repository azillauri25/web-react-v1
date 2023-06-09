import React from 'react';
import {
  Box,
  Button,
  Text,
  Avatar,
  Row,
  Stack,
  Column,
  Heading,
  Image,
  IconButton,
  Icon,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { auth } from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { resetSignee } from '../Assign/AssignSlice';
import { navigate, Link } from '@reach/router';
import './Profile.css';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { displayName, photoURL, email } = user;

//   return (
//     <Box display="flex" direction="row" paddingY={1} paddingX={3} color={'white'}>
//       <Column span={11}>
//         <Box padding={1}>
//           <Link to="/masuk"><Image src="images/logo.png" alt="Deskripsi gambar"/></Link>
//         </Box>

//       </Column>
//       <Column span={4}>
//         <Box padding={1}>
//           <Row>
//             <Box padding={1}>
//               <Icon
//                 icon = "person"
//               />
//               {/* <Avatar id="profileImage" name={displayName} size="md" src={photoURL} /> */}
//             </Box>
//             <Stack padding = {2}>
//               <Text size = "md" weight="bold">{displayName}</Text>
//               <Text size = "sm">{email}</Text>
//             </Stack>
//             <Box padding={1}>
//               <IconButton 
//                   onClick={() => {
//                   auth.signOut();
//                   dispatch(setUser(null));
//                   dispatch(resetSignee())
//                   navigate('/masuk');
//                 }}
//                 accessibilityLabel="Sign out of your account"
//                 icon = "logout"
//                 text="Keluar"
//               />
//             </Box>
//           </Row>
//         </Box>
//       </Column>
//     </Box>
//   );
return (
  <Box display="flex" justifyContent="space-between" flexDirection="row" paddingY={1} paddingX={3} color="white">
    <Column span={11}>
      <Box padding={1}>
        <Link to="/masuk">
          <Image src="images/logo.png" alt="Deskripsi gambar" />
        </Link>
      </Box>
    </Column>
    <Column span={4}>
      <Box padding={1} display="flex" justifyContent ="end">
        <Box padding={3}>
          <Icon icon="person" />
          {/* <Avatar id="profileImage" name={displayName} size="md" src={photoURL} /> */}
        </Box>
        <Stack padding={1} direction="column">
          <Text size="md" weight="bold">{displayName}</Text>
          <Text size="sm">{email}</Text>
        </Stack>
        <Box padding={1}>
          <IconButton
            onClick={() => {
              auth.signOut();
              dispatch(setUser(null));
              dispatch(resetSignee());
              navigate('/masuk');
            }}
            accessibilityLabel="Sign out of your account"
            icon="logout"
            text="Keluar"
          />
        </Box>
      </Box>
    </Column>
  </Box>
);

};
export default ProfilePage;
