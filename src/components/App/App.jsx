import { useState, useEffect, useRef } from 'react';
import { ContactList } from 'components/ContactList';
import { Form } from 'components/Form';
import { Filter } from 'components/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container, TitleH1, TitleH2, Text } from './App.styled';

const KEY_LOCAL_STORAGE = 'phone-book';

export const App = () => {
  const isFirstRender = useRef(true);

  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(KEY_LOCAL_STORAGE)) ?? []
  );

  const addContact = newContact => {
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isContact) {
      Notify.warning(`${isContact.name} is contacts.`, {
        position: 'center-top',
      });
      return;
    }
    setContacts(prevS => [...prevS, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevS => prevS.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const handleChangeValueInState = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterArr = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <TitleH1>Phonebook</TitleH1>
      <Form onSubmitAdd={addContact} />
      <Filter filter={filter} onKeyClick={handleChangeValueInState} />
      <TitleH2>Contacts</TitleH2>
      {filterArr.length !== 0 ? (
        <ContactList onDelete={deleteContact} contactArr={filterArr} />
      ) : (
        <Text>No contacts</Text>
      )}
    </Container>
  );
};
