import { useRef } from 'react';
import Input from '../../components/UI/Input';
import { useAppSelector } from '../../hooks';
import { uncontrolledSelector } from '../../store/selectors/UncontrolledSelectors';
import { Button } from '../../styles';

export default function UncontrolledPage() {
  const { name, age, email, password, repeatPassword, gender, picture, privacy } =
    useAppSelector(uncontrolledSelector);

  const nameRef = useRef<string>(name);
  const ageRef = useRef<number>(age);
  const emailRef = useRef<string>(email);
  const passwordRef = useRef<string>(password);
  const repeatPasswordRef = useRef<string>(repeatPassword);
  const genderRef = useRef<string>(gender);
  const pictureRef = useRef<string>(picture);
  const privacyRef = useRef<boolean>(privacy);

  return (
    <div>
      <Input ref={nameRef} />
      <Input ref={ageRef} />
      <Input ref={emailRef} />
      <Input ref={passwordRef} />
      <Input ref={repeatPasswordRef} />
      <Input ref={genderRef} />
      <Input type="file" ref={pictureRef} />
      <Input type="checkbox" ref={privacyRef} />

      <Button>Click</Button>
    </div>
  );
}
